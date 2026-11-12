// EmailJS delivers the contact form to Jeferson's Gmail. These ids are public by design
// (EmailJS calls them from the browser); env vars override them if the account changes.
// Restrict the allowed origins in EmailJS → Account → Security.
export const emailjs = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_xmni7jz",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_k151688",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "lBoQbqIbSf3Rggajz",
};

export type EmailPayload = { name: string; email: string; reason: string; message: string; locale: string };

/**
 * Sends the validated form through the EmailJS REST API. The template parameters cover
 * both EmailJS default templates ({{name}}/{{email}}/{{title}} and {{from_name}}/{{reply_to}}).
 */
export async function sendWithEmailJs(data: EmailPayload): Promise<void> {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjs.serviceId,
      template_id: emailjs.templateId,
      user_id: emailjs.publicKey,
      template_params: {
        name: data.name,
        from_name: data.name,
        email: data.email,
        from_email: data.email,
        reply_to: data.email,
        title: data.reason,
        reason: data.reason,
        subject: `Portafolio · ${data.reason} · ${data.name}`,
        message: data.message,
        language: data.locale.toUpperCase(),
        time: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
      },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}
