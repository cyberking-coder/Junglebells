/**
 * A self-contained canopy scene that renders under every photographic layer,
 * so the site never falls back to flat black if a remote image is slow,
 * blocked or missing — and on its own still reads as a misted, back-lit jungle.
 *
 * Performance shape (this matters, and the hero is why):
 *
 *  1. No SVG filters. feGaussianBlur inside a scroll-parallax transform is
 *     re-rasterised every frame. Softness comes from radial gradients with
 *     transparent stops, which cost nothing to redraw.
 *  2. The scene is emitted as a data-URI <img>, not inline SVG. Live vector
 *     content is re-rasterised whenever an ancestor's scale changes — ~500
 *     paths, every frame, on the main thread. As an image the browser
 *     rasterises once and the parallax becomes a GPU bitmap transform.
 *
 * Both markup strings are built once at module load and reused by every
 * instance. `depth` fades the foreground fronds: 1 = full hero frame,
 * 0.5 = quieter interior band. `frondsOnly` gives just the silhouettes, for
 * layering above a photo.
 */
export default function ForestBackdrop({ depth = 1, className = "", frondsOnly = false }) {
  if (depth <= 0 && frondsOnly) return null;
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <img
        src={frondsOnly ? FRONDS_URI : SCENE_URI}
        alt=""
        draggable={false}
        style={frondsOnly ? { opacity: depth } : undefined}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* ---------------------------------------------------------------- geometry */

/** One compound leaf: a rachis with paired leaflets, drawn as a silhouette. */
function frond({ x, y, len, scale = 1, flip = false, r = 0, fill = "#050d08" }) {
  const dir = flip ? -1 : 1;
  const count = 22;
  let out = `<path d="M${x},${y} Q${x + dir * len * 0.55},${y + 4} ${
    x + dir * len
  },${y + 46 * scale}" stroke="${fill}" stroke-width="${
    5 * scale
  }" fill="none" stroke-linecap="round"/>`;

  // Each leaflet is a lens shape (two arcs) so the frond reads as a lanceolate
  // leaf rather than a string of beads.
  const blade = (px, py, l, w, rot) =>
    `<path d="M0,0 Q${l * 0.45},${-w} ${l},0 Q${l * 0.45},${w} 0,0 Z" fill="${fill}" transform="translate(${px} ${py}) rotate(${rot})"/>`;

  for (let i = 1; i <= count; i++) {
    const t = i / count;
    const px = x + dir * len * t;
    const py = y + Math.pow(t, 1.7) * 46 * scale;
    // Longest leaflets sit a third of the way out, tapering to a point.
    const l = (1 - Math.abs(t - 0.34) * 1.05) * 54 * scale;
    if (l <= 5) continue;
    const w = l * 0.2;
    const droop = 26 + t * 22;
    out += blade(px, py, l, w, dir > 0 ? -droop : 180 + droop);
    out += blade(px, py, l, w, dir > 0 ? droop : 180 - droop);
  }
  return `<g transform="rotate(${r} ${x} ${y})">${out}</g>`;
}

const DEFS = `
<linearGradient id="sky" x1="0" y1="0" x2="0.3" y2="1">
  <stop offset="0%" stop-color="#2f6039"/><stop offset="45%" stop-color="#17381f"/><stop offset="100%" stop-color="#0a140d"/>
</linearGradient>
<radialGradient id="shaft" cx="72%" cy="4%" r="62%">
  <stop offset="0%" stop-color="#d9b071" stop-opacity="0.42"/><stop offset="45%" stop-color="#7fae74" stop-opacity="0.12"/><stop offset="100%" stop-color="#060a07" stop-opacity="0"/>
</radialGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#060a07" stop-opacity="0"/><stop offset="100%" stop-color="#060a07" stop-opacity="1"/>
</linearGradient>
<radialGradient id="crownL" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="#3a7044" stop-opacity="0.85"/><stop offset="55%" stop-color="#2c5a35" stop-opacity="0.45"/><stop offset="100%" stop-color="#2c5a35" stop-opacity="0"/>
</radialGradient>
<radialGradient id="crownD" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="#16351f" stop-opacity="0.9"/><stop offset="60%" stop-color="#12301c" stop-opacity="0.5"/><stop offset="100%" stop-color="#12301c" stop-opacity="0"/>
</radialGradient>
<radialGradient id="mist" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="#cfe3cd" stop-opacity="0.16"/><stop offset="60%" stop-color="#cfe3cd" stop-opacity="0.07"/><stop offset="100%" stop-color="#cfe3cd" stop-opacity="0"/>
</radialGradient>
<linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#e6cf9b" stop-opacity="0.16"/><stop offset="55%" stop-color="#e6cf9b" stop-opacity="0.05"/><stop offset="100%" stop-color="#e6cf9b" stop-opacity="0"/>
</linearGradient>`;

// [cx, cy, rx, ry, isLight]
const FAR = [
  [180, 150, 300, 150, 1], [430, 90, 340, 170, 0], [720, 130, 380, 180, 1],
  [1020, 80, 340, 160, 0], [1300, 160, 320, 170, 1],
  [560, 330, 460, 170, 0], [1120, 360, 440, 170, 0],
];
const RAYS = [[860, 46], [930, 22], [985, 60], [1080, 30], [1140, 74], [1250, 26], [1310, 52]];
const TRUNKS = [
  [95, 26, 0.9], [270, 15, 0.75], [402, 38, 0.95], [640, 12, 0.6],
  [815, 30, 0.9], [1005, 18, 0.7], [1180, 44, 0.95], [1370, 20, 0.8],
];
const FRONDS = [
  { x: -30, y: 40, len: 430, scale: 1.5, r: 12 },
  { x: -10, y: 190, len: 330, scale: 1.1, r: 26 },
  { x: 1470, y: 60, len: 460, scale: 1.6, r: -14, flip: true },
  { x: 1460, y: 230, len: 320, scale: 1.05, r: -30, flip: true },
  { x: 300, y: -40, len: 300, scale: 1.0, r: 74 },
  { x: 1120, y: -50, len: 320, scale: 1.1, r: 104, flip: true },
];

const frondLayer = FRONDS.map(frond).join("");

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><defs>${DEFS}</defs>
<rect width="1440" height="900" fill="url(#sky)"/>
${FAR.map(([cx, cy, rx, ry, light]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${light ? "crownL" : "crownD"})"/>`).join("")}
${RAYS.map(([x, w]) => `<polygon points="${x},0 ${x + w},0 ${x - 190 + w},900 ${x - 260},900" fill="url(#ray)"/>`).join("")}
<rect width="1440" height="900" fill="url(#shaft)"/>
${TRUNKS.map(([x, w, o]) => `<rect x="${x}" y="-20" width="${w}" height="940" fill="#07110b" opacity="${o}"/>`).join("")}
<ellipse cx="620" cy="640" rx="900" ry="150" fill="url(#mist)"/>
<ellipse cx="900" cy="742" rx="760" ry="110" fill="url(#mist)"/>
<g opacity="0.95">${frondLayer}</g>
<rect y="520" width="1440" height="380" fill="url(#floor)"/></svg>`;

const FRONDS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">${frondLayer}</svg>`;

const encode = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\n/g, ""))}`;

const SCENE_URI = encode(SCENE);
const FRONDS_URI = encode(FRONDS_SVG);
