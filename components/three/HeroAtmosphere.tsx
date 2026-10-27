"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export type CircleLayout = {
  cx: number;
  cy: number;
  d: number;
  w: number;
  h: number;
};

function canRunScene(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Phones keep the (compositor-animated) SVG circle: better battery and Lighthouse budgets.
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Centers the big circle on the portrait ([data-hero-anchor]) so both read as one summoning. */
function useCircleLayout(ref: React.RefObject<HTMLDivElement | null>) {
  const [layout, setLayout] = useState<CircleLayout | null>(null);
  useLayoutEffect(() => {
    const host = ref.current;
    const section = host?.parentElement;
    const anchor = section?.querySelector<HTMLElement>("[data-hero-anchor]");
    if (!host || !section || !anchor) return;
    const measure = () => {
      const s = section.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();
      const w = s.width;
      const h = s.height;
      const desktop = w >= 768;
      setLayout({
        cx: a.left - s.left + a.width / 2,
        cy: a.top - s.top + a.height / 2,
        d: desktop ? Math.min(h * 1.15, w * 0.62) : w * 1.05,
        w,
        h,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    return () => ro.disconnect();
  }, [ref]);
  return layout;
}

/**
 * Hero background. Server HTML ships the static SVG circle; after first paint and an
 * idle moment, capable devices swap in the WebGL scene (circle shader + mana embers).
 */
export function HeroAtmosphere({ fallback }: { fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const layout = useCircleLayout(ref);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!canRunScene()) return;
    // The static SVG circle is already on screen; the WebGL version (a 240 KB chunk) loads
    // on the first sign of presence (pointer, scroll, touch, key) or after 10 s, and always
    // in an idle moment, so it never competes with the first paint or hydration.
    let idle = 0;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const events = ["pointermove", "wheel", "touchstart", "keydown", "scroll"] as const;
    const begin = () => {
      cleanup();
      if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setEnabled(true), { timeout: 2000 });
      else setEnabled(true);
    };
    const timer = window.setTimeout(begin, 10000);
    const cleanup = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, begin));
    };
    events.forEach((e) => window.addEventListener(e, begin, { passive: true, once: true }));
    return () => {
      cleanup();
      if (idle) window.cancelIdleCallback?.(idle);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // Pause the hero's CSS animations (crater, circle rings) while off-screen.
        if (el.parentElement) el.parentElement.dataset.paused = entry.isIntersecting ? "false" : "true";
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const circleStyle = layout ? { left: layout.cx, top: layout.cy, width: layout.d, height: layout.d } : undefined;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {!ready && (
        <div
          style={circleStyle}
          className={`ease-book absolute top-[14%] left-[80%] aspect-square w-[105vw] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 md:top-1/2 md:left-[72%] md:w-[min(110vh,62vw)] ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        >
          {fallback}
        </div>
      )}
      {enabled && layout && (
        <div className={`ease-book absolute inset-0 transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene active={visible} layout={layout} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
