import { motion } from "framer-motion";

const items = [
  "Western Ghats",
  "Cloud Forest",
  "Leech Season",
  "Night Herping",
  "Shola Grassland",
  "River Crossings",
  "Camp Kitchen",
  "Local Porters",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="edge-fade relative border-y border-bone/10 bg-moss py-5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-12 whitespace-nowrap"
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-[12px] uppercase tracking-[0.3em] text-bone/45"
          >
            {t}
            <span className="h-1 w-1 rounded-full bg-amber/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
