import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { EASE, MagneticButton } from "./primitives";
import Photo from "./Photo";
import ForestBackdrop from "./ForestBackdrop";

const HERO_IMG =
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=80";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.24]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax — small, springy, never distracting.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const layerX = useTransform(sx, [-1, 1], [-22, 22]);
  const layerY = useTransform(sy, [-1, 1], [-14, 14]);
  const deepX = useTransform(sx, [-1, 1], [12, -12]);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale, x: deepX, willChange: "transform" }}
        className="absolute inset-0"
      >
        <Photo
          src={HERO_IMG}
          alt="Mist moving through a dense rainforest canopy at dawn"
          className="relative h-full w-full object-cover"
          depth={0}
          fetchPriority="high"
        />
      </motion.div>

      {/* Depth grading: dark floor, dark vignette, a warm shaft from the top right */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_0%,rgba(201,135,63,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_60%,transparent_40%,rgba(6,10,7,0.7)_100%)]" />

      {/* Foreground frond frame — drawn, so it never depends on the network */}
      <motion.div
        style={{ x: layerX, y: layerY, willChange: "transform" }}
        className="pointer-events-none absolute -inset-12 hidden overflow-hidden md:block"
      >
        <ForestBackdrop frondsOnly depth={1} className="opacity-90" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <motion.div style={{ y: titleY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1, ease: EASE }}
            className="mb-6 text-[11px] uppercase tracking-[0.4em] text-lichen/80"
          >
            Small-group jungle treks · Est. 2016
          </motion.p>

          <h1 className="font-display leading-[0.82]">
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 2.55, duration: 1.3, ease: EASE }}
                className="block text-[17vw] font-light tracking-[-0.03em] md:text-[11.5vw]"
              >
                JUNGLE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 2.68, duration: 1.3, ease: EASE }}
                className="block pl-[0.06em] text-[17vw] font-light italic tracking-[-0.03em] text-lichen md:text-[11.5vw]"
              >
                BELLS
              </motion.span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-10 border-t border-bone/15 pt-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.95, duration: 1, ease: EASE }}
              className="max-w-md text-[15px] leading-relaxed text-bone/70"
            >
              We walk into the rainforests, ghats and cloud valleys of India in
              groups of eight or fewer — and we open every departure to whoever
              wants in. You pay your share of the trail, not a private guide's
              fee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.05, duration: 1, ease: EASE }}
              className="flex items-center gap-4"
            >
              <MagneticButton as="a" href="#treks">
                See open departures
              </MagneticButton>
              <a
                href="#how"
                className="text-[12px] uppercase tracking-[0.2em] text-bone/60 underline-offset-8 transition-colors hover:text-bone hover:underline"
              >
                How joining works
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:right-12 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-bone/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-amber"
          />
        </span>
      </motion.div>
    </section>
  );
}
