import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MapPin,
  CalendarDays,
  Clock,
  Beer,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Events() {
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", bio: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/events`)
      .then((r) => setEvent((r.data || [])[0] || null))
      .catch(() => setEvent(null));
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await axios.post(`${API}/bookings`, {
        event_id: event.id,
        name: form.name,
        email: form.email,
        company: form.company,
        bio: form.bio,
      });
      setWhatsappUrl(res.data.whatsapp_url || "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  if (!event) return null;

  return (
    <section id="events" data-testid="event-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brew-amber">
            Upcoming events
          </p>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-brew-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            The next one's already pouring.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mt-12 overflow-hidden rounded-3xl bg-brew-ink text-brew-foam shadow-2xl shadow-brew-espresso/20"
        >
          <div className="grid lg:grid-cols-2">
            {/* event details */}
            <div className="p-8 sm:p-12">
              <span className="inline-block rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-brew-ink">
                Upcoming · {event.city}
              </span>
              <h3
                data-testid="event-title"
                className="mt-5 font-display text-3xl sm:text-4xl font-semibold tracking-tight"
              >
                {event.title}
              </h3>
              <div className="mt-7 space-y-4 text-sm sm:text-base">
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 shrink-0 text-amber-400" />
                  {event.date_label}
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-amber-400" />
                  {event.time_label}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-amber-400" />
                  {event.venue}
                </p>
                <p className="flex items-center gap-3">
                  <Beer className="h-5 w-5 shrink-0 text-amber-400" />
                  First pint on us, live act included, AI summary after.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Agentic security", "Agent frameworks", "Governance"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-amber-400/40 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-amber-300"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              {event.speaker && (
                <div
                  data-testid="event-speaker-row"
                  className="mt-8 flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5"
                >
                  {event.speaker.image ? (
                    <img
                      src={event.speaker.image}
                      alt={event.speaker.name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-sm font-extrabold text-amber-400">
                      {event.speaker.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-bold text-brew-foam">
                      Talk by {event.speaker.name}
                    </p>
                    <p className="text-xs text-brew-foam/70">
                      {event.speaker.role} · {event.speaker.company}
                    </p>
                  </div>
                </div>
              )}
              <Link
                to={`/events/${event.id}`}
                data-testid="event-details-link"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-amber-400 hover:text-amber-300"
              >
                View event details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* booking form */}
            <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-12 lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    data-testid="booking-success"
                  >
                    <CheckCircle2 className="h-12 w-12 text-amber-400" />
                    <h4 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                      You're booked, {form.name.split(" ")[0]}.
                    </h4>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-foam/80">
                      {event.title} · {event.date_label} · {event.venue}. Your
                      booking is confirmed — details are on their way to{" "}
                      <span className="font-bold text-amber-400">{form.email}</span>.
                    </p>
                    <a
                      href={whatsappUrl || "https://chat.whatsapp.com/"}
                      target="_blank"
                      rel="noreferrer"
                      data-testid="whatsapp-join"
                      className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-brew-ink transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/25"
                    >
                      Join the WhatsApp community
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <p className="mt-3 text-xs text-brew-foam/60">
                      The group is where future community events drop first.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display text-2xl font-semibold tracking-tight">
                      Book your seat
                    </h4>
                    <p className="text-sm text-brew-foam/70">
                      Seats are limited at {event.venue.split(",")[0]}. Book now — it's free.
                    </p>
                    {[
                      { key: "name", label: "Full name", type: "text", placeholder: "Your name", required: true, tid: "booking-name-input" },
                      { key: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true, tid: "booking-email-input" },
                      { key: "company", label: "Company (optional)", type: "text", placeholder: "Where you work", required: false, tid: "booking-company-input" },
                      { key: "bio", label: "One-line bio (optional)", type: "text", placeholder: "What do you want from the evening?", required: false, tid: "booking-bio-input" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label htmlFor={f.tid} className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-brew-foam/60">
                          {f.label}
                        </label>
                        <input
                          id={f.tid}
                          type={f.type}
                          required={f.required}
                          value={form[f.key]}
                          onChange={set(f.key)}
                          data-testid={f.tid}
                          placeholder={f.placeholder}
                          className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-base text-brew-foam placeholder:text-brew-foam/40 outline-none transition-colors focus:border-amber-400"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-testid="booking-submit-button"
                      className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-amber-400 text-sm font-extrabold text-brew-ink transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/25 disabled:opacity-60"
                    >
                      {status === "loading" ? "Booking..." : "Book my seat — free"}
                    </button>
                    {status === "error" && (
                      <p
                        data-testid="booking-error"
                        className="flex items-center gap-2 text-sm text-amber-300"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {message}
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-xs text-brew-foam/50">
                      <Beer className="h-3.5 w-3.5" />
                      Attendees must be of legal drinking age. First pint on us.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
