import { chapterById } from "@/content/chapters";
import { Island } from "@/components/system/Island";
import { presentation, quickFacts, shelf, sideStories } from "@/content/about";
import { profile } from "@/content/profile";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { Reveal } from "@/components/fx/Reveal";
import { Shelf } from "@/components/fx/Shelf";
import { StoryGlyph } from "@/components/fx/StoryGlyph";
import { Text } from "@/components/ui/Todo";
import { isProd, isTodo } from "@/lib/todo";

/** Chapter II: life outside software engineering only. */
export default function AcercaDeMi() {
  const chapter = chapterById["acerca-de-mi"];
  const stories = sideStories.filter((s) => !(isProd && (isTodo(s.title) || isTodo(s.body))));

  return (
    <section id="acerca-de-mi" aria-labelledby="acerca-de-mi-titulo" className="relative">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="acerca-de-mi-titulo" />

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* Presentation paragraph (required by the course) */}
          <div className="lg:col-span-7">
            <p className="font-display first-letter:font-display first-letter:text-vermilion text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.55] font-semibold text-pretty first-letter:float-left first-letter:mr-2 first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:font-extrabold">
              <Text value={presentation} />
            </p>
          </div>

          {/* Character sheet, like the profile page at the start of a light novel */}
          <aside aria-labelledby="ficha-titulo" className="border-ink/80 self-start border p-5 sm:p-6 lg:col-span-4 lg:col-start-9">
            <div className="border-ink/80 flex items-baseline justify-between border-b pb-3">
              <h3 id="ficha-titulo" className="font-display text-[1.15rem] font-bold">
                Ficha del protagonista
              </h3>
              <span className="text-folio text-ink-soft font-mono tracking-[0.2em] uppercase">Vol. 1</span>
            </div>
            <dl className="mt-3 text-[0.95rem]">
              <div className="flex items-baseline gap-2 py-1.5">
                <dt className="text-ink-soft shrink-0">Nombre</dt>
                <span className="leader" aria-hidden="true" />
                <dd className="text-right font-medium">{profile.displayName}</dd>
              </div>
              {quickFacts.map((f) =>
                isProd && isTodo(f.value) ? null : (
                  <div key={f.label} className="flex items-baseline gap-2 py-1.5">
                    <dt className="text-ink-soft shrink-0">{f.label}</dt>
                    <span className="leader" aria-hidden="true" />
                    <dd className="text-right font-medium">
                      <Text value={f.value} />
                    </dd>
                  </div>
                ),
              )}
            </dl>
          </aside>
        </div>

        {/* Side stories (外伝), styled as insert pages */}
        <Reveal as="ol" className="mt-20 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-4">
          {stories.map((story, i) => (
            <li
              key={story.id}
              className={`reveal-item bg-paper-2 relative p-6 shadow-[0_18px_40px_-28px_oklch(0.2_0.02_50/0.45)] sm:p-8 ${
                i % 2 === 1 ? "md:translate-y-14" : ""
              }`}
              style={{ ["--i" as string]: i }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 size-7 bg-[linear-gradient(225deg,var(--paper)_50%,color-mix(in_oklch,var(--ink)_14%,var(--paper-2))_50%)]"
              />
              <div className="flex items-start gap-5">
                <StoryGlyph glyph={story.glyph} className="text-vermilion size-12 shrink-0" />
                <div>
                  <h3 className="font-display text-[1.2rem] leading-snug font-bold">
                    <Text value={story.title} />
                  </h3>
                  <p className="text-ink-soft mt-2.5 leading-relaxed">
                    <Text value={story.body} />
                  </p>
                </div>
              </div>
              <p aria-hidden="true" className="text-folio text-ink-soft mt-6 text-right font-mono">
                — {chapter.folio + 2 + i} —
              </p>
            </li>
          ))}
        </Reveal>

        {/* The shelf */}
        <div className="mt-24 grid gap-8 md:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="font-display text-[1.5rem] font-bold">Mi estante</h3>
            <p className="text-ink-soft mt-3 max-w-[40ch] leading-relaxed">
              Las historias que me acompañan: romance, acción, fantasía e isekai.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Island>
              <Shelf books={shelf} />
            </Island>
          </div>
        </div>
      </div>
    </section>
  );
}
