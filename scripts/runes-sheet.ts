// Draws the rune alphabet (lib/runes.ts) as docs/runas-alfabeto.svg, the chart that
// docs/runas.md shows. Run after changing the alphabet: npx tsx scripts/runes-sheet.ts
import { writeFileSync } from "node:fs";
import { ALPHABET, FEET, HEADS, TABLE } from "../lib/runes";

const CELL = 64;
const LEFT = 70;
const TOP = 40;
const ink = "#1d1a17";
const soft = "#6b625a";

const rune = (d: string, x: number, y: number) =>
  `<path d="${d}" transform="translate(${x + 17} ${y}) scale(3)" fill="none" stroke="${ink}" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>`;
const label = (text: string, x: number, y: number, color = ink, size = 13) =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="ui-monospace, monospace" font-size="${size}" text-anchor="middle">${text}</text>`;

const parts: string[] = [];
FEET.forEach((f, c) => parts.push(label(f.name, LEFT + c * CELL + CELL / 2, TOP - 16, soft, 11)));
TABLE.forEach((row, r) => {
  const y = TOP + r * (CELL + 24);
  parts.push(label(HEADS[r].name, LEFT / 2, y + 34, soft, 11));
  [...row].forEach((ch, c) => {
    const x = LEFT + c * CELL;
    parts.push(rune(ALPHABET[ch], x, y), label(ch, x + CELL / 2, y + 62));
  });
});
const digitsY = TOP + TABLE.length * (CELL + 24) + 20;
parts.push(label("digits and separator", LEFT + 3 * CELL, digitsY - 8, soft, 11));
[..."0123456789·"].forEach((ch, i) => {
  const x = LEFT + (i % 6) * CELL;
  const y = digitsY + Math.floor(i / 6) * (CELL + 24);
  parts.push(rune(ALPHABET[ch], x, y), label(ch, x + CELL / 2, y + 62));
});

const width = LEFT + 6 * CELL + 20;
const height = digitsY + 2 * (CELL + 24) + 10;
writeFileSync(
  new URL("../docs/runas-alfabeto.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
<rect width="100%" height="100%" fill="#f7f2ea"/>
${parts.join("\n")}
</svg>
`,
);
console.log("docs/runas-alfabeto.svg");
