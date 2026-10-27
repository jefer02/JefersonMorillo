"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Monogram } from "./Monogram";

// An irregular wax edge: a circle whose radius wobbles, generated once (deterministic).
const WAX = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r = 46 + Math.sin(a * 7) * 2.2 + Math.cos(a * 11) * 1.4;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
})();

function Seal({ broken }: { broken: boolean }) {
  return (
    <span className="pointer-events-none absolute top-0 left-1/2 z-20 size-20 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      {[0, 1].map((half) => (
        <span
          key={half}
          className="ease-book absolute inset-0 transition-[transform,opacity] duration-700"
          style={{
            clipPath: half === 0 ? "polygon(0 0, 54% 0, 46% 100%, 0 100%)" : "polygon(54% 0, 100% 0, 100% 100%, 46% 100%)",
            transform: broken ? `translate(${half === 0 ? -18 : 18}px, 14px) rotate(${half === 0 ? -16 : 16}deg)` : "none",
            opacity: broken ? 0 : 1,
          }}
        >
          <svg viewBox="-50 -50 100 100" className="size-full drop-shadow-[0_3px_3px_oklch(0.2_0.05_30/0.35)]">
            <path d={WAX} fill="oklch(0.42 0.16 28)" />
          </svg>
          <Monogram className="absolute inset-[16%]" />
        </span>
      ))}
    </span>
  );
}

/**
 * A testimonial delivered as a sealed letter. Server HTML ships it open (no JS and
 * reduced motion read it immediately); after hydration, a letter still below the fold
 * is sealed and opens when it enters the viewport, or on click/Enter.
 */
export function WaxSealLetter({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    // Seal only after hydration (the server HTML ships the letter open).
    setOpen(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setOpen(true), 250 + index * 220);
          io.disconnect();
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="relative pt-10">
      <Seal broken={open} />
      <div
        className={`bg-paper-2 ease-book relative shadow-[0_22px_40px_-26px_oklch(0.2_0.02_50/0.5)] transition-[clip-path] duration-900 ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_82%_0)]"
        }`}
      >
        {/* The folded flap line across the top of the letter */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-10 bg-[linear-gradient(170deg,transparent_48%,var(--rule)_49%,transparent_51%),linear-gradient(190deg,transparent_48%,var(--rule)_49%,transparent_51%)]"
        />
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 z-10 cursor-pointer"
            aria-label="Abrir la carta"
          />
        )}
        <div className={`transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}>{children}</div>
      </div>
    </div>
  );
}
