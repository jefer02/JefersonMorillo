"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Fraction of the element that must be visible to reveal. */
  threshold?: number;
  [key: string]: unknown;
};

/**
 * Progressive reveal. Content is visible in the server HTML; only after hydration, and
 * only if the element is still below the fold and motion is allowed, it is "armed"
 * (hidden by CSS) and then revealed when it enters the viewport. Children opt in with
 * the `.reveal-item` class and an optional `--i` index for staggering.
 */
export function Reveal({ as: Tag = "div", className, children, threshold = 0.2, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already on screen: never hide it
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "";
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
