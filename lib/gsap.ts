"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once on the client. GSAP owns scroll storytelling; Motion handles micro-interactions.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE_BOOK = "expo.out";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
