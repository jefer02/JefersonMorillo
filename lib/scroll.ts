"use client";

import type Lenis from "lenis";

// The Lenis instance (when smooth scroll is active) so palette, rail and links share it.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

const HEADER_OFFSET = -72;

/** Scrolls to a chapter by id, through Lenis when active, natively otherwise. */
export function scrollToId(id: string, opts: { immediate?: boolean } = {}) {
  // "inicio" is the hero at the top of the page: go to the very top, under the header.
  const el = id === "top" || id === "inicio" ? null : document.getElementById(id);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis) {
    // Dimensions may be stale (e.g. Lenis started while a dialog locked scrolling).
    lenis.resize();
    const target = el ?? 0;
    const offset = el ? HEADER_OFFSET : 0;
    lenis.scrollTo(target, {
      offset,
      immediate: opts.immediate || reduce,
      duration: 1.1,
      // Chapters render lazily (content-visibility), so heights above the target can
      // change mid-flight: land precisely once the animation ends.
      onComplete: () => lenis?.scrollTo(target, { offset, immediate: true }),
    });
  } else if (el) {
    el.scrollIntoView({ behavior: reduce || opts.immediate ? "auto" : "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: reduce || opts.immediate ? "auto" : "smooth" });
  }
  if (el) {
    history.replaceState(null, "", `#${id}`);
    // Move focus for keyboard and screen-reader users without scrolling again.
    const heading = el.querySelector<HTMLElement>("h1, h2") ?? el;
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
