import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

const cfg = {
  port: Number(process.env.PORT || 8001),
  jwtSecret: process.env.JWT_SECRET || '',
  adminEmail: (process.env.ADMIN_EMAIL || '').toLowerCase(),
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
  cookieName: 'access_token',
  jwtTtl: process.env.JWT_TTL || '8h',
  dbUri: process.env.SUPABASE_DB_URI || '',
  emailProxyUrl: process.env.EMAIL_PROXY_URL || 'https://integrations.emergentagent.com/api/v1/email/send',
  emailProxyKey: process.env.EMERGENT_EMAIL_KEY || '',
  emailFromName: process.env.EMAIL_FROM_NAME || 'IMMUTA Technologies',
  emailReplyTo: process.env.EMAIL_REPLY_TO || '',
  ownerEmail: process.env.OWNER_EMAIL || '',
  frontendUrl: process.env.FRONTEND_URL || '',
};

if (!cfg.jwtSecret || cfg.jwtSecret.length < 32) {
  console.error('FATAL: JWT_SECRET is missing or shorter than 32 characters');
  process.exit(1);
}
if (!cfg.adminEmail || !cfg.adminPasswordHash) {
  console.error('FATAL: ADMIN_EMAIL and ADMIN_PASSWORD_HASH are required');
  process.exit(1);
}

const pool = cfg.dbUri
  ? new pg.Pool({
      connectionString: cfg.dbUri,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: { rejectUnauthorized: false },
    })
  : null;

if (!pool) console.error('WARNING: SUPABASE_DB_URI not set - enquiry storage is unavailable (503)');

pool?.on('error', (err) => console.error('Unexpected PostgreSQL pool error:', err.message));

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());
if (cfg.frontendUrl) {
  app.use(cors({ origin: cfg.frontendUrl, credentials: true }));
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { detail: 'Too many failed attempts. Try again in 15 minutes.' },
});

const escapeHtml = (v) =>
  String(v).replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function issueAdminCookie(res) {
  const token = jwt.sign({ sub: cfg.adminEmail, role: 'admin' }, cfg.jwtSecret, {
    expiresIn: cfg.jwtTtl,
    issuer: 'immuta-api',
    audience: 'admin',
  });
  res.cookie(cfg.cookieName, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60 * 1000,
  });
}

function requireAdmin(req, res, next) {
  const token = req.cookies[cfg.cookieName];
  if (!token) return res.status(401).json({ detail: 'Not authenticated' });
  try {
    req.admin = jwt.verify(token, cfg.jwtSecret, { issuer: 'immuta-api', audience: 'admin' });
    next();
  } catch {
    res.clearCookie(cfg.cookieName, { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/' });
    return res.status(401).json({ detail: 'Not authenticated' });
  }
}

const enquiryNotificationHtml = (e, createdAt) => {
  const rows = [
    ['Full Name', e.name],
    ['Email ID', e.email],
    ['Phone Number', e.phone],
    ['Interested Course', e.course],
    ['Message', e.message || '-'],
  ];
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-family:Arial,sans-serif;font-size:13px;color:#7A6D8C;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 0;font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a"><strong>${escapeHtml(value)}</strong></td></tr>`
    )
    .join('');
  return (
    '<table role="presentation" width="100%" style="background:#f6f2f8"><tr><td style="padding:24px">' +
    '<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #e5dce8;border-radius:10px">' +
    '<tr><td style="padding:20px 24px;border-bottom:1px solid #eee2f2;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;color:#2B0B1E">New course enquiry</td></tr>' +
    `<tr><td style="padding:16px 24px;font-family:Arial,sans-serif;font-size:13px;color:#7A6D8C">Received ${escapeHtml(createdAt)} UTC</td></tr>` +
    `<tr><td style="padding:8px 24px 20px"><table role="presentation" width="100%">${cells}</table></td></tr>` +
    '<tr><td style="padding:16px 24px;border-top:1px solid #eee2f2;font-family:Arial,sans-serif;font-size:12px;color:#888">Open your admin dashboard to manage this enquiry. ' +
    `Sent by ${escapeHtml(cfg.emailFromName)}. We never ask for your password or card details by email.</td></tr>` +
    '</table></td></tr></table>'
  );
};

async function sendOwnerNotification(enquiry, createdAt) {
  if (!cfg.emailProxyKey || !cfg.ownerEmail) return 'skipped';
  try {
    const resp = await fetch(cfg.emailProxyUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-Email-Key': cfg.emailProxyKey },
      body: JSON.stringify({
        to: [cfg.ownerEmail],
        subject: 'New course enquiry - IMMUTA Technologies',
        html: enquiryNotificationHtml(enquiry, createdAt),
        from_name: cfg.emailFromName,
        ...(cfg.emailReplyTo ? { contact_email: cfg.emailReplyTo } : {}),
      }),
    });
    if (!resp.ok) {
      console.error(`Email proxy failed: ${resp.status} ${await resp.text()}`);
      return 'failed';
    }
    return 'sent';
  } catch (err) {
    console.error('Email notification failed:', err.message);
    return 'failed';
  }
}

const clean = (v, max = 4000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const toOut = (row) => ({
  enquiry_id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  course: row.course,
  message: row.message || '',
  status: row.status,
  created_at: new Date(row.created_at).toISOString(),
});

app.get('/api', (_req, res) => res.json({ message: 'Hello World' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', storage: pool ? 'supabase' : 'unavailable' }));

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const email = clean(req.body?.email, 200).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const emailOk =
    email.length === cfg.adminEmail.length &&
    crypto.timingSafeEqual(Buffer.from(email), Buffer.from(cfg.adminEmail));
  const passOk = password.length > 0 && (await bcrypt.compare(password, cfg.adminPasswordHash));
  if (!emailOk || !passOk) {
    return res.status(401).json({ detail: 'Invalid email or password' });
  }
  issueAdminCookie(res);
  return res.json({ user_id: 'admin', email: cfg.adminEmail, name: 'Admin', role: 'admin' });
});

app.post('/api/auth/refresh', (_req, res) => {
  res.status(401).json({ detail: 'No refresh token' });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie(cfg.cookieName, { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/' });
  res.json({ status: 'logged out' });
});

app.get('/api/auth/me', requireAdmin, (req, res) => {
  res.json({ user_id: 'admin', email: req.admin.sub, name: 'Admin', role: 'admin' });
});

app.post('/api/enquiries', async (req, res) => {
  if (!pool) return res.status(503).json({ detail: 'Storage unavailable' });
  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 200).toLowerCase();
  const phone = clean(req.body?.phone, 30);
  const course = clean(req.body?.course, 200);
  const message = clean(req.body?.message, 2000);

  if (!name || !course || !phone) {
    return res.status(422).json({ detail: 'name, phone and course are required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ detail: 'Please enter a valid email address' });
  }
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return res.status(422).json({ detail: 'Please enter a valid phone number' });
  }

  try {
    const { rows } = await pool.query({
      text:
        'insert into public.enquiries (name, email, phone, course, message) ' +
        'values ($1, $2, $3, $4, $5) returning id, name, email, phone, course, message, status, created_at',
      values: [name, email, phone, course, message || null],
    });
    const enquiry = toOut(rows[0]);
    const emailStatus = await sendOwnerNotification(enquiry, new Date(enquiry.created_at).toUTCString());
    if (emailStatus === 'failed') console.warn(`Owner notification not sent for enquiry ${enquiry.enquiry_id}`);
    return res.status(201).json(enquiry);
  } catch (err) {
    console.error('Enquiry insert failed:', err.message);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

app.get('/api/enquiries', requireAdmin, async (_req, res) => {
  if (!pool) return res.status(503).json({ detail: 'Storage unavailable' });
  try {
    const { rows } = await pool.query({
      text: 'select id, name, email, phone, course, message, status, created_at from public.enquiries order by created_at desc limit 500',
    });
    return res.json(rows.map(toOut));
  } catch (err) {
    console.error('Enquiry list failed:', err.message);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

app.patch('/api/enquiries/:id', requireAdmin, async (req, res) => {
  if (!pool) return res.status(503).json({ detail: 'Storage unavailable' });
  const { id } = req.params;
  if (!UUID_RE.test(id)) return res.status(404).json({ detail: 'Enquiry not found' });
  try {
    const { rows } = await pool.query({
      text:
        "update public.enquiries set status = case when status = 'new' then 'handled' else 'new' end " +
        'where id = $1 returning id, name, email, phone, course, message, status, created_at',
      values: [id],
    });
    if (rows.length === 0) return res.status(404).json({ detail: 'Enquiry not found' });
    return res.json(toOut(rows[0]));
  } catch (err) {
    console.error('Enquiry update failed:', err.message);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

const buildDir = path.join(__dirname, 'public');
app.use(express.static(buildDir, { index: false, maxAge: isProd ? '1d' : 0 }));
app.get(/^(?!\/api(?:\/|$)).*/, (_req, res, next) => {
  res.sendFile(path.join(buildDir, 'index.html'), (err) => (err ? next(err) : null));
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ detail: 'Internal server error' });
});

const server = app.listen(cfg.port, '0.0.0.0', () => {
  console.log(`IMMUTA API listening on 0.0.0.0:${cfg.port} (storage: ${pool ? 'supabase' : 'unavailable'})`);
});

async function shutdown(signal) {
  console.log(`${signal}: shutting down`);
  server.close(async () => {
    if (pool) await pool.end();
    process.exit(0);
  });
}
process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));
