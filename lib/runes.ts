import { round } from "./rng";
import { transformPath } from "./svg-path";

// The site's rune alphabet (original; documented in docs/runas.md). Every rune is drawn in
// a 10×14 cell around a vertical spine at x = 5. A letter adds a head (top) and a foot
// (bottom): the head is the row and the foot the column of a 5 × 6 table. Digits are a
// diamond with tally marks. Runes are plain SVG paths (M/L/Q/m/a), so a whole ring of
// them can be baked into one path.

const ring = (cx: number, cy: number, r: number) =>
  `M${round(cx - r)} ${cy} a${r} ${r} 0 1 0 ${round(2 * r)} 0 a${r} ${r} 0 1 0 ${round(-2 * r)} 0`;

const SPINE = "M5 1.5 L5 12.5";

/** Top marks, one per row of the table. */
export const HEADS = [
  { name: "bar", d: "M5 3.2 L8.6 3.2" },
  { name: "roof", d: "M1.8 5 L5 1.5 L8.2 5" },
  { name: "hook", d: "M5 1.5 Q1.4 1.5 1.4 5.2" },
  { name: "eye", d: ring(5, 3.6, 1.7) },
  { name: "tilt", d: "M1.6 5.2 L8.4 2" },
] as const;

/** Bottom marks, one per column of the table. */
export const FEET = [
  { name: "bar", d: "M1.4 10.8 L5 10.8" },
  { name: "cup", d: "M1.8 8.6 Q5 14.6 8.2 8.6" },
  { name: "left", d: "M5 9 L1.6 12.8" },
  { name: "right", d: "M5 9 L8.4 12.8" },
  { name: "cross", d: "M2.2 9.2 L7.8 12.6" },
  { name: "ring", d: ring(2.3, 10.6, 1.5) },
] as const;

/** Row r, column c → the character written with HEADS[r] + FEET[c]. */
export const TABLE = ["ABCDEF", "GHIJKL", "MNÑOPQ", "RSTUVW", "XYZ.-/"] as const;

const DIAMOND = "M5 1.5 L8.6 7 L5 12.5 L1.4 7 L5 1.5";

/** n short horizontal ticks stacked inside the diamond. */
function ticks(n: number): string {
  return Array.from({ length: n }, (_, k) => {
    const y = 7 + (k - (n - 1) / 2) * 1.7;
    const half = 3.6 * (1 - Math.abs(y - 7) / 5.5) - 0.9;
    return `M${round(5 - half)} ${round(y)} L${round(5 + half)} ${round(y)}`;
  }).join(" ");
}

/** 0 is an eye, 1–4 are ticks, 5 is a stroke, 6–9 are a stroke plus 1–4 ticks. */
function digit(n: number): string {
  if (n === 0) return `${DIAMOND} ${ring(5, 7, 1.3)}`;
  const parts = [DIAMOND];
  if (n >= 5) parts.push("M5 3.6 L5 10.4");
  if (n % 5) parts.push(ticks(n % 5));
  return parts.join(" ");
}

/** The word separator "·": the spine opens into an eye. */
const SEPARATOR = `M5 1.5 L5 4.6 M5 9.4 L5 12.5 ${ring(5, 7, 1.7)}`;

export const ALPHABET: Readonly<Record<string, string>> = (() => {
  const out: Record<string, string> = { "·": SEPARATOR };
  TABLE.forEach((row, r) => [...row].forEach((ch, c) => (out[ch] = `${SPINE} ${HEADS[r].d} ${FEET[c].d}`)));
  for (let n = 0; n <= 9; n++) out[String(n)] = digit(n);
  return out;
})();

/** One position on a line of runes: a rune path, or `null` for the gap between words. */
export type Slot = string | null;

/**
 * Text → runes. Case and accents are dropped (Á → A) except Ñ, which has its own rune;
 * spaces and "_" become a gap, " · " becomes the separator, anything else is skipped.
 */
export function runeSlots(text: string): Slot[] {
  const clean = text
    .toUpperCase()
    .replace(/Ñ/g, "\u0000")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\u0000/g, "Ñ")
    .replace(/_/g, " ")
    .replace(/\s*·\s*/g, "·")
    .trim();
  const out: Slot[] = [];
  for (const ch of clean) {
    if (/\s/.test(ch)) {
      if (out.length && out[out.length - 1] !== null) out.push(null);
    } else if (ALPHABET[ch]) out.push(ALPHABET[ch]);
  }
  return out;
}

/** The rune for one character (undefined when the alphabet has none). */
export const glyph = (ch: string): string | undefined => runeSlots(ch)[0] ?? undefined;

/**
 * A closed inscription: the text, then a separator where the end meets the start. Short
 * texts repeat ("VITE · VITE · …") until the ring has at least `minSlots` positions.
 */
export function encircle(text: string, minSlots = 0): Slot[] {
  const once = runeSlots(text);
  if (once[once.length - 1] !== SEPARATOR) once.push(SEPARATOR);
  const out = [...once];
  while (once.length > 1 && out.length < minSlots) out.push(...once);
  return out;
}

/** Points of a regular polygon around (0,0), starting at the top. */
export function polygon(sides: number, radius: number, offset = -Math.PI / 2): [number, number][] {
  return Array.from({ length: sides }, (_, i) => {
    const a = offset + (i / sides) * Math.PI * 2;
    return [round(Math.cos(a) * radius), round(Math.sin(a) * radius)];
  });
}

/**
 * A ring of runes baked into a single path (one DOM node instead of one per rune). Reads
 * clockwise from the top, with the tops of the runes facing out.
 */
export function runeRingPath(slots: Slot[], radius: number, size = 1): string {
  const parts: string[] = [];
  slots.forEach((d, i) => {
    if (!d) return;
    const angle = -Math.PI / 2 + (i / slots.length) * Math.PI * 2;
    parts.push(
      transformPath(d, {
        tx: Math.cos(angle) * radius,
        ty: Math.sin(angle) * radius,
        rot: (angle * 180) / Math.PI + 90,
        scale: size,
        ox: -5,
        oy: -7,
      }),
    );
  });
  return parts.join(" ");
}
