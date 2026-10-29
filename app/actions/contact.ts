"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { allowRequest } from "@/lib/rate-limit";
import { contactSchemaFor, isHoneypotFilled } from "@/lib/validation/contact";
import { REASONS, type Field } from "@/lib/validation/patterns";

export type ContactState = {
  status: "idle" | "success" | "error" | "fallback";
  message: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const MIN_FILL_MS = 3000;

const TEXT = {
  es: {
    sent: "¡Mensaje enviado! Te responderé pronto.",
    sentDev: "¡Mensaje enviado! (modo desarrollo: revisa la consola).",
    check: "Revisa los campos marcados.",
    noJs: "Para enviar el formulario necesitas JavaScript. Escríbeme directamente por correo.",
    tooFast: "Fue muy rápido. Espera unos segundos e inténtalo de nuevo.",
    rateLimited: "Has enviado varios mensajes seguidos. Inténtalo de nuevo en unos minutos.",
    unavailable: "El formulario no está disponible ahora mismo. Escríbeme directamente por correo.",
    failed: "No pude enviar el mensaje. Escríbeme directamente por correo.",
  },
  en: {
    sent: "Message sent! I'll get back to you soon.",
    sentDev: "Message sent! (development mode: check the console).",
    check: "Please check the highlighted fields.",
    noJs: "The form needs JavaScript. Please email me directly.",
    tooFast: "That was very fast. Wait a few seconds and try again.",
    rateLimited: "You've sent several messages in a row. Please try again in a few minutes.",
    unavailable: "The form isn't available right now. Please email me directly.",
    failed: "I couldn't send the message. Please email me directly.",
  },
} satisfies Record<Locale, Record<string, string>>;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const values = { name: raw.name ?? "", email: raw.email ?? "", reason: raw.reason ?? "", message: raw.message ?? "" };
  const locale: Locale = isLocale(raw.locale) ? raw.locale : defaultLocale;
  const t = TEXT[locale];

  // Honeypot filled → pretend success, send nothing.
  if (isHoneypotFilled(raw.website ?? "")) {
    return { status: "success", message: t.sent };
  }

  const parsed = contactSchemaFor(locale).safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<Field, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: t.check, errors, values };
  }
  const data = parsed.data;

  // Without JavaScript there is no render timestamp: degrade to the mailto fallback.
  if (!data.startedAt) {
    return { status: "fallback", message: t.noJs, values };
  }
  // Time trap: humans need more than 3 seconds to fill the form.
  if (Date.now() - data.startedAt < MIN_FILL_MS) {
    return { status: "error", message: t.tooFast, values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  if (!(await allowRequest(ip))) {
    return { status: "error", message: t.rateLimited, values };
  }

  // The email to Jeferson is always in Spanish; it notes the visitor's language.
  const reason = REASONS.find((r) => r.value === data.reason)?.label.es ?? data.reason;

  if (!env.resendApiKey) {
    if (!env.isProduction) {
      console.info("[contact] RESEND_API_KEY missing; payload:", { ...data, reason });
      return { status: "success", message: t.sentDev };
    }
    return {
      status: "fallback",
      message: t.unavailable,
      values,
    };
  }

  try {
    const resend = new Resend(env.resendApiKey);
    const { error } = await resend.emails.send({
      from: env.contactFrom,
      to: env.contactTo,
      replyTo: data.email,
      subject: `Portafolio · ${reason} · ${data.name}`,
      text: `Nombre: ${data.name}\nCorreo: ${data.email}\nMotivo: ${reason}\nIdioma: ${locale.toUpperCase()}\n\n${data.message}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(data.name)}<br><strong>Correo:</strong> ${escapeHtml(data.email)}<br><strong>Motivo:</strong> ${escapeHtml(reason)}<br><strong>Idioma:</strong> ${locale.toUpperCase()}</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
    });
    if (error) throw new Error(error.message);
    return { status: "success", message: t.sent };
  } catch (e) {
    console.error("[contact] send failed", e);
    return { status: "fallback", message: t.failed, values };
  }
}
