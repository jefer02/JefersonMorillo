import { chapterById } from "@/content/chapters";
import { Island } from "@/components/system/Island";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { ContactForm } from "@/components/fx/ContactForm";
import { CopyEmail } from "@/components/fx/CopyEmail";
import { IconGitHub, IconLinkedIn } from "@/components/ui/Icons";

const ICONS = { github: IconGitHub, linkedin: IconLinkedIn } as const;

/** Chapter VIII, "Continuará…": the cliffhanger. Email in full, tech networks, and the form. */
export default function Contacto() {
  const chapter = chapterById["contacto"];
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="border-ink border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="contacto-titulo" lede="¿Escribimos juntos el próximo volumen?" />

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="text-folio text-ink-soft font-mono tracking-[0.2em] uppercase">Correo electrónico</h3>
            <p className="mt-3">
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-ink decoration-vermilion hover:text-vermilion text-[clamp(1.15rem,0.9rem+1.1vw,1.6rem)] font-bold break-all underline decoration-2 underline-offset-[0.25em]"
              >
                {profile.email}
              </a>
            </p>
            <div className="mt-4">
              <Island>
                <CopyEmail email={profile.email} />
              </Island>
            </div>

            <h3 className="text-folio text-ink-soft mt-10 font-mono tracking-[0.2em] uppercase">En la red</h3>
            <ul className="mt-3 grid gap-1">
              {socials.map((s) => {
                const Icon = ICONS[s.id];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-vermilion inline-flex min-h-11 items-center gap-3 font-medium"
                    >
                      <Icon />
                      {s.label}
                      <span className="text-ink-soft font-mono text-[0.8rem] font-normal">{s.handle}</span>
                      <span className="sr-only">(se abre en otra pestaña)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="text-ink-soft mt-10 max-w-[34ch] text-[0.92rem] leading-relaxed">
              Desde {profile.city}, {profile.region}. Respondo a oportunidades laborales, proyectos y colaboraciones.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Island>
              <ContactForm email={profile.email} />
            </Island>
          </div>
        </div>
      </div>
    </section>
  );
}
