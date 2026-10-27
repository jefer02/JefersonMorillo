"use client";

import { useEffect, useRef } from "react";
import { chapters } from "@/content/chapters";
import { profile } from "@/content/profile";
import { IconClose } from "@/components/ui/Icons";
import { kanjiChapter } from "./ChapterOpener";

type Props = { open: boolean; onClose: () => void; current: string };

/**
 * The Índice (目次): a full-screen table of contents laid out like a light-novel
 * contents page. Native <dialog> gives focus trapping, Esc to close and focus return.
 */
export function Indice({ open, onClose, current }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="indice-titulo"
      className="bg-paper text-ink backdrop:bg-ink/40 m-0 h-dvh max-h-none w-screen max-w-none p-0 open:animate-[indice-in_420ms_var(--ease-book)]"
    >
      <div className="mx-auto flex min-h-full max-w-2xl flex-col px-5 pt-5 pb-10 sm:px-8">
        <div className="flex items-center justify-between">
          <p className="text-folio text-ink-soft font-mono tracking-[0.2em] uppercase">
            {profile.seriesTitle} · {profile.volume}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-vermilion inline-flex min-h-11 items-center gap-2 rounded-[3px] px-3 font-medium"
            autoFocus
          >
            <IconClose />
            Cerrar
          </button>
        </div>

        <div className="border-ink mt-8 flex items-end gap-4 border-b pb-4">
          <h2 id="indice-titulo" className="font-display text-[clamp(2.25rem,8vw,3.5rem)] leading-none font-bold">
            <ruby>
              Índice
              <rp> (</rp>
              <rt>目次</rt>
              <rp>)</rp>
            </ruby>
          </h2>
          <span aria-hidden="true" className="font-cjk text-vermilion ml-auto text-3xl">
            目次
          </span>
        </div>

        <ol className="mt-4">
          {chapters.map((c) => {
            const active = c.id === current;
            return (
              <li key={c.id}>
                <a
                  href={`/#${c.id}`}
                  onClick={onClose}
                  aria-current={active ? "true" : undefined}
                  className="group border-rule hover:text-vermilion flex min-h-14 items-baseline gap-3 border-b py-3 transition-colors duration-200"
                >
                  <span className="font-cjk text-vermilion w-[4.5rem] shrink-0 text-[0.95rem]" aria-hidden="true">
                    {kanjiChapter(c.numeral) || "表紙"}
                  </span>
                  <span className="font-display text-[1.25rem] leading-tight font-bold sm:text-[1.4rem]">
                    <ruby>
                      {c.name}
                      <rp> (</rp>
                      <rt>{c.ruby}</rt>
                      <rp>)</rp>
                    </ruby>
                  </span>
                  <span className="leader" aria-hidden="true" />
                  <span className="text-ink-soft font-mono text-[0.85rem] tabular-nums">
                    <span className="sr-only">página </span>
                    {c.folio}
                  </span>
                  {active && <span className="sr-only">(capítulo actual)</span>}
                </a>
              </li>
            );
          })}
        </ol>

        <p className="text-ink-soft mt-auto pt-10 text-[0.85rem]">
          Pulsa <kbd className="border-rule rounded-sm border px-1.5 font-mono text-[0.8em]">Esc</kbd> para cerrar.
        </p>
      </div>
    </dialog>
  );
}
