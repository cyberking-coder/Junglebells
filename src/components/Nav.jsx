import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { EASE } from "./primitives";

const links = [
  { label: "Treks", href: "#treks" },
  { label: "How it works", href: "#how" },
  { label: "Field notes", href: "#voices" },
  { label: "Join", href: "#join" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.4, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          solid
            ? "border-b border-bone/10 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-2xl tracking-tight">Jungle Bells</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[12px] uppercase tracking-[0.2em] text-bone/70 transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-amber transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </a>
            ))}
            <a
              href="#join"
              className="rounded-full border border-bone/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 hover:border-amber hover:bg-amber hover:text-ink"
            >
              Reserve a seat
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="block h-px w-7 bg-bone" />
            <span className="block h-px w-7 bg-bone" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] bg-moss px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Jungle Bells</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-[12px] uppercase tracking-[0.2em] text-bone/70"
              >
                Close
              </button>
            </div>
            <div className="mt-20 flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: EASE }}
                  className="font-display text-5xl text-bone/90"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
