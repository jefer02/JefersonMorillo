// Shared regular expressions for the contact form. The client validates live with these
// and the server action validates again with the same ones. Always trim before testing.

/** 2–60 chars, letters (any language, accents, ñ), spaces, apostrophes, periods, hyphens.
 *  Starts with a letter, ends with a letter or period, no double spaces. */
export const NAME = /^(?=.{2,60}$)(?!.*\s{2})[\p{L}\p{M}][\p{L}\p{M} '.-]*[\p{L}\p{M}.]$/u;

/** Pragmatic RFC-style check: ≤ 254 chars, local part ≤ 64, no leading/trailing/double dots,
 *  valid domain labels, TLD of 2–24 letters. */
export const EMAIL =
  /^(?=.{6,254}$)(?!\.)(?!.*\.\.)[A-Za-z0-9._%+-]{1,64}(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

/** Must be one of the select values. */
export const REASON = /^(oportunidad-laboral|proyecto|colaboracion|otro)$/;

/** 20–2000 chars. */
export const MESSAGE_LENGTH = /^[\s\S]{20,2000}$/;

/** At least two words of 2+ letters: not just whitespace or symbols. */
export const MESSAGE_HAS_WORDS = /\p{L}{2,}[\s\S]*\s[\s\S]*\p{L}{2,}/u;

/** Count with `message.match(LINK)`; more than 2 links is treated as spam.
 *  Never use `.test()` with this global regex (lastIndex is stateful). */
export const LINK = /(https?:\/\/|www\.)/gi;

/** Honeypot: must stay empty. */
export const EMPTY = /^$/;

export const MAX_LINKS = 2;

export const REASONS = [
  { value: "oportunidad-laboral", label: "Oportunidad laboral" },
  { value: "proyecto", label: "Proyecto" },
  { value: "colaboracion", label: "Colaboración" },
  { value: "otro", label: "Otro" },
] as const;

export const MESSAGES = {
  name: "Escribe tu nombre (solo letras, 2 a 60 caracteres).",
  email: "Ese correo no parece válido. Revisa el formato: nombre@dominio.com",
  reason: "Elige un motivo de la lista.",
  messageShort: "Cuéntame un poco más: mínimo 20 caracteres.",
  messageLong: "El mensaje es muy largo: máximo 2000 caracteres.",
  messageWords: "Escribe al menos un par de palabras.",
  messageLinks: "Incluye máximo 2 enlaces en el mensaje.",
} as const;

export type Field = "name" | "email" | "reason" | "message";

/** Returns the Spanish error for a field, or null when it passes. Used by client and server. */
export function validateField(field: Field, raw: string): string | null {
  const value = raw.trim();
  switch (field) {
    case "name":
      return NAME.test(value) ? null : MESSAGES.name;
    case "email":
      return EMAIL.test(value) ? null : MESSAGES.email;
    case "reason":
      return REASON.test(value) ? null : MESSAGES.reason;
    case "message": {
      if (value.length < 20) return MESSAGES.messageShort;
      if (!MESSAGE_LENGTH.test(value)) return MESSAGES.messageLong;
      if (!MESSAGE_HAS_WORDS.test(value)) return MESSAGES.messageWords;
      if ((value.match(LINK) ?? []).length > MAX_LINKS) return MESSAGES.messageLinks;
      return null;
    }
  }
}
