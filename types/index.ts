// Shared content types. The course asks for explicit types for projects,
// testimonials and experience entries; everything under content/ uses these.

/** A value Jeferson still has to provide. Always starts with `TODO(jeferson):`. */
export type Todo = `TODO(jeferson):${string}`;

/** Plain text that may still be a placeholder. */
export type Text = string;

export type ExternalLink = {
  label: string;
  href: string;
};

/** A link that may still be missing. Missing links render as "Próximamente" in production. */
export type MaybeLink = ExternalLink | { label: string; todo: Todo };

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Accent = "vermilion" | "jade" | "gold" | "turquoise" | "ember" | "wood";

export type ProjectStatus = "publicado" | "en-desarrollo" | "academico";

export type Project = {
  slug: string;
  /** Volume number shown on the cover ("Vol. 03"). */
  volume: number;
  title: string;
  /** One line, plain Spanish: what it is. */
  tagline: string;
  platforms: string[];
  status: ProjectStatus;
  /** Free-form status detail, e.g. "v1.1.0 publicada". */
  statusNote?: string;
  accent: Accent;
  synopsis: string;
  problem: Text;
  built: string[];
  challenges: Text[];
  learned: Text[];
  /** Skill ids from content/skills.ts. */
  skills: string[];
  repo: MaybeLink;
  demo: MaybeLink;
  extraLinks?: ExternalLink[];
  /** Team projects credit the team and the original repositories. */
  team?: {
    credit: string;
    role: Text;
  };
  period: { start: string; end?: string };
  cover?: ImageAsset;
  gallery?: ImageAsset[];
};

export type SkillSchool = {
  id: string;
  name: string;
  /** Themed name shown as ruby. */
  rune: string;
};

export type Skill = {
  id: string;
  name: string;
  school: string;
  /** One line: what he does with it. */
  use: string;
  /** Project slugs where it was used. */
  usedIn: string[];
};

export type ExperienceKind = "academico" | "laboral" | "proyecto";

export type ExperienceEntry = {
  id: string;
  kind: ExperienceKind;
  title: string;
  organization: string;
  place?: string;
  /** ISO date (YYYY-MM or YYYY-MM-DD) or a Todo. */
  start: string;
  /** ISO date; omit when ongoing. */
  end?: string;
  ongoing?: boolean;
  impact: Text[];
  skills?: string[];
  link?: ExternalLink;
  /** For courses and certificates. */
  verification?: MaybeLink;
  studying?: boolean;
  projectSlug?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  relationship: string;
  organization?: string;
  quote: string;
  avatar?: string;
  link?: string;
  consent: boolean;
  verified: boolean;
};

export type SideStory = {
  id: string;
  title: Text;
  body: Text;
  glyph: "shelf" | "mountain" | "lantern" | "path" | "note" | "gamepad" | "cat" | "pasture";
};

export type ShelfBook = {
  title: string;
  /** Plain genre label shown on the open page. */
  genre: string;
  take: Text;
  color: Accent;
};

export type Chapter = {
  id: string;
  numeral: string;
  /** Plain Spanish name, shown large. */
  name: string;
  /** Themed name, shown as ruby. */
  ruby: string;
  /** Decorative CJK label. */
  kanji?: string;
  folio: number;
};
