import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Beer, CalendarDays, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBiYXIlMjBjcm93ZHxlbnwwfHx8fDE3OTQwNDY1OTV8MA&ixlib=rb-4.1.0&q=85";

const lines = ["Where India", "talks AI —", "over a pint."];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const lenis = useLenis();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brew-amber/30 bg-brew-cream/80 px-4 py-2 text-xs sm:text-sm font-bold text-brew-espresso"
          >
            <MapPin className="h-4 w-4 text-brew-amber" />
            Coming soon to Delhi NCR & Hyderabad
          </motion.div>

          <h1 className="mt-7 font-display font-semibold tracking-tight text-brew-ink text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            {lines.map((line, i) => (
              <span key={line} className="masked-line">
                <motion.span
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                >
                  {i === 2 ? (
                    <>
                      over a{" "}
                      <em className="italic text-brew-amber">pint.</em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-brew-espresso/80"
          >
            Brewed Intelligence is an AI-powered community for everything in AI —
            real lectures in real bars, the first pint on us, and a platform that
            turns every talk into curricula, summaries, discussions and points.
            Starting with India's corporates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            style={{ y: imgY, rotate: imgRotate }}
            className="relative overflow-hidden rounded-3xl border border-brew-espresso/10 shadow-2xl shadow-brew-espresso/20"
          >
            <img
              src={HERO_IMG}
              alt="A warm bar crowd gathered for a talk"
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
    </section>
  );
}
