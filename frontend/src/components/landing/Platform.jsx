import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Wand2,
  FileText,
  MessagesSquare,
  CircleDot,
  Compass,
  Trophy,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SLIDES = [
  {
    icon: LayoutGrid,
    title: "The topics on stage",
    desc: "Moderators assign each speaker their topic, tuned to what the community wants to hear next.",
    chips: [
      "Agentic Security & Governance",
      "AI in Industries",
      "AI in Textiles",
      "AI in Supply Chain",
      "AI in Finance",
      "Developer Ecosystem",
      "Voice & Vernacular AI",
      "AI in Healthcare",
    ],
  },
  {
    icon: Wand2,
    title: "AI curriculum builder",
    desc: "Once a topic is assigned, the platform helps the speaker structure the whole session so every talk lands sharp and on time.",
    chips: ["Outline", "Talking points", "Timing", "References"],
  },
  {
    icon: FileText,
    title: "AI event summaries",
    desc: "Attendees get the evening distilled — in their inbox before the night ends.",
    chips: ["Key takeaways", "Things taught", "Reading list"],
  },
  {
    icon: MessagesSquare,
    title: "Event forums",
    desc: "Every event gets its own discussion forum — continue the debate before you've left the bar.",
    chips: ["Ask", "Debate", "Follow up"],
  },
  {
    icon: CircleDot,
    title: "Moderated circles",
    desc: "Admin-moderated deep-topic groups — think AI Security Posture Management — where the conversation never has to end.",
    chips: ["Expert-led", "Admin-moderated", "Always on"],
  },
  {
    icon: Compass,
    title: "Explore feed",
    desc: "The latest AI blogs, events and podcasts pulled in automatically — plus posts from the community itself.",
    chips: ["Blogs", "Podcasts", "Events", "Member posts"],
  },
  {
    icon: Trophy,
    title: "Points, streaks & leaderboard",
    desc: "Show up, discuss, post, learn — earn points for all of it, daily.dev-style, and climb the community board.",
    chips: ["Earn as you engage", "Daily streaks", "Climb the board"],
  },
  {
    icon: GraduationCap,
    title: "Certification courses",
    desc: "Subscribable, paid certification tracks — and your points can go towards them.",
    chips: ["Learn", "Get certified", "Redeem points"],
  },
];

export default function Platform() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[index];
  const Icon = slide.icon;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="platform" data-testid="platform-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
            The platform
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            More than an event club. An AI-powered home for everything AI.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-brew-espresso/80">
            The pint gets you in the door. The platform keeps you learning,
            talking and climbing — slide through what's inside.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-brew-espresso/10 bg-white shadow-lg shadow-brew-espresso/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                data-testid="platform-slide"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-[1.2fr_0.8fr]"
              >
                <div className="p-8 sm:p-12" data-testid="platform-slide-title">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brew-amber text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-sm font-semibold text-brew-espresso/50">
                      {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-brew-ink">
                    {slide.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-brew-espresso/80">
                    {slide.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {slide.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-brew-amber/30 bg-brew-cream/60 px-3.5 py-1.5 text-xs font-bold text-brew-espresso"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative hidden md:flex items-center justify-center bg-brew-cream/50 border-l border-brew-espresso/10">
                  <motion.div
                    key={`icon-${index}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-brew-ink text-amber-400 shadow-2xl shadow-brew-espresso/25"
                  >
                    <Icon className="h-16 w-16" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="flex items-center justify-between border-t border-brew-espresso/10 px-6 sm:px-8 py-4">
              <div className="flex gap-2" data-testid="platform-dots">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to ${SLIDES[i].title}`}
                    data-testid={`platform-dot-${i}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-brew-amber" : "w-2 bg-brew-espresso/20 hover:bg-brew-espresso/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  data-testid="platform-prev"
                  aria-label="Previous feature"
                  onClick={() => go(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brew-espresso/15 text-brew-ink transition-all hover:border-brew-amber hover:text-brew-amber"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  data-testid="platform-next"
                  aria-label="Next feature"
                  onClick={() => go(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brew-ink text-brew-foam transition-all hover:bg-brew-amber hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
