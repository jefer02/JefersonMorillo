"use client";

import { useEffect, useRef } from "react";
import { getChapters } from "@/content/chapters";
import { profile } from "@/content/profile";
import { IconClose } from "@/components/ui/Icons";
import { href, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { LanguageSwitch } from "./LanguageSwitch";

type Props = { open: boolean; onClose: () => void; current: string; locale: Locale };

/**
 * The mobile menu: a full-screen list of sections with leader dots, like a book's
 * contents page, plus the language switch. Native <dialog> gives focus trapping, Esc to
 * close and focus return.
 */
export function Indice({ open, onClose, current, locale }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const { navChapters } = getChapters(locale);
  const t = messages[locale].nav;

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
            {profile.displayName} · {profile.roles[locale]}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-vermilion inline-flex min-h-11 items-center gap-2 rounded-[3px] px-3 font-medium"
            autoFocus
          >
            <IconClose />
            {t.close}
          </button>
        </div>

        <div className="border-ink mt-8 flex items-end gap-4 border-b pb-4">
          <h2 id="indice-titulo" className="font-display text-[clamp(2.25rem,8vw,3.5rem)] leading-none font-bold">
            {t.menu}
          </h2>
          <LanguageSwitch className="mb-0.5 ml-auto text-[0.9rem]" />
        </div>

        <ol className="mt-4">
          {navChapters.map((c, i) => {
            const active = c.id === current;
            return (
              <li key={c.id}>
                <a
                  href={href(locale, `#${c.id}`)}
                  onClick={onClose}
                  aria-current={active ? "true" : undefined}
                  className="group border-rule hover:text-vermilion flex min-h-14 items-baseline gap-3 border-b py-3 transition-colors duration-200"
                >
                  <span className="font-display text-[1.25rem] leading-tight font-bold sm:text-[1.4rem]">{c.name}</span>
                  <span className="leader" aria-hidden="true" />
                  <span aria-hidden="true" className="text-vermilion font-mono text-[0.85rem] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {active && <span className="sr-only">{t.current}</span>}
                </a>
              </li>
            );
          })}
        </ol>

        <p className="text-ink-soft mt-auto pt-10 text-[0.85rem]">
          {t.escBefore} <kbd className="border-rule rounded-sm border px-1.5 font-mono text-[0.8em]">Esc</kbd> {t.escAfter}
        </p>
      </div>
    </dialog>
  );
}
