import { Suspense } from "react";
import { Island } from "@/components/system/Island";
import { chapterById } from "@/content/chapters";
import { projects } from "@/content/projects";
import { schools, skills } from "@/content/skills";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { Grimoire } from "@/components/fx/Grimoire";
import { LatestSpell } from "@/components/fx/LatestSpell";
import { SpellList } from "@/components/fx/SpellList";

/** Chapter III: frameworks, libraries and tools only, proven by the projects that use them. */
export default function Habilidades() {
  const chapter = chapterById["habilidades"];
  const titles = projects.map(({ slug, title }) => ({ slug, title }));
  const panels = Object.fromEntries(
    schools.map((s) => [s.id, <SpellList key={s.id} skills={skills.filter((k) => k.school === s.id)} projects={titles} />]),
  );
  return (
    <section id="habilidades" aria-labelledby="habilidades-titulo" className="border-rule border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener
          chapter={chapter}
          headingId="habilidades-titulo"
          lede="No mido mis habilidades en porcentajes: las muestro en lo que he construido. Cada herramienta enlaza al proyecto donde la usé."
        />
        <div className="mt-4">
          <Suspense fallback={null}>
            <LatestSpell />
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
