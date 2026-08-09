import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Eyebrow, Reveal, SplitLine } from "./primitives";
import { steps } from "../data/treks";

export default function Steps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="how" className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Joining a trek</Eyebrow>
        </Reveal>
        <h2 className="mt-6 font-display text-[11vw] leading-[0.92] tracking-[-0.02em] md:text-[4.6vw]">
          <SplitLine text="Four steps," />
          <SplitLine text="one shared trail." className="block italic text-lichen" delay={0.1} />
        </h2>
      </div>

      <div ref={ref} className="relative mt-20 pl-8 md:pl-0">
        {/* Progress rail that fills as the section scrolls */}
        <div className="absolute left-0 top-0 h-full w-px bg-bone/12 md:left-[calc(25%-1px)]">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="h-full w-full bg-amber"
          />
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="grid gap-4 md:grid-cols-4 md:gap-12">
                <div className="md:pr-12 md:text-right">
                  <span className="font-display text-6xl text-bone/25 md:text-7xl">
                    {s.n}
                  </span>
                </div>
                <div className="md:col-span-3 md:pl-12">
                  <h3 className="font-display text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone/60">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
