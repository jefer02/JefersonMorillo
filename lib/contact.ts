// Contact form handler shared by the Cloudflare Pages Function (functions/api/contact.ts).
// Runtime-agnostic: no Next.js or Node APIs, only fetch, so it runs on Workers.

import { profile } from "@/content/profile";
import { allowRequest } from "@/lib/rate-limit";
import { contactSchema, isHoneypotFilled } from "@/lib/validation/contact";
import { REASONS, type Field } from "@/lib/validation/patterns";

export type ContactState = {
  status: "idle" | "success" | "error" | "fallback";
  message: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
};

const MIN_FILL_MS = 3000;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function handleContact(formData: FormData, ip: string, env: ContactEnv): Promise<ContactState> {
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

  if (!(await allowRequest(ip, { url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN }))) {
    return { status: "error", message: "Has enviado varios mensajes seguidos. Inténtalo de nuevo en unos minutos.", values };
  }

  if (!env.RESEND_API_KEY) {
    return {
      status: "fallback",
      message: "El formulario no está disponible ahora mismo. Escríbeme directamente por correo.",
      values,
    };
  }

  const reason = REASONS.find((r) => r.value === data.reason)?.label ?? data.reason;

  try {
    // Resend REST API (https://resend.com/docs/api-reference/emails/send-email).
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        // Resend's onboarding sender works until a domain is verified.
        from: env.CONTACT_FROM_EMAIL || "Crónica de Atriz <onboarding@resend.dev>",
        to: env.CONTACT_TO_EMAIL || profile.email,
        reply_to: data.email,
        subject: `Portafolio · ${reason} · ${data.name}`,
        text: `Nombre: ${data.name}\nCorreo: ${data.email}\nMotivo: ${reason}\n\n${data.message}`,
        html: `<p><strong>Nombre:</strong> ${escapeHtml(data.name)}<br><strong>Correo:</strong> ${escapeHtml(data.email)}<br><strong>Motivo:</strong> ${escapeHtml(reason)}</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { status: "success", message: "¡Mensaje enviado! Te responderé pronto." };
  } catch (e) {
    console.error("[contact] send failed", e);
    return { status: "fallback", message: "No pude enviar el mensaje. Escríbeme directamente por correo.", values };
  }
}
