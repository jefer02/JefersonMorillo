"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";
import { flushSync } from "react-dom";
import { IconMoon, IconSun } from "@/components/ui/Icons";
import { useMessages } from "@/lib/i18n/client";

/**
 * "Día de Blancos / Día de Negros". The switch spreads from the button like a puff of
 * talc (to light) or a drop of ink (to dark), using the View Transitions API.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useMessages().theme;
  const [mounted, setMounted] = useState(false);
  const tipId = useId();
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration guard
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const label = isDark ? t.toLight : t.toDark;

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 32;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.documentElement.dataset.themeSwitch = next === "dark" ? "ink" : "talc";
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    transition.finished.finally(() => delete document.documentElement.dataset.themeSwitch);
  }

  return (
    <span className="group/tip relative inline-flex">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-describedby={tipId}
        className="hover:text-vermilion inline-flex size-11 items-center justify-center rounded-[3px] transition-colors duration-200"
      >
        {mounted ? isDark ? <IconSun /> : <IconMoon /> : <span className="size-5" />}
      </button>
      <span
        role="tooltip"
        id={tipId}
        className="border-rule bg-paper text-ink-soft pointer-events-none absolute top-full right-0 z-10 mt-2 w-64 rounded-[3px] border px-3 py-2.5 text-[0.8rem] leading-snug opacity-0 shadow-[0_8px_24px_-12px_oklch(0.2_0.02_50/0.35)] transition-opacity duration-200 group-focus-within/tip:opacity-100 group-hover/tip:opacity-100"
      >
        <strong className="font-display text-ink mb-1 block">{isDark ? t.dark : t.light}</strong>
        {t.tooltip}
      </span>
    </span>
  );
}
