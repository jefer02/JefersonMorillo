"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/types";

/**
 * The project's promo video, muted, over the card's screenshot. It loads nothing until the
 * pointer rests on the card's link, then fades in once it is actually playing. Touch
 * screens and reduced motion keep the still screenshot; the full video with sound and
 * controls is on the case study.
 */
export function HoverVideo({ video }: { video: VideoAsset }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("a");
    if (!el || !host) return;
    const allowed = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let inside = false;
    const enter = () => {
      if (!allowed.matches) return;
      inside = true;
      el.play()
        .then(() => inside && setPlaying(true))
        .catch(() => {});
    };
    const leave = () => {
      inside = false;
      setPlaying(false);
      el.pause();
    };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={video.src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 z-[6] size-full object-cover transition-opacity duration-300 ease-out ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
