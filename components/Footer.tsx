import { getContent } from "@/content";
import { socials } from "@/content/socials";
import { Monogram } from "@/components/fx/Monogram";
import { IconArrowUp, IconGitHub, IconLinkedIn } from "@/components/ui/Icons";
import { href, htmlLang, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

const BUILD = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-10-25T00:00:00Z");
const YEAR = BUILD.getUTCFullYear();
const edition = (locale: Locale) =>
  new Intl.DateTimeFormat(htmlLang[locale], { month: "long", year: "numeric", timeZone: "UTC" }).format(BUILD);

const ICONS = { github: IconGitHub, linkedin: IconLinkedIn } as const;

/** The footer: site details laid out like a book's colophon, quick links and networks. */
export default function Footer({ locale }: { locale: Locale }) {
  const { navChapters, profile } = getContent(locale);
  const t = messages[locale].footer;
  const rows: [string, string][] = [
    [t.author, profile.fullName],
    [t.updated, edition(locale)],
    [t.location, `${profile.city}, ${profile.region}, ${profile.country}`],
    [t.typography, "Shippori Mincho B1 · Zen Kaku Gothic New · JetBrains Mono · Klee One"],
    [t.technology, "Next.js · TypeScript · Tailwind CSS"],
    [t.status, t.statusValue(profile.studies.degree)],
  ];

  return (
    <footer id="footer" aria-labelledby="footer-titulo" className="border-ink bg-paper-2/60 border-t">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <h2 id="footer-titulo" className="font-display text-[1.6rem] font-bold">
            {t.heading}
          </h2>
          <p className="font-display mt-6 text-xl font-bold">
            {profile.displayName} — {profile.role}
          </p>
          <dl className="mt-4 max-w-2xl text-[0.92rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2 py-1">
                <dt className="text-ink-soft shrink-0 font-mono text-[0.78rem] tracking-[0.08em] uppercase">{k}</dt>
                <span className="leader" aria-hidden="true" />
                <dd className="max-w-[65%] text-right text-pretty">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
          <nav aria-label={t.sections}>
            <p className="text-folio text-ink-soft font-mono tracking-[0.2em] uppercase">{t.sections}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {navChapters.map((c) => (
                <li key={c.id}>
                  <a href={href(locale, `#${c.id}`)} className="hover:text-vermilion inline-flex min-h-10 items-center text-[0.92rem]">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex gap-2" aria-label={t.networks}>
            {socials.map((s) => {
              const Icon = ICONS[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-rule hover:border-vermilion hover:text-vermilion inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-200"
                  >
                    <Icon />
                    <span className="sr-only">
                      {s.label} {messages[locale].newTab}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-rule border-t">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6 text-[0.88rem] sm:px-6 lg:px-10">
          <Monogram className="size-8" />
          <p>
            © {YEAR} {profile.displayName}
          </p>
          <p className="text-ink-soft">{t.madeWith}</p>
          <a href={href(locale, "#inicio")} className="hover:text-vermilion ml-auto inline-flex min-h-11 items-center gap-2 font-medium">
            <IconArrowUp />
            {t.backTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
