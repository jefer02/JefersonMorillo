"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatRange, yearOf } from "@/lib/experience";
import { isProd, isRealLink, isTodo } from "@/lib/todo";
import type { ExperienceEntry, ExperienceKind } from "@/types";
import { Text } from "@/components/ui/Todo";
import { IconArrowUpRight } from "@/components/ui/Icons";

const KIND: Record<ExperienceKind, string> = { academico: "Académico", laboral: "Laboral", proyecto: "Proyecto" };
const FILTERS: { id: "todo" | ExperienceKind; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "academico", label: "Académico" },
  { id: "laboral", label: "Laboral" },
  { id: "proyecto", label: "Proyectos" },
];

function KindGlyph({ kind }: { kind: ExperienceKind }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      {kind === "academico" && (
        <g {...p}>
          <path d="M2 9 12 4l10 5-10 5Z" />
          <path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" />
        </g>
      )}
      {kind === "laboral" && (
        <g {...p}>
          <rect x="3" y="7" width="18" height="13" rx="1.5" />
          <path d="M8.5 7V4.5h7V7M3 12.5h18" />
        </g>
      )}
      {kind === "proyecto" && (
        <g {...p}>
          <path d="M5 4h10l4 4v12H5Z" />
          <path d="M15 4v4h4M8.5 13h7M8.5 16.5h5" />
        </g>
      )}
    </svg>
  );
}

/** Decorative clock whose hand turns counter-clockwise as the reader goes back in time. */
function RewindClock({ turn }: { turn: number }) {
  return (
    <svg viewBox="-50 -50 100 100" className="size-full" aria-hidden="true">
      <circle r="47" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="0"
          y1={i % 3 ? -38 : -35}
          x2="0"
          y2="-41"
          stroke="currentColor"
          strokeWidth={i % 3 ? 0.8 : 1.6}
          transform={`rotate(${i * 30})`}
        />
      ))}
      <g style={{ transform: `rotate(${-turn * 720}deg)`, transition: "transform 120ms linear" }}>
        <line x1="0" y1="4" x2="0" y2="-34" stroke="var(--vermilion)" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g style={{ transform: `rotate(${-turn * 60}deg)`, transition: "transform 120ms linear" }}>
        <line x1="0" y1="3" x2="0" y2="-22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <circle r="2.6" fill="var(--vermilion)" />
    </svg>
  );
}

type Props = { entries: ExperienceEntry[]; projectTitles: Record<string, string> };

/**
 * The chronicle told from the latest save point backwards (entries arrive already
 * sorted newest → oldest). Filters work after hydration; without JS every entry shows.
 */
export function Chronicle({ entries, projectTitles }: Props) {
  const visible = entries.filter((e) => !(isProd && (isTodo(e.title) || isTodo(e.organization))));
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("todo");
  const [year, setYear] = useState(visible[0] ? yearOf(visible[0]) : "");
  const [reached, setReached] = useState<Set<string>>(new Set());
  const [turn, setTurn] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  const shown = visible.filter((e) => filter === "todo" || e.kind === filter);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-entry]"));
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (!r.isIntersecting) continue;
          const el = r.target as HTMLElement;
          setYear(el.dataset.year ?? "");
          setReached((prev) => (prev.has(el.dataset.entry!) ? prev : new Set(prev).add(el.dataset.entry!)));
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    items.forEach((i) => io.observe(i));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = list.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / r.height));
        setTurn(progress);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [filter]);

  const counts = (id: string) => (id === "todo" ? visible.length : visible.filter((e) => e.kind === id).length);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-6 lg:sticky lg:top-28 lg:block">
          <div className="text-ink-soft size-20 sm:size-24 lg:size-40">
            <RewindClock turn={turn} />
          </div>
          <p
            aria-hidden="true"
            className="font-display text-vermilion text-[clamp(3rem,2rem+4vw,6rem)] leading-none font-extrabold tracking-[-0.03em] tabular-nums lg:mt-6"
          >
            {year}
          </p>
          <p className="text-ink-soft mt-3 hidden max-w-[28ch] text-[0.9rem] lg:block">
            Ordenado del punto de guardado más reciente al más antiguo.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div role="group" aria-label="Filtrar experiencia" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const n = counts(f.id);
            if (f.id !== "todo" && n === 0) return null;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.88rem] transition-colors duration-200 ${
                  filter === f.id ? "border-ink bg-ink text-paper" : "border-rule hover:border-vermilion hover:text-vermilion"
                }`}
              >
                {f.id !== "todo" && <KindGlyph kind={f.id} />}
                {f.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Mostrando {shown.length} {shown.length === 1 ? "entrada" : "entradas"}
        </p>
        <ol ref={listRef} className="border-rule relative mt-10 border-l pl-8 sm:pl-10">
          {shown.map((e) => {
            const lit = reached.has(e.id);
            return (
              <li key={e.id} data-entry={e.id} data-year={yearOf(e)} className="relative pb-12 last:pb-0">
                {/* Save point on the rail */}
                <span
                  aria-hidden="true"
                  className={`absolute top-1 -left-[calc(2rem+7px)] size-3.5 rotate-45 border transition-[background-color,box-shadow,border-color] duration-500 sm:-left-[calc(2.5rem+7px)] ${
                    lit || e.ongoing
                      ? "border-vermilion bg-vermilion shadow-[0_0_0_5px_color-mix(in_oklch,var(--vermilion)_18%,transparent)]"
                      : "border-ink-soft bg-paper"
                  }`}
                />
                <p className="text-ink-soft flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.75rem] tracking-[0.08em] uppercase">
                  <span className="text-ink inline-flex items-center gap-1.5">
                    <KindGlyph kind={e.kind} />
                    {KIND[e.kind]}
                  </span>
                  <span>{formatRange(e)}</span>
                  {e.place && <span>· {e.place}</span>}
                </p>
                <h3 className="font-display mt-2 text-[1.3rem] leading-snug font-bold">
                  <Text value={e.title} />
                </h3>
                <p className="text-ink-soft mt-1">
                  <Text value={e.organization} />
                </p>
                {e.studying && (
                  <p className="border-jade/45 bg-jade/8 mt-3 inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-[0.8rem] font-medium">
                    <span aria-hidden="true" className="bg-jade motion-safe:animate-gem size-2 rotate-45" />
                    Actualmente estudiando
                  </p>
                )}
                <ul className="mt-3 grid gap-1.5">
                  {e.impact
                    .filter((t) => !(isProd && isTodo(t)))
                    .map((t, i) => (
                      <li key={i} className="leading-relaxed">
                        <Text value={t} />
                      </li>
                    ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.88rem]">
                  {e.projectSlug && (
                    <Link
                      href={`/volumenes/${e.projectSlug}`}
                      className="decoration-rule hover:text-vermilion hover:decoration-vermilion inline-flex min-h-10 items-center gap-1.5 underline"
                    >
                      Ver el volumen {projectTitles[e.projectSlug]}
                    </Link>
                  )}
                  {e.verification &&
                    (isRealLink(e.verification) ? (
                      <a
                        href={e.verification.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-rule hover:text-vermilion inline-flex min-h-10 items-center gap-1.5 underline"
                      >
                        {e.verification.label} <IconArrowUpRight width={14} height={14} />
                        <span className="sr-only"> (se abre en otra pestaña)</span>
                      </a>
                    ) : (
                      !isProd && <Text value={e.verification.todo} />
                    ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
