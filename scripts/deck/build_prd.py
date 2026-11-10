"""Builds the AI Taproom PRD (DOCX) from the shared research document."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

INK = RGBColor(0x1C, 0x19, 0x17)
AMBER = RGBColor(0xB4, 0x53, 0x09)
GREY = RGBColor(0x57, 0x53, 0x4E)

doc = Document()

style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(10.5)
style.font.color.rgb = INK
for section in doc.sections:
    section.left_margin = Inches(0.9)
    section.right_margin = Inches(0.9)
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)


def shade(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), hex_color)
    tcPr.append(shd)


def h1(t):
    p = doc.add_heading(t, level=1)
    for r in p.runs:
        r.font.name = "Georgia"
        r.font.color.rgb = INK
        r.font.size = Pt(17)
    return p


def h2(t):
    p = doc.add_heading(t, level=2)
    for r in p.runs:
        r.font.name = "Georgia"
        r.font.color.rgb = AMBER
        r.font.size = Pt(13)
    return p


def para(t, bold=False, italic=False, size=10.5, color=None, space_after=6):
    p = doc.add_paragraph()
    r = p.add_run(t)
    r.bold = bold
    r.italic = italic
    r.font.size = Pt(size)
    r.font.color.rgb = color or INK
    p.paragraph_format.space_after = Pt(space_after)
    return p


def bullets(items):
    for it in items:
        p = doc.add_paragraph(style="List Bullet")
        p.paragraph_format.space_after = Pt(2)
        if isinstance(it, tuple):
            r = p.add_run(it[0] + " — ")
            r.bold = True
            r.font.size = Pt(10.5)
            r2 = p.add_run(it[1])
            r2.font.size = Pt(10.5)
        else:
            r = p.add_run(it)
            r.font.size = Pt(10.5)


def table(headers, rows, widths=None, header_fill="78350F"):
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for j, htext in enumerate(headers):
        c = t.rows[0].cells[j]
        c.text = ""
        r = c.paragraphs[0].add_run(htext)
        r.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        shade(c, header_fill)
        if widths:
            c.width = Inches(widths[j])
    for i, row in enumerate(rows):
        cells = t.add_row().cells
        for j, val in enumerate(row):
            cells[j].text = ""
            r = cells[j].paragraphs[0].add_run(str(val))
            r.font.size = Pt(10)
            if widths:
                cells[j].width = Inches(widths[j])
        if i % 2 == 0:
            for c in cells:
                shade(c, "FAFAF9")
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    return t


# ---------- COVER ----------
para("PRODUCT REQUIREMENTS DOCUMENT", bold=True, size=12, color=AMBER, space_after=2)
p = doc.add_paragraph()
r = p.add_run("AI Taproom")
r.font.name = "Georgia"
r.font.size = Pt(34)
r.bold = True
p2 = doc.add_paragraph()
r2 = p2.add_run("Where India talks AI — over a pint.  (Brewed as Brewed Intelligence.)")
r2.font.name = "Georgia"
r2.font.size = Pt(14)
r2.italic = True
r2.font.color.rgb = GREY
para("An AI-powered professional community platform for everything in AI, launching in Delhi NCR. "
     "Bar-hosted expert talks (first pint on us) plus an always-on platform: moderator-assigned topics with "
     "AI-built curricula, event knowledge packs, discussion forums, moderated Circles, an Explore feed, and a "
     "points-and-leaderboard economy redeemable against paid certification courses.", space_after=10)
meta = table(
    ["Field", "Value"],
    [
        ["Product", "AI Taproom — AI Community OS (brewed as Brewed Intelligence)"],
        ["Domain", "aitaproom.club"],
        ["Document version", "v1.1 — November 2026 (AI Taproom rebrand; Delhi NCR launch focus)"],
        ["Owner", "Founding team"],
        ["Status", "Landing page live with working waitlist; platform in Phase 1 planning"],
        ["Source basis", "Research synthesis (market scan, competitor analysis, product strategy) of Pint of View, daily.dev and the India AI community landscape"],
    ],
    widths=[1.6, 5.0],
)

# ---------- 1. VISION ----------
h1("1. Vision and strategy")
para("The long-term ambition is to become India's professional network and knowledge ecosystem for Artificial Intelligence — "
     "not an event company, and not another meetup group. The business has three distinct layers:")
bullets([
    ("Layer 1 — Community acquisition: the experiences", "events, bars, expert speakers, networking, workshops and future city chapters. This is how people discover us."),
    ("Layer 2 — Retention and engagement: the platform", "Explore, AI Circles, forums, XP, rewards, AI knowledge and member publishing. This is why people stay."),
    ("Layer 3 — Monetisation: the ecosystem", "corporate memberships, enterprise communities, courses, certifications, workshops and sponsorships. This is how the business scales."),
])
para("Core product principle: an event should not end when the speaker leaves the stage. Every event creates a continuing "
     "digital experience — knowledge pack, forum, Circle, connections and points — turning one-time attendees into active members.")

h1("2. Market context (research summary)")
para("Signals from the research synthesis; figures are survey findings, not TAM estimates, and should be revalidated before "
     "use in formal investor materials:")
table(
    ["Finding", "Signal", "Source"],
    [
        ["87%", "Indian enterprises actively using AI solutions", "NASSCOM, cited by PIB (Feb 2026)"],
        ["62%", "Enterprises reporting at-scale AI deployment in product development", "Deloitte State of AI in the Enterprise (Mar 2026)"],
        ["61%", "Organisations using upskilling/reskilling to address AI adoption", "Deloitte (2026)"],
        ["39%", "Cite regulatory/compliance requirements as a leading AI integration challenge", "Deloitte (2026)"],
    ],
    widths=[0.8, 4.2, 1.6],
)
para("Competitive landscape: the concept sits between existing categories — Pint of View (experience benchmark: curated "
     "lectures in relaxed venues), daily.dev (engagement benchmark: personalised feed, streaks, reputation), AGI House India, "
     "Indian AI Community, Indian Data Club (city chapters, challenges) and Meetup (local discovery). We do not claim to be "
     "India's first AI community; the differentiation is the integrated combination of AI-assisted event creation, corporate-first "
     "practitioner-led communities, an always-on content ecosystem and a unified reputation-and-rewards system.")
para("Launch market. Delhi NCR is the sole confirmed launch city (enterprise technology and consulting leaders, BFSI, "
     "cybersecurity, AI governance, corporate-sponsored executive sessions). Other Indian cities are on the roadmap but are "
     "not named as committed; the waitlist captures demand for where to pour next.", space_after=10)

h1("3. User personas")
table(
    ["Persona", "Who they are", "What they need"],
    [
        ["The corporate learner (primary)", "L&D leaders, managers and professionals in GCCs, IT services, BFSI and enterprise software in Delhi NCR", "Engaging, high-signal AI learning and networking for their teams; practical insight from practitioners, not keynotes"],
        ["The speaker", "Verified AI practitioners and experts willing to host a session", "A topic assigned by our moderators, AI help building the curriculum, and a room that is actually fun to present to"],
        ["The member", "AI-curious engineers, founders, analysts and students", "A place to discover what matters in AI, meet peers, be seen contributing, and earn recognition"],
        ["The sponsor / corporate partner", "Technology vendors, banks, GCCs, consulting firms", "Credible, labelled access to a curated AI audience; branded series, private Circles, workshops"],
    ],
    widths=[1.5, 2.6, 2.5],
)

h1("4. Product pillars and functional scope")
table(
    ["Pillar", "What it includes", "Phase"],
    [
        ["Experiences", "Bar-hosted evening events (6 PM doors, flowing past 8 PM), roundtables, workshops, ticketing. Five-beat format: doors & first pint → the talk (45 minutes) → live performance (audience submits questions for the speaker or panelists) → moderator-led Q&A (moderators read the submitted questions towards the end) → afters & networking (from 8 PM)", "1"],
        ["Retreats (premium tier)", "Weekend destination retreats for premium members — the same talk-over-drinks format and networking stretched across two days; points redeemable on seats and upgrades; exclusive member-only events. Candidate destinations: Goa, Jaipur, Coorg, Rishikesh (India) and Bali, Sri Lanka (international) — illustrative, shaped by member demand", "2–3"],
        ["AI Copilot", "Topic taxonomy assigned by moderators per speaker (Agentic AI; AI Security & Governance; AI in Enterprise, Finance, Healthcare; AI for Developers; Infrastructure; Generative AI; Research; AI Product & Startups; AI in Textiles & Supply Chain; Voice & Vernacular AI), AI-generated event curricula, post-event summarisation, personalised recommendations", "1–2"],
        ["Communities", "Per-event discussion forums, admin-moderated Circles (six at launch), private corporate Circles, networking", "1–2"],
        ["Explore", "Automated pull of AI blogs, news, research, podcasts, videos; member posts; personalised feed", "1–2"],
        ["Academy", "Paid courses, learning paths, assessments, certification tracks (points-redeemable)", "2–3"],
        ["Rewards", "XP points, streaks, achievements, leaderboards, redemption marketplace; XP kept separate from reputation and redeemable credits", "1–2"],
    ],
    widths=[1.2, 4.6, 0.8],
)

h1("5. Roadmap")
h2("Phase 1 — Community foundation (months 0–3) — foundation live")
bullets([
    "Landing page with waitlist capture (email + role: corporate / speaker / member) — SHIPPED, submissions persist to database",
    "Member registration and profiles; Delhi NCR event discovery; event registration and ticketing",
    "Speaker profiles with moderator-assigned topics; AI Event Copilot; event-specific forums",
    "Six initial AI Circles with moderators; Explore feed with curated content; basic XP and leaderboard",
    "Event check-in and feedback; admin and moderation dashboard",
])
para("Success criteria: members attend events, return to discussions and build relationships.", italic=True, color=GREY)
h2("Phase 2 — Always-on platform (months 3–6)")
bullets([
    "AI-generated event knowledge packs; personalised Explore recommendations; AI networking and attendee matching",
    "Member blogging and publishing; rewards redemption marketplace; paid courses and learning paths",
    "Speaker preparation workspace; corporate memberships; private corporate Circles; advanced analytics",
    "Premium weekend retreats — Indian and international destinations — with points redemption on seats and upgrades",
])
para("Success criteria: improved retention, paid conversion and corporate revenue.", italic=True, color=GREY)
h2("Phase 3 — Scale (months 6–12+)")
bullets([
    "Enterprise learning management; advanced AI knowledge assistant; corporate AI adoption communities",
    "Industry research reports; AI talent and expert discovery; partner certification programmes",
    "Additional city chapters beyond Delhi NCR; mobile apps; national AI community conference",
])
para("Success criteria: repeatable city economics, recurring enterprise contracts, defensible knowledge network.", italic=True, color=GREY)
h2("Deliberately out of scope for the MVP")
bullets([
    "Complex mobile apps before web engagement is validated; a full LMS built from scratch",
    "Tokens or complicated financial reward systems; open-ended AI chat without context",
    "Launching dozens of Circles without moderators; covering every AI category at once; expensive conferences before proving recurring demand",
])

h1("6. Go-to-market")
table(
    ["Period", "Execution (proposed operating targets)"],
    [
        ["Days 1–30", "Recruit 15–20 founding speakers and experts; sign 3–5 corporate partners; identify venues; recruit city ambassadors"],
        ["Days 31–60", "Launch first events in Delhi NCR; onboard founding members; open initial topic Circles"],
        ["Days 61–90", "Establish recurring events; publish event knowledge packs; activate Explore; introduce XP challenges"],
    ],
    widths=[1.1, 5.5],
)
bullets([
    ("Founding 100", "curated founding membership for the launch city — founding badge, early event access, priority Q&A, private roundtables, moderator opportunities. Curated for diversity of expertise, not job titles."),
    ("Corporate acquisition", "GCCs, IT services, banks and financial institutions, cybersecurity firms, enterprise software, AI startups, consulting firms — with concrete proposals: sponsor a knowledge series, own a private Circle, or buy an employee learning programme."),
    ("Partnerships", "AI model and cloud providers, technology and cybersecurity companies, universities, developer communities, coworking spaces and bars, learning providers, professional associations. No company is implied as a partner until an agreement is signed."),
])

h1("7. Business model")
para("Corporate product suite: corporate memberships (annual subscription), private AI Circles (enterprise subscription), "
     "AI learning programmes (per-seat or licence), corporate roundtables (sponsorship/hosted fee), custom events (per-event), "
     "AI workshops (per-workshop), thought leadership (sponsorship), talent connections (partnership fee).")
para("Five revenue streams with an illustrative long-term mix (planning assumptions, not a forecast): corporate subscriptions "
     "30%, sponsorships and events 25%, academy and courses 20%, corporate workshops 15%, premium membership 10%. Early revenue "
     "prioritises corporate subscriptions and sponsorships. Sponsored content must always be labelled; sponsors do not control "
     "independent discussion or member opinions.")
para("Premium tier: weekend AI retreats — Indian and international destinations (Goa, Jaipur, Coorg, Rishikesh; Bali and Sri "
     "Lanka as candidates) — with points redemption on seats and upgrades and exclusive member-only events. Retreat access is a "
     "premium-membership benefit.", space_after=10)

h1("8. Success metrics")
para("North-star metric: monthly active contributing members — not registered users.")
table(
    ["Category", "Metrics"],
    [
        ["Acquisition", "New members, corporate leads, event registrations"],
        ["Activation", "Profile completion, first event attendance, first Circle interaction"],
        ["Engagement", "Weekly active members, repeat attendance, discussions, content saves"],
        ["Monetisation", "Corporate conversion, ticket revenue, course conversion, sponsorship revenue"],
    ],
    widths=[1.3, 5.3],
)
para("First six-month validation targets (for validating the model — not forecasts): 1,000 registered members; 300 monthly "
     "active members; 5 corporate partners; 24 events hosted; 35–50 average attendance per event; 6 active Circles; 30% repeat "
     "event attendance; 100 member contributions per month. Event profitability is measured independently per venue.", space_after=10)

h1("9. Risks and mitigations")
table(
    ["Risk", "Mitigation"],
    [
        ["Cold start: empty forums look worse than a WhatsApp group", "Start with a handful of active Circles, seed discussions, assign real moderators"],
        ["Content quality: generic AI news has no moat", "Expert commentary, practical enterprise insight, original member contributions, quality curation"],
        ["Speaker quality defines the brand", "Moderator-assigned topics, speaker verification, editorial review, post-event feedback"],
        ["Points inflation leads to spam", "Keep XP, reputation and redeemable credits separate; cap trivial interactions"],
        ["Event economics", "Model venue, drinks, speakers, tickets and sponsorship per venue in Delhi NCR; model future cities separately before launch"],
        ["Data privacy and AI consent", "Design for DPDP Rules 2025 (notified November 2025): transparent collection, purpose limitation, consent, security, user rights; legal review of obligations"],
        ["Corporate confidentiality", "Private Circles need access controls, moderation, confidentiality settings; clean separation from public content"],
        ["Trust in certifications", "Verify instructors and partners; distinguish completion certificates from accredited qualifications"],
    ],
    widths=[3.1, 3.5],
)

h1("10. Technology architecture (recommended)")
table(
    ["Layer", "Technology"],
    [
        ["Web application", "Next.js + TypeScript (current landing page: React + FastAPI + MongoDB)"],
        ["Backend / database", "Modular Node.js or Python services; PostgreSQL; OpenSearch; pgvector"],
        ["AI orchestration", "Python services + LLM APIs as separate modules: Event Copilot, Curriculum Generator, Content Intelligence, Event Summarisation, Recommendations, Community Assistant, Matchmaking, Learning Assistant"],
        ["Platform", "OAuth + enterprise SSO, WebSockets, S3-compatible storage, PostHog analytics, Razorpay payments, email/WhatsApp/push notifications"],
    ],
    widths=[1.5, 5.1],
)

h1("11. What's already built")
bullets([
    "Landing page (React, Tailwind, Framer Motion, Lenis) branded AI Taproom: kinetic hero, concept story, five-beat evening timeline (6 PM doors, live-performance question collection, moderator-led Q&A, from 8 PM networking), feature bento with an expandable topics accordion, topics marquee, Delhi NCR launch card with next-city teaser, and footer — live in preview",
    "Working waitlist API (FastAPI + MongoDB): email + role capture, duplicate detection, count endpoint — verified end-to-end",
    "Custom SVG brand mark (beer-foam / neural-node) kept from Brewed Intelligence; favicon, SEO meta, canonical aitaproom.club, robots.txt, sitemap.xml and llms.txt",
    "Premium-tier retreats section (weekend destination format with India + international candidate destinations, points redemption) and an eight-session topics accordion including AI in Textiles, AI in Supply Chain, Voice & Vernacular AI and AI in Healthcare",
    "Investor pitch deck (15-slide PPTX + matching PDF) and this PRD, updated for the AI Taproom brand, Delhi NCR launch scope and the premium retreat tier",
])

doc.add_paragraph()
para("Prepared from the shared research synthesis (chatgpt.com/share/6aef156c) and the earlier concept document "
     "(chatgpt.com/share/6aeef8de). Market figures are survey findings from PIB (Feb 2026) and Deloitte (Mar 2026) as cited "
     "in the research; revalidate before formal investor use. v1.1: rebranded to AI Taproom (aitaproom.club), Delhi NCR-only "
     "launch scope, moderator-assigned topic flow and the five-beat event-evening format.", italic=True, size=9, color=GREY)

out = "/app/frontend/public/ai-taproom-prd.docx"
doc.save(out)
print("saved", out)
