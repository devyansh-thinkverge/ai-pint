# AI Taproom — PRD

> Rebranded from "Brewed Intelligence" to AI Taproom (aitaproom.club) on 2026-11-09; Delhi NCR is the sole launch city. "Brewed Intelligence" survives only as the tagline/heritage line.

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
- Pitch deck (14-slide PPTX) and PRD (DOCX) built from the shared ChatGPT research synthesis (chatgpt.com/share/6aef156c + 6aeef8de); served as downloads from /brewed-intelligence-pitch-deck.pptx and /brewed-intelligence-prd.docx; build scripts in /app/scripts/deck/.
- PDF version of the deck (vector, Fraunces + Manrope embedded) served from /brewed-intelligence-pitch-deck.pdf; verified 200 on localhost and the external preview host; all 14 pages visually checked via contact sheet.

## Rebrand & Delhi NCR focus (2026-11-09)
- Rebranded everywhere to AI Taproom (aitaproom.club): nav/footer wordmark (with "Brewed Intelligence" tagline line in footer), hero copy, browser title, SEO meta, OG/Twitter cards, canonical/og:url, JSON-LD Organization node, robots.txt/sitemap.xml/llms.txt; backend API greeting. Logo mark (beer-foam + neural nodes) unchanged.
- Delhi NCR is the only launch city: hero badge, marquee, cities section (one large Delhi card + generic "Your city next?" teaser), meta/description. Hyderabad removed everywhere.
- Evening timeline reworked to five beats: Doors & first pint (6 PM) → The talk (45 min, moderator-assigned topic) → Live performance (short act; audience submits questions) → Moderator-led Q&A (moderators read submitted questions) → Afters & networking (from 8 PM). No intermediate timestamps.
- Bento topic card is now "The topics on stage": moderators assign speakers their topic; four upcoming session topics in an expand/collapse accordion (animated height, rotating chevron, one open at a time, amber highlight) with illustrative detail lines.
- Deck rebuilt as AI Taproom (ai-taproom-pitch-deck.pptx + ai-taproom-pitch-deck.pdf, old files removed): Delhi-only market slide with wide Delhi image + teaser card, aitaproom.club on closing slide/footers, moderator-assigned topic copy. PRD rebuilt as ai-taproom-prd.docx (v1.1: rebrand, Delhi scope, moderator-assigned flow, five-beat evening).
- Verified end-to-end: waitlist still persists (success state shown), Hyderabad fully absent from rendered page, accordion works desktop + mobile, no horizontal overflow at 390px, head ships AI Taproom + aitaproom.club tags, all six download/SEO files serve 200 on the preview host.
- Concept ("The idea") section gained a full-width live-performance figure (generated image of a young woman playing sitar in a modern bar, amber aesthetic) captioned "The performance" tying to the evening's question-collection beat (2026-11-10; artwork swapped to the woman-artist version the same day per user request).
- Premium tier retreats section added (#retreats, after the platform bento; nav link "Retreats"): weekend AI retreats at popular destinations with the taproom format, points redemption on retreat seats/upgrades and exclusive premium event unlocks; generated dusk-retreat visual, illustrative destination chips (Goa, Jaipur, Coorg, Rishikesh — labelled illustrative). Topics accordion expanded to 8 sessions: added AI in Textiles, AI in Supply Chain, Voice & Vernacular AI, AI in Healthcare as illustrative detail lines (2026-11-10).

## Backlog
- P2: full accounts/auth, Explore feed, points/leaderboard engine, event pages with forums, circles, speaker onboarding + AI curriculum builder (phase 2).
- P3: paid certification subscriptions with points redemption, corporate team plans, production AI event summaries, Bangalore/Mumbai, ticketing.
- SEO: robots.txt + sitemap.xml when a real domain is set (canonical currently placeholder brewedintelligence.com).
