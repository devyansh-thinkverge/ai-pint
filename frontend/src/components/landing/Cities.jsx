import { motion } from "framer-motion";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";

const DELHI_IMG =
  "https://images.unsplash.com/photo-1575566668200-7dcaa7b2cf28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxkZWxoaSUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3OTQwNDY1ODR8MA&ixlib=rb-4.1.0&q=85";
const HYD_IMG =
  "https://images.unsplash.com/photo-1696941515998-d83f24967aca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxoeWRlcmFiYWQlMjBjaXR5fGVufDB8fHx8MTc5NDA0NjU4NHww&ixlib=rb-4.1.0&q=85";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Cities() {
  const lenis = useLenis();

  return (
    <section id="cities" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
            Launch cities
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Pouring first in Delhi NCR & Hyderabad.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              city: "Delhi NCR",
              tag: "Launch city",
              img: DELHI_IMG,
              alt: "Delhi architecture",
            },
            {
              city: "Hyderabad",
              tag: "Launch city",
              img: HYD_IMG,
              alt: "Charminar, Hyderabad",
            },
          ].map((c, i) => (
            <motion.figure
              key={c.city}
              variants={reveal}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-brew-espresso/10 h-72 sm:h-80"
            >
              <img
                src={c.img}
                alt={c.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/80 via-brew-ink/20 to-transparent" />
              <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <span className="inline-block rounded-full bg-brew-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white">
                    {c.tag}
                  </span>
                  <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
                    {c.city}
                  </p>
                </div>
                <MapPin className="h-6 w-6 text-amber-400" />
              </figcaption>
            </motion.figure>
          ))}

          {/* next cities teaser */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex h-72 sm:h-80 flex-col justify-between rounded-3xl border-2 border-dashed border-brew-amber/40 bg-brew-cream/40 p-7 sm:p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brew-amber shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-brew-ink">
                Your city next?
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
                Bangalore, Mumbai and beyond are on the roadmap. Join the waitlist
                and tell us where we should pour next.
              </p>
              <a
                href="#waitlist"
                data-testid="cities-teaser-cta"
                onClick={(e) => {
                  e.preventDefault();
                  lenis?.scrollTo("#waitlist", { offset: -80, duration: 1.4 });
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brew-amber-deep hover:text-brew-amber transition-colors"
              >
                Vote with your email
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
