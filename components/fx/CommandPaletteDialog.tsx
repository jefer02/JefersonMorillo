"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { getChapters } from "@/content/chapters";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { socials } from "@/content/socials";
import { href } from "@/lib/i18n/config";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { scrollToId } from "@/lib/scroll";
import { IconSearch } from "@/components/ui/Icons";

// Same order as the home page: strongest projects first, this portfolio (number 0) last.
const orderedProjects = [...projects].sort((a, b) => (a.volume === 0 ? 1 : b.volume === 0 ? -1 : a.volume - b.volume));

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setNotice: (text: string) => void;
};

/** The palette itself (cmdk), loaded on first open so it stays out of the initial bundle. */
export default function CommandPaletteDialog({ open, setOpen, setNotice }: Props) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const locale = useLocale();
  const t = useMessages().search;
  const { navChapters } = getChapters(locale);

  const run = (fn: () => void) => () => {
    setOpen(false);
    // Let the dialog close (and return focus) before acting.
    window.setTimeout(fn, 120);
  };

  const goTo = (id: string) =>
    run(() => {
      if (window.location.pathname === `/${locale}`) scrollToId(id);
      else router.push(id === "top" ? href(locale) : href(locale, `#${id}`));
    });

  const item =
    "flex min-h-11 cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2 text-[0.95rem] aria-selected:bg-ink aria-selected:text-paper data-[disabled=true]:opacity-50";
  const group =
    "px-1 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-ink-soft [&_[cmdk-group-heading]]:uppercase";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label={t.button}
      loop
      overlayClassName="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px]"
      contentClassName="fixed top-[12vh] left-1/2 z-[71] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[4px] border border-rule bg-paper text-ink shadow-[0_30px_80px_-30px_oklch(0.15_0.02_50/0.6)]"
    >
      <div className="border-rule flex items-center gap-3 border-b px-4">
        <IconSearch width={20} height={20} className="text-ink-soft shrink-0" />
        <Command.Input
          placeholder={t.placeholder}
          className="placeholder:text-ink-soft h-14 w-full bg-transparent text-[1rem] outline-none"
        />
        <kbd className="border-rule text-ink-soft shrink-0 rounded-sm border px-1.5 font-mono text-[0.7rem]">Esc</kbd>
      </div>
      <Command.List className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain p-1" data-lenis-prevent>
        <Command.Empty className="text-ink-soft px-4 py-6 text-center">{t.empty}</Command.Empty>

        <Command.Group heading={t.sections} className={group}>
          <Command.Item className={item} onSelect={goTo("top")} value={t.keywords.top}>
            {t.goTop}
          </Command.Item>
          {navChapters
            .filter((c) => c.id !== "inicio")
            .map((c) => (
              <Command.Item key={c.id} className={item} onSelect={goTo(c.id)} value={c.name}>
                {c.name}
              </Command.Item>
            ))}
        </Command.Group>

        <Command.Group heading={t.projects} className={group}>
          {orderedProjects.map((p) => (
            <Command.Item
              key={p.slug}
              className={item}
              onSelect={run(() => router.push(href(locale, `/proyectos/${p.slug}`)))}
              value={`${p.title} ${p.titleEn ?? ""} ${t.projects}`}
            >
              {locale === "en" ? (p.titleEn ?? p.title) : p.title}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading={t.actions} className={group}>
          <Command.Item
            className={item}
            value={t.keywords.cv}
            onSelect={run(() => {
              const a = document.createElement("a");
              a.href = profile.cvPaths[locale];
              a.download = "";
              a.click();
            })}
          >
            {t.downloadCv}
          </Command.Item>
          <Command.Item
            className={item}
            value={t.keywords.email}
            onSelect={run(async () => {
              try {
                await navigator.clipboard.writeText(profile.email);
                setNotice(t.emailCopied);
              } catch {
                window.location.assign(`mailto:${profile.email}`);
              }
            })}
          >
            {t.copyEmail}
          </Command.Item>
          {socials.map((s) => (
            <Command.Item
              key={s.id}
              className={item}
              value={`${t.open} ${s.label}`}
              onSelect={run(() => window.open(s.href, "_blank", "noopener"))}
            >
              {t.open} {s.label}
            </Command.Item>
          ))}
          <Command.Item
            className={item}
            value={`${t.keywords.theme} dia de blancos negros`}
            onSelect={run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            {resolvedTheme === "dark" ? t.toLight : t.toDark}
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
