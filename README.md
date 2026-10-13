# IMMUTA Technologies — Quantum Security Specialist Certificate

Dedicated course page for the IMMUTA Quantum Security Specialist Certificate: kinetic hero, curriculum, hands-on labs, certification pathway, enquiry form, and a private admin dashboard at `/admin`.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (Create React App), Tailwind CSS, Framer Motion, Lenis |
| Backend for Hostinger | Node.js 20 + Express (`backend-node/`) — serves the static site AND the API |
| Backend (Emergent preview) | FastAPI Python (`backend/`) — same API contract, used by the Emergent preview deployment |
| Database | **Supabase PostgreSQL (external connection)** — table `public.enquiries` |
| Email | Emergent managed Resend integration |
| Package managers | Yarn 1.x (frontend), yarn/npm (Node backend) |

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
├── backend-node/             # Express API for Hostinger (Node 20) — USE THIS ON HOSTINGER
│   ├── server.js             # Entry file: API + static hosting of frontend/build
│   ├── package.json
│   └── .env.example
├── backend/                  # FastAPI API (Python) — only used by the Emergent preview
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
└── .gitignore
```

## Environment Variables

Frontend (`frontend/.env`, baked in at **build time**):

| Variable | Value for Hostinger (single app) |
|---|---|
| `REACT_APP_BACKEND_URL` | **leave empty** — the Node app serves the site and API on the same origin |

Node backend (`backend-node/.env` — configure in Hostinger's Environment variables panel):

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | Random string, ≥ 32 chars |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of the admin password (see below) |
| `SUPABASE_DB_URI` | **External Supabase connection** — Transaction Pooler URI (port 6543) |
| `EMERGENT_EMAIL_KEY` | Email integration key |
| `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`, `OWNER_EMAIL` | Enquiry notification sender/recipient |
| `NODE_ENV` | `production` on Hostinger (enables Secure cookies) |
| `PORT` | Set by Hostinger automatically |
| `FRONTEND_URL` | Optional — only if hosting frontend on a separate origin |

Generate the admin password hash:

```bash
cd backend-node && yarn install
node -e "const b=require('bcryptjs');console.log(b.hashSync(process.argv[1],12))" 'your-strong-password'
```

## Deploying to Hostinger Cloud (single Node app — recommended)

The whole site (static React build + API + external Supabase) runs as **one Node.js application**.

1. **Build the frontend during deploy** — set the Hostinger build command to (single line):
   ```
   yarn install && cd ../frontend && yarn install && yarn build && rm -rf ../backend-node/public && cp -r build ../backend-node/public
   ```
   This installs backend + frontend dependencies, builds the site, and places the bundle inside `backend-node/public` so the Node app serves it same-origin. (A prebuilt copy of the bundle is also committed in the repo as a fallback.)
2. **Hostinger app settings** (hPanel → Websites → your site → *Node.js* / *Deployments*):
   - Node.js version: **20.x**
   - Application root: `backend-node`
   - Startup / entry file: `server.js` (or start command: `node server.js` / `yarn start`)
   - Build command: `yarn install` (Hostinger supports npm, Yarn and pnpm)
3. **Environment variables**: add every variable from `backend-node/.env.example` in Hostinger's environment-variable panel — including `SUPABASE_DB_URI` (your Transaction Pooler URI from Supabase Dashboard → Connect → Transaction pooler, port 6543). Never commit `.env`.
4. **Deploy / restart** the app. Hostinger injects `PORT` — the server binds `0.0.0.0:$PORT` automatically.
5. **Verify**: open `https://your-domain/api/health` → `{"status":"ok","storage":"supabase"}`, then load `https://your-domain/admin` directly (SPA fallback serves the React app).
6. **HTTPS**: hPanel → *Security → SSL* → install the free certificate and enable *Force HTTPS*.
7. **Domain**: hPanel → *Domains* → point your domain at the site.
8. **Keep running / updates**: Hostinger manages the Node process and restarts it. After a future `git pull`, rebuild the frontend (`REACT_APP_BACKEND_URL= yarn build`) and restart the app from hPanel.

Alternative (split hosting): deploy `frontend/build/` as pure static files (it ships `.htaccess` for SPA routing on LiteSpeed/Apache) and set `REACT_APP_BACKEND_URL` to an API hosted elsewhere. The FastAPI `backend/` serves this role on the Emergent preview.

## What Works Without a Database

| Feature | Static-only deployment |
|---|---|
| Course page, design, curriculum, FAQ, navigation | ✅ fully works |
| Enquiry form validation + error handling | ✅ works (client-side) |
| **Storing submissions / email notifications / admin dashboard** | ❌ require the Node backend + `SUPABASE_DB_URI` — set the env vars on Hostinger to enable |

## Local Development

```bash
# frontend (uses REACT_APP_BACKEND_URL from frontend/.env)
cd frontend && yarn install && yarn start            # http://localhost:3000

# Node backend (same-origin mode)
cd backend-node && yarn install && cp .env.example .env  # then edit values
yarn dev                                             # http://localhost:8002
```

## API Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | — | Health + storage status |
| POST | `/api/enquiries` | public | Store enquiry + email notification |
| POST | `/api/auth/login` | rate-limited | Admin login (sets httpOnly JWT cookie) |
| GET | `/api/auth/me` | admin | Current admin |
| POST | `/api/auth/logout` | — | Clear cookie |
| GET | `/api/enquiries` | admin | List enquiries |
| PATCH | `/api/enquiries/:id` | admin | Toggle new/handled |

## Troubleshooting

- **`storage: "unavailable"` on /api/health** → `SUPABASE_DB_URI` not set in the app's environment variables; add it and restart.
- **Blank page after upload** → missing build output; run `REACT_APP_BACKEND_URL= yarn build` in `frontend/` and make sure `backend-node/../frontend/build` exists relative to the app root.
- **`/admin` returns 404 on refresh** → the SPA fallback route is missing — make sure Hostinger runs `backend-node/server.js`, which includes it.
- **Admin login fails** → `ADMIN_PASSWORD_HASH` must be the bcrypt hash of the password you type; 10 wrong attempts per 15 minutes are throttled.
- **Enquiries stored but no email** → check `EMERGENT_EMAIL_KEY`, `OWNER_EMAIL`; a failed notification never rolls back the stored enquiry.
- **Cookies rejected** → must be accessed over HTTPS in production (`NODE_ENV=production` sets Secure cookies).

## Secrets

`.env` files are git-ignored — real keys never enter the repository. Configure production secrets in Hostinger's environment-variable panel.
