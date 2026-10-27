"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scroll driven by GSAP's ticker, so ScrollTrigger scenes stay in sync.
 * Both libraries load on the first user input, are created
 * imperatively (nothing remounts) and never run under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | null = null;
    let cancelled = false;

    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), import("@/lib/gsap")]);
      if (cancelled || mq.matches || stop) return;
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.12,
        anchors: { offset: -72 },
        prevent: (node) => node.closest("dialog, [cmdk-root], [data-lenis-prevent]") !== null,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      setLenis(lenis);
      document.documentElement.style.scrollBehavior = "auto";
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      stop = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
        document.documentElement.style.scrollBehavior = "";
        stop = null;
      };
    };

    const sync = () => (mq.matches ? stop?.() : void start());
    // Load on the first sign of reading (wheel, touch, key, pointer) instead of at page load,
    // so smooth scrolling never competes with the first paint or hydration.
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const onFirstInput = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstInput));
      sync();
    };
    events.forEach((e) => window.addEventListener(e, onFirstInput, { passive: true, once: true }));
    mq.addEventListener("change", sync);
    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, onFirstInput));
      mq.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return null;
}
