import type { Chapter } from "@/types";
import { testimonialsReady } from "./testimonials";

// Section order follows the course guide's map; extras sit where they serve the story.
// Folios are the "page numbers" shown in section corners and in the Índice.
const allChapters: Chapter[] = [
  { id: "inicio", numeral: "", name: "Bienvenida", ruby: "Portada", kanji: "表紙", folio: 1 },
  { id: "origen", numeral: "I", name: "Origen", ruby: "Del campo al valle", kanji: "起源", folio: 3 },
  { id: "acerca-de-mi", numeral: "II", name: "Acerca de mí", ruby: "Fuera del código", kanji: "外伝", folio: 9 },
  { id: "habilidades", numeral: "III", name: "Habilidades", ruby: "Herramientas", kanji: "魔導書", folio: 17 },
  { id: "proyectos", numeral: "IV", name: "Proyectos", ruby: "Lo que he construido", kanji: "巻", folio: 25 },
  { id: "testimonios", numeral: "V", name: "Testimonios", ruby: "Con quienes he trabajado", kanji: "手紙", folio: 49 },
  { id: "experiencia", numeral: "VI", name: "Experiencia", ruby: "Académica y laboral", kanji: "記録", folio: 57 },
  { id: "extras", numeral: "VII", name: "Adicional", ruby: "Notas del autor", kanji: "あとがき", folio: 67 },
  { id: "contacto", numeral: "VIII", name: "Contacto", ruby: "Hablemos", kanji: "続く", folio: 73 },
];

// Testimonials stay out of the menu in production until 3 real ones are verified.
export const chapters = allChapters.filter((c) => c.id !== "testimonios" || testimonialsReady || process.env.NODE_ENV !== "production");

export const chapterById = Object.fromEntries(allChapters.map((c) => [c.id, c])) as Record<string, Chapter>;

/** Chapters shown as links in the menu (the cover is reached through the logo). */
export const navChapters = chapters.filter((c) => c.id !== "inicio");
