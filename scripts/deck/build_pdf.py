"""Renders the AI Taproom pitch deck as a polished, vector PDF (16:9)."""
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from PIL import Image
import os

PAGE_W, PAGE_H = 960, 540  # pt (13.333 x 7.5 in)

INK = HexColor("#1C1917")
INK_CARD = HexColor("#292522")
AMBER = HexColor("#D97706")
AMBER_L = HexColor("#FCD34D")
CREAM = HexColor("#FEF3C7")
ESPRESSO = HexColor("#78350F")
ESP_DARK = HexColor("#5C280A")
FOAM = HexColor("#FAFAF9")
WHITE = HexColor("#FFFFFF")
GREY = HexColor("#57534E")
SOFT = HexColor("#D6D3D1")
FAINT = HexColor("#A8A29E")
LINE = HexColor("#E7E5E4")
IMGDIR = "/app/scripts/deck/deckimg"
FDIR = "/app/scripts/deck/fonts"

pdfmetrics.registerFont(TTFont("Fraunces", f"{FDIR}/Fraunces-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("Fraunces-Bold", f"{FDIR}/Fraunces-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Fraunces-Italic", f"{FDIR}/Fraunces-Italic.ttf"))
pdfmetrics.registerFont(TTFont("Manrope", f"{FDIR}/Manrope-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Manrope-Bold", f"{FDIR}/Manrope-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("Manrope-XBold", f"{FDIR}/Manrope-ExtraBold.ttf"))

c = canvas.Canvas("/app/frontend/public/ai-taproom-pitch-deck.pdf", pagesize=(PAGE_W, PAGE_H))
c.setTitle("AI Taproom — Investor & Partner Pitch")
c.setAuthor("AI Taproom")


def wrap(text, font, size, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if pdfmetrics.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def text(x, y, s, font="Manrope", size=12, color=INK, align="l", max_w=None, leading=None):
    c.setFillColor(color)
    lead = leading or size * 1.25
    if max_w:
        for ln in wrap(s, font, size, max_w):
            draw_line(ln, x, y, font, size, align)
            y -= lead
        return y
    draw_line(s, x, y, font, size, align)
    return y


def draw_line(s, x, y, font, size, align):
    if align == "c":
        c.drawCentredString(x, y, s)
    elif align == "r":
        c.drawRightString(x, y, s)
    else:
        c.drawString(x, y, s)


def rect(x, y, w, h, color):
    c.setFillColor(color)
    c.rect(x, y, w, h, stroke=0, fill=1)


def img_cover(path, x, y, w, h, darken=1.0):
    im = Image.open(path)
    iw, ih = im.size
    box_ar, img_ar = w / h, iw / ih
    if img_ar > box_ar:
        nw = int(ih * box_ar)
        im = im.crop(((iw - nw) // 2, 0, (iw - nw) // 2 + nw, ih))
    else:
        nh = int(iw / box_ar)
        im = im.crop((0, (ih - nh) // 2, iw, (ih - nh) // 2 + nh))
    if darken != 1.0:
        im = Image.eval(im, lambda px: int(px * darken))
    tmp = "/app/scripts/deck/deckimg/_pdf_crop.jpg"
    im.save(tmp, quality=88)
    c.drawImage(tmp, x, y, w, h)


def chip(x, y, w, label, fill=CREAM, fg=ESPRESSO, h=26):
    rect(x, y, w, h, fill)
    c.setFillColor(fg)
    c.setFont("Manrope-XBold", 9.5)
    c.drawCentredString(x + w / 2, y + h / 2 - 3.2, label)


def eyebrow(label, color=AMBER):
    text(50, PAGE_H - 44, label.upper(), "Manrope-XBold", 10, color)


def head(title_lines, color=INK, size=33, y=None):
    yy = y or (PAGE_H - 88)
    for t in title_lines:
        text(50, yy, t, "Fraunces-Bold", size, color)
        yy -= size * 1.16
    return yy


def footer(n, dark=False):
    col = FAINT if dark else GREY
    text(50, 22, "AI Taproom — confidential", "Manrope", 8, col)
    text(PAGE_W - 60, 22, f"{n:02d}", "Manrope-XBold", 8, col, align="r")


M = 50
CW = PAGE_W - 2 * M

# ---------- 1. COVER ----------
rect(0, 0, PAGE_W, PAGE_H, INK)
img_cover(f"{IMGDIR}/bar.jpg", 556, 0, PAGE_W - 556, PAGE_H, darken=0.62)
rect(556, 46, PAGE_W - 556, 62, ESPRESSO)
text(576, 72, "One pint. One talk. One idea that sticks.", "Fraunces-Italic", 13, WHITE)
chip(M, PAGE_H - 118, 230, "COMING SOON: DELHI NCR")
yy = PAGE_H - 200
for t in ["Where India", "talks AI —", "over a pint."]:
    text(M, yy, t, "Fraunces-Bold", 52, FOAM)
    yy -= 56
text(M, 208, "An AI-powered professional community for everything in AI — bar-hosted", "Manrope", 12.5, SOFT)
text(M, 190, "talks with the first pint on us, and a platform that turns every", "Manrope", 12.5, SOFT)
text(M, 172, "conversation into curriculum, knowledge and career growth.", "Manrope", 12.5, SOFT)
text(M, 118, "AI Taproom", "Fraunces-Bold", 19, AMBER_L)
text(M, 98, "Brewed Intelligence  |  Investor & partner pitch — 2026", "Manrope", 9.5, FAINT)
c.showPage()

# ---------- 2. PROBLEM ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("The problem")
head(["AI is transforming industries.", "The knowledge isn't keeping up."])
items = [
    ("Fragmented knowledge", "AI insight is scattered across events, feeds and WhatsApp groups — noise over signal."),
    ("Transactional events", "Talks end when the speaker leaves; nothing is captured, continued or built upon."),
    ("Peer discovery is hard", "Professionals struggle to find the people facing the same AI challenges."),
    ("Corporate learning is disconnected", "Company AI training rarely touches the practitioners actually deploying it."),
]
for i, (t, d) in enumerate(items):
    xx = M + (i % 2) * 448
    yy0 = 210 - (i // 2) * 150
    rect(xx, yy0, 412, 128, WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.rect(xx, yy0, 412, 128, stroke=1, fill=0)
    rect(xx, yy0, 5, 128, AMBER)
    text(xx + 22, yy0 + 94, t, "Fraunces-Bold", 15.5, INK)
    yy2 = yy0 + 68
    for ln in wrap(d, "Manrope", 10.5, 370):
        text(xx + 22, yy2, ln, "Manrope", 10.5, GREY)
        yy2 -= 15
footer(2)
c.showPage()

# ---------- 3. OPPORTUNITY ----------
rect(0, 0, PAGE_W, PAGE_H, INK)
eyebrow("The opportunity — why now", AMBER_L)
head(["India's AI adoption has outpaced its", "places to talk about it."], FOAM)
stats = [
    ("87%", "Indian enterprises actively using AI", "NASSCOM, cited by PIB, Feb 2026"),
    ("62%", "Enterprises deploying AI at scale in product development", "Deloitte State of AI, Mar 2026"),
    ("61%", "Organisations tackling AI adoption via upskilling", "Deloitte, 2026"),
    ("39%", "Cite governance & compliance as a leading challenge", "Deloitte, 2026"),
]
for i, (num, lab, src) in enumerate(stats):
    xx = M + i * 222
    rect(xx, 128, 206, 246, INK_CARD)
    text(xx + 16, 322, num, "Fraunces-Bold", 38, AMBER_L)
    yy2 = 268
    for ln in wrap(lab, "Manrope-Bold", 10.5, 176):
        text(xx + 16, yy2, ln, "Manrope-Bold", 10.5, FOAM)
        yy2 -= 14
    yy2 -= 4
    for ln in wrap(src, "Manrope", 8, 176):
        text(xx + 16, yy2, ln, "Manrope", 8, FAINT)
        yy2 -= 11
text(M, 84, "Survey findings used as market signals — not TAM estimates. The gap isn't more AI content;", "Manrope", 10.5, SOFT)
text(M, 70, "it's a place where practitioners exchange real experience.", "Manrope", 10.5, SOFT)
footer(3, dark=True)
c.showPage()

# ---------- 4. SOLUTION ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("Our solution")
head(["One platform, three reinforcing layers."])
layers = [
    ("01", "The experiences", "Bar-hosted AI talks, workshops and networking. The first pint is on us.", "HOW PEOPLE DISCOVER US", CREAM, INK, GREY, ESPRESSO),
    ("02", "The platform", "Explore feed, AI Circles, forums, points & leaderboards, AI-built knowledge.", "WHY MEMBERS STAY", INK_CARD, FOAM, SOFT, AMBER_L),
    ("03", "The ecosystem", "Corporate memberships, private Circles, courses, certifications, sponsorships.", "HOW THE BUSINESS SCALES", ESPRESSO, WHITE, HexColor("#F6F2EE"), AMBER_L),
]
for i, (n, t, d, tag, fill, fg, sub, numcol) in enumerate(layers):
    xx = M + i * 298
    rect(xx, 130, 276, 300, fill)
    text(xx + 22, 400, n, "Manrope-XBold", 11, numcol)
    text(xx + 22, 366, t, "Fraunces-Bold", 21, fg)
    yy2 = 322
    for ln in wrap(d, "Manrope", 11.5, 232):
        text(xx + 22, yy2, ln, "Manrope", 11.5, sub)
        yy2 -= 17
    text(xx + 22, 158, tag, "Manrope-XBold", 8.5, AMBER)
footer(4)
c.showPage()

# ---------- 5. SIX PILLARS ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("The product")
head(["The AI Community OS — six pillars."])
pillars = [
    ("01", "Experiences", "Curated bar talks, roundtables and networking evenings."),
    ("02", "AI Copilot", "Moderator-assigned topics, AI-built curricula, event summaries."),
    ("03", "Communities", "Event forums and admin-moderated topic Circles."),
    ("04", "Explore", "Latest AI news, blogs, podcasts and member posts."),
    ("05", "Academy", "Courses, learning paths and certification tracks."),
    ("06", "Rewards", "Points, streaks, leaderboards and a redemption marketplace."),
]
for i, (n, t, d) in enumerate(pillars):
    xx = M + (i % 3) * 298
    yy0 = 190 - (i // 3) * 118
    rect(xx, yy0, 276, 100, WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.rect(xx, yy0, 276, 100, stroke=1, fill=0)
    text(xx + 18, yy0 + 74, n, "Manrope-XBold", 9, AMBER)
    text(xx + 18, yy0 + 52, t, "Fraunces-Bold", 16, INK)
    yy2 = yy0 + 30
    for ln in wrap(d, "Manrope", 9.5, 240):
        text(xx + 18, yy2, ln, "Manrope", 9.5, GREY)
        yy2 -= 13
footer(5)
c.showPage()

# ---------- 6. EXPERIENCE ----------
rect(0, 0, PAGE_W, PAGE_H, INK)
eyebrow("The experience", AMBER_L)
head(["Less conference. More conversation."], FOAM)
imgs = [
    ("lecture.jpg", "The talk", "One expert, one hot AI topic, 45 minutes."),
    ("drinks.jpg", "The pint", "Light drinks on us while you learn."),
    ("networking.jpg", "The after", "Networking that flows as easily as the round."),
]
for i, (f, t, d) in enumerate(imgs):
    xx = M + i * 298
    img_cover(f"{IMGDIR}/{f}", xx, 128, 276, 240, darken=0.9)
    rect(xx, 128, 276, 74, INK)
    text(xx + 16, 178, t, "Fraunces-Bold", 15, FOAM)
    yy2 = 158
    for ln in wrap(d, "Manrope", 8.5, 244):
        text(xx + 16, yy2, ln, "Manrope", 8.5, SOFT)
        yy2 -= 12
text(M, 92, "Doors at 6 PM; the night flows past 8 PM. A live performance beat keeps the room fresh while the", "Manrope", 10, SOFT)
text(M, 78, "audience submits questions the moderators read in Q&A — and an AI knowledge pack lands in every inbox after.", "Manrope", 10, SOFT)
footer(6, dark=True)
c.showPage()

# ---------- 7. FLYWHEEL ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("How it compounds")
head(["The event-to-community flywheel."])
steps = [
    ("Discover", "Latest AI topics, events and content in Explore"),
    ("Connect", "Bar events, expert Q&A, real relationships"),
    ("Learn", "AI knowledge packs, courses, structured learning"),
    ("Contribute", "Forums, Circles, blogs and member expertise"),
    ("Earn & grow", "XP, reputation, recognition and rewards"),
]
for i, (t, d) in enumerate(steps):
    xx = M + i * 178
    cx, cy, r = xx + 62, 300, 56
    c.setFillColor(AMBER if i % 2 == 0 else ESPRESSO)
    c.circle(cx, cy, r, stroke=0, fill=1)
    c.setFillColor(INK if i % 2 == 0 else WHITE)
    c.setFont("Manrope-XBold", 11)
    c.drawCentredString(cx, cy - 3, t)
    yy2 = 218
    for ln in wrap(d, "Manrope", 9, 150):
        text(cx, yy2, ln, "Manrope", 9, GREY, align="c")
        yy2 -= 12
    if i < 4:
        c.setFillColor(LINE)
        c.setFont("Manrope-XBold", 16)
        c.drawString(xx + 128, 296, "\u2192")
rect(M, 78, CW, 42, CREAM)
text(M + 18, 94, "…and every return adds knowledge, relationships and reasons to come back — the loop feeds itself.", "Manrope-Bold", 10.5, ESPRESSO)
footer(7)
c.showPage()

# ---------- 8. AI DIFFERENTIATOR ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("AI as our differentiator")
head(["The AI layer makes the community useful."])
feats = [
    ("Speaker Copilot", "Moderators assign each speaker a hot topic — agentic security, AI in finance, the developer ecosystem — and AI helps build the talk's curriculum."),
    ("Event intelligence", "AI summarises every session into takeaways and reading lists, delivered while members network."),
    ("Personalised Explore", "Blogs, events, podcasts and member posts pulled in and ranked around each member's interests."),
    ("Networking & Circles", "Attendee matchmaking and moderated topic circles — e.g. AI Security Posture Management."),
]
for i, (t, d) in enumerate(feats):
    xx = M + (i % 2) * 448
    yy0 = 196 - (i // 2) * 152
    rect(xx, yy0, 412, 130, WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.rect(xx, yy0, 412, 130, stroke=1, fill=0)
    rect(xx, yy0, 5, 130, AMBER)
    text(xx + 22, yy0 + 96, t, "Fraunces-Bold", 15.5, INK)
    yy2 = yy0 + 70
    for ln in wrap(d, "Manrope", 10, 368):
        text(xx + 22, yy2, ln, "Manrope", 10, GREY)
        yy2 -= 14
footer(8)
c.showPage()

# ---------- 9. MARKET & LAUNCH ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("Launch market")
head(["Delhi NCR first. The rest follows."])
img_cover(f"{IMGDIR}/delhi.jpg", M, 148, 520, 250, darken=0.85)
rect(M, 148, 520, 64, INK)
text(M + 18, 178, "Delhi NCR — enterprise & governance", "Fraunces-Bold", 13.5, FOAM)
text(M + 18, 158, "BFSI, cybersecurity, consulting, corporate roundtables", "Manrope", 8.5, SOFT)
rect(610, 148, 300, 250, CREAM)
c.setStrokeColor(AMBER)
c.setLineWidth(1.5)
c.rect(610, 148, 300, 250, stroke=1, fill=0)
yy2 = 358
for ln in wrap("Your city next?", "Fraunces-Bold", 19, 260):
    text(630, yy2, ln, "Fraunces-Bold", 19, INK)
    yy2 -= 26
yy2 -= 6
for ln in wrap("More Indian cities are on the roadmap. The waitlist decides where we pour next.", "Manrope", 11, 260):
    text(630, yy2, ln, "Manrope", 11, GREY)
    yy2 -= 16
text(630, 168, "aitaproom.club", "Manrope-XBold", 11.5, AMBER)
text(M, 118, "First 90 days (proposed operating targets):", "Manrope-XBold", 11, INK)
yy2 = 100
for ln in wrap("recruit 15–20 founding speakers, sign 3–5 corporate partners, launch recurring events in Delhi NCR, "
               "open six topic Circles, and onboard a curated Founding 100.", "Manrope", 11, 820):
    text(M + 18, yy2, ln, "Manrope", 11, GREY)
    yy2 -= 16
footer(9)
c.showPage()

# ---------- 10. COMPETITION ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("Positioning")
head(["Not another meetup. The connective tissue."])
rows = [
    ("Pint of View", "EXPERIENCE BENCHMARK", "Curated lectures in relaxed venues — the event craft we're building on."),
    ("daily.dev", "ENGAGEMENT BENCHMARK", "Personalised feed, streaks, reputation and rewards — the habit loop."),
    ("AGI House / Indian AI Community / Indian Data Club", "COMMUNITY BENCHMARKS", "City chapters, challenges and events — proof the demand exists."),
    ("Meetup / event platforms", "DISCOVERY LAYER", "Local groups and listings — fragmented, transactional, no memory."),
]
yy0 = 196
for name, kind, note in rows:
    rect(M, yy0 - 62, CW, 54, WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.rect(M, yy0 - 62, CW, 54, stroke=1, fill=0)
    for j, ln in enumerate(wrap(name, "Fraunces-Bold", 11.5, 250)):
        text(M + 18, yy0 - 34 - j * 14, ln, "Fraunces-Bold", 11.5, INK)
    text(M + 300, yy0 - 34, kind, "Manrope-XBold", 8.5, AMBER)
    text(M + 480, yy0 - 34, note, "Manrope", 9.5, GREY)
    yy0 -= 66
text(M, 92, "We don't claim to be India's first AI community. We combine events + knowledge + reputation", "Manrope-Bold", 10.5, ESPRESSO)
text(M, 78, "into one always-on ecosystem — nobody owns that today.", "Manrope-Bold", 10.5, ESPRESSO)
footer(10)
c.showPage()

# ---------- 11. BUSINESS MODEL ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("Business model")
head(["Corporate-first monetisation, five streams."])
streams = [
    ("Corporate subscriptions", "30%", "Memberships for teams; events, communities & premium learning."),
    ("Sponsorships & events", "25%", "Branded AI knowledge series and hosted roundtables."),
    ("Academy & courses", "20%", "Paid certification courses — points redeemable against them."),
    ("Corporate workshops", "15%", "Technical and executive AI workshops, per-session."),
    ("Premium membership", "10%", "Individual power users who want more."),
]
yy0 = 168
for t, pct, d in streams:
    text(M, yy0, t, "Fraunces-Bold", 13, INK)
    bar_w = 330 * int(pct.strip("%")) / 30
    rect(M + 290, yy0 - 6, bar_w, 16, AMBER)
    text(M + 290 + 340, yy0, pct, "Manrope-XBold", 11.5, AMBER)
    text(M + 290, yy0 - 20, d, "Manrope", 9, GREY)
    yy0 -= 58
text(M, 96, "Illustrative long-term mix for planning — not a forecast. Early revenue prioritises corporate", "Manrope", 9.5, GREY)
text(M, 82, "subscriptions and sponsorships.", "Manrope", 9.5, GREY)
footer(11)
c.showPage()

# ---------- 12. ROADMAP ----------
rect(0, 0, PAGE_W, PAGE_H, FOAM)
eyebrow("Roadmap")
head(["Disciplined in three phases."])
phases = [
    ("PHASE 1 · MONTHS 0–3", "Community foundation",
     "Waitlist & registration, city events, moderator-assigned topics with the speaker copilot, event forums, six Circles, Explore feed, basic XP & leaderboard. Landing page and waitlist are live today.",
     "Prove members attend, return and build relationships.", WHITE, INK, GREY, AMBER),
    ("PHASE 2 · MONTHS 3–6", "Always-on platform",
     "AI knowledge packs, personalised Explore, AI networking, member publishing, rewards marketplace, paid courses, corporate memberships & private Circles.",
     "Grow retention, paid conversion and corporate revenue.", WHITE, INK, GREY, AMBER),
    ("PHASE 3 · MONTHS 6–12+", "The ecosystem",
     "Enterprise learning, expert directory, research reports, partner certifications, new city chapters, national conference.",
     "Repeatable city economics and recurring enterprise contracts.", ESPRESSO, WHITE, HexColor("#F6F2EE"), AMBER_L),
]
for i, (ph, t, d, crit, fill, fg, sub, phc) in enumerate(phases):
    xx = M + i * 298
    rect(xx, 116, 276, 316, fill)
    if i < 2:
        c.setStrokeColor(LINE)
        c.setLineWidth(1)
        c.rect(xx, 116, 276, 316, stroke=1, fill=0)
    text(xx + 20, 404, ph, "Manrope-XBold", 8.5, phc)
    text(xx + 20, 376, t, "Fraunces-Bold", 18, fg)
    yy2 = 344
    for ln in wrap(d, "Manrope", 9.5, 236):
        text(xx + 20, yy2, ln, "Manrope", 9.5, sub)
        yy2 -= 13.5
    yy2 -= 4
    for ln in wrap("Success: " + crit, "Manrope-Bold", 9, 236):
        text(xx + 20, yy2, ln, "Manrope-Bold", 9, sub if i == 2 else AMBER)
        yy2 -= 13
footer(12)
c.showPage()

# ---------- 13. VALIDATION TARGETS ----------
rect(0, 0, PAGE_W, PAGE_H, INK)
eyebrow("What we're proving", AMBER_L)
head(["First six-month validation targets."], FOAM)
targets = [
    ("1,000", "Registered members"), ("300", "Monthly active members"),
    ("5", "Corporate partners"), ("24", "Events hosted"),
    ("35–50", "Avg. attendance per event"), ("6", "Active topic Circles"),
    ("30%", "Repeat event attendance"), ("100", "Member contributions / month"),
]
for i, (n, lab) in enumerate(targets):
    xx = M + (i % 4) * 222
    yy0 = 232 - (i // 4) * 100
    rect(xx, yy0 - 78, 206, 82, INK_CARD)
    text(xx + 16, yy0 - 30, n, "Fraunces-Bold", 21, AMBER_L)
    text(xx + 16, yy0 - 52, lab, "Manrope", 9.5, FOAM)
text(M, 82, "Targets for validating the model — not forecasts. North-star metric: monthly active contributing members.", "Manrope", 10, SOFT)
footer(13, dark=True)
c.showPage()

# ---------- 14. VISION & ASK ----------
rect(0, 0, PAGE_W, PAGE_H, ESPRESSO)
text(M, PAGE_H - 130, "Become India's professional network", "Fraunces-Bold", 34, WHITE)
text(M, PAGE_H - 172, "and knowledge ecosystem for AI.", "Fraunces-Bold", 34, AMBER_L)
yy2 = PAGE_H - 226
for ln in wrap("The events create relationships. The platform preserves knowledge. The AI layer makes that knowledge "
               "useful. The rewards create habits. Corporate subscriptions make it sustainable.", "Manrope", 13, 780):
    text(M, yy2, ln, "Manrope", 13, HexColor("#F6F2EE"))
    yy2 -= 20
asks = [
    ("INVEST", "Seed capital for platform build-out and first-year city operations."),
    ("PARTNER", "Founding corporate partners: sponsor a series, own a Circle, train your teams."),
    ("SPEAK", "Founding speakers: bring your expertise, we'll build the room."),
]
for i, (t, d) in enumerate(asks):
    xx = M + i * 298
    rect(xx, 92, 276, 110, ESP_DARK)
    text(xx + 20, 178, t, "Manrope-XBold", 10, AMBER_L)
    yy2 = 156
    for ln in wrap(d, "Manrope", 9.5, 236):
        text(xx + 20, yy2, ln, "Manrope", 9.5, WHITE)
        yy2 -= 13
text(M, 48, "aitaproom.club  ·  Delhi NCR  ·  Join the waitlist today", "Manrope-Bold", 10, HexColor("#F6F2EE"))
c.showPage()

c.save()
print("saved /app/frontend/public/ai-taproom-pitch-deck.pdf")
