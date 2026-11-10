import { motion } from "framer-motion";
import { Beer, MessagesSquare, Music, Users } from "lucide-react";

const CARDS = [
  {
    icon: MessagesSquare,
    title: "The talk",
    text: "45 minutes, one hot AI topic, zero fluff.",
    img: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "A speaker with a microphone addressing an Indian audience",
  },
  {
    icon: Beer,
    title: "The pint",
    text: "On us. Light drinks while you learn.",
    img: "https://images.unsplash.com/photo-1725352117196-f59e13d915ca?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Learners seated together with drinks at a taproom session",
  },
  {
    icon: Music,
    title: "The performance",
    text: "A live sitar act while your questions roll in.",
    img: "https://images.unsplash.com/photo-1646765495885-8a61595cb9cf?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "A sitar musician performing live with a microphone",
  },
  {
    icon: Users,
    title: "The after",
    text: "Networking that flows as easily as the round.",
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "People networking after an event",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Concept() {
  return (
    <section id="concept" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
            The Taproom evening
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            An evening you'd actually stay for. Except the beer's on us.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-brew-espresso/80">
            No fluorescent conference halls, no badge scanners, no death-by-PPT.
            We take the best conversations happening in Indian AI — from agentic
            security to AI in finance — and host them where people actually
            relax: a good bar, a cold pint, and a speaker who knows the room.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-brew-espresso/80">
            When the talk ends, the real networking begins. Same room, same
            round, zero awkwardness.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.figure
              key={card.title}
              variants={reveal}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              data-testid={`idea-card-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative overflow-hidden rounded-3xl border border-brew-espresso/10 h-72 sm:h-80"
            >
              <img
                src={card.img}
                alt={card.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/85 via-brew-ink/20 to-brew-ink/10" />
              <figcaption className="absolute inset-x-5 bottom-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brew-amber text-white shadow-lg shadow-brew-ink/30">
                  <card.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-display text-xl text-white">{card.title}</p>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/80">
                  {card.text}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
