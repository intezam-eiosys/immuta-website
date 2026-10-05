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

## Implemented (2026-10-05)
- All sections above, mobile-first responsive, data-testids on all interactive elements, ErrorBoundary, favicon + meta

## Backlog
- P1: Wire enquiry form to backend (POST /api/enquiries + admin view or email via Resend)
- P1: Replace placeholder contact details + real pricing when provided
- P2: Downloadable curriculum PDF (CTA currently anchors to curriculum section)
- P2: Additional course pages (L1 Foundations, L3 Enterprise Architect)
