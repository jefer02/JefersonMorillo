import type { Skill, SkillSchool } from "@/types";

// Frameworks, libraries and tools only. Never programming languages, never levels.
// Proficiency is shown by evidence: every skill links to the projects where it was used.
export const schools: SkillSchool[] = [
  { id: "web", name: "Interfaces web" },
  { id: "backend", name: "Backend y datos" },
  { id: "native", name: "Interfaces nativas" },
  { id: "state", name: "Estado, datos y rutas" },
  { id: "worlds", name: "Mundos 3D y movimiento" },
  { id: "ai", name: "Inteligencia artificial" },
  { id: "tools", name: "Herramientas" },
];

export const skills: Skill[] = [
  {
    id: "nextjs",
    name: "Next.js",
    school: "web",
    use: "App Router, componentes de servidor y server actions.",
    usedIn: ["jeferson-morillo"],
  },
  {
    id: "react",
    name: "React",
    school: "web",
    use: "Interfaces por componentes, del editor de video a este portafolio.",
    usedIn: ["alomedia", "jeferson-morillo"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    school: "web",
    use: "Sistemas de temas claro y oscuro con utilidades y tokens.",
    usedIn: ["alomedia", "jeferson-morillo"],
  },
  { id: "vite", name: "Vite", school: "web", use: "El sitio web de Elyndra, con Three.js.", usedIn: ["elyndra"] },

  {
    id: "spring-boot",
    name: "Spring Boot",
    school: "backend",
    use: "APIs REST con listados paginados y servicios bien separados.",
    usedIn: ["alomedia"],
  },
  {
    id: "spring-data-jpa",
    name: "Spring Data JPA",
    school: "backend",
    use: "Repositorios con consultas para listados resumidos.",
    usedIn: ["alomedia"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    school: "backend",
    use: "Índices para que las consultas de proyectos respondan más rápido.",
    usedIn: ["alomedia"],
  },
  { id: "liquibase", name: "Liquibase", school: "backend", use: "Migraciones versionadas de la base de datos.", usedIn: ["alomedia"] },

  {
    id: "compose",
    name: "Jetpack Compose",
    school: "native",
    use: "Interfaces declarativas para teléfono, tablet y consola portátil.",
    usedIn: ["voxara", "elyndra"],
  },
  {
    id: "compose-wear",
    name: "Compose for Wear OS",
    school: "native",
    use: "Pantallas redondas que se leen de un vistazo.",
    usedIn: ["voxara"],
  },
  {
    id: "material3",
    name: "Material 3",
    school: "native",
    use: "Temas, color y componentes en Android y Wear OS.",
    usedIn: ["voxara", "elyndra"],
  },
  { id: "flutter", name: "Flutter", school: "native", use: "Una app de escritorio para Windows, macOS y Linux.", usedIn: ["sotto"] },

  { id: "riverpod", name: "Riverpod", school: "state", use: "Estado de la app de escritorio, predecible y testeable.", usedIn: ["sotto"] },
  { id: "go-router", name: "go_router", school: "state", use: "Navegación declarativa entre pantallas.", usedIn: ["sotto"] },
  { id: "hive", name: "Hive CE", school: "state", use: "Guiones y ensayos guardados localmente, sin backend.", usedIn: ["sotto"] },
  {
    id: "wear-data-layer",
    name: "Wearable Data Layer API",
    school: "state",
    use: "Sincronizar el reloj con su app compañera en el celular.",
    usedIn: ["voxara"],
  },
  {
    id: "wear-tiles",
    name: "Wear OS Tiles",
    school: "state",
    use: "Tiles y complicaciones para ver el estado sin abrir la app.",
    usedIn: ["voxara"],
  },

  { id: "godot", name: "Godot", school: "worlds", use: "Un juego 3D con shaders de postproceso propios.", usedIn: ["laaf"] },
  {
    id: "r3f",
    name: "Three.js · React Three Fiber",
    school: "worlds",
    use: "Escenas 3D en la web, como el círculo mágico de la página de inicio.",
    usedIn: ["jeferson-morillo", "elyndra"],
  },
  { id: "gsap", name: "GSAP", school: "worlds", use: "Animaciones ligadas al scroll en este portafolio.", usedIn: ["jeferson-morillo"] },

  {
    id: "deepseek",
    name: "DeepSeek API",
    school: "ai",
    use: "Asistentes que explican, recomiendan y responden: Tono, Masha y Sotto.",
    usedIn: ["voxara", "sotto", "elyndra"],
  },
  { id: "mlkit", name: "ML Kit", school: "ai", use: "Traducción de textos en el propio dispositivo.", usedIn: ["elyndra"] },
  {
    id: "sherpa-onnx",
    name: "sherpa-onnx",
    school: "ai",
    use: "Reconocimiento de voz local, sin enviar audio a la nube.",
    usedIn: ["sotto"],
  },

  {
    id: "git",
    name: "Git y GitHub",
    school: "tools",
    use: "Ramas, pull requests y versiones publicadas con GitHub Releases.",
    usedIn: ["elyndra", "sotto", "alomedia", "laaf"],
  },
  {
    id: "android-studio",
    name: "Android Studio",
    school: "tools",
    use: "Emuladores y depuración inalámbrica en un Galaxy Watch 7.",
    usedIn: ["voxara", "elyndra"],
  },
  {
    id: "vitest",
    name: "Vitest",
    school: "tools",
    use: "Pruebas de las expresiones regulares del formulario de contacto.",
    usedIn: ["jeferson-morillo"],
  },
  { id: "vercel", name: "Vercel", school: "tools", use: "Despliegues automáticos en cada push.", usedIn: ["jeferson-morillo", "alomedia"] },
];
