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
 * Chapter-opener: a small folio line ("Capítulo N", with the kanji numeral as a quiet
 * detail from `md`), the plain heading, and its themed name as a small ruby above it.
 */
export function ChapterOpener({ chapter, headingId, lede, tone = "paper", className = "" }: Props) {
  const soft = tone === "wood" ? "text-wood-ink/75" : "text-ink-soft";
  const kanji = kanjiChapter(chapter.numeral);
  return (
    <header className={`max-w-4xl ${className}`}>
      <p className={`text-folio mb-3 flex items-center gap-3 font-mono tracking-[0.2em] uppercase ${soft}`}>
        <span>Capítulo {chapter.numeral}</span>
        {kanji && (
          <>
            <span aria-hidden="true" className="h-px w-6 bg-current opacity-40 max-md:hidden" />
            <span aria-hidden="true" className="font-cjk text-vermilion/80 tracking-[0.2em] normal-case max-md:hidden">
              {kanji}
            </span>
          </>
        )}
      </p>
      <h2
        id={headingId}
        className={`font-display text-chapter flex leading-[1.08] font-bold tracking-[-0.02em] text-balance ${tone === "wood" ? "[&_rt]:text-wood-ink/70" : ""}`}
      >
        <ruby>
          {chapter.name}
          <rp> (</rp>
          <rt>{chapter.ruby}</rt>
          <rp>)</rp>
        </ruby>
      </h2>
      {lede && <p className={`mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-pretty md:text-[1.125rem] ${soft}`}>{lede}</p>}
    </header>
  );
}
