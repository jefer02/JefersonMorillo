import type { ShelfBook, SideStory } from "@/types";

// "Acerca de mí": only life outside software engineering.
// Draft written from Jeferson's own notes (25 oct 2026); pending his approval.
export const presentation =
  "Fuera del código paso el tiempo con videojuegos y anime, y siempre me ha interesado saber cómo se hacen los juegos. Cuando necesito despejarme salgo a caminar, y en vacaciones vuelvo al campo a ayudar a mi familia con el ganado.";

export const quickFacts = [
  { label: "Nací en", value: "El Contadero, Nariño" },
  { label: "Vivo en", value: "San Juan de Pasto, Nariño" },
  { label: "Estudio", value: "Ingeniería de Software · UCC" },
  { label: "Semestre", value: "5.º (empecé en 2024)" },
  { label: "Tiempo libre", value: "Videojuegos, anime y caminar" },
];

export const sideStories: SideStory[] = [
  {
    id: "videojuegos",
    title: "Videojuegos",
    body: "De Resident Evil 4 Remake a Mobile Legends. Me interesa cómo se hacen.",
    glyph: "gamepad",
  },
  {
    id: "anime",
    title: "Anime",
    body: "Romance, acción, fantasía e isekai. Mis favoritos están en el estante.",
    glyph: "shelf",
  },
  {
    id: "caminar",
    title: "Caminar",
    body: "Salgo a caminar cuando necesito despejarme.",
    glyph: "path",
  },
  {
    id: "campo",
    title: "El campo",
    body: "En vacaciones vuelvo a El Contadero a ayudar con el ganado en la finca.",
    glyph: "pasture",
  },
  {
    id: "gato",
    title: "Mi gato",
    body: "Mi gato se llama Qin Shi Huang, por un personaje de Record of Ragnarok.",
    glyph: "cat",
  },
];

// Titles as plain text only: no covers, art, logos or quotes from the works.
// Phrases are Jeferson's own (draft, 27 oct 2026; he may still edit them).
// To Love Ru: pending Jeferson's decision, not listed.
export const shelf: ShelfBook[] = [
  {
    title: "Re:Zero",
    genre: "Isekai · fantasía oscura",
    take: "Me enseñó que equivocarse y volver a intentarlo también es avanzar.",
    color: "vermilion",
  },
  {
    title: "Mushoku Tensei",
    genre: "Isekai · fantasía",
    take: "Una segunda oportunidad bien aprovechada: aprender desde cero y crecer con constancia.",
    color: "jade",
  },
  {
    title: "Cyberpunk: Edgerunners",
    genre: "Ciencia ficción · acción",
    take: "Intensa y visualmente impresionante; me recuerda que la ambición necesita límites.",
    color: "gold",
  },
  {
    title: "The Fragrant Flower Blooms with Dignity",
    genre: "Romance · vida escolar",
    take: "Una historia tranquila sobre mirar a las personas más allá de los prejuicios.",
    color: "turquoise",
  },
  {
    title: "Clannad",
    genre: "Drama · romance",
    take: "Me recuerda que la familia y las personas cercanas son lo más importante.",
    color: "ember",
  },
];
