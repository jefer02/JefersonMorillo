// Locales live in the first URL segment (/es, /en). Spanish is the default.
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Cookie the language switch sets, so `/` sends returning visitors to their language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (value: unknown): value is Locale => typeof value === "string" && (locales as readonly string[]).includes(value);

/** BCP 47 tag for <html lang> and Intl formatting. */
export const htmlLang: Record<Locale, string> = { es: "es-CO", en: "en" };

/** Open Graph locale. */
export const ogLocale: Record<Locale, string> = { es: "es_CO", en: "en_US" };

/** Prefixes an internal path with the locale: href("en", "/proyectos/sotto") → "/en/proyectos/sotto". */
export function href(locale: Locale, path = "") {
  if (!path || path === "/") return `/${locale}`;
  return path.startsWith("#") ? `/${locale}${path}` : `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Same page in another locale: swaps the first path segment. */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/").replace(/\/$/, "") || `/${to}`;
}
