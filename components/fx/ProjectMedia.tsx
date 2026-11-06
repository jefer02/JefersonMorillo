"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, ViewTransition } from "react";
import { IconArrowRight, IconClose } from "@/components/ui/Icons";
import { useMessages } from "@/lib/i18n/client";
import { setScrollLocked } from "@/lib/scroll";
import type { ImageAsset, Project } from "@/types";
import { Framed, frameOf, ProjectStage, Stage, STAGE_PAD } from "./ProjectStage";

const noop = () => () => {};
/** False on the server and in the first render, true once React runs in the browser. */
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * The case study's header image: the main screenshot on its stage, thumbnails that swap it
 * in place with a short crossfade, and a lightbox for a closer look. Without JavaScript the
 * thumbnails and the main image are plain links to the full image.
 */
export function ProjectMedia({ project }: { project: Project }) {
  const t = useMessages().caseStudy;
  const hydrated = useHydrated();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const images = [project.cover, ...(project.gallery ?? [])].filter((i): i is ImageAsset => !!i);

  if (!images.length) {
    return (
      <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
        <div>
          <ProjectStage project={project} size="hero" priority />
        </div>
      </ViewTransition>
    );
  }

  const active = images[index];
  const overlay = "absolute inset-0 z-[5] cursor-zoom-in outline-offset-[-6px]";

  return (
    <div>
      <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
        <div>
          <Stage project={project} size="hero">
            {images.map((img, i) => (
              <div
                key={img.src}
                aria-hidden={i !== index || undefined}
                inert={i !== index}
                className={`absolute inset-0 flex items-center justify-center ${STAGE_PAD.hero} transition-opacity duration-200 ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Framed img={img} frame={frameOf(project, img)} size="hero" priority={i === 0} />
              </div>
            ))}
            {hydrated ? (
              <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={t.enlarge(active.alt)} className={overlay} />
            ) : (
              <a href={active.src} target="_blank" rel="noopener" aria-label={`${active.alt} (${t.openImage})`} className={overlay} />
            )}
          </Stage>
        </div>
      </ViewTransition>

      {images.length > 1 && (
        <ul aria-label={t.gallery} className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
          {images.map((img, i) => {
            const current = i === index;
            const thumb = `border-rule bg-paper-2 flex aspect-[4/3] w-full items-center justify-center overflow-hidden border p-1 transition-[border-color,box-shadow] duration-200 ${
              current ? "border-vermilion shadow-[0_0_0_1px_var(--color-vermilion)]" : "hover:border-ink-soft"
            }`;
            const picture = (
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes="(min-width: 1440px) 10rem, (min-width: 640px) 11vw, 22vw"
                className={img.round ? "aspect-square h-full w-auto rounded-full [clip-path:circle(50%)]" : "size-full rounded-[2px] object-contain"}
              />
            );
            return (
              <li key={img.src}>
                {hydrated ? (
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t.showImage(i + 1, img.alt)}
                    aria-current={current ? "true" : undefined}
                    className={thumb}
                  >
                    {picture}
                  </button>
                ) : (
                  <a href={img.src} target="_blank" rel="noopener" aria-label={`${img.alt} (${t.openImage})`} className={thumb}>
                    {picture}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {hydrated && <Lightbox title={project.title} images={images} index={index} setIndex={setIndex} open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}

type LightboxProps = {
  title: string;
  images: ImageAsset[];
  index: number;
  setIndex: (update: (i: number) => number) => void;
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen viewer on the same page. Native <dialog> gives focus trapping, Esc to close
 * and focus return; arrows and swipes move between images, a click outside closes it.
 */
function Lightbox({ title, images, index, setIndex, open, onClose }: LightboxProps) {
  const t = useMessages().caseStudy;
  const close = useMessages().nav.close;
  const ref = useRef<HTMLDialogElement>(null);
  const swipeFrom = useRef<number | null>(null);
  const img = images[index];
  const many = images.length > 1;
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setScrollLocked(true);
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const closeOnEmpty = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      aria-label={`${title}: ${t.gallery}`}
      onClose={() => {
        setScrollLocked(false);
        onClose();
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-[oklch(0.12_0.01_260/0.94)] p-0 text-white backdrop:bg-black/50 open:animate-[lightbox-in_200ms_ease-out]"
    >
      <div className="flex h-full flex-col" onClick={closeOnEmpty}>
        <div className="flex items-center justify-between gap-4 px-3 pt-3 sm:px-5 sm:pt-4">
          <p className="font-mono text-[0.8rem] tracking-[0.12em] text-white/75" aria-live="polite">
            {t.counter(index + 1, images.length)}
          </p>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="inline-flex min-h-11 items-center gap-2 rounded-[3px] px-3 font-medium hover:bg-white/10"
          >
            <IconClose />
            {close}
          </button>
        </div>

        <figure
          className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-3 pb-20 [touch-action:pan-y] sm:px-20 sm:pb-6"
          onClick={closeOnEmpty}
          onPointerDown={(e) => (swipeFrom.current = e.clientX)}
          onPointerUp={(e) => {
            const from = swipeFrom.current;
            swipeFrom.current = null;
            if (!many || from === null) return;
            const dx = e.clientX - from;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="94vw"
            draggable={false}
            className={`min-h-0 animate-[lightbox-in_200ms_ease-out] select-none ${
              img.round
                ? "aspect-square h-auto max-h-full w-[min(78dvh,88vw,30rem)] rounded-full [clip-path:circle(50%)]"
                : "h-auto max-h-full w-auto max-w-full object-contain"
            }`}
          />
          <figcaption aria-hidden="true" className="max-w-2xl shrink-0 text-center text-[0.9rem] leading-snug text-white/80">
            {img.alt}
          </figcaption>
        </figure>

        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.prevImage}
              className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 max-sm:top-auto max-sm:bottom-3 max-sm:translate-y-0 sm:left-4"
            >
              <IconArrowRight className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.nextImage}
              className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 max-sm:top-auto max-sm:bottom-3 max-sm:translate-y-0 sm:right-4"
            >
              <IconArrowRight />
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}
