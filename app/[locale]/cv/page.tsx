import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { socials } from "@/content/socials";
import { formatRange, sortExperience } from "@/lib/experience";
import { isLocale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { isRealLink, isTodo } from "@/lib/todo";

export async function generateMetadata({ params }: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: isLocale(locale) ? messages[locale].meta.cvTitle : "CV",
    robots: { index: false, follow: false },
  };
}

// The CV is generated from the same content as the site, so it never contradicts it.
// Placeholders are always left out here (this page becomes the downloadable PDF).
const real = (s: string) => !isTodo(s);

/** A section title: bold, small, with a thin grey rule under it. */
function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-[8pt] mb-[3pt] border-b border-[#9a9a9a] pb-[2pt] text-[10.5pt] font-bold">{children}</h2>;
}

// A plain, single-column CV that applicant tracking systems read well: a classic serif,
// black text, no colors, icons or photos.
export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile, experience, orderedProjects, schools, skills, languages } = getContent(locale);
  const t = messages[locale].cv;

  const entries = sortExperience(experience).filter((e) => real(e.title) && real(e.organization));
  const academic = entries.filter((e) => e.kind === "academico");
  const work = entries.filter((e) => e.kind === "laboral");
  const projects = orderedProjects.filter((p) => p.volume !== 0);
  const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id;
  const bare = (url: string) => url.replace(/^https?:\/\/(www\.|co\.)?/, "").replace(/\/$/, "");

  return (
    <main className="cv mx-auto min-h-[297mm] w-[210mm] bg-white px-[16mm] pt-[10mm] pb-[6mm] print:min-h-0 font-['Times_New_Roman',Times,serif] text-[10pt] leading-[1.24] text-black">
      <header className="text-center">
        <h1 className="text-[17pt] leading-tight font-bold">{profile.fullName}</h1>
        <p className="mt-[2pt]">
          {profile.city}, {profile.country} / {profile.email}
        </p>
        <p>{[...socials.map((s) => bare(s.href)), `${bare(profile.siteUrl)}/${locale}`].join(" / ")}</p>
      </header>

      <H>{t.profile}</H>
      <p className="text-pretty">{profile.cvSummary}</p>

      <H>{t.education}</H>
      {academic.map((e) => (
        <div key={e.id} className="mb-[3pt] break-inside-avoid">
          <p className="font-bold">
            {e.title} — {e.organization}
          </p>
          <p className="pl-[14pt]">
            {e.place ? `${e.place}, ` : ""}
            {formatRange(e, locale)}
            {e.studying && ` · ${t.semester(profile.studies.semester)}`}
          </p>
        </div>
      ))}

      {work.length > 0 && (
        <>
          <H>{t.work}</H>
          {work.map((e) => (
            <div key={e.id} className="mb-[5pt] break-inside-avoid">
              <p>
                <span className="font-bold">
                  {e.title} — {e.organization}
                </span>
                , {formatRange(e, locale)}
              </p>
              {e.impact.filter(real).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))}
        </>
      )}

      <H>{t.skills}</H>
      {schools.map((s) => {
        const names = skills.filter((k) => k.school === s.id).map((k) => k.name);
        if (!names.length) return null;
        return (
          <p key={s.id}>
            <span className="font-bold">{s.name}:</span> {names.join(", ")}
          </p>
        );
      })}

      <H>{t.projects}</H>
      {projects.map((p) => (
        <div key={p.slug} className="mb-[5pt] break-inside-avoid">
          <p>
            <span className="font-bold">{p.title}</span> - {p.skills.slice(0, 6).map(skillName).join(", ")}
          </p>
          <p className="text-pretty">
            {p.synopsis}
            {p.team && ` ${p.team.credit}`}
            {p.team && real(p.team.role) && ` ${p.team.role}`}
          </p>
          {isRealLink(p.repo) && (
            <p className="text-[9.5pt] text-[#333]">
              {[p.repo, p.demo]
                .filter(isRealLink)
                .filter((l) => l.href.startsWith("http"))
                .map((l) => bare(l.href))
                .join(" / ")}
            </p>
          )}
        </div>
      ))}

      <H>{t.languages}</H>
      {languages
        .filter((l) => real(l.level))
        .map((l) => (
          <p key={l.name}>
            <span className="font-bold">{l.name}:</span> {l.level}
          </p>
        ))}

    </main>
  );
}
