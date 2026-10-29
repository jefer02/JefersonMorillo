import { cacheLife } from "next/cache";
import { htmlLang, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

type PushEvent = { type: string; repo: { name: string }; created_at: string };

async function getLatestPush(): Promise<{ repo: string; date: string } | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch("https://api.github.com/users/jefer02/events/public?per_page=30", {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const events = (await res.json()) as PushEvent[];
    const push = events.find((e) => e.type === "PushEvent" && e.repo.name.startsWith("jefer02/"));
    return push ? { repo: push.repo.name.replace("jefer02/", ""), date: push.created_at } : null;
  } catch {
    return null;
  }
}

/** "Última actividad en GitHub": his latest public push. Fails silently. */
export async function LatestSpell({ locale }: { locale: Locale }) {
  const latest = await getLatestPush();
  if (!latest) return null;
  const t = messages[locale];
  const date = new Intl.DateTimeFormat(htmlLang[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(new Date(latest.date));
  return (
    <p className="text-ink-soft inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9rem]">
      <span aria-hidden="true" className="bg-ember size-2 rotate-45" />
      <span className="font-mono text-[0.72rem] tracking-[0.12em] uppercase">{t.skills.latest}</span>
      <a
        href={`https://github.com/jefer02/${latest.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink decoration-rule hover:text-vermilion hover:decoration-vermilion font-medium underline"
      >
        {latest.repo}
        <span className="sr-only"> {t.newTab}</span>
      </a>
      <span>· {date}</span>
    </p>
  );
}
