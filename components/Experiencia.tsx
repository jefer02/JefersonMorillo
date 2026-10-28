import { chapterById } from "@/content/chapters";
import { Island } from "@/components/system/Island";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { Chronicle } from "@/components/fx/Chronicle";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { sortExperience } from "@/lib/experience";

/** Chapter VI: academic, work and project experience, newest → oldest (sorted in code). */
export default function Experiencia() {
  const chapter = chapterById["experiencia"];
  const entries = sortExperience(experience);
  const projectTitles = Object.fromEntries(projects.map((p) => [p.slug, p.title]));

  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="border-rule bg-paper-2/45 border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="experiencia-titulo" lede="De lo más reciente a lo más antiguo." />
        <div className="mt-8 md:mt-12">
          <Island>
            <Chronicle entries={entries} projectTitles={projectTitles} />
          </Island>
        </div>
      </div>
    </section>
  );
}
