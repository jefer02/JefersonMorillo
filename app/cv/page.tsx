import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { languages } from "@/content/extras";
import { profile } from "@/content/profile";
import { schools, skills } from "@/content/skills";
import { socials } from "@/content/socials";
import { formatRange, sortExperience } from "@/lib/experience";
import { orderedProjects } from "@/lib/projects";
import { isRealLink, isTodo } from "@/lib/todo";

export const metadata: Metadata = {
  title: "Hoja de vida",
  robots: { index: false, follow: false },
};

// The CV is generated from the same content as the site, so it never contradicts it.
// Placeholders are always left out here (this page becomes the downloadable PDF).
const real = (s: string) => !isTodo(s);

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-5 mb-2 border-b border-[#1d1a17] pb-1 text-[11pt] font-bold tracking-[0.04em] uppercase">{children}</h2>
  );
}

export default function CvPage() {
  const entries = sortExperience(experience).filter((e) => real(e.title) && real(e.organization));
  const academic = entries.filter((e) => e.kind === "academico");
  const work = entries.filter((e) => e.kind === "laboral");
  const projects = orderedProjects.filter((p) => p.volume !== 0);

  return (
    <main className="cv mx-auto min-h-[297mm] w-[210mm] bg-white px-[16mm] py-[14mm] text-[9.5pt] leading-[1.45] text-[#1d1a17] print:p-0">
      <header className="flex items-end justify-between gap-6 border-b-[3px] border-[#b02018] pb-3">
        <div>
          <h1 className="font-display text-[24pt] leading-none font-extrabold tracking-[-0.02em]">{profile.fullName}</h1>
          <p className="mt-1.5 text-[11pt]">
            {profile.role} · Estudiante de {profile.studies.degree} ({profile.studies.universityShort} {profile.studies.campus})
          </p>
        </div>
        <ul className="shrink-0 text-right text-[8.5pt] leading-[1.6]">
          <li>{profile.email}</li>
          <li>
            {profile.city}, {profile.region}, {profile.country}
          </li>
          {socials.map((s) => (
            <li key={s.id}>{s.href.replace("https://", "")}</li>
          ))}
        </ul>
      </header>

      <p className="mt-3 text-[10pt]">{profile.welcome}</p>

      <H>Formación académica</H>
      {academic.map((e) => (
        <div key={e.id} className="mb-1.5 flex justify-between gap-4">
          <div>
            <p className="font-semibold">{e.title}</p>
            <p className="text-[#55504a]">
              {e.organization}
              {e.studying ? " · Actualmente estudiando" : ""}
            </p>
          </div>
          <p className="shrink-0 text-[8.5pt] text-[#55504a]">{formatRange(e)}</p>
        </div>
      ))}

      {work.length > 0 && (
        <>
          <H>Experiencia laboral</H>
          {work.map((e) => (
            <div key={e.id} className="mb-1.5">
              <div className="flex justify-between gap-4">
                <p className="font-semibold">
                  {e.title} · {e.organization}
                </p>
                <p className="shrink-0 text-[8.5pt] text-[#55504a]">{formatRange(e)}</p>
              </div>
              <ul className="list-disc pl-4">
                {e.impact.filter(real).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      <H>Proyectos</H>
      {projects.map((p) => (
        <div key={p.slug} className="mb-2 break-inside-avoid">
          <div className="flex justify-between gap-4">
            <p>
              <span className="font-semibold">{p.title}</span> — {p.tagline}
            </p>
            <p className="shrink-0 text-[8.5pt] text-[#55504a]">{p.platforms.join(", ")}</p>
          </div>
          {p.team && real(p.team.role) && <p className="text-[#55504a]">{p.team.role}</p>}
          {p.team && <p className="text-[#55504a]">{p.team.credit}</p>}
          <p className="text-[8.5pt] text-[#55504a]">
            {p.skills.map((id) => skills.find((s) => s.id === id)?.name).join(" · ")}
            {isRealLink(p.repo) && <> · {p.repo.href.replace("https://", "")}</>}
            {isRealLink(p.demo) && <> · {p.demo.href.replace("https://", "")}</>}
          </p>
        </div>
      ))}

      <H>Frameworks, librerías y herramientas</H>
      <dl className="grid grid-cols-[9rem_1fr] gap-x-3 gap-y-0.5">
        {schools.map((s) => (
          <div key={s.id} className="contents">
            <dt className="font-semibold">{s.name}</dt>
            <dd>
              {skills
                .filter((k) => k.school === s.id)
                .map((k) => k.name)
                .join(" · ")}
            </dd>
          </div>
        ))}
      </dl>

      <H>Idiomas</H>
      <p>
        {languages
          .filter((l) => real(l.level))
          .map((l) => `${l.name}: ${l.level}`)
          .join(" · ")}
      </p>

      <p className="mt-6 text-[7.5pt] text-[#55504a]">
        Versión completa y proyectos en {profile.siteUrl.replace("https://", "")} — Crónica de Atriz, Vol. 1
      </p>
    </main>
  );
}
