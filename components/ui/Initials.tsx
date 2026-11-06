/** A person's initials in a small seal-like circle, used instead of a photo. Decorative: the name sits beside it. */
export function Initials({ value, className = "size-12 text-[1.05rem]" }: { value: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`border-vermilion bg-paper text-vermilion font-display inline-flex shrink-0 items-center justify-center rounded-full border-2 font-extrabold tracking-[-0.02em] shadow-[inset_0_0_0_3px_var(--paper),inset_0_0_0_4px_var(--rule)] ${className}`}
    >
      {value}
    </span>
  );
}
