import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Bot, CheckCircle2, AlertCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Waitlist() {
  const [form, setForm] = useState({ name: "", email: "", company: "", bio: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      await axios.post(`${API}/waitlist`, form);
      setStatus("success");
      setMessage("You're on the list. Cheers — we'll be in touch before the first pour.");
    } catch (err) {
      setStatus("error");
      setMessage(err?.response?.data?.detail || "Something went wrong. Please try again.");
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
            Our taproom bot takes your details — everything in one go, no endless forms.
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
                You're in, {form.name.split(" ")[0]}.
              </p>
              <p className="mt-2 text-sm text-brew-foam/75">{message}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              exit={{ opacity: 0, y: -12 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8 text-left backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-brew-ink">
                  <Bot className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-brew-foam">
                  Taproom bot here — four details and your spot's saved.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="wl-name" className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-brew-foam/60">
                    Full name
                  </label>
                  <input
                    id="wl-name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    data-testid="waitlist-name-input"
                    placeholder="Your name"
                    className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="wl-email" className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-brew-foam/60">
                    Email
                  </label>
                  <input
                    id="wl-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    data-testid="waitlist-email-input"
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="wl-company" className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-brew-foam/60">
                    Company (optional)
                  </label>
                  <input
                    id="wl-company"
                    value={form.company}
                    onChange={set("company")}
                    data-testid="waitlist-company-input"
                    placeholder="Where you work"
                    className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="wl-bio" className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-brew-foam/60">
                    One-line bio (optional)
                  </label>
                  <input
                    id="wl-bio"
                    value={form.bio}
                    onChange={set("bio")}
                    data-testid="waitlist-bio-input"
                    placeholder="What do you want from the Taproom?"
                    className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                data-testid="waitlist-submit-button"
                className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-xl bg-amber-400 py-3.5 text-sm font-extrabold text-brew-ink transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/25 disabled:opacity-60"
              >
                {status === "loading" ? "Pouring..." : "Save my spot"}
              </button>
              {status === "error" && (
                <p data-testid="waitlist-error" className="mt-3 flex items-center justify-center gap-2 text-sm text-amber-300">
                  <AlertCircle className="h-4 w-4" />
                  {message}
                </p>
              )}
            </motion.form>
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
