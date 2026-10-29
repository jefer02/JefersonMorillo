import { todo } from "@/lib/todo";
import type { ImageAsset } from "@/types";

export const profile = {
  fullName: "Jeferson Manuel Morillo Vallejo",
  displayName: "Jeferson Morillo",
  initials: "JM",
  role: "Desarrollador de software",
  /** The role in each language (the header needs both on the client). */
  roles: { es: "Desarrollador de software", en: "Software developer" },
  /** Chosen by Jeferson (option c). ≤ 25 words. */
  welcome: "Construyo software que se usa con la muñeca, con un control en la mano o frente a un público: Wear OS, Android, Flutter y web.",
  /**
   * What the hero's magic circle says, written in the site's rune alphabet (docs/runas.md).
   * 2024 is the year he started the degree.
   */
  inscription: { outer: "JEFERSON MORILLO · EL CONTADERO · NARIÑO · 2024", inner: "CONSTRUYO SOFTWARE" },
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
    startYear: "2024",
    semester: 5,
  },
  email: "jefersonmorillo5858@gmail.com",
  siteUrl: "https://jeferson-morillo.vercel.app",
  /** Spanish CV; the English one is `cvPaths.en`. */
  cvPath: "/cv/CV-Jeferson-Morillo.pdf",
  cvPaths: { es: "/cv/CV-Jeferson-Morillo.pdf", en: "/cv/CV-Jeferson-Morillo-EN.pdf" },
  photo: {
    src: "/mi_FOTO_PERFIL/mi_Foto.jpg",
    width: 959,
    height: 1280,
    alt: "Jeferson Morillo, con gafas y buzo con capucha",
  } as ImageAsset | undefined,
  photoTodo: todo("foto de perfil"),
} as const;
