"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

const HEIGHTS = ["h-56", "h-48", "h-52", "h-44", "h-[13.5rem]"];
// Strong ease-out: the new content arrives immediately, then settles.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const takeOf = (book: ShelfBook) => (isTodo(book.take) ? (isProd ? "" : book.take) : book.take);

/**
 * His favorite anime and light novels as book spines: titles in text only, original
 * colors and type, no official art. Choosing a spine pulls that book up and forward and
 * dims the rest; the panel beside the shelf (below it on small screens) crossfades to its
 * title, genre and his take. Same spine or Esc closes it. Reduced motion: no movement,
 * the panel content simply fades.
 */
export function Shelf({ books }: { books: ShelfBook[] }) {
  const visible = books.filter((b) => !(isProd && isTodo(b.title)));
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const panelId = useId();

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const book = active !== null ? visible[active] : null;
  const shift = reduce ? "translateY(0px)" : "translateY(6px)";
  const exitShift = reduce ? "translateY(0px)" : "translateY(-4px)";
  const blur = reduce ? "blur(0px)" : "blur(2px)";

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:gap-8">
      <ul className="border-ink flex shrink-0 items-end gap-2 border-b-[3px] px-1 pt-6" aria-label="Estante de favoritos">
        {visible.map((b, i) => {
          const selected = active === i;
          const dimmed = active !== null && !selected;
          return (
            <li key={b.title} className={selected ? "relative z-10" : "relative"}>
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={panelId}
                onClick={() => setActive(selected ? null : i)}
                className={`relative flex w-12 items-center justify-center rounded-t-[3px] transition-[translate,scale,opacity,box-shadow] duration-200 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 ${
                  SPINE[b.color]
                } ${HEIGHTS[i % HEIGHTS.length]} ${
                  selected
                    ? "-translate-y-4 scale-[1.04] shadow-[inset_-5px_0_0_oklch(0_0_0/0.12),inset_2px_0_0_oklch(1_0_0/0.15),0_14px_22px_-10px_oklch(0.2_0.02_50/0.55)]"
                    : "shadow-[inset_-5px_0_0_oklch(0_0_0/0.12),inset_2px_0_0_oklch(1_0_0/0.15)] hover:-translate-y-1"
                } ${dimmed ? "opacity-70 hover:opacity-90" : "opacity-100"}`}
              >
                <span className="absolute inset-x-0 top-3 mx-auto h-px w-6 bg-current opacity-60" aria-hidden="true" />
                <span
                  className={`vertical font-display max-h-[calc(100%-2.25rem)] font-bold ${
                    b.title.length > 22 ? "text-[0.7rem] leading-tight tracking-[0.02em]" : "text-[0.95rem] tracking-[0.04em]"
                  }`}
                >
                  {isTodo(b.title) ? "Pendiente" : b.title}
                </span>
                <span className="absolute inset-x-0 bottom-3 mx-auto h-px w-6 bg-current opacity-60" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      {/* The reading panel. Without JavaScript it stays hidden and the list below carries the text. */}
      <div
        id={panelId}
        aria-live="polite"
        className="bg-paper-2 ring-rule js:grid hidden min-h-[11.5rem] w-full max-w-[22rem] overflow-hidden rounded-[4px] p-5 ring-1 xl:w-64"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={book ? book.title : "empty"}
            initial={{ opacity: 0, transform: shift, filter: blur }}
            animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
            exit={{ opacity: 0, transform: exitShift, filter: blur, transition: { duration: 0.18, ease: EASE_OUT } }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            // Old and new content share one grid cell, so they crossfade in place.
            className="[grid-area:1/1]"
          >
            {book ? (
              <>
                <p className="text-folio text-ink-soft font-mono tracking-[0.16em] uppercase">{book.genre}</p>
                <p className="font-display mt-1.5 text-[1.1rem] leading-tight font-bold text-balance">{book.title}</p>
                {takeOf(book) && <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty">«{takeOf(book)}»</p>}
              </>
            ) : (
              <p className="text-ink-soft flex h-full items-center text-[0.92rem] leading-relaxed">
                Elige un libro para leer qué significa para mí.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <dl className="js:hidden grid gap-3 text-[0.92rem]">
        {visible.map((b) => (
          <div key={b.title}>
            <dt className="font-display font-bold">
              {b.title} <span className="text-ink-soft font-sans font-normal">· {b.genre}</span>
            </dt>
            <dd className="text-ink-soft">{takeOf(b)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
