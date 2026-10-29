"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getChapters } from "@/content/chapters";
import { profile } from "@/content/profile";
import { Monogram } from "@/components/fx/Monogram";
import { ThemeToggle } from "@/components/fx/ThemeToggle";
import { Indice } from "@/components/fx/Indice";
import { CommandPalette } from "@/components/fx/CommandPalette";
import { LanguageSwitch } from "@/components/fx/LanguageSwitch";
import { SavePointRail } from "@/components/fx/SavePointRail";
import { IconMenu } from "@/components/ui/Icons";
import { href, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { scrollToId } from "@/lib/scroll";

/** Tracks which section is under the header, for aria-current. */
function useCurrentChapter(ids: string[]) {
  const [current, setCurrent] = useState("inicio");
  const key = ids.join(",");
  useEffect(() => {
    const sections = key
      .split(",")
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
  }, [key]);
  return current;
}

/** "Inicio" always goes to the very top; on the home page it scrolls there without a reload. */
export function goHome(e: React.MouseEvent, locale: Locale) {
  if (window.location.pathname !== `/${locale}`) return;
  e.preventDefault();
  scrollToId("top");
}

export default function Navbar({ locale }: { locale: Locale }) {
  const { navChapters } = getChapters(locale);
  const t = messages[locale];
  const current = useCurrentChapter(navChapters.map((c) => c.id));
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className="border-rule bg-paper sticky top-0 z-50 border-b">
        <nav aria-label={t.nav.label} className="mx-auto flex h-16 max-w-[1440px] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-10">
          <Link
            href={href(locale)}
            onClick={(e) => goHome(e, locale)}
            className="group flex min-h-11 shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <Monogram className="ease-book size-8 transition-transform duration-500 group-hover:rotate-[30deg] sm:size-9" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[0.98rem] font-bold tracking-[-0.01em] whitespace-nowrap sm:text-[1.05rem]">
                <span className="max-[339px]:hidden">{profile.displayName}</span>
                <span className="hidden max-[339px]:inline">{profile.initials}</span>
                <span className="sr-only">{t.nav.backHome}</span>
              </span>
              <span className="text-ink-soft hidden text-[0.78rem] whitespace-nowrap sm:block">{profile.roles[locale]}</span>
            </span>
          </Link>

          <ul className="ml-auto hidden items-center lg:flex">
            {navChapters.map((c) => {
              const active = c.id === current;
              return (
                <li key={c.id}>
                  <a
                    href={href(locale, `#${c.id}`)}
                    onClick={c.id === "inicio" ? (e) => goHome(e, locale) : undefined}
                    aria-current={active ? "true" : undefined}
                    className={`hover:text-vermilion relative inline-flex min-h-11 items-center px-2 text-[0.84rem] transition-colors duration-200 xl:px-2.5 xl:text-[0.88rem] ${
                      active ? "text-vermilion" : "text-ink"
                    }`}
                  >
                    {c.name}
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
            <LanguageSwitch className="max-sm:hidden" />
            <LanguageSwitch compact className="sm:hidden" />
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
              <span>{t.nav.menu}</span>
            </button>
          </div>
        </nav>
        <Indice open={open} onClose={() => setOpen(false)} current={current} locale={locale} />
      </header>
      {/* Outside the header so the fixed rail never depends on the header's stacking context. */}
      <SavePointRail locale={locale} />
    </>
  );
}
