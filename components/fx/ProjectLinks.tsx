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
}: {
  link: MaybeLink;
  label: string;
  variant: "primary" | "outline";
  icon: React.ReactNode;
}) {
  if (isRealLink(link)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, "text-[0.88rem]")} title={link.label}>
        {icon}
        <span>{label}</span>
        <span className="sr-only">: {link.label} (se abre en otra pestaña)</span>
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
      <span>{label} · próximamente</span>
    </span>
  );
}

/** The two links the course requires on every project: GitHub repository and demo. */
export function ProjectLinks({ project, size = "card" }: { project: Project; size?: "card" | "page" }) {
  const demo = project.demo;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <LinkButton link={project.repo} label="Repositorio en GitHub" variant="primary" icon={<IconGitHub width={18} height={18} />} />
        <LinkButton link={demo} label="Ver demo" variant="outline" icon={<IconArrowUpRight width={18} height={18} />} />
      </div>
      <p className="text-ink-soft mt-2 text-[0.8rem]">
        Demo: {demo.label}
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
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
