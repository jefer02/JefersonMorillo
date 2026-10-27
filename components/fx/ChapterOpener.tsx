import type { Chapter } from "@/types";

const KANJI_NUMERALS = ["", "一", "二", "三", "四", "五", "六", "七", "八"];
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function kanjiChapter(numeral: string) {
  const n = ROMAN.indexOf(numeral);
  return n > 0 ? `第${KANJI_NUMERALS[n]}章` : "";
}

type Props = {
  chapter: Chapter;
  headingId: string;
  lede?: string;
  /** Light text for chapters on the wood insert. */
  tone?: "paper" | "wood";
  className?: string;
};

/**
 * Chapter-opener page: chapter numeral (roman + vertical kanji), the plain heading
 * with its themed name as ruby, and the folio in the corner like a printed book.
 */
export function ChapterOpener({ chapter, headingId, lede, tone = "paper", className = "" }: Props) {
  const soft = tone === "wood" ? "text-wood-ink/75" : "text-ink-soft";
  return (
    <header className={`relative grid grid-cols-[1fr_auto] gap-x-6 ${className}`}>
      <div className="min-w-0">
        <p className={`text-folio mb-5 flex items-center gap-3 font-mono tracking-[0.2em] uppercase ${soft}`}>
          <span>Capítulo {chapter.numeral}</span>
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
          <span aria-hidden="true">— {chapter.folio} —</span>
        </p>
        <h2
          id={headingId}
          className={`font-display text-chapter leading-[1.08] font-bold tracking-[-0.02em] text-balance ${tone === "wood" ? "[&_rt]:text-gold" : ""}`}
        >
          <ruby>
            {chapter.name}
            <rp> (</rp>
            <rt>{chapter.ruby}</rt>
            <rp>)</rp>
          </ruby>
        </h2>
        {lede && <p className={`text-lede mt-6 max-w-[60ch] leading-relaxed text-pretty ${soft}`}>{lede}</p>}
      </div>
      <p
        aria-hidden="true"
        className={`vertical font-cjk text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] leading-none tracking-[0.25em] select-none ${
          tone === "wood" ? "text-gold" : "text-vermilion"
        }`}
      >
        {kanjiChapter(chapter.numeral)}
        {chapter.kanji && <span className="mt-4 block text-[0.55em] tracking-[0.3em]">{chapter.kanji}</span>}
      </p>
    </header>
  );
}
