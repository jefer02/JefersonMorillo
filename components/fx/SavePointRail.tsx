"use client";

import { useEffect, useState } from "react";
import { navChapters } from "@/content/chapters";
import { scrollToId } from "@/lib/scroll";
import { Sigil } from "./Sigil";

const STORAGE_KEY = "atriz:visited";

function readVisited(): Set<string> {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

/**
 * Save points (puntos de guardado): one sigil per chapter on the right edge (desktop).
 * Visited chapters stay lit for the session; the current one is marked. A click scrolls
 * straight to the chapter: no overlays between the reader and the content.
 */
export function SavePointRail() {
  const [current, setCurrent] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [shown, setShown] = useState(false);

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
    scrollToId(id);
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
                    className={`size-7 transition-[color,transform] duration-200 ease-out ${
                      active ? "text-vermilion scale-110" : lit ? "text-gold-ink" : "text-ink-soft/45"
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
                  {c.name}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
