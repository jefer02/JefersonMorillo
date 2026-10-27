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
import { projectBySlug } from "@/content/projects";
import { skills } from "@/content/skills";
import { formatMonth } from "@/lib/experience";
import { orderedProjects } from "@/lib/projects";
import { isProd, isTodo } from "@/lib/todo";

export function generateStaticParams() {
  return orderedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/volumenes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) return {};
  return {
    title: `${project.title} — Vol. ${String(project.volume).padStart(2, "0")}`,
    description: project.tagline,
    alternates: { canonical: `/volumenes/${slug}` },
  };
}

const STATUS = {
  publicado: "Publicado",
  "en-desarrollo": "En desarrollo",
  academico: "Académico",
} as const;

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

/** Static shell (menu, footer) renders instantly; the volume streams in from its URL params. */
export default function VolumePage({ params }: PageProps<"/volumenes/[slug]">) {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Suspense fallback={<VolumeSkeleton />}>
          <Volume params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function VolumeSkeleton() {
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

async function Volume({ params }: { params: PageProps<"/volumenes/[slug]">["params"] }) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();

  const index = orderedProjects.findIndex((p) => p.slug === slug);
  const prev = orderedProjects[index - 1];
  const next = orderedProjects[index + 1];
  const period = `${formatMonth(project.period.start)} — ${project.period.end ? formatMonth(project.period.end) : "Actualidad"}`;

  return (
    <article className="mx-auto max-w-[1440px] px-4 pt-10 pb-20 sm:px-6 md:pt-16 lg:px-10">
      <nav aria-label="Migas de pan" className="text-ink-soft font-mono text-[0.75rem] tracking-[0.12em] uppercase">
        <Link href="/#proyectos" className="hover:text-vermilion">
          Mis proyectos
        </Link>{" "}
        / <span aria-current="page">{project.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-24">
            <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
              <div>
                <VolumeCover project={project} size="hero" priority />
              </div>
            </ViewTransition>
            <span aria-hidden="true" className="bg-ink block h-[3px] w-full" />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <p className="text-folio text-vermilion font-mono tracking-[0.2em] uppercase">
            Vol. {String(project.volume).padStart(2, "0")} · {STATUS[project.status]}
            {project.statusNote ? ` · ${project.statusNote}` : ""}
          </p>
          <h1 className="font-display text-chapter mt-3 leading-[1.05] font-extrabold tracking-[-0.02em]">{project.title}</h1>
          <p className="text-lede text-ink-soft mt-4 leading-relaxed">{project.tagline}</p>

          <dl className="border-rule mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 text-[0.92rem] sm:grid-cols-3">
            <div>
              <dt className="text-ink-soft font-mono text-[0.72rem] tracking-[0.1em] uppercase">Plataformas</dt>
              <dd className="mt-1">{project.platforms.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-ink-soft font-mono text-[0.72rem] tracking-[0.1em] uppercase">Periodo</dt>
              <dd className="mt-1">{period}</dd>
            </div>
            {project.team && (
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-ink-soft font-mono text-[0.72rem] tracking-[0.1em] uppercase">Mi rol</dt>
                <dd className="mt-1">
                  <Text value={project.team.role} fallback="Integrante del equipo" />
                </dd>
              </div>
            )}
          </dl>

          {project.team && (
            <p className="bg-paper-2 mt-5 border-l-0 px-4 py-3 text-[0.92rem] leading-relaxed">
              <strong className="font-semibold">Proyecto en equipo.</strong> <Text value={project.team.credit} />
            </p>
          )}

          <div className="mt-8">
            <ProjectLinks project={project} size="page" />
          </div>

          <section className="mt-12">
            <h2 className="sr-only">Sinopsis</h2>
            <p className="font-display text-[clamp(1.15rem,1rem+0.5vw,1.4rem)] leading-[1.65] font-semibold text-pretty">
              {project.synopsis}
            </p>
          </section>

          <div className="mt-12 grid gap-10">
            <section className="border-rule border-t pt-6">
              <h2 className="font-display text-[1.35rem] font-bold">El problema</h2>
              <p className="text-ink-soft mt-4 leading-relaxed">
                <Text value={project.problem} />
              </p>
            </section>
            <Block title="Lo que construí" items={project.built} />
            <Block title="Retos y decisiones" items={project.challenges} />
            <Block title="Lo que aprendí" items={project.learned} />
            <section className="border-rule border-t pt-6">
              <h2 className="font-display text-[1.35rem] font-bold">Tecnologías</h2>
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
                <h2 className="font-display text-[1.35rem] font-bold">Galería</h2>
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

      <nav aria-label="Otros volúmenes" className="border-ink mt-20 grid gap-4 border-t pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/volumenes/${prev.slug}`} className="group hover:text-vermilion flex min-h-16 flex-col justify-center">
            <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.14em] uppercase">Volumen anterior</span>
            <span className="font-display text-[1.35rem] font-bold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/volumenes/${next.slug}`}
            className="group hover:text-vermilion flex min-h-16 flex-col justify-center text-right sm:items-end"
          >
            <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.14em] uppercase">Volumen siguiente</span>
            <span className="font-display inline-flex items-center gap-2 text-[1.35rem] font-bold">
              {next.title}
              <IconArrowRight />
            </span>
          </Link>
        ) : (
          <Link href="/#proyectos" className="hover:text-vermilion flex min-h-16 flex-col justify-center text-right sm:items-end">
            <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.14em] uppercase">Fin de la serie</span>
            <span className="font-display text-[1.35rem] font-bold">Volver a los proyectos</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
