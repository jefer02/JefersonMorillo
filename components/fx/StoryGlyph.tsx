import type { SideStory } from "@/types";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Small original line glyphs for the side-story pages (48px grid, same stroke as the icon set). */
export function StoryGlyph({ glyph, className = "" }: { glyph: SideStory["glyph"]; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <g {...stroke}>
        {glyph === "shelf" && (
          <>
            <path d="M6 40 H42" />
            <rect x="9" y="12" width="6" height="28" />
            <rect x="15" y="16" width="7" height="24" />
            <path d="M24 40 L29 14 L35 15 L30 40" />
            <path d="M12 18 V22 M18.5 21 V25" />
          </>
        )}
        {glyph === "note" && (
          <>
            <path d="M18 34 V12 L36 8 V30" />
            <circle cx="14" cy="34" r="4" />
            <circle cx="32" cy="30" r="4" />
            <path d="M18 18 L36 14" />
          </>
        )}
        {glyph === "mountain" && (
          <>
            <path d="M4 40 L18 18 L24 26 L30 16 L44 40 Z" />
            <path d="M14 24 L18 18 L22 23" />
            <circle cx="36" cy="10" r="3" />
          </>
        )}
        {glyph === "lantern" && (
          <>
            <path d="M24 4 V9" />
            <path d="M17 9 H31 L33 14 V32 L31 37 H17 L15 32 V14 Z" />
            <path d="M15 20 H33 M15 26 H33" />
            <path d="M21 37 V42 H27 V37" />
          </>
        )}
        {glyph === "gamepad" && (
          <>
            <path d="M14 16 H34 C40 16 44 22 44 30 C44 36 40 38 36 34 L32 30 H16 L12 34 C8 38 4 36 4 30 C4 22 8 16 14 16 Z" />
            <path d="M14 21 V27 M11 24 H17" />
            <circle cx="33" cy="22" r="1.6" />
            <circle cx="37" cy="26" r="1.6" />
          </>
        )}
        {glyph === "cat" && (
          <>
            <path d="M12 40 C12 28 16 22 24 22 C32 22 36 28 36 40 Z" />
            <path d="M15 24 L13 12 L20 18 M33 24 L35 12 L28 18" />
            <path d="M36 38 C44 36 44 28 40 26" />
            <circle cx="20" cy="29" r="1.2" />
            <circle cx="28" cy="29" r="1.2" />
          </>
        )}
        {glyph === "pasture" && (
          <>
            <path d="M3 30 Q14 22 26 27 T45 26" />
            <path d="M6 40 H42 M10 40 V33 M18 40 V33 M26 40 V33 M34 40 V33 M6 36 H42" />
            <path d="M30 18 H40 V24 H30 Z M28 18 L35 12 L42 18" />
          </>
        )}
        {glyph === "path" && (
          <>
            <path d="M10 42 C14 30 30 32 26 22 S16 12 30 6" />
            <circle cx="30" cy="6" r="2" />
          </>
        )}
      </g>
    </svg>
  );
}
