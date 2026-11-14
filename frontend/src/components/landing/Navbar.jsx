import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "The evening", href: "#concept" },
  { label: "Taproom retreats", href: "#retreats" },
  { label: "The platform", href: "#platform" },
  { label: "Events", href: "#events" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    lenis?.scrollTo(href, { offset: -80, duration: 1.4 });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brew-foam/80 backdrop-blur-xl border-b border-brew-espresso/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4">
        <a
          href="#top"
          data-testid="nav-logo-link"
          onClick={(e) => go(e, "#top")}
          aria-label="AI Taproom home"
        >
          <Logo className="h-9 w-9" textClass="text-lg" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.slice(1)}`}
              onClick={(e) => go(e, l.href)}
              className="link-underline text-sm font-semibold text-brew-espresso/80 hover:text-brew-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          data-testid="nav-cta"
          onClick={(e) => go(e, "#waitlist")}
          className="group inline-flex items-center gap-2 rounded-full bg-brew-amber px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brew-amber-deep hover:shadow-lg hover:-translate-y-0.5"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </nav>
    </header>
  );
}
