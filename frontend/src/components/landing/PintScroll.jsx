import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** A beer pint that travels down the page as you scroll — switching sides section by section. */
export default function PintScroll() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["6vh", "92vh"]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.62, 0.85, 1],
    ["4vw", "90vw", "6vw", "88vw", "12vw", "48vw"],
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 6, -6]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{ x, y, rotate }}
    >
      <div className="relative drop-shadow-[0_10px_18px_rgba(120,53,15,0.35)]">
        <svg width="54" height="66" viewBox="0 0 54 66" fill="none">
          {/* glass */}
          <path
            d="M12 18 H42 L39.5 55 Q39.2 60 34 60 H20 Q14.8 60 14.5 55 Z"
            fill="#FEF3C7"
            fillOpacity="0.92"
            stroke="#1C1917"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* liquid */}
          <path d="M16.5 26 H37.5 L35.8 53 Q35.6 55.6 32.6 55.6 H21.4 Q18.4 55.6 18.2 53 Z" fill="#D97706" />
          {/* handle */}
          <path d="M42 25 h2.2 a6.4 6.4 0 0 1 0 12.8 H41" stroke="#1C1917" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          {/* neural foam */}
          <g stroke="#1C1917" strokeWidth="1.4" fill="none">
            <path d="M17 12 L27 7.5 L37 12" />
            <path d="M17 12 L27 16 L37 12" />
          </g>
          <circle cx="17" cy="12" r="3" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.4" />
          <circle cx="27" cy="7.5" r="3.4" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.4" />
          <circle cx="37" cy="12" r="3" fill="#FCD34D" stroke="#1C1917" strokeWidth="1.4" />
          <circle cx="27" cy="16" r="2.4" fill="#FAFAF9" stroke="#1C1917" strokeWidth="1.4" />
          {/* bubbles */}
          <circle cx="24" cy="38" r="1.8" fill="#FEF3C7" opacity="0.85" />
          <circle cx="31" cy="46" r="1.4" fill="#FEF3C7" opacity="0.7" />
        </svg>
        <motion.span
          className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-brew-amber"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
