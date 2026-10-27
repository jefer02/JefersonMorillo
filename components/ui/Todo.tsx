import { isProd, isTodo } from "@/lib/todo";
import type { ReactNode } from "react";

type Props = {
  value: string;
  /** What production shows while the value is missing. Defaults to nothing. */
  fallback?: ReactNode;
  className?: string;
};

/**
 * Renders real text as-is. A `TODO(jeferson)` value shows as a loud dashed stamp in
 * development and as `fallback` (or nothing) in production, so placeholders never ship.
 */
export function Text({ value, fallback = null, className }: Props) {
  if (!isTodo(value)) return <span className={className}>{value}</span>;
  if (isProd) return <>{fallback}</>;
  return (
    <span
      className={`border-vermilion bg-vermilion/8 text-vermilion inline rounded-sm border border-dashed px-1.5 py-0.5 font-mono text-[0.78em] leading-snug ${className ?? ""}`}
      title={value}
    >
      {value}
    </span>
  );
}

/** Large rubber stamp for placeholder blocks (e.g. testimonials) in development. */
export function PlaceholderStamp({ children = "PLACEHOLDER — NO PUBLICAR" }: { children?: ReactNode }) {
  return (
    <span className="border-vermilion text-vermilion pointer-events-none inline-block -rotate-3 rounded-sm border-2 px-2 py-1 font-mono text-[0.7rem] font-bold tracking-widest uppercase">
      {children}
    </span>
  );
}
