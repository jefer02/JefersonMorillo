import { todo } from "@/lib/todo";

// "Adicional": the author's afterword. Words only, no bars or percentages.
export const languages = [
  { name: "Español", level: "Lengua materna." },
  { name: "Inglés", level: todo("qué puedes hacer en inglés, p. ej. «leo documentación técnica sin problema»") },
];

export const achievements = [todo("eventos, hackathons o logros, o escribe «ninguno por ahora»")];

export const learningNow = [
  "3D para la web: shaders, React Three Fiber y animación ligada al scroll, construyendo este portafolio.",
  "Diseñar para pantallas redondas y de una sola mirada con Voxara.",
];

export const curiousFacts = [
  "Programo a unos 9 km de un volcán activo.",
  "Mis proyectos corren en relojes, consolas portátiles, escritorios y navegadores.",
];

// Tech passions and direction, for the afterword (not "Acerca de mí").
export const passions = [
  {
    id: "ciberseguridad",
    title: "Ciberseguridad",
    body: "Me interesa la ciberseguridad. Tengo dos certificados de Cisco Networking Academy: Introducción a la Ciberseguridad y Dispositivos de Red y Configuración Inicial.",
    link: { label: "Ver mis certificados", href: "/#experiencia" },
  },
  {
    id: "emulacion",
    title: "Emulación de juegos en Android",
    body: "Me interesa la emulación de juegos en Android. Elyndra, mi launcher, reúne los juegos de Android y las ROMs de los emuladores en una sola biblioteca que se maneja con control.",
    link: { label: "Ver Elyndra", href: "/volumenes/elyndra" },
  },
  {
    id: "videojuegos",
    title: "Desarrollo de videojuegos",
    body: "Siempre he tenido curiosidad por saber cómo se hacen los juegos. LAAF, un survival horror en Godot, y Elyndra son los proyectos donde más me he acercado a ese mundo.",
    link: { label: "Ver LAAF", href: "/volumenes/laaf" },
  },
];

/** Closing line of the afterword: his goal. */
export const closingLine = "Algún día quiero trabajar desarrollando videojuegos. Este volumen es apenas el comienzo.";

// Chapter I is a two-place story: El Contadero (the emotional center) → San Juan de Pasto.
// Draft written from Jeferson's notes (25 oct 2026), pending his approval.
// Public facts about El Contadero are NOT added until he approves them.
export const origin = {
  home: {
    place: "El Contadero, Nariño",
    label: "Donde nací",
    copy: [
      "Nací en El Contadero, un pueblito pequeño de Nariño. Me gusta porque la vida allá es relajada.",
      "Mi mamá trabaja en la ganadería. Cada vacaciones vuelvo a pasar tiempo con mi familia y mis amigos, y me gusta ayudar con el ganado y con el trabajo de la finca. El campo es muy lindo.",
    ],
  },
  city: {
    place: "San Juan de Pasto, Nariño",
    label: "Donde estudio",
    copy: [
      "Hoy vivo en San Juan de Pasto, donde estudio Ingeniería de Software en la UCC. Es una ciudad a los pies del Galeras —Urcunina, la montaña de fuego—, un volcán activo a unos 9 km. Aquí el año empieza con el Carnaval de Negros y Blancos y los artesanos todavía cortan láminas de mopa-mopa para el barniz de Pasto.",
    ],
  },
  facts: [
    {
      id: "carnaval",
      title: "Carnaval de Negros y Blancos",
      detail: "Patrimonio Cultural Inmaterial de la Humanidad, UNESCO 2009. Negros en el cinco, blancos en el seis de enero.",
    },
    {
      id: "barniz",
      title: "Barniz de Pasto Mopa-Mopa",
      detail:
        "Patrimonio Inmaterial en necesidad de salvaguardia urgente, UNESCO 2020. Láminas de resina cortadas a mano y superpuestas sobre madera.",
    },
    {
      id: "galeras",
      title: "Galeras · Urcunina",
      detail: "«Montaña de fuego»: un volcán activo de más de 4.200 m que la ciudad ve como un león dormido.",
    },
  ],
};
