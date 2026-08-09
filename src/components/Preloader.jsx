import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./primitives";

const words = ["Silent Valley", "Agumbe", "Dzükou", "Namdapha", "Jungle Bells"];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index === words.length - 1) {
      const t = setTimeout(() => setDone(true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 320);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-end justify-between bg-ink px-6 pb-10 md:px-12"
        >
          <div className="overflow-hidden">
            <motion.p
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-display text-5xl text-bone/90 md:text-7xl"
            >
              {words[index]}
            </motion.p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-lichen/50">
            {String(Math.round(((index + 1) / words.length) * 100)).padStart(3, "0")}
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (index + 1) / words.length }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-fern"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
