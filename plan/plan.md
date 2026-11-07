# Brewed Intelligence — Landing Page Plan

A vision-showcase landing page for Brewed Intelligence, an AI-powered community platform for everything AI in India, launching first in Delhi NCR and Hyderabad. It pairs the fun of bar-hosted lectures (a pint on us, then networking) with a real product layer: AI-built talk curricula, event summaries, discussion forums, moderated circles, a points-and-leaderboard system and an Explore feed of the latest in AI.

## Who it's for

Primary audience is corporate teams — L&D leaders, managers and professionals who want engaging, high-signal AI learning and networking for their people. Secondary voices addressed on the same page: prospective speakers (experts who'd host a session) and the wider AI-curious crowd who join the waitlist.

## Core features and experience (of the landing page)

1. **Kinetic hero** — "Brewed Intelligence" wordmark with a masked line-by-line headline reveal on load, one supporting line positioning the idea ("Where India talks AI — over a pint"), primary CTA "Join the waitlist" and a "Coming soon to Delhi NCR & Hyderabad" badge. Subtle 3D/parallax drift on a hero visual.
2. **The concept strip** — a short editorial section explaining the format with real photography treated deliberately (spotlight, clipped frames): lecture in a bar, beer on us, networking after.
3. **Experience timeline** — a horizontal scroll timeline with a beer-icon marker walking through one event evening: doors & drink → talk on a hot AI topic → Q&A → AI-generated summary in your inbox → networking. Fun, interactive, not overloaded.
4. **Feature bento (the platform)** — a properly aligned bento grid presenting the product features:
   - AI topic categories speakers choose from (Agentic Security & Governance, AI in Industries, AI in Finance, AI in the Developer Ecosystem, etc.)
   - AI curriculum builder that helps a speaker structure their talk
   - Post-event AI summaries for attendees
   - Discussion forums on every event
   - Admin-moderated Circles (e.g., AI Security Posture Management)
   - Explore feed — latest AI blogs, events and podcasts pulled in, plus member posts
   - Points, streaks & leaderboard (daily.dev-style), redeemable on paid certification courses
   - Certification courses as the paid layer
5. **One slow editorial marquee** — scrolling strip of AI topic categories / city names.
6. **Cities & coming soon** — Delhi NCR and Hyderabad launch cards with a light "next cities" teaser.
7. **Waitlist CTA + footer** — a simple email capture form with role selection (corporate / speaker / member), storing submissions, plus socials and a short footer. Form is real and persists to the database.

## User flow

Land → hero reveal communicates the idea in seconds → scroll through concept → interactive timeline of an event evening → feature bento explains the platform → cities section confirms launch markets → CTA scrolls to the waitlist form → submit email + role → confirmation state. Nav links smooth-scroll to each section.

## UI/UX feel

Clean startup light as chosen: bright, airy, generous whitespace, one committed accent palette (warm amber "brew" tones on off-white, dark ink text), distinctive display typeface paired with a readable body face. Premium but restrained motion: framer-motion scroll reveals and micro-interactions, lenis momentum scrolling, one parallax hero moment, one marquee. Custom original logo mark (beer-foam/neural-node hybrid in a simple SVG) used in the nav, footer and as favicon. Fully responsive; mobile 390px is a first-class layout. No emoji icons — lucide-react icons throughout.

## Implementation phases

**Phase 1 — build now (the MVP):** the complete landing page as described above — hero, concept, timeline, feature bento, marquee, cities, waitlist form with working backend capture, logo + favicon, SEO meta and social-share tags, mobile polish. Verified end-to-end (form submissions persist, page loads cleanly on desktop and mobile).

**Phase 2 — after launch validation:** expand waitlist into full accounts; build the actual platform shell — Explore feed, points/leaderboard, event pages with forums and Circles; speaker onboarding with the AI curriculum builder.

**Phase 3 — monetisation and scale:** paid certification course subscriptions with points redemption; corporate team plans; AI event-summary generation in production; more cities (Bangalore, Mumbai and beyond); ticketing for live events.

## Assumptions

- The name is Brewed Intelligence (user-confirmed); logo is designed fresh as an original SVG mark.
- The page is a single-page vision showcase with a real waitlist capture; no login, no dashboard, no event booking in this phase.
- All copy is written from the researched concept (Pint of View's bar-lecture format + daily.dev's points/feed model) — no invented stats, founders, dates or partners; any placeholder facts are clearly labelled.
- Sample imagery uses stock photography fitting the bar-lecture/corporate-social vibe; no real event photos exist yet.
- Points redemption, forums, circles, certification courses etc. are presented as upcoming product features on the page, not functioning software.
- Emergent-managed email is not needed in phase 1; waitlist entries are stored in the app database only.
