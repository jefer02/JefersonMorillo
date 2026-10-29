import { round } from "@/lib/rng";
import { encircle, polygon, runeRingPath, runeSlots } from "@/lib/runes";

type Props = {
  /** What the sigil spells, usually the tool or section name. Same name, same sigil. */
  name: string;
  className?: string;
  /** Adds pathLength so CSS can draw the strokes with stroke-dashoffset. */
  drawable?: boolean;
};

/**
 * A small rune seal that spells a name in the site's rune alphabet (docs/runas.md): the
 * name runs around the ring, its first letter sits large in the middle, and the polygon
 * has 3 + (number of runes mod 4) corners.
 */
export function Sigil({ name, className, drawable = false }: Props) {
  const runes = runeSlots(name).filter((d): d is string => d !== null);
  const sides = 3 + (runes.length % 4);
  const pts = polygon(sides, 27);
  const slots = encircle(name, 12);
  // Long names get smaller runes so neighbours never touch.
  const band = runeRingPath(slots, 39, round(Math.min(0.62, 19.6 / slots.length)));
  const satellites = pts.filter((_, i) => i % 2 === 0);
  const len = drawable ? { pathLength: 1 } : {};

  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="sigil-strokes">
        <circle r="45" strokeWidth="2" {...len} />
        <path d={band} strokeWidth="1.3" {...len} />
        <circle r="33" strokeWidth="1" {...len} />
        <polygon points={pts.map((p) => p.join(",")).join(" ")} strokeWidth="1.6" {...len} />
        {satellites.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.4" strokeWidth="1.4" {...len} />
        ))}
        {runes[0] && <path d={runes[0]} transform="scale(2.2) translate(-5 -7)" strokeWidth="1.1" {...len} />}
      </g>
    </svg>
  );
}
