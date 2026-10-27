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
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <ChapterOpener
          chapter={chapter}
          headingId="experiencia-titulo"
          lede="La historia se cuenta desde el último punto de guardado hacia atrás."
        />
        <div className="mt-14 md:mt-20">
          <Island>
            <Chronicle entries={entries} projectTitles={projectTitles} />
          </Island>
        </div>
      </div>
    </section>
  );
}
