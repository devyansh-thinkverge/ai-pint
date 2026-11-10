import { motion } from "framer-motion";
import {
  GraduationCap,
  Wrench,
  Presentation,
  CalendarCheck,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLenis } from "lenis/react";

const RETREAT_IMG =
  "https://static.prod-images.emergentagent.com/jobs/751b1243-e4c7-4f7a-bd4d-84ab3a2cb8f6/images/6e4fa866609414b647bbf2054311a63efe22cfc1c42e5fdb850d7f434cce6482.jpeg";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const ITINERARY = [
  {
    n: "01",
    icon: GraduationCap,
    title: "Masterclasses",
    text: "Deep-dive sessions with AI leaders — small rooms, hard questions, real depth.",
  },
  {
    n: "02",
    icon: Wrench,
    title: "Hands-on workshops",
    text: "Full working sessions — build agents, pipelines and prompts with experts beside you.",
  },
  {
    n: "03",
    icon: Presentation,
    title: "Industry panel sessions",
    text: "Operators and leaders debating where AI is actually headed — and what it means for your business.",
  },
];

const PERKS = [
  { icon: CalendarCheck, text: "A fixed number of retreats every year, included with premium membership" },
  { icon: Trophy, text: "Points redeemable on seats and upgrades" },
  { icon: Sparkles, text: "Exclusive premium-only events and evenings" },
];

const DESTINATIONS = {
  india: ["Goa", "Jaipur", "Coorg", "Rishikesh"],
  international: ["Bali", "Sri Lanka"],
};

export default function Retreats() {
  const lenis = useLenis();

  return (
    <section
      id="retreats"
      data-testid="retreats-section"
      className="relative overflow-hidden bg-brew-espresso py-24 sm:py-32 text-brew-foam"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brew-amber/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
            Premium tier
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
            The elite tier: retreats that go deeper.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-brew-foam/80">
            Premium members join every taproom evening — and a{" "}
            <span className="font-bold text-amber-400">fixed number of retreats</span>{" "}
            every year, included in the membership. Short getaways or longer
            immersions, the format stretches into serious learning with the
            people building India's AI.
          </p>

          {/* itinerary */}
          <p className="mt-9 text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
            On the itinerary
          </p>
          <div className="mt-5 space-y-5">
            {ITINERARY.map((item) => (
              <div key={item.n} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-brew-ink shadow-lg shadow-amber-400/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight">
                    <span className="text-amber-400 text-sm mr-2">{item.n}</span>
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-brew-foam/75">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* perks */}
          <div className="mt-8 space-y-2.5" data-testid="retreat-perks">
            {PERKS.map((p) => (
              <p key={p.text} className="flex items-center gap-2.5 text-sm text-brew-foam/85">
                <p.icon className="h-4 w-4 shrink-0 text-amber-400" />
                {p.text}
              </p>
            ))}
          </div>

          {/* destinations */}
          <div className="mt-8" data-testid="retreat-destinations">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-brew-foam/50">
                India
              </span>
              {DESTINATIONS.india.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-amber-400/40 bg-white/5 px-4 py-2 text-sm font-bold text-amber-300"
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-brew-foam/50">
                International
              </span>
              {DESTINATIONS.international.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-amber-400/40 bg-white/5 px-4 py-2 text-sm font-bold text-amber-300"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-brew-foam/50">
              Illustrative destinations — founding members help pick the map.
            </p>
          </div>

          <a
            href="#waitlist"
            data-testid="retreats-cta"
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo("#waitlist", { offset: -80, duration: 1.4 });
            }}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-brew-ink transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/25 hover:-translate-y-0.5"
          >
            Join the waitlist — premium tier
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.figure
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          data-testid="retreats-visual"
          className="group relative overflow-hidden rounded-3xl border border-amber-400/25 shadow-2xl shadow-black/40"
        >
          <img
            src={RETREAT_IMG}
            alt="Premium members in a masterclass circle on a retreat terrace at dusk"
            className="h-72 sm:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brew-espresso/90 via-brew-espresso/10 to-transparent" />
          <span className="absolute top-4 right-4 rounded-full bg-amber-400 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-brew-ink">
            Premium tier
          </span>
          <figcaption className="absolute inset-x-5 bottom-5">
            <p className="font-display text-xl sm:text-2xl text-white">
              Masterclasses at dusk. Workshops at dawn.
            </p>
            <p className="mt-1 text-sm text-brew-foam/80">
              The taproom spirit — stretched into days that actually change how
              you work.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
