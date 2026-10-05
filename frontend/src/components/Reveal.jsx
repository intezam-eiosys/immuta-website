import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ no, children }) => (
  <div className="flex items-center gap-3 font-mono2 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
    <span className="inline-block h-px w-8 bg-[#D4AF37]/60" aria-hidden="true" />
    <span>
      {no} — {children}
    </span>
  </div>
);

export const SectionTitle = ({ children, className = "" }) => (
  <h2
    className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F4F1F8] ${className}`}
  >
    {children}
  </h2>
);
