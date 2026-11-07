import { motion } from "framer-motion";
import { Beer, Mic2, MessagesSquare, MailCheck, Users } from "lucide-react";

const STEPS = [
  {
    icon: Beer,
    time: "7:00 PM",
    title: "Doors & first pint",
    text: "Grab your name tag and your beer — it's on us. Find a seat, say hi to a stranger.",
  },
  {
    icon: Mic2,
    time: "7:30 PM",
    title: "The talk",
    text: "One speaker, one sharp AI topic. Agentic security, AI in finance, the developer ecosystem — your pick.",
  },
  {
    icon: MessagesSquare,
    time: "8:15 PM",
    title: "Q&A over refills",
    text: "Ask the hard questions. The bar stays open and so does the mic.",
  },
  {
    icon: MailCheck,
    time: "9:00 PM",
    title: "Summary in your inbox",
    text: "The platform's AI condenses the whole session — key takeaways, links and reading list — while you network.",
  },
  {
    icon: Users,
    time: "9:30 PM",
    title: "Networking till late",
    text: "Corporates, speakers and curious minds. The conversations the talk started keep going.",
  },
];

export default function Timeline() {
  return (
    <section id="evening" className="relative bg-brew-ink py-24 sm:py-32 text-brew-foam">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
            An evening, mapped
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
            One evening. Five beats. Zero boring parts.
          </h2>
        </motion.div>

        <div className="mt-14 flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory lg:overflow-visible lg:grid lg:grid-cols-5 lg:gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative flex-none w-[270px] snap-center lg:w-auto"
            >
              {/* connector */}
              <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/15">
                <div
                  className="h-px bg-amber-400 transition-all"
                  style={{ width: i === STEPS.length - 1 ? "0%" : "100%" }}
                />
              </div>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-brew-ink shadow-lg shadow-amber-400/20">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-amber-400/90">
                {step.time}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/40 lg:hidden">
          Swipe to walk through the evening
        </p>
      </div>
    </section>
  );
}
