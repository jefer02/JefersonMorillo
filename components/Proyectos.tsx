import Link from "next/link";
import { ViewTransition } from "react";
import { getContent } from "@/content";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { ProjectLinks } from "@/components/fx/ProjectLinks";
import { Reveal } from "@/components/fx/Reveal";
import { ProjectStage } from "@/components/fx/ProjectStage";
import { Text } from "@/components/ui/Todo";
import { href, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

/** Each project with a real screenshot in its device frame, its GitHub repository and demo. */
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
              className="reveal-item flex min-w-0 flex-col"
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
                    <ProjectStage project={project} />
                  </div>
                </ViewTransition>
              </Link>
              <div className="border-ink flex items-center justify-between gap-3 border-t-[3px] pt-3">
                <p className="text-ink-soft flex min-w-0 items-baseline gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase">
                  <span className="font-display text-ink text-[1.05rem] font-extrabold tracking-normal">
                    <span className="sr-only">{t.coverLabel} </span>
                    {String(project.volume).padStart(2, "0")}
                  </span>
                  <span className="truncate">{project.platforms.join(" · ")}</span>
                </p>
                <p className="border-rule shrink-0 rounded-full border px-2.5 py-0.5 text-[0.78rem] font-medium">
                  {t.status[project.status]}
                </p>
              </div>

              <h3 className="font-display mt-4 text-[1.5rem] leading-tight font-bold">
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
