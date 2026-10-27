# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Required by the course (Diseño de Interfaces, "Entrega Proyecto"): Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, deployed on Vercel from the GitHub repo `jefer02/JefersonMorillo`. One component per section in `components/`; `app/page.tsx` composes them in the guide's order. Full brief: `docs/brief.md`; course guide extract: `docs/guia-curso.md`.

## Users

- Recruiters and tech leads skimming for a junior/student developer: they need who he is, what he builds and how to contact him within 5 seconds, on a phone as often as a desktop.
- The course instructor grading against the guide's checklist (8 required sections + at least one extra, CV button, ≥ 3 testimonials, GitHub + demo links, responsive, deployed).
- Peers and collaborators from the dev community who arrive from GitHub or LinkedIn.

## Product Purpose

Personal portfolio of Jeferson Manuel Morillo Vallejo ("Jeferson Morillo"), Ingeniería de Software student at Universidad Cooperativa de Colombia (UCC), campus Pasto. It presents his real projects (Wear OS, Android, Flutter desktop, Godot, full-stack web), his path, and a way to contact him. Success: a visitor understands his profile instantly, opens at least one project, downloads the CV or writes to him; the instructor can tick every checklist item.

## Positioning

"Crónica de Atriz — Vol. 1": the portfolio is told as the first volume of a light novel whose protagonist is a developer from San Juan de Pasto, Nariño (Valle de Atriz, at the foot of the Galeras volcano). Light-novel conventions map 1:1 to sections (cover → hero, 目次 → menu, side stories → about, afterword → extra, colophon → footer). Pride of origin is factual and specific: Galeras/Urcunina, Carnaval de Negros y Blancos (UNESCO 2009), Barniz de Pasto Mopa-Mopa (UNESCO 2020).

## Operating Context

Visitors arrive from LinkedIn, GitHub, the course platform or a shared link, mostly on mid-range phones. The page must be readable without JavaScript and with reduced motion. Contact goes through a regex-validated form (Resend) plus a visible email address.

## Capabilities and Constraints

- Real facts only. Missing data is a typed `TODO(jeferson)` placeholder, never invented.
- Skills list frameworks, libraries and tools only — never programming languages; no bars, percentages, levels or ratings anywhere.
- Social links: tech only (GitHub, LinkedIn). No phone, no WhatsApp.
- Testimonials render in production only when `consent && verified` and at least 3 qualify; none exist yet.
- Team projects (AloMedia, LAAF) credit the team and the original repos owned by `Juan17la`.
- The cattle-collar academic project is excluded entirely at his request.
- Git is read-only for the agent; Jeferson commits, pushes and deploys.
- Copy in Spanish (es-CO); code and docs in English.
- No copyrighted anime material (characters, art, logos, quotes); anime titles as plain text only.

## Brand Commitments

- Name: "Crónica de Atriz — Vol. 1". Long title: «Renací en el Valle de Atriz y ahora mis hechizos corren en relojes, consolas y escritorios» (cover/loader/OG only).
- Welcome line (chosen): «Construyo software que se usa con la muñeca, con un control en la mano o frente a un público: Wear OS, Android, Flutter y web.»
- Themes named "Día de Blancos" (light) / "Día de Negros" (dark) after the Carnaval days. Cultural respect: abstract talc, ink and serpentines only; never painted faces.
- Every themed name pairs with its plain Spanish name; buttons use plain verbs.
- Voice: natural, warm, confident; no clichés ("apasionado por la tecnología").

## Evidence on Hand

- Projects with public repos: Voxara, Sotto (release v1.0.0), Elyndra (release v1.1.0, website elyndra-website.jefer02.workers.dev), LAAF (Juan17la/laaf_game, 149/158 commits by Jeferson), AloMedia (team; demo alo-media.vercel.app), this portfolio.
- Certificates (in `_material/`, not published): "Introducción a la Ciberseguridad" — Cisco Networking Academy, 09/04/2025; "Dispositivos de Red y Configuración Inicial" — UNAD vía Cisco Networking Academy, 09/04/2025.
- Absent, must not be fabricated: profile photo, work experience, testimonials, hobbies, English level, UCC start year/semester, project media, demo videos for Voxara and LAAF, his AloMedia role, Sotto test count.

## Product Principles

1. Clarity first: the plain answer is always visible; the lore is a second reading.
2. Proof over claims: every skill links to the project where it was used.
3. Honest by construction: placeholders are loud, ordering and filtering are enforced in code.
4. Respectful pride: Pasto and Nariño are presented accurately and with care.
5. Calm under constraint: every animated idea has a complete static equivalent.

## Accessibility & Inclusion

WCAG 2.2 AA contrast in both themes, full keyboard paths (menu, command palette, shelf, letters, carousel), visible focus, touch targets ≥ 44 px, `prefers-reduced-motion` honored everywhere, readable without JavaScript.
