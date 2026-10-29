import Link from "next/link";
import { ViewTransition } from "react";
import { getContent } from "@/content";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { ProjectLinks } from "@/components/fx/ProjectLinks";
import { Reveal } from "@/components/fx/Reveal";
import { VolumeCover } from "@/components/fx/VolumeCover";
import { Text } from "@/components/ui/Todo";
import { href, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

/** Each project as a book cover, with its GitHub repository and demo. */
export default function Proyectos({ locale }: { locale: Locale }) {
  const { chapterById, orderedProjects, skills } = getContent(locale);
  const t = messages[locale].projects;
  const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id;
  const chapter = chapterById["proyectos"];
  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="border-rule bg-paper-2/45 border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="proyectos-titulo" lede={t.lede} />

        <Reveal as="ul" className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-x-10" threshold={0.05}>
          {orderedProjects.map((project, i) => (
            <li
              key={project.slug}
              id={`proyecto-${project.slug}`}
              className="reveal-item flex flex-col"
              style={{ ["--i" as string]: i % 3 }}
            >
              <Link
                href={href(locale, `/proyectos/${project.slug}`)}
                prefetch
                className="group block outline-offset-4"
                aria-label={`${project.title}: ${t.readCase}`}
              >
                <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
                  <div className="transition-transform duration-200 ease-out group-hover:-translate-y-1.5">
                    <VolumeCover project={project} locale={locale} />
                  </div>
                </ViewTransition>
              </Link>
              {/* The shelf the volume stands on */}
              <span aria-hidden="true" className="bg-ink block h-[3px] w-full" />

              <h3 className="font-display mt-6 text-[1.5rem] leading-tight font-bold">
                <Link href={href(locale, `/proyectos/${project.slug}`)} className="hover:text-vermilion">
                  {project.title}
                </Link>
              </h3>
              <p className="text-ink-soft mt-2 leading-relaxed">{project.tagline}</p>
              {project.team && (
                <p className="text-ink-soft mt-2 text-[0.85rem]">
                  <span className="text-ink font-medium">{t.team}</span> <Text value={project.team.credit} />
                </p>
              )}
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.tech}>
                {project.skills.slice(0, 5).map((id) => (
                  <li key={id} className="border-rule rounded-full border px-2.5 py-0.5 font-mono text-[0.72rem]">
                    {skillName(id)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <ProjectLinks project={project} locale={locale} />
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
