"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Client shell for a wood insert: pauses its CSS animations off-screen and
 * adds the scrubbed parallax (layers marked with data-depth). The SVG itself is
 * server-rendered and passed in as children.
 */
export function ParallaxShell({ className = "", children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  // Pause the SVG animations while the insert is off-screen (they run on the main thread).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.paused = e.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scrubbed parallax. GSAP is imported on demand so it stays out of the initial bundle.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    // Load GSAP only when the insert is about to enter the viewport.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        load();
      },
      { rootMargin: "0px" },
    );
    near.observe(el);
    const load = () =>
      import("@/lib/gsap").then(({ gsap }) => {
        if (cancelled) return;
        ctx = gsap.context(() => {
          gsap.utils.toArray<SVGGElement>("[data-depth]", el).forEach((layer) => {
            const depth = Number(layer.dataset.depth);
            gsap.fromTo(
              layer,
              { yPercent: depth * 6 },
              {
                yPercent: -depth * 6,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });
        }, el);
      });
    return () => {
      cancelled = true;
      near.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
