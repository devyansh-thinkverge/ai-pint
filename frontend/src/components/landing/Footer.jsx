export default function Footer() {
  return (
    <footer className="border-t border-brew-espresso/10 bg-brew-foam py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 sm:px-8 md:flex-row md:justify-between">
        <a href="#top" onClick={(e) => e.preventDefault()} aria-label="AI Taproom" data-testid="footer-logo">
          <img
            src="/logo-lockup.png"
            alt="AI Taproom — A home for everything AI"
            className="h-28 w-auto"
            draggable={false}
          />
        </a>

        <p className="text-sm text-brew-espresso/60">
          © {new Date().getFullYear()} AI Taproom · Delhi NCR
        </p>
      </div>
      <p className="mx-auto mt-8 max-w-7xl px-5 text-xs text-brew-espresso/40 sm:px-8">
        AI Taproom is a community platform for everything AI in India — brewed as
        Brewed Intelligence. Drink responsibly — attendees must be of legal drinking
        age at venue events.
      </p>
    </footer>
  );
}
