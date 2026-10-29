"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { useMessages } from "@/lib/i18n/client";
import { isProd, isTodo } from "@/lib/todo";
import type { ShelfBook } from "@/types";
import { Sigil } from "./Sigil";

// Constant in both themes so the spine text keeps AA contrast.
const SPINE: Record<ShelfBook["color"], string> = {
  vermilion: "bg-obi text-obi-ink",
  jade: "bg-[oklch(0.44_0.09_165)] text-obi-ink",
  gold: "bg-barniz-gold text-[oklch(0.25_0.05_70)]",
  turquoise: "bg-[oklch(0.44_0.08_205)] text-obi-ink",
  ember: "bg-[oklch(0.72_0.16_50)] text-[oklch(0.22_0.05_45)]",
  wood: "bg-wood text-wood-ink",
};

const HEIGHTS = ["h-56", "h-48", "h-52", "h-44", "h-[13.5rem]"];
const SPINE_SHADOW = "shadow-[inset_-5px_0_0_oklch(0_0_0/0.12),inset_2px_0_0_oklch(1_0_0/0.15)]";

// Motion. Only transform and opacity are animated.
const LIFT = { duration: 0.22, ease: [0.23, 1, 0.32, 1] } as const;
const FLY = { type: "spring", visualDuration: 0.45, bounce: 0.12 } as const;
const OPEN = { duration: 0.6, ease: [0.3, 0.7, 0.2, 1] } as const;
const CLOSE = { duration: 0.42, ease: [0.45, 0, 0.25, 1] } as const;
const OPEN_ANGLE = -160;
const LIFT_Y = -24;
const LIFT_SCALE = 1.05;

// Stage geometry (px).
const TOP = 24; // space above the book on the stage
const BOTTOM = 68; // room for the close button below it
const COVER = 4; // cover board thickness

/** Book size on the stage for a stage width: the open spread (about 1.95 × W) must fit. */
function geometryFor(width: number) {
  const W = Math.round(Math.min(190, Math.max(120, (width - 24) / 1.95)));
  // The cover swings to the left of the spine; shifting the book right centers the spread.
  return { W, H: Math.round(W * 1.42), shift: Math.round(W * 0.47) };
}

const takeOf = (book: ShelfBook) => (isTodo(book.take) ? (isProd ? "" : book.take) : book.take);
const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

type Geometry = { index: number; depth: number; startScale: number };
type BookValues = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  z: MotionValue<number>;
  scale: MotionValue<number>;
  rotateY: MotionValue<number>;
};

/**
 * His favorite anime and light novels as book spines: titles in text only, original
 * colors and type, no official art.
 *
 * Choosing a spine pulls it up and forward (the others dim), then the book flies to the
 * stage below the shelf, turning from spine to front cover, and its cover swings open on
 * a real 3D hinge to show the genre, the title and his take. Esc, a click outside or the
 * same spine closes it in reverse; picking another book closes the open one first.
 * Reduced motion: no movement, the page simply crossfades. Without JavaScript a plain
 * list carries the same text.
 */
export function Shelf({ books }: { books: ShelfBook[] }) {
  const visible = books.filter((b) => !(isProd && isTodo(b.title)));
  const t = useMessages().shelf;
  const reduce = useReducedMotion();
  const panelId = useId();

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const spineRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // What the reader asked for, and what is on stage. A small queue reconciles the two.
  const [target, setTarget] = useState<number | null>(null);
  const targetRef = useRef<number | null>(null);
  const shownRef = useRef<number | null>(null);
  const running = useRef(false);

  const [lifted, setLifted] = useState<number | null>(null);
  const [spineHidden, setSpineHidden] = useState(false);
  const [book, setBook] = useState<Geometry | null>(null);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(360);
  const widthRef = useRef(360);
  // The book is laid out at its stage size; on the shelf it is a uniform scale of itself.
  const { W, H } = geometryFor(width);

  const liftY = useMotionValue(0);
  const liftScale = useMotionValue(1);
  const liftShadow = useMotionValue(0);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const bz = useMotionValue(0);
  const bs = useMotionValue(1);
  const bry = useMotionValue(90);
  const cover = useMotionValue(0);
  const floorShadow = useMotionValue(0);
  const floorSpread = useMotionValue(1);
  const values: BookValues = { x: bx, y: by, z: bz, scale: bs, rotateY: bry };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([entry]) => {
      widthRef.current = entry.contentRect.width;
      setWidth(entry.contentRect.width);
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  /** Where the book must be (relative to its stage spot) to sit exactly over spine `i`, edge-on. */
  function spinePose(i: number) {
    const spine = spineRefs.current[i]!.getBoundingClientRect();
    const stage = stageRef.current!.getBoundingClientRect();
    const { W, H } = geometryFor(widthRef.current);
    const startScale = spine.height / H;
    return {
      startScale,
      depth: spine.width / startScale,
      x: spine.left + spine.width / 2 - (stage.left + stage.width / 2),
      y: spine.top + spine.height / 2 - (stage.top + TOP + H / 2),
      // Turned 90°, the spine face sits W/2 in front of the book's center: pull it back to z = 0.
      z: (-W * startScale) / 2,
    };
  }

  async function openBook(i: number) {
    if (reduce) {
      setLifted(i);
      setOpen(true);
      return;
    }
    setLifted(i);
    await frame();
    await Promise.all([animate(liftY, LIFT_Y, LIFT), animate(liftScale, LIFT_SCALE, LIFT), animate(liftShadow, 1, LIFT)]);

    const pose = spinePose(i);
    bx.set(pose.x);
    by.set(pose.y);
    bz.set(pose.z);
    bs.set(pose.startScale);
    bry.set(90);
    cover.set(0);
    floorShadow.set(0);
    floorSpread.set(1);
    // Swap the shelf spine for the 3D book in the same frame.
    setBook({ index: i, depth: pose.depth, startScale: pose.startScale });
    setSpineHidden(true);
    await frame();

    await Promise.all([
      animate(bx, 0, FLY),
      animate(by, 0, FLY),
      animate(bz, 0, FLY),
      animate(bs, 1, FLY),
      animate(bry, 0, FLY),
      animate(floorShadow, 1, { duration: 0.45 }),
    ]);
    await Promise.all([
      animate(cover, OPEN_ANGLE, OPEN),
      animate(bx, geometryFor(widthRef.current).shift, OPEN),
      animate(floorSpread, 1.8, OPEN),
    ]);
    setOpen(true);
  }

  async function closeBook(i: number) {
    const hadFocus = !!stageRef.current?.contains(document.activeElement);
    setOpen(false);
    if (!reduce) {
      await Promise.all([animate(cover, 0, CLOSE), animate(bx, 0, CLOSE), animate(floorSpread, 1, CLOSE)]);
      const pose = spinePose(i);
      await Promise.all([
        animate(bx, pose.x, FLY),
        animate(by, pose.y, FLY),
        animate(bz, pose.z, FLY),
        animate(bs, pose.startScale, FLY),
        animate(bry, 90, FLY),
        animate(floorShadow, 0, { duration: 0.3 }),
      ]);
      setSpineHidden(false);
      setBook(null);
      await frame();
      await Promise.all([animate(liftY, 0, LIFT), animate(liftScale, 1, LIFT), animate(liftShadow, 0, LIFT)]);
    }
    setLifted(null);
    if (hadFocus) spineRefs.current[i]?.focus({ preventScroll: true });
  }

  async function settle() {
    if (running.current) return;
    running.current = true;
    try {
      while (shownRef.current !== targetRef.current) {
        if (shownRef.current !== null) {
          await closeBook(shownRef.current);
          shownRef.current = null;
        } else {
          const next = targetRef.current!;
          shownRef.current = next;
          await openBook(next);
          if (targetRef.current === next) {
            await frame(); // the close button renders once `open` commits
            closeRef.current?.focus({ preventScroll: true });
          }
        }
      }
    } finally {
      running.current = false;
    }
  }

  function request(next: number | null) {
    targetRef.current = next;
    setTarget(next);
    void settle();
  }

  // Esc and a click outside the shelf close the book.
  useEffect(() => {
    if (target === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") request(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) request(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `request` only writes refs and state
  }, [target]);

  const current = lifted !== null ? visible[lifted] : null;

  return (
    <div ref={rootRef} className="flex flex-col gap-5">
      <ul className="border-ink relative z-10 flex shrink-0 items-end gap-2 border-b-[3px] px-1 pt-8" aria-label={t.label}>
        {visible.map((b, i) => {
          const selected = lifted === i;
          const dimmed = lifted !== null && !selected;
          return (
            <li key={b.title} className={`relative transition-opacity duration-300 ${dimmed ? "opacity-55" : "opacity-100"}`}>
              {/* The soft shadow the lifted book casts on the shelf. */}
              <motion.span
                aria-hidden="true"
                style={{ opacity: selected ? liftShadow : 0 }}
                className="pointer-events-none absolute inset-x-[-6px] -bottom-1.5 h-3 rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.15_0.02_50/0.45),transparent)]"
              />
              <motion.button
                ref={(el) => {
                  spineRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={target === i}
                aria-controls={panelId}
                onClick={() => request(targetRef.current === i ? null : i)}
                style={selected ? { y: liftY, scale: liftScale, opacity: spineHidden ? 0 : 1 } : undefined}
                className={`relative flex w-12 items-center justify-center rounded-t-[3px] ${SPINE_SHADOW} ${SPINE[b.color]} ${
                  HEIGHTS[i % HEIGHTS.length]
                } ${lifted === null ? "transition-[translate] duration-200 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0" : ""}`}
              >
                <SpineText title={isTodo(b.title) ? t.pending : b.title} />
              </motion.button>
            </li>
          );
        })}
      </ul>

      {/* The stage. Without JavaScript it stays hidden and the list below carries the text. */}
      <div ref={stageRef} className="js:block relative z-20 hidden w-full" style={{ height: TOP + H + BOTTOM, perspective: 1200 }}>
        <span aria-hidden="true" className="bg-rule absolute inset-x-0 h-px" style={{ top: TOP + H + 8 }} />
        <p
          className={`text-ink-soft absolute inset-x-0 px-4 text-center text-[0.92rem] leading-relaxed transition-opacity duration-300 ${
            lifted === null ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: TOP + H / 2 - 12 }}
        >
          {t.hint}
        </p>

        {/* Rendered in every mode (invisible until a book lands) so server and client markup match. */}
        <motion.span
          aria-hidden="true"
          // Centered under the book while closed and under the whole spread once open.
          style={{ opacity: floorShadow, scaleX: floorSpread, width: W * 1.15, left: `calc(50% - ${(W * 1.15) / 2}px)`, top: TOP + H - 4 }}
          className="pointer-events-none absolute h-5 rounded-[50%] bg-[radial-gradient(closest-side,oklch(0.15_0.02_50/0.4),transparent)]"
        />

        {!reduce && book && current && <Book3D b={current} geometry={book} W={W} H={H} values={values} cover={cover} />}

        {/* Reduced motion: the page crossfades in place. */}
        {reduce && (
          <AnimatePresence initial={false}>
            {current && (
              <motion.div
                key={current.title}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: TOP, width: Math.min(W * 1.8, 340), height: H }}
              >
                <InnerPage b={current} fontSize={14} tone="theme" className="bg-paper-2 ring-rule size-full rounded-[3px] ring-1" />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {open && (
          <button
            ref={closeRef}
            type="button"
            onClick={() => request(null)}
            className="border-rule hover:border-vermilion hover:text-vermilion absolute left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full border px-4 text-[0.88rem] transition-colors duration-200"
            style={{ top: TOP + H + 20 }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
            {t.close}
          </button>
        )}

        {/* What screen readers hear; the 3D book itself is decorative. */}
        <div id={panelId} aria-live="polite" className="sr-only">
          {open && current && `${t.opened} ${current.title}. ${current.genre}. ${takeOf(current)}`}
        </div>
      </div>

      <dl className="js:hidden grid gap-3 text-[0.92rem]">
        {visible.map((b) => (
          <div key={b.title}>
            <dt className="font-display font-bold">
              {b.title} <span className="text-ink-soft font-sans font-normal">· {b.genre}</span>
            </dt>
            <dd className="text-ink-soft">{takeOf(b)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** The spine's vertical title between two rules, shared by the shelf and the 3D book. */
function SpineText({ title, scale = 1 }: { title: string; scale?: number }) {
  const long = title.length > 22;
  const rule = { top: 12 * scale, width: 24 * scale, height: Math.max(1, scale) };
  return (
    <>
      <span
        className="absolute inset-x-0 mx-auto bg-current opacity-60"
        style={{ top: rule.top, width: rule.width, height: rule.height }}
        aria-hidden="true"
      />
      <span
        className="vertical font-display font-bold"
        style={{
          fontSize: (long ? 11.2 : 15.2) * scale,
          letterSpacing: long ? "0.02em" : "0.04em",
          lineHeight: long ? 1.25 : 1,
          maxHeight: `calc(100% - ${36 * scale}px)`,
        }}
      >
        {title}
      </span>
      <span
        className="absolute inset-x-0 mx-auto bg-current opacity-60"
        style={{ bottom: rule.top, width: rule.width, height: rule.height }}
        aria-hidden="true"
      />
    </>
  );
}

/** The first page: genre, title and his take. */
// The 3D page is a physical object: printed ink on cream in both themes. The reduced-motion
// card is interface, so it follows the theme.
const PAGE_TONE = {
  book: { text: "text-[oklch(0.2_0.015_50)]", soft: "text-[oklch(0.42_0.02_50)]", rule: "bg-[oklch(0.53_0.19_30)]" },
  theme: { text: "text-ink", soft: "text-ink-soft", rule: "bg-vermilion" },
};

function InnerPage({
  b,
  fontSize,
  tone,
  className = "",
}: {
  b: ShelfBook;
  fontSize: number;
  tone: keyof typeof PAGE_TONE;
  className?: string;
}) {
  const take = takeOf(b);
  const c = PAGE_TONE[tone];
  return (
    <div className={`flex flex-col px-[11%] py-[13%] ${c.text} ${className}`} style={{ fontSize }}>
      <p className={`font-mono text-[0.72em] tracking-[0.14em] uppercase ${c.soft}`}>{b.genre}</p>
      <p className="font-display mt-[0.6em] text-[1.25em] leading-[1.15] font-bold text-balance">{b.title}</p>
      <span aria-hidden="true" className={`mt-[0.9em] block h-px w-[2.2em] ${c.rule}`} />
      {take && <p className="mt-[0.9em] leading-[1.5] text-pretty">«{take}»</p>}
    </div>
  );
}

const face = "absolute [backface-visibility:hidden]";

/**
 * A book as a CSS 3D box: front cover hinged on the spine, inner page, page edges, spine
 * and back cover. Built at its stage size; on the shelf it is a uniform scale of itself.
 */
function Book3D({
  b,
  geometry,
  W,
  H,
  values,
  cover,
}: {
  b: ShelfBook;
  geometry: Geometry;
  W: number;
  H: number;
  values: BookValues;
  cover: MotionValue<number>;
}) {
  const D = geometry.depth;
  const pages = D - 2 * COVER;
  const color = SPINE[b.color];
  const full = { top: 0, left: 0, width: W, height: H };

  return (
    <motion.div
      aria-hidden="true"
      className="absolute [transform-style:preserve-3d]"
      style={{ left: `calc(50% - ${W / 2}px)`, top: TOP, width: W, height: H, ...values }}
    >
      {/* Back cover */}
      <div className={`${face} ${color} rounded-[2px]`} style={{ ...full, transform: `rotateY(180deg) translateZ(${D / 2}px)` }} />

      {/* Spine (left face): matches the shelf spine exactly at the start of the flight */}
      <div
        className={`${face} ${color} ${SPINE_SHADOW} flex items-center justify-center rounded-t-[3px]`}
        style={{ top: 0, height: H, width: D, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }}
      >
        <SpineText title={b.title} scale={1 / geometry.startScale} />
      </div>

      {/* Page edges: fore-edge, top and bottom */}
      <div
        className={`${face} bg-[repeating-linear-gradient(90deg,oklch(0.96_0.012_85)_0_2px,oklch(0.86_0.015_80)_2px_3px)]`}
        style={{ top: 2, height: H - 4, width: pages, left: (W - pages) / 2, transform: `rotateY(90deg) translateZ(${W / 2 - 2}px)` }}
      />
      <div
        className={`${face} bg-[repeating-linear-gradient(0deg,oklch(0.96_0.012_85)_0_2px,oklch(0.86_0.015_80)_2px_3px)]`}
        style={{ left: 0, width: W - 2, height: pages, top: (H - pages) / 2, transform: `rotateX(90deg) translateZ(${H / 2 - 2}px)` }}
      />
      <div
        className={`${face} bg-[oklch(0.9_0.014_82)]`}
        style={{ left: 0, width: W - 2, height: pages, top: (H - pages) / 2, transform: `rotateX(-90deg) translateZ(${H / 2 - 2}px)` }}
      />

      {/* The first page, just behind the cover, with a soft gutter shadow on the spine side */}
      <div
        className={`${face} overflow-hidden bg-[oklch(0.975_0.01_85)] bg-[linear-gradient(90deg,oklch(0.2_0.02_50/0.14),transparent_14%)]`}
        style={{ top: 2, left: 0, width: W - 2, height: H - 4, transform: `translateZ(${D / 2 - COVER}px)` }}
      >
        <InnerPage b={b} fontSize={Math.max(11, W * 0.068)} tone="book" className="size-full" />
      </div>

      {/* Front cover, hinged on the spine edge, with real board thickness */}
      <motion.div className="absolute origin-left [transform-style:preserve-3d]" style={{ ...full, z: D / 2, rotateY: cover }}>
        <div className={`${face} ${color} overflow-hidden rounded-r-[2px]`} style={{ ...full, transform: `translateZ(${COVER / 2}px)` }}>
          <span aria-hidden="true" className="absolute inset-[7%] rounded-[1px] border border-current opacity-35" />
          <Sigil name={b.title} className="absolute top-[54%] left-1/2 aspect-square w-[62%] -translate-1/2 opacity-30" />
          <p
            className="font-display absolute inset-x-[12%] top-[13%] leading-[1.1] font-extrabold text-balance"
            style={{ fontSize: Math.max(13, W * (b.title.length > 22 ? 0.085 : 0.11)) }}
          >
            {b.title}
          </p>
          <p
            className="absolute inset-x-[12%] bottom-[11%] font-mono tracking-[0.14em] uppercase opacity-80"
            style={{ fontSize: Math.max(9, W * 0.048) }}
          >
            {b.genre}
          </p>
          {/* Spine-side hinge shading, like a printed jacket */}
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[6%] bg-[linear-gradient(90deg,oklch(0_0_0/0.22),transparent)]" />
        </div>
        {/* Inside of the cover: the endpaper, with the book's sigil as a faint bookplate */}
        <div
          className={`${face} flex items-center justify-center rounded-l-[2px] bg-[oklch(0.93_0.02_80)] text-[oklch(0.3_0.03_50)]`}
          style={{ ...full, transform: `rotateY(180deg) translateZ(${COVER / 2}px)` }}
        >
          <Sigil name={b.title} className="aspect-square w-[46%] opacity-[0.12]" />
        </div>
        {/* The board's fore-edge */}
        <div
          className={`${face} ${color} brightness-75`}
          style={{ top: 0, height: H, width: COVER, left: W - COVER / 2, transform: "rotateY(90deg)" }}
        />
      </motion.div>
    </motion.div>
  );
}
