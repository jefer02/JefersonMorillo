# Design — Crónica de Atriz

The portfolio is the first volume of a light novel from San Juan de Pasto. Light-novel print grammar (cover, obi, 目次 contents page, chapter openers, folios, ruby annotations, colophon) carries the structure; barniz de Pasto Mopa-Mopa and the Galeras volcano carry the color and imagery. Every themed name sits next to its plain Spanish name.

## Color

Tokens live in `app/globals.css` (`:root`, `[data-theme="dark"]`), exposed to Tailwind through `@theme inline`. Pairs are tuned to WCAG AA on `--paper`.

| Token | Día de Blancos (light) | Día de Negros (dark) | Role |
|---|---|---|---|
| `--paper` | `oklch(0.97 0.012 85)` | `oklch(0.17 0.02 265)` | Page ground |
| `--paper-2` | `oklch(0.935 0.02 80)` | `oklch(0.21 0.025 265)` | Inset pages (letters, side stories, grimoire) |
| `--ink` / `--ink-soft` | `0.2` / `0.42` L | `0.93` / `0.75` L | Text / secondary text |
| `--vermilion` | `oklch(0.53 0.19 30)` | `oklch(0.68 0.19 32)` | Accent: ruby, links, save points, focus |
| `--jade` | `oklch(0.48 0.1 165)` | `oklch(0.72 0.11 165)` | "Actualmente estudiando" gem |
| `--gold` / `--gold-ink` | `0.72` / `0.52` L | `0.82` L | Circle linework, sigils |
| `--turquoise`, `--ember` | | | Details, crater glow, embers |
| `--obi` / `--obi-ink` | `oklch(0.49 0.18 29)` / cream | same | The vermilion belt (hero CTAs), fixed in both themes |
| `--wood` / `--wood-ink` | `oklch(0.27 0.045 45)` | `oklch(0.22 0.04 45)` | Barniz insert ground (Origen) |
| `--color-barniz-*` | jade `0.6 0.12 165` · gold `0.76 0.14 80` · vermilion `0.58 0.19 30` · turquoise `0.64 0.1 205` | same | Saturated sheets on wood; `@theme static` so SVG attributes can use them |

Strategy: mostly paper and ink; color arrives at page scale in two places only: the vermilion obi on the cover and the wood insert of Chapter I. Volume covers use fixed per-project fields (they are objects, not themed UI).

## Type

| Role | Face | Notes |
|---|---|---|
| Display, headings, blurbs | Shippori Mincho B1 600/700/800 | Self-hosted Latin + Spanish subset (`app/fonts/`), preloaded |
| Body | Zen Kaku Gothic New 400/500/700 | Self-hosted subset, not preloaded (swap) |
| Folios, labels, metadata | JetBrains Mono | `next/font/google`, not preloaded |
| Afterword, signature | Klee One 600 | Self-hosted subset |
| Decorative CJK (第…章, 目次, あとがき, 奥付) | Shippori Mincho subset, 12 KB | `--font-cjk`, always `aria-hidden` |

Scale: `--text-display` `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)`, `--text-chapter` `clamp(2.25rem, 1.5rem + 3.4vw, 4.25rem)`, `--text-lede`, `--text-folio` 11px mono with 0.2em tracking. Headings track −0.02 to −0.03em.

Ruby: `<ruby>Plain<rp> (</rp><rt>Themed</rt><rp>)</rp></ruby>`. `rt` is mono, uppercase, 0.14em tracking, vermilion (gold on wood). In headings the ruby stacks with flexbox so long names wrap on phones.

## Components (`components/fx`)

- **MagicCircle**: two SVG ring systems (rune band + 12-tick clock + heptagon of nodes), each rune ring baked into one path (`lib/runes.ts`, `lib/svg-path.ts`), rotated by HTML wrappers (90 s / 140 s, compositor only).
- **Sigil**: deterministic rune circle from a name (`lib/rng.ts`); `drawable` adds `pathLength=1` for the hover draw (`.spell`).
- **ChapterOpener**: "Capítulo N — folio —", ruby heading, vertical kanji numeral.
- **VolumeCover**: 3:4 generated cover: volume number, sigil, vertical title band, platforms, obi with status.
- **MopaMopaBand**: four layered geometric sheets revealed one by one; chapter divider on wood.
- **Indice** (native `<dialog>`), **CommandPalette** (cmdk, lazy), **SavePointRail** (rewind / page-turn overlays), **WaxSealLetter**, **Chronicle**, **Grimoire**, **Shelf**, **ContactForm** (validation circle + talc burst).

Shapes: 3px radius on buttons and inputs, pills for tags and status. Depth uses one soft offset shadow (`0 22–30px 40–60px −26..−40px`) on inset pages; no borders plus shadows together.

## Motion

- Easing: `--ease-book` `cubic-bezier(0.22, 1, 0.36, 1)`; scrubbed scenes `--ease-scrub`.
- Signature: the save-point rail: jumping up rewinds (desaturate + counter-clockwise clock, 420 ms), jumping down turns a page (460 ms).
- Reveals: `Reveal` arms only elements still below the fold after hydration; content is visible in server HTML.
- Hero: WebGL circle shader + ember particles (≥ 768 px, capable devices, after load + idle); SVG circle otherwise.
- Off-screen scenes pause CSS animations (`[data-paused]`); chapters use `content-visibility: auto`.
- `prefers-reduced-motion`: no Lenis, no WebGL, no reveals, no rail transitions, letters open, static circles.

## Layout

Max width 1440 px, gutters 16 / 24 / 40 px, 12-column grid from `md`. Chapters: 80–112 px vertical padding, chapter opener then content. Mobile-first; verified at 375 / 768 / 1440 px.
