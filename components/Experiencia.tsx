import { getContent } from "@/content";
import { Island } from "@/components/system/Island";
import { Chronicle } from "@/components/fx/Chronicle";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { sortExperience } from "@/lib/experience";
import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

/** Academic, work and project experience, newest → oldest (sorted in code). */
export default function Experiencia({ locale }: { locale: Locale }) {
  const { chapterById, experience, projects } = getContent(locale);
  const chapter = chapterById["experiencia"];
  const entries = sortExperience(experience);
  const projectTitles = Object.fromEntries(projects.map((p) => [p.slug, p.title]));

  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="border-rule bg-paper-2/45 border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="experiencia-titulo" lede={messages[locale].experience.lede} />
        <div className="mt-8 md:mt-12">
          <Island>
            <Chronicle entries={entries} projectTitles={projectTitles} />
          </Island>
        </div>
      </div>
    </section>
  );
}
