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

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-5 mb-2 border-b border-[#1d1a17] pb-1 text-[11pt] font-bold tracking-[0.04em] uppercase">{children}</h2>
  );
}

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile, experience, orderedProjects, schools, skills, languages } = getContent(locale);
  const t = messages[locale].cv;

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
            {profile.role} · {t.student} {profile.studies.degree} ({profile.studies.universityShort} {profile.studies.campus})
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

      <H>{t.education}</H>
      {academic.map((e) => (
        <div key={e.id} className="mb-1.5 flex justify-between gap-4">
          <div>
            <p className="font-semibold">{e.title}</p>
            <p className="text-[#55504a]">
              {e.organization}
              {e.studying ? ` · ${t.studying} · ${t.semester(profile.studies.semester)}` : ""}
            </p>
          </div>
          <p className="shrink-0 text-[8.5pt] text-[#55504a]">{formatRange(e, locale)}</p>
        </div>
      ))}

      {work.length > 0 && (
        <>
          <H>{t.work}</H>
          {work.map((e) => (
            <div key={e.id} className="mb-1.5">
              <div className="flex justify-between gap-4">
                <p className="font-semibold">
                  {e.title} · {e.organization}
                </p>
                <p className="shrink-0 text-[8.5pt] text-[#55504a]">{formatRange(e, locale)}</p>
              </div>
              <ul className="list-disc pl-4">
                {e.impact.filter(real).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      <H>{t.projects}</H>
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

      <H>{t.skills}</H>
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

      <H>{t.languages}</H>
      <p>
        {languages
          .filter((l) => real(l.level))
          .map((l) => `${l.name}: ${l.level}`)
          .join(" · ")}
      </p>

      <p className="mt-6 text-[7.5pt] text-[#55504a]">
        {t.footer} {profile.siteUrl.replace("https://", "")}/{locale}
      </p>
    </main>
  );
}
