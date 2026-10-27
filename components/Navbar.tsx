"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navChapters, chapterById } from "@/content/chapters";
import { profile } from "@/content/profile";
import { Monogram } from "@/components/fx/Monogram";
import { ThemeToggle } from "@/components/fx/ThemeToggle";
import { Indice } from "@/components/fx/Indice";
import { CommandPalette } from "@/components/fx/CommandPalette";
import { SavePointRail } from "@/components/fx/SavePointRail";
import { IconMenu } from "@/components/ui/Icons";

const SHORT: Record<string, string> = {
  "acerca-de-mi": "Acerca de mí",
  proyectos: "Proyectos",
  experiencia: "Experiencia",
};

/** Tracks which chapter is under the header, for the running head and aria-current. */
function useCurrentChapter() {
  const [current, setCurrent] = useState("inicio");
  useEffect(() => {
    const sections = ["inicio", ...navChapters.map((c) => c.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return current;
}

export default function Navbar() {
  const current = useCurrentChapter();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const chapter = chapterById[current];
  const runningHead =
    chapter && chapter.id !== "inicio" ? `Cap. ${chapter.numeral} · ${chapter.name}` : `${profile.seriesTitle} · ${profile.volume}`;

  return (
    <>
      <header className="border-rule bg-paper/95 sticky top-0 z-50 border-b">
        <nav aria-label="Principal" className="mx-auto flex h-16 max-w-[1440px] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-10">
          <Link href="/#inicio" className="group flex min-h-11 shrink-0 items-center gap-2.5 sm:gap-3">
            <Monogram className="ease-book size-8 transition-transform duration-500 group-hover:rotate-[30deg] sm:size-9" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[0.98rem] font-bold tracking-[-0.01em] whitespace-nowrap sm:text-[1.05rem]">
                <span className="max-[339px]:hidden">{profile.displayName}</span>
                <span className="hidden max-[339px]:inline">{profile.initials}</span>
                <span className="sr-only">, volver a la portada</span>
              </span>
              <span
                className="small-caps text-ink-soft hidden max-w-[16rem] truncate font-mono text-[0.72rem] sm:block lg:max-w-[11rem] xl:max-w-[18rem]"
                aria-hidden="true"
              >
                {runningHead}
              </span>
            </span>
          </Link>

          <ul className="ml-auto hidden items-center lg:flex">
            {navChapters.map((c) => {
              const active = c.id === current;
              return (
                <li key={c.id}>
                  <a
                    href={`/#${c.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`hover:text-vermilion relative inline-flex min-h-11 items-center px-2 text-[0.84rem] transition-colors duration-200 xl:px-2.5 xl:text-[0.88rem] ${
                      active ? "text-vermilion" : "text-ink"
                    }`}
                  >
                    {SHORT[c.id] ?? c.name}
                    <span
                      aria-hidden="true"
                      className={`bg-vermilion ease-book absolute inset-x-2 bottom-2 h-px origin-left transition-transform duration-300 xl:inset-x-2.5 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <CommandPalette />
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="hover:text-vermilion inline-flex min-h-11 items-center gap-2 rounded-[3px] px-2 text-[0.9rem] font-medium sm:px-3 lg:hidden"
            >
              <IconMenu />
              <span>Índice</span>
            </button>
          </div>
        </nav>
        <Indice open={open} onClose={() => setOpen(false)} current={current} />
      </header>
      {/* Outside the header: its backdrop-filter would trap fixed-position children. */}
      <SavePointRail />
    </>
  );
}
