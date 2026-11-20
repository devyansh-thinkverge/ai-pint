import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Clock,
  Beer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", bio: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/events/${id}`)
      .then((r) => setEvent(r.data))
      .catch(() => setNotFound(true));
  }, [id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      if (event.price > 0) {
        const loaded = await loadRazorpay();
        if (!loaded) throw { response: { data: { detail: "Couldn't reach the payment gateway. Please retry." } } };
        const order = await axios.post(`${API}/payments/order`, {
          event_id: event.id,
          name: form.name,
          email: form.email,
        });
        const options = {
          key: order.data.key_id,
          amount: order.data.amount,
          currency: order.data.currency,
          name: "AI Taproom",
          description: event.title,
          order_id: order.data.order_id,
          prefill: { name: form.name, email: form.email },
          theme: { color: "#D97706" },
          handler: async (res) => {
            await axios.post(`${API}/payments/verify`, {
              order_id: res.razorpay_order_id,
              payment_id: res.razorpay_payment_id,
              signature: res.razorpay_signature,
            });
            setWhatsappUrl(event.whatsapp_url || "");
            setStatus("success");
          },
        };
        new window.Razorpay(options).open();
        setStatus("idle");
        return;
      }

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

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brew-foam px-6">
        <div className="text-center">
          <h1 className="font-display text-3xl text-brew-ink">This pour doesn't exist.</h1>
          <Link to="/" className="mt-4 inline-block font-bold text-brew-amber-deep underline">
            Back to the taproom
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return <div className="min-h-screen bg-brew-foam" />;
  }

  return (
    <div className="min-h-screen bg-brew-foam pb-24 pt-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brew-espresso/70 hover:text-brew-amber"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the taproom
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 overflow-hidden rounded-3xl bg-brew-ink text-brew-foam shadow-2xl shadow-brew-espresso/20"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <span className="inline-block rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-brew-ink">
                {event.city}
              </span>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                {event.title}
              </h1>
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
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-12 md:border-l md:border-t-0">
              {status === "success" ? (
                <div data-testid="details-booking-success">
                  <CheckCircle2 className="h-12 w-12 text-amber-400" />
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    You're booked, {form.name.split(" ")[0]}.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-brew-foam/80">
                    {event.title} · {event.date_label} · {event.venue}.
                  </p>
                  <a
                    href={whatsappUrl || "https://chat.whatsapp.com/"}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="details-whatsapp-join"
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-brew-ink transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/25"
                  >
                    Join the WhatsApp community
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <p className="mt-3 text-xs text-brew-foam/60">
                    The group is where future community events drop first.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    {event.price > 0 ? `Book your seat · ₹${Math.round(event.price / 100)}` : "Book your seat"}
                  </h2>
                  <p className="text-sm text-brew-foam/70">
                    {event.price > 0 ? "Pay securely via Razorpay." : "Seats are limited. Book now — it's free."}
                  </p>
                  {[
                    { key: "name", label: "Full name", type: "text", placeholder: "Your name", required: true, tid: "details-name-input" },
                    { key: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true, tid: "details-email-input" },
                    { key: "company", label: "Company (optional)", type: "text", placeholder: "Where you work", required: false, tid: "details-company-input" },
                    { key: "bio", label: "One-line bio (optional)", type: "text", placeholder: "What do you want from the evening?", required: false, tid: "details-bio-input" },
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
                    data-testid="details-booking-submit"
                    className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-amber-400 text-sm font-extrabold text-brew-ink transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/25 disabled:opacity-60"
                  >
                    {status === "loading" ? "Pouring..." : event.price > 0 ? "Pay & book my seat" : "Book my seat — free"}
                  </button>
                  {status === "error" && (
                    <p data-testid="details-booking-error" className="flex items-center gap-2 text-sm text-amber-300">
                      <AlertCircle className="h-4 w-4" />
                      {message}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
