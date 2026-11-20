import { useRef } from "react";
import { cubicBezier, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Beer, CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";

const SCENE_IMG = "/hero-3d-render-v2.jpg";
const SLICES = 8;
const EASE = cubicBezier(0.76, 0, 0.24, 1);

const lines = ["Where India", "talks AI —", "over a pint."];

/* One blade of the cut: a vertical band of the 3D scene that shears away
   at its own speed while the camera pushes in. */
function CutSlice({ progress, index }) {
  const dir = index % 2 === 0 ? -1 : 1;
  const speed = 0.8 + (index % 4) * 0.5;
  const start = 0.34 + (index % 3) * 0.03;
  const x = useTransform(progress, [start, 0.84], ["0%", `${dir * 130 * speed}%`], { ease: EASE });
  const y = useTransform(progress, [start, 0.84], ["0%", `${((index % 3) - 1) * -30}%`], { ease: EASE });
  const rotate = useTransform(progress, [start, 0.84], [0, dir * 3], { ease: EASE });

  return (
    <motion.div
      className="relative h-full flex-1 overflow-hidden"
      style={{
        x,
        y,
        rotate,
        borderRight: index < SLICES - 1 ? "1px solid rgba(250,250,249,0.14)" : "none",
        boxShadow: "0 0 40px rgba(0,0,0,0.35) inset",
      }}
    >
      <img
        src={SCENE_IMG}
        alt=""
        draggable={false}
        className="absolute top-0 h-full w-[800%] max-w-none object-cover"
        style={{ left: `-${index * 100}%` }}
      />
    </motion.div>
  );
}

/* Headline line that rises out of its mask as the cut completes. */
function MaskedLine({ progress, index, children }) {
  const y = useTransform(progress, [0.5 + index * 0.06, 0.88 + index * 0.06], ["110%", "0%"], {
    ease: EASE,
  });
  return (
    <span className="masked-line">
      <motion.span style={{ y }}>{children}</motion.span>
    </span>
  );
}

export default function Hero() {
  const lenis = useLenis();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // camera push-in + sink on the 3D scene
  const sceneScale = useTransform(scrollYProgress, [0, 0.85], [1.03, 1.16], { ease: EASE });
  const sceneY = useTransform(scrollYProgress, [0.3, 0.85], ["0%", "6%"], { ease: EASE });

  // revealed hero settles into place as the blades part
  const contentScale = useTransform(scrollYProgress, [0.5, 0.92], [0.95, 1], { ease: EASE });
  const contentY = useTransform(scrollYProgress, [0.5, 0.92, 1], [48, 0, -56], { ease: EASE });
  const contentOpacity = useTransform(scrollYProgress, [0.48, 0.72], [0, 1]);
  const metaOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // brand mark + scroll cue on the scene
  const brandOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const brandY = useTransform(scrollYProgress, [0.1, 0.3], [0, -24], { ease: EASE });
  const cueOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  // the overlay must never block the hero once the blades part
  const overlayPointer = useTransform(scrollYProgress, (v) => (v > 0.45 ? "none" : "auto"));
  const overlayVisibility = useTransform(scrollYProgress, (v) => (v > 0.93 ? "hidden" : "visible"));

  return (
    <section id="top" ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* soft amber washes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full bg-brew-cream blur-3xl opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-64 -left-48 h-[420px] w-[420px] rounded-full bg-amber-100 blur-3xl opacity-60"
        />

        {/* revealed hero */}
        <motion.div
          data-testid="hero-content"
          style={{ scale: contentScale, y: contentY, opacity: contentOpacity }}
          className="absolute inset-0 flex items-center"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-0">
            {/* copy */}
            <div>
              <motion.div
                style={{ opacity: metaOpacity }}
                className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brew-amber/30 bg-brew-cream/80 px-4 py-2 text-xs sm:text-sm font-bold text-brew-espresso"
              >
                <MapPin className="h-4 w-4 text-brew-amber" />
                Coming soon to Delhi NCR
              </motion.div>

              <h1 className="mt-5 font-display font-semibold tracking-tight text-brew-ink text-4xl sm:text-6xl lg:text-7xl leading-[1.02] sm:mt-7">
                {lines.map((line, i) => (
                  <MaskedLine key={line} progress={scrollYProgress} index={i}>
                    {i === 2 ? (
                      <>
                        over a <em className="italic text-brew-amber">pint.</em>
                      </>
                    ) : (
                      line
                    )}
                  </MaskedLine>
                ))}
              </h1>

              <motion.p
                style={{ opacity: metaOpacity }}
                className="mt-4 max-w-xl text-sm sm:mt-7 sm:text-lg leading-relaxed text-brew-espresso/80"
              >
                AI Taproom is an AI-powered community for everything in AI —
                real lectures in real bars, the first pint on us, and a platform
                that turns every talk into curricula, summaries, discussions and
                points. Starting with India's corporates.
              </motion.p>

              <motion.div
                style={{ opacity: metaOpacity }}
                className="mt-6 flex flex-wrap items-center gap-4 sm:mt-9"
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
              style={{ opacity: metaOpacity }}
              className="relative hidden sm:block"
            >
              <div className="relative overflow-hidden rounded-3xl border border-brew-espresso/10 shadow-2xl shadow-brew-espresso/20">
                <img
                  src="https://customer-assets-0z36b82j.emergentagent.net/job_ai-pint--08esny1p/artifacts/9d6f5e18e1d8b80f_WhatsApp%20Image%202026-11-10%20at%205.34.02%20PM.jpeg"
                  alt="The Taproom Stage — a speaker on AI Security & Governance addressing the room"
                  className="h-[300px] lg:h-[460px] w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brew-espresso/50 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 font-display text-white/95 text-lg sm:text-xl max-w-[16ch] leading-snug">
                  One pint. One talk. One idea that sticks.
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-3 sm:-left-6 hidden lg:flex items-center gap-2.5 rounded-2xl border border-brew-espresso/10 bg-white/90 backdrop-blur px-4 py-3 shadow-lg"
              >
                <Beer className="h-5 w-5 text-brew-amber" />
                <span className="text-sm font-bold text-brew-ink">First pint on us</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -right-2 sm:-right-5 hidden lg:flex items-center gap-2.5 rounded-2xl border border-brew-espresso/10 bg-white/90 backdrop-blur px-4 py-3 shadow-lg"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-brew-amber animate-pulse" />
                <span className="text-sm font-bold text-brew-ink">AI-built curricula</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* THE CUT — 3D-rendered taproom scene, sheared open by scroll */}
        <motion.div
          data-testid="hero-cut"
          style={{ visibility: overlayVisibility, pointerEvents: overlayPointer }}
          className="absolute inset-0 z-40 overflow-hidden bg-brew-ink"
          onClick={() => {
            if (ref.current) {
              lenis?.scrollTo(ref.current.offsetTop + ref.current.offsetHeight * 0.6, {
                duration: 1.6,
              });
            }
          }}
        >
          <motion.div
            style={{ scale: sceneScale, y: sceneY }}
            className="flex h-full w-full will-change-transform"
          >
            {Array.from({ length: SLICES }).map((_, i) => (
              <CutSlice key={i} progress={scrollYProgress} index={i} />
            ))}
          </motion.div>

          {/* vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brew-ink/70 via-transparent to-brew-ink/40"
          />

          {/* brand mark */}
          <motion.div
            style={{ opacity: brandOpacity, y: brandY }}
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
          >
            <p className="font-display text-2xl sm:text-3xl text-white/95">AI Taproom</p>
            <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-400">
              Pouring in Delhi NCR
            </p>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
          >
            <ChevronDown className="mx-auto h-5 w-5 animate-bounce text-white/80" />
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/60">
              Scroll to cut
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
