import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "quiet" | "obi" | "obi-outline";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[3px] px-5 py-2.5 text-[0.95rem] font-medium tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-200 ease-book active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-vermilion",
  outline: "border border-ink/70 text-ink hover:border-vermilion hover:text-vermilion",
  quiet: "px-2 text-ink underline decoration-rule underline-offset-[0.3em] hover:decoration-vermilion",
  // On the vermilion obi: cream paper buttons with the same visual weight.
  obi: "bg-obi-ink text-[oklch(0.25_0.06_30)] hover:bg-[oklch(0.99_0.005_85)] focus-visible:outline-obi-ink",
  "obi-outline": "border border-obi-ink/80 text-obi-ink hover:bg-obi-ink/12 focus-visible:outline-obi-ink",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
};

export function ButtonLink({ href, variant = "primary", icon, external, className = "", children, ...rest }: LinkProps) {
  const cls = buttonClass(variant, className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  if (external || href.startsWith("http") || rest.download !== undefined) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
