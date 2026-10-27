import { isTodo } from "@/lib/todo";
import type { ExperienceEntry } from "@/types";

const FAR_FUTURE = "9999-12-31";

/** Pads YYYY-MM to a comparable YYYY-MM-DD. Todo dates sort as unknown (oldest). */
function comparable(date: string | undefined, fallback: string): string {
  if (!date || isTodo(date)) return fallback;
  return date.length === 7 ? `${date}-01` : date;
}

/**
 * Newest → oldest, enforced in code: ongoing entries first, then by end date
 * descending, then by start date descending.
 */
export function sortExperience(entries: ExperienceEntry[]): ExperienceEntry[] {
  return [...entries].sort((a, b) => {
    const endA = a.ongoing ? FAR_FUTURE : comparable(a.end ?? a.start, "0000-01-01");
    const endB = b.ongoing ? FAR_FUTURE : comparable(b.end ?? b.start, "0000-01-01");
    if (endA !== endB) return endA < endB ? 1 : -1;
    const startA = comparable(a.start, "0000-01-01");
    const startB = comparable(b.start, "0000-01-01");
    if (startA !== startB) return startA < startB ? 1 : -1;
    return 0;
  });
}

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function formatMonth(date: string | undefined): string {
  if (!date || isTodo(date)) return "—";
  const [y, m] = date.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

export function formatRange(entry: Pick<ExperienceEntry, "start" | "end" | "ongoing">): string {
  const start = formatMonth(entry.start);
  if (entry.ongoing) return start === "—" ? "Actualidad" : `${start} — Actualidad`;
  const end = formatMonth(entry.end);
  return start === end ? start : `${start} — ${end}`;
}

export function yearOf(entry: ExperienceEntry): string {
  if (entry.ongoing) return "Hoy";
  const d = entry.end ?? entry.start;
  return isTodo(d) ? "—" : d.slice(0, 4);
}
