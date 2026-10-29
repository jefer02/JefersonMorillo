# Design — Jeferson Morillo portfolio

A professional developer portfolio with a light-novel touch in the visuals only. The words are plain and professional: section headings are plain Spanish names, with no chapter numbers, kanji marks, themed subtitles, ruby annotations or story branding. The light-novel feel comes from the magic circle around the portrait, the red band (obi) under the hero, serif display type, generated sigils, the bookshelf in Acerca de mí and the clock in Experiencia. Barniz de Pasto Mopa-Mopa and the Galeras volcano carry the color and imagery.

## Color

Tokens live in `app/globals.css` (`:root`, `[data-theme="dark"]`), exposed to Tailwind through `@theme inline`. Pairs are tuned to WCAG AA on `--paper`. Dark is the default theme, also without JavaScript (`:root:not([data-theme])`); the toggle saves the visitor's choice.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `oklch(0.97 0.012 85)` | `oklch(0.17 0.02 265)` | Page ground |
| `--paper-2` | `oklch(0.935 0.02 80)` | `oklch(0.21 0.025 265)` | Inset pages (letters, side stories, grimoire) |
| `--ink` / `--ink-soft` | `0.2` / `0.42` L | `0.93` / `0.75` L | Text / secondary text |
| `--vermilion` | `oklch(0.53 0.19 30)` | `oklch(0.68 0.19 32)` | Accent: heading rule, links, active sigil, focus |
| `--jade` | `oklch(0.48 0.1 165)` | `oklch(0.72 0.11 165)` | "Actualmente estudiando" gem |
| `--gold` / `--gold-ink` | `0.72` / `0.52` L | `0.82` L | Circle linework, sigils |
| `--turquoise`, `--ember` | | | Details, crater glow, embers |
| `--obi` / `--obi-ink` | `oklch(0.49 0.18 29)` / cream | same | The vermilion belt (hero CTAs), fixed in both themes |
| `--wood` / `--wood-ink` | `oklch(0.27 0.045 45)` | `oklch(0.22 0.04 45)` | Wood ground (bookshelf, portfolio cover) |
| `--color-barniz-*` | jade `0.6 0.12 165` · gold `0.76 0.14 80` · vermilion `0.58 0.19 30` · turquoise `0.64 0.1 205` | same | Saturated sheets on wood; `@theme static` so SVG attributes can use them |

Strategy: mostly paper and ink; color arrives at page scale in one place: the vermilion band under the hero. Project covers use fixed per-project fields (they are objects, not themed UI).

## Type

| Role | Face | Notes |
|---|---|---|
| Display, headings, blurbs | Shippori Mincho B1 600/700/800 | Self-hosted Latin + Spanish subset (`app/fonts/`), preloaded |
| Body | Zen Kaku Gothic New 400/500/700 | Self-hosted subset, not preloaded (swap) |
| Labels, metadata | JetBrains Mono | `next/font/google`, not preloaded |
| Adicional notes, signature | Klee One 600 | Self-hosted subset |

Scale: `--text-display` `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)`, `--text-chapter` (section headings) `clamp(2rem, 1.55rem + 2.2vw, 3.25rem)`, `--text-lede`, `--text-folio` 11px mono with 0.2em tracking for small labels. Headings track −0.02 to −0.03em.

No ruby annotations or decorative CJK in the copy.

## Components (`components/fx`)

- **Runes**: one original alphabet (`lib/runes.ts`, documented in `docs/runas.md`): a spine plus a head (row) and a foot (column) per letter, diamond-and-tally digits, an eye for "·". Every rune on the site spells something; never draw random runes.
- **MagicCircle**: two SVG ring systems (rune band + 12-tick clock + heptagon of nodes), each rune ring baked into one path (`lib/runes.ts`, `lib/svg-path.ts`), rotated by HTML wrappers (90 s / 140 s, compositor only). The outer ring spells `JEFERSON MORILLO · EL CONTADERO · NARIÑO · 2024`, the inner one `CONSTRUYO SOFTWARE` (`profile.inscription`); the WebGL circle uses the same outer text.
- **RuneReading**: the hero portrait's easter egg. A 2 s hover or long-press shows a slip decoding the rings (with an English gloss on `/en`) while the rings warm to vermilion; it fades after 5 s. Under reduced motion it is a static tooltip that stays while hovered.
- **Sigil**: a rune seal that spells a name (tool, category, section, title): the name around the band (repeated when short), its first letter in the centre, a polygon with 3 + (runes mod 4) corners; `drawable` adds `pathLength=1` for the hover draw (`.spell`).
- **ChapterOpener**: section heading: a short vermilion rule, the plain Spanish name and an optional lede.
- **VolumeCover**: 3:4 generated project cover: "Proyecto" label and number, sigil, vertical title band, platforms, obi with status.
- **Shelf**: book spines (titles as text only). Opening a book (Motion, real CSS 3D): the spine lifts 24 px and forward with a soft shadow while the others dim; the book flies to the stage below the shelf, turning from spine to front cover (spring, ~450 ms, uniform scale only); the cover swings open on its left hinge (rotateY 0 → −160°, perspective 1200 px, ~600 ms) onto the first page (genre, title, his take). The cover has board thickness, the page block has striped edges. Esc, a click outside or the same spine reverses it; another spine closes the open book first. Only transform and opacity animate. Reduced motion: the page crossfades. Without JS: a plain list.
- **LanguageSwitch**: ES / EN links to the same page in the other language, next to the theme toggle (only the other language below `sm`) and in the mobile menu.
- **SavePointRail**: one sigil per section on the right edge (`xl` and up, hidden over the hero). The current section's sigil is highlighted, visited ones stay gold for the session, hover/focus shows the name, a click jumps to the section.
- **Indice** (mobile "Menú", native `<dialog>`), **CommandPalette** ("Buscar", cmdk, lazy), **WaxSealLetter**, **Chronicle** (Experiencia timeline + clock), **Grimoire** (Habilidades), **ContactForm** (validation circle + talc burst).
- Unused for now: **MopaMopaBand**, **ParallaxShell**.

Shapes: 3px radius on buttons and inputs, pills for tags and status. Depth uses one soft offset shadow (`0 22–30px 40–60px −26..−40px`) on inset pages; no borders plus shadows together.

## Motion

- Easing: `--ease-book` `cubic-bezier(0.22, 1, 0.36, 1)`; scrubbed scenes `--ease-scrub`.
- Signature: the rotating magic circle around the portrait, and the Experiencia clock that turns as the timeline scrolls.
- Reveals: `Reveal` arms only elements still below the fold after hydration; content is visible in server HTML.
- Hero: a clean ground (paper / night) with the WebGL circle shader + ember particles (≥ 768 px, capable devices, after load + idle; SVG circle otherwise), then the red band directly. No landscape layers. The "Actualmente estudiando" pill is plain text with a small jade dot and a soft halo (static under reduced motion).
- Off-screen scenes pause CSS animations (`[data-paused]`); sections use `content-visibility: auto`.
- `prefers-reduced-motion`: no Lenis, no WebGL, no reveals, no rail transitions, letters open, static circles.

## Layout

Max width 1440 px, gutters 16 / 24 / 40 px, 12-column grid from `md`. Sections: 56–80 px vertical padding, heading then content. The sticky header has a solid background (paper / dark) and a bottom rule. Mobile-first; verified at 375 / 768 / 1440 px.
