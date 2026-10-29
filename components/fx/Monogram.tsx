import { profile } from "@/content/profile";
import { encircle, runeRingPath } from "@/lib/runes";

// His name around the seal, in the site's rune alphabet (docs/runas.md).
const RUNES = runeRingPath(encircle(profile.displayName), 40, 0.55);

/** Jeferson's seal: "JM" inside a small magic circle. Used in the menu, wax seals and favicon. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" focusable="false">
      <circle r="49" fill="var(--vermilion)" />
      <g fill="none" stroke="var(--obi-ink)" strokeLinecap="round" strokeLinejoin="round">
        <circle r="45" strokeWidth="1.4" />
        <circle r="34" strokeWidth="1" />
        <path d={RUNES} strokeWidth="0.9" opacity="0.85" />
      </g>
      <text
        x="0"
        y="1"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--obi-ink)"
        style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em" }}
      >
        JM
      </text>
    </svg>
  );
}
