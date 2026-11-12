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
  /** Round watch screenshots are clipped to a circle. */
  round?: boolean;
  /** Overrides the project's frame for this image, e.g. a phone shot in a watch project. */
  frame?: ProjectFrame;
};

/** A promo video in public/projects/<slug>/, compressed to 720p H.264 with its poster frame. */
export type VideoAsset = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** What the video shows, for screen readers (Spanish; English in content/en.ts). */
  label: string;
};

/** The device drawn around a project's screenshots. */
export type ProjectFrame = "watch" | "phone" | "window" | "browser" | "handheld" | "screen";

export type Accent = "vermilion" | "jade" | "gold" | "turquoise" | "ember" | "wood";

export type ProjectStatus = "publicado" | "en-desarrollo" | "academico";

export type Project = {
  slug: string;
  /** Volume number shown on the cover ("Vol. 03"). */
  volume: number;
  title: string;
  /** English title, only when it differs from `title`. */
  titleEn?: string;
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
  /** External URL, or a path inside the site (without locale) such as "/proyectos/voxara#video". */
  demo: MaybeLink;
  extraLinks?: ExternalLink[];
  /** Team projects credit the team and the original repositories. */
  team?: {
    credit: string;
    role: Text;
  };
  period: { start: string; end?: string };
  /** Main screenshot, shown on the card and at the top of the case study. */
  cover?: ImageAsset;
  frame?: ProjectFrame;
  /** More screenshots, shown under the cover on the case study. */
  gallery?: ImageAsset[];
  /** Promo video: previewed on hover in the card, played with controls on the case study. */
  video?: VideoAsset;
};

export type SkillSchool = {
  id: string;
  name: string;
};

export type Skill = {
  id: string;
  name: string;
  school: string;
  /** One line: what he does with it. */
  use: string;
  /** Project slugs where it was used; empty for know-how that no project shows yet. */
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
  /** Shown in the round avatar instead of a photo. */
  initials: string;
  /** How the person knows Jeferson (Spanish; English in content/en.ts). */
  relationship: string;
  /** Card quote, word for word. */
  quote: string;
  /** Longer review shown on the project page, word for word. */
  review?: string;
  /** The project the testimonial talks about. */
  projectSlug?: string;
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
  /** Plain Spanish name: the section heading and the menu label. */
  name: string;
};
