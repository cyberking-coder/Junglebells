import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "./primitives";
import Photo from "./Photo";
import { voices } from "../data/treks";

const BAND =
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=2400&q=80";

export default function Voices() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section id="voices" className="relative">
      {/* Full-bleed parallax band */}
      <div className="grain relative h-[52vh] min-h-[340px] overflow-hidden">
        <Photo
          src={BAND}
          alt="Sunlight falling through a tall forest canopy"
          motionImg={motion.img}
          style={{ y, scale: 1.3 }}
          className="relative h-full w-full object-cover"
          depth={0.4}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal>
            <p className="max-w-3xl text-center font-display text-3xl leading-tight text-bone md:text-5xl">
              “Leave nothing. Take nothing. Come back changed enough that
              someone notices.”
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <Eyebrow>Field notes</Eyebrow>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {voices.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between border-t border-bone/15 pt-8">
                <blockquote className="text-[16px] leading-relaxed text-bone/75">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-display text-xl">{v.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-lichen/60">
                    {v.meta}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
