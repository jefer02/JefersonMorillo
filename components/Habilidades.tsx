import { Suspense } from "react";
import { Island } from "@/components/system/Island";
import { getContent } from "@/content";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { Grimoire } from "@/components/fx/Grimoire";
import { LatestSpell } from "@/components/fx/LatestSpell";
import { SpellList } from "@/components/fx/SpellList";
import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

/** Frameworks, libraries and tools only, proven by the projects that use them. */
export default function Habilidades({ locale }: { locale: Locale }) {
  const { chapterById, projects, schools, skills } = getContent(locale);
  const t = messages[locale].skills;
  const chapter = chapterById["habilidades"];
  const titles = projects.map(({ slug, title }) => ({ slug, title }));
  const panels = Object.fromEntries(
    schools.map((s) => [s.id, <SpellList key={s.id} skills={skills.filter((k) => k.school === s.id)} projects={titles} locale={locale} />]),
  );
  return (
    <section id="habilidades" aria-labelledby="habilidades-titulo" className="border-rule border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="habilidades-titulo" lede={t.lede} />
        <div className="mt-4">
          <Suspense fallback={null}>
            <LatestSpell locale={locale} />
          </Suspense>
        </div>
        <div className="mt-8 md:mt-10">
          <Island>
            <Grimoire schools={schools} panels={panels} />
          </Island>
        </div>
      </div>
    </section>
  );
}
