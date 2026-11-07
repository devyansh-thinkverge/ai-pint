# Brewed Intelligence — PRD

## Original problem statement
Build a landing page for a new idea: a community for AI and everything in AI in India, starting in Delhi NCR and Hyderabad. Inspired by Pint of View (bar-hosted lectures with drinks) but AI-powered: AI topic categories for speakers, an AI curriculum builder, AI event summaries for attendees, points/leaderboard (daily.dev-style) redeemable on paid certification courses, per-event discussion forums, admin-moderated circles, and an Explore feed of latest AI blogs/events/podcasts. Fun bar-event experience (beer on us) followed by networking. Audience: corporates first, then speakers and members.

## Approved plan (implemented)
Single-page vision-showcase landing page with a real waitlist capture. No login, dashboard, or event booking in phase 1. All platform features (points, forums, circles, courses, Explore feed) are presented as upcoming product features, not functioning software.

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion, lenis (ReactLenis smooth scroll), react-fast-marquee, lucide-react icons. Fonts: Fraunces (display) + Manrope (body). Amber "brew" palette on off-white, grain overlay.
- Backend: FastAPI, MongoDB (motor). Endpoints: POST /api/waitlist (email + role, unique email index, duplicate → 409 friendly message), GET /api/waitlist/count, GET /api/.
- Components: Navbar (glass sticky, lenis anchor scroll), Hero (masked line-by-line reveal, parallax image, floating chips), Concept (3 treated photos), Timeline (5-step evening, horizontal snap on mobile), Bento (8-feature asymmetric grid), MarqueeStrip (outline-text topics/cities), Cities (Delhi NCR, Hyderabad + teaser card), Waitlist (role pills + email, persists to DB, success/error states), Footer. Custom SVG logo (beer-foam + neural nodes) in nav/footer/favicon.
- SEO: title, description, canonical, Open Graph + Twitter card tags, SVG favicon.

## User personas
- L&D / corporate leaders (primary): want engaging AI learning + networking for teams.
- Prospective speakers: experts hosting a session on a chosen AI topic.
- AI-curious members: join events, earn points, discuss in circles.

## Implemented (2026-11-07)
- Full landing page as per approved plan, mobile-first responsive, no horizontal overflow at 390px.
- Working waitlist backend (MongoDB) with role selection, duplicate detection, count endpoint.
- Verified: POST /api/waitlist persists (count 2), duplicate returns friendly 409 message; desktop (1440) + mobile (390) screenshots pass; form submit → success state in UI.

## Backlog
- P2: full accounts/auth, Explore feed, points/leaderboard engine, event pages with forums, circles, speaker onboarding + AI curriculum builder (phase 2).
- P3: paid certification subscriptions with points redemption, corporate team plans, production AI event summaries, Bangalore/Mumbai, ticketing.
- SEO: robots.txt + sitemap.xml when a real domain is set (canonical currently placeholder brewedintelligence.com).
