# IMMUTA Technologies — Quantum Security Specialist Certificate

Dedicated course page for the IMMUTA Quantum Security Specialist Certificate: kinetic hero, curriculum, hands-on labs, certification pathway, enquiry form, and a private admin dashboard at `/admin`.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (Create React App), Tailwind CSS, Framer Motion, Lenis |
| Backend | FastAPI (Python 3.11), Motor (MongoDB), asyncpg |
| Databases | MongoDB (admin accounts) · Supabase PostgreSQL (enquiries — **optional, off by default**) |
| Email | Emergent managed Resend integration |
| Node.js | 20.x (LTS) — works on 18/20/22 |
| Package manager | Yarn 1.x (frontend) / pip (backend) |

## Project Structure

```
/
├── frontend/                 # React CRA app (deploys as static files)
│   ├── public/               # Static assets, favicon.svg, .htaccess (SPA fallback)
│   ├── src/
│   │   ├── components/       # Navbar, Hero, Marquee, Overview, Skills, Labs,
│   │   │                     # Curriculum, WhyImmuta, Pathway, Enquiry, Faq, Footer
│   │   ├── pages/            # CoursePage (public), AdminPage (/admin)
│   │   ├── data/course.js    # All page content in one place
│   │   └── lib/              # scroll + api helpers
│   ├── package.json
│   └── yarn.lock
├── backend/                  # FastAPI API server (Python)
│   ├── server.py             # All API endpoints
│   ├── requirements.txt
│   └── .env.example
└── .gitignore
```

## Environment Variables

Frontend (`frontend/.env`, baked in at **build time**):

| Variable | Purpose |
|---|---|
| `REACT_APP_BACKEND_URL` | Public base URL of the backend API |

Backend (`backend/.env`, server-side only — never commit):

| Variable | Purpose |
|---|---|
| `MONGO_URL`, `DB_NAME` | MongoDB connection (admin accounts) |
| `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin auth for `/admin` |
| `FRONTEND_URL` | Your site URL (CORS allow-list) |
| `EMERGENT_EMAIL_KEY`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`, `OWNER_EMAIL` | Enquiry email notifications |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_DB_URI` | **Optional — Supabase storage for enquiries. Left disconnected by default.** |

## Local Development

```bash
# frontend
cd frontend && yarn install && yarn start          # http://localhost:3000

# backend (separate terminal)
cd backend && pip install -r requirements.txt && uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

## Production Build (Frontend)

```bash
cd frontend
# set the API URL for the build, then build:
REACT_APP_BACKEND_URL=https://your-api-domain.example.com yarn build
```

Output lands in `frontend/build/` — fully static, ready for any static host.

## Deploying the Frontend to Hostinger

1. **Build** with the command above (the API URL is baked in).
2. **Upload the contents of `frontend/build/`** (not the folder itself) to your domain's web root (e.g. `public_html/`) via Hostinger File Manager, or use Hostinger's Git deployment: *Websites → your site → Deployments → Git* and point it at this repository — then run the build command as the deployment step if your plan supports it.
3. **SPA routing**: a ready-made `.htaccess` ships inside `frontend/public/` and is included in the build output — it rewrites deep links like `/admin` to `index.html` on LiteSpeed/Apache. Nothing to configure manually.
4. **HTTPS**: Hostinger → *Websites → your site → Security → SSL* — install a free SSL certificate and enable *Force HTTPS*.
5. **Domain**: Hostinger → *Websites → your site → Domains* to point your domain at the site.

## Backend Hosting — Important Reality Check

The FastAPI backend **cannot run on Hostinger Cloud's Node.js application plans** (their supported runtimes are Node.js-based: Express, Fastify, Hono, NestJS, Next.js…). Pick one:

1. **Recommended**: keep the API running on its current Emergent deployment (already live at `https://course-page-redesign.preview.emergentagent.com`) and point `REACT_APP_BACKEND_URL` at it when building, **or**
2. Host the backend on a **Hostinger VPS** (full Python support): clone the repo, `pip install -r backend/requirements.txt`, run `uvicorn server:app --host 0.0.0.0 --port 8001` behind Nginx with `systemd` keeping it alive, **or**
3. Port the API to Node.js (Express/Hono) — a future task, not part of this push.

### What works / doesn't without the backend + database (current state: Supabase intentionally disconnected)

| Feature | Static-only deployment |
|---|---|
| Course page, design, curriculum, FAQ, navigation | ✅ fully works |
| Enquiry form validation + error handling | ✅ works (client-side) |
| **Storing submissions / email notifications** | ❌ requires the FastAPI backend + a database (Supabase optional var / MongoDB for admin) |
| **Admin dashboard (`/admin`)** | ❌ requires the backend + MongoDB + database |

## Updating After Future GitHub Pushes

```bash
git pull && cd frontend && yarn install && yarn build
```
Then re-upload the new `frontend/build/` contents (Hostinger Git deployments re-run this automatically).

## Troubleshooting

- **Blank page after upload** → you uploaded the `build` folder instead of its *contents*, or `.htaccess` wasn't uploaded (hidden files: enable "show hidden" in File Manager).
- **`/admin` shows 404 on refresh** → `.htaccess` missing from web root.
- **Form submits but nothing is stored** → the API URL is wrong in the build, or the backend is down / its database is not configured (check backend logs).
- **Admin login fails** → `ADMIN_EMAIL`/`ADMIN_PASSWORD` in the backend env; 5 wrong attempts lock the account for 15 minutes.
- **Styles missing** → clear Hostinger cache (LiteSpeed Cache plugin / hPanel cache manager).

## Secrets

`.env` files are git-ignored — real keys never enter the repository. Configure production secrets in Hostinger's environment-variable settings (for Node apps) or in your backend host's env configuration.
