"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { IconMoon, IconSun } from "@/components/ui/Icons";
import { useMessages } from "@/lib/i18n/client";

/**
 * Light / dark theme. The switch spreads from the button like a puff of
 * talc (to light) or a drop of ink (to dark), using the View Transitions API.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useMessages().theme;
  const [mounted, setMounted] = useState(false);
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
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="hover:text-vermilion inline-flex size-11 items-center justify-center rounded-[3px] transition-colors duration-200"
    >
      {mounted ? isDark ? <IconSun /> : <IconMoon /> : <span className="size-5" />}
    </button>
  );
}
