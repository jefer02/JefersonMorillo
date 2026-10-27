import { mulberry32, round } from "@/lib/rng";

const COLORS = ["var(--color-barniz-vermilion)", "var(--color-barniz-jade)", "var(--color-barniz-gold)", "var(--color-barniz-turquoise)"];

const rand = mulberry32(2009);
const PIECES = Array.from({ length: 28 }, (_, i) => {
  const angle = rand() * Math.PI * 2;
  const dist = 80 + rand() * 140;
  return {
    tx: `${round(Math.cos(angle) * dist, 0)}px`,
    ty: `${round(Math.sin(angle) * dist - 40, 0)}px`,
    rot: `${round(rand() * 540 - 270, 0)}deg`,
    delay: `${round(rand() * 160, 0)}ms`,
    color: COLORS[i % COLORS.length],
    // Talc puffs are soft dots; serpentines are thin curled strips.
    serpentine: i % 3 === 0,
    size: round(5 + rand() * 7, 1),
  };
});

/** A short burst of talc puffs and serpentines. Purely decorative; hidden under reduced motion. */
export function TalcBurst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 motion-reduce:hidden">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="absolute block opacity-0"
          style={
            {
              "--tx": p.tx,
              "--ty": p.ty,
              "--rot": p.rot,
              width: p.serpentine ? p.size * 3 : p.size,
              height: p.serpentine ? 3 : p.size,
              borderRadius: p.serpentine ? 2 : "9999px",
              background: p.serpentine ? p.color : `color-mix(in oklch, ${p.color} 35%, white)`,
              animation: `talc 1.3s cubic-bezier(0.22,1,0.36,1) ${p.delay} both`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
