import { todo } from "@/lib/todo";
import type { ShelfBook, SideStory } from "@/types";

// "Acerca de mí": only life outside software engineering.
// Draft written from Jeferson's own notes (25 oct 2026); pending his approval.
export const presentation =
  "Nací en El Contadero y hoy vivo en Pasto por mis estudios. Fuera del código, casi siempre estoy jugando o viendo anime. Me encantan los videojuegos, como Resident Evil 4 Remake o Mobile Legends, y siempre he tenido curiosidad por saber cómo se hacen. Últimamente veo mucho romance, acción, fantasía e isekai. Cuando necesito despejarme salgo a caminar, y en vacaciones vuelvo al campo a ayudar a mi familia con el ganado. Ah, y tengo un gato que se llama Qin Shi Huang.";

export const quickFacts = [
  { label: "Nació en", value: "El Contadero, Nariño" },
  { label: "Vive en", value: "San Juan de Pasto, Nariño" },
  { label: "Estudia", value: "Ingeniería de Software · UCC" },
  { label: "Semestre", value: todo("semestre actual") },
  { label: "Me encuentras", value: "jugando, viendo anime o caminando" },
];

export const sideStories: SideStory[] = [
  {
    id: "videojuegos",
    title: "Videojuegos",
    body: "Me encantan, de Resident Evil 4 Remake a Mobile Legends. Siempre he tenido curiosidad por saber cómo se hacen.",
    glyph: "gamepad",
  },
  {
    id: "anime",
    title: "Anime",
    body: "Últimamente veo mucho romance, acción, fantasía e isekai. Mis favoritos están en el estante de abajo.",
    glyph: "shelf",
  },
  {
    id: "caminar",
    title: "Caminar",
    body: "Cuando necesito despejarme y relajarme, salgo a caminar.",
    glyph: "path",
  },
  {
    id: "campo",
    title: "El campo en El Contadero",
    body: "Mi mamá trabaja en la ganadería. Cuando vuelvo en vacaciones me gusta ayudar con el ganado y en la finca. El campo es muy lindo.",
    glyph: "pasture",
  },
  {
    id: "gato",
    title: "Mi gato Qin Shi Huang",
    body: "Se llama así por el personaje de Record of Ragnarok. Qué nombre tan malo, la verdad, jaja.",
    glyph: "cat",
  },
];

// Titles as plain text only: no covers, art, logos or quotes from the works.
// To Love Ru: pending Jeferson's decision, not listed.
export const shelf: ShelfBook[] = [
  { title: "Re:Zero", take: todo("tu frase sobre Re:Zero"), color: "vermilion" },
  { title: "Mushoku Tensei", take: todo("tu frase sobre Mushoku Tensei"), color: "jade" },
  { title: "Cyberpunk: Edgerunners", take: todo("tu frase sobre Cyberpunk: Edgerunners"), color: "gold" },
  { title: "The Fragrant Flower Blooms with Dignity", take: todo("tu frase sobre Kaoru Hana wa Rin to Saku"), color: "turquoise" },
  { title: "Clannad", take: todo("tu frase sobre Clannad"), color: "ember" },
];
