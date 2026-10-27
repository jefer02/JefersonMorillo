"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { navChapters } from "@/content/chapters";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { orderedProjects } from "@/lib/projects";
import { scrollToId } from "@/lib/scroll";
import { Sigil } from "./Sigil";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setNotice: (text: string) => void;
};

/** The palette itself (cmdk), loaded on first open so it stays out of the initial bundle. */
export default function CommandPaletteDialog({ open, setOpen, setNotice }: Props) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const run = (fn: () => void) => () => {
    setOpen(false);
    // Let the dialog close (and return focus) before acting.
    window.setTimeout(fn, 120);
  };

  const goTo = (id: string) =>
    run(() => {
      if (window.location.pathname === "/") scrollToId(id);
      else router.push(id === "top" ? "/" : `/#${id}`);
    });

  const item =
    "flex min-h-11 cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2 text-[0.95rem] aria-selected:bg-ink aria-selected:text-paper data-[disabled=true]:opacity-50";
  const group =
    "px-1 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-ink-soft [&_[cmdk-group-heading]]:uppercase";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Lanzar hechizo"
      loop
      overlayClassName="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px]"
      contentClassName="fixed top-[12vh] left-1/2 z-[71] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[4px] border border-rule bg-paper text-ink shadow-[0_30px_80px_-30px_oklch(0.15_0.02_50/0.6)]"
    >
      <div className="border-rule flex items-center gap-3 border-b px-4">
        <Sigil name="Lanzar hechizo" className="text-vermilion size-6 shrink-0" />
        <Command.Input
          placeholder="Lanzar hechizo: ir a un capítulo, abrir un volumen…"
          className="placeholder:text-ink-soft h-14 w-full bg-transparent text-[1rem] outline-none"
        />
        <kbd className="border-rule text-ink-soft shrink-0 rounded-sm border px-1.5 font-mono text-[0.7rem]">Esc</kbd>
      </div>
      <Command.List className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain p-1" data-lenis-prevent>
        <Command.Empty className="text-ink-soft px-4 py-6 text-center">Ningún hechizo coincide.</Command.Empty>

        <Command.Group heading="Capítulos" className={group}>
          <Command.Item className={item} onSelect={goTo("top")} value="portada inicio regresar al punto de guardado">
            Regresar al punto de guardado (portada)
          </Command.Item>
          {navChapters.map((c) => (
            <Command.Item key={c.id} className={item} onSelect={goTo(c.id)} value={`${c.name} ${c.ruby}`}>
              <span className="w-10 font-mono text-[0.75rem] opacity-70">{c.numeral}</span>
              {c.name}
              <span className="ml-auto text-[0.8rem] opacity-60">{c.ruby}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Volúmenes" className={group}>
          {orderedProjects.map((p) => (
            <Command.Item
              key={p.slug}
              className={item}
              onSelect={run(() => router.push(`/volumenes/${p.slug}`))}
              value={`${p.title} proyecto volumen`}
            >
              <span className="w-10 font-mono text-[0.75rem] opacity-70">{String(p.volume).padStart(2, "0")}</span>
              {p.title}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Acciones" className={group}>
          <Command.Item
            className={item}
            value="descargar cv hoja de vida"
            onSelect={run(() => {
              const a = document.createElement("a");
              a.href = profile.cvPath;
              a.download = "";
              a.click();
            })}
          >
            Descargar CV
          </Command.Item>
          <Command.Item
            className={item}
            value="copiar correo email"
            onSelect={run(async () => {
              try {
                await navigator.clipboard.writeText(profile.email);
                setNotice("Correo copiado al portapapeles.");
              } catch {
                window.location.assign(`mailto:${profile.email}`);
              }
            })}
          >
            Copiar correo
          </Command.Item>
          {socials.map((s) => (
            <Command.Item
              key={s.id}
              className={item}
              value={`abrir ${s.label}`}
              onSelect={run(() => window.open(s.href, "_blank", "noopener"))}
            >
              Abrir {s.label}
            </Command.Item>
          ))}
          <Command.Item
            className={item}
            value="cambiar tema claro oscuro dia de blancos negros"
            onSelect={run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            Cambiar a {resolvedTheme === "dark" ? "Día de Blancos (claro)" : "Día de Negros (oscuro)"}
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
