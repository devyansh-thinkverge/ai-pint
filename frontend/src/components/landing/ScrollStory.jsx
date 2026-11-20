import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Mic2, Beer, Users, History } from "lucide-react";

const TOKENS = [
  {
    word: "the talk",
    num: "01",
    icon: Mic2,
    title: "The talk",
    desc: "45 minutes on one hot AI topic — agentic security, AI in finance, the developer ecosystem. Moderators assign it; experts own it.",
  },
  {
    word: "the pint",
    num: "02",
    icon: Beer,
    title: "The pint",
    desc: "The first beer is on us while you learn. Light drinks, warm room, zero fluorescent lighting.",
  },
  {
    word: "the crowd",
    num: "03",
    icon: Users,
    title: "The crowd",
    desc: "Interest-matched rooms — the platform seats you beside the people facing the same AI questions.",
  },
  {
    word: "the rewind",
    num: "04",
    icon: History,
    title: "The rewind",
    desc: "AI summaries, event forums and circles keep the night alive long after the last round.",
  },
];

function TokenWord({ token, index, progress }) {
  const start = 0.16 + index * 0.2;
  const color = useTransform(
    progress,
    [start - 0.06, start],
    ["rgba(28, 25, 23, 0.22)", "#D97706"],
  );
  const scale = useTransform(progress, [start - 0.06, start, start + 0.3], [1, 1.06, 1]);
  return (
    <motion.span style={{ color, scale }} className="inline-block">
      {token.word}
    </motion.span>
  );
}

export default function ScrollStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.12) setActive(-1);
    else if (v < 0.34) setActive(0);
    else if (v < 0.55) setActive(1);
    else if (v < 0.76) setActive(2);
    else setActive(3);
  });

  const current = TOKENS[active];
  const CurrentIcon = current?.icon || Mic2;

  return (
    <section ref={ref} className="relative h-[320vh] bg-brew-foam" data-testid="scroll-story">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-brew-cream blur-3xl opacity-70"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
          {/* counter */}
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.25em] text-brew-espresso/50">
            <motion.span
              key={`counter-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brew-amber"
            >
              {active < 0 ? "00" : String(active + 1).padStart(2, "0")} / 04 — The evening
            </motion.span>
            <span className="hidden sm:block">AI Taproom</span>
          </div>

          {/* the sentence */}
          <p className="mt-10 font-display font-semibold tracking-tight text-brew-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.15]">
            We brew India's AI learning into{" "}
            <TokenWord token={TOKENS[0]} index={0} progress={scrollYProgress} />,{" "}
            <TokenWord token={TOKENS[1]} index={1} progress={scrollYProgress} />,{" "}
            <TokenWord token={TOKENS[2]} index={2} progress={scrollYProgress} /> and{" "}
            <TokenWord token={TOKENS[3]} index={3} progress={scrollYProgress} />.
          </p>

          {/* expanding panel */}
          <div className="mt-12 min-h-[150px] sm:min-h-[160px]">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`story-panel-${current.num}`}
                  className="flex max-w-2xl items-start gap-5 rounded-3xl border border-brew-espresso/10 bg-white p-6 sm:p-8 shadow-lg shadow-brew-espresso/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brew-amber text-white">
                    <CurrentIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-brew-amber">
                      {current.num}
                    </p>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold tracking-tight text-brew-ink">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
                      {current.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* progress rail */}
          <div className="mt-8 h-1 w-full max-w-2xl rounded-full bg-brew-espresso/10">
            <motion.div
              className="h-1 rounded-full bg-brew-amber"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
