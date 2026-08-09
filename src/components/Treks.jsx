import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { EASE, Eyebrow, Reveal, SplitLine } from "./primitives";
import { treks } from "../data/treks";
import Photo from "./Photo";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function Treks({ onBook }) {
  const [active, setActive] = useState(null);
  const listRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 200, damping: 26, mass: 0.5 });

  function onMove(e) {
    const r = listRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <section id="treks" className="relative border-t border-bone/10 bg-moss/40 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Open departures · 2026</Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-display text-[12vw] leading-[0.9] tracking-[-0.02em] md:text-[5.5vw]">
              <SplitLine text="Take a seat" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[13px] leading-relaxed text-bone/55">
              Seats are live. When a departure fills, it closes — we do not add
              a ninth walker to a trail that can hold eight.
            </p>
          </Reveal>
        </div>

        {/* Hover-follow preview, desktop only */}
        <div
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-16 border-t border-bone/12"
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[280px] w-[380px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm md:block"
              >
                <Photo
                  src={treks[active].image}
                  className="relative h-full w-full object-cover"
                  depth={0.5}
                />
                <div className="absolute inset-0 bg-ink/25" />
              </motion.div>
            )}
          </AnimatePresence>

          {treks.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <div
                onMouseEnter={() => setActive(i)}
                className="group relative grid grid-cols-1 items-center gap-3 border-b border-bone/12 py-8 transition-colors duration-500 lg:grid-cols-12 lg:gap-6 lg:py-10"
              >
                <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-canopy/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />

                <span className="hidden text-[11px] tracking-[0.2em] text-bone/35 lg:col-span-1 lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="lg:col-span-4">
                  <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {t.name}
                  </h3>
                  <p className="mt-1.5 text-[12px] uppercase tracking-[0.18em] text-lichen/70">
                    {t.region}
                  </p>
                </div>

                <p className="text-[13px] leading-relaxed text-bone/55 lg:col-span-3">
                  {t.blurb}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3 lg:col-span-2">
                  <Meta k="Days" v={t.days} />
                  <Meta k="Grade" v={t.grade} />
                  <Meta k="Peak" v={t.altitude} />
                  <Meta k="Dates" v={t.dates} />
                </div>

                <div className="mt-4 flex items-center justify-between gap-6 lg:col-span-2 lg:mt-0 lg:justify-end">
                  <div className="text-left lg:text-right">
                    <p className="font-display text-2xl">{inr(t.price)}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-bone/40">
                      per person · {t.seats} seats left
                    </p>
                  </div>
                  <button
                    onClick={() => onBook(t)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/25 text-lg transition-all duration-500 hover:border-amber hover:bg-amber hover:text-ink"
                    aria-label={`Join ${t.name}`}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({ k, v }) {
  return (
    <span className="block">
      <span className="block text-[9px] uppercase tracking-[0.2em] text-bone/35">{k}</span>
      <span className="block text-[13px] text-bone/75">{v}</span>
    </span>
  );
}
