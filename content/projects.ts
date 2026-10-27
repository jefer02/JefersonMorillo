import { todo } from "@/lib/todo";
import type { Project } from "@/types";

// Facts verified against the public repositories (READMEs, releases, commit history).
// Dates come from GitHub; Jeferson should confirm them before publishing.
export const projects: Project[] = [
  {
    slug: "cronica-de-atriz",
    volume: 0,
    title: "Crónica de Atriz",
    tagline: "Este portafolio, diseñado como el primer volumen de una novela ligera.",
    platforms: ["Web"],
    status: "en-desarrollo",
    accent: "wood",
    synopsis:
      "Mi portafolio personal para el curso de Diseño de Interfaces. Cada sección es un capítulo: la portada, el índice, las historias paralelas, el epílogo del autor y el colofón.",
    problem:
      "Un portafolio tiene que explicar quién soy en cinco segundos sin parecer una plantilla más. Quise que la forma contara algo de mí: que vengo de Pasto y que me gustan las novelas ligeras.",
    built: [
      "Escena 3D del círculo mágico con React Three Fiber y una versión estática para movimiento reducido.",
      "Formulario de contacto validado con expresiones regulares en el cliente y en el servidor.",
      "Contenido tipado y validado con zod: cada habilidad enlaza al proyecto donde la usé.",
    ],
    challenges: [
      "Mantener el concepto sin sacrificar claridad: cada nombre temático va acompañado de su nombre simple.",
      "Que todo el contenido se vea sin JavaScript y con movimiento reducido.",
    ],
    learned: [todo("qué aprendiste construyendo el portafolio (lo completas al terminar)")],
    skills: ["nextjs", "react", "tailwind", "r3f", "gsap", "vercel"],
    repo: { label: "Repositorio en GitHub", href: "https://github.com/jefer02/JefersonMorillo" },
    demo: { label: "Demo en vivo en Vercel", todo: todo("URL de Vercel cuando despliegues (jeferson-morillo.vercel.app)") },
    period: { start: "2026-10" },
  },
  {
    slug: "voxara",
    volume: 1,
    title: "Voxara",
    tagline: "Dosímetro de ruido para relojes Wear OS que cuida tu audición.",
    platforms: ["Wear OS", "Android"],
    status: "en-desarrollo",
    statusNote: "Sin versión publicada todavía",
    accent: "turquoise",
    synopsis:
      "Voxara mide el nivel de sonido a tu alrededor en dBA desde el reloj, acumula una dosis diaria y semanal basada en NIOSH, estima cuánto escuchas con audífonos y te avisa antes de pasar el límite. Tono, un asistente con IA, explica tu estado en lenguaje sencillo.",
    problem:
      "En la calle, en el transporte o en un concierto no sabemos cuánto ruido estamos aguantando. Quería que bastara una mirada a la muñeca para saber si los oídos están a salvo y cuánto queda del día.",
    built: [
      "App para el reloj y app compañera para el celular, en un proyecto Android multimódulo (reloj, teléfono, lógica compartida y UI compartida).",
      "Dosis, historial y alertas deterministas y locales: los avisos nunca dependen de la IA; Tono solo los explica.",
      "Tiles, complicaciones y modo ambiente para leer el estado sin abrir la app.",
      "Interfaz en español e inglés, probada en un Samsung Galaxy Watch 7.",
    ],
    challenges: [
      "Diseñar para pantallas redondas de 192 a 240 dp, en lugares ruidosos y con una sola mano libre.",
      "Cuidar la batería: animaciones solo cuando la pantalla está activa y visible.",
      "Dejar claro que no es un dispositivo médico y que el micrófono necesita calibración.",
    ],
    learned: [todo("qué aprendiste con Voxara")],
    skills: ["compose", "compose-wear", "material3", "wear-data-layer", "wear-tiles", "deepseek", "android-studio"],
    repo: { label: "Repositorio en GitHub", href: "https://github.com/jefer02/Voxara" },
    demo: { label: "Video de la app en el reloj", todo: todo("enlace a un video de Voxara funcionando en el reloj") },
    period: { start: "2026-09" },
  },
  {
    slug: "sotto",
    volume: 2,
    title: "Sotto",
    tagline: "Asistente de escritorio para presentaciones en vivo: teleprompter que sigue tu voz.",
    platforms: ["Windows", "macOS", "Linux (experimental)"],
    status: "publicado",
    statusNote: "v1.0.0 publicada",
    accent: "jade",
    synopsis:
      "Sotto deja tu guion en una ventana flotante justo debajo de la cámara, avanza línea por línea mientras hablas y prepara una respuesta cuando el público pregunta. Sin cuentas ni backend: tus guiones se quedan en tu computador.",
    problem:
      "Al presentar, uno termina mirando las notas en vez de mirar a la gente. Quería una herramienta que siguiera mi ritmo sin estorbar y que me ayudara con las preguntas difíciles.",
    built: [
      "Teleprompter flotante, siempre visible, que se oculta al compartir pantalla en Windows y macOS.",
      "Reconocimiento de voz local con sherpa-onnx: el texto avanza mientras hablas y se detiene cuando improvisas.",
      "Respuestas a preguntas del público con DeepSeek, a partir de tu guion y tus documentos de preparación.",
      "Importación de guiones .docx, .pdf, .md y .txt sin cambiar tus palabras, con ensayos cronometrados por sección.",
    ],
    challenges: [
      "Una ventana que se lea igual sobre diapositivas oscuras, claras y videollamadas.",
      "Mantener todo local y rápido en tres sistemas operativos.",
    ],
    learned: [todo("qué aprendiste con Sotto")],
    skills: ["flutter", "riverpod", "go-router", "hive", "sherpa-onnx", "deepseek"],
    repo: { label: "Repositorio en GitHub", href: "https://github.com/jefer02/Sotto" },
    demo: { label: "Descarga de la v1.0.0 en GitHub Releases", href: "https://github.com/jefer02/Sotto/releases/tag/v1.0.0" },
    period: { start: "2026-09" },
  },
  {
    slug: "elyndra",
    volume: 3,
    title: "Elyndra",
    tagline: "Launcher de juegos para Android con experiencia de consola, pensado para control.",
    platforms: ["Android"],
    status: "publicado",
    statusNote: "v1.1.0 publicada",
    accent: "gold",
    synopsis:
      "Elyndra reúne tus juegos de Android y tus ROMs de emuladores en una sola biblioteca que se maneja entera con un control. No emula nada: le entrega cada juego al emulador que elegiste. Masha, una asistente 3D holográfica, te recomienda qué jugar y con qué emulador.",
    problem:
      "En Android los juegos y los emuladores quedan regados entre apps y carpetas. Quería abrir el celular o la consola portátil y sentir que estaba frente a una consola.",
    built: [
      "Navegación completa con control (Xbox, PlayStation, Switch Pro y controles integrados) en Jetpack Compose y Material 3.",
      "Cerca de 130 perfiles de emuladores con el intent exacto de cada uno, y carpetas de ROMs sin pedir permiso de almacenamiento.",
      "Masha: avatar 3D con sincronización de labios, voz y chat, que conoce tu biblioteca y tu forma de jugar.",
      "Descripciones de juegos traducidas en el dispositivo con ML Kit y actualizaciones desde GitHub Releases.",
    ],
    challenges: [
      "Que cada pantalla funcione igual con D-pad, sticks y pantalla táctil.",
      "Seis idiomas que se cambian sin reiniciar la app.",
    ],
    learned: [todo("qué aprendiste con Elyndra")],
    skills: ["compose", "material3", "mlkit", "deepseek", "android-studio"],
    repo: { label: "Repositorio en GitHub", href: "https://github.com/jefer02/Elyndra" },
    demo: { label: "Sitio web oficial de Elyndra", href: "https://elyndra-website.jefer02.workers.dev/" },
    extraLinks: [{ label: "Descargar v1.1.0", href: "https://github.com/jefer02/Elyndra/releases/tag/v1.1.0" }],
    period: { start: "2026-09", end: "2026-10" },
  },
  {
    slug: "laaf",
    volume: 4,
    title: "LAAF",
    tagline: "Survival horror en tercera persona hecho en Godot, con la niebla de los clásicos de PS2.",
    platforms: ["Windows"],
    status: "en-desarrollo",
    accent: "ember",
    synopsis:
      "Un forastero busca a su hermana desaparecida en Hollowmere, un pueblo aislado donde cinco amigos de infancia sirven a The Veil. Tres capítulos de sigilo, cazadores, armas y jefes donde decides perdonar, matar o huir, con cinco finales.",
    problem:
      "Quería recrear la sensación de los survival horror de PS1 y PS2 —niebla, grano, modelos de pocos polígonos— sin que el juego se sintiera viejo.",
    built: [
      "Juego en Godot 4.7 con postproceso propio de estilo PS2 (niebla, grano y dithering) y scanlines CRT en el menú.",
      "HUD mínimo: objetivo, arma y munición, salud y estamina, minimapa y reloj; lo demás aparece solo cuando importa.",
      "Minijuegos (ganzúa, pesca, sintonizar radio, caja de música) y menú con escenas de la historia detrás.",
    ],
    challenges: [
      "Que el jugador entienda su estado en una fracción de segundo sin quitar los ojos de la niebla.",
      "Coordinar el trabajo en equipo en un repositorio compartido.",
    ],
    learned: [todo("qué aprendiste con LAAF")],
    skills: ["godot"],
    team: {
      credit: "Proyecto en equipo con Juan17la. Repositorio del equipo: Juan17la/laaf_game.",
      role: "Desarrollador principal (149 de los 158 commits del repositorio).",
    },
    repo: { label: "Repositorio en GitHub", href: "https://github.com/Juan17la/laaf_game" },
    demo: { label: "Video o build del juego", todo: todo("enlace a un video o build de LAAF") },
    period: { start: "2026-10" },
  },
  {
    slug: "alomedia",
    volume: 5,
    title: "AloMedia",
    tagline: "Editor de video en el navegador, con renderizado local en WebAssembly. Proyecto en equipo.",
    platforms: ["Web"],
    status: "publicado",
    statusNote: "Demo en línea",
    accent: "vermilion",
    synopsis:
      "AloMedia es un editor de video web con línea de tiempo multipista, vista previa en tiempo real, deshacer y rehacer, y herramientas de IA como transcripción automática y reducción de ruido. El renderizado corre en el navegador con FFmpeg compilado a WebAssembly.",
    problem: "Editar video suele exigir instalar programas pesados. El equipo quería un editor que funcionara completo en el navegador.",
    built: [
      "Frontend: modo claro y sistema de temas en todo el editor, estilos de la línea de tiempo, clips y modales, página de retorno de OAuth y servicios reorganizados (según mi historial de commits).",
      "Backend: listados paginados de proyectos, historial y notificaciones, migraciones con Liquibase e índices para respuestas más rápidas (según mi historial de commits).",
    ],
    challenges: [
      "Trabajar sobre una base de código grande con más de 800 commits y ramas de varios integrantes.",
      "Mantener el modo claro consistente en decenas de pantallas del editor.",
    ],
    learned: [todo("qué aprendiste en AloMedia")],
    // Only tools visible in his own commits. Add zustand, tanstack-query, ffmpeg-wasm… once he confirms.
    skills: ["react", "tailwind", "spring-boot", "spring-data-jpa", "postgresql", "liquibase", "git"],
    team: {
      credit: "Proyecto en equipo de Juan17la, CamiloParraS y Jeferson Morillo. Repositorios originales de Juan17la.",
      role: todo("confirma tu rol en AloMedia y qué funciones hiciste (frontend, backend o ambos)"),
    },
    repo: { label: "Repositorio en GitHub", href: "https://github.com/Juan17la/AloMediaReact" },
    demo: { label: "Demo en vivo en Vercel", href: "https://alo-media.vercel.app" },
    extraLinks: [{ label: "Backend (Spring Boot)", href: "https://github.com/Juan17la/AloMediaSpringBoot" }],
    period: { start: "2026-03", end: "2026-05" },
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>;
