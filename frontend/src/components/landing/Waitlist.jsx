import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ArrowRight, CheckCircle2, AlertCircle, Building2, Mic2, Users } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ROLES = [
  { id: "corporate", label: "Corporate", icon: Building2, hint: "Bring AI learning to my team" },
  { id: "speaker", label: "Speaker", icon: Mic2, hint: "I want to host a talk" },
  { id: "member", label: "Member", icon: Users, hint: "I want to join events" },
];

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("corporate");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      await axios.post(`${API}/waitlist`, { email, role });
      setStatus("success");
      setMessage("You're on the list. Cheers — we'll be in touch before the first pour.");
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.detail || "Something went wrong. Please try again."
      );
    }
  };

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
            Launch invites, first event seats and founding-member perks go to the
            waitlist first. Pick who you are — we'll shape your invite around it.
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
                You're in.
              </p>
              <p className="mt-2 text-sm text-brew-foam/75">{message}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, y: -12 }}
              onSubmit={submit}
              className="mx-auto mt-12 max-w-xl"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    data-testid={`waitlist-role-${r.id}`}
                    onClick={() => setRole(r.id)}
                    className={`flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-bold transition-all ${
                      role === r.id
                        ? "border-amber-400 bg-amber-400 text-brew-ink shadow-lg shadow-amber-400/20"
                        : "border-white/20 bg-white/5 text-brew-foam/80 hover:border-amber-400/60 hover:text-brew-foam"
                    }`}
                  >
                    <r.icon className="h-4 w-4" />
                    {r.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-brew-foam/50">
                {ROLES.find((r) => r.id === role)?.hint}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  data-testid="waitlist-email-input"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-14 flex-1 rounded-full border border-white/20 bg-white/10 px-6 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400 focus:bg-white/15"
                />
                <button
                  type="submit"
                  data-testid="waitlist-submit-button"
                  disabled={status === "loading"}
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-amber-400 px-8 text-sm font-extrabold text-brew-ink transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/25 disabled:opacity-60"
                >
                  {status === "loading" ? "Pouring..." : "Save my spot"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {status === "error" && (
                <p
                  data-testid="waitlist-error"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-amber-300"
                >
                  <AlertCircle className="h-4 w-4" />
                  {message}
                </p>
              )}
              <p className="mt-5 text-xs text-brew-foam/50">
                No spam. Just the first pour of news, invites and founding-member perks.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
