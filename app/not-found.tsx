import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MagicCircle } from "@/components/fx/MagicCircle";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Re:Inicio — página no encontrada",
  robots: { index: false },
};

/** "Re:Inicio": a dead end in this timeline. Clear ways back, no forced redirect. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[min(120vw,52rem)] -translate-1/2"
        >
          <MagicCircle className="text-ink/[0.08] dark:text-gold/[0.14] size-full" seed="re-inicio" />
          {/* A clock rewinding at the center of the circle */}
          <svg viewBox="-50 -50 100 100" className="text-vermilion absolute inset-[38%]">
            <circle r="46" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line
              x1="0"
              y1="2"
              x2="0"
              y2="-38"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="origin-[0_0] motion-safe:animate-[rewind_6s_linear_infinite]"
            />
            <line
              x1="0"
              y1="2"
              x2="0"
              y2="-24"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="origin-[0_0] motion-safe:animate-[rewind_72s_linear_infinite]"
            />
            <circle r="3" fill="currentColor" />
          </svg>
        </div>

        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-folio text-ink-soft font-mono tracking-[0.22em] uppercase">Error 404 · Punto de guardado perdido</p>
          <h1 className="font-display text-display mt-4 leading-none font-extrabold tracking-[-0.03em]">
            <ruby>
              Re:Inicio
              <rp> (</rp>
              <rt>Página no encontrada</rt>
              <rp>)</rp>
            </ruby>
          </h1>
          <p className="text-lede text-ink-soft mt-6 max-w-[42ch] leading-relaxed">
            Este camino no existe en esta línea temporal. Vuelve al último punto de guardado y sigue leyendo.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="primary">
              Volver a la portada
            </ButtonLink>
            <ButtonLink href="/#proyectos" variant="outline" icon={<IconArrowRight />}>
              Ver proyectos
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
