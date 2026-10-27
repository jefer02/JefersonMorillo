import { hashString, round } from "@/lib/rng";
import { polygon, runeRingPath } from "@/lib/runes";

type Props = {
  className?: string;
  seed?: string;
  /** Slow counter-rotating rings. Stops automatically under reduced motion. */
  animated?: boolean;
};

const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// The 12 clock ticks as one path.
const TICKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 * Math.PI) / 180;
  const inner = i % 3 === 0 ? 62 : 59;
  return `M${round(Math.sin(a) * inner)} ${round(-Math.cos(a) * inner)} L${round(Math.sin(a) * 56)} ${round(-Math.cos(a) * 56)}`;
}).join(" ");

/**
 * The site's core graphic: an original summoning circle. Concentric rings, a band
 * of generated runes, a 12-tick clock ring (loops, save points) and a heptagon of nodes.
 * Each rune ring is a single baked path and each ring system is its own SVG, rotated
 * by its HTML wrapper on the compositor. Also the static fallback for the WebGL scene.
 */
export function MagicCircle({ className = "", seed = "cronica-de-atriz", animated = true }: Props) {
  const base = hashString(seed);
  const outer = runeRingPath(base, 40, 86, 0.82);
  const inner = runeRingPath(base + 101, 18, 50, 0.6);
  const hepta = polygon(7, 66);
  const nodes = hepta.map(([x, y]) => `M${x - 5.2} ${y}a5.2 5.2 0 1 0 10.4 0a5.2 5.2 0 1 0 -10.4 0`).join(" ");
  const dots = hepta.map(([x, y]) => `M${x - 1.4} ${y}a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0 -2.8 0`).join(" ");
  const spin = (cls: string) => (animated ? `${cls} motion-reduce:animate-none` : "");

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 ${spin("animate-spin-slow")}`}>
        <svg viewBox="-100 -100 200 200" className="size-full" focusable="false">
          <g {...stroke}>
            <circle r="97" strokeWidth="0.4" opacity="0.7" />
            <circle r="94" strokeWidth="0.9" />
            <path d={outer} strokeWidth="0.75" />
            <circle r="77" strokeWidth="0.9" />
            <circle r="74.5" strokeWidth="0.35" strokeDasharray="1 2.2" />
          </g>
        </svg>
      </div>
      <div className={`absolute inset-0 ${spin("animate-spin-slower")}`}>
        <svg viewBox="-100 -100 200 200" className="size-full" focusable="false">
          <g {...stroke}>
            <polygon points={hepta.map((p) => p.join(",")).join(" ")} strokeWidth="0.6" opacity="0.85" />
            <path d={nodes} strokeWidth="0.6" />
            <path d={dots} fill="currentColor" stroke="none" />
            <path d={TICKS} strokeWidth="0.8" />
            <circle r="56" strokeWidth="0.5" />
            <path d={inner} strokeWidth="0.55" opacity="0.9" />
            <circle r="42" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
