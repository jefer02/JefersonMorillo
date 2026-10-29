import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

/**
 * Every page lives under /es or /en. A path without a locale (/, /cv, /proyectos/sotto…)
 * redirects to the visitor's chosen language (the switch stores it in a cookie) or Spanish.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLocale(pathname.split("/")[1])) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and files with an extension (images, PDFs, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
