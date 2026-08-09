import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/** Fade + rise, triggered once when the block enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits a line into words and staggers them in. Words keep their own
 * overflow-hidden mask so the letters slide up from behind a clean edge.
 */
export function SplitLine({ text, className = "", delay = 0, stagger = 0.055 }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em]"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-lichen/70 ${className}`}
    >
      <span className="h-px w-8 bg-lichen/40" />
      {children}
    </span>
  );
}

/** Pill button with a fill that wipes up from the bottom on hover. */
export function MagneticButton({ children, as = "button", className = "", ...rest }) {
  const Tag = motion[as] ?? motion.button;
  return (
    <Tag
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`group relative isolate overflow-hidden rounded-full border border-bone/25 px-8 py-3.5 text-[12px] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:border-amber hover:text-ink ${className}`}
      {...rest}
    >
      <span className="absolute inset-0 -z-10 translate-y-full bg-amber transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
      {children}
    </Tag>
  );
}
