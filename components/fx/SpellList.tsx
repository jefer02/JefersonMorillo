import Link from "next/link";
import type { Project, Skill } from "@/types";
import { Sigil } from "./Sigil";

type Props = { skills: Skill[]; projects: Pick<Project, "slug" | "title">[] };

/** The spells of one school. Server-rendered: sigils are computed once, never on the client. */
export function SpellList({ skills, projects }: Props) {
  const titleOf = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? slug;
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2">
      {skills.map((skill) => (
        <li key={skill.id} className="spell group/spell border-rule flex gap-4 border-t py-5">
          <Sigil
            name={skill.name}
            drawable
            className="text-gold-ink group-hover/spell:text-vermilion size-12 shrink-0 transition-colors duration-300"
          />
          <div className="min-w-0">
            <h4 className="font-display text-[1.1rem] leading-tight font-bold">{skill.name}</h4>
            <p className="text-ink-soft mt-1.5 text-[0.92rem] leading-relaxed">{skill.use}</p>
            <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.8rem]">
              <span className="text-ink-soft font-mono text-[0.72rem] tracking-[0.08em] uppercase">Invocado en:</span>
              {skill.usedIn.map((slug) => (
                <Link
                  key={slug}
                  href={`/volumenes/${slug}`}
                  className="border-rule hover:border-vermilion hover:text-vermilion inline-flex min-h-7 items-center rounded-full border px-2.5 transition-colors duration-200"
                >
                  {titleOf(slug)}
                </Link>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
