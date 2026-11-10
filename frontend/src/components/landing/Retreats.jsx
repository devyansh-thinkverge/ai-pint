import { motion } from "framer-motion";
import { MapPin, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";

const RETREAT_IMG =
  "https://static.prod-images.emergentagent.com/jobs/751b1243-e4c7-4f7a-bd4d-84ab3a2cb8f6/images/6e4fa866609414b647bbf2054311a63efe22cfc1c42e5fdb850d7f434cce6482.jpeg";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const PERKS = [
  {
    icon: MapPin,
    title: "Destination weekends",
    text: "Short trips to popular getaway destinations — two nights, one unbroken agenda: talks, drinks and the right people.",
  },
  {
    icon: Sparkles,
    title: "The taproom format, away",
    text: "Expert talks over drinks, live acts and roundtables stretched across a whole weekend — not a conference in a ballroom.",
  },
  {
    icon: Trophy,
    title: "Points do the travelling",
    text: "Redeem platform points towards retreat seats and upgrades, and unlock exclusive events reserved for premium members.",
  },
];

const DESTINATIONS = ["Goa", "Jaipur", "Coorg", "Rishikesh"];

export default function Retreats() {
  const lenis = useLenis();

  return (
    <section
      id="retreats"
      data-testid="retreats-section"
      className="relative bg-brew-ink py-24 sm:py-32 text-brew-foam"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brew-amber/15 blur-3xl"
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
            Weekend retreats. Same spirit, bigger views.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/75">
            For members who want more than an evening: a short trip to a
            beautiful destination with the exact format you love — and two full
            days of networking with the sharpest people in the room.
          </p>

          <div className="mt-9 space-y-6">
            {PERKS.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-brew-ink shadow-lg shadow-amber-400/20">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9" data-testid="retreat-destinations">
            <p className="text-xs font-extrabold uppercase tracking-widest text-white/50">
              Where the first retreats could go
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {DESTINATIONS.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-amber-400/40 bg-white/5 px-4 py-2 text-sm font-bold text-amber-300"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/40">
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
            Join the waitlist for premium invites
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.figure
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          data-testid="retreats-visual"
          className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40"
        >
          <img
            src={RETREAT_IMG}
            alt="Members networking on a retreat terrace at dusk in the hills"
            className="h-72 sm:h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/80 via-brew-ink/10 to-transparent" />
          <span className="absolute top-4 right-4 rounded-full bg-amber-400 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-brew-ink">
            Premium tier
          </span>
          <figcaption className="absolute inset-x-5 bottom-5">
            <p className="font-display text-xl sm:text-2xl text-white">
              Evening one: a valley circle, not a ballroom.
            </p>
            <p className="mt-1 text-sm text-white/80">
              Talks at sunset, drinks after, and conversations that run till the
              lanterns burn out.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
