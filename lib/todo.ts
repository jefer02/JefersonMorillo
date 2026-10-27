import type { MaybeLink, Todo, ExternalLink } from "@/types";

export const TODO_PREFIX = "TODO(jeferson):";

/** Marks content Jeferson still has to provide. Searchable with `grep -r "TODO(jeferson)"`. */
export function todo(note: string): Todo {
  return `${TODO_PREFIX} ${note}` as Todo;
}

export function isTodo(value: unknown): value is Todo {
  return typeof value === "string" && value.startsWith(TODO_PREFIX);
}

export function isRealLink(link: MaybeLink | undefined): link is ExternalLink {
  return !!link && "href" in link;
}

export const isProd = process.env.NODE_ENV === "production";
