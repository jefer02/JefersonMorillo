import { ParallaxShell } from "./ParallaxShell";
import { mulberry32, round } from "@/lib/rng";

// Deterministic stars and city lights, so server and client render the same SVG.
const rand = mulberry32(5858);
const STARS = Array.from({ length: 70 }, () => ({
  x: round(rand() * 1440, 0),
  y: round(rand() * 250, 0),
  r: round(0.6 + rand() * 1.4, 1),
}));
const LIGHTS = Array.from({ length: 80 }, () => {
  // Pasto spreads along the valley floor at the foot of the volcano.
  const t = rand();
  return {
    x: round(960 + (t - 0.5) * 420 + (rand() - 0.5) * 50, 0),
    y: round(506 + Math.sin(t * Math.PI) * -24 + rand() * 40, 0),
    r: round(0.9 + rand() * 1.6, 1),
    warm: rand() > 0.35,
  };
});
// A few warm windows in El Contadero.
const TOWN_LIGHTS = [
  { x: 168, y: 470, r: 1.6 },
  { x: 196, y: 476, r: 1.4 },
  { x: 232, y: 468, r: 1.6 },
  { x: 262, y: 474, r: 1.3 },
];

/** Many small dots as a single path (fewer DOM nodes to render and hydrate). */
const dots = (pts: { x: number; y: number; r: number }[]) =>
  pts.map(({ x, y, r }) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`).join("");

const mix = (color: string, pct: number) => `color-mix(in oklch, var(--color-barniz-${color}) ${pct}%, var(--wood))`;
/** Pasture green: jade sheet over gold, laid on wood. */
const pasture = (pct: number) =>
  `color-mix(in oklch, color-mix(in oklch, var(--color-barniz-jade) 62%, var(--color-barniz-gold)) ${pct}%, var(--wood))`;

/** A small farmhouse: walls and a pitched roof. */
function House({ x, y, w = 26, roof = "var(--color-barniz-vermilion)" }: { x: number; y: number; w?: number; roof?: string }) {
  const h = w * 0.62;
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill="var(--wood-ink)" opacity="0.92" />
      <path d={`M${x - 4} ${y - h} L${x + w / 2} ${y - h - w * 0.5} L${x + w + 4} ${y - h} Z`} fill={roof} />
    </g>
  );
}

/** Cattle as simple cut shapes (body, head, legs), like a barniz motif. */
function Cow({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} fill="var(--wood)">
      <rect x="-11" y="-9" width="20" height="9" rx="2" />
      <rect x="8" y="-12" width="7" height="6" rx="1.5" />
      <rect x="-9" y="0" width="2.4" height="6" />
      <rect x="-3" y="0" width="2.4" height="6" />
      <rect x="2" y="0" width="2.4" height="6" />
      <rect x="6" y="0" width="2.4" height="6" />
    </g>
  );
}

/**
 * Chapter I as a color insert that travels: from the green hills and pastures of
 * El Contadero (farmhouses, cattle, fences), along the road, to the Galeras (Urcunina)
 * asleep like a lion with a breathing crater, páramo mist and Pasto's lights in the
 * valley, with La Cocha in the distance. Layers drift at different depths on scroll.
 */
export function AtrizLandscape({ className = "" }: { className?: string }) {
  return (
    <ParallaxShell className={className}>
      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 size-full"
        role="img"
        aria-label="Ilustración: las colinas verdes y los potreros de El Contadero, con casas, ganado y cercas; una carretera que cruza hasta el valle donde el volcán Galeras, con su cráter encendido, mira las luces de Pasto, y la Laguna de La Cocha a lo lejos."
      >
        <defs>
          <radialGradient id="atriz-crater">
            <stop offset="0" stopColor="var(--ember)" stopOpacity="0.9" />
            <stop offset="0.3" stopColor="var(--ember)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--ember)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="atriz-mist">
            <stop offset="0" stopColor="var(--wood-ink)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--wood-ink)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="atriz-lake" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-barniz-turquoise)" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="var(--color-barniz-turquoise)" stopOpacity="0.85" />
            <stop offset="1" stopColor="var(--color-barniz-turquoise)" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <g data-depth="0.2">
          {[0, 1, 2].map((group) => (
            <path
              key={group}
              d={dots(STARS.filter((_, i) => i % 3 === group))}
              fill="var(--color-barniz-gold)"
              className="motion-safe:animate-[twinkle_4s_ease-in-out_infinite]"
              style={{ animationDelay: `${group * 1.3}s` }}
            />
          ))}
        </g>

        {/* Distant cordillera */}
        <g data-depth="0.4">
          <path
            d="M0 330 L110 300 L210 318 L320 290 L430 312 L540 286 L640 304 L760 276 L900 296 L1020 266 L1140 290 L1260 268 L1360 294 L1440 282 L1440 640 L0 640 Z"
            fill={mix("turquoise", 55)}
          />
        </g>

        {/* Galeras, on the Pasto side: head, neck, long back, crater, haunch */}
        <g data-depth="0.7">
          <g transform="translate(196 0)">
            <path
              d="M300 470 L360 420 L420 372 L452 346 L478 334 L500 338 L520 352 L544 358 L590 300 L640 236 L668 206 L684 210 L700 206 L730 210 L790 236 L870 272 L960 310 L1080 352 L1160 390 L1244 440 L1244 640 L300 640 Z"
              fill={mix("jade", 84)}
            />
            <path
              d="M420 372 L452 346 L478 334 L500 338 L520 352 L544 358 L590 300 L640 236 L668 206 M700 206 L730 210 L790 236 L870 272 L960 310 L1080 352"
              fill="none"
              stroke="var(--color-barniz-gold)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <g className="origin-center [transform-box:fill-box] motion-safe:animate-[crater_5s_ease-in-out_infinite]">
              <circle cx="684" cy="206" r="70" fill="url(#atriz-crater)" />
            </g>
            <circle cx="684" cy="210" r="4.5" fill="var(--ember)" />
          </g>
        </g>

        {/* El Contadero: rolling hills and pastures */}
        <g data-depth="0.9">
          <path d="M0 420 Q90 360 200 392 T420 404 Q520 400 640 470 Q700 500 780 520 L780 640 L0 640 Z" fill={pasture(70)} />
          <path
            d="M0 420 Q90 360 200 392 T420 404 Q520 400 640 470"
            fill="none"
            stroke="var(--color-barniz-gold)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <path d="M0 470 Q120 432 250 452 T520 476 Q620 500 720 540 L720 640 L0 640 Z" fill={pasture(88)} />
          {/* Farmhouses */}
          <House x={150} y={478} />
          <House x={186} y={484} w={22} roof="var(--color-barniz-turquoise)" />
          <House x={222} y={476} w={28} />
          <House x={258} y={482} w={20} roof="var(--color-barniz-gold)" />
          <path d={dots(TOWN_LIGHTS)} fill="var(--color-barniz-gold)" className="motion-safe:animate-[twinkle_3.5s_ease-in-out_infinite]" />
          {/* Fences across the pasture */}
          <path
            d="M40 520 L330 508 M40 520 V510 M80 518 V508 M120 517 V507 M160 515 V505 M200 513 V503 M240 512 V502 M280 510 V500 M320 508 V498"
            stroke="var(--wood-ink)"
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <Cow x={110} y={545} />
          <Cow x={168} y={552} flip />
          <Cow x={300} y={540} />
        </g>

        {/* Páramo mist */}
        <g data-depth="1" className="motion-safe:animate-[mist_18s_ease-in-out_infinite_alternate]">
          <ellipse cx="560" cy="430" rx="420" ry="42" fill="url(#atriz-mist)" />
          <ellipse cx="1140" cy="458" rx="460" ry="38" fill="url(#atriz-mist)" />
        </g>

        {/* La Cocha in the distance, with Isla La Corota */}
        <g data-depth="0.9">
          <ellipse cx="1330" cy="474" rx="100" ry="12" fill="url(#atriz-lake)" />
          <path d="M1320 470 Q1328 464 1338 470 Z" fill={mix("jade", 85)} />
          <path
            d="M1250 476 L1286 476 M1360 478 L1400 478"
            stroke="var(--wood-ink)"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="6 10"
            className="motion-safe:animate-[shimmer_3.5s_linear_infinite]"
          />
        </g>

        {/* Valley floor with Pasto's lights */}
        <g data-depth="1.3">
          <path d="M600 560 Q680 506 880 490 L1060 500 L1240 504 L1440 514 L1440 640 L600 640 Z" fill={mix("gold", 46)} />
          {[0, 1, 2].map((group) => (
            <g key={group} className="motion-safe:animate-[twinkle_3s_ease-in-out_infinite]" style={{ animationDelay: `${group}s` }}>
              <path d={dots(LIGHTS.filter((l, i) => i % 3 === group && l.warm))} fill="var(--color-barniz-gold)" />
              <path d={dots(LIGHTS.filter((l, i) => i % 3 === group && !l.warm))} fill="var(--wood-ink)" />
            </g>
          ))}
        </g>

        {/* Foreground and the road from El Contadero to Pasto */}
        <g data-depth="1.8">
          <path d="M0 590 L240 572 L480 584 L720 566 L960 580 L1200 568 L1440 584 L1440 640 L0 640 Z" fill={mix("vermilion", 78)} />
          <path
            d="M200 498 C 300 560, 420 600, 620 586 S 860 548, 940 532"
            fill="none"
            stroke="var(--color-barniz-gold)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="2 12"
          />
        </g>
      </svg>

      {/* Callouts, like captions on an insert illustration (desktop only; the text below says the same). */}
      <div
        aria-hidden="true"
        className="text-wood-ink/85 pointer-events-none absolute inset-0 hidden font-mono text-[0.68rem] tracking-[0.16em] uppercase md:block"
      >
        <span className="absolute top-[56%] left-[9%] flex items-center gap-2">
          El Contadero
          <span className="h-px w-8 bg-current" />
        </span>
        <span className="absolute top-[22%] left-[62%] flex items-center gap-2">
          <span className="h-px w-8 bg-current" />
          Galeras · Urcunina
        </span>
        <span className="absolute top-[70%] left-[70%] flex items-center gap-2">
          <span className="h-px w-8 bg-current" />
          San Juan de Pasto
        </span>
        <span className="absolute top-[66%] right-[2%]">La Cocha</span>
      </div>

      {/* Print registration marks */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
        <svg key={pos} viewBox="0 0 20 20" className={`absolute ${pos} text-gold/70 size-5`} aria-hidden="true">
          <circle cx="10" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M10 0 V20 M0 10 H20" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      ))}
    </ParallaxShell>
  );
}
