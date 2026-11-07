"""Builds the Brewed Intelligence 14-slide investor pitch deck (16:9 PPTX)."""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image
import os

INK = RGBColor(0x1C, 0x19, 0x17)
AMBER = RGBColor(0xD9, 0x77, 0x06)
AMBER_L = RGBColor(0xFC, 0xD3, 0x4D)
CREAM = RGBColor(0xFE, 0xF3, 0xC7)
ESPRESSO = RGBColor(0x78, 0x35, 0x0F)
FOAM = RGBColor(0xFA, 0xFA, 0xF9)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GREY = RGBColor(0x57, 0x53, 0x4E)
DISPLAY = "Georgia"
BODY = "Calibri"

IMG = "/app/scripts/deck/deckimg"
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]
W = Inches(13.333)
H = Inches(7.5)


def slide():
    return prs.slides.add_slide(BLANK)


def rect(s, x, y, w, h, color, line=False):
    sh = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    sh.shadow.inherit = False
    return sh


def bg(s, color=FOAM):
    rect(s, 0, 0, W, H, color)


def text(s, x, y, w, h, runs, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, space_after=6):
    """runs: list of paragraphs; each paragraph is a list of (text, size, bold, color, font, italic)."""
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    first = True
    for para in runs:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.alignment = align
        p.space_after = Pt(space_after)
        p.line_spacing = 1.04
        for t, size, bold, color, font, *rest in para:
            r = p.add_run()
            r.text = t
            r.font.size = Pt(size)
            r.font.bold = bold
            r.font.color.rgb = color
            r.font.name = font
            if rest and rest[0]:
                r.font.italic = True
    return tb


def pic_cover(s, path, x, y, w, h, darken=1.0):
    """Insert picture cropped to fill the box (like object-fit: cover)."""
    im = Image.open(path)
    iw, ih = im.size
    box_ar = w / h
    img_ar = iw / ih
    if img_ar > box_ar:  # image wider -> crop sides
        new_w = int(ih * box_ar)
        left = (iw - new_w) // 2
        im = im.crop((left, 0, left + new_w, ih))
    else:
        new_h = int(iw / box_ar)
        top = (ih - new_h) // 2
        im = im.crop((0, top, iw, top + new_h))
    if darken != 1.0:
        im = Image.eval(im, lambda px: int(px * darken))
    tmp = "/app/scripts/deck/deckimg/_crop.jpg"
    im.save(tmp, quality=88)
    return s.shapes.add_picture(tmp, x, y, w, h)


def eyebrow(s, label, x=Inches(0.9), y=Inches(0.55), color=AMBER):
    text(s, x, y, Inches(11.5), Inches(0.4),
         [[(label.upper(), 13, True, color, BODY)]], space_after=0)


def head(s, title, x=Inches(0.9), y=Inches(0.95), size=40, color=INK, w=Inches(11.5)):
    text(s, x, y, w, Inches(1.6),
         [[(title, size, True, color, DISPLAY)]], space_after=0)


def footer(s, n, dark=False):
    c = RGBColor(0xA8, 0xA2, 0x9E) if dark else GREY
    text(s, Inches(0.9), Inches(7.02), Inches(6), Inches(0.35),
         [[("Brewed Intelligence — confidential", 10, False, c, BODY)]], space_after=0)
    text(s, Inches(12.2), Inches(7.02), Inches(0.9), Inches(0.35),
         [[(f"{n:02d}", 10, True, c, BODY)]], align=PP_ALIGN.RIGHT, space_after=0)


def chip(s, x, y, w, label, fill=CREAM, fg=ESPRESSO):
    sh = rect(s, x, y, w, Inches(0.42), fill)
    sh.adjustments  # noqa
    tf = sh.text_frame
    tf.word_wrap = False
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = label
    r.font.size = Pt(12)
    r.font.bold = True
    r.font.color.rgb = fg
    r.font.name = BODY
    sh.text_frame.margin_top = Inches(0.04)
    sh.text_frame.margin_bottom = Inches(0.04)
    return sh


# ---------- 1. COVER ----------
s = slide()
bg(s, INK)
pic_cover(s, f"{IMG}/bar.jpg", Inches(7.4), 0, Inches(5.93), H, darken=0.62)
# gradient-ish band: a solid strip
rect(s, Inches(7.4), Inches(6.7), Inches(5.93), Inches(0.8), ESPRESSO)
text(s, Inches(7.7), Inches(6.82), Inches(5.4), Inches(0.6),
     [[("One pint. One talk. One idea that sticks.", 15, True, WHITE, DISPLAY, True)]], space_after=0)
# left panel
chip(s, Inches(0.9), Inches(1.15), Inches(3.6), "COMING SOON: DELHI NCR & HYDERABAD")
text(s, Inches(0.9), Inches(1.9), Inches(6.2), Inches(3.6),
     [[("Where India talks AI — over a pint.", 54, True, FOAM, DISPLAY)]], space_after=0)
text(s, Inches(0.9), Inches(4.35), Inches(5.9), Inches(1.6),
     [[("An AI-powered professional community for everything in AI — bar-hosted talks with the first pint on us, and a platform that turns every conversation into curriculum, knowledge and career growth.", 16, False, RGBColor(0xE7, 0xE5, 0xE4), BODY)]])
text(s, Inches(0.9), Inches(6.1), Inches(5.5), Inches(0.9),
     [[("Brewed Intelligence", 22, True, AMBER_L, DISPLAY),
       ("   |   Investor & partner pitch — 2026", 12, False, RGBColor(0xA8, 0xA2, 0x9E), BODY)]], space_after=0)

# ---------- 2. PROBLEM ----------
s = slide()
bg(s)
eyebrow(s, "The problem")
head(s, "AI is transforming industries.\nThe knowledge isn't keeping up.")
items = [
    ("Fragmented knowledge", "AI insight is scattered across events, feeds and WhatsApp groups — noise over signal."),
    ("Transactional events", "Talks end when the speaker leaves; nothing is captured, continued or built upon."),
    ("Peer discovery is hard", "Professionals struggle to find the people facing the same AI challenges."),
    ("Corporate learning is disconnected", "Company AI training rarely touches the practitioners actually deploying it."),
]
y = Inches(2.75)
for i, (t, d) in enumerate(items):
    xx = Inches(0.9) + (i % 2) * Inches(5.95)
    yy = y + (i // 2) * Inches(1.95)
    card = rect(s, xx, yy, Inches(5.6), Inches(1.7), WHITE)
    card.line.color.rgb = RGBColor(0xE7, 0xE5, 0xE4)
    card.line.width = Pt(1)
    rect(s, xx, yy, Inches(0.07), Inches(1.7), AMBER)
    text(s, xx + Inches(0.3), yy + Inches(0.18), Inches(5.0), Inches(1.4),
         [[(t, 17, True, INK, DISPLAY)],
          [(d, 13, False, GREY, BODY)]], space_after=4)
footer(s, 2)

# ---------- 3. OPPORTUNITY ----------
s = slide()
bg(s, INK)
eyebrow(s, "The opportunity — why now", color=AMBER_L)
head(s, "India's AI adoption has outpaced its\nplaces to talk about it.", color=FOAM)
stats = [
    ("87%", "Indian enterprises actively using AI", "NASSCOM, cited by PIB, Feb 2026"),
    ("62%", "Enterprises deploying AI at scale in product development", "Deloitte State of AI, Mar 2026"),
    ("61%", "Organisations tackling AI adoption via upskilling", "Deloitte, 2026"),
    ("39%", "Cite governance & compliance as a leading challenge", "Deloitte, 2026"),
]
for i, (num, lab, src) in enumerate(stats):
    xx = Inches(0.9) + i * Inches(2.95)
    card = rect(s, xx, Inches(3.15), Inches(2.75), Inches(2.9), RGBColor(0x29, 0x25, 0x22))
    text(s, xx + Inches(0.25), Inches(3.35), Inches(2.3), Inches(2.6),
         [[(num, 44, True, AMBER_L, DISPLAY)],
          [(lab, 13, True, FOAM, BODY)],
          [(src, 10, False, RGBColor(0xA8, 0xA2, 0x9E), BODY, True)]], space_after=8)
text(s, Inches(0.9), Inches(6.35), Inches(11.5), Inches(0.6),
     [[("Survey findings used as market signals — not TAM estimates. The gap isn't more AI content; it's a place where practitioners exchange real experience.", 13, False, RGBColor(0xD6, 0xD3, 0xD1), BODY, True)]], space_after=0)
footer(s, 3, dark=True)

# ---------- 4. SOLUTION ----------
s = slide()
bg(s)
eyebrow(s, "Our solution")
head(s, "One platform, three reinforcing layers.")
layers = [
    ("01", "The experiences", "Bar-hosted AI talks, workshops and networking. The first pint is on us.", "How people discover us", CREAM, ESPRESSO),
    ("02", "The platform", "Explore feed, AI Circles, forums, points & leaderboards, AI-built knowledge.", "Why members stay", RGBColor(0x29, 0x25, 0x22), FOAM),
    ("03", "The ecosystem", "Corporate memberships, private Circles, courses, certifications, sponsorships.", "How the business scales", ESPRESSO, WHITE),
]
for i, (n, t, d, tag, fill, fg) in enumerate(layers):
    xx = Inches(0.9) + i * Inches(3.95)
    card = rect(s, xx, Inches(2.8), Inches(3.7), Inches(3.6), fill)
    text(s, xx + Inches(0.35), Inches(3.05), Inches(3.0), Inches(3.2),
         [[(n, 15, True, AMBER if fill != CREAM else AMBER, BODY)],
          [(t, 24, True, fg, DISPLAY)],
          [(d, 14, False, fg if fill == ESPRESSO else GREY, BODY)]], space_after=10)
    text(s, xx + Inches(0.35), Inches(5.75), Inches(3.0), Inches(0.4),
         [[(tag.upper(), 11, True, AMBER if fill == RGBColor(0x29, 0x25, 0x22) else AMBER, BODY)]], space_after=0)
footer(s, 4)

# ---------- 5. PRODUCT: SIX PILLARS ----------
s = slide()
bg(s)
eyebrow(s, "The product")
head(s, "The AI Community OS — six pillars.")
pillars = [
    ("Experiences", "Curated bar talks, roundtables and networking evenings."),
    ("AI Copilot", "Speaker topic picker, AI-built curricula, event summaries."),
    ("Communities", "Event forums and admin-moderated topic Circles."),
    ("Explore", "Latest AI news, blogs, podcasts and member posts."),
    ("Academy", "Courses, learning paths and certification tracks."),
    ("Rewards", "Points, streaks, leaderboards and a redemption marketplace."),
]
for i, (t, d) in enumerate(pillars):
    xx = Inches(0.9) + (i % 3) * Inches(3.95)
    yy = Inches(2.7) + (i // 3) * Inches(2.0)
    card = rect(s, xx, yy, Inches(3.7), Inches(1.8), WHITE)
    card.line.color.rgb = RGBColor(0xE7, 0xE5, 0xE4)
    card.line.width = Pt(1)
    text(s, xx + Inches(0.3), yy + Inches(0.2), Inches(3.1), Inches(1.5),
         [[(f"0{i+1}", 12, True, AMBER, BODY)],
          [(t, 19, True, INK, DISPLAY)],
          [(d, 12.5, False, GREY, BODY)]], space_after=3)
footer(s, 5)

# ---------- 6. THE EVENING (IMAGES) ----------
s = slide()
bg(s, INK)
eyebrow(s, "The experience", color=AMBER_L)
head(s, "Less conference. More conversation.", color=FOAM)
imgs = [
    ("lecture.jpg", "The talk", "One expert, one hot AI topic, 45 minutes."),
    ("drinks.jpg", "The pint", "Light drinks on us while you learn."),
    ("networking.jpg", "The after", "Networking that flows as easily as the round."),
]
for i, (f, t, d) in enumerate(imgs):
    xx = Inches(0.9) + i * Inches(3.95)
    pic_cover(s, f"{IMG}/{f}", xx, Inches(2.55), Inches(3.7), Inches(3.3))
    cap = rect(s, xx, Inches(4.75), Inches(3.7), Inches(1.1), INK)
    text(s, xx + Inches(0.25), Inches(4.85), Inches(3.25), Inches(0.95),
         [[(t, 18, True, FOAM, DISPLAY)],
          [(d, 11.5, False, RGBColor(0xD6, 0xD3, 0xD1), BODY)]], space_after=2)
text(s, Inches(0.9), Inches(6.25), Inches(11.5), Inches(0.5),
     [[("Every evening ends with an AI-generated knowledge pack in every attendee's inbox — the event keeps working after the stage lights go down.", 13, False, RGBColor(0xD6, 0xD3, 0xD1), BODY, True)]], space_after=0)
footer(s, 6, dark=True)

# ---------- 7. FLYWHEEL ----------
s = slide()
bg(s)
eyebrow(s, "How it compounds")
head(s, "The event-to-community flywheel.")
steps = ["Discover", "Connect", "Learn", "Contribute", "Earn & grow"]
descs = [
    "Latest AI topics, events and content in Explore",
    "Bar events, expert Q&A, real relationships",
    "AI knowledge packs, courses, structured learning",
    "Forums, Circles, blogs and member expertise",
    "XP, reputation, recognition and rewards",
]
for i, (t, d) in enumerate(zip(steps, descs)):
    xx = Inches(0.9) + i * Inches(2.45)
    circ = s.shapes.add_shape(MSO_SHAPE.OVAL, xx, Inches(2.9), Inches(1.7), Inches(1.7))
    circ.fill.solid()
    circ.fill.fore_color.rgb = AMBER if i % 2 == 0 else ESPRESSO
    circ.line.fill.background()
    circ.shadow.inherit = False
    tf = circ.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = t
    r.font.size = Pt(14)
    r.font.bold = True
    r.font.color.rgb = INK if i % 2 == 0 else WHITE
    r.font.name = BODY
    text(s, xx - Inches(0.25), Inches(4.8), Inches(2.2), Inches(1.3),
         [[(d, 11.5, False, GREY, BODY)]], align=PP_ALIGN.CENTER, space_after=0)
    if i < 4:
        ar = s.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, xx + Inches(1.78), Inches(3.55), Inches(0.6), Inches(0.4))
        ar.fill.solid()
        ar.fill.fore_color.rgb = RGBColor(0xE7, 0xE5, 0xE4)
        ar.line.fill.background()
        ar.shadow.inherit = False
loop = rect(s, Inches(0.9), Inches(6.1), Inches(11.53), Inches(0.7), CREAM)
text(s, Inches(1.15), Inches(6.22), Inches(11.0), Inches(0.5),
     [[("…and every return adds knowledge, relationships and reasons to come back — the loop feeds itself.", 13, True, ESPRESSO, BODY)]], space_after=0)
footer(s, 7)

# ---------- 8. AI DIFFERENTIATOR ----------
s = slide()
bg(s)
eyebrow(s, "AI as our differentiator")
head(s, "The AI layer makes the community useful.")
feats = [
    ("Speaker Copilot", "Speakers pick a category — Agentic Security & Governance, AI in Finance, Developer Ecosystem — and AI helps build the talk's curriculum."),
    ("Event intelligence", "AI summarises every session into takeaways and reading lists, delivered while members network."),
    ("Personalised Explore", "Blogs, events, podcasts and member posts pulled in and ranked around each member's interests."),
    ("Networking & Circles", "Attendee matchmaking and moderated topic circles — e.g. AI Security Posture Management."),
]
for i, (t, d) in enumerate(feats):
    xx = Inches(0.9) + (i % 2) * Inches(5.95)
    yy = Inches(2.7) + (i // 2) * Inches(2.0)
    card = rect(s, xx, yy, Inches(5.6), Inches(1.8), WHITE)
    card.line.color.rgb = RGBColor(0xE7, 0xE5, 0xE4)
    card.line.width = Pt(1)
    rect(s, xx, yy, Inches(0.07), Inches(1.8), AMBER)
    text(s, xx + Inches(0.3), yy + Inches(0.18), Inches(5.0), Inches(1.5),
         [[(t, 17, True, INK, DISPLAY)],
          [(d, 12.5, False, GREY, BODY)]], space_after=4)
footer(s, 8)

# ---------- 9. MARKET & LAUNCH ----------
s = slide()
bg(s)
eyebrow(s, "Launch markets")
head(s, "Two cities chosen deliberately.")
pic_cover(s, f"{IMG}/delhi.jpg", Inches(0.9), Inches(2.55), Inches(5.6), Inches(2.6))
cap = rect(s, Inches(0.9), Inches(4.35), Inches(5.6), Inches(0.8), INK)
text(s, Inches(1.15), Inches(4.45), Inches(5.1), Inches(0.65),
     [[("Delhi NCR — enterprise & governance", 16, True, FOAM, DISPLAY)],
      [("BFSI, cybersecurity, consulting, corporate roundtables", 11, False, RGBColor(0xD6, 0xD3, 0xD1), BODY)]], space_after=1)
pic_cover(s, f"{IMG}/hyderabad.jpg", Inches(6.83), Inches(2.55), Inches(5.6), Inches(2.6))
cap2 = rect(s, Inches(6.83), Inches(4.35), Inches(5.6), Inches(0.8), INK)
text(s, Inches(7.08), Inches(4.45), Inches(5.1), Inches(0.65),
     [[("Hyderabad — GCCs & applied AI", 16, True, FOAM, DISPLAY)],
      [("HITEC City engineers, global capability centres, healthcare AI", 11, False, RGBColor(0xD6, 0xD3, 0xD1), BODY)]], space_after=1)
text(s, Inches(0.9), Inches(5.55), Inches(11.5), Inches(1.2),
     [[("First 90 days (proposed operating targets):  ", 13, True, INK, BODY),
       ("recruit 15–20 founding speakers, sign 3–5 corporate partners, launch recurring events in both cities, open six topic Circles, and onboard a curated Founding 100 per city.", 13, False, GREY, BODY)]], space_after=0)
footer(s, 9)

# ---------- 10. COMPETITION ----------
s = slide()
bg(s)
eyebrow(s, "Positioning")
head(s, "Not another meetup. The connective tissue.")
rows = [
    ("Pint of View", "Experience benchmark", "Curated lectures in relaxed venues — the event craft we're building on."),
    ("daily.dev", "Engagement benchmark", "Personalised feed, streaks, reputation and rewards — the habit loop."),
    ("AGI House / Indian AI Community / Indian Data Club", "Community benchmarks", "City chapters, challenges and events — proof the demand exists."),
    ("Meetup / event platforms", "Discovery layer", "Local groups and listings — fragmented, transactional, no memory."),
]
yy = Inches(2.6)
for name, kind, note in rows:
    card = rect(s, Inches(0.9), yy, Inches(11.53), Inches(0.92), WHITE)
    card.line.color.rgb = RGBColor(0xE7, 0xE5, 0xE4)
    card.line.width = Pt(1)
    text(s, Inches(1.2), yy + Inches(0.12), Inches(3.6), Inches(0.7),
         [[(name, 14, True, INK, DISPLAY)]], space_after=0)
    text(s, Inches(4.9), yy + Inches(0.12), Inches(2.4), Inches(0.7),
         [[(kind.upper(), 10.5, True, AMBER, BODY)]], space_after=0)
    text(s, Inches(7.4), yy + Inches(0.12), Inches(4.9), Inches(0.75),
         [[(note, 12, False, GREY, BODY)]], space_after=0)
    yy += Inches(1.02)
text(s, Inches(0.9), Inches(6.35), Inches(11.5), Inches(0.6),
     [[("We don't claim to be India's first AI community. We combine events + knowledge + reputation into one always-on ecosystem — nobody owns that today.", 13, True, ESPRESSO, BODY, True)]], space_after=0)
footer(s, 10)

# ---------- 11. BUSINESS MODEL ----------
s = slide()
bg(s)
eyebrow(s, "Business model")
head(s, "Corporate-first monetisation, five streams.")
streams = [
    ("Corporate subscriptions", "30%", "Memberships for teams; events, communities & premium learning."),
    ("Sponsorships & events", "25%", "Branded AI knowledge series and hosted roundtables."),
    ("Academy & courses", "20%", "Paid certification courses — points redeemable against them."),
    ("Corporate workshops", "15%", "Technical and executive AI workshops, per-session."),
    ("Premium membership", "10%", "Individual power users who want more."),
]
yy = Inches(2.6)
for t, pct, d in streams:
    text(s, Inches(0.9), yy, Inches(3.6), Inches(0.5),
         [[(t, 15, True, INK, DISPLAY)]], space_after=0)
    bar_w = Emu(int(Inches(4.6) * int(pct.strip('%')) / 30))
    rect(s, Inches(4.6), yy + Inches(0.08), bar_w, Inches(0.3), AMBER)
    text(s, Inches(9.4), yy, Inches(0.9), Inches(0.5),
         [[(pct, 14, True, AMBER, BODY)]], space_after=0)
    text(s, Inches(4.6), yy + Inches(0.42), Inches(7.8), Inches(0.4),
         [[(d, 11.5, False, GREY, BODY)]], space_after=0)
    yy += Inches(0.86)
text(s, Inches(0.9), Inches(6.45), Inches(11.5), Inches(0.5),
     [[("Illustrative long-term mix for planning — not a forecast. Early revenue prioritises corporate subscriptions and sponsorships.", 11.5, False, GREY, BODY, True)]], space_after=0)
footer(s, 11)

# ---------- 12. ROADMAP ----------
s = slide()
bg(s)
eyebrow(s, "Roadmap")
head(s, "Disciplined in three phases.")
phases = [
    ("Phase 1 · Months 0–3", "Community foundation", "Waitlist & registration, city events, speaker copilot, event forums, six Circles, Explore feed, basic XP & leaderboard. Landing page and waitlist are live today.", "Prove members attend, return and build relationships."),
    ("Phase 2 · Months 3–6", "Always-on platform", "AI knowledge packs, personalised Explore, AI networking, member publishing, rewards marketplace, paid courses, corporate memberships & private Circles.", "Grow retention, paid conversion and corporate revenue."),
    ("Phase 3 · Months 6–12+", "The ecosystem", "Enterprise learning, expert directory, research reports, partner certifications, new city chapters (Bangalore, Mumbai), national conference.", "Repeatable city economics and recurring enterprise contracts."),
]
for i, (ph, t, d, crit) in enumerate(phases):
    xx = Inches(0.9) + i * Inches(3.95)
    card = rect(s, xx, Inches(2.6), Inches(3.7), Inches(3.9), WHITE if i != 2 else ESPRESSO)
    card.line.color.rgb = RGBColor(0xE7, 0xE5, 0xE4)
    card.line.width = Pt(1)
    fg = WHITE if i == 2 else INK
    sub = RGBColor(0xF6, 0xF2, 0xEE) if i == 2 else GREY
    text(s, xx + Inches(0.3), Inches(2.8), Inches(3.1), Inches(3.5),
         [[(ph.upper(), 10.5, True, AMBER if i != 2 else AMBER_L, BODY)],
          [(t, 20, True, fg, DISPLAY)],
          [(d, 12, False, sub, BODY)],
          [("Success: " + crit, 11, False, sub if i == 2 else AMBER, BODY, True)]], space_after=7)
footer(s, 12)

# ---------- 13. VALIDATION TARGETS ----------
s = slide()
bg(s, INK)
eyebrow(s, "What we're proving", color=AMBER_L)
head(s, "First six-month validation targets.", color=FOAM)
targets = [
    ("1,000", "Registered members"), ("300", "Monthly active members"),
    ("5", "Corporate partners"), ("24", "Events hosted"),
    ("35–50", "Avg. attendance per event"), ("6", "Active topic Circles"),
    ("30%", "Repeat event attendance"), ("100", "Member contributions / month"),
]
for i, (n, lab) in enumerate(targets):
    xx = Inches(0.9) + (i % 4) * Inches(2.95)
    yy = Inches(2.9) + (i // 4) * Inches(1.8)
    card = rect(s, xx, yy, Inches(2.75), Inches(1.6), RGBColor(0x29, 0x25, 0x22))
    text(s, xx + Inches(0.25), yy + Inches(0.15), Inches(2.3), Inches(1.35),
         [[(n, 26, True, AMBER_L, DISPLAY)],
          [(lab, 12, False, FOAM, BODY)]], space_after=2)
text(s, Inches(0.9), Inches(6.55), Inches(11.5), Inches(0.5),
     [[("Targets for validating the model — not forecasts. North-star metric: monthly active contributing members.", 12, False, RGBColor(0xD6, 0xD3, 0xD1), BODY, True)]], space_after=0)
footer(s, 13, dark=True)

# ---------- 14. VISION & ASK ----------
s = slide()
bg(s, ESPRESSO)
text(s, Inches(0.9), Inches(1.4), Inches(11.5), Inches(2.6),
     [[("Become India's professional network", 40, True, WHITE, DISPLAY)],
      [("and knowledge ecosystem for AI.", 40, True, AMBER_L, DISPLAY)]], space_after=4)
text(s, Inches(0.9), Inches(3.6), Inches(10.8), Inches(1.2),
     [[("The events create relationships. The platform preserves knowledge. The AI layer makes that knowledge useful. The rewards create habits. Corporate subscriptions make it sustainable.", 16, False, RGBColor(0xF6, 0xF2, 0xEE), BODY)]])
asks = [
    ("Invest", "Seed capital for platform build-out and first-year city operations."),
    ("Partner", "Founding corporate partners: sponsor a series, own a Circle, train your teams."),
    ("Speak", "Founding speakers: bring your expertise, we'll build the room."),
]
for i, (t, d) in enumerate(asks):
    xx = Inches(0.9) + i * Inches(3.95)
    card = rect(s, xx, Inches(5.1), Inches(3.7), Inches(1.55), RGBColor(0x5C, 0x28, 0x0A))
    text(s, xx + Inches(0.3), Inches(5.28), Inches(3.1), Inches(1.3),
         [[(t.upper(), 13, True, AMBER_L, BODY)],
          [(d, 11.5, False, WHITE, BODY)]], space_after=3)
text(s, Inches(0.9), Inches(6.95), Inches(11.5), Inches(0.4),
     [[("brewedintelligence.com · Delhi NCR & Hyderabad · Join the waitlist today", 12, True, RGBColor(0xF6, 0xF2, 0xEE), BODY)]], space_after=0)

out = "/app/frontend/public/brewed-intelligence-pitch-deck.pptx"
os.makedirs(os.path.dirname(out), exist_ok=True)
prs.save(out)
print("saved", out)
