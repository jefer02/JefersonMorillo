import { defaultLocale, htmlLang, locales, type Locale } from "./config";

/** Canonical and hreflang links for a path that exists in every locale (e.g. "", "/proyectos/sotto"). */
export function localeAlternates(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
