import { Island } from "@/components/system/Island";
import { chapterById } from "@/content/chapters";
import { origin } from "@/content/extras";
import { AtrizLandscape } from "@/components/fx/AtrizLandscape";
import { ChapterOpener } from "@/components/fx/ChapterOpener";
import { MopaMopaBand } from "@/components/fx/MopaMopaBand";
import { Reveal } from "@/components/fx/Reveal";

/** Small original glyphs for the three heritage captions. */
function FactGlyph({ id }: { id: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 48 48" className="text-gold size-11 shrink-0" aria-hidden="true">
      {id === "carnaval" && (
        // Talc puffs and a serpentine.
        <g {...common}>
          <circle cx="16" cy="18" r="7" />
          <circle cx="26" cy="13" r="5" />
          <circle cx="30" cy="22" r="6" />
          <path d="M6 40 C12 32 18 44 24 36 S36 30 42 38" />
        </g>
      )}
      {id === "barniz" && (
        // Cut sheets laid over each other.
        <g {...common}>
          <path d="M8 34 L20 10 L32 34 Z" />
          <path d="M18 38 L30 16 L42 38 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M6 42 H42" />
        </g>
      )}
      {id === "galeras" && (
        <g {...common}>
          <path d="M4 40 L16 22 L20 20 L22 16 L26 16 L28 20 L32 22 L44 40 Z" />
          <path d="M22 10 C20 7 25 6 23 3 M27 11 C26 8 30 7 28 4" />
        </g>
      )}
    </svg>
  );
}

export default function Origen() {
  const chapter = chapterById["origen"];
  return (
    <section id="origen" aria-labelledby="origen-titulo" className="bg-wood text-wood-ink relative">
      <MopaMopaBand />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-16 sm:px-6 md:pt-24 lg:px-10">
        <ChapterOpener chapter={chapter} headingId="origen-titulo" tone="wood" />
      </div>

      <Island>
        <AtrizLandscape className="mt-6 h-[52vw] md:-mt-32 md:aspect-[1440/640] md:h-auto md:max-h-[44rem] md:w-full lg:-mt-44" />
      </Island>

      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 pt-12 pb-20 sm:px-6 md:pt-16 md:pb-28 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* El Contadero: the emotional center of the chapter */}
        <article aria-labelledby="origen-contadero" className="lg:col-span-7">
          <p className="text-folio text-gold font-mono tracking-[0.2em] uppercase">{origin.home.label}</p>
          <h3 id="origen-contadero" className="font-display mt-2 text-[clamp(1.8rem,1.4rem+1.6vw,2.8rem)] leading-tight font-extrabold">
            {origin.home.place}
          </h3>
          <div className="mt-6 grid gap-5">
            {origin.home.copy.map((p) => (
              <p key={p} className="font-display text-[clamp(1.15rem,1rem+0.7vw,1.55rem)] leading-[1.6] font-semibold text-pretty">
                {p}
              </p>
            ))}
          </div>
        </article>

        {/* San Juan de Pasto: where he studies, with its heritage */}
        <article aria-labelledby="origen-pasto" className="lg:col-span-4 lg:col-start-9">
          <p className="text-folio text-gold font-mono tracking-[0.2em] uppercase">{origin.city.label}</p>
          <h3 id="origen-pasto" className="font-display mt-2 text-[1.6rem] leading-tight font-bold">
            {origin.city.place}
          </h3>
          {origin.city.copy.map((p) => (
            <p key={p} className="text-wood-ink/85 mt-4 leading-relaxed text-pretty">
              {p}
            </p>
          ))}
          <Reveal as="dl" className="mt-8 grid content-start gap-6">
            {origin.facts.map((fact, i) => (
              <div
                key={fact.id}
                className="reveal-item border-wood-ink/20 grid grid-cols-[2.75rem_1fr] gap-x-4 border-t pt-5"
                style={{ ["--i" as string]: i }}
              >
                <dt className="contents">
                  <FactGlyph id={fact.id} />
                  <span className="font-display text-[1.05rem] font-bold">{fact.title}</span>
                </dt>
                <dd className="text-wood-ink/80 col-start-2 mt-1.5 text-[0.92rem] leading-relaxed">{fact.detail}</dd>
              </div>
            ))}
          </Reveal>
        </article>
      </div>

      <MopaMopaBand flip />
    </section>
  );
}
