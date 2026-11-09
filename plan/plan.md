# AI Taproom — Rebrand, Delhi NCR Focus, Evening Rework & Topic Accordion

An AI-powered community platform for everything in AI in India — rebranding the current vision-showcase site and all companion assets from "Brewed Intelligence" to **AI Taproom** (domain: **aitaproom.club**), with "Brewed Intelligence" becoming the tagline beneath the name. Hyderabad is removed everywhere for now; Delhi NCR is the sole launch city. The event-evening timeline gains a live-performance segment used to collect audience questions, the per-item timestamps drop (just a 6 PM start and 8 PM finish), and the platform section's topic card becomes an expand/collapse list of upcoming session topics, since moderators — not speakers — assign each speaker their topic.

## Who it's for

Unchanged: corporate teams in Delhi NCR (L&D leaders, managers, professionals) who want high-signal AI learning and networking; speakers whose topics are assigned by moderators; and the wider AI-curious crowd joining the waitlist. Investors and partners receive the rebranded deck and PRD.

## Core features and experience (of this update)

1. **Rebrand everywhere** — name becomes "AI Taproom" in the nav, footer, hero, browser title, SEO meta, Open Graph/Twitter cards, canonical URL (aitaproom.club), favicon text and the SVG logo wordmark; "Brewed Intelligence" renders as the tagline line beneath the name (footer and cover placements). The beer-foam/neural-node logo mark itself is kept — it fits the taproom identity. Email confirmations, page copy ("Brewed Intelligence is an AI-powered community…") and footer credits all switch to AI Taproom with the tagline honouring the old name.
2. **Delhi NCR only** — hero badge becomes "Coming soon to Delhi NCR"; cities section becomes a two-card composition: one large Delhi NCR launch card plus the "Your city next?" teaser card (which now absorbs the Hyderabad energy without naming it as confirmed); marquee drops "Hyderabad"; footer, meta descriptions, deck slides and PRD all drop Hyderabad.
3. **Evening timeline rework** — five beats, no per-item timestamps beyond a 6 PM start and 8 PM finish:
   - Doors & first pint — 6 PM start, grab your beer (on us) and your seat
   - The talk — 45 minutes on one hot AI topic
   - Live performance — a short act while participants submit their questions for the speaker or panelists
   - Moderator-led Q&A — the session moderators read the submitted questions towards the end
   - Afters & networking — from 8 PM, the conversations keep flowing
4. **Topic card becomes "The topics on stage"** — the bento card no longer says speakers pick a topic; copy states moderators assign each speaker their topic. The card displays the upcoming session topics (Agentic Security & Governance, AI in Industries, AI in Finance, AI in the Developer Ecosystem) as expand/collapse rows — tapping a topic reveals a short detail line on what the session covers; tapping again collapses it. Smooth height animation, chevron rotation, one topic open at a time.
5. **Deck & PRD refresh** — pitch deck PPTX rebuilt with the new name/tagline, Delhi-only market slide (single wide Delhi image + next-city teaser card), aitaproom.club on the closing slide and footers; the PDF version regenerated from the same rebuilt deck; PRD document updated with the new name, domain, Delhi NCR launch scope, the moderator-assigned topic flow, and the new event-evening format including the live-performance question collection.

## User flow

Unchanged journey, refreshed surface: land on the AI Taproom hero → scroll the concept → walk the five-beat evening (noticing the live performance and how questions get collected) → open and close topics in the bento to see what sessions cover → confirm Delhi NCR as the launch city → join the waitlist (Corporate / Speaker / Member). Deck and PRD tell the same story for investors and partners.

## UI/UX feel

Art direction stays exactly as built — warm amber on off-white, Fraunces + Manrope, grain overlay, lenis momentum scroll, framer-motion reveals, parallax hero. The new accordion adds one purposeful micro-interaction (animated height, rotating chevron, amber highlight on the open row); the timeline card for the live performance gets its own distinct treatment (music/performance icon) so the new beat feels native to the row.

## Implementation phases

**Phase 1 — now:** everything above is one pass: rebrand across landing page + meta + favicon, Delhi-only edits, timeline rework with the performance beat, topics accordion card, rebuilt PPTX, rebuilt PDF, updated PRD — then end-to-end re-verification (waitlist still persists, desktop + mobile screenshots, deck/PDF download links live).

**Phase 2 — after launch validation:** unchanged — accounts, Explore feed, points/leaderboard, event pages with forums and Circles, speaker onboarding with AI curriculum builder (topics now arrive moderator-assigned).

**Phase 3 — monetisation and scale:** unchanged — paid certifications with points redemption, corporate plans, production AI summaries, more cities, ticketing.

## Assumptions

- "Brewed Intelligence" survives only as the tagline/heritage line under "AI Taproom" — the product name is AI Taproom everywhere.
- The existing SVG logo mark (beer-foam + neural nodes) is kept as-is; only the wordmark text next to it changes. Favicon unchanged.
- Delhi NCR-only presentation: no Hyderabad mention anywhere as a launch city; the "next cities" teaser stays generic (no city named as committed).
- Timeline uses no intermediate timestamps (per your choice) — only "6 PM" on the first beat and "8 PM" as the finish, with the talk noted as 45 minutes and the performance as a short act.
- Topic accordion detail lines are short, generic session descriptions written as sample copy — clearly illustrative, not claims about booked speakers or dates.
- aitaproom.club is used in canonical/OG/closing-slide text now, even though domain wiring happens outside this build.
- Waitlist database stays untouched — the rebrand is presentation-only; existing entries remain valid.
