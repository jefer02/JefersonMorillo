import Link from "next/link";
import { Island } from "@/components/system/Island";
import { getContent } from "@/content";
import { testimonialsReady } from "@/content/testimonials";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { WaxSealLetter } from "@/components/fx/WaxSealLetter";
import { IconArrowRight, IconArrowUpRight } from "@/components/ui/Icons";
import { Initials } from "@/components/ui/Initials";
import { href, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

/**
 * Testimonials, shown as sealed letters. Only real, consented and verified testimonials
 * render, and only once the course minimum is met. Quotes stay in Spanish on both sites.
 */
export default function Testimonios({ locale }: { locale: Locale }) {
  if (!testimonialsReady) return null;
  const { chapterById, testimonials, projectBySlug } = getContent(locale);
  const copy = messages[locale].testimonials;
  const linkClass = "decoration-rule hover:text-vermilion inline-flex min-h-11 items-center gap-1.5 font-medium underline";

  return (
    <section id="testimonios" aria-labelledby="testimonios-titulo" className="border-rule border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapterById["testimonios"]} headingId="testimonios-titulo" lede={copy.lede} />

        <ul className="mt-8 grid gap-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => {
            const project = t.projectSlug ? projectBySlug[t.projectSlug] : undefined;
            return (
              <li key={t.id}>
                <Island>
                  <WaxSealLetter index={i}>
                    <figure className="flex min-h-[22rem] flex-col px-7 pt-14 pb-6">
                      <div className="mb-6">
                        <blockquote lang="es" className="font-display text-[1.15rem] leading-[1.6] font-semibold text-pretty">
                          <p>«{t.quote}»</p>
                        </blockquote>
                        {locale !== "es" && <p className="text-ink-soft mt-3 text-[0.82rem] italic">{copy.original}</p>}
                        {project && (
                          <p className="mt-3">
                            <Link href={href(locale, `/proyectos/${project.slug}${t.review ? "#resena" : ""}`)} className={linkClass}>
                              {t.review ? copy.readReview : copy.viewProject(project.title)}
                              <IconArrowRight width={16} height={16} />
                            </Link>
                          </p>
                        )}
                      </div>
                      <figcaption className="border-rule mt-auto flex items-center gap-3 border-t pt-5">
                        <Initials value={t.initials} />
                        <div className="min-w-0 text-[0.9rem]">
                          <p className="font-display text-[1.05rem] font-bold">{t.name}</p>
                          <p className="text-ink-soft leading-snug">{t.relationship}</p>
                          {t.link && (
                            <a href={t.link} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-1`}>
                              {copy.linkedin} <IconArrowUpRight width={14} height={14} />
                              <span className="sr-only"> {messages[locale].newTab}</span>
                            </a>
                          )}
                        </div>
                      </figcaption>
                    </figure>
                  </WaxSealLetter>
                </Island>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
