# PRD — IMMUTA Quantum Security Specialist Certificate (Course Page Redesign)

## Original Problem Statement
"I need a fresh design for the course page, here is the content attached in the pdf. If you can come up with a professional design of this dedicated course page. The logo is also there on the pdf, you can use the same color pallete as we see on the attached pdf... You can use the shades of the logo color wherever necessary. Also, make the page easy to use with an enquiry form."

## User Decisions (from clarifying questions)
- Dedicated course page only (no extra pages)
- Design-first: enquiry form is frontend-only (validation + success state, no backend persistence)
- Keep placeholder contact details from PDF (+123 456 789, domain@gmail.com, 123 Creative Lane London SW1A 1AA UK)
- Sample pricing/duration added: $1,499 / 8 Weeks / L2 Advanced / 4 Labs

## Design System (from /app/design_guidelines.json)
- Style: LUXURY_DEEP_QUANTUM — near-black #0B060F base, burgundy #2B0B1E, vibrant purple #9A36E3, coral CTA #FF5E36, metallic gold #D4AF37
- Typography: Outfit (display), Manrope (body), JetBrains Mono (labels/terminal)
- Motion: Lenis smooth scroll, framer-motion reveals (once, amount 0.15), masked line-by-line hero reveal, 3D mouse-tilt hero visual, scroll parallax, slow editorial marquee
- Favicon: original SVG shield "Q" mark (gold on purple-burgundy gradient)

## Architecture
- React 19 (CRA) single-route SPA; no backend changes; static assets in /public/brand
- Components: Navbar (sticky + mobile overlay menu), Hero (kinetic reveal, stats, tilt visual, floating terminal), Marquee, Overview (bento), Skills (4 pillars), Labs (terminal cards), Curriculum (accordion), WhyImmuta + WhoShouldEnroll, Pathway (certificate preview, careers, progression), Enquiry (validated form + success + sonner toast), Faq (accordion), Footer
- Content data centralized in src/data/course.js (from the PDF, verbatim where provided)

## Implemented (2026-10-05, updated 2026-10-13)
- All sections above, mobile-first responsive, data-testids on all interactive elements, ErrorBoundary, favicon + meta
- **Enquiry pipeline (2026-10-13)**: POST /api/enquiries stores submissions in built-in MongoDB (enquiries collection), sends owner notification email via Emergent managed Resend integration (verified 202 Accepted to test inbox), JWT admin auth (bcrypt, httpOnly cookies, brute-force lockout), admin dashboard at /admin (login + enquiry list + stats + mark handled toggle), Admin link in footer
- Admin credentials: see /app/memory/test_credentials.md
- **Supabase integration (2026-10-13)**: enquiry storage moved from MongoDB to existing Supabase project "Immuta Site" (public.enquiries via asyncpg + Transaction Pooler :6543, RLS on, no public policies; anon key least-privilege verified). Admin dashboard reads/toggles live from Supabase. No schema changes were required (table already existed with approved schema). Legacy Mongo enquiry rows left in place (demo data)

## Backlog
- P1: GitHub push — main is deployment-ready at commit 3507181; pod has no git remote, push happens via Emergent's platform GitHub integration
- P1: Hostinger deployment — backend-node/ (Express, Node 20) serves static frontend + API same-origin with external Supabase connection; README has full hPanel steps (app root backend-node, entry server.js, env vars incl. SUPABASE_DB_URI)
- P1: Set OWNER_EMAIL to the owner's real inbox (currently placeholder domain@gmail.com, which is undeliverable)
- P1: Replace placeholder contact details + real pricing when provided
- P2: Downloadable curriculum PDF (CTA currently anchors to curriculum section)
- P2: Additional course pages (L1 Foundations, L3 Enterprise Architect)
