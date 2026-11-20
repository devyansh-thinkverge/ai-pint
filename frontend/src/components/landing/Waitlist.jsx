import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ArrowRight, CheckCircle2, AlertCircle, Bot, User, CornerDownLeft } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const QUESTIONS = [
  { key: "name", label: "First, what should we call you?", placeholder: "Your name", type: "text", optional: false },
  { key: "email", label: "Where should invites go?", placeholder: "you@company.com", type: "email", optional: false },
  { key: "company", label: "Who do you work with?", placeholder: "Company (optional)", type: "text", optional: true },
  { key: "bio", label: "In one line — what do you want from the Taproom?", placeholder: "Your one-line bio (optional)", type: "text", optional: true },
];

export default function Waitlist() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const done = step >= QUESTIONS.length;

  const next = async () => {
    const q = QUESTIONS[step];
    const val = draft.trim();
    if (q.required && !val) return;
    if (q.key === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) return;
    const updated = { ...answers, [q.key]: val };
    setAnswers(updated);
    setDraft("");
    if (step + 1 >= QUESTIONS.length) {
      setStatus("loading");
      try {
        await axios.post(`${API}/waitlist`, updated);
        setStatus("success");
        setMessage("You're on the list. Cheers — we'll be in touch before the first pour.");
      } catch (err) {
        setStatus("error");
        setMessage(err?.response?.data?.detail || "Something went wrong. Please try again.");
        setStep(step); // stay on last question
      }
    } else {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step === 0) return;
    setStep(step - 1);
    setDraft(answers[QUESTIONS[step - 1].key] || "");
  };

  const answered = QUESTIONS.slice(0, step);

  return (
    <section id="waitlist" className="relative overflow-hidden bg-brew-espresso py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brew-amber/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
            Join the waitlist
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-foam text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Be first in line when the taps open.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-brew-foam/75">
            Our taproom bot takes your details — four quick questions, no forms.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              data-testid="waitlist-success"
              className="mx-auto mt-12 max-w-md rounded-3xl border border-amber-400/40 bg-white/10 p-8 backdrop-blur"
            >
              <CheckCircle2 className="mx-auto h-12 w-12 text-amber-400" />
              <p className="mt-4 font-display text-2xl font-semibold text-brew-foam">
                You're in, {answers.name?.split(" ")[0]}.
              </p>
              <p className="mt-2 text-sm text-brew-foam/75">{message}</p>
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              exit={{ opacity: 0, y: -12 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              data-testid="waitlist-bot"
              className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8 text-left backdrop-blur"
            >
              {/* transcript */}
              <div className="space-y-3">
                {answered.map((q, i) => (
                  <div key={q.key} className="flex items-start gap-3">
                    <User className="mt-0.5 h-5 w-5 shrink-0 text-amber-400/70" />
                    <p className="text-sm text-brew-foam/60">
                      <span className="font-bold text-brew-foam/90">{answers[q.key]}</span>
                      {answers[q.key] && <span className="ml-2 text-brew-foam/50">— {q.label.replace("First, what should we call you?", "name").replace("Where should invites go?", "email").replace("Who do you work with?", "company").replace("In one line — what do you want from the Taproom?", "bio")}</span>}
                    </p>
                  </div>
                ))}
              </div>

              {!done && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-brew-ink">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <motion.p
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm sm:text-base font-semibold text-brew-foam"
                    >
                      {QUESTIONS[step].label}
                      {QUESTIONS[step].optional && (
                        <span className="ml-2 text-xs font-normal text-brew-foam/50">optional</span>
                      )}
                    </motion.p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-2.5">
                      <input
                        autoFocus
                        type={QUESTIONS[step].type}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && next()}
                        placeholder={QUESTIONS[step].placeholder}
                        data-testid={`waitlist-${QUESTIONS[step].key}-input`}
                        className="h-12 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={next}
                        disabled={status === "loading"}
                        data-testid={`waitlist-${QUESTIONS[step].key}-next`}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 text-sm font-extrabold text-brew-ink transition-all hover:bg-amber-300 disabled:opacity-60"
                      >
                        {status === "loading" ? "Pouring..." : step === QUESTIONS.length - 1 ? "Join the waitlist" : "Next"}
                        {!status && (step === QUESTIONS.length - 1 ? <CheckCircle2 className="h-4 w-4" /> : <CornerDownLeft className="h-4 w-4" />)}
                      </button>
                    </div>
                    {QUESTIONS[step].optional && (
                      <button
                        type="button"
                        onClick={() => {
                          setDraft("");
                          setTimeout(next, 0);
                        }}
                        className="mt-2 text-xs font-bold text-brew-foam/50 underline hover:text-brew-foam/80"
                      >
                        Skip this one
                      </button>
                    )}
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={back}
                        className="ml-3 mt-2 text-xs font-bold text-brew-foam/50 underline hover:text-brew-foam/80"
                      >
                        Back
                      </button>
                    )}
                    {status === "error" && (
                      <p data-testid="waitlist-error" className="mt-3 flex items-center gap-2 text-sm text-amber-300">
                        <AlertCircle className="h-4 w-4" />
                        {message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* progress */}
              <div className="mt-5 flex items-center gap-2">
                {QUESTIONS.map((q, i) => (
                  <span
                    key={q.key}
                    className={`h-1.5 rounded-full transition-all ${i <= step ? "w-8 bg-amber-400" : "w-4 bg-white/20"}`}
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-brew-foam/50">
                  {Math.min(step + 1, QUESTIONS.length)} / {QUESTIONS.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status !== "success" && (
          <p className="mx-auto mt-8 max-w-md text-center text-xs text-brew-foam/50">
            No spam. Just the first pour of news, invites and founding-member perks.
          </p>
        )}
      </div>
    </section>
  );
}
