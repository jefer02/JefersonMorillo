import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import type { ExperienceEntry, Project, Skill } from "@/types";
import * as about from "./about";
import { getChapters } from "./chapters";
import * as en from "./en";
import { experience as experienceEs } from "./experience";
import * as extras from "./extras";
import { intro as introEs } from "./intro";
import { profile as profileEs } from "./profile";
import { projects as projectsEs } from "./projects";
import { schools as schoolsEs, skills as skillsEs } from "./skills";

/** Strongest projects first; this portfolio (number 0) closes the list. */
const order = (list: Project[]) => [...list].sort((a, b) => (a.volume === 0 ? 1 : b.volume === 0 ? -1 : a.volume - b.volume));

function localizeProject(p: Project): Project {
  const t = en.projects[p.slug];
  if (!t) return p;
  return {
    ...p,
    title: p.titleEn ?? p.title,
    tagline: t.tagline,
    synopsis: t.synopsis,
    problem: t.problem,
    built: t.built,
    challenges: t.challenges,
    platforms: t.platforms ?? p.platforms,
    statusNote: t.statusNote ?? p.statusNote,
    learned: t.learned ?? p.learned,
    repo: { ...p.repo, label: t.repoLabel },
    demo: { ...p.demo, label: t.demoLabel },
    extraLinks: p.extraLinks?.map((l, i) => ({ ...l, label: t.extraLinkLabels?.[i] ?? l.label })),
    team: p.team && { credit: t.team?.credit ?? p.team.credit, role: t.team?.role ?? p.team.role },
  };
}

function localizeSkill(s: Skill): Skill {
  const t = en.skills[s.id];
  return t ? { ...s, name: t.name ?? s.name, use: t.use } : s;
}

function localizeEntry(e: ExperienceEntry): ExperienceEntry {
  const t = en.experience[e.id];
  if (!t) return e;
  const { verificationLabel, ...text } = t;
  return {
    ...e,
    ...text,
    verification: e.verification && verificationLabel ? { ...e.verification, label: verificationLabel } : e.verification,
  };
}

function build(locale: Locale) {
  const isEn = locale === "en";
  const degree = isEn ? en.profile.degree : profileEs.studies.degree;
  const profile = {
    ...profileEs,
    role: profileEs.roles[locale],
    welcome: isEn ? en.profile.welcome : profileEs.welcome,
    studies: { ...profileEs.studies, degree },
    photo: profileEs.photo && { ...profileEs.photo, alt: isEn ? en.profile.photoAlt : profileEs.photo.alt },
    cvPath: profileEs.cvPaths[locale],
    /** The rune inscription is Spanish on both sites; English readers get a translation. */
    inscriptionGloss: isEn ? en.profile.inscriptionGloss : undefined,
  };
  const projects = isEn ? projectsEs.map(localizeProject) : projectsEs;

  return {
    locale,
    profile,
    statusTag: `${messages[locale].hero.studying} · ${degree} · ${profileEs.studies.universityShort} ${profileEs.studies.campus}`,
    intro: isEn ? en.intro : introEs,
    presentation: isEn ? en.presentation : about.presentation,
    quickFacts: isEn ? en.quickFacts : about.quickFacts,
    sideStories: isEn ? en.sideStories : about.sideStories,
    shelf: isEn ? about.shelf.map((b) => ({ ...b, ...en.shelf[b.title] })) : about.shelf,
    languages: isEn ? en.languages : extras.languages,
    achievements: extras.achievements,
    learningNow: isEn ? en.learningNow : extras.learningNow,
    curiousFacts: isEn ? en.curiousFacts : extras.curiousFacts,
    passions: isEn
      ? extras.passions.map((p) => {
          const t = en.passions[p.id];
          return { ...p, title: t.title, body: t.body, link: { ...p.link, label: t.linkLabel } };
        })
      : extras.passions,
    closingLine: isEn ? en.closingLine : extras.closingLine,
    schools: isEn ? schoolsEs.map((s) => ({ ...s, name: en.schools[s.id] ?? s.name })) : schoolsEs,
    skills: isEn ? skillsEs.map(localizeSkill) : skillsEs,
    projects,
    orderedProjects: order(projects),
    projectBySlug: Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>,
    experience: isEn ? experienceEs.map(localizeEntry) : experienceEs,
    ...getChapters(locale),
  };
}

export type SiteContent = ReturnType<typeof build>;

const cache: Partial<Record<Locale, SiteContent>> = {};

/** All site content in one language (built once per locale). */
export function getContent(locale: Locale): SiteContent {
  return (cache[locale] ??= build(locale));
}
