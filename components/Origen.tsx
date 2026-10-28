import { chapterById } from "@/content/chapters";
import { origin } from "@/content/extras";
import { ChapterOpener } from "@/components/fx/ChapterOpener";

function Place({ id, label, place, copy }: { id: string; label: string; place: string; copy: string[] }) {
  return (
    <article aria-labelledby={id}>
      <p className="text-folio text-ink-soft font-mono tracking-[0.2em] uppercase">{label}</p>
      <h3 id={id} className="font-display mt-1.5 text-[clamp(1.35rem,1.2rem+0.6vw,1.75rem)] leading-tight font-bold">
        {place}
      </h3>
      {copy.map((p) => (
        <p key={p} className="text-ink-soft mt-2.5 max-w-[52ch] leading-relaxed text-pretty">
          {p}
        </p>
      ))}
    </article>
  );
}

/**
 * Chapter I, text only: where he was born and where he studies, joined by a thin
 * typographic route, with the three heritage facts of Pasto in one row below.
 */
export default function Origen() {
  const chapter = chapterById["origen"];
  return (
    <section id="origen" aria-labelledby="origen-titulo" className="border-rule border-b">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="origen-titulo" />

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-10 lg:gap-14">
          <Place id="origen-contadero" {...origin.home} />

          {/* The route between the two places: a hairline and an arrow, nothing drawn. */}
          <p
            aria-hidden="true"
            className="text-ink-soft flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase md:mt-9 md:self-start"
          >
            <span className="bg-rule h-px w-8 md:w-14" />
            <span className="text-vermilion">→</span>
          </p>

          <Place id="origen-pasto" {...origin.city} />
        </div>

        <dl className="border-rule mt-10 grid gap-4 border-t pt-6 sm:grid-cols-3 sm:gap-8">
          {origin.facts.map((fact) => (
            <div key={fact.id}>
              <dt className="font-display leading-snug font-bold">{fact.title}</dt>
              <dd className="text-ink-soft mt-0.5 text-[0.9rem] leading-snug">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
