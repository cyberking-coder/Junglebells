import { Eyebrow, MagneticButton, Reveal, SplitLine } from "./primitives";

export default function Join() {
  return (
    <section
      id="join"
      className="grain relative overflow-hidden border-t border-bone/10 bg-canopy/25 py-28 md:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(63,122,74,0.28),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-12">
        <Reveal>
          <Eyebrow className="justify-center">Next departure in 34 days</Eyebrow>
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-5xl font-display text-[13vw] leading-[0.88] tracking-[-0.03em] md:text-[6.5vw]">
          <SplitLine text="Come walk" />
          <SplitLine text="with us." className="block italic text-lichen" delay={0.1} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-[15px] leading-relaxed text-bone/60">
            Tell us where you want to go and how fit you are. We will put you on
            the right trail with the right eight people.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-bone/25 pb-3"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-transparent text-[15px] text-bone outline-none placeholder:text-bone/30"
            />
            <button
              type="submit"
              className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-amber"
            >
              Send me dates
            </button>
          </form>
        </Reveal>
        <Reveal delay={0.36}>
          <div className="mt-10">
            <MagneticButton as="a" href="#treks">
              Browse open treks
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
