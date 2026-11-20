import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Beer, CalendarDays, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";

const HERO_IMG =
  "https://customer-assets-0z36b82j.emergentagent.net/job_ai-pint--08esny1p/artifacts/9d6f5e18e1d8b80f_WhatsApp%20Image%202026-11-10%20at%205.34.02%20PM.jpeg";

const SLICES = 8;
const HOLD_MS = 950;
const SLICE_STAGGER = 60;
const SLICE_DUR = 750;

const lines = ["Where India", "talks AI —", "over a pint."];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.16, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function Hero() {
  const lenis = useLenis();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  const [revealed, setRevealed] = useState(false);
  const [cutDone, setCutDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), HOLD_MS);
    const t2 = setTimeout(
      () => setCutDone(true),
      HOLD_MS + SLICES * SLICE_STAGGER + SLICE_DUR + 100,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const anim = revealed ? "show" : "hidden";

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24"
    >
      {/* soft amber wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full bg-brew-cream blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-64 -left-48 h-[420px] w-[420px] rounded-full bg-amber-100 blur-3xl opacity-60"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* copy */}
        <div>
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={anim}
            className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brew-amber/30 bg-brew-cream/80 px-4 py-2 text-xs sm:text-sm font-bold text-brew-espresso"
          >
            <MapPin className="h-4 w-4 text-brew-amber" />
            Coming soon to Delhi NCR
          </motion.div>

          <h1 className="mt-7 font-display font-semibold tracking-tight text-brew-ink text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            {lines.map((line, i) => (
              <span key={line} className="masked-line">
                <motion.span
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate={anim}
                >
                  {i === 2 ? (
                    <>
                      over a <em className="italic text-brew-amber">pint.</em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={anim}
            className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-brew-espresso/80"
          >
            AI Taproom is an AI-powered community for everything in AI —
            real lectures in real bars, the first pint on us, and a platform that
            turns every talk into curricula, summaries, discussions and points.
            Starting with India's corporates.
          </motion.p>

          <motion.div
            variants={fadeUp(0.7)}
            initial="hidden"
            animate={anim}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#waitlist"
              data-testid="hero-cta"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo("#waitlist", { offset: -80, duration: 1.4 });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-brew-ink px-7 py-3.5 text-sm font-bold text-brew-foam transition-all hover:bg-brew-amber-deep hover:shadow-xl hover:-translate-y-0.5"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#evening"
              data-testid="hero-secondary-cta"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo("#evening", { offset: -80, duration: 1.4 });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-brew-espresso/20 bg-white/60 px-7 py-3.5 text-sm font-bold text-brew-ink transition-all hover:border-brew-amber hover:text-brew-amber-deep"
            >
              <CalendarDays className="h-4 w-4" />
              How an evening works
            </a>
          </motion.div>
        </div>

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            style={{ y: imgY, rotate: imgRotate }}
            className="relative overflow-hidden rounded-3xl border border-brew-espresso/10 shadow-2xl shadow-brew-espresso/20"
          >
            <img
              src={HERO_IMG}
              alt="The Taproom Stage — a speaker on AI Security & Governance addressing the room"
              className="h-[340px] sm:h-[440px] lg:h-[520px] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brew-espresso/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <p className="font-display text-white/95 text-lg sm:text-xl max-w-[16ch] leading-snug">
                One pint. One talk. One idea that sticks.
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -left-3 sm:-left-6 flex items-center gap-2.5 rounded-2xl border border-brew-espresso/10 bg-white/90 backdrop-blur px-4 py-3 shadow-lg"
          >
            <Beer className="h-5 w-5 text-brew-amber" />
            <span className="text-sm font-bold text-brew-ink">
              First pint on us
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-5 -right-2 sm:-right-5 flex items-center gap-2.5 rounded-2xl border border-brew-espresso/10 bg-white/90 backdrop-blur px-4 py-3 shadow-lg"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-brew-amber animate-pulse" />
            <span className="text-sm font-bold text-brew-ink">
              AI-built curricula
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* THE CUT — full-bleed taproom scene sliced open to reveal the hero */}
      {!cutDone && (
        <div
          className="absolute inset-0 z-40 overflow-hidden bg-brew-ink"
          onClick={() => setRevealed(true)}
          data-testid="hero-cut"
          aria-hidden="true"
        >
          <div className="flex h-full w-full">
            {Array.from({ length: SLICES }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "0%" }}
                animate={revealed ? { y: "-103%" } : { y: "0%" }}
                transition={{
                  duration: SLICE_DUR / 1000,
                  delay: revealed ? i * (SLICE_STAGGER / 1000) : 0,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="h-full flex-1"
                style={{
                  backgroundImage: `url(${HERO_IMG})`,
                  backgroundSize: `${SLICES * 100}% 100%`,
                  backgroundPosition: `${(i * 100) / (SLICES - 1)}% center`,
                  borderRight:
                    i < SLICES - 1 ? "1px solid rgba(250,250,249,0.14)" : "none",
                  boxShadow: "0 0 40px rgba(0,0,0,0.35) inset",
                }}
              />
            ))}
          </div>
          {/* brand mark over the scene */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealed ? 0 : 1, y: revealed ? -14 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="font-display text-xl sm:text-2xl text-white/90">
              AI Taproom
            </p>
            <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-400">
              Pouring in Delhi NCR
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
