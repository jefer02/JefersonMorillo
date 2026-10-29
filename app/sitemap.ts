import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { htmlLang, locales } from "@/lib/i18n/config";

/** Every page in both languages, each entry listing its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-10-25");
  const paths = [{ path: "", priority: 1 }, ...projects.map((p) => ({ path: `/proyectos/${p.slug}`, priority: 0.7 }))];
  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${profile.siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${profile.siteUrl}/${l}${path}`])) },
    })),
  );
}
