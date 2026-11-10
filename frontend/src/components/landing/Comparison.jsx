import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeftRight, X, Check } from "lucide-react";

const CONF_IMG =
  "https://images.unsplash.com/photo-1778876091184-8839210e1917?crop=entropy&cs=srgb&fm=jpg&q=85";
const TAP_IMG =
  "https://images.unsplash.com/photo-1578707484207-cef507f0c378?crop=entropy&cs=srgb&fm=jpg&q=85";

const LEFT_POINTS = [
  "Badge scanners and ballroom seating",
  "Random crowds and small talk",
  "Talks you forget by the morning",
  "Networking means collecting business cards",
];

const RIGHT_POINTS = [
  "First pint on us, live acts between beats",
  "The platform matches you with events that fit your interests",
  "AI knowledge packs after every talk",
  "Points, circles and retreats keep it going",
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Comparison() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);

  const update = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, pct)));
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(6, p - 6));
    if (e.key === "ArrowRight") setPos((p) => Math.min(94, p + 6));
  };

  return (
    <section id="unique" data-testid="unique-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
            Why we're different
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Not a conference. Not a meetup. A taproom.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-brew-espresso/80">
            Slide the handle — left is every AI event you've survived, right is
            what an evening at AI Taproom feels like.
          </p>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12"
        >
          <div
            ref={trackRef}
            data-testid="comparison-slider"
            className="relative h-72 sm:h-[420px] w-full select-none overflow-hidden rounded-3xl border border-brew-espresso/10 shadow-xl shadow-brew-espresso/10 touch-none cursor-ew-resize"
            onPointerDown={(e) => {
              setDragging(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              update(e.clientX);
            }}
            onPointerMove={(e) => dragging && update(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            {/* base — taproom */}
            <img
              src={TAP_IMG}
              alt="Members laughing over beers at an AI Taproom evening"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />

            {/* right-side overlay — taproom points, clipped to the expanding right */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 0 0 ${pos}%)`,
                transition: dragging ? "none" : "clip-path 0.3s ease",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/85 via-brew-ink/15 to-brew-ink/20" />
              <span className="absolute top-4 right-4 rounded-full bg-amber-400 px-4 py-2 text-xs sm:text-sm font-extrabold text-brew-ink">
                AI Taproom
              </span>
              <ul className="absolute bottom-4 right-4 w-[min(320px,68%)] space-y-2.5 sm:bottom-6 sm:right-6 sm:space-y-3">
                {RIGHT_POINTS.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-[11px] sm:text-sm font-semibold text-brew-foam"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400">
                      <Check className="h-3.5 w-3.5 text-brew-ink" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* left-side overlay — conference, clipped to the expanding left */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - pos}% 0 0)`,
                transition: dragging ? "none" : "clip-path 0.3s ease",
              }}
            >
              <img
                src={CONF_IMG}
                alt="A packed, impersonal conference hall"
                className="absolute inset-0 h-full w-full object-cover grayscale-[0.55]"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-brew-ink/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/85 via-brew-ink/10 to-brew-ink/20" />
              <span className="absolute top-4 left-4 rounded-full bg-brew-ink/70 px-4 py-2 text-xs sm:text-sm font-bold text-white/90 backdrop-blur">
                Conferences & meetups
              </span>
              <ul className="absolute bottom-4 left-4 w-[min(320px,68%)] space-y-2.5 sm:bottom-6 sm:left-6 sm:space-y-3">
                {LEFT_POINTS.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-[11px] sm:text-sm font-semibold text-white/85"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <X className="h-3.5 w-3.5 text-white/80" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* divider + handle */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.45)]"
              style={{ left: `${pos}%` }}
            />
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare a conference with an AI Taproom evening"
              aria-valuenow={Math.round(pos)}
              aria-valuemin={0}
              aria-valuemax={100}
              data-testid="comparison-handle"
              onKeyDown={onKeyDown}
              className="absolute top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brew-foam text-brew-ink shadow-xl ring-4 ring-amber-400/60 outline-none transition-transform hover:scale-110 focus-visible:scale-110"
              style={{ left: `${pos}%`, transition: dragging ? "none" : "left 0.3s ease, transform 0.15s ease" }}
            >
              <ChevronsLeftRight className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 rounded-3xl bg-brew-espresso px-7 py-6 sm:px-10 sm:py-8"
        >
          <p className="text-center text-sm sm:text-lg leading-relaxed text-brew-foam/90">
            Behind the bar, our{" "}
            <span className="font-bold text-amber-400">intelligent platform</span>{" "}
            matches every member with the events, talks and circles that fit
            their interests — so you walk into a room that's already yours.{" "}
            <span className="font-bold text-amber-400">And people actually have fun.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
