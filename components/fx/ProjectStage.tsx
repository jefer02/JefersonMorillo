import Image from "next/image";
import type { ReactNode } from "react";
import type { Accent, ImageAsset, Project, ProjectFrame } from "@/types";
import { Sigil } from "./Sigil";

// A dark, neutral stage in both themes, like a book cover: the screenshot is the protagonist
// and the project keeps only a soft glow of its color rising from the bottom.
const GLOW: Record<Accent, string> = {
  vermilion: "oklch(0.6 0.2 30)",
  jade: "oklch(0.64 0.13 165)",
  gold: "oklch(0.76 0.14 80)",
  turquoise: "oklch(0.64 0.11 210)",
  ember: "oklch(0.66 0.17 45)",
  wood: "oklch(0.6 0.1 55)",
};

const groundOf = (accent: Accent) => ({
  background: [
    `radial-gradient(85% 65% at 50% 108%, color-mix(in oklch, ${GLOW[accent]} 34%, transparent), transparent 72%)`,
    "radial-gradient(70% 45% at 50% -8%, oklch(1 0 0 / 0.06), transparent 70%)",
    "linear-gradient(oklch(0.23 0.012 60), oklch(0.17 0.01 60))",
  ].join(", "),
});

const BEZEL = "bg-[oklch(0.13_0.01_260)]";
const SHADOW = "shadow-[0_14px_30px_-14px_oklch(0_0_0/0.6)]";

export type StageSize = "card" | "hero";

export const STAGE_SIZES: Record<StageSize, string> = {
  card: "(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw",
  hero: "(min-width: 1440px) 52rem, (min-width: 768px) 58vw, 94vw",
};

/** Padding of the colored margin: thin, so the screenshot is the protagonist. */
export const STAGE_PAD: Record<StageSize, string> = { card: "p-3 sm:p-4", hero: "p-4 sm:p-5 lg:p-6" };

/** The dark stage with a thin gilded frame line and the small rune signature; the framed screenshot goes inside. */
export function Stage({ project, size, children }: { project: Project; size: StageSize; children: ReactNode }) {
  return (
    <div
      className="relative isolate aspect-[16/10] w-full overflow-hidden rounded-[3px] shadow-[0_24px_40px_-24px_oklch(0.15_0.02_50/0.55)]"
      style={groundOf(project.accent)}
    >
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute inset-[5px] z-10 rounded-[2px] border border-[oklch(0.86_0.07_82/0.16)]" />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-2 right-2 z-10 text-[oklch(0.86_0.07_82)] ${size === "hero" ? "sm:top-3 sm:right-3" : ""}`}
      >
        <Sigil name={project.title} className="size-5 opacity-55 sm:size-6" />
      </span>
    </div>
  );
}

type FramedProps = { img: ImageAsset; frame: ProjectFrame; size: StageSize; priority?: boolean };

/**
 * One screenshot inside a frame that matches its platform: a round watch, a phone, a
 * desktop or browser window, a handheld or a plain game screen. Fills the padded stage.
 */
export function Framed({ img, frame, size, priority = false }: FramedProps) {
  const sizes = STAGE_SIZES[size];
  const shot = (className: string) => (
    <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className={className} />
  );
  // Very wide or tall shots (e.g. the teleprompter strip) are shown whole, not cropped.
  const ratio = img.width / img.height;
  const fit = ratio > 2.2 || ratio < 1.2 ? "object-contain" : "object-cover object-top";

  switch (frame) {
    case "watch":
      return (
        <div className="relative aspect-square h-full">
          {/* Strap, cut by the stage edges */}
          <span aria-hidden="true" className={`absolute -inset-y-[30%] left-1/2 -z-10 w-[56%] -translate-x-1/2 rounded-[18%] ${BEZEL} opacity-85`} />
          <span aria-hidden="true" className={`absolute top-[40%] -right-[3%] h-[16%] w-[4.5%] rounded-[30%] ${BEZEL}`} />
          <div className={`relative size-full rounded-full ${BEZEL} p-[3.5%] ${SHADOW}`}>
            <div className="relative size-full overflow-hidden rounded-full [clip-path:circle(50%)]">
              {shot("object-cover")}
            </div>
          </div>
        </div>
      );
    case "phone":
      return (
        <div className={`relative h-full rounded-[1.1rem] ${BEZEL} p-[1.8%] ${SHADOW}`} style={{ aspectRatio: `${img.width} / ${img.height}` }}>
          <div className="relative size-full overflow-hidden rounded-[0.8rem]">{shot("object-cover")}</div>
        </div>
      );
    case "handheld":
      return (
        <div className={`relative size-full rounded-[clamp(0.8rem,2.4vw,1.4rem)] ${BEZEL} p-[1.6%] ${SHADOW}`}>
          <div className="relative size-full overflow-hidden rounded-[clamp(0.35rem,1vw,0.6rem)] bg-black">{shot(fit)}</div>
        </div>
      );
    case "screen":
      return (
        <div className={`relative size-full overflow-hidden rounded-[3px] bg-black ${SHADOW}`}>
          {shot(fit)}
          <span aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_60px_oklch(0_0_0/0.4)]" />
        </div>
      );
    default:
      return (
        <div className={`flex size-full flex-col overflow-hidden rounded-[6px] ${BEZEL} ${SHADOW}`}>
          <div aria-hidden="true" className="flex h-[clamp(0.9rem,2.2vw,1.5rem)] shrink-0 items-center gap-[0.35em] px-[0.7em] text-[clamp(0.45rem,1vw,0.7rem)]">
            <span className="size-[0.75em] rounded-full bg-white/25" />
            <span className="size-[0.75em] rounded-full bg-white/25" />
            <span className="size-[0.75em] rounded-full bg-white/25" />
            {frame === "browser" && <span className="mx-auto h-[1.1em] w-[38%] rounded-full bg-white/10" />}
          </div>
          <div className="relative min-h-0 flex-1 bg-black">{shot(fit)}</div>
        </div>
      );
  }
}

export const frameOf = (project: Project, img: ImageAsset): ProjectFrame => img.frame ?? project.frame ?? "window";

type Props = { project: Project; size?: StageSize; priority?: boolean; preview?: ReactNode };

/**
 * The project's main screenshot on its stage. Without one, the stage shows the rune sigil.
 * `preview` lays something over the screenshot, e.g. the card's hover video.
 */
export function ProjectStage({ project, size = "card", priority = false, preview }: Props) {
  const img = project.cover;
  return (
    <Stage project={project} size={size}>
      {preview}
      {img ? (
        <div className={`flex size-full items-center justify-center ${STAGE_PAD[size]}`}>
          <Framed img={img} frame={frameOf(project, img)} size={size} priority={priority} />
        </div>
      ) : (
        <div className="flex size-full items-center justify-center">
          <Sigil name={project.title} className="aspect-square h-[70%] opacity-30" />
        </div>
      )}
    </Stage>
  );
}
