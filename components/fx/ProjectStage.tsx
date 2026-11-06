import Image from "next/image";
import type { ReactNode } from "react";
import type { Accent, ImageAsset, Project, ProjectFrame } from "@/types";
import { Sigil } from "./Sigil";

// The thin margin around each screenshot keeps the project's color in both themes.
const GROUND: Record<Accent, string> = {
  vermilion: "bg-obi text-obi-ink",
  jade: "bg-[oklch(0.42_0.09_165)] text-obi-ink",
  gold: "bg-[oklch(0.72_0.13_78)] text-[oklch(0.24_0.05_70)]",
  turquoise: "bg-[oklch(0.42_0.08_212)] text-obi-ink",
  ember: "bg-[oklch(0.26_0.03_40)] text-[oklch(0.9_0.05_60)]",
  wood: "bg-wood text-wood-ink",
};

const BEZEL = "bg-[oklch(0.17_0.01_260)]";
const SHADOW = "shadow-[0_14px_30px_-14px_oklch(0_0_0/0.6)]";

export type StageSize = "card" | "hero";

export const STAGE_SIZES: Record<StageSize, string> = {
  card: "(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw",
  hero: "(min-width: 1440px) 52rem, (min-width: 768px) 58vw, 94vw",
};

/** Padding of the colored margin: thin, so the screenshot is the protagonist. */
export const STAGE_PAD: Record<StageSize, string> = { card: "p-3 sm:p-4", hero: "p-4 sm:p-5 lg:p-6" };

/** The colored stage with the small rune signature; the framed screenshot goes inside. */
export function Stage({ project, size, children }: { project: Project; size: StageSize; children: ReactNode }) {
  return (
    <div
      className={`relative isolate aspect-[16/10] w-full overflow-hidden ${GROUND[project.accent]} shadow-[0_24px_40px_-24px_oklch(0.15_0.02_50/0.55)]`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute top-1 right-1 z-10 rounded-full p-1 ${GROUND[project.accent]} ${size === "hero" ? "sm:top-1.5 sm:right-1.5" : ""}`}
      >
        <Sigil name={project.title} className="size-5 opacity-80 sm:size-6" />
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

type Props = { project: Project; size?: StageSize; priority?: boolean };

/** The project's main screenshot on its stage. Without one, the stage shows the rune sigil. */
export function ProjectStage({ project, size = "card", priority = false }: Props) {
  const img = project.cover;
  return (
    <Stage project={project} size={size}>
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
