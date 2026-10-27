import Image from "next/image";
import { profile } from "@/content/profile";
import type { Accent, Project } from "@/types";
import { Sigil } from "./Sigil";

// Covers are physical objects: their colors stay the same in both themes.
const COVER: Record<Accent, { ground: string; ink: string; band: string; bandInk: string }> = {
  vermilion: { ground: "bg-obi", ink: "text-obi-ink", band: "bg-obi-ink", bandInk: "text-[oklch(0.3_0.1_29)]" },
  jade: { ground: "bg-[oklch(0.42_0.09_165)]", ink: "text-obi-ink", band: "bg-obi-ink", bandInk: "text-[oklch(0.28_0.06_165)]" },
  gold: {
    ground: "bg-[oklch(0.72_0.13_78)]",
    ink: "text-[oklch(0.24_0.05_70)]",
    band: "bg-[oklch(0.24_0.05_70)]",
    bandInk: "text-[oklch(0.9_0.08_85)]",
  },
  turquoise: { ground: "bg-[oklch(0.42_0.08_212)]", ink: "text-obi-ink", band: "bg-obi-ink", bandInk: "text-[oklch(0.28_0.06_212)]" },
  ember: {
    ground: "bg-[oklch(0.26_0.03_40)]",
    ink: "text-[oklch(0.9_0.05_60)]",
    band: "bg-[oklch(0.62_0.17_42)]",
    bandInk: "text-[oklch(0.16_0.03_40)]",
  },
  wood: { ground: "bg-wood", ink: "text-wood-ink", band: "bg-barniz-gold", bandInk: "text-[oklch(0.24_0.05_70)]" },
};

const STATUS: Record<Project["status"], string> = {
  publicado: "Publicado",
  "en-desarrollo": "En desarrollo",
  academico: "Académico",
};

type Props = { project: Project; size?: "card" | "hero"; priority?: boolean };

/**
 * A light-novel volume cover generated from the project's data: volume number, a sigil
 * drawn from its name, a vertical title band and an obi with its status. If the project
 * has real cover art, the art fills the cover and the band and obi sit on top.
 */
export function VolumeCover({ project, size = "card", priority = false }: Props) {
  const c = COVER[project.accent];
  const vol = `Vol. ${String(project.volume).padStart(2, "0")}`;
  const hero = size === "hero";

  return (
    <div
      className={`relative isolate aspect-[3/4] w-full overflow-hidden ${c.ground} ${c.ink} shadow-[0_24px_40px_-24px_oklch(0.15_0.02_50/0.55)]`}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          priority={priority}
          sizes={hero ? "(min-width: 1024px) 28rem, 80vw" : "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      ) : (
        <Sigil name={project.title} className="absolute top-1/2 left-[42%] -z-10 aspect-square w-[88%] -translate-1/2 opacity-30" />
      )}

      {/* Spine-side shading, like a printed jacket */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-3 bg-[linear-gradient(90deg,oklch(0_0_0/0.22),transparent)]" />

      <div className={`absolute top-0 left-0 p-[7%] ${hero ? "text-[1rem]" : "text-[0.8rem]"}`}>
        <p className="font-mono tracking-[0.18em] uppercase opacity-85">{profile.seriesTitle}</p>
        <p
          className={`font-display mt-1 leading-none font-extrabold tracking-[-0.02em] ${hero ? "text-[4.5rem]" : "text-[clamp(2.6rem,2rem+2vw,3.6rem)]"}`}
        >
          {vol}
        </p>
      </div>

      {/* Vertical title band */}
      <div className={`absolute top-[7%] right-[7%] bottom-[24%] flex w-[22%] items-start justify-center py-4 ${c.band} ${c.bandInk}`}>
        <span
          className={`vertical font-display leading-none font-extrabold tracking-[0.06em] ${hero ? "text-[2.4rem]" : "text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)]"}`}
        >
          {project.title}
        </span>
      </div>

      <p
        className={`absolute bottom-[19%] left-[7%] max-w-[60%] font-mono leading-snug tracking-[0.08em] uppercase opacity-85 ${hero ? "text-[0.8rem]" : "text-[0.66rem]"}`}
      >
        {project.platforms.join(" · ")}
      </p>

      {/* Obi with the status */}
      <div className="bg-paper/95 text-ink absolute inset-x-0 bottom-0 flex h-[15%] items-center justify-between gap-2 px-[7%]">
        <span className={`font-display font-bold ${hero ? "text-[1.15rem]" : "text-[0.95rem]"}`}>{STATUS[project.status]}</span>
        <span className={`text-ink-soft truncate font-mono ${hero ? "text-[0.78rem]" : "text-[0.66rem]"}`}>
          {project.statusNote ?? profile.displayName}
        </span>
      </div>
    </div>
  );
}
