import Image from "next/image";
import { Fragment } from "react";
import { getContent } from "@/content";
import { MagicCircle } from "@/components/fx/MagicCircle";
import { Monogram } from "@/components/fx/Monogram";
import { RuneReading } from "@/components/fx/RuneReading";
import { HeroAtmosphere } from "@/components/three/HeroAtmosphere";
import { ButtonLink } from "@/components/ui/Button";
import { Text } from "@/components/ui/Todo";
import { IconArrowRight, IconDownload, IconMail } from "@/components/ui/Icons";
import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

/**
 * Name, role and portrait in its magic circle over a clean ground (paper or night, with
 * the circle and embers behind), then the red band with the welcome line and the actions.
 */
export default function Hero({ locale }: { locale: Locale }) {
  const { profile, statusTag } = getContent(locale);
  const t = messages[locale].hero;

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate flex flex-col overflow-hidden md:min-h-[calc(100svh-4rem)]"
    >
      <HeroAtmosphere fallback={<MagicCircle className="text-ink/[0.07] dark:text-gold/[0.12] size-full" />} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-[minmax(0,1fr)_auto] content-start gap-x-4 gap-y-5 px-4 pt-6 pb-[clamp(2.5rem,6vw,5rem)] sm:px-6 md:grid-cols-12 md:content-center md:gap-x-6 md:gap-y-7 md:pt-12 lg:px-10">
        <div className="self-center md:col-span-7 md:self-end lg:col-span-6">
          <h1 id="inicio-titulo" className="font-display text-display leading-[0.98] font-extrabold tracking-[-0.03em]">
            <span className="block">Jeferson</span>
            <span className="block md:pl-[0.6em]">Morillo</span>
          </h1>
          <p className="font-display text-ink-soft mt-2 text-[clamp(1.05rem,0.95rem+0.6vw,1.5rem)] leading-snug font-semibold md:mt-5">
            {profile.role}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 self-center md:col-span-5 md:col-start-8 md:row-span-2 lg:col-span-6 lg:col-start-7 lg:items-start lg:pl-[6%]">
          <RuneReading
            label={t.runes}
            lines={[profile.inscription.outer, profile.inscription.inner]}
            gloss={profile.inscriptionGloss}
            className="aspect-square w-[7.25rem] sm:w-[11rem] md:w-[min(28vw,23rem)]"
          >
            {/* MagicCircle sets its own `relative`, so the ring is sized by a positioned wrapper. */}
            <div className="absolute -inset-[13%]">
              <MagicCircle className="text-gold-ink/80 dark:text-gold/70 group-data-[reading=on]/reading:text-vermilion dark:group-data-[reading=on]/reading:text-vermilion size-full transition-colors duration-700" />
            </div>
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
                  draggable={false}
                  // The face sits low in the portrait-oriented shot; anchor the square crop near the bottom.
                  className="size-full object-cover object-[50%_85%]"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <Monogram className="size-1/2" />
                </div>
              )}
            </div>
          </RuneReading>
        </div>

        <div className="col-span-2 self-start md:col-span-7 lg:col-span-6">
          {/* "Actualmente estudiando" (a course requirement): a plain text pill with a quiet live dot. */}
          <p className="border-rule bg-paper/80 text-ink inline-flex min-h-9 items-center gap-2.5 rounded-[1.125rem] border py-1.5 pr-4 pl-3.5 text-[0.8rem] font-medium md:text-[0.84rem]">
            <span aria-hidden="true" className="relative flex size-1.5 shrink-0">
              <span className="bg-jade motion-safe:animate-halo absolute inset-0 rounded-full" />
              <span className="bg-jade relative size-1.5 rounded-full" />
            </span>
            {/* Wraps between segments, never inside one. */}
            <span>
              {statusTag.split(" · ").map((part, i, all) => (
                <Fragment key={part}>
                  {i > 0 && " "}
                  <span className="whitespace-nowrap">
                    {part}
                    {i < all.length - 1 && " ·"}
                  </span>
                </Fragment>
              ))}
            </span>
          </p>
          {!profile.photo && (
            <p className="mt-2">
              <Text value={profile.photoTodo} className="text-[0.65rem]" />
            </p>
          )}
        </div>
      </div>

      {/* The obi: the paper belt wrapped around a light novel, carrying the blurb and actions. */}
      <div className="bg-obi text-obi-ink relative">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-4 pt-6 pb-4 sm:px-6 md:gap-6 md:pt-8 md:pb-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-10">
          <p className="font-display max-w-[44ch] text-[clamp(1.05rem,0.95rem+0.6vw,1.45rem)] leading-snug font-semibold text-balance">
            {profile.welcome}
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center">
            <ButtonLink href={profile.cvPath} download variant="obi" icon={<IconDownload />} className="max-sm:px-3">
              {t.downloadCv}
            </ButtonLink>
            <ButtonLink href="#proyectos" variant="obi" icon={<IconArrowRight />} className="max-sm:px-3">
              {t.viewProjects}
            </ButtonLink>
            <ButtonLink href="#contacto" variant="obi-outline" icon={<IconMail />} className="col-span-2 sm:col-span-1">
              {t.contact}
            </ButtonLink>
          </div>
        </div>
        <a
          href="#presentacion"
          className="text-obi-ink/85 hover:text-obi-ink mx-auto flex min-h-11 max-w-[1440px] items-center justify-start gap-2 px-4 pb-1 font-mono text-[0.72rem] tracking-[0.18em] uppercase sm:justify-end sm:px-6 lg:px-10"
        >
          {t.more}
          <svg
            viewBox="0 0 24 24"
            className="size-4"
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
    </section>
  );
}
