import { motion } from "framer-motion";

/**
 * A fully self-contained canopy scene drawn in SVG. It renders under every
 * photographic layer so the site never falls back to flat black if a remote
 * image is slow, blocked or missing — and on its own it still reads as a
 * misted, back-lit jungle.
 *
 * `depth` shifts how much foreground silhouette is drawn: 1 = full scene for
 * the hero, 0.5 = quieter band for interior sections.
 */
export default function ForestBackdrop({ depth = 1, className = "", frondsOnly = false }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="fb-sky" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#2f6039" />
            <stop offset="45%" stopColor="#17381f" />
            <stop offset="100%" stopColor="#0a140d" />
          </linearGradient>
          <radialGradient id="fb-shaft" cx="72%" cy="4%" r="62%">
            <stop offset="0%" stopColor="#d9b071" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#7fae74" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#060a07" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fb-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#060a07" stopOpacity="0" />
            <stop offset="100%" stopColor="#060a07" stopOpacity="1" />
          </linearGradient>
          <filter id="fb-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="fb-softer" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
        </defs>

        {!frondsOnly && <rect width="1440" height="900" fill="url(#fb-sky)" />}
        {!frondsOnly && (
        <>

        {/* Far canopy — soft blurred crowns catching the light */}
        <g filter="url(#fb-softer)" opacity="0.75">
          {FAR.map(([cx, cy, rx, ry, fill, o], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill={fill}
              opacity={o}
            />
          ))}
        </g>

        {/* God-rays from the upper right, drifting slowly */}
        <motion.g
          animate={{ opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          {RAYS.map(([x, w], i) => (
            <polygon
              key={i}
              points={`${x},0 ${x + w},0 ${x - 190 + w},900 ${x - 260},900`}
              fill="#e6cf9b"
              opacity={0.045 + (i % 3) * 0.014}
              filter="url(#fb-soft)"
            />
          ))}
        </motion.g>

        <rect width="1440" height="900" fill="url(#fb-shaft)" />

        {/* Mid trunks */}
        <g opacity={0.85}>
          {TRUNKS.map(([x, w, o], i) => (
            <rect key={i} x={x} y={-20} width={w} height={940} fill="#07110b" opacity={o} />
          ))}
        </g>

        {/* Understory mist, two bands breathing against each other */}
        <motion.ellipse
          cx="620" cy="640" rx="900" ry="120" fill="#cfe3cd" opacity="0.09"
          filter="url(#fb-softer)"
          animate={{ cx: [560, 720, 560], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="900" cy="740" rx="760" ry="90" fill="#cfe3cd" opacity="0.07"
          filter="url(#fb-softer)"
          animate={{ cx: [980, 800, 980], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />

        </>
        )}

        {/* Foreground leaf silhouettes framing the corners */}
        <g opacity={0.95 * depth}>
          {FRONDS.map((f, i) => (
            <motion.g
              key={i}
              style={{ transformOrigin: `${f.x}px ${f.y}px` }}
              animate={{ rotate: [f.r - 1.6, f.r + 1.6, f.r - 1.6] }}
              transition={{
                duration: 10 + i * 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Frond {...f} />
            </motion.g>
          ))}
        </g>

        {!frondsOnly && <rect y="520" width="1440" height="380" fill="url(#fb-floor)" />}
      </svg>
    </div>
  );
}

/** One compound leaf: a rachis with paired leaflets, drawn as a silhouette. */
function Frond({ x, y, len, scale = 1, flip = false, fill = "#050d08" }) {
  const dir = flip ? -1 : 1;
  const leaflets = [];
  const count = 22;
  // Each leaflet is a lens shape (two arcs) so the frond reads as a lanceolate
  // leaf rather than a string of beads.
  const blade = (px, py, l, w, rot, key) => (
    <path
      key={key}
      d={`M0,0 Q${l * 0.45},${-w} ${l},0 Q${l * 0.45},${w} 0,0 Z`}
      fill={fill}
      transform={`translate(${px} ${py}) rotate(${rot})`}
    />
  );
  for (let i = 1; i <= count; i++) {
    const t = i / count;
    const px = x + dir * len * t;
    const py = y + Math.pow(t, 1.7) * 46 * scale;
    // Longest leaflets sit a third of the way out, tapering to a point.
    const l = (1 - Math.abs(t - 0.34) * 1.05) * 54 * scale;
    if (l <= 5) continue;
    const w = l * 0.2;
    const droop = 26 + t * 22;
    leaflets.push(
      blade(px, py, l, w, dir > 0 ? -droop : 180 + droop, `a${i}`),
      blade(px, py, l, w, dir > 0 ? droop : 180 - droop, `b${i}`)
    );
  }
  return (
    <g>
      <path
        d={`M${x},${y} Q${x + dir * len * 0.55},${y + 4} ${x + dir * len},${y + 46 * scale}`}
        stroke={fill}
        strokeWidth={5 * scale}
        fill="none"
        strokeLinecap="round"
      />
      {leaflets}
    </g>
  );
}

const FAR = [
  [180, 150, 260, 130, "#2c5a35", 0.55],
  [430, 90, 300, 150, "#1e4327", 0.6],
  [720, 130, 340, 160, "#356a3d", 0.5],
  [1020, 80, 300, 140, "#20492a", 0.6],
  [1300, 160, 280, 150, "#2c5a35", 0.5],
  [560, 330, 420, 150, "#12301c", 0.7],
  [1120, 360, 400, 150, "#12301c", 0.65],
];

const RAYS = [
  [860, 46], [930, 22], [985, 60], [1080, 30],
  [1140, 74], [1250, 26], [1310, 52],
];

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
