import type { ExperienceEntry, Project, ShelfBook, SideStory } from "@/types";

// English versions of the site content. The Spanish files in content/ are the source:
// structural data (slugs, links, dates, skills) lives there only. Here go the texts,
// keyed by slug or id; `npm run check:content` fails if an item has no translation.
// Testimonials are never translated: they stay in the language they were written in.

export const profile = {
  welcome:
    "I build software you use on your wrist, with a controller in hand or in front of an audience: Wear OS, Android, Flutter and web.",
  degree: "Software Engineering",
  photoAlt: "Jeferson Morillo, wearing glasses and a hoodie",
  /** The inner ring of the hero circle says "Construyo software"; shown with the decoded runes. */
  inscriptionGloss: "I build software",
};

export const intro = {
  paragraph:
    "I'm a software developer and a Software Engineering student at Universidad Cooperativa de Colombia in Pasto. I like building applications end to end: Android and Wear OS apps, desktop tools with Flutter, and web applications with React and Spring Boot. I enjoy turning an idea into a product people can use, caring for both the code and the experience. I was born in El Contadero, Nariño, and today I live in Pasto.",
  highlights: [
    { id: "movil", title: "Mobile apps and Wear OS", detail: "Voxara on the watch and Elyndra on Android, with Jetpack Compose." },
    {
      id: "escritorio",
      title: "Desktop with Flutter",
      detail: "Sotto, a teleprompter that follows your voice on Windows, macOS and Linux.",
    },
    { id: "web", title: "Full-stack web", detail: "React and Spring Boot with PostgreSQL in AloMedia, a team project." },
  ],
};

export const presentation =
  "Outside of code I spend my time on video games and anime, and I've always wanted to know how games are made. When I need to clear my head I go for a walk, and during vacations I go back to the countryside to help my family with the cattle.";

export const quickFacts = [
  { label: "Hometown", value: "El Contadero, Nariño" },
  { label: "Based in", value: "San Juan de Pasto, Nariño" },
  { label: "Studying", value: "Software Engineering · UCC" },
  { label: "Semester", value: "5th (started in 2024)" },
  { label: "Free time", value: "Video games, anime and walking" },
];

export const sideStories: SideStory[] = [
  {
    id: "videojuegos",
    title: "Video games",
    body: "From Resident Evil 4 Remake to Mobile Legends. I'm curious about how they're made.",
    glyph: "gamepad",
  },
  { id: "anime", title: "Anime", body: "Romance, action, fantasy and isekai. My favorites are on the shelf.", glyph: "shelf" },
  { id: "caminar", title: "Walking", body: "I go for a walk when I need to clear my head.", glyph: "path" },
  {
    id: "campo",
    title: "The countryside",
    body: "During vacations I go back to El Contadero to help with the cattle on the farm.",
    glyph: "pasture",
  },
  { id: "gato", title: "My cat", body: "My cat is named Qin Shi Huang, after a character from Record of Ragnarok.", glyph: "cat" },
];

/** Same books and colors as the Spanish shelf, keyed by title. */
export const shelf: Record<string, Pick<ShelfBook, "genre" | "take">> = {
  "Re:Zero": { genre: "Isekai · dark fantasy", take: "It taught me that making mistakes and trying again is also moving forward." },
  "Mushoku Tensei": {
    genre: "Isekai · fantasy",
    take: "A second chance put to good use: learning from scratch and growing through persistence.",
  },
  "Cyberpunk: Edgerunners": { genre: "Sci-fi · action", take: "Intense and visually stunning; it reminds me that ambition needs limits." },
  "The Fragrant Flower Blooms with Dignity": {
    genre: "Romance · school life",
    take: "A quiet story about seeing people beyond prejudice.",
  },
  Clannad: { genre: "Drama · romance", take: "It reminds me that family and the people close to you matter most." },
};

export const languages = [
  { name: "Spanish", level: "Native language." },
  { name: "English", level: "Advanced: I read and write technical documentation and communicate fluently." },
];

export const learningNow = [
  "3D and animation for the web, with React Three Fiber and shaders.",
  "Designing for round, glanceable screens, with Voxara.",
];

export const curiousFacts = [
  "I code about 9 km from an active volcano.",
  "My projects run on watches, handheld consoles, desktops and browsers.",
];

/** Keyed by passion id; links keep the Spanish hrefs. */
export const passions: Record<string, { title: string; body: string; linkLabel: string }> = {
  ciberseguridad: {
    title: "Cybersecurity",
    body: "I hold two Cisco Networking Academy certificates: Introduction to Cybersecurity and Networking Devices and Initial Configuration.",
    linkLabel: "See my certificates",
  },
  emulacion: {
    title: "Android game emulation",
    body: "Elyndra, my launcher, brings Android games and emulator ROMs together in one library you drive with a controller.",
    linkLabel: "See Elyndra",
  },
  videojuegos: {
    title: "Game development",
    body: "LAAF, a survival horror game in Godot, and Elyndra are the projects where I've come closest to that world.",
    linkLabel: "See LAAF",
  },
};

export const closingLine = "My goal is to work in game development. This portfolio is just the beginning.";

export const schools: Record<string, string> = {
  web: "Web interfaces",
  backend: "Backend and data",
  native: "Native interfaces",
  state: "State, data and routing",
  worlds: "3D worlds and motion",
  ai: "Artificial intelligence",
  tools: "Tools",
};

/** Skill `use` lines by id (and a name, only where the name itself is Spanish). */
export const skills: Record<string, { use: string; name?: string }> = {
  nextjs: { use: "App Router, server components and server actions." },
  react: { use: "Component-based interfaces, from the video editor to this portfolio." },
  tailwind: { use: "Light and dark theme systems with utilities and tokens." },
  vite: { use: "Elyndra's website, with Three.js." },
  "spring-boot": { use: "REST APIs with paginated listings and well-separated services." },
  "spring-data-jpa": { use: "Repositories with queries for summary listings." },
  postgresql: { use: "Indexes so project queries respond faster." },
  liquibase: { use: "Versioned database migrations." },
  compose: { use: "Declarative interfaces for phones, tablets and handheld consoles." },
  "compose-wear": { use: "Round screens you can read at a glance." },
  material3: { use: "Theming, color and components on Android and Wear OS." },
  flutter: { use: "A desktop app for Windows, macOS and Linux." },
  riverpod: { use: "Predictable, testable state for the desktop app." },
  "go-router": { use: "Declarative navigation between screens." },
  hive: { use: "Scripts and rehearsals stored locally, with no backend." },
  "wear-data-layer": { use: "Syncing the watch with its companion phone app." },
  "wear-tiles": { use: "Tiles and complications to see the status without opening the app." },
  godot: { use: "A 3D game with custom post-processing shaders." },
  r3f: { use: "3D scenes on the web, like the magic circle on the home page." },
  gsap: { use: "Scroll-driven animations in this portfolio." },
  deepseek: { use: "Assistants that explain, recommend and answer: Tono, Masha and Sotto." },
  mlkit: { use: "On-device text translation." },
  "sherpa-onnx": { use: "On-device speech recognition, without sending audio to the cloud." },
  git: { name: "Git and GitHub", use: "Branches, pull requests and releases published with GitHub Releases." },
  "android-studio": { use: "Emulators and wireless debugging on a Galaxy Watch 7." },
  vitest: { use: "Tests for the contact form's regular expressions." },
  vercel: { use: "Automatic deployments on every push." },
};

export type ProjectText = Pick<Project, "tagline" | "synopsis" | "problem" | "built" | "challenges"> &
  Partial<Pick<Project, "platforms" | "statusNote" | "learned">> & {
    repoLabel: string;
    demoLabel: string;
    extraLinkLabels?: string[];
    team?: { credit: string; role?: string };
  };

export const projects: Record<string, ProjectText> = {
  "jeferson-morillo": {
    tagline: "This site: my portfolio, with a design inspired by light novels.",
    synopsis:
      "My personal portfolio for the Interface Design course, with the typography and details of a light novel and the colors of Barniz de Pasto.",
    problem:
      "A portfolio has to explain who I am in five seconds without looking like one more template. I wanted the form to say something about me: that I'm from Pasto and that I love light novels.",
    built: [
      "A 3D magic-circle scene with React Three Fiber, plus a static version for reduced motion.",
      "A contact form validated with regular expressions on both the client and the server.",
      "Typed content validated with zod: every skill links to the project where I used it.",
      "Spanish and English versions, with per-language routes and a CV in both languages.",
    ],
    challenges: [
      "Keeping the visual style without sacrificing clarity: sections and buttons use plain names.",
      "Making all content readable without JavaScript and with reduced motion.",
    ],
    repoLabel: "GitHub repository",
    demoLabel: "Live demo on Vercel",
  },
  voxara: {
    tagline: "Noise dosimeter for Wear OS watches that looks after your hearing.",
    statusNote: "No public release yet",
    synopsis:
      "Voxara measures the sound level around you in dBA from your watch, adds up a daily and weekly dose based on NIOSH, estimates how much you listen through headphones and warns you before you go over the limit. Tono, an AI assistant, explains your status in plain language.",
    problem:
      "On the street, on public transport or at a concert, we don't know how much noise we're putting up with. I wanted a glance at the wrist to be enough to know whether your ears are safe and how much of the day is left.",
    built: [
      "A watch app and a phone companion app, in a multi-module Android project (watch, phone, shared logic and shared UI).",
      "Deterministic, on-device dose, history and alerts: warnings never depend on the AI; Tono only explains them.",
      "Tiles, complications and ambient mode to read your status without opening the app.",
      "Interface in Spanish and English, tested on a Samsung Galaxy Watch 7.",
    ],
    challenges: [
      "Designing for round screens from 192 to 240 dp, in noisy places and with only one free hand.",
      "Saving battery: animations run only while the screen is active and visible.",
      "Making it clear that it is not a medical device and that the microphone needs calibration.",
    ],
    repoLabel: "GitHub repository",
    demoLabel: "Video of the app on the watch",
  },
  sotto: {
    tagline: "Desktop assistant for live presentations: a teleprompter that follows your voice.",
    statusNote: "v1.0.0 released",
    synopsis:
      "Sotto puts your script in a floating window right below the camera, moves forward line by line as you speak and drafts an answer when the audience asks a question. No accounts and no backend: your scripts stay on your computer.",
    problem:
      "When presenting, you end up looking at your notes instead of at people. I wanted a tool that would follow my pace without getting in the way and help me with the hard questions.",
    built: [
      "A floating, always-on-top teleprompter that hides itself when you share your screen on Windows and macOS.",
      "On-device speech recognition with sherpa-onnx: the text moves as you speak and stops when you improvise.",
      "Answers to audience questions with DeepSeek, based on your script and your preparation documents.",
      "Import of .docx, .pdf, .md and .txt scripts without changing your words, with timed rehearsals per section.",
    ],
    challenges: [
      "A window that reads the same over dark slides, light slides and video calls.",
      "Keeping everything local and fast on three operating systems.",
    ],
    repoLabel: "GitHub repository",
    demoLabel: "v1.0.0 download on GitHub Releases",
  },
  elyndra: {
    tagline: "Android game launcher with a console experience, designed for controllers.",
    statusNote: "v1.1.0 released",
    synopsis:
      "Elyndra brings your Android games and emulator ROMs together in a single library you can drive entirely with a controller. It doesn't emulate anything: it hands each game to the emulator you chose. Masha, a holographic 3D assistant, recommends what to play and with which emulator.",
    problem:
      "On Android, games and emulators end up scattered across apps and folders. I wanted to open my phone or handheld and feel like I was sitting in front of a console.",
    built: [
      "Full controller navigation (Xbox, PlayStation, Switch Pro and built-in controls) with Jetpack Compose and Material 3.",
      "About 130 emulator profiles with the exact intent for each one, and ROM folders without asking for storage permission.",
      "Masha: a 3D avatar with lip sync, voice and chat that knows your library and how you play.",
      "Game descriptions translated on-device with ML Kit, and updates from GitHub Releases.",
    ],
    challenges: [
      "Making every screen work the same with the D-pad, sticks and touch screen.",
      "Six languages that switch without restarting the app.",
    ],
    repoLabel: "GitHub repository",
    demoLabel: "Official Elyndra website",
    extraLinkLabels: ["Download v1.1.0"],
  },
  laaf: {
    tagline: "Third-person survival horror made in Godot, with the fog of PS2 classics.",
    synopsis:
      "A stranger searches for his missing sister in Hollowmere, an isolated town where five childhood friends serve The Veil. Three chapters of stealth, hunters, weapons and bosses where you choose to spare, kill or flee, with five endings.",
    problem: "I wanted to recreate the feel of PS1 and PS2 survival horror (fog, grain, low-poly models) without the game feeling old.",
    built: [
      "A Godot 4.7 game with a custom PS2-style post-process (fog, grain and dithering) and CRT scanlines in the menu.",
      "A minimal HUD: objective, weapon and ammo, health and stamina, minimap and clock; everything else appears only when it matters.",
      "Minigames (lockpicking, fishing, radio tuning, music box) and a menu with story scenes behind it.",
    ],
    challenges: [
      "Letting the player understand their status in a split second without taking their eyes off the fog.",
      "Coordinating teamwork in a shared repository.",
    ],
    team: {
      credit: "Team project with Juan17la. Team repository: Juan17la/laaf_game.",
      role: "Lead developer (149 of the repository's 158 commits).",
    },
    repoLabel: "GitHub repository",
    demoLabel: "Game video or build",
  },
  alomedia: {
    tagline: "In-browser video editor with local WebAssembly rendering. Team project.",
    statusNote: "Online demo",
    synopsis:
      "AloMedia is a web video editor with a multitrack timeline, real-time preview, undo and redo, and AI tools such as automatic transcription and noise reduction. Rendering runs in the browser with FFmpeg compiled to WebAssembly.",
    problem: "Editing video usually means installing heavy software. The team wanted an editor that worked entirely in the browser.",
    built: [
      "Frontend: light mode and a theme system across the whole editor, styles for the timeline, clips and modals, an OAuth return page and reorganized services (according to my commit history).",
      "Backend: paginated listings for projects, history and notifications, Liquibase migrations and indexes for faster responses (according to my commit history).",
    ],
    challenges: [
      "Working on a large codebase with more than 800 commits and branches from several team members.",
      "Keeping light mode consistent across dozens of editor screens.",
    ],
    team: { credit: "Team project by Juan17la, CamiloParraS and Jeferson Morillo. Original repositories by Juan17la." },
    repoLabel: "GitHub repository",
    demoLabel: "Live demo on Vercel",
    extraLinkLabels: ["Backend (Spring Boot)"],
  },
};

/** Experience texts by id. Entries still waiting for data keep their Spanish TODOs. */
export const experience: Record<
  string,
  Partial<Pick<ExperienceEntry, "title" | "organization" | "place" | "impact">> & { verificationLabel?: string }
> = {
  ucc: {
    title: "Software Engineering",
    organization: "Universidad Cooperativa de Colombia",
    place: "Pasto, Nariño",
    impact: ["Currently in my 5th semester."],
  },
  "cisco-ciberseguridad": {
    title: "Course: Introduction to Cybersecurity",
    organization: "Cisco Networking Academy",
    impact: ["Certificate of completion."],
    verificationLabel: "Verify certificate",
  },
  "cisco-redes": {
    title: "Course: Networking Devices and Initial Configuration",
    organization: "Universidad Nacional Abierta y a Distancia (UNAD), via Cisco Networking Academy",
    impact: ["Certificate of completion."],
    verificationLabel: "Verify certificate",
  },
  "laboral-pendiente": {},
  "proyecto-laaf": {
    title: "LAAF — lead developer",
    organization: "Team project with Juan17la",
    impact: ["Survival horror in Godot 4.7: 149 of the repository's 158 commits are mine."],
  },
  "proyecto-sotto": {
    title: "Sotto — author",
    organization: "Personal open-source project",
    impact: ["Released v1.0.0 for Windows, macOS and Linux on October 12, 2026."],
  },
  "proyecto-elyndra": {
    title: "Elyndra — author",
    organization: "Personal project",
    impact: ["Released three versions in one month; the latest is v1.1.0."],
  },
  "proyecto-voxara": {
    title: "Voxara — author",
    organization: "Personal project",
    impact: ["Wear OS app and its Android companion, tested on a Galaxy Watch 7."],
  },
  "proyecto-alomedia": {
    title: "AloMedia — team member",
    organization: "Team project (Juan17la's repositories)",
    impact: ["Light mode in the editor and backend performance improvements (109 commits on the frontend and 27 on the backend)."],
  },
};
