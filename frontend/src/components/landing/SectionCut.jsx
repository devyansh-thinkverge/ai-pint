import { motion } from "framer-motion";

/* Sections slice in from an inset frame as they enter the viewport —
   the same "cut" language as the hero, carried through every block. */
export default function SectionCut({ children, className = "" }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(14% 7% 14% 7% round 28px)", opacity: 0.001, y: 48 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
