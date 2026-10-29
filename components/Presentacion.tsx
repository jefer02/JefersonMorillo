import { getContent } from "@/content";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import type { Locale } from "@/lib/i18n/config";

/** The professional intro: one strong paragraph and three highlights in a row. Text only. */
export default function Presentacion({ locale }: { locale: Locale }) {
  const { chapterById, intro } = getContent(locale);
  const chapter = chapterById["presentacion"];
  return (
    <section id="presentacion" aria-labelledby="presentacion-titulo" className="border-rule border-b">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="presentacion-titulo" />

        <p className="font-display mt-6 max-w-[62ch] text-[clamp(1.15rem,1.05rem+0.45vw,1.4rem)] leading-[1.6] font-semibold text-pretty md:mt-8">
          {intro.paragraph}
        </p>

        <dl className="border-rule mt-10 grid gap-5 border-t pt-6 sm:grid-cols-3 sm:gap-8">
          {intro.highlights.map((h) => (
            <div key={h.id}>
              <dt className="font-display leading-snug font-bold">{h.title}</dt>
              <dd className="text-ink-soft mt-1 text-[0.92rem] leading-snug text-pretty">{h.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
