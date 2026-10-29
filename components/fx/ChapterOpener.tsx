import type { Chapter } from "@/types";

type Props = {
  chapter: Chapter;
  headingId: string;
  lede?: string;
  /** Light text for chapters on the wood insert. */
  tone?: "paper" | "wood";
  className?: string;
};

/** Section opener: a short vermilion rule, the plain heading and an optional lede. */
export function ChapterOpener({ chapter, headingId, lede, tone = "paper", className = "" }: Props) {
  const soft = tone === "wood" ? "text-wood-ink/75" : "text-ink-soft";
  return (
    <header className={`max-w-4xl ${className}`}>
      <span aria-hidden="true" className="bg-vermilion mb-4 block h-0.5 w-10" />
      <h2 id={headingId} className="font-display text-chapter leading-[1.08] font-bold tracking-[-0.02em] text-balance">
        {chapter.name}
      </h2>
      {lede && <p className={`mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-pretty md:text-[1.125rem] ${soft}`}>{lede}</p>}
    </header>
  );
}
