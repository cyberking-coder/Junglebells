const socials = ["Instagram", "YouTube", "Strava", "Journal"];

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink px-6 pb-10 pt-16 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-4xl">Jungle Bells</p>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-bone/45">
              Small-group jungle treks across the Western Ghats and the Eastern
              Himalaya. Registered adventure operator, Karnataka Tourism.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-bone/35">Base camp</p>
            <p className="mt-3 text-[13px] leading-relaxed text-bone/60">
              Old Mangalore Road
              <br />
              Sringeri, Karnataka 577139
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-bone/35">Follow</p>
            <ul className="mt-3 space-y-1.5">
              {socials.map((s) => (
                <li key={s}>
                  <a
                    href="#top"
                    className="text-[13px] text-bone/60 underline-offset-4 transition-colors hover:text-amber hover:underline"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-bone/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-bone/30 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Jungle Bells Expeditions</span>
          <span>Leave no trace · Pay your porters</span>
        </div>
      </div>
    </footer>
  );
}
