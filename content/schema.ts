import { z } from "zod";

// Build-time validation for everything under content/. Run with `npm run check:content`.
const todoString = z.string().startsWith("TODO(jeferson):");
// A bare year (YYYY) is allowed when the month is unknown, e.g. the start of the degree.
const isoDate = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, "Fecha ISO YYYY, YYYY-MM o YYYY-MM-DD");
const dateOrTodo = z.union([isoDate, todoString]);
const url = z.url({ protocol: /^https?$/ });

const link = z.object({ label: z.string().min(1), href: url });
const maybeLink = z.union([link, z.object({ label: z.string().min(1), todo: todoString })]);

const image = z.object({
  src: z.string().startsWith("/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(4),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  volume: z.number().int().min(0),
  title: z.string().min(1),
  titleEn: z.string().min(1).optional(),
  tagline: z.string().min(10).max(140),
  platforms: z.array(z.string()).min(1),
  status: z.enum(["publicado", "en-desarrollo", "academico"]),
  statusNote: z.string().optional(),
  accent: z.enum(["vermilion", "jade", "gold", "turquoise", "ember", "wood"]),
  synopsis: z.string().min(40),
  problem: z.string().min(20),
  built: z.array(z.string()).min(1),
  challenges: z.array(z.string()),
  learned: z.array(z.string()),
  skills: z.array(z.string()).min(1),
  repo: maybeLink,
  demo: maybeLink,
  extraLinks: z.array(link).optional(),
  team: z.object({ credit: z.string(), role: z.string() }).optional(),
  period: z.object({ start: isoDate, end: isoDate.optional() }),
  cover: image.optional(),
  gallery: z.array(image).optional(),
});

// Programming languages are not skills on this site.
const LANGUAGES = /^(kotlin|dart|typescript|javascript|python|java|c\+\+|c#|gdscript|go|rust|swift|php|ruby|sql|html|css)$/i;

export const skillSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().refine((n) => !LANGUAGES.test(n.trim()), "Los lenguajes de programación no van en Habilidades"),
  school: z.string(),
  use: z.string().min(10),
  usedIn: z.array(z.string()).min(1, "Cada habilidad debe enlazar al menos un proyecto"),
});

export const experienceSchema = z.object({
  id: z.string(),
  kind: z.enum(["academico", "laboral", "proyecto"]),
  title: z.string(),
  organization: z.string(),
  place: z.string().optional(),
  start: dateOrTodo,
  end: isoDate.optional(),
  ongoing: z.boolean().optional(),
  impact: z.array(z.string()).min(1).max(3),
  skills: z.array(z.string()).optional(),
  link: link.optional(),
  verification: maybeLink.optional(),
  studying: z.boolean().optional(),
  projectSlug: z.string().optional(),
});

export const testimonialSchema = z
  .object({
    id: z.string(),
    name: z.string().min(3),
    role: z.string().min(3),
    relationship: z.string().min(3),
    organization: z.string().optional(),
    quote: z.string(),
    avatar: z.string().optional(),
    link: url.optional(),
    consent: z.boolean(),
    verified: z.boolean(),
  })
  .refine(
    (t) => !(t.consent && t.verified) || t.quote.trim().split(/\s+/).length <= 90,
    "Un testimonio publicado debe ser breve (25–70 palabras recomendadas)",
  );
