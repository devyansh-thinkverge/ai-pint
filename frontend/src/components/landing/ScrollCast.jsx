import { motion, useScroll, useTransform } from "framer-motion";

function PintSVG() {
  return (
    <svg width="54" height="66" viewBox="0 0 54 66" fill="none" className="w-10 lg:w-[54px]">
      <path
        d="M12 18 H42 L39.5 55 Q39.2 60 34 60 H20 Q14.8 60 14.5 55 Z"
        fill="#FEF3C7"
        fillOpacity="0.94"
        stroke="#1C1917"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M16.5 26 H37.5 L35.8 53 Q35.6 55.6 32.6 55.6 H21.4 Q18.4 55.6 18.2 53 Z" fill="#D97706" />
      <path d="M42 25 h2.2 a6.4 6.4 0 0 1 0 12.8 H41" stroke="#1C1917" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <g stroke="#1C1917" strokeWidth="1.4" fill="none">
        <path d="M17 12 L27 7.5 L37 12" />
        <path d="M17 12 L27 16 L37 12" />
      </g>
      <circle cx="17" cy="12" r="3" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.4" />
      <circle cx="27" cy="7.5" r="3.4" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.4" />
      <circle cx="37" cy="12" r="3" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.4" />
      <circle cx="27" cy="16" r="2.4" fill="#FAFAF9" stroke="#1C1917" strokeWidth="1.4" />
      <circle cx="24" cy="38" r="1.8" fill="#FEF3C7" opacity="0.85" />
      <circle cx="31" cy="46" r="1.4" fill="#FEF3C7" opacity="0.7" />
    </svg>
  );
}

function BotSVG() {
  return (
    <svg width="52" height="58" viewBox="0 0 56 60" fill="none" className="w-10 lg:w-[52px]">
      <line x1="28" y1="3" x2="28" y2="11" stroke="#1C1917" strokeWidth="2.2" />
      <circle cx="28" cy="4.5" r="3" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.6" />
      <rect x="8" y="11" width="40" height="33" rx="11" fill="#1C1917" stroke="#D97706" strokeWidth="2.4" />
      <rect x="15" y="19" width="26" height="15" rx="7.5" fill="#FEF3C7" />
      <circle cx="23" cy="26.5" r="2.8" fill="#1C1917" />
      <circle cx="33" cy="26.5" r="2.8" fill="#1C1917" />
      <rect x="16" y="48" width="24" height="9" rx="4.5" fill="#1C1917" stroke="#D97706" strokeWidth="2.2" />
      <circle cx="28" cy="52.5" r="1.8" fill="#FCD34D" />
    </svg>
  );
}

/**
 * Scroll companions: the beer pint pours down the page while the AI agent bot
 * rises to meet it — they cross, drift apart and meet again as you scroll.
 */
export default function ScrollCast() {
  const { scrollYProgress } = useScroll();

  const pintY = useTransform(scrollYProgress, [0, 1], ["4vh", "90vh"]);
  const pintX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 0.9, 1],
    ["4vw", "88vw", "6vw", "86vw", "14vw", "48vw"],
  );
  const pintRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 6, -6]);

  const botY = useTransform(scrollYProgress, [0, 1], ["90vh", "4vh"]);
  const botX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["86vw", "10vw", "84vw", "12vw", "40vw"],
  );
  const botRotate = useTransform(scrollYProgress, [0, 0.5, 1], [6, -8, 6]);

  return (
    <>
      {/* beer pint — pours down with the scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30"
        style={{ x: pintX, y: pintY, rotate: pintRotate }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_10px_18px_rgba(120,53,15,0.35)]"
        >
          <PintSVG />
        </motion.div>
      </motion.div>

      {/* AI agent bot — rises to meet the pint */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30"
        style={{ x: botX, y: botY, rotate: botRotate }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="drop-shadow-[0_10px_18px_rgba(28,25,23,0.35)]"
        >
          <BotSVG />
        </motion.div>
      </motion.div>
    </>
  );
}
