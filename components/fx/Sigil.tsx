import { hashString, mulberry32, round } from "@/lib/rng";
import { polygon, runePath } from "@/lib/runes";

type Props = {
  /** The seed, usually the framework or chapter name. Same name, same sigil. */
  name: string;
  className?: string;
  /** Adds pathLength so CSS can draw the strokes with stroke-dashoffset. */
  drawable?: boolean;
};

/** A small rune circle generated deterministically from a name. */
export function Sigil({ name, className, drawable = false }: Props) {
  const seed = hashString(name);
  const r = mulberry32(seed);
  const sides = 3 + Math.floor(r() * 4);
  const pts = polygon(sides, 30, -Math.PI / 2 + r() * 0.6);
  const ringDash = r() > 0.5;
  const core = runePath(seed);
  const satellites = pts.filter((_, i) => i % 2 === 0);
  const len = drawable ? { pathLength: 1 } : {};

  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="sigil-strokes">
        <circle r="45" strokeWidth="2" {...len} />
        <circle r="39" strokeWidth="1" strokeDasharray={ringDash ? "2 4" : undefined} {...len} />
        <polygon points={pts.map((p) => p.join(",")).join(" ")} strokeWidth="1.6" {...len} />
        {satellites.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={round(3 + r() * 2)} strokeWidth="1.4" {...len} />
        ))}
        <path d={core} transform="scale(2.2) translate(-5 -7)" strokeWidth="1.1" {...len} />
      </g>
    </svg>
  );
}
