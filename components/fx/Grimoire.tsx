"use client";

import { useRef, useState, type ReactNode } from "react";
import type { SkillSchool } from "@/types";
import { Sigil } from "./Sigil";

type Props = {
  schools: SkillSchool[];
  /** Server-rendered spell lists, one per school id. */
  panels: Record<string, ReactNode>;
};

/**
 * The grimoire as an open book: schools on the left page, the spells of the selected
 * school on the right (desktop, with JavaScript). One structure for every case, so
 * hydration never rebuilds the DOM: below `lg`, and without JavaScript, CSS shows every
 * school stacked with its spells; on `lg` with JS (the `js:` variant) it becomes the book.
 */
export function Grimoire({ schools, panels }: Props) {
  const [active, setActive] = useState(schools[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const index = schools.findIndex((s) => s.id === active);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = index;
    if (e.key in keys) next = (index + keys[e.key] + schools.length) % schools.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = schools.length - 1;
    else return;
    e.preventDefault();
    setActive(schools[next].id);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  return (
    <div className="js:lg:grid js:lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)] js:lg:bg-paper-2/70 js:lg:shadow-[0_30px_60px_-40px_oklch(0.2_0.02_50/0.5)] relative">
      {/* The gutter of the open book */}
      <span
        aria-hidden="true"
        className="js:lg:block pointer-events-none absolute inset-y-0 left-[calc(5/14*100%)] hidden w-10 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--ink)_10%,transparent)_50%,transparent)]"
      />
      <div
        ref={tabsRef}
        role="tablist"
        aria-orientation="vertical"
        aria-label="Categorías"
        onKeyDown={onKeyDown}
        className="js:lg:block hidden p-8 pr-10"
      >
        <p className="text-folio text-ink-soft mb-4 font-mono tracking-[0.2em] uppercase">Categorías</p>
        {schools.map((s) => {
          const selected = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(s.id)}
              className={`group border-rule flex w-full items-baseline gap-3 border-b py-3.5 text-left transition-colors duration-200 ${
                selected ? "text-vermilion" : "text-ink hover:text-vermilion"
              }`}
            >
              <Sigil
                name={s.rune}
                className={`ease-book size-6 shrink-0 self-center transition-transform duration-500 ${selected ? "rotate-45" : ""}`}
              />
              <span className="font-display text-[1.12rem] leading-snug font-bold">{s.name}</span>
            </button>
          );
        })}
      </div>
      <div className="js:lg:block js:lg:p-8 js:lg:pl-12 grid gap-12">
        {schools.map((s) => (
          <section
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`escuela-${s.id}`}
            data-active={s.id === active}
            className="js:lg:data-[active=false]:hidden focus-visible:outline-offset-[-4px]"
          >
            <h3 id={`escuela-${s.id}`} className="font-display js:lg:mb-4 js:lg:text-[1.6rem] text-[1.35rem] font-bold">
              {s.name}
            </h3>
            <div className="js:lg:mt-0 mt-3">{panels[s.id]}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
