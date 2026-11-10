import { motion } from "framer-motion";
import { Beer, MessagesSquare, Music, Users } from "lucide-react";

const LECTURE_IMG =
  "https://images.unsplash.com/photo-1772690445981-78b22eacda4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxuZXR3b3JraW5nJTIwZXZlbnR8ZW58MHx8fHwxNzk0MDQ2NTg0fDA&ixlib=rb-4.1.0&q=85";
const DRINKS_IMG =
  "https://images.unsplash.com/photo-1698925724585-80e161c60a9a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBkcmlua2luZyUyMGJlZXIlMjBwdWJ8ZW58MHx8fHwxNzk0MDQ2NTg0fDA&ixlib=rb-4.1.0&q=85";
const NETWORKING_IMG =
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxuZXR3b3JraW5nJTIwZXZlbnR8ZW58MHx8fHwxNzk0MDQ2NTg0fDA&ixlib=rb-4.1.0&q=85";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Concept() {
  return (
    <section id="concept" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
              The idea
            </p>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
              A lecture you'd actually stay for. Except the beer's on us.
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

          <div className="space-y-6 sm:space-y-8">
            <motion.figure
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src={LECTURE_IMG}
                alt="A speaker leading a session in an intimate venue"
                className="h-64 sm:h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/70 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
                <MessagesSquare className="h-6 w-6 text-brew-cream" />
                <div>
                  <p className="font-display text-xl text-white">The talk</p>
                  <p className="text-sm text-white/80">45 minutes, one hot AI topic, zero fluff.</p>
                </div>
              </figcaption>
            </motion.figure>

            <div className="grid gap-6 sm:grid-cols-2 sm:-ml-6">
              <motion.figure
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <img
                  src={DRINKS_IMG}
                  alt="Friends toasting with pints of beer"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/70 to-transparent" />
                <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5">
                  <Beer className="h-5 w-5 text-brew-cream" />
                  <div>
                    <p className="font-display text-lg text-white">The pint</p>
                    <p className="text-xs text-white/80">On us. Light drinks while you learn.</p>
                  </div>
                </figcaption>
              </motion.figure>

              <motion.figure
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl sm:mt-10"
              >
                <img
                  src={NETWORKING_IMG}
                  alt="Professionals networking after an event"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/70 to-transparent" />
                <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5">
                  <Users className="h-5 w-5 text-brew-cream" />
                  <div>
                    <p className="font-display text-lg text-white">The after</p>
                    <p className="text-xs text-white/80">Networking that flows as easily as the round.</p>
                  </div>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </div>

        {/* Live performance — sitar act */}
        <motion.figure
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          data-testid="concept-performance"
          className="group relative mt-6 sm:mt-8 overflow-hidden rounded-3xl"
        >
          <img
            src="https://static.prod-images.emergentagent.com/jobs/751b1243-e4c7-4f7a-bd4d-84ab3a2cb8f6/images/56229934d8b6a54673936c988787c4c11a6cca035b0cf7f48424d6e61dea409e.jpeg"
            alt="A sitar artist performing live on the taproom stage"
            className="h-64 sm:h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brew-ink/75 via-brew-ink/15 to-transparent" />
          <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
            <Music className="h-6 w-6 text-brew-cream" />
            <div>
              <p className="font-display text-xl sm:text-2xl text-white">The performance</p>
              <p className="text-sm text-white/85 max-w-[52ch]">
                A live sitar act between beats — while the room unwinds, your
                questions for the speaker roll in.
              </p>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
