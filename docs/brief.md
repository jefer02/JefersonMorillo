# Portfolio Build Brief — Jeferson Morillo

**A professional personal portfolio for Jeferson Morillo, with a light-novel touch in the visuals**
Stack: Next.js (App Router) · TypeScript · Tailwind CSS · deployed on Vercel
Course: Diseño de Interfaces — "Entrega Proyecto"

> Read this entire document before writing any code. It is the single source of truth for this project, together with the official course guide at **https://structure-portfolio.vercel.app** (see §2.1). When something here conflicts with your defaults, this document wins. When something here conflicts with the course guide, **the course guide wins** and you adapt the creative concept to it.

> **Revision, 28 Oct 2026 (Jeferson's decision):** the copy is professional. Section headings and menu labels are plain Spanish names; there are no chapter numbers, kanji marks, themed subtitles, ruby annotations, "Crónica de Atriz", "Vol. 1" or long light-novel title. The light-novel touch lives in the visuals only: the magic circle around the photo, the red band (obi), serif display type, sigils, the bookshelf and the Experiencia clock. "Origen" was replaced by "Presentación". Project case studies live at `/proyectos/[slug]`. This brief has been updated to match; if an older idea survives anywhere below, this note wins.

---

## 0. Your role and mission

You are a senior creative developer and product designer working at Awwwards level. Build Jeferson's personal portfolio so that it is:

1. **Unforgettable and original** — one strong concept executed with craft, not a template with effects sprinkled on top.
2. **Instantly clear** — a recruiter must understand who he is, what he builds and how to contact him within 5 seconds, at a glance.
3. **Fast, accessible and honest** — real content only, great on a mid-range phone, usable with a keyboard and with reduced motion.

Creativity is the point of this project, but never at the cost of clarity, performance or truthfulness.

---

## 1. Non-negotiable rules

1. **Git is read-only for you.** Jeferson makes every commit himself. Never run `git add`, `git commit`, `git push`, `git branch`, `git checkout -b`, `git switch -c`, `git stash`, `git reset`, `git init`, or any other command that writes to git. Allowed: `git status`, `git diff`, `git log`. Scaffold with `--disable-git` (otherwise `create-next-app` initializes a repo and makes a first commit).
2. **Stack (required by the course):** Next.js latest stable (16.x at the time of writing; confirm with `npm view next version`), App Router, TypeScript in strict mode, Tailwind CSS v4 (CSS-first `@theme` config), deployed on **Vercel** from a GitHub repository. No other CSS framework or UI kit (no Bootstrap, MUI, Chakra, DaisyUI). Small headless libraries are fine. Style with Tailwind utility classes in JSX and use Tailwind's responsive prefixes (`md:`, `lg:`) for the responsive layout, as the course guide asks; custom CSS is only for things utilities can't express (keyframes, SVG filters, `@theme` tokens).
3. **Course structure (required by the course):** one component per section inside `components/` (e.g., `components/Hero.tsx`, `components/Testimonios.tsx`), and `app/page.tsx` imports those section components and renders them **in the same order as the guide's section map**. Use TypeScript types for projects, testimonials and experience entries.
4. **Never invent facts.** No fake testimonials, employers, dates, metrics, certifications, links or quotes. When information is missing, use an obvious typed placeholder marked `TODO(jeferson): …` and list it in the final report. Testimonials must come from real people who agreed to be published.
5. **Intellectual property.** The site is inspired by the isekai / light-novel *genre* (Jeferson loves *Mushoku Tensei*, *Re:Zero* and similar). Do **not** use characters, character names, logos, official artwork, screenshots, music, quotes or fan art from those works. Every visual, glyph and line of copy must be original. Mentioning his favorite anime as plain text in the About section is fine (titles only, no cover art).
6. **Language.** All user-facing copy in Spanish (es-CO): natural, warm, confident, no clichés ("apasionado por la tecnología", "transformo ideas en realidad"). Code, comments and docs in English.
7. **Professional copy.** All visible text reads like a professional portfolio. Section headings and menu labels are plain Spanish names; no chapter numbers, kanji marks, themed subtitles or ruby annotations. Buttons always use plain verbs ("Ver proyectos", "Descargar CV", "Enviar mensaje"). The light-novel touch is visual only.
8. **Skills:** no bars, no percentages, no star ratings, no "levels", no circular gauges, no years-of-experience counters. List **frameworks, libraries and tools only — never programming languages** (no "Kotlin", "Dart", "TypeScript", "Python" chips).
9. **No bars or percentages anywhere** in content (skills, spoken languages, extras). Describe proficiency in words if needed.
10. **Social links:** tech-related only (GitHub, LinkedIn, and similar dev platforms). No WhatsApp, no personal Instagram / Facebook / TikTok.
11. **Accessibility and reduced motion are part of the design.** Every animated experience has a calm, complete, non-animated equivalent.
12. Keep a concise `CLAUDE.md` at the project root summarizing these rules (git read-only, honesty, IP, stack, Spanish copy) so future sessions keep them.

---

## 2. Requirements checklist → where each one lives

Two sources, both mandatory: the official course guide (§2.1, highest priority) and Jeferson's own notes (R1–R13). Every row must be satisfied and verified at the end.

| # | Requirement | Where / how |
|---|---|---|
| R0 | **Every recommendation of the course guide** — every item of its final checklist, its 8 required sections in the map's order, and at least one extra section | §2.1 (checklist and map copied verbatim) |
| R1 | Built with Next.js, TypeScript, Tailwind CSS; deployed on Vercel from GitHub | Whole project + §12 Phase 6 |
| R2 | Hero has profile photo + welcome; technical but **very short** | §7.1 Bienvenida |
| R3 | «Descargar CV» button in the hero — **required by the course**, always present and downloading a real PDF | §7.1 "CV" + command palette + footer |
| R4 | "Acerca de mí" = life **outside** software engineering (hobbies, interests) | §7.3 Acerca de mí |
| R5 | Skills: no bars/percentages; frameworks, not languages (e.g., Tailwind, Django) | §7.4 Habilidades |
| R6 | Proud of where he comes from | §7.2 Presentación (born in El Contadero, lives in Pasto) + hero origin chip + theme names + barniz palette |
| R7 | A tag that says "Actualmente estudiando" | Hero (primary), experience entry, footer |
| R8 | Testimonials: real people, minimum 3, with role or relationship to him | §7.6 Testimonios |
| R9 | Academic + work experience, **newest to oldest**, including project experience | §7.7 Experiencia (sorted in code) |
| R10 | Contact form validated with **regular expressions** | §7.9 + §10 |
| R11 | Social networks only if tech-related; no WhatsApp | Contact + footer |
| R12 | "Adicional" section: creative, no bars/percentages, placed deliberately (course: at least 1 extra section) | §7.8 Adicional (+ Presentación and Habilidades as extras) |
| R13 | Unique, super creative, 2D/3D allowed | Whole concept (§4) |
| R14 | One component per section in `components/`; `app/page.tsx` imports them in the guide's order | §1 rule 3, §9.3 |
| R15 | Responsive on phone, tablet and desktop (Tailwind `md:` / `lg:`) | Every section, verified at 375 / 768 / 1440 px |
| R16 | Deliverables: a GitHub repository with his code and commits, and a public Vercel URL | §12 Phase 6 (Jeferson pushes and deploys) |

### 2.1 The official course guide (highest priority)

**URL:** https://structure-portfolio.vercel.app — "Construye tu Portafolio personal", course *Diseño de Interfaces*, "Entrega Proyecto".

**Final checklist — copied verbatim from the guide (Paso 5). Every item is mandatory:**

| Guide item (verbatim) | Detail (verbatim) | How this portfolio satisfies it |
|---|---|---|
| Proyecto en Next.js + TypeScript | create-next-app con --typescript | §9.1 scaffold |
| Estilos con Tailwind CSS | clases utilitarias y responsive | §1 rule 2 |
| 1. Menú de navegación | Logo, tu nombre o tus iniciales | Header with JM monogram **and** the visible name, plus section links (§8.1–8.2) |
| 2. Bienvenida / Hero con CV | Botón «Descargar CV» | §7.1 — the button is **always** present and downloads a real PDF (§7.1 "CV") |
| 3. Acerca de mí | Párrafo de presentación personal | §7.3 opens with a personal presentation paragraph |
| 4. Mis proyectos | Link a GitHub (repositorio) · Link a Vercel / Demo en vivo | §7.5 — every project card and case study shows both links |
| 5. Testimonios | Mínimo 3 testimonios | §7.6 |
| 6. Experiencia académica y laboral | Experiencia académica 🎓 (universidad, cursos) · Experiencia laboral 💼 (empleos, prácticas, freelance) | §7.7 |
| 7. Contactos | Correo electrónico | §7.9 — visible email address + form |
| 8. Pie de página | Tu nombre y © año | §7.10 |
| Sección adicional (tú eliges) | Al menos 1 sección extra | Three extras: Presentación (§7.2), Habilidades (§7.4), Adicional (§7.8) |
| Se ve bien en celular | diseño responsive | R15 — verified at 375 / 768 / 1440 px |
| Código subido a GitHub | repositorio con commits | Phase 6 — Jeferson creates the repo, commits and pushes |
| Publicado en Vercel | URL pública funcionando | Phase 6 — Jeferson imports the repo in Vercel |

**Other rules from the guide:**
- **Tools (obligatorias):** Next.js (App Router, home in `app/page.tsx`), TypeScript (types for projects, testimonials and experiences), Tailwind CSS (utility classes in JSX, `md:` / `lg:` for responsive) and Vercel (free deploy from a GitHub repo; every push publishes a new version).
- **Structure:** one component per section inside `components/`; `app/page.tsx` imports them and orders them like the guide's section map, top to bottom.
- **Delivery:** create the project with `create-next-app` (TypeScript + Tailwind) → build the sections in order → make it responsive (phone, tablet, desktop) → push to GitHub → import into Vercel. Deliverables: the GitHub repository URL and the public `.vercel.app` URL.

**Page order** (the checklist's numbered order, with the extra sections placed where they serve the story; required sections never change their relative order):

Menú de navegación → Bienvenida/Hero → *Presentación (extra)* → Acerca de mí → *Habilidades (extra)* → Mis proyectos → Testimonios → Experiencia académica y laboral → *Adicional (extra)* → Contactos → Pie de página.

**Section map — confirmed from the guide (Paso 1, "Secciones obligatorias", 9 blocks):**

1. Menú de navegación · 2. Bienvenida / Hero con CV · 3. Acerca de mí · 4. Mis proyectos · 5. Testimonios · 6. Experiencia académica y laboral · 7. Contactos · 8. Pie de página · ⭐ Sección adicional (tú eliges)

The guide's "9" counts the 8 numbered sections plus the additional one. **Habilidades is not a required section**: it is one of this portfolio's extras, together with Presentación and Adicional. The map lists the additional section without a fixed position, so the extras sit between required sections where they serve the story, while the 8 required sections keep exactly the map's relative order.

**Optional refinement:** the guide also has one slide per section ("estructura", "qué debe incluir", code example) that is rendered with JavaScript. If you have a working browser (e.g., Playwright with Chromium from a throwaway script in a temp folder), step through the slides with "Siguiente" or the → key, save them verbatim to `docs/guia-curso.md`, and add anything new as rows R17, R18, … in the table above. Do not tick the checklist on the page. If no browser works, skip this step: the checklist and map above are the requirements.

---

## 3. Who Jeferson is (known facts)

Use these facts. Anything not listed here is unknown → placeholder + ask.

- **Name:** Jeferson Manuel Morillo Vallejo (display name: "Jeferson Morillo").
- **GitHub:** `jefer02` → https://github.com/jefer02 (about 45 public repositories; pinned: **Elyndra** and **AloMediaReact**, his fork of the AloMedia team repo).
- **LinkedIn:** https://co.linkedin.com/in/jeferson-morillo-2a931b368 (LinkedIn blocks automated reading, so its contents are unknown; ask Jeferson for his experience and education, or for the PDF that LinkedIn exports from his profile).
- **Studies:** Ingeniería de Software at Universidad Cooperativa de Colombia (UCC), campus Pasto. Currently studying (start year: `TODO(jeferson)`).
- **From:** San Juan de Pasto, Nariño, Colombia.
- **Loves:** anime, especially isekai (*Mushoku Tensei*, *Re:Zero*, and others → `TODO(jeferson)`: full list).
- **Builds:** Android, Wear OS and desktop (Flutter) apps, a 3D game in Godot, and full-stack web (React + Spring Boot in AloMedia; Next.js in this portfolio).

### Projects (verify every detail and date with Jeferson before publishing)

1. **Voxara** — hearing-care app for Wear OS smartwatches. Measures ambient decibels in real time and warns about harmful noise; an AI assistant called "Tono" gives advice; situation modes (street, transport, concert…) are planned; companion phone app for summaries and settings. Multi-module Android project (watch, phone, shared logic, shared UI). Frameworks: Jetpack Compose, Compose for Wear OS (Material 3), Material 3, Wearable Data Layer API. Test device: Samsung Galaxy Watch 7. Status: **En desarrollo**.
2. **Sotto** — open-source desktop assistant for live presentations (Windows, macOS, Linux). Floating teleprompter, voice tracking of the script, AI answers to audience questions, local voice transcription (Whisper), AI-assisted form autofill. 100% local, no accounts. Frameworks: Flutter, Riverpod, go_router, Hive CE. Status: **preparing first public release**. He reported a large passing test suite — confirm the number before showing any metric.
3. **Elyndra** — Android game launcher with a console-like experience. Jetpack Compose + Material 3, full gamepad navigation, an AI assistant ("Masha") with a holographic 3D avatar, game descriptions translated on-device (ML Kit) to the app language, update checks against GitHub Releases. Repo: https://github.com/jefer02/Elyndra. Status: **Publicado** (confirm).
4. **LAAF** — 3D survival-horror game built with Godot. Details, status and media: `TODO(jeferson)`.
5. **Collares inteligentes para salud bovina** — academic project (course: Formulación y Evaluación de Proyectos): IoT smart-collar system to monitor and track cattle health, focused on the municipality of Pasto, Nariño, written as an IEEE-format paper. Status: **Proyecto académico** (formulation; do not claim a built product unless Jeferson confirms).
6. **AloMedia — editor de video web** (team project; Jeferson says he built it with the team). Verified from the public repositories:
   - **What it is:** a browser-based video editor: timeline, clips, time/space transformations, undo/redo, and AI features (automatic speech-to-text transcription, audio noise reduction). Rendering runs client-side with **FFmpeg compiled to WebAssembly** (or a dedicated server).
   - **Frontend** — https://github.com/Juan17la/AloMediaReact (his fork: https://github.com/jefer02/AloMediaReact): React 19, Vite, Tailwind CSS v4, Zustand, TanStack Query, React Router, i18next, FFmpeg.wasm (`@ffmpeg/ffmpeg`), Vitest. 800+ commits.
   - **Backend** — https://github.com/Juan17la/AloMediaSpringBoot: Spring Boot 4, Spring Security with OAuth2 client and JWT (jjwt), Spring Data JPA, PostgreSQL, Liquibase migrations, MapStruct, Lombok, Docker. Manages media metadata, project persistence and the AI operations API.
   - **Live demo:** https://alo-media.vercel.app — a real "Link a Vercel / Demo en vivo" for the course checklist.
   - **Credit and honesty:** the repositories belong to `Juan17la`. Present it as a team project ("Proyecto en equipo"), credit the team and link the original repositories. Check his contributions read-only (`https://api.github.com/repos/Juan17la/AloMediaReact/contributors`, the same for `AloMediaSpringBoot`, or `gh api` equivalents), then ask Jeferson what he built (frontend, backend, or both; which features) and his role. Describe only his real contributions; never imply he built it alone.

Work experience: `TODO(jeferson)` (if none yet, the timeline works with academic + project entries; never fabricate a job).

**Find the repositories (read-only):** in Phase 0, list his public repositories with the GitHub API (`https://api.github.com/users/jefer02/repos?per_page=100`) or `gh repo list jefer02 --limit 100` (read-only commands only). Match each project above to its repository, homepage and releases, and show Jeferson the proposed "Repositorio en GitHub" and "Ver demo" links for confirmation. Point out interesting public repos that aren't in this list and ask whether he wants them in the portfolio. A project whose repo is private or doesn't exist keeps a `TODO(jeferson)`.

---

## 4. The concept

### 4.1 Big idea: a professional portfolio with a light-novel touch

The words are those of a professional developer portfolio: plain section names, concrete copy, plain-verb buttons. The visuals borrow the grammar of Japanese light novels and the color and pride of Nariño (San Juan de Pasto sits in the Valle de Atriz, at the foot of the Galeras volcano). There is no series title, volume number or long light-novel title.

| Visual element | Where |
|---|---|
| Magic circle around the portrait + 3D atmosphere | Bienvenida |
| Red band (obi) carrying the welcome line and the CTAs | Bienvenida |
| Serif display type (mincho) | Headings everywhere |
| Generated sigils | Habilidades, side rail, project covers |
| Bookshelf of favorite titles | Acerca de mí |
| Clock that turns back as the timeline scrolls | Experiencia |
| Sealed letters | Testimonios |
| Handwritten notes | Adicional |

### 4.2 Motif sources (all executed with original designs)

**Inspired by *Mushoku Tensei* — a second life, growth through study:**
- Original **magic circles** (concentric rings, original runes) as the core graphic system.
- An **open-book layout** for skills: frameworks grouped into categories, each with a generated sigil.
- **Letters** sent across distances: testimonials arrive as sealed letters.

**Inspired by *Re:Zero* — looking back, returning:**
- **Side sigil rail**: one sigil per section on the right edge (desktop), lit as the reader passes them.
- **Reverse chronology**: experience is listed newest to oldest (the required order), with a clock that turns back as you scroll.
- A **404 page** with one small playful line about this timeline and a clear way back home.

**Pasto and Nariño — pride of origin (facts verified):**
- **Galeras** — called *Urcunina*, "montaña de fuego"; an active volcano of more than 4,200 m, about 9 km from Pasto; locals see its silhouette as a sleeping lion guarding the city.
- **Carnaval de Negros y Blancos** — UNESCO Intangible Cultural Heritage of Humanity (2009). Tradition: "negros en el cinco, blancos en el seis" (5 and 6 January). Talc powder, serpentines, parade floats.
- **Barniz de Pasto Mopa-Mopa** — UNESCO Intangible Heritage in Need of Urgent Safeguarding (2020): a pre-Hispanic technique where thin, colored sheets of mopa-mopa resin are cut and layered onto wood.
- **Laguna de La Cocha** and Isla La Corota, near Pasto.

**Cultural respect:** the Carnaval reference is about the festival days and the joyful play with talc and color. Never depict painted faces or anything resembling blackface. Use abstract talc puffs, ink drops and serpentines.

---

## 5. Art direction

### 5.1 Palette — "barniz de Pasto at night and by day"

The palette comes from barniz de Pasto craftwork (saturated vermilion, jade, gold and turquoise on dark wood) and from the Galeras at night. Starting points in OKLCH — tune all pairs to WCAG AA (body text ≥ 4.5:1).

| Token | "Día de Blancos" (light) | "Día de Negros" (dark) | Use |
|---|---|---|---|
| `--paper` | `oklch(0.97 0.012 85)` warm washi cream | `oklch(0.17 0.02 265)` volcanic night | Background |
| `--ink` | `oklch(0.2 0.015 50)` | `oklch(0.93 0.015 85)` | Text |
| `--ink-soft` | `oklch(0.42 0.02 50)` | `oklch(0.75 0.02 85)` | Secondary text |
| `--vermilion` | `oklch(0.56 0.19 30)` | `oklch(0.68 0.19 32)` | Primary accent, seals |
| `--jade` | `oklch(0.52 0.1 165)` | `oklch(0.72 0.11 165)` | Secondary accent |
| `--gold` | `oklch(0.72 0.13 80)` | `oklch(0.82 0.14 82)` | Magic circles, highlights |
| `--turquoise` | `oklch(0.6 0.09 205)` | `oklch(0.74 0.09 205)` | Links, details |
| `--ember` | `oklch(0.66 0.18 45)` | `oklch(0.74 0.19 48)` | Galeras glow, particles |

Use accents sparingly: the page is mostly paper and ink, with color arriving like an insert illustration.

### 5.2 Typography

- **Display / chapter titles:** a Japanese-style serif (mincho) with good Latin support — default *Shippori Mincho B1* (weights 600–800).
- **Body:** a calm humanist or gothic sans that is **not** Inter/Roboto/Arial — default *Zen Kaku Gothic New*; acceptable alternatives: *Hanken Grotesk*, *Instrument Sans*.
- **Mono / metadata / tags:** *JetBrains Mono*.
- Verify that á é í ó ú ñ ü ¿ ¡ render correctly in every font; swap fonts if any glyph falls back.
- No decorative CJK glyphs in the UI.
- Use `next/font` for everything (self-hosted, no layout shift). Fluid type with `clamp()`.

### 5.3 Texture and layout

- Subtle paper grain (SVG noise filter, very low opacity), print registration marks in corners of insert spreads, halftone dots on illustrations.
- Book-like editorial grid with generous margins and a short vermilion rule above each section heading. No running heads, folios or page numbers.
- Vertical text (`writing-mode: vertical-rl`) for short decorative labels only (project cover titles, bookshelf spines). Never for body copy.
- Mobile-first. Design the 375 px layout first, then enhance.

### 5.4 Motion principles

- Easing: one signature curve (e.g., `cubic-bezier(0.22, 1, 0.36, 1)`) plus a softer one for scrubbed scenes. UI micro-interactions 150–300 ms, reveals 400–800 ms.
- Animate `transform` and `opacity` only (and SVG stroke properties). No layout thrashing.
- Content is **visible by default** in the server-rendered HTML. Never ship content at `opacity: 0` waiting for JavaScript; enhance after hydration.
- `prefers-reduced-motion: reduce` → no smooth scroll, no 3D, no particles, no scrubbed scenes, no rewind effects; everything static and complete.
- No scroll-jacking that traps the user. Pinned scenes are short and only on desktop.

### 5.5 Anti-patterns (do not ship any of these)

Inter/Roboto/system font as brand font · purple-to-blue gradients · neon cyberpunk · glassmorphism everywhere · gradient text everywhere · emoji used as icons · cards inside cards · gray text on colored backgrounds that fails contrast · stock illustrations or AI-generated anime art · "Hola, soy X, un desarrollador apasionado" · lorem ipsum · skill bars, percentages or rings · animations that hide content · fake metrics.

---

## 6. Page architecture

- `/` — one long page made of sections (order below).
- `/proyectos/[slug]` — one case-study page per project, statically generated (old `/volumenes/*` links redirect here).
- `not-found` — the "Página no encontrada" 404.
- `opengraph-image`, `sitemap.ts`, `robots.ts`.

**Section order and rationale** (follows the guide, §2.1; "Guide" = the checklist item each section satisfies)

| id | Name | Guide | Why here |
|---|---|---|---|
| header | Menú | 1. Menú de navegación | Always visible: name + role + section links |
| `inicio` | Bienvenida | 2. Bienvenida / Hero con CV | First impression: who, what, CV, contact |
| `presentacion` | Presentación | Sección adicional | The professional intro right after the hero: what he builds, where he studies, where he's from. Short. |
| `acerca-de-mi` | Acerca de mí | 3. Acerca de mí | The person before the résumé |
| `habilidades` | Habilidades | Sección adicional | What he builds with, right before the proof |
| `proyectos` | Proyectos | 4. Mis proyectos | The proof |
| `testimonios` | Testimonios | 5. Testimonios | Others vouch for the work just shown |
| `experiencia` | Experiencia | 6. Experiencia académica y laboral | The path, newest → oldest |
| `extras` | Adicional | Sección adicional | Personal notes, placed before Contact so the final call to action stays last |
| `contacto` | Contacto | 7. Contactos | The call to action |
| footer | Pie de página | 8. Pie de página | Name, © year, site details, tech-only social links |

---

## 7. Section specifications

For every section: semantic `<section aria-labelledby>`, a section heading (short vermilion rule, the plain Spanish name, optional lede); a full static fallback for reduced motion.

### 7.1 Bienvenida / Hero — R2, R3, R7

**Content (keep the welcome to ≤ 25 words, technical and concrete):**
- No eyebrow above the name.
- H1: **Jeferson Morillo**
- Welcome line (draft — offer Jeferson 2 alternatives):
  "Desarrollador de software. Construyo apps para Android, Wear OS y escritorio con Jetpack Compose y Flutter, y aplicaciones web con React y Spring Boot."
- **Status tag** (R7), a pill with a softly pulsing gem: `Actualmente estudiando · Ingeniería de Software · UCC Pasto`
- Origin chip: `De El Contadero, Nariño`
- CTAs: **Descargar CV** (required by the course — always visible, `download` attribute, points to `/cv/CV-Jeferson-Morillo.pdf`) · **Ver proyectos** · **Contactar**. Give the CV button the same visual weight as the primary CTA.
- Scroll cue: "Ver más".

**CV (required):** if Jeferson provides his own PDF, use it at `public/cv/CV-Jeferson-Morillo.pdf`. If he doesn't have one, generate it from the same content files so it never contradicts the site: a print-styled `/cv` route (one or two A4 pages, clean editorial version of the art direction, real facts only, no bars or percentages) and an `npm run cv` script that renders it with Playwright's `page.pdf()` into `public/cv/`. The script runs locally, not during the Vercel build; the generated PDF is committed by Jeferson. Add a build check that fails if the PDF is missing.

**Photo:** `public/images/profile.jpg` (Jeferson provides it; if missing, render a tasteful placeholder and add a TODO). Use `next/image` with `priority`, explicit dimensions, and an original **summoning-circle frame**: SVG rings rotating very slowly around the circular photo, with a gold hairline. Optional: if Jeferson later provides an illustrated version of himself, crossfade to it on hover (never AI-generated without his decision).

**3D atmosphere (React Three Fiber), behind the content, low contrast, never competing with text:**
- A procedural **magic circle** rendered with a fragment shader on a plane: concentric rings, an outer ring of original runes (generated into a canvas texture), slow counter-rotation, gold emission in dark mode and ink/vermilion linework in light mode.
- **Ember / mana particles** (instanced points; ~350 desktop, ~100 mobile) drifting upward, reacting gently to the pointer.
- A stylized **low-poly volcano silhouette** on the horizon (procedurally displaced cone) with a faint ember glow at the crater — the Galeras.
- On scroll, the circle tilts and shrinks as the page moves on to the next section.
- Performance: load with `next/dynamic` (`ssr: false`) after first paint (idle callback); clamp `dpr` to `[1, 1.75]`; pause rendering when the hero is off-screen (IntersectionObserver + `frameloop="demand"`); dispose geometries/materials on unmount.
- Fallback: a static SVG of the same magic circle when `prefers-reduced-motion`, no WebGL, `navigator.connection.saveData`, or low-power hints (`hardwareConcurrency ≤ 4`).

**Loader:** none. Content renders immediately.

### 7.2 Presentación — R6

The professional intro right after the hero. Text only, no images.

- **Paragraph** (Jeferson's draft): "Soy desarrollador de software y estudiante de Ingeniería de Software en la Universidad Cooperativa de Colombia, en Pasto. Me gusta crear aplicaciones de principio a fin: apps para Android y Wear OS, herramientas de escritorio con Flutter y aplicaciones web con React y Spring Boot. Disfruto convertir una idea en un producto que la gente pueda usar, cuidando tanto el código como la experiencia. Nací en El Contadero, Nariño, y hoy vivo en Pasto."
- **Three highlights in one row**, one line each, taken from real projects: "Apps móviles y Wear OS", "Escritorio con Flutter", "Web full-stack".
- His origin is mentioned here once; "Acerca de mí" does not repeat it in its paragraph.

### 7.3 Acerca de mí — R4

Only life **outside** software engineering. No tech here.

- **Presentation paragraph (required by the course):** the section opens with one personal paragraph in first person (60–110 words) about who he is outside code: what he enjoys, what he's like (his origin is told once, in Presentación). Draft it only from facts Jeferson gives you; until then use a clearly marked placeholder.
- 3–5 small **interest cards**, each with a short line and an original small glyph.
  - Known: watching/reading isekai and anime.
  - Unknown (ask Jeferson): other hobbies, sports, music, favorite places in Nariño, what he does on weekends, any personal ritual. Placeholders until answered.
- **The shelf:** a row of book spines with his favorite anime/light novel titles as **text only** (original colors and typography, no official art). Hover/focus pulls a spine out and shows his one-line take on it. Keyboard accessible; on mobile, a horizontal scroll-snap row.

### 7.4 Habilidades — R5

Intro line: "No mido mis habilidades en porcentajes: las muestro en lo que he construido. Cada herramienta enlaza al proyecto donde la usé."

- Layout: an open-book spread. Left page: the **schools**; right page: **skill cards** for the selected category (on mobile: stacked schools with cards beneath).
- Each skill card: an original **sigil** generated deterministically from the framework name (seeded rune circle in SVG) that draws itself (stroke-dashoffset) on hover/focus, the framework name, one line of what he does with it, and **"Usado en:"** chips linking to the projects where he used it. This evidence replaces bars and percentages entirely.
- Optional: a small monochrome logo per framework (e.g., from Simple Icons) next to the sigil.
- Initial skill list (confirm every item with Jeferson; remove anything he doesn't want to claim; never add languages):
  - **Interfaces web:** Next.js, React, Tailwind CSS, Vite, Zustand, TanStack Query, React Router
  - **Backend y datos:** Spring Boot, Spring Security (OAuth2 + JWT), Spring Data JPA, PostgreSQL, Liquibase
  - **Multimedia en el navegador:** FFmpeg.wasm (WebAssembly)
  - **Interfaces nativas:** Jetpack Compose, Material 3, Compose for Wear OS, Flutter
  - **Estado, datos y rutas:** Riverpod, go_router, Hive CE, Wearable Data Layer API
  - **Mundos 3D y movimiento:** Godot, Three.js / React Three Fiber, GSAP
  - **Inteligencia artificial:** ML Kit, Whisper (local), DeepSeek API
  - **Herramientas:** Git, GitHub, Docker, Vitest, Android Studio, Vercel
  - For AloMedia items, keep only what Jeferson confirms he used himself in his part of the project.
- Optional live touch: "Última actividad en GitHub" — his most recent public GitHub activity for `jefer02` fetched server-side with revalidation (e.g., hourly). Must fail silently and never block rendering.

### 7.5 Proyectos

Intro line: "Cada proyecto parte de un problema real: cómo lo resolví y qué aprendí en el camino."

- Each project has a **light-novel style cover** (3:4): framed screenshot or original key art, a "Proyecto" label with a large project number ("03"), vertical title band, frameworks used, and a status ribbon (`Publicado`, `En desarrollo`, `Académico`).
- **Links (required by the course):** every card and every case-study page shows two clearly labeled buttons: **"Repositorio en GitHub"** and **"Ver demo"**. "Demo" means a live URL (Vercel or other hosting) when the project is web; for apps and games it means the closest real equivalent: a GitHub Release / download page, a landing page (e.g., the Elyndra website, `TODO(jeferson)`: URL and status), or a demo video. Never invent a link: a project without a real repo or demo yet shows the missing link as `TODO(jeferson)` in development and is flagged in the final report.
- **Include this portfolio as a project** ("Portafolio personal", slug `jeferson-morillo`: Next.js, TypeScript, Tailwind CSS, React Three Fiber, GSAP), with its GitHub repository and its Vercel URL (`TODO(jeferson)` until he deploys). It guarantees at least one project with a true live demo on Vercel.
- Desktop (≥ 1024 px, motion allowed): a short pinned horizontal **bookshelf** sequence scrubbed by scroll. Otherwise: a responsive grid / scroll-snap carousel with visible prev/next buttons.
- Clicking a cover opens `/proyectos/[slug]` with a **View Transition**: the cover morphs into the case-study header (use React 19.2 / Next.js 16 view transitions per current docs; fall back gracefully where unsupported).
- **Case-study page:** synopsis, the problem, what he built, frameworks, key challenges and decisions, what he learned, status, links (GitHub, release, demo), gallery. Add "Proyecto anterior / siguiente" navigation.
- Media lives in `public/projects/<slug>/`. Missing media → elegant generated cover (typography + palette + sigil), plus a TODO.

### 7.6 Testimonios — R8

Lede: "Lo que dicen de mi trabajo personas con las que he estudiado y trabajado. Cada testimonio se publica con su permiso."


- Each testimonial is a **sealed letter**: envelope with an original wax seal (his "JM" monogram inside a small magic circle). When the letter enters the viewport (or on click/Enter), the seal cracks and the letter unfolds. Reduced motion: letters are already open.
- Each letter shows: the quote, full name, **role**, **relationship to Jeferson** (e.g., "Fue mi docente de …", "Compañero de equipo en …"), optional organization, optional photo (only with permission), optional link to a LinkedIn profile/recommendation.
- Data model (`content/testimonials.ts`):
  ```ts
  type Testimonial = {
    id: string;
    name: string;          // real full name
    role: string;          // e.g. "Docente de Ingeniería de Software, UCC"
    relationship: string;  // how they know Jeferson
    organization?: string;
    quote: string;         // in their own words, 25–70 words
    avatar?: string;       // only with permission
    link?: string;         // LinkedIn profile or recommendation
    consent: boolean;      // they agreed to be published
    verified: boolean;     // Jeferson confirms it is real and approved
  };
  ```
- **Enforcement:** in production, render only entries with `consent && verified`, and render the section only when at least the required minimum qualify (3, or the guide's minimum if higher). Because the course requires this section, also make `next build` print a loud warning while fewer than the minimum are verified, so Jeferson knows he can't deliver yet. In development, show placeholders with a visible "PLACEHOLDER — NO PUBLICAR" stamp. Never write testimonial text yourself.
- Create `docs/pedir-testimonios.md` with a short, friendly Spanish message Jeferson can send to teachers, classmates or collaborators to request a testimonial (what to include, length, consent to publish).

### 7.7 Experiencia académica y laboral — R9

Lede: "De lo más reciente a lo más antiguo." (shown once).

- Entries of three types — **Académico** (universidad, cursos), **Laboral** (empleos, prácticas, freelance) and **Proyecto** — each with: title, organization/context, place, date range (or "Actualidad"), 1–3 lines of impact, frameworks. Both the academic and the work groups must be visibly present, as the course asks; if Jeferson has no work entry yet, ask him (prácticas, freelance, monitorías and paid personal projects count) and never invent one.
- **Order is enforced in code:** sort by end date descending (ongoing first), then start date descending. Never rely on manual ordering.
- Layout: a sticky column with a large year numeral that counts *down* as you scroll and an SVG clock whose hand turns **counter-clockwise** (decorative, `aria-hidden`); entries on the other side on a timeline whose markers light up when reached. Filter chips: Todo · Académico · Laboral · Proyectos. Courses and certifications live here as Académico entries (issuer, date, verification link if any — `TODO(jeferson)`).
- The UCC entry carries the "Actualmente estudiando" tag (R7).
- Mobile: single column, the clock sits beside the year above the entries.

### 7.8 Adicional — R12

A more personal, handwritten-feeling page of notes. No bars, no percentages.

- **Idiomas:** described in words (e.g., "Español — lengua materna"; English level `TODO(jeferson)` described by what he can do: read documentation, hold a conversation, etc.).
- **Eventos / logros:** hackathons, talks, contests — `TODO(jeferson)`.
- **Lo que estoy aprendiendo ahora:** e.g., 3D for the web while building this site.
- **Datos curiosos:** e.g., "Programo a unos 9 km de un volcán activo."
- A signature at the end (his name in a script-like treatment) with a small "Gracias por tu tiempo."

### 7.9 Contacto — R10, R11

Heading: "Contacto". Lede: "¿Tienes una oportunidad, un proyecto o una pregunta? Escríbeme y te respondo."

- **Form fields:** Nombre · Correo · Motivo (select: Oportunidad laboral / Proyecto / Colaboración / Otro) · Mensaje · hidden honeypot.
- **Magic-circle validation:** an SVG circle surrounds the form with one rune per field. Each rune ignites when its field passes its regex; the circle completes when all are valid. Errors appear inline in Spanish, linked with `aria-describedby`, `aria-invalid` set, and an `aria-live="polite"` region for the result.
- **On success:** the letter folds and flies away, plus a short burst of talc and serpentines in the barniz palette (static confirmation under reduced motion).
- **Email (required by the course):** his email address written out in full and visible without interaction, as a `mailto:` link with a copy-to-clipboard button (`TODO(jeferson)`: confirm which address to publish). Plus GitHub (https://github.com/jefer02) and LinkedIn (https://co.linkedin.com/in/jeferson-morillo-2a931b368). No phone, no WhatsApp.
- Full technical spec in §10.

### 7.10 Pie de página — R6, R11

Site details with dotted leaders, laid out like a book's colophon:
```
Jeferson Morillo — Desarrollador de software
Autor ............ Jeferson Manuel Morillo Vallejo
Actualizado ...... <month year from build date>
Ubicación ........ San Juan de Pasto, Nariño, Colombia
Tipografía ....... <fonts used>
Tecnología ....... Next.js · TypeScript · Tailwind CSS
Estado ........... Actualmente estudiando Ingeniería de Software — UCC Pasto
```
Plus a plain, always-visible line **"© <current year> Jeferson Morillo"** (required by the course; compute the year at build time), GitHub and LinkedIn icons, and "Volver arriba".

---

## 8. Global signature features

1. **Menú de navegación (required by the course):** a real `<nav>` in the sticky header. Left: the JM monogram seal followed by the visible name **"Jeferson Morillo"** (initials "JM" alone are acceptable only below `sm:`). Desktop (`lg:`): inline links to every section. Mobile/tablet: a "Menú" button that opens a full-screen list of sections with dotted leaders and section numbers (01, 02…). Focus-trapped, `Esc` closes, returns focus to the trigger.
2. **Header:** solid background (paper in light mode, the dark tone in dark mode) with a thin bottom rule. Under the name, the plain role "Desarrollador de software". The right side holds the search trigger and the theme toggle.
3. **Side sigil rail:** desktop only (`xl` and up), right edge, hidden over the hero, always visible otherwise. One original sigil per section; visited sections stay lit for the session (sessionStorage); the current one is highlighted; hover/focus shows the section name. Clicking jumps straight to the section, with no overlay. Accessible as a `<nav aria-label="Secciones">` list of links.
4. **Search / command palette ("Buscar"):** `Ctrl/⌘ + K` (and a floating search button on mobile). Commands: go to any section, open any project, download CV, copy email, open GitHub/LinkedIn, switch theme, go to the top. Built with `cmdk`, fully keyboard accessible.
5. **Theme toggle "Día de Blancos / Día de Negros":** light and dark modes named after the Carnaval days. Defaults to the system preference; persisted. The switch plays a soft talc puff (to light) or ink bloom (to dark). Tooltip: "Inspirado en el Carnaval de Negros y Blancos de Pasto, Patrimonio de la Humanidad (UNESCO, 2009): negros en el cinco, blancos en el seis." No flash of incorrect theme on load.
6. **Smooth scroll:** Lenis (`lenis/react`, `ReactLenis root`), driven from GSAP's ticker (`autoRaf: false`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`). Disabled under reduced motion. Anchor links and the palette must work with it.
7. **404 "Página no encontrada":** one small playful line ("Este camino no existe en esta línea temporal. Vuelve al inicio y sigue explorando."). A decorative clock rewinds; clear buttons "Volver al inicio" and "Ver proyectos". No forced auto-redirect.
8. **Optional (off by default):** a sound toggle for page turns and seal cracks. Ship only if assets are original or properly licensed.

---

## 9. Technical architecture

### 9.1 Scaffold

The project folder may already contain this brief and the photo, which can make `create-next-app` refuse to run. Scaffold into a subfolder and work there. **No `src/` directory**: the course guide expects `app/page.tsx` and `components/` at the project root.

```bash
npx create-next-app@latest portafolio --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --disable-git
```

If a flag is rejected, check `npx create-next-app@latest --help` and adapt (Turbopack is the default bundler in Next.js 16). Move this brief to `portafolio/docs/brief.md` and the photo to `portafolio/public/images/profile.jpg`. `--disable-git` is intentional: Jeferson initializes the repository, commits and pushes himself. Read the generated `AGENTS.md`, if any, and follow current Next.js 16 conventions (`proxy.ts` instead of `middleware.ts`, async request APIs, explicit caching with `"use cache"` where useful). Node.js ≥ 20.9.

### 9.2 Dependencies (justify anything beyond this list)

- `gsap` + `@gsap/react` (`useGSAP`) — ScrollTrigger, SplitText, Flip. All GSAP plugins are free, including commercial use. Register plugins once on the client.
- `motion` (import from `motion/react`) — component presence and micro-interactions only; GSAP owns scroll storytelling. Don't animate the same element with both.
- `lenis` — smooth scroll.
- `three`, `@react-three/fiber` (v9, React 19), `@react-three/drei` (v10) — hero scene only, lazy-loaded.
- `cmdk` — command palette.
- `next-themes` — theme handling without flash.
- `zod` — content schemas and form schema (with the regexes from §10).
- `resend` — contact email.
- Dev: `vitest`, `@playwright/test`, `prettier` + `prettier-plugin-tailwindcss`.
- Optional: enable the React Compiler (`reactCompiler: true` + `babel-plugin-react-compiler`) if it builds cleanly.

### 9.3 Structure

```
app/
  layout.tsx              # fonts, theme provider, JSON-LD, skip link
  page.tsx                # imports the section components and renders them in the guide's order — nothing else
  proyectos/[slug]/page.tsx
  not-found.tsx
  opengraph-image.tsx     # light-novel cover style
  sitemap.ts  robots.ts
  actions/contact.ts      # server action
components/
  Navbar.tsx  Hero.tsx  Presentacion.tsx  AcercaDeMi.tsx  Habilidades.tsx  Proyectos.tsx
  Testimonios.tsx  Experiencia.tsx  Adicional.tsx  Contacto.tsx  Footer.tsx
                          # ONE file per section, directly in components/, in the order of §6
  fx/                     # MagicCircle, Sigil, SavePointRail, CommandPalette, WaxSealLetter, Chronicle, Grimoire,
                          # Shelf, TalcBurst, ChapterOpener (section heading) — helpers used by sections
  three/HeroScene.tsx
  ui/                     # buttons, chips, tags
content/                  # profile.ts, skills.ts, projects.ts, experience.ts, testimonials.ts, extras.ts, socials.ts, schema.ts
types/                    # Project, Testimonial, ExperienceEntry, Skill… (the course asks for explicit types)
lib/
  validation/patterns.ts  # shared regexes (client + server)
  validation/contact.ts   # zod schema using the patterns
  rate-limit.ts  env.ts  motion.ts (reduced-motion helpers)
public/
  images/profile.jpg   cv/CV-Jeferson-Morillo.pdf (provided or generated, §7.1)   projects/<slug>/...
docs/
  brief.md   pedir-testimonios.md   checklist-entrega.md   guia-curso.md (only if the slides were captured)
README.md                 # what the project is, how to run it, how to deploy it on Vercel
```

All content lives in typed files under `content/`, validated with zod at build time (`npm run check:content`). Schema errors fail the build; remaining `TODO(jeferson)` markers print as warnings.

### 9.4 Images Jeferson provides

Jeferson will put his images (profile photo, project screenshots, maybe others, and possibly a CV or LinkedIn PDF) in a folder in the working directory and ask you to place them. When that happens:
1. List the folder and look at every image. Identify what each one is (profile photo, which project, other). If you're unsure what an image shows or where it belongs, ask; never guess and never publish an image whose purpose is unclear.
2. Never modify or delete the originals. Work on copies.
3. Process the copies with `sharp` (dev dependency or a one-off script): fix orientation, resize to at most 2400 px on the long side (profile photo: square crop centered on the face, 1200 × 1200, only if the framing allows it; otherwise ask), and **strip all metadata (EXIF/GPS)** so no location or device data is published.
4. Rename to lowercase kebab-case and place them: `public/images/profile.jpg`; `public/projects/<slug>/cover.<ext>` plus `01.<ext>`, `02.<ext>`… for galleries.
5. Register each image in the content files with real dimensions and a descriptive Spanish `alt` text, then replace the matching placeholders and `TODO(jeferson)` markers.
6. Report which file went where, and list any image you didn't use and why.

### 9.5 Rendering and performance strategy

- Server components by default; client components only for interactive islands.
- The 3D chunk, GSAP scenes and the command palette are lazy-loaded; nothing heavy blocks the hero's LCP (the photo and H1).
- Images via `next/image` (AVIF/WebP, correct `sizes`), SVG illustrations inline and optimized.
- Budgets (mid-range phone, 4G): LCP < 2.5 s, CLS < 0.05, INP < 200 ms; initial JS for `/` as small as possible (target ≤ ~180 KB gzipped, excluding the lazy 3D chunk). Lighthouse mobile: Performance ≥ 90; Accessibility, Best Practices, SEO ≥ 95.

---

## 10. Contact form specification (R10)

Validation runs on the client (live, per field, after first blur) **and** on the server with the **same** regexes imported from `lib/validation/patterns.ts`. Trim inputs before testing.

```ts
// Name: 2–60 chars, letters (any language, accents, ñ), spaces, apostrophes, periods, hyphens.
// Must start with a letter, end with a letter or period, no double spaces.
export const NAME = /^(?=.{2,60}$)(?!.*\s{2})[\p{L}\p{M}][\p{L}\p{M} '.-]*[\p{L}\p{M}.]$/u;

// Email: pragmatic RFC-style check. ≤ 254 chars, local part ≤ 64, no leading/trailing/double dots,
// valid domain labels, TLD of 2–24 letters.
export const EMAIL =
  /^(?=.{6,254}$)(?!\.)(?!.*\.\.)[A-Za-z0-9._%+-]{1,64}(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

// Reason: must be one of the select values.
export const REASON = /^(oportunidad-laboral|proyecto|colaboracion|otro)$/;

// Message: 20–2000 chars, at least two words, not just whitespace or symbols.
export const MESSAGE_LENGTH = /^[\s\S]{20,2000}$/;
export const MESSAGE_HAS_WORDS = /\p{L}{2,}[\s\S]*\s[\s\S]*\p{L}{2,}/u;
export const LINK = /(https?:\/\/|www\.)/gi; // count with message.match(LINK); reject if > 2 (spam). Never use .test() with this global regex.

// Honeypot: must stay empty.
export const EMPTY = /^$/;
```

Spanish error messages, e.g.: "Escribe tu nombre (solo letras, 2 a 60 caracteres).", "Ese correo no parece válido. Revisa el formato: nombre@dominio.com", "Cuéntame un poco más: mínimo 20 caracteres."

**Server action (`app/actions/contact.ts`):**
1. Parse `FormData` with the zod schema (which uses the regexes above).
2. Honeypot filled → pretend success, send nothing.
3. Time trap: reject submissions sent < 3 s after the form rendered (timestamp in a hidden field).
4. Rate limit by IP (e.g., 3 per 10 minutes). In-memory limiter by default; use Upstash Redis automatically if its env vars exist.
5. Send with Resend to `CONTACT_TO_EMAIL`, `reply_to` = sender, from `CONTACT_FROM_EMAIL` (use Resend's onboarding sender until a domain is verified). Escape all user content in the email body.
6. If `RESEND_API_KEY` is missing: in development log the payload; in production show a friendly fallback with a `mailto:` link.
7. Return typed state for `useActionState`; the UI announces the result through the live region.

**Tests (Vitest):** table-driven tests for every regex with valid and invalid cases — accented names ("José Ñañez", "María-José O'Neil"), emails with subdomains (`nombre@ucc.edu.co`), consecutive dots, leading dots, missing TLD, too-short messages, link spam, filled honeypot.

Environment variables (document them in `.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, optional `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.

---

## 11. SEO, accessibility and quality

- **SEO:** Metadata API (title, description, canonical, `lang="es-CO"`), Open Graph image generated with `next/og` in the light-novel cover style (name, role, welcome line, Pasto), `sitemap.ts`, `robots.ts`, JSON-LD `Person` (name, alumniOf UCC, address Pasto/Nariño/Colombia, `sameAs` GitHub/LinkedIn).
- **Accessibility:** semantic landmarks, one H1, logical heading order, skip link, visible focus styles that match the design, full keyboard support (menu, search, shelf, letters, carousel), alt text on all meaningful images, decorative SVG/3D `aria-hidden`, AA contrast in both themes, touch targets ≥ 44 px, no information conveyed by color alone.
- **Progressive enhancement:** the whole site is readable and navigable with JavaScript disabled (except the form, which degrades to the mailto fallback).

---

## 12. Workflow

**Phase 0 — Setup and questions**
- **First of all:** read §2.1 and confirm with Jeferson the final section list (8 required + extras Presentación, Habilidades, Adicional). Optionally capture the guide's slides as described there.
- If the **Impeccable** design skill is available (Jeferson may install it with `npx skills add pbakaus/impeccable`), use it: run its setup/teach command to record this brief's design context, and use its critique, audit and polish commands in Phase 5 (check the installed version's command names). If it isn't installed, apply the same principles manually (or Anthropic's frontend-design skill if present). If the official GSAP skills are available (`npx skills add https://github.com/greensock/gsap-skills`), follow them for GSAP code.
- Ask Jeferson **one batch** of questions: photo, CV PDF (or permission to generate it from the site's content), which email to publish, a GitHub repo and demo link for each project, a personal presentation paragraph (or the facts to draft it), his LinkedIn experience and education (pasted, or the profile PDF), hobbies for "Acerca de mí", favorite anime list, work experience, project dates/status/media, real testimonials (or who he'll ask), spoken languages, courses/certifications, events, preferred welcome line, and the Vercel subdomain he wants (e.g., `jeferson-morillo.vercel.app`). Continue with placeholders for anything he answers "later".

**Phase 1 — Foundation:** scaffold, `CLAUDE.md`, design tokens in `globals.css` (`@theme`, both themes), fonts, content schemas + content files, layout shell (header, mobile menu, footer), theme toggle.

**Phase 2 — Hero:** Bienvenida with photo, status tag, CTAs, static magic circle, then the lazy R3F scene with all fallbacks.
**Checkpoint A:** take screenshots (Playwright) at 375, 768 and 1440 px in both themes, show them to Jeferson, and wait for his OK on the visual direction before continuing.

**Phase 3 — Sections:** build them one by one, **in the guide's order**, one component each in `components/`, each one responsive (phone → tablet → desktop with `md:` / `lg:`) before moving on. Order: Presentación → Acerca de mí → Habilidades → Proyectos (+ case-study pages and view transitions) → Testimonios → Experiencia → Adicional → Contacto → Pie de página.

**Phase 4 — Signature systems:** side sigil rail, command palette, Lenis + ScrollTrigger integration, 404, contact backend and tests.

**Phase 5 — Polish and verification:**
- `tsc --noEmit`, lint, `vitest`, `next build` — all clean.
- Playwright smoke tests: page renders, Índice and palette navigate, form shows regex errors and success state, reduced-motion run shows full content, 404 works.
- Screenshots at 375 / 768 / 1440 px in both themes and with reduced motion; review them yourself and fix anything off before reporting.
- Lighthouse (mobile) on the production build; fix until the budgets in §9.5 are met.
- Impeccable critique → audit → polish pass (or the manual equivalent).
- Walk through the §2 table, **every item of the guide's final checklist** (§2.1) and the definition of done below; write the result to `docs/checklist-entrega.md` (each item: ✅ + where it is satisfied, or ❌ + what's missing).

**Phase 6 — Ready for GitHub and Vercel (Jeferson does the git and deploy steps):**
- Make sure `.gitignore` excludes `.env*` (except `.env.example`), `node_modules`, `.next`, test reports and screenshots that shouldn't be published.
- Write `README.md` in Spanish: what the project is, stack, how to run it, content files to edit, and step-by-step publishing: create a GitHub repo, `git init` / commit / push (commands written out for **him** to run), import the repo in Vercel, add the environment variables from `.env.example`, deploy, and set the subdomain.
- Confirm `next build` passes with no environment variables set (the contact form must fall back gracefully), so the first Vercel deploy can't fail.
- You may run `npx vercel build` locally to validate the Vercel build if the CLI is available, but never deploy, link projects or push anything yourself.

Remember: no git writes at any point. Jeferson commits, pushes and deploys.

---

## 13. Definition of done

- [ ] Every row of the §2 requirements table is satisfied and checked, including every guide checklist item (§2.1) and R14–R16.
- [ ] The 8 required sections use the guide's names and the map's order; one component per section in `components/`; `app/page.tsx` only composes them.
- [ ] Responsive verified at phone, tablet and desktop sizes.
- [ ] `docs/checklist-entrega.md` shows every guide checklist item as ✅.
- [ ] Menú de navegación shows the logo/monogram and his name, with links to every section.
- [ ] Hero: photo, ≤ 25-word technical welcome, "Actualmente estudiando" tag, «Descargar CV» button that downloads a real PDF.
- [ ] Every project shows a GitHub repository link and a demo link (or a flagged `TODO(jeferson)`); the portfolio itself is listed with its Vercel URL.
- [ ] Contact shows the email address in full; footer shows "© year Jeferson Morillo".
- [ ] At least one extra section beyond the required ones.
- [ ] Acerca de mí opens with a personal presentation paragraph; life outside software only.
- [ ] Skills: frameworks/tools only, zero bars/percentages/levels, each linked to the projects where it was used.
- [ ] Experience sorted newest → oldest by code, with visible academic (universidad, cursos) and work (empleos, prácticas, freelance — real only) groups, plus projects.
- [ ] Testimonials: data model enforced; production shows only consented, verified entries, at least the required minimum; nothing invented.
- [ ] Contact: shared regex validation client + server, honeypot, time trap, rate limit, tests passing, Spanish errors, accessible states.
- [ ] Social links: tech only, no WhatsApp.
- [ ] Presentación, the hero origin chip, the theme names and the barniz palette express pride in Nariño respectfully and accurately.
- [ ] No copyrighted anime assets; all visuals original.
- [ ] Reduced-motion and no-JS experiences complete; AA contrast in both themes; keyboard paths work.
- [ ] Performance budgets met on the production build.
- [ ] `CLAUDE.md`, `.env.example`, `README.md`, `docs/pedir-testimonios.md` present; `next build` passes with no env vars.
- [ ] No git write commands were run.

---

## 14. Final report to Jeferson (in Spanish)

End with a concise report:
1. What was built (sections, signature features) and screenshots, plus the guide checklist from `docs/checklist-entrega.md`.
2. Every remaining `TODO(jeferson)` with file path and what to put there.
3. How to add a testimonial, a project, an experience entry and the CV.
4. Environment variables and the exact steps for him to push to GitHub and deploy on Vercel (repo, import, env vars, subdomain), so he ends with the two course deliverables: the GitHub repo URL and the public `.vercel.app` URL.
5. Lighthouse scores and test results.
6. The exact files changed, so he can review with `git status` / `git diff` and commit himself.
