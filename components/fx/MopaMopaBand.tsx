import { Reveal } from "./Reveal";

type Props = { className?: string; flip?: boolean };

const TILE = 96;
const TILES = Array.from({ length: 20 }, (_, i) => i * TILE);

/** One layer of the band: the same cut shape repeated along the strip. */
function Layer({ i, fill, opacity = 1, d }: { i: number; fill: string; opacity?: number; d: string }) {
  return (
    <g className="reveal-item" style={{ ["--i" as string]: i }} fill={fill} opacity={opacity}>
      {TILES.map((x) => (
        <path key={x} d={d} transform={`translate(${x} 0)`} />
      ))}
    </g>
  );
}

/**
 * An original band inspired by barniz de Pasto Mopa-Mopa: thin translucent sheets of
 * color, cut into geometric shapes and laid over wood. On reveal the layers are laid
 * down one by one (jade, gold, vermilion, turquoise). Used as a chapter divider.
 */
export function MopaMopaBand({ className = "", flip = false }: Props) {
  return (
    <Reveal className={`bg-wood relative overflow-hidden ${className}`} threshold={0.6}>
      <svg
        viewBox="0 0 1920 40"
        preserveAspectRatio="xMinYMid slice"
        className={`block h-10 w-full ${flip ? "-scale-y-100" : ""}`}
        aria-hidden="true"
        focusable="false"
      >
        <Layer i={0} fill="var(--color-barniz-jade)" opacity={0.9} d="M0 40 L24 8 L48 40 Z M48 40 L72 8 L96 40 Z" />
        <Layer i={1} fill="var(--color-barniz-gold)" d="M24 20 L36 8 L48 20 L36 32 Z M72 20 L84 8 L96 20 L84 32 Z M0 0 H96 V3 H0 Z" />
        <Layer i={2} fill="var(--color-barniz-vermilion)" d="M8 40 V32 H16 V24 H24 V40 Z M56 40 V32 H64 V24 H72 V40 Z M40 0 H56 L48 8 Z" />
        <Layer
          i={3}
          fill="var(--color-barniz-turquoise)"
          d="M33 20 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M81 20 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M46 34 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0"
        />
      </svg>
    </Reveal>
  );
}
