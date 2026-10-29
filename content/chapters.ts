import type { Locale } from "@/lib/i18n/config";
import type { Chapter } from "@/types";
import { testimonialsReady } from "./testimonials";

// Section order follows the course guide's map; extras sit where they serve the story.
// The side rail's sigils spell these names in the rune alphabet (docs/runas.md).
const allChapters: { id: string; name: Record<Locale, string> }[] = [
  { id: "inicio", name: { es: "Inicio", en: "Home" } },
  { id: "presentacion", name: { es: "Presentación", en: "Introduction" } },
  { id: "acerca-de-mi", name: { es: "Acerca de mí", en: "About me" } },
  { id: "habilidades", name: { es: "Habilidades", en: "Skills" } },
  { id: "proyectos", name: { es: "Proyectos", en: "Projects" } },
  { id: "testimonios", name: { es: "Testimonios", en: "Testimonials" } },
  { id: "experiencia", name: { es: "Experiencia", en: "Experience" } },
  { id: "extras", name: { es: "Adicional", en: "Extras" } },
  { id: "contacto", name: { es: "Contacto", en: "Contact" } },
];

// Testimonials stay out of the menu in production until 3 real ones are verified.
const published = allChapters.filter((c) => c.id !== "testimonios" || testimonialsReady || process.env.NODE_ENV !== "production");

/**
 * Section names in one language. The menu, the side rail, the search and the footer use
 * `navChapters`: "Inicio" goes to the top of the page, and the Presentación section right
 * below the hero has no menu entry of its own.
 */
export function getChapters(locale: Locale) {
  const localize = (c: (typeof allChapters)[number]): Chapter => ({ id: c.id, name: c.name[locale] });
  const chapterById = Object.fromEntries(allChapters.map((c) => [c.id, localize(c)])) as Record<string, Chapter>;
  const navChapters = published.filter((c) => c.id !== "presentacion").map(localize);
  return { chapterById, navChapters };
}
