import { mulberry32, round } from "./rng";
import { transformPath } from "./svg-path";

// An original rune alphabet: each rune is a short path drawn in a 10×14 cell
// from a small vocabulary of strokes (stem, diagonal, bar, hook, dot ring).
const STROKES = [
  (r: () => number) => `M${round(2 + r() * 2)} 1 L${round(2 + r() * 2)} 13`,
  (r: () => number) => `M${round(6 + r() * 2)} 1 L${round(6 + r() * 2)} 13`,
  () => "M1 4 L9 4",
  () => "M2 10 L8 10",
  () => "M1 1 L9 13",
  () => "M9 1 L1 13",
  () => "M2 7 Q5 2 8 7",
  () => "M2 8 Q5 13 8 8",
  () => "M5 1 L5 6",
  () => "M3 13 L5 9 L7 13",
  () => "M7 3 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0",
];

export function runePath(seed: number): string {
  const r = mulberry32(seed);
  const parts = new Set<number>();
  parts.add(Math.floor(r() * 2)); // always a stem
  const extras = 1 + Math.floor(r() * 3);
  while (parts.size < extras + 1) parts.add(2 + Math.floor(r() * (STROKES.length - 2)));
  return [...parts].map((i) => STROKES[i](r)).join(" ");
}

export type PlacedRune = { d: string; transform: string };

/** A ring of runes placed tangentially around (0,0). */
export function runeRing(seed: number, count: number, radius: number, size = 1): PlacedRune[] {
  const out: PlacedRune[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const cx = Math.cos(angle) * radius;
    const cy = Math.sin(angle) * radius;
    const rot = (angle * 180) / Math.PI + 90;
    out.push({
      d: runePath(seed + i * 7919),
      transform: `translate(${round(cx)} ${round(cy)}) rotate(${round(rot)}) scale(${size}) translate(-5 -7)`,
    });
  }
  return out;
}

/** Points of a regular polygon around (0,0), starting at the top. */
export function polygon(sides: number, radius: number, offset = -Math.PI / 2): [number, number][] {
  return Array.from({ length: sides }, (_, i) => {
    const a = offset + (i / sides) * Math.PI * 2;
    return [round(Math.cos(a) * radius), round(Math.sin(a) * radius)];
  });
}

/** A whole ring of runes baked into a single path (one DOM node instead of `count`). */
export function runeRingPath(seed: number, count: number, radius: number, size = 1): string {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    parts.push(
      transformPath(runePath(seed + i * 7919), {
        tx: Math.cos(angle) * radius,
        ty: Math.sin(angle) * radius,
        rot: (angle * 180) / Math.PI + 90,
        scale: size,
        ox: -5,
        oy: -7,
      }),
    );
  }
  return parts.join(" ");
}
