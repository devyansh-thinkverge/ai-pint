import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Wand2,
  FileText,
  MessagesSquare,
  CircleDot,
  Compass,
  Trophy,
  GraduationCap,
  ArrowUpRight,
  Flame,
  ChevronDown,
} from "lucide-react";

const TOPICS = [
  {
    title: "Agentic Security & Governance",
    detail:
      "How teams keep autonomous agents in check — posture, guardrails, policy and the questions every board is starting to ask.",
  },
  {
    title: "AI in Industries",
    detail:
      "Field notes from factories, hospitals, retail chains and farms — what actually works when AI meets the physical world.",
  },
  {
    title: "AI in Finance",
    detail:
      "Fraud, risk, underwriting and the algorithms moving money — a candid look at AI on the trading floor and behind the counter.",
  },
  {
    title: "AI in the Developer Ecosystem",
    detail:
      "Coding agents, RAG, MCP and the AI-powered tools changing how software gets written — for the people writing it.",
  },
  {
    title: "AI in Textiles",
    detail:
      "From loom to label — design generation, fabric-defect detection, inventory prediction and what smart factories mean for India's garment belt.",
  },
  {
    title: "AI in Supply Chain",
    detail:
      "Demand forecasting, warehouse automation, route optimisation and the algorithms deciding what reaches which shelf, when.",
  },
  {
    title: "Voice & Vernacular AI",
    detail:
      "AI that speaks India's languages — voice interfaces, regional models and products built for the next billion users.",
  },
  {
    title: "AI in Healthcare",
    detail:
      "Diagnostics, patient triage and clinical documentation — where AI is already helping doctors, and where it must not go.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Card({ i, className = "", children }) {
  return (
    <motion.div
      variants={reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`group rounded-3xl border border-brew-espresso/10 bg-white p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brew-espresso/10 hover:border-brew-amber/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardHead({ icon: Icon, title }) {
  return (
    <>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brew-cream text-brew-amber-deep transition-colors group-hover:bg-brew-amber group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold tracking-tight text-brew-ink">
        {title}
      </h3>
    </>
  );
}

export default function Bento() {
  const [openTopic, setOpenTopic] = useState(null);
  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
            The platform
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            More than an event club. An AI-powered home for everything AI.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-brew-espresso/80">
            The pint gets you in the door. The platform keeps you learning,
            talking and climbing — before, during and long after each event.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Topics accordion — tall */}
          <Card i={0} className="md:row-span-2 flex flex-col" >
            <CardHead icon={LayoutGrid} title="The topics on stage" />
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
              Moderators assign each speaker their topic, tuned to what the
              community wants to hear next. Tap a session to see what it covers.
            </p>
            <ul className="mt-6 space-y-3" data-testid="topics-accordion">
              {TOPICS.map((topic, i) => {
                const open = openTopic === i;
                return (
                  <li
                    key={topic.title}
                    className={`rounded-2xl border transition-colors ${
                      open
                        ? "border-brew-amber/60 bg-brew-cream/50"
                        : "border-brew-espresso/10 bg-brew-foam hover:border-brew-amber/40"
                    }`}
                  >
                    <button
                      type="button"
                      data-testid={`topic-toggle-${i}`}
                      aria-expanded={open}
                      onClick={() => setOpenTopic(open ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-brew-ink"
                    >
                      {topic.title}
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="h-4 w-4 text-brew-amber" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-3 text-xs leading-relaxed text-brew-espresso/80">
                            {topic.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
              <li className="px-4 text-xs font-bold uppercase tracking-widest text-brew-espresso/50">
                + more categories at launch
              </li>
            </ul>
          </Card>

          {/* Curriculum builder — wide */}
          <Card i={1} className="md:col-span-2">
            <CardHead icon={Wand2} title="AI curriculum builder" />
            <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-brew-espresso/80">
              Once a speaker picks a topic, the platform helps them structure the
              entire session — outline, talking points, references — so every talk
              lands sharp and on time.
            </p>
          </Card>

          {/* Summaries */}
          <Card i={2}>
            <CardHead icon={FileText} title="AI event summaries" />
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
              Attendees get the whole evening distilled: key takeaways, things
              taught and a reading list — in their inbox before the night ends.
            </p>
          </Card>

          {/* Points — wide */}
          <Card i={3} className="md:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <CardHead icon={Trophy} title="Points, streaks & leaderboard" />
                <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-brew-espresso/80">
                  Show up, discuss, post, learn — earn points for all of it,
                  daily.dev-style, and climb the community leaderboard.
                </p>
              </div>
              <div className="flex-1 min-w-[200px] max-w-xs rounded-2xl border border-brew-espresso/10 bg-brew-ink p-5 text-brew-foam">
                <div className="flex items-center gap-2 text-amber-400">
                  <Flame className="h-4 w-4" />
                  <span className="text-xs font-extrabold uppercase tracking-widest">
                    Your streak
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-semibold">+120 pts</p>
                <p className="mt-1 text-xs text-white/60">
                  for attending, asking & sharing
                </p>
                <div className="mt-4 h-2 rounded-full bg-white/15">
                  <div className="h-2 w-3/4 rounded-full bg-amber-400" />
                </div>
                <p className="mt-2 text-[11px] text-white/50">
                  Redeem on courses & perks
                </p>
              </div>
            </div>
          </Card>

          {/* Forums */}
          <Card i={4}>
            <CardHead icon={MessagesSquare} title="Event forums" />
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
              Every event gets its own discussion forum — continue the debate
              before you've even left the bar.
            </p>
          </Card>

          {/* Circles */}
          <Card i={5}>
            <CardHead icon={CircleDot} title="Moderated circles" />
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
              Deep-topic groups run by admin-moderated circles — think AI Security
              Posture Management — where the conversation never has to end.
            </p>
          </Card>

          {/* Explore feed */}
          <Card i={6}>
            <CardHead icon={Compass} title="Explore feed" />
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-espresso/80">
              The latest AI blogs, events and podcasts, pulled in automatically —
              plus posts from the community itself.
            </p>
          </Card>

          {/* Certifications */}
          <motion.div
            variants={reveal}
            custom={7}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="group rounded-3xl border border-brew-espresso bg-brew-espresso p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brew-espresso/10"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold tracking-tight text-brew-foam">
              Certification courses
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-foam/85">
              Subscribable, paid certification tracks — and your points can go
              towards them.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
