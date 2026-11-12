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
// Phrases are Jeferson's own (draft, 27 oct 2026; he may still edit them). The last six were
// drafted at his request on 12 nov 2026 for him to review.
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
  {
    title: "Neon Genesis Evangelion",
    genre: "Mecha · drama psicológico",
    take: "Me hizo pensar en lo difícil que es abrirse a los demás, y en que vale la pena intentarlo.",
    color: "wood",
  },
  {
    title: "Kimi no Suizou wo Tabetai",
    genre: "Drama · romance",
    take: "Me recordó que el tiempo con las personas que quieres no se debe dejar para después.",
    color: "vermilion",
  },
  {
    title: "Kimi no Na wa",
    genre: "Romance · fantasía",
    take: "Una historia sobre buscar a alguien sin rendirse, aunque no recuerdes bien por qué.",
    color: "turquoise",
  },
  {
    title: "Koe no Katachi",
    genre: "Drama · vida escolar",
    take: "Me enseñó que pedir perdón y cambiar de verdad cuesta, pero se puede.",
    color: "jade",
  },
  {
    title: "Zero no Tsukaima",
    genre: "Fantasía · comedia romántica",
    take: "Divertida y ligera; me gusta ver a alguien que todos subestiman demostrar lo que vale.",
    color: "gold",
  },
  {
    title: "Elfen Lied",
    genre: "Drama · terror psicológico",
    take: "Dura de ver, pero me dejó claro cuánto marcan el rechazo y la crueldad a una persona.",
    color: "ember",
  },
];
