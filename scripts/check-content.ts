// Validates content/ at build time. Schema errors fail the build; TODO(jeferson)
// markers and missing testimonials print as warnings so Jeferson knows what's left.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { projects } from "../content/projects";
import { skills, schools } from "../content/skills";
import { experience } from "../content/experience";
import { testimonials, MIN_TESTIMONIALS } from "../content/testimonials";
import * as about from "../content/about";
import * as extras from "../content/extras";
import { profile } from "../content/profile";
import { projectSchema, skillSchema, experienceSchema, testimonialSchema } from "../content/schema";

const errors: string[] = [];
const warnings: string[] = [];

function validate<T>(label: string, schema: z.ZodType<T>, items: unknown[]) {
  items.forEach((item, i) => {
    const result = schema.safeParse(item);
    if (!result.success) {
      const id = (item as { id?: string; slug?: string }).id ?? (item as { slug?: string }).slug ?? i;
      for (const issue of result.error.issues) {
        errors.push(`${label}[${id}] ${issue.path.join(".")}: ${issue.message}`);
      }
    }
  });
}

validate("projects", projectSchema, projects);
validate("skills", skillSchema, skills);
validate("experience", experienceSchema, experience);
validate("testimonials", testimonialSchema, testimonials);

// Cross references.
const slugs = new Set(projects.map((p) => p.slug));
const skillIds = new Set(skills.map((s) => s.id));
const schoolIds = new Set(schools.map((s) => s.id));
for (const s of skills) {
  if (!schoolIds.has(s.school)) errors.push(`skills[${s.id}] escuela desconocida: ${s.school}`);
  for (const slug of s.usedIn) if (!slugs.has(slug)) errors.push(`skills[${s.id}] proyecto desconocido: ${slug}`);
}
for (const p of projects) {
  for (const id of p.skills) if (!skillIds.has(id)) errors.push(`projects[${p.slug}] habilidad desconocida: ${id}`);
}
for (const e of experience) {
  if (e.projectSlug && !slugs.has(e.projectSlug)) errors.push(`experience[${e.id}] proyecto desconocido: ${e.projectSlug}`);
}
if (new Set(projects.map((p) => p.volume)).size !== projects.length) errors.push("projects: números de volumen repetidos");

// Course requirements.
const verified = testimonials.filter((t) => t.consent && t.verified);
if (verified.length < MIN_TESTIMONIALS) {
  warnings.push(
    `\n  ⚠️  TESTIMONIOS: solo ${verified.length} de ${MIN_TESTIMONIALS} verificados. ` +
      "La guía del curso exige mínimo 3: todavía no puedes entregar. Ver docs/pedir-testimonios.md\n",
  );
}

const cv = join(process.cwd(), "public", profile.cvPath);
if (!existsSync(cv)) {
  errors.push(`Falta el CV en public${profile.cvPath}. Genéralo con \`npm run cv\` (el botón «Descargar CV» es obligatorio).`);
}

// Remaining placeholders.
function collectTodos(value: unknown, path: string, out: string[]) {
  if (typeof value === "string" && value.startsWith("TODO(jeferson):")) out.push(`${path}: ${value.slice(15).trim()}`);
  else if (Array.isArray(value)) value.forEach((v, i) => collectTodos(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) collectTodos(v, `${path}.${k}`, out);
}
const todos: string[] = [];
collectTodos({ profile, projects, skills, experience, about, extras }, "content", todos);

if (todos.length) {
  console.warn(`\n📝 ${todos.length} TODO(jeferson) pendientes en content/:`);
  for (const t of todos) console.warn(`   · ${t}`);
}
for (const w of warnings) console.warn(w);

if (errors.length) {
  console.error(`\n❌ ${errors.length} errores de contenido:`);
  for (const e of errors) console.error(`   · ${e}`);
  process.exit(1);
}
console.log("\n✅ Contenido válido.");
