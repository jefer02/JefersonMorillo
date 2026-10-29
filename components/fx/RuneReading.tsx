"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const DWELL = 2000;
const SHOWN = 5000;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  children: ReactNode;
  className?: string;
  /** "Las runas dicen" / "The runes read". */
  label: string;
  /** The decoded inscription, outer ring first. */
  lines: readonly string[];
  /** A translation of the inner ring, for the English site. */
  gloss?: string;
};

/**
 * The hero portrait, with a hidden easter egg: resting the pointer on it (or pressing it)
 * for two seconds decodes the runes of its magic circle in a small slip below. The slip
 * fades in for a few seconds and the rings warm to vermilion. Under reduced motion it is a
 * plain tooltip: it appears without movement and stays while the pointer is there.
 */
export function RuneReading({ children, className = "", label, lines, gloss }: Props) {
  const [shown, setShown] = useState(false);
  const dwell = useRef<number | undefined>(undefined);
  const hide = useRef<number | undefined>(undefined);
  const press = useRef<{ x: number; y: number } | null>(null);

  useEffect(
    () => () => {
      window.clearTimeout(dwell.current);
      window.clearTimeout(hide.current);
    },
    [],
  );

  // A press that turns into a scroll is not a long-press.
  useEffect(() => {
    const cancel = () => {
      press.current = null;
      window.clearTimeout(dwell.current);
    };
    window.addEventListener("scroll", cancel, { passive: true });
    return () => window.removeEventListener("scroll", cancel);
  }, []);

  const arm = (autoHide: boolean) => {
    window.clearTimeout(dwell.current);
    dwell.current = window.setTimeout(() => {
      setShown(true);
      window.clearTimeout(hide.current);
      if (autoHide) hide.current = window.setTimeout(() => setShown(false), SHOWN);
    }, DWELL);
  };
  const disarm = () => {
    press.current = null;
    window.clearTimeout(dwell.current);
  };

  return (
    <figure
      data-hero-anchor
      data-reading={shown ? "on" : "off"}
      className={`group/reading relative select-none [-webkit-touch-callout:none] ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") arm(!reducedMotion());
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        disarm();
        window.clearTimeout(hide.current);
        setShown(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        press.current = { x: e.clientX, y: e.clientY };
        arm(true);
      }}
      onPointerMove={(e) => {
        const p = press.current;
        if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 10) disarm();
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") disarm();
      }}
      onTouchEnd={disarm}
      // Keeps the long-press from opening the browser's image menu.
      onContextMenu={(e) => {
        if (press.current) e.preventDefault();
      }}
    >
      {children}
      <div
        aria-hidden="true"
        // On larger screens it lies over the lower edge of the circle, clear of the red band below.
        className={`border-rule bg-paper text-ink border-t-vermilion ease-book pointer-events-none absolute top-[calc(113%+0.25rem)] right-0 z-20 w-max max-w-[min(21rem,calc(100vw-2rem))] rounded-[3px] border border-t-2 px-3.5 py-2.5 shadow-[0_10px_30px_-12px_oklch(0.2_0.02_40/0.35)] transition-[opacity,translate] duration-500 motion-reduce:transition-none md:top-[calc(100%+0.25rem)] md:right-auto md:left-1/2 md:-translate-x-1/2 ${
          shown ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0 motion-reduce:translate-y-0"
        }`}
      >
        <p className="text-vermilion font-mono text-[0.66rem] tracking-[0.18em] uppercase">{label}</p>
        {lines.map((line) => (
          <p key={line} className="font-display mt-1 text-[0.86rem] leading-snug font-semibold tracking-[0.05em]">
            {/* Wraps between phrases, never inside one. */}
            {line.split(" · ").map((part, i, all) => (
              <Fragment key={part}>
                {i > 0 && " "}
                <span className="whitespace-nowrap">
                  {part}
                  {i < all.length - 1 && " ·"}
                </span>
              </Fragment>
            ))}
          </p>
        ))}
        {gloss && <p className="text-ink-soft mt-0.5 text-[0.8rem] italic">“{gloss}”</p>}
      </div>
    </figure>
  );
}
