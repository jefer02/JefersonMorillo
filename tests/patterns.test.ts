import { describe, expect, it } from "vitest";
import { EMAIL, EMPTY, LINK, MESSAGE_HAS_WORDS, MESSAGE_LENGTH, NAME, REASON, validateField } from "@/lib/validation/patterns";
import { contactSchema, isHoneypotFilled } from "@/lib/validation/contact";

describe("NAME", () => {
  it.each(["José Ñañez", "María-José O'Neil", "Jeferson Morillo", "Ana", "J. R. R. Tolkien", "Zoë", "Ló"])("accepts %s", (v) => {
    expect(NAME.test(v)).toBe(true);
  });
  it.each(["J", "Juan  Pérez", "1van", "Juan3", "-Ana", "Ana-", "Ana@", "a".repeat(61), " Ana"])("rejects %j", (v) => {
    expect(NAME.test(v)).toBe(false);
  });
});

describe("EMAIL", () => {
  it.each(["nombre@ucc.edu.co", "jefersonmorillo5858@gmail.com", "a.b+tag@sub.dominio.com", "x_y@dominio.io", "a@b.co"])(
    "accepts %s",
    (v) => {
      expect(EMAIL.test(v)).toBe(true);
    },
  );
  it.each([
    "nombre..apellido@gmail.com",
    ".nombre@gmail.com",
    "nombre.@gmail.com",
    "nombre@dominio",
    "nombre@-dominio.com",
    "nombre@dominio.c",
    "nombre@@gmail.com",
    "sin-arroba.com",
    "a@b.c",
    `${"a".repeat(65)}@gmail.com`,
  ])("rejects %s", (v) => {
    expect(EMAIL.test(v)).toBe(false);
  });
});

describe("REASON", () => {
  it.each(["oportunidad-laboral", "proyecto", "colaboracion", "otro"])("accepts %s", (v) => expect(REASON.test(v)).toBe(true));
  it.each(["", "spam", "Proyecto", "otro "])("rejects %j", (v) => expect(REASON.test(v)).toBe(false));
});

describe("MESSAGE", () => {
  it("requires 20 to 2000 characters", () => {
    expect(MESSAGE_LENGTH.test("demasiado corto")).toBe(false);
    expect(MESSAGE_LENGTH.test("Hola, me gustó mucho tu portafolio.")).toBe(true);
    expect(MESSAGE_LENGTH.test("a".repeat(2001))).toBe(false);
  });
  it("requires at least two words", () => {
    expect(MESSAGE_HAS_WORDS.test("!!!!!!!!!!!!!!!!!!!!!!!!")).toBe(false);
    expect(MESSAGE_HAS_WORDS.test("aaaaaaaaaaaaaaaaaaaaaaaa")).toBe(false);
    expect(MESSAGE_HAS_WORDS.test("Hola Jeferson, ¿hablamos?")).toBe(true);
  });
  it("counts links with match, never test", () => {
    expect("ver https://a.com y www.b.com y http://c.com".match(LINK)?.length).toBe(3);
    expect(validateField("message", "Mira https://a.com https://b.com https://c.com por favor")).toMatch(/enlaces/);
    expect(validateField("message", "Mira https://a.com y https://b.com, por favor revísalo")).toBeNull();
  });
  it("gives Spanish errors", () => {
    expect(validateField("message", "corto")).toBe("Cuéntame un poco más: mínimo 20 caracteres.");
    expect(validateField("name", "1")).toMatch(/^Escribe tu nombre/);
    expect(validateField("email", "x@y")).toMatch(/^Ese correo no parece válido/);
  });
});

describe("honeypot", () => {
  it("must stay empty", () => {
    expect(EMPTY.test("")).toBe(true);
    expect(isHoneypotFilled("")).toBe(false);
    expect(isHoneypotFilled("http://spam.example")).toBe(true);
  });
});

describe("contactSchema (server)", () => {
  const valid = {
    name: "  María-José O'Neil ",
    email: "maria@ucc.edu.co",
    reason: "proyecto",
    message: "Hola Jeferson, me gustaría hablar de un proyecto.",
    website: "",
    startedAt: "1700000000000",
  };
  it("accepts and trims valid input", () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe("María-José O'Neil");
  });
  it("rejects each invalid field with its message", () => {
    const r = contactSchema.safeParse({ ...valid, email: "maria@@ucc", message: "corto" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const paths = r.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("email");
      expect(paths).toContain("message");
    }
  });
});
