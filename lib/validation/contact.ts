import { z } from "zod";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { EMPTY, validateField, type Field } from "./patterns";

const field = (name: Field, locale: Locale) =>
  z
    .string()
    .transform((v) => v.trim())
    .superRefine((v, ctx) => {
      const error = validateField(name, v, locale);
      if (error) ctx.addIssue({ code: "custom", message: error });
    });

/** Server-side schema: the same regexes as the client, via validateField; errors in `locale`. */
export const contactSchemaFor = (locale: Locale) =>
  z.object({
    name: field("name", locale),
    email: field("email", locale),
    reason: field("reason", locale),
    message: field("message", locale),
    // Honeypot and time trap are checked separately so bots get a fake success.
    website: z.string().default(""),
    startedAt: z.coerce.number().default(0),
  });

export const contactSchema = contactSchemaFor(defaultLocale);

export type ContactInput = z.infer<typeof contactSchema>;

export const isHoneypotFilled = (value: string) => !EMPTY.test(value);
