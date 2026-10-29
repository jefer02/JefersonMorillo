import Link from "next/link";
import { getContent } from "@/content";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { Text } from "@/components/ui/Todo";
import { href, type Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { isProd, isTodo } from "@/lib/todo";

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-ink/30 border-t border-dashed pt-5">
      <h3 className="font-hand text-vermilion text-[1.3rem] font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/**
 * "Adicional": a more personal page of notes in a handwritten voice, before the final
 * call to action. Words only, no bars or percentages.
 */
export default function Adicional({ locale }: { locale: Locale }) {
  const { achievements, chapterById, closingLine, curiousFacts, languages, learningNow, passions, profile } = getContent(locale);
  const t = messages[locale].extras;
  const chapter = chapterById["extras"];
  const shownAchievements = achievements.filter((a) => !(isProd && isTodo(a)));

  return (
    <section id="extras" aria-labelledby="extras-titulo" className="border-rule border-t">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="extras-titulo" />

        {/* The afterword page: ruled paper, a narrower measure, a handwritten voice. */}
        <div className="bg-paper-2 relative mx-auto mt-8 max-w-3xl px-6 py-8 shadow-[0_30px_60px_-40px_oklch(0.2_0.02_50/0.5)] sm:px-10 sm:py-10 md:mt-12">
          <p className="font-hand text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] leading-[1.75] font-semibold">{t.intro}</p>

          <div className="mt-8 grid gap-7 sm:grid-cols-2 sm:gap-x-10">
            <Note title={t.languages}>
              <dl className="grid gap-2">
                {languages.map((l) =>
                  isProd && isTodo(l.level) ? null : (
                    <div key={l.name}>
                      <dt className="font-display font-bold">{l.name}</dt>
                      <dd className="text-ink-soft">
                        <Text value={l.level} />
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </Note>

            <Note title={t.learning}>
              <ul className="text-ink-soft grid gap-2">
                {learningNow.map((t) => (
                  <li key={t} className="leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </Note>

            {shownAchievements.length > 0 && (
              <Note title={t.achievements}>
                <ul className="text-ink-soft grid gap-2">
                  {shownAchievements.map((t) => (
                    <li key={t}>
                      <Text value={t} />
                    </li>
                  ))}
                </ul>
              </Note>
            )}

            <Note title={t.facts}>
              <ul className="text-ink-soft grid gap-2">
                {curiousFacts.map((t) => (
                  <li key={t} className="leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </Note>
          </div>

          <section className="border-ink/30 mt-8 border-t border-dashed pt-5">
            <h3 className="font-hand text-vermilion text-[1.3rem] font-semibold">{t.interests}</h3>
            <ul className="mt-4 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {passions.map((p) => (
                <li key={p.id}>
                  <p className="font-display font-bold">{p.title}</p>
                  <p className="text-ink-soft mt-1.5 text-[0.92rem] leading-relaxed">{p.body}</p>
                  <Link
                    href={href(locale, p.link.href.replace(/^\//, ""))}
                    className="decoration-rule hover:text-vermilion hover:decoration-vermilion mt-2 inline-flex min-h-10 items-center text-[0.88rem] underline"
                  >
                    {p.link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <p className="font-hand mt-8 text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] leading-[1.7] font-semibold text-balance">{closingLine}</p>

          <div className="mt-6 flex flex-col items-end text-right">
            <p className="font-hand -rotate-2 text-[2.2rem] leading-none font-semibold">{profile.displayName}</p>
            <span aria-hidden="true" className="bg-ink/40 mt-2 h-px w-40" />
            <p className="text-ink-soft mt-3 text-[0.9rem]">{t.thanks}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
