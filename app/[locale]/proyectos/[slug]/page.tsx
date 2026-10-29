import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectLinks } from "@/components/fx/ProjectLinks";
import { VolumeCover } from "@/components/fx/VolumeCover";
import { Text } from "@/components/ui/Todo";
import { IconArrowRight } from "@/components/ui/Icons";
import { getContent } from "@/content";
import { projects } from "@/content/projects";
import { href, isLocale, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { localeAlternates } from "@/lib/i18n/metadata";
import { formatMonth } from "@/lib/experience";
import { isProd, isTodo } from "@/lib/todo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/proyectos/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getContent(locale).projectBySlug[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: localeAlternates(locale, `/proyectos/${slug}`),
  };
}

function Block({ title, items }: { title: string; items: string[] }) {
  const visible = items.filter((t) => !(isProd && isTodo(t)));
  if (!visible.length) return null;
  return (
    <section className="border-rule border-t pt-6">
      <h2 className="font-display text-[1.35rem] font-bold">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {visible.map((t, i) => (
          <li key={i} className="text-ink-soft flex gap-3 leading-relaxed">
            <span aria-hidden="true" className="bg-vermilion mt-[0.7em] size-1.5 shrink-0 rotate-45" />
            <Text value={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Static shell (menu, footer) renders instantly; the case study streams in from its URL params. */
export default async function ProjectPage({ params }: PageProps<"/[locale]/proyectos/[slug]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Navbar locale={locale} />
      <main id="contenido">
        <Suspense fallback={<CaseStudySkeleton />}>
          <CaseStudy params={params} locale={locale} />
        </Suspense>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function CaseStudySkeleton() {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pt-24 pb-20 sm:px-6 md:grid-cols-12 lg:px-10" aria-busy="true">
      <div className="bg-paper-2 aspect-[3/4] md:col-span-5 lg:col-span-4" />
      <div className="grid content-start gap-4 md:col-span-7">
        <div className="bg-paper-2 h-4 w-40" />
        <div className="bg-paper-2 h-14 w-2/3" />
        <div className="bg-paper-2 h-6 w-full" />
      </div>
    </div>
  );
}

async function CaseStudy({ params, locale }: { params: PageProps<"/[locale]/proyectos/[slug]">["params"]; locale: Locale }) {
  const { slug } = await params;
  const { projectBySlug, orderedProjects, skills } = getContent(locale);
  const t = messages[locale].caseStudy;
  const status = messages[locale].projects.status;
  const project = projectBySlug[slug];
  if (!project) notFound();

  const index = orderedProjects.findIndex((p) => p.slug === slug);
  const prev = orderedProjects[index - 1];
  const next = orderedProjects[index + 1];
  const end = project.period.end ? formatMonth(project.period.end, locale) : messages[locale].experience.present;
  const period = `${formatMonth(project.period.start, locale)} — ${end}`;

  return (
    <article className="mx-auto max-w-[1440px] px-4 pt-10 pb-20 sm:px-6 md:pt-16 lg:px-10">
      <nav aria-label={t.breadcrumbLabel} className="text-ink-soft font-mono text-[0.75rem] tracking-[0.12em] uppercase">
        <Link href={href(locale, "#proyectos")} className="hover:text-vermilion">
          {t.breadcrumb}
        </Link>{" "}
        / <span aria-current="page">{project.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-24">
            <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
              <div>
                <VolumeCover project={project} size="hero" priority locale={locale} />
              </div>
            </ViewTransition>
            <span aria-hidden="true" className="bg-ink block h-[3px] w-full" />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <p className="text-folio text-vermilion font-mono tracking-[0.2em] uppercase">
            {t.project} {String(project.volume).padStart(2, "0")} · {status[project.status]}
            {project.statusNote ? ` · ${project.statusNote}` : ""}
          </p>
          <h1 className="font-display text-chapter mt-3 leading-[1.05] font-extrabold tracking-[-0.02em]">{project.title}</h1>
          <p className="text-lede text-ink-soft mt-4 leading-relaxed">{project.tagline}</p>

          <dl className="border-rule mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 text-[0.92rem] sm:grid-cols-3">
            <div>
              <dt className="text-ink-soft font-mono text-[0.72rem] tracking-[0.1em] uppercase">{t.platforms}</dt>
              <dd className="mt-1">{project.platforms.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-ink-soft font-mono text-[0.72rem] tracking-[0.1em] uppercase">{t.period}</dt>
              <dd className="mt-1">{period}</dd>
            </div>
            {project.team && (
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-ink-soft font-mono text-[0.72rem] tracking-[0.1em] uppercase">{t.role}</dt>
                <dd className="mt-1">
                  <Text value={project.team.role} fallback={t.teamMember} />
                </dd>
              </div>
            )}
          </dl>

          {project.team && (
            <p className="bg-paper-2 mt-5 border-l-0 px-4 py-3 text-[0.92rem] leading-relaxed">
              <strong className="font-semibold">{messages[locale].projects.team}</strong> <Text value={project.team.credit} />
            </p>
          )}

          <div className="mt-8">
            <ProjectLinks project={project} size="page" locale={locale} />
          </div>

          <section className="mt-12">
            <h2 className="sr-only">{t.synopsis}</h2>
            <p className="font-display text-[clamp(1.15rem,1rem+0.5vw,1.4rem)] leading-[1.65] font-semibold text-pretty">
              {project.synopsis}
            </p>
          </section>

          <div className="mt-12 grid gap-10">
            <section className="border-rule border-t pt-6">
              <h2 className="font-display text-[1.35rem] font-bold">{t.problem}</h2>
              <p className="text-ink-soft mt-4 leading-relaxed">
                <Text value={project.problem} />
              </p>
            </section>
            <Block title={t.built} items={project.built} />
            <Block title={t.challenges} items={project.challenges} />
            <Block title={t.learned} items={project.learned} />
            <section className="border-rule border-t pt-6">
              <h2 className="font-display text-[1.35rem] font-bold">{t.tech}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((id) => (
                  <li key={id} className="border-rule rounded-full border px-3 py-1 font-mono text-[0.78rem]">
                    {skills.find((s) => s.id === id)?.name ?? id}
                  </li>
                ))}
              </ul>
            </section>
            {project.gallery && project.gallery.length > 0 && (
              <section className="border-rule border-t pt-6">
                <h2 className="font-display text-[1.35rem] font-bold">{t.gallery}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((img) => (
                    <Image
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 1024px) 28rem, 90vw"
                      className="h-auto w-full"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <nav aria-label={t.others} className="border-ink mt-20 grid gap-4 border-t pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={href(locale, `/proyectos/${prev.slug}`)} className="group hover:text-vermilion flex min-h-16 flex-col justify-center">
            <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.14em] uppercase">{t.prev}</span>
            <span className="font-display text-[1.35rem] font-bold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={href(locale, `/proyectos/${next.slug}`)}
            className="group hover:text-vermilion flex min-h-16 flex-col justify-center text-right sm:items-end"
          >
            <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.14em] uppercase">{t.next}</span>
            <span className="font-display inline-flex items-center gap-2 text-[1.35rem] font-bold">
              {next.title}
              <IconArrowRight />
            </span>
          </Link>
        ) : (
          <Link
            href={href(locale, "#proyectos")}
            className="hover:text-vermilion flex min-h-16 flex-col justify-center text-right sm:items-end"
          >
            <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.14em] uppercase">{t.end}</span>
            <span className="font-display text-[1.35rem] font-bold">{t.back}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
