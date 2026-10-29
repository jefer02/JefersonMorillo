import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { ALPHABET, encircle, glyph, runeSlots } from "@/lib/runes";

const LETTERS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const DIGITS = "0123456789";

/** Reads runes back into text, the way docs/runas.md teaches. */
const decode = (text: string) => {
  const byPath = new Map(Object.entries(ALPHABET).map(([ch, d]) => [d, ch]));
  return runeSlots(text)
    .map((d) => (d === null ? " " : byPath.get(d)))
    .join("");
};

describe("rune alphabet", () => {
  it("has one rune for every letter, Ñ, digit and the separator", () => {
    for (const ch of [...LETTERS, ...DIGITS, "·", ".", "-", "/"]) expect(ALPHABET[ch], ch).toBeTruthy();
  });

  it("never draws two characters the same way", () => {
    const paths = Object.values(ALPHABET);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("drops case and accents, but keeps Ñ apart from N", () => {
    expect(runeSlots("Presentación")).toEqual(runeSlots("PRESENTACION"));
    expect(glyph("ñ")).toBe(ALPHABET["Ñ"]);
    expect(glyph("Ñ")).not.toBe(ALPHABET.N);
  });

  it("turns spaces and _ into one gap and skips unknown characters", () => {
    expect(runeSlots("go_router")).toEqual(runeSlots("GO ROUTER"));
    expect(runeSlots("A   B")).toHaveLength(3);
    expect(runeSlots("A#B")).toEqual([ALPHABET.A, ALPHABET.B]);
  });

  it("spells the hero inscription", () => {
    expect(decode(profile.inscription.outer)).toBe("JEFERSON MORILLO·EL CONTADERO·NARIÑO·2024");
    expect(decode(profile.inscription.inner)).toBe("CONSTRUYO SOFTWARE");
    // Same density as the original rings (40 and 18 runes).
    expect(encircle(profile.inscription.outer)).toHaveLength(42);
    expect(encircle(profile.inscription.inner)).toHaveLength(19);
  });

  it("repeats short names to fill a sigil ring", () => {
    const ring = encircle("Vite", 12);
    expect(ring.length).toBeGreaterThanOrEqual(12);
    expect(ring.slice(0, 5)).toEqual(ring.slice(5, 10));
  });
});
