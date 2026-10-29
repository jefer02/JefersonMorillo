import type { Locale } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { isProd, isRealLink } from "@/lib/todo";
import type { MaybeLink, Project } from "@/types";
import { buttonClass } from "@/components/ui/Button";
import { Text } from "@/components/ui/Todo";
import { IconArrowUpRight, IconGitHub } from "@/components/ui/Icons";

function LinkButton({
  link,
  label,
  variant,
  icon,
  locale,
}: {
  link: MaybeLink;
  label: string;
  variant: "primary" | "outline";
  icon: React.ReactNode;
  locale: Locale;
}) {
  const t = messages[locale];
  if (isRealLink(link)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, "text-[0.88rem]")} title={link.label}>
        {icon}
        <span>{label}</span>
        <span className="sr-only">
          : {link.label} {t.newTab}
        </span>
      </a>
    );
  }
  // Missing link: loud TODO in development, an honest "coming soon" in production.
  return (
    <span
      className={buttonClass(
        "outline",
        "text-ink-soft hover:border-ink/70 hover:text-ink-soft cursor-default border-dashed text-[0.88rem]",
      )}
      aria-disabled="true"
    >
      {icon}
      <span>
        {label} · {t.projects.soon}
      </span>
    </span>
  );
}

/** The two links the course requires on every project: GitHub repository and demo. */
export function ProjectLinks({ project, locale, size = "card" }: { project: Project; locale: Locale; size?: "card" | "page" }) {
  const t = messages[locale];
  const demo = project.demo;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <LinkButton
          link={project.repo}
          label={t.projects.repo}
          variant="primary"
          icon={<IconGitHub width={18} height={18} />}
          locale={locale}
        />
        <LinkButton
          link={demo}
          label={t.projects.demo}
          variant="outline"
          icon={<IconArrowUpRight width={18} height={18} />}
          locale={locale}
        />
      </div>
      <p className="text-ink-soft mt-2 text-[0.8rem]">
        {t.projects.demoPrefix} {demo.label}
        {!isRealLink(demo) && !isProd && (
          <>
            {" "}
            <Text value={demo.todo} />
          </>
        )}
      </p>
      {size === "page" && project.extraLinks && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.9rem]">
          {project.extraLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-rule hover:text-vermilion hover:decoration-vermilion inline-flex min-h-11 items-center gap-1.5 underline"
              >
                {l.label}
                <IconArrowUpRight width={16} height={16} />
                <span className="sr-only"> {t.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
