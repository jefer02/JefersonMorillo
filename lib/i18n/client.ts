"use client";

import { useParams } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./config";
import { messages } from "./messages";

/** The current locale in Client Components, read from the `[locale]` segment. */
export function useLocale(): Locale {
  const params = useParams<{ locale?: string }>();
  return isLocale(params?.locale) ? params.locale : defaultLocale;
}

export function useMessages() {
  return messages[useLocale()];
}
