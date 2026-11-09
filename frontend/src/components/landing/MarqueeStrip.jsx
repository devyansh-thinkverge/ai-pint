import Marquee from "react-fast-marquee";

const ITEMS = [
  "Agentic Security",
  "Delhi NCR",
  "AI in Finance",
  "Developer Ecosystem",
  "Governance",
  "AI in Industries",
  "Circles",
  "Leaderboards",
  "Curriculum Builder",
  "Explore Feed",
  "Beer on us",
];

export default function MarqueeStrip() {
  return (
    <section aria-label="Topics and cities" className="border-y border-brew-espresso/10 bg-brew-foam py-8 sm:py-10">
      <Marquee speed={40} gradient gradientColor="#FAFAF9" gradientWidth={120}>
        <div className="flex items-center">
          {ITEMS.map((item) => (
            <span key={item} className="flex items-center">
              <span className="marquee-outline font-display text-3xl sm:text-5xl font-semibold tracking-tight px-6">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-brew-amber" aria-hidden="true" />
            </span>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
