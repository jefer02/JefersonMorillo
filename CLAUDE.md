# Crónica de Atriz — portfolio of Jeferson Morillo

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
- **Copy** in Spanish (es-CO), warm and concrete, no clichés. Code, comments and docs in English.
- **Clarity over flavor:** every themed name is paired with its plain name (`<ruby>Plain<rt>Themed</rt></ruby>`); buttons use plain verbs.
- **Cultural respect:** Carnaval references are abstract (talc, ink, serpentines). Never painted faces.

## Stack and structure

- Next.js 16 App Router (Cache Components on — never read `new Date()` in server components; use `NEXT_PUBLIC_BUILD_DATE`), TypeScript strict, Tailwind CSS v4 (`@theme` tokens in `app/globals.css`), Vercel.
- One component per section directly in `components/` (`Navbar`, `Hero`, `Origen`, `AcercaDeMi`, `Habilidades`, `Proyectos`, `Testimonios`, `Experiencia`, `Adicional`, `Contacto`, `Footer`). `app/page.tsx` only composes them in the guide's order.
- Helpers: `components/fx` (magic circle, sigils, chapter openers…), `components/ui`, `components/three` (lazy R3F hero scene).
- Content lives in typed files in `content/`, types in `types/`, validated by `npm run check:content` (runs before `next build`; fails if the CV PDF is missing).
- Contact regexes live in `lib/validation/patterns.ts`, shared by client and server.

## Quality bar

- Content visible in server HTML; every animation has a static equivalent under `prefers-reduced-motion`; readable without JS.
- WCAG AA contrast in both themes ("Día de Blancos" / "Día de Negros"), keyboard paths, touch targets ≥ 44 px.
- Verify responsive at 375 / 768 / 1440 px with `node scripts/screenshots.mjs`.
