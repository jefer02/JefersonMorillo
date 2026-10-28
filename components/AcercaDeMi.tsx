import { chapterById } from "@/content/chapters";
import { Island } from "@/components/system/Island";
import { presentation, quickFacts, shelf, sideStories } from "@/content/about";
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
  const facts = quickFacts.filter((f) => !(isProd && isTodo(f.value)));

  return (
    <section id="acerca-de-mi" aria-labelledby="acerca-de-mi-titulo">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="acerca-de-mi-titulo" />

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            {/* Presentation paragraph (required by the course) */}
            <p className="font-display text-[clamp(1.15rem,1.05rem+0.45vw,1.4rem)] leading-[1.55] font-semibold text-pretty">
              <Text value={presentation} />
            </p>

            <dl className="border-rule mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-5 text-[0.92rem]">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-ink-soft text-[0.8rem]">{f.label}</dt>
                  <dd className="font-medium">
                    <Text value={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The shelf */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-[1.25rem] font-bold">Mi estante</h3>
            <p className="text-ink-soft mt-1 text-[0.95rem]">Las historias que me acompañan.</p>
            <div className="mt-4">
              <Island>
                <Shelf books={shelf} />
              </Island>
            </div>
          </div>
        </div>

        {/* Side stories (外伝): small, scannable cards */}
        <Reveal as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {stories.map((story, i) => (
            <li
              key={story.id}
              className="reveal-item bg-paper-2 flex items-start gap-3.5 rounded-[4px] px-4 py-3.5"
              style={{ ["--i" as string]: i }}
            >
              <StoryGlyph glyph={story.glyph} className="text-vermilion mt-0.5 size-7 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-display leading-snug font-bold">
                  <Text value={story.title} />
                </h3>
                <p className="text-ink-soft mt-0.5 text-[0.9rem] leading-snug">
                  <Text value={story.body} />
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
