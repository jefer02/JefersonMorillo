# Portfolio of Jeferson Morillo

@AGENTS.md

Full brief: `docs/brief.md` (single source of truth, with the course guide `docs/guia-curso.md`; when they conflict, the course guide wins). Product context: `PRODUCT.md`.

## Non-negotiable rules

- **Git is read-only.** Never run `git add`, `commit`, `push`, `branch`, `checkout -b`, `switch -c`, `stash`, `reset`, `init` or any other git write. Allowed: `git status`, `git diff`, `git log`. Jeferson commits, pushes and deploys. Never deploy or link Vercel projects.
- **Never invent facts.** No fake testimonials, jobs, dates, metrics, certificates, links or quotes. Missing data → `todo("…")` from `lib/todo.ts` (renders `TODO(jeferson): …` in dev, hidden in production) and list it in the report.
- **Testimonials** render only when `consent && verified`, minimum 3. Never write testimonial text.
- **IP:** isekai/light-novel genre only. No characters, names, logos, art, music or quotes from Mushoku Tensei, Re:Zero or any other work. Anime titles as plain text only.
- **Skills:** frameworks, libraries and tools only — never programming languages. No bars, percentages, levels or ratings anywhere.
- **Social links:** tech only (GitHub, LinkedIn). No phone, no WhatsApp.
- **Excluded:** the cattle-collar (collares bovinos) academic project must not appear anywhere.
- **Team projects** (AloMedia, LAAF) credit the team and the original `Juan17la` repositories.
- **Copy** in Spanish (es-CO) and English, warm and concrete, no clichés. Spanish is the source and the default; every visible text exists in both languages. Testimonials are never translated. Code, comments and docs in English.
- **Professional copy:** all visible text reads like a professional portfolio. Section headings and menu labels are plain Spanish names (Presentación, Acerca de mí, Habilidades…); buttons use plain verbs. No chapter numbers, kanji marks, themed subtitles or ruby annotations, no "Crónica de Atriz", "Vol. 1" or other story branding. The light-novel touch lives only in the visuals (magic circle, red band, serif type, sigils, bookshelf, the Experiencia clock); the 404 page may keep a small playful line.
- **Cultural respect:** Carnaval references are abstract (talc, ink, serpentines). Never painted faces.

## Stack and structure

- Next.js 16 App Router (Cache Components on — never read `new Date()` in server components; use `NEXT_PUBLIC_BUILD_DATE`), TypeScript strict, Tailwind CSS v4 (`@theme` tokens in `app/globals.css`), Vercel.
- One component per section directly in `components/` (`Navbar`, `Hero`, `Presentacion`, `AcercaDeMi`, `Habilidades`, `Proyectos`, `Testimonios`, `Experiencia`, `Adicional`, `Contacto`, `Footer`). `app/[locale]/page.tsx` only composes them in the guide's order; each section takes a `locale` prop.
- **i18n:** every page lives under `app/[locale]` (`/es`, `/en`; the root layout is `app/[locale]/layout.tsx`). `proxy.ts` sends paths without a locale to the visitor's saved language or Spanish. UI strings: `lib/i18n/messages.ts` (`messages[locale]` on the server, `useMessages()` in Client Components). Content: Spanish in `content/*.ts`, English texts in `content/en.ts` keyed by slug/id, merged by `getContent(locale)` from `content/index.ts`. Links use `href(locale, path)`.
- Project case studies live at `/[locale]/proyectos/[slug]` (old `/volumenes/*` links redirect in `next.config.ts`).
- Helpers: `components/fx` (magic circle, sigils, section headings…), `components/ui`, `components/three` (lazy R3F hero scene).
- **Runes** are an original, readable alphabet (`lib/runes.ts`, explained in `docs/runas.md`). Every rune spells real text; never add random runes. After changing the alphabet, run `npx tsx scripts/runes-sheet.ts` to redraw the chart.
- Content lives in typed files in `content/`, types in `types/`, validated by `npm run check:content` (runs before `next build`; fails if a CV PDF or an English translation is missing). `npm run cv` renders both CVs (`/es/cv`, `/en/cv`).
- Contact regexes live in `lib/validation/patterns.ts`, shared by client and server; the regexes are the same in both languages, only the error messages are translated.

## Quality bar

- Content visible in server HTML; every animation has a static equivalent under `prefers-reduced-motion`; readable without JS.
- WCAG AA contrast in both themes ("Día de Blancos" / "Día de Negros"), keyboard paths, touch targets ≥ 44 px.
- Verify responsive at 375 / 768 / 1440 px with `node scripts/screenshots.mjs`.
