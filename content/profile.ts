import { todo } from "@/lib/todo";
import type { ImageAsset } from "@/types";

export const profile = {
  fullName: "Jeferson Manuel Morillo Vallejo",
  displayName: "Jeferson Morillo",
  initials: "JM",
  role: "Desarrollador de software",
  /** Chosen by Jeferson (option c). ≤ 25 words. */
  welcome: "Construyo software que se usa con la muñeca, con un control en la mano o frente a un público: Wear OS, Android, Flutter y web.",
  volume: "Vol. 1",
  seriesTitle: "Crónica de Atriz",
  /** Light-novel long title: loader and Open Graph image only, never the hero's main text. */
  longTitle: "Renací en el Valle de Atriz y ahora mis hechizos corren en relojes, consolas y escritorios",
  /** Where he lives and studies. */
  city: "San Juan de Pasto",
  region: "Nariño",
  country: "Colombia",
  /** Where he was born and returns every vacation. */
  birthplace: "El Contadero",
  studies: {
    degree: "Ingeniería de Software",
    university: "Universidad Cooperativa de Colombia",
    universityShort: "UCC",
    campus: "Pasto",
    startYear: todo("año en que empezaste la carrera"),
    semester: todo("semestre actual"),
  },
  email: "jefersonmorillo5858@gmail.com",
  siteUrl: "https://jeferson-morillo.vercel.app",
  cvPath: "/cv/CV-Jeferson-Morillo.pdf",
  /** Set to an ImageAsset once public/images/profile.jpg exists. */
  photo: undefined as ImageAsset | undefined,
  photoTodo: todo("foto de perfil en public/images/profile.jpg (ponla en _material/ y la proceso)"),
} as const;

export const statusTag = `Actualmente estudiando · ${profile.studies.degree} · ${profile.studies.universityShort} ${profile.studies.campus}`;
