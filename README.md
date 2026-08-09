# Jungle Bells

Marketing site for Jungle Bells — a small-group jungle trekking outfit that opens
every departure to outside joiners who pay a per-head share of the trail.

Dark, cinematic, editorial. Built as a single-page experience.

## Stack

- **Vite + React 19**
- **Tailwind CSS v4** (`@theme` tokens, no config file)
- **Framer Motion** — scroll-linked parallax, masked word reveals, cursor-follow
  trek previews, page-progress rail, modal transitions
- **Lenis** — smooth scroll (disabled under `prefers-reduced-motion`)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx                     page composition, Lenis, scroll progress bar
  data/treks.js               all copy: departures, stats, steps, testimonials
  components/
    primitives.jsx            Reveal / SplitLine / Eyebrow / MagneticButton + shared easing
    ForestBackdrop.jsx        procedural SVG canopy: rays, mist, trunks, animated fronds
    Photo.jsx                 photo layer with the SVG canopy as its floor
    Preloader.jsx  Nav.jsx  Hero.jsx  Marquee.jsx  Ethos.jsx
    Treks.jsx  Steps.jsx  Voices.jsx  Join.jsx  Footer.jsx
    BookingModal.jsx          seat-reservation flow (client-side only)
```

## Imagery

Photographs are referenced from Unsplash CDN URLs. Every photo sits on top of
`ForestBackdrop`, a hand-drawn SVG canopy, so the design still holds if an image
is slow, blocked or swapped out — replace the `HERO_IMG` / `BAND` / `IMG`
constants and `data/treks.js` `image` fields with your own assets when you have
licensed photography.

## Notes

- The booking modal and both email forms are front-end only — no backend is
  wired up. `BookingModal` resolves to a confirmation state locally.
- Motion respects `prefers-reduced-motion`: smooth scroll is skipped and CSS
  transitions collapse.
