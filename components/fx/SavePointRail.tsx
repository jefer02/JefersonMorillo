"use client";

import { useEffect, useRef, useState } from "react";
import { navChapters } from "@/content/chapters";
import { scrollToId } from "@/lib/scroll";
import { Sigil } from "./Sigil";

const STORAGE_KEY = "atriz:visited";
type Transition = "rewind" | "turn" | null;

function readVisited(): Set<string> {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

/**
 * Save points (puntos de guardado): one sigil per chapter on the right edge (desktop).
 * Visited chapters stay lit for the session; the current one glows. Jumping back up
 * plays a short rewind; jumping forward plays a page turn. Plain jump under reduced motion.
 */
export function SavePointRail() {
  const [current, setCurrent] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [shown, setShown] = useState(false);
  const [transition, setTransition] = useState<Transition>(null);
  const busy = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is client-only
    setVisited(readVisited());
    const sections = navChapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          setCurrent(id);
          setVisited((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev).add(id);
            try {
              sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
            } catch {}
            return next;
          });
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const hero = document.getElementById("inicio");
    const heroIo = hero ? new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0.25 }) : null;
    if (hero) heroIo?.observe(hero);
    return () => {
      io.disconnect();
      heroIo?.disconnect();
    };
  }, []);

  function jump(e: React.MouseEvent, id: string) {
    e.preventDefault();
    if (busy.current) return;
    const target = document.getElementById(id);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      scrollToId(id, { immediate: true });
      return;
    }
    const above = target.getBoundingClientRect().top < 0;
    busy.current = true;
    setTransition(above ? "rewind" : "turn");
    window.setTimeout(() => scrollToId(id, { immediate: true }), 230);
    window.setTimeout(() => {
      setTransition(null);
      busy.current = false;
    }, 460);
  }

  return (
    <>
      <nav
        aria-label="Capítulos"
        className={`fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ol className="flex flex-col items-center gap-1.5">
          {navChapters.map((c) => {
            const active = c.id === current;
            const lit = visited.has(c.id);
            return (
              <li key={c.id} className="group relative">
                <a
                  href={`#${c.id}`}
                  onClick={(e) => jump(e, c.id)}
                  aria-current={active ? "location" : undefined}
                  tabIndex={shown ? 0 : -1}
                  className="flex size-9 items-center justify-center rounded-full"
                >
                  <Sigil
                    name={c.ruby}
                    className={`ease-book size-7 transition-[color,transform,filter] duration-500 ${
                      active
                        ? "text-vermilion scale-110 drop-shadow-[0_0_6px_color-mix(in_oklch,var(--vermilion)_55%,transparent)]"
                        : lit
                          ? "text-gold-ink"
                          : "text-ink-soft/45"
                    } group-hover:text-vermilion`}
                  />
                  <span className="sr-only">
                    {c.name}
                    {lit ? " (visitado)" : ""}
                  </span>
                </a>
                <span
                  aria-hidden="true"
                  className="bg-ink text-paper pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-[3px] px-2.5 py-1 text-[0.78rem] whitespace-nowrap opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
                >
                  Cap. {c.numeral} · {c.name}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Transition overlays */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[60] transition-opacity duration-200 ${transition === "rewind" ? "opacity-100" : "opacity-0"}`}
        style={{ backdropFilter: "grayscale(1) sepia(0.35) contrast(0.9)" }}
      >
        {transition === "rewind" && (
          <svg viewBox="-50 -50 100 100" className="text-ink/70 absolute top-1/2 left-1/2 size-40 -translate-1/2">
            <circle r="44" fill="none" stroke="currentColor" strokeWidth="1" />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-38"
              stroke="var(--vermilion)"
              strokeWidth="2"
              strokeLinecap="round"
              className="origin-[0_0] animate-[rewind_420ms_linear]"
            />
          </svg>
        )}
      </div>
      <div
        aria-hidden="true"
        className={`bg-paper pointer-events-none fixed inset-0 z-[60] ${transition === "turn" ? "animate-[page-turn_460ms_cubic-bezier(0.45,0,0.2,1)]" : "hidden"}`}
        style={{ transformOrigin: "left center", boxShadow: "-30px 0 60px -20px oklch(0.2 0.02 50 / 0.35)" }}
      />
    </>
  );
}
