import { projects } from "@/content/projects";

/** Strongest volumes first; this portfolio (Vol. 0) closes the shelf. */
export const orderedProjects = [...projects].sort((a, b) => (a.volume === 0 ? 1 : b.volume === 0 ? -1 : a.volume - b.volume));
