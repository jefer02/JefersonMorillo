"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconSearch } from "@/components/ui/Icons";
import { useMessages } from "@/lib/i18n/client";

const CommandPaletteDialog = dynamic(() => import("./CommandPaletteDialog"), {
  ssr: false,
});

/**
 * "Buscar": a command palette (Ctrl/⌘ + K, or the floating sigil on mobile)
 * to jump to chapters, open volumes, download the CV, copy the email and switch theme.
 */
export function CommandPalette() {
  const t = useMessages().search;
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [mounted, setMounted] = useState(false);
  // On the home page the floating button waits until the cover (and its obi buttons) is passed.
  const [pastCover, setPastCover] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setPastCover(!e.isIntersecting), { threshold: 0.15 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  // cmdk loads the first time the palette opens.
  const [loaded, setLoaded] = useState(false);
  const openPalette = (next: boolean | ((o: boolean) => boolean)) => {
    setLoaded(true);
    setOpen(next);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target exists only on the client
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => openPalette(true)}
        className="border-rule text-ink-soft hover:border-vermilion hover:text-vermilion hidden min-h-11 items-center gap-2 rounded-[3px] border px-3 text-[0.82rem] transition-colors duration-200 xl:inline-flex"
        aria-label={t.buttonAria}
      >
        <IconSearch width={16} height={16} />
        <span>{t.button}</span>
        <kbd className="font-mono text-[0.75rem]">Ctrl K</kbd>
      </button>
      {mounted &&
        createPortal(
          <button
            type="button"
            onClick={() => openPalette(true)}
            tabIndex={pastCover ? 0 : -1}
            aria-hidden={pastCover ? undefined : true}
            className={`bg-ink text-paper ease-book fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full shadow-[0_10px_30px_-10px_oklch(0.2_0.02_50/0.6)] transition-[opacity,transform] duration-300 xl:hidden ${
              pastCover ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`}
            aria-label={t.fabAria}
          >
            <IconSearch width={24} height={24} />
          </button>,
          document.body,
        )}

      {loaded && <CommandPaletteDialog open={open} setOpen={setOpen} setNotice={setNotice} />}
      <p className="sr-only" role="status" aria-live="polite">
        {notice}
      </p>
    </>
  );
}
