import { todo } from "@/lib/todo";

// "Adicional": the author's afterword. Words only, no bars or percentages.
export const languages = [
  { name: "Español", level: "Lengua materna." },
  { name: "Inglés", level: "Dominio avanzado: leo y escribo documentación técnica, y me comunico con fluidez." },
];

export const achievements = [todo("eventos, hackathons o logros, o escribe «ninguno por ahora»")];

export const learningNow = [
  "3D y animación para la web, con React Three Fiber y shaders.",
  "Diseño para pantallas redondas y de lectura rápida, con Voxara.",
];

export const curiousFacts = [
  "Programo a unos 9 km de un volcán activo.",
  "Mis proyectos funcionan en relojes, consolas portátiles, escritorios y navegadores.",
];

// Tech passions and direction, for the afterword (not "Acerca de mí").
export const passions = [
  {
    id: "ciberseguridad",
    title: "Ciberseguridad",
    body: "Tengo dos certificados de Cisco Networking Academy: Introducción a la Ciberseguridad y Dispositivos de Red y Configuración Inicial.",
    link: { label: "Ver mis certificados", href: "/#experiencia" },
  },
  {
    id: "emulacion",
    title: "Emulación de juegos en Android",
    body: "Elyndra, mi launcher, reúne juegos de Android y ROMs de emuladores en una sola biblioteca que se maneja con control.",
    link: { label: "Ver Elyndra", href: "/proyectos/elyndra" },
  },
  {
    id: "videojuegos",
    title: "Desarrollo de videojuegos",
    body: "LAAF, un survival horror en Godot, y Elyndra son los proyectos donde más me he acercado a ese mundo.",
    link: { label: "Ver LAAF", href: "/proyectos/laaf" },
  },
];

/** Closing line of the afterword: his goal. */
export const closingLine = "Mi meta es trabajar en el desarrollo de videojuegos. Este portafolio es apenas el comienzo.";
