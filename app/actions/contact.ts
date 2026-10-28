"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { allowRequest } from "@/lib/rate-limit";
import { contactSchema, isHoneypotFilled } from "@/lib/validation/contact";
import { REASONS, type Field } from "@/lib/validation/patterns";

export type ContactState = {
  status: "idle" | "success" | "error" | "fallback";
  message: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const MIN_FILL_MS = 3000;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const values = { name: raw.name ?? "", email: raw.email ?? "", reason: raw.reason ?? "", message: raw.message ?? "" };

  // Honeypot filled → pretend success, send nothing.
  if (isHoneypotFilled(raw.website ?? "")) {
    return { status: "success", message: "¡Mensaje enviado! Te responderé pronto." };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<Field, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }
  const data = parsed.data;

  // Without JavaScript there is no render timestamp: degrade to the mailto fallback.
  if (!data.startedAt) {
    return { status: "fallback", message: "Para enviar el formulario necesitas JavaScript. Escríbeme directamente por correo.", values };
  }
  // Time trap: humans need more than 3 seconds to fill the form.
  if (Date.now() - data.startedAt < MIN_FILL_MS) {
    return { status: "error", message: "Fue muy rápido. Espera unos segundos e inténtalo de nuevo.", values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  if (!(await allowRequest(ip))) {
    return { status: "error", message: "Has enviado varios mensajes seguidos. Inténtalo de nuevo en unos minutos.", values };
  }

  const reason = REASONS.find((r) => r.value === data.reason)?.label ?? data.reason;

  if (!env.resendApiKey) {
    if (!env.isProduction) {
      console.info("[contact] RESEND_API_KEY missing; payload:", { ...data, reason });
      return { status: "success", message: "¡Mensaje enviado! (modo desarrollo: revisa la consola)." };
    }
    return {
      status: "fallback",
      message: "El formulario no está disponible ahora mismo. Escríbeme directamente por correo.",
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
      text: `Nombre: ${data.name}\nCorreo: ${data.email}\nMotivo: ${reason}\n\n${data.message}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(data.name)}<br><strong>Correo:</strong> ${escapeHtml(data.email)}<br><strong>Motivo:</strong> ${escapeHtml(reason)}</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
    });
    if (error) throw new Error(error.message);
    return { status: "success", message: "¡Mensaje enviado! Te responderé pronto." };
  } catch (e) {
    console.error("[contact] send failed", e);
    return { status: "fallback", message: "No pude enviar el mensaje. Escríbeme directamente por correo.", values };
  }
}
