"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, switchLocalePath } from "@/lib/i18n/config";
import { useLocale, useMessages } from "@/lib/i18n/client";

/**
 * ES / EN: plain links to the same page in the other language (they work without
 * JavaScript). With JavaScript the choice is remembered and the reading position (#hash)
 * carries over. `compact` shows only the other language, for narrow headers.
 */
export function LanguageSwitch({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const locale = useLocale();
  const t = useMessages().language;
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <ul aria-label={t.label} className={`flex items-center font-mono text-[0.78rem] tracking-[0.08em] ${className}`}>
      {locales
        .filter((l) => !compact || l !== locale)
        .map((l, i) => {
          const active = l === locale;
          const target = switchLocalePath(pathname, l);
          return (
            <li key={l} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="text-ink-soft/60 px-0.5">
                  /
                </span>
              )}
              <a
                href={target}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                aria-label={t.names[l]}
                onClick={(e) => {
                  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
                  if (active) return;
                  e.preventDefault();
                  window.location.assign(target + window.location.hash);
                }}
                className={`inline-flex min-h-11 min-w-9 items-center justify-center rounded-[3px] px-1.5 uppercase transition-colors duration-200 ${
                  active ? "text-vermilion font-bold" : "text-ink-soft hover:text-vermilion"
                }`}
              >
                {l}
              </a>
            </li>
          );
        })}
    </ul>
  );
}
