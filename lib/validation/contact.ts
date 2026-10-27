import { z } from "zod";
import { EMPTY, validateField, type Field } from "./patterns";

const field = (name: Field) =>
  z
    .string()
    .transform((v) => v.trim())
    .superRefine((v, ctx) => {
      const error = validateField(name, v);
      if (error) ctx.addIssue({ code: "custom", message: error });
    });

/** Server-side schema: the same regexes as the client, via validateField. */
export const contactSchema = z.object({
  name: field("name"),
  email: field("email"),
  reason: field("reason"),
  message: field("message"),
  // Honeypot and time trap are checked separately so bots get a fake success.
  website: z.string().default(""),
  startedAt: z.coerce.number().default(0),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const isHoneypotFilled = (value: string) => !EMPTY.test(value);
