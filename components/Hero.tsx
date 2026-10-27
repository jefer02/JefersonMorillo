import Image from "next/image";
import { profile, statusTag } from "@/content/profile";
import { MagicCircle } from "@/components/fx/MagicCircle";
import { Monogram } from "@/components/fx/Monogram";
import { HeroAtmosphere } from "@/components/three/HeroAtmosphere";
import { ButtonLink } from "@/components/ui/Button";
import { Text } from "@/components/ui/Todo";
import { IconArrowRight, IconDownload, IconMail } from "@/components/ui/Icons";

/**
 * Galeras on the horizon, cut like barniz de Pasto: translucent sheets of jade, gold and
 * muted vermilion laid one over another. Read left to right as the sleeping lion:
 * a raised head, the dip of the neck, the long back and the crater at the summit.
 */
function Galeras({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="galeras-glow">
          <stop offset="0" stopColor="var(--ember)" stopOpacity="0.75" />
          <stop offset="0.35" stopColor="var(--ember)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--ember)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(200 0)">
        {/* Far range: jade sheet */}
        <path
          d="M-200 220 L-200 146 L0 150 L120 138 L250 146 L380 120 L470 92 L510 80 L548 84 L590 104 L628 100 L690 70 L728 54 L746 50 L756 58 L768 50 L792 54 L840 72 L910 96 L1010 118 L1130 124 L1240 140 L1350 134 L1440 142 L1640 150 L1640 220 Z"
          fill="color-mix(in oklch, var(--jade) 34%, var(--paper))"
        />
        {/* Gold inlay along the ridge */}
        <path
          d="M380 120 L470 92 L510 80 L548 84 L590 104 L628 100 L690 70 L728 54 L746 50 M768 50 L792 54 L840 72 L910 96 L1010 118"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.9"
        />
        {/* Foothills: gold sheet */}
        <path
          d="M-200 220 L-200 174 L0 178 L160 166 L300 172 L430 150 L540 134 L640 130 L740 112 L820 116 L920 134 L1060 150 L1200 158 L1330 170 L1440 166 L1640 176 L1640 220 Z"
          fill="color-mix(in oklch, var(--gold) 44%, var(--paper))"
        />
        {/* Valley of Atriz: muted vermilion sheet meeting the obi */}
        <path
          d="M-200 220 L-200 198 L0 200 L200 190 L380 194 L560 178 L720 170 L880 176 L1040 186 L1220 182 L1440 192 L1640 196 L1640 220 Z"
          fill="color-mix(in oklch, var(--vermilion) 64%, var(--paper))"
        />
        {/* The crater breathes */}
        <g className="origin-center [transform-box:fill-box] motion-safe:animate-[crater_5s_ease-in-out_infinite]">
          <circle cx="757" cy="50" r="46" fill="url(#galeras-glow)" />
        </g>
        <circle cx="757" cy="52" r="3.5" className="fill-ember" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      <HeroAtmosphere fallback={<MagicCircle className="text-ink/[0.07] dark:text-gold/[0.12] size-full" seed="atmosfera" />} />

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-[minmax(0,1fr)_auto] content-start gap-x-4 gap-y-5 px-4 pt-6 pb-6 sm:px-6 md:grid-cols-12 md:content-center md:gap-x-6 md:gap-y-7 md:pt-12 md:pb-10 lg:px-10">
        <div className="self-center md:col-span-7 md:self-end lg:col-span-6">
          <p className="text-folio text-ink-soft font-mono tracking-[0.22em] uppercase">
            <span className="max-sm:hidden">{profile.volume} · </span>
            {profile.birthplace} → Pasto
          </p>
          <h1 id="inicio-titulo" className="font-display text-display mt-3 leading-[0.98] font-extrabold tracking-[-0.03em] md:mt-4">
            <span className="block">Jeferson</span>
            <span className="block md:pl-[0.6em]">Morillo</span>
          </h1>
          <p className="font-display text-ink-soft mt-2 text-[clamp(1.05rem,0.95rem+0.6vw,1.5rem)] leading-snug font-semibold md:mt-5">
            {profile.role}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 self-center md:col-span-5 md:col-start-8 md:row-span-2 lg:col-span-6 lg:col-start-7 lg:items-start lg:pl-[6%]">
          <figure data-hero-anchor className="relative aspect-square w-[7.25rem] sm:w-[11rem] md:w-[min(28vw,23rem)]">
            <MagicCircle className="text-gold-ink/80 dark:text-gold/70 absolute -inset-[13%]" seed="portada" />
            <div className="ring-gold absolute inset-[7%] rounded-full ring-1" />
            <div className="bg-paper-2 absolute inset-[10%] overflow-hidden rounded-full">
              {profile.photo ? (
                <Image
                  src={profile.photo.src}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  alt={profile.photo.alt}
                  priority
                  sizes="(min-width: 768px) 24rem, 8rem"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <Monogram className="size-1/2" />
                </div>
              )}
            </div>
          </figure>
        </div>

        <ul className="col-span-2 flex flex-wrap gap-2 self-start md:col-span-7 md:gap-2.5 lg:col-span-6" aria-label="Estado y origen">
          <li className="border-jade/45 bg-jade/8 text-ink inline-flex min-h-9 items-center gap-2.5 rounded-full border py-1.5 pr-3.5 pl-3 text-[0.8rem] font-medium md:text-[0.82rem]">
            <span aria-hidden="true" className="bg-jade motion-safe:animate-gem size-2 shrink-0 rotate-45" />
            {statusTag}
          </li>
          <li className="border-rule text-ink-soft inline-flex min-h-9 items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-3 text-[0.8rem] md:text-[0.82rem]">
            <svg viewBox="0 0 20 12" className="text-vermilion h-3 w-5" aria-hidden="true">
              <path d="M0 12 L7 3 L9 1.5 L11 1.5 L13 3 L20 12 Z" fill="currentColor" />
            </svg>
            De {profile.birthplace}, {profile.region} · Estudiando en Pasto
          </li>
          {!profile.photo && (
            <li className="w-full">
              <Text value={profile.photoTodo} className="text-[0.65rem]" />
            </li>
          )}
        </ul>
      </div>

      <p
        aria-hidden="true"
        className="vertical text-ink-soft absolute top-10 right-3 hidden items-center gap-3 font-mono text-[0.68rem] tracking-[0.32em] uppercase select-none md:flex lg:right-5"
      >
        <span className="font-cjk text-vermilion text-[1.35rem] tracking-[0.2em] normal-case">巻一</span>
        {profile.seriesTitle}
      </p>

      {/* The obi: the paper belt wrapped around a light novel, carrying the blurb and actions. */}
      <div className="relative">
        <Galeras className="text-ink pointer-events-none absolute inset-x-0 bottom-full h-[clamp(4.5rem,14vw,13rem)] w-full" />
        <div className="bg-obi text-obi-ink relative">
          <div className="mx-auto grid max-w-[1440px] gap-4 px-4 pt-6 pb-4 sm:px-6 md:gap-6 md:pt-9 md:pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-10">
            <p className="font-display max-w-[44ch] text-[clamp(1.05rem,0.95rem+0.75vw,1.6rem)] leading-snug font-semibold text-balance">
              {profile.welcome}
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center">
              <ButtonLink href={profile.cvPath} download variant="obi" icon={<IconDownload />} className="max-sm:px-3">
                Descargar CV
              </ButtonLink>
              <ButtonLink href="#proyectos" variant="obi" icon={<IconArrowRight />} className="max-sm:px-3">
                Ver proyectos
              </ButtonLink>
              <ButtonLink href="#contacto" variant="obi-outline" icon={<IconMail />} className="col-span-2 sm:col-span-1">
                Contactar
              </ButtonLink>
            </div>
          </div>
          <a
            href="#origen"
            className="text-obi-ink/85 hover:text-obi-ink mx-auto flex max-w-[1440px] items-center justify-start gap-2 px-4 pb-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase sm:justify-end sm:px-6 lg:px-10"
          >
            Pasa la página
            <svg
              viewBox="0 0 24 24"
              className="size-4 motion-safe:animate-[nudge_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M6.5 13.5 12 19l5.5-5.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
