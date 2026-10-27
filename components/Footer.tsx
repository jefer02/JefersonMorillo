import { navChapters } from "@/content/chapters";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { Monogram } from "@/components/fx/Monogram";
import { IconArrowUp, IconGitHub, IconLinkedIn } from "@/components/ui/Icons";

const BUILD = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-10-25T00:00:00Z");
const YEAR = BUILD.getUTCFullYear();
const EDITION = new Intl.DateTimeFormat("es-CO", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(BUILD);

const ICONS = { github: IconGitHub, linkedin: IconLinkedIn } as const;

/** The colophon (奥付): publication details, like the last page of a light novel. */
export default function Footer() {
  const rows: [string, string][] = [
    ["Título completo", profile.longTitle],
    ["Autor", profile.fullName],
    ["Edición", `1.ª edición, ${EDITION}`],
    ["Origen", `${profile.birthplace}, ${profile.region}`],
    ["Impreso en", `${profile.city}, ${profile.region}, ${profile.country}`],
    ["Tipografía", "Shippori Mincho B1 · Zen Kaku Gothic New · JetBrains Mono · Klee One"],
    ["Tecnología", "Next.js · TypeScript · Tailwind CSS"],
    ["Estado", `Actualmente estudiando ${profile.studies.degree} — ${profile.studies.universityShort} ${profile.studies.campus}`],
  ];

  return (
    <footer id="footer" aria-labelledby="colofon-titulo" className="border-ink bg-paper-2/60 border-t">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <div className="flex items-baseline gap-4">
            <h2 id="colofon-titulo" className="font-display text-[1.6rem] font-bold">
              <ruby>
                Pie de página
                <rp> (</rp>
                <rt>Colofón</rt>
                <rp>)</rp>
              </ruby>
            </h2>
            <span aria-hidden="true" className="font-cjk text-vermilion text-xl">
              奥付
            </span>
          </div>
          <p className="font-display mt-6 text-xl font-bold">
            {profile.seriesTitle} — {profile.volume}
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
          <nav aria-label="Enlaces rápidos">
            <p className="text-folio text-ink-soft font-mono tracking-[0.2em] uppercase">Capítulos</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {navChapters.map((c) => (
                <li key={c.id}>
                  <a href={`/#${c.id}`} className="hover:text-vermilion inline-flex min-h-10 items-center text-[0.92rem]">
                    {c.name === "Experiencia académica y laboral" ? "Experiencia" : c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex gap-2" aria-label="Redes profesionales">
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
                    <span className="sr-only">{s.label} (se abre en otra pestaña)</span>
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
          <p className="text-ink-soft">Hecho con Next.js + Tailwind CSS</p>
          <a href="#inicio" className="hover:text-vermilion ml-auto inline-flex min-h-11 items-center gap-2 font-medium">
            <IconArrowUp />
            Volver a la portada
          </a>
        </div>
      </div>
    </footer>
  );
}
