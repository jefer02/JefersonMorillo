"use client";

import { useId, useState } from "react";
import { isProd, isTodo } from "@/lib/todo";
import type { ShelfBook } from "@/types";

// Constant in both themes so the spine text keeps AA contrast.
const SPINE: Record<ShelfBook["color"], string> = {
  vermilion: "bg-obi text-obi-ink",
  jade: "bg-[oklch(0.44_0.09_165)] text-obi-ink",
  gold: "bg-barniz-gold text-[oklch(0.25_0.05_70)]",
  turquoise: "bg-[oklch(0.44_0.08_205)] text-obi-ink",
  ember: "bg-[oklch(0.72_0.16_50)] text-[oklch(0.22_0.05_45)]",
  wood: "bg-wood text-wood-ink",
};

const HEIGHTS = ["h-64", "h-56", "h-60", "h-52", "h-[15.5rem]"];

/**
 * His favorite anime and light novels as book spines: titles in text only, original
 * colors and type, no official art. Hover or focus pulls a spine out and shows his take.
 */
export function Shelf({ books }: { books: ShelfBook[] }) {
  const visible = books.filter((b) => !(isProd && isTodo(b.title)));
  const [active, setActive] = useState<number | null>(null);
  const liveId = useId();
  const current = active !== null ? visible[active] : null;

  return (
    <div>
      <ul
        className="border-ink flex snap-x snap-mandatory items-end gap-2.5 overflow-x-auto border-b-[3px] px-1 pt-6 pb-0 md:overflow-visible"
        aria-label="Estante de favoritos"
      >
        {visible.map((book, i) => {
          const open = active === i;
          return (
            <li key={i} className="snap-start">
              <button
                type="button"
                aria-describedby={liveId}
                aria-pressed={open}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(open ? null : i)}
                className={`ease-book relative flex w-14 items-center justify-center rounded-t-[3px] shadow-[inset_-6px_0_0_oklch(0_0_0/0.12),inset_2px_0_0_oklch(1_0_0/0.15)] transition-transform duration-300 sm:w-16 ${
                  SPINE[book.color]
                } ${HEIGHTS[i % HEIGHTS.length]} ${open ? "-translate-y-4" : "hover:-translate-y-2"}`}
              >
                <span className="absolute inset-x-0 top-3 mx-auto h-px w-8 bg-current opacity-60" aria-hidden="true" />
                <span
                  className={`vertical font-display max-h-[calc(100%-2.25rem)] font-bold ${
                    book.title.length > 22 ? "text-[0.74rem] leading-tight tracking-[0.02em]" : "text-[1.05rem] tracking-[0.04em]"
                  }`}
                >
                  {isTodo(book.title) ? "Pendiente" : book.title}
                </span>
                <span className="absolute inset-x-0 bottom-3 mx-auto h-px w-8 bg-current opacity-60" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
      <p id={liveId} aria-live="polite" className="text-ink-soft mt-4 min-h-[3.5rem] max-w-[52ch] text-[0.98rem] leading-relaxed">
        {current ? (
          <>
            <strong className="font-display text-ink">{isTodo(current.title) ? "Otro favorito" : current.title}: </strong>
            {isTodo(current.take) ? (
              isProd ? (
                ""
              ) : (
                <span className="text-vermilion font-mono text-[0.8em]">{current.take}</span>
              )
            ) : (
              current.take
            )}
          </>
        ) : (
          "Pasa el cursor o enfoca un lomo para leer lo que pienso de cada historia."
        )}
      </p>
    </div>
  );
}
