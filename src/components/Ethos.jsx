import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal, SplitLine } from "./primitives";
import Photo from "./Photo";
import { stats } from "../data/treks";
// Imported rather than referenced by path so Vite fingerprints it and rewrites
// the URL for the /Junglebells/ base on Pages. A bare "/tiger.jpg" string would
// 404 there.
import tiger from "../assets/tiger.jpg";

export default function Ethos() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Travel must stay under the overscan below (scale 1.18 => 9% spare each
  // edge) or the parallax slides the photo off its own frame.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow>Inspired by nature</Eyebrow>
          </Reveal>
          <h2 className="mt-8 font-display text-[10vw] leading-[0.95] tracking-[-0.02em] md:text-[4.2vw]">
            <SplitLine text="The forest sets" className="block" />
            <SplitLine text="the pace." className="block italic text-lichen" delay={0.12} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-bone/65">
              Jungle Bells started as four friends and one borrowed tarp in
              Agumbe. Nine years on, we still run every trek the same way: a
              guide who grew up on that trail, a cap of eight walkers, no fixed
              summit-at-any-cost. If a herd is moving through, we wait. If the
              river is up, we turn around.
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone/65">
              Joining is the whole point. Post your dates, take an open seat,
              split the permits and the porters with the rest of the group. You
              walk in a stranger and leave in a group chat.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-bone/10 pt-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <p className="font-display text-5xl text-bone md:text-6xl">{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-bone/45">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
            <Photo
              src={tiger}
              alt="Three tigers walking abreast down a grassy forest track"
              motionImg={motion.img}
              style={{ y: imgY, scale: 1.18 }}
              className="relative h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <p className="max-w-xs text-[13px] leading-relaxed text-bone/80">
                A tigress and two sub-adult cubs on the fire line at dusk. We
                watched from the vehicle for nine minutes and did not step down.
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-lichen/70">
                Tadoba · 20°N 79°E
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
