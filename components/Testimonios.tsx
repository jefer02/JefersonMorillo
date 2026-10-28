import Image from "next/image";
import { Island } from "@/components/system/Island";
import { chapterById } from "@/content/chapters";
import { MIN_TESTIMONIALS, publishableTestimonials, testimonials, testimonialsReady } from "@/content/testimonials";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { WaxSealLetter } from "@/components/fx/WaxSealLetter";
import { PlaceholderStamp, Text } from "@/components/ui/Todo";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { isProd } from "@/lib/todo";

/**
 * Chapter V: letters from the guild. Production renders only real, consented and
 * verified testimonials, and only once the course minimum is met. Development shows
 * the placeholders stamped "NO PUBLICAR".
 */
export default function Testimonios() {
  if (isProd && !testimonialsReady) return null;
  const chapter = chapterById["testimonios"];
  const letters = isProd ? publishableTestimonials : testimonials;

  return (
    <section id="testimonios" aria-labelledby="testimonios-titulo" className="border-rule border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener
          chapter={chapter}
          headingId="testimonios-titulo"
          lede="Cartas de personas con las que he estudiado y construido. Cada una está publicada con su permiso."
        />
        {!isProd && !testimonialsReady && (
          <p className="text-vermilion mt-6 inline-flex flex-wrap items-center gap-3 text-[0.9rem]">
            <PlaceholderStamp />
            Solo {publishableTestimonials.length} de {MIN_TESTIMONIALS} testimonios verificados. Esta sección no se publica hasta tener 3
            reales (ver docs/pedir-testimonios.md).
          </p>
        )}

        <ul className="mt-8 grid gap-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {letters.map((t, i) => (
            <li key={t.id}>
              <Island>
                <WaxSealLetter index={i}>
                  <figure className="flex min-h-[22rem] flex-col px-7 pt-14 pb-7">
                    {!t.verified && (
                      <div className="mb-4">
                        <PlaceholderStamp />
                      </div>
                    )}
                    <blockquote className="font-display text-[1.15rem] leading-[1.6] font-semibold text-pretty">
                      <p>
                        «<Text value={t.quote} />»
                      </p>
                    </blockquote>
                    <figcaption className="border-rule mt-auto flex items-center gap-3 border-t pt-5">
                      {t.avatar && <Image src={t.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />}
                      <div className="min-w-0 text-[0.9rem]">
                        <p className="font-display text-[1.05rem] font-bold">
                          <Text value={t.name} />
                        </p>
                        <p className="text-ink-soft">
                          <Text value={t.role} />
                          {t.organization ? ` · ${t.organization}` : ""}
                        </p>
                        <p className="text-ink-soft mt-0.5 italic">
                          <Text value={t.relationship} />
                        </p>
                        {t.link && (
                          <a
                            href={t.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="decoration-rule hover:text-vermilion mt-1 inline-flex min-h-9 items-center gap-1 underline"
                          >
                            Ver en LinkedIn <IconArrowUpRight width={14} height={14} />
                            <span className="sr-only"> (se abre en otra pestaña)</span>
                          </a>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </WaxSealLetter>
              </Island>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
