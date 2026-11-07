import { Twitter, Linkedin, Instagram } from "lucide-react";
import Logo from "./Logo";

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#waitlist" },
  { icon: Linkedin, label: "LinkedIn", href: "#waitlist" },
  { icon: Instagram, label: "Instagram", href: "#waitlist" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brew-espresso/10 bg-brew-foam py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 sm:px-8 md:flex-row md:justify-between">
        <a href="#top" onClick={(e) => e.preventDefault()} aria-label="Brewed Intelligence">
          <Logo className="h-8 w-8" textClass="text-base" />
        </a>

        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              data-testid={`footer-social-${s.label.toLowerCase()}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brew-espresso/15 text-brew-espresso/70 transition-all hover:border-brew-amber hover:text-brew-amber hover:-translate-y-0.5"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-sm text-brew-espresso/60">
          © {new Date().getFullYear()} Brewed Intelligence · Delhi NCR & Hyderabad
        </p>
      </div>
      <p className="mx-auto mt-8 max-w-7xl px-5 text-xs text-brew-espresso/40 sm:px-8">
        Brewed Intelligence is a community platform for everything AI in India. Drink
        responsibly — attendees must be of legal drinking age at venue events.
      </p>
    </footer>
  );
}
