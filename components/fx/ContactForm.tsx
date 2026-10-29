"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { REASONS, validateField, type Field } from "@/lib/validation/patterns";
import { glyph } from "@/lib/runes";
import { buttonClass } from "@/components/ui/Button";
import { IconMail } from "@/components/ui/Icons";
import { TalcBurst } from "./TalcBurst";

const FIELDS: Field[] = ["name", "email", "reason", "message"];
const INITIAL: ContactState = { status: "idle", message: "" };
// In the site's rune alphabet (docs/runas.md): the four field runes spell HOLA and the
// centre rune, J, signs the letter once every field is valid.
const FIELD_RUNES = [..."HOLA"].map((ch) => glyph(ch) ?? "");
const SIGNATURE = glyph("J") ?? "";

/** The validation circle: one rune per field ignites when its regex passes; the ring closes when all do. */
function ValidationCircle({ valid }: { valid: Record<Field, boolean> }) {
  const done = FIELDS.filter((f) => valid[f]).length;
  const complete = done === FIELDS.length;
  return (
    <svg viewBox="-60 -60 120 120" className="size-full" aria-hidden="true">
      <circle r="54" fill="none" stroke="var(--rule)" strokeWidth="1.2" />
      <circle
        r="54"
        fill="none"
        stroke="var(--vermilion)"
        strokeWidth="2"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1 - done / FIELDS.length}
        transform="rotate(-90)"
        className="ease-book transition-[stroke-dashoffset] duration-700"
      />
      <circle r="44" fill="none" stroke="var(--rule)" strokeWidth="0.6" strokeDasharray="1.5 3" />
      {FIELDS.map((f, i) => {
        const a = (i / FIELDS.length) * Math.PI * 2 - Math.PI / 2;
        const lit = valid[f];
        return (
          <g key={f} transform={`translate(${(Math.cos(a) * 54).toFixed(2)} ${(Math.sin(a) * 54).toFixed(2)})`}>
            <circle
              r="10"
              fill="var(--paper)"
              stroke={lit ? "var(--vermilion)" : "var(--rule)"}
              strokeWidth="1.2"
              className="transition-[stroke] duration-500"
            />
            <path
              d={FIELD_RUNES[i]}
              transform="scale(1.1) translate(-5 -7)"
              fill="none"
              stroke={lit ? "var(--vermilion)" : "var(--ink-soft)"}
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity={lit ? 1 : 0.45}
              className="transition-[stroke,opacity] duration-500"
            />
          </g>
        );
      })}
      <g className={`ease-book transition-[opacity,transform] duration-700 ${complete ? "opacity-100" : "opacity-30"}`}>
        <path
          d={SIGNATURE}
          transform="scale(2.6) translate(-5 -7)"
          fill="none"
          stroke={complete ? "var(--vermilion)" : "var(--ink-soft)"}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

type Props = { email: string };

export function ContactForm({ email }: Props) {
  const locale = useLocale();
  const t = useMessages().form;
  const [state, action, pending] = useActionState(sendContact, INITIAL);
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", reason: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- the time trap starts when the form is on screen
  useEffect(() => setStartedAt(Date.now()), []);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const clientErrors = Object.fromEntries(FIELDS.map((f) => [f, validateField(f, values[f], locale)])) as Record<Field, string | null>;
  const valid = Object.fromEntries(FIELDS.map((f) => [f, !clientErrors[f]])) as Record<Field, boolean>;
  const errorFor = (f: Field) =>
    (touched[f] ? clientErrors[f] : null) ?? (state.status === "error" ? state.errors?.[f] : undefined) ?? null;

  const bind = (f: Field) => ({
    name: f,
    id: `contacto-${f}`,
    value: values[f],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [f]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-invalid": errorFor(f) ? true : undefined,
    "aria-describedby": errorFor(f) ? `contacto-${f}-error` : undefined,
    required: true,
  });

  const input =
    "mt-2 block w-full rounded-[3px] border border-ink/35 bg-paper px-3.5 py-3 text-[1rem] text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-soft/70 hover:border-ink/60 focus:border-vermilion focus:shadow-[0_0_0_3px_color-mix(in_oklch,var(--vermilion)_18%,transparent)] focus:outline-none aria-invalid:border-vermilion";

  const sent = state.status === "success";

  return (
    <div className="grid gap-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
      <div className="mx-auto size-36 md:sticky md:top-28 md:mx-0 md:size-40">
        <ValidationCircle valid={sent ? { name: true, email: true, reason: true, message: true } : valid} />
      </div>

      <div className="relative">
        {sent ? (
          <div className="bg-paper-2 relative overflow-hidden p-8 text-center motion-safe:animate-[letter-in_700ms_var(--ease-book)]">
            <TalcBurst />
            <p className="font-display text-[1.6rem] font-bold">{t.sent}</p>
            <p className="text-ink-soft mt-2">{state.message}</p>
          </div>
        ) : (
          <form
            ref={formRef}
            action={action}
            noValidate
            onSubmit={(e) => {
              const firstInvalid = FIELDS.find((f) => !valid[f]);
              if (firstInvalid) {
                e.preventDefault();
                setTouched({ name: true, email: true, reason: true, message: true });
                document.getElementById(`contacto-${firstInvalid}`)?.focus();
              }
            }}
            className="grid gap-5"
            aria-describedby="contacto-estado"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contacto-name" className="text-[0.92rem] font-medium">
                  {t.name}
                </label>
                <input {...bind("name")} type="text" autoComplete="name" placeholder={t.namePlaceholder} className={input} />
                <FieldError field="name" error={errorFor("name")} />
              </div>
              <div>
                <label htmlFor="contacto-email" className="text-[0.92rem] font-medium">
                  {t.email}
                </label>
                <input
                  {...bind("email")}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={t.emailPlaceholder}
                  className={input}
                />
                <FieldError field="email" error={errorFor("email")} />
              </div>
            </div>
            <div>
              <label htmlFor="contacto-reason" className="text-[0.92rem] font-medium">
                {t.reason}
              </label>
              <select
                {...bind("reason")}
                className={`${input} bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.6'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
              >
                <option value="" disabled>
                  {t.reasonPlaceholder}
                </option>
                {REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label[locale]}
                  </option>
                ))}
              </select>
              <FieldError field="reason" error={errorFor("reason")} />
            </div>
            <div>
              <label htmlFor="contacto-message" className="text-[0.92rem] font-medium">
                {t.message}
              </label>
              <textarea {...bind("message")} rows={6} placeholder={t.messagePlaceholder} className={`${input} resize-y`} />
              <div className="flex justify-between gap-4">
                <FieldError field="message" error={errorFor("message")} />
                <span className="text-ink-soft mt-1.5 ml-auto shrink-0 font-mono text-[0.75rem] tabular-nums">
                  {values.message.trim().length}/2000
                </span>
              </div>
            </div>

            {/* Honeypot (hidden from people and assistive tech) and time trap */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contacto-website">{t.honeypot}</label>
              <input id="contacto-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name="startedAt" value={startedAt || ""} />
            <input type="hidden" name="locale" value={locale} />

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={pending} className={buttonClass("primary", "min-w-44")}>
                <IconMail />
                {pending ? t.sending : t.send}
              </button>
              <p className="text-ink-soft text-[0.85rem]">{t.required}</p>
            </div>
          </form>
        )}

        <div id="contacto-estado" role="status" aria-live="polite" className="mt-4 text-[0.95rem]">
          {state.status === "error" && <p className="text-vermilion">{state.message}</p>}
          {state.status === "fallback" && (
            <p>
              {state.message}{" "}
              <a href={`mailto:${email}`} className="text-vermilion font-medium underline">
                {email}
              </a>
            </p>
          )}
          {sent && <p className="sr-only">{state.message}</p>}
        </div>
      </div>
    </div>
  );
}

function FieldError({ field, error }: { field: Field; error: string | null }) {
  if (!error) return null;
  return (
    <p id={`contacto-${field}-error`} className="text-vermilion mt-1.5 text-[0.85rem]">
      {error}
    </p>
  );
}
