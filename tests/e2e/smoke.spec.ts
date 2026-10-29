import { expect, test } from "@playwright/test";

test("home renders the required sections in the guide's order", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.getByRole("heading", { level: 1, name: /Jeferson\s*Morillo/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Descargar CV/ })).toHaveAttribute("download", "");
  await expect(page.getByText(/Actualmente estudiando · Ingeniería de Software/)).toBeVisible();
  const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((e) => e.id));
  const order = ["inicio", "presentacion", "acerca-de-mi", "habilidades", "proyectos", "experiencia", "extras", "contacto"];
  expect(ids.filter((id) => order.includes(id))).toEqual(order);
  await expect(page.locator("footer")).toContainText(/© \d{4} Jeferson Morillo/);
  await expect(page.getByRole("link", { name: "jefersonmorillo5858@gmail.com" })).toBeVisible();
});

test("CV PDF downloads", async ({ request }) => {
  const res = await request.get("/cv/CV-Jeferson-Morillo.pdf");
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("every project shows a GitHub link and a demo", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#proyectos li[id^='proyecto-']");
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    await expect(card.getByText("Repositorio en GitHub", { exact: true })).toBeVisible();
    await expect(card.getByText(/^Ver demo/).first()).toBeVisible();
  }
});

test("mobile menu navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/es");
  await page.getByRole("button", { name: "Menú" }).click();
  const dialog = page.getByRole("dialog", { name: /Menú/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: /Habilidades/ }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#habilidades/);
});

test("command palette jumps to a section", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop keyboard shortcut");
  await page.goto("/es", { waitUntil: "networkidle" });
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder(/Buscar o ir a una sección/);
  await expect(input).toBeVisible();
  await input.fill("contacto");
  await page.keyboard.press("Enter");
  await expect(input).toBeHidden();
  await expect(page.locator("#contacto")).toBeInViewport();
});

test("contact form shows regex errors, then accepts valid input", async ({ page }) => {
  await page.goto("/es#contacto");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.getByText("Escribe tu nombre (solo letras, 2 a 60 caracteres).")).toBeVisible();
  await expect(page.locator("#contacto-email")).toHaveAttribute("aria-invalid", "true");

  await page.locator("#contacto-name").fill("María-José O'Neil");
  await page.locator("#contacto-email").fill("nombre..x@ucc.edu.co");
  await page.locator("#contacto-email").blur();
  await expect(page.getByText(/Ese correo no parece válido/)).toBeVisible();
  await page.locator("#contacto-email").fill("maria@ucc.edu.co");
  await page.locator("#contacto-reason").selectOption("proyecto");
  await page.locator("#contacto-message").fill("Hola Jeferson, me gustaría hablar de un proyecto juntos.");
  await page.waitForTimeout(3200); // time trap
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  // In development the message is logged ("Mensaje enviado"); in production without
  // RESEND_API_KEY the form falls back to mailto.
  await expect(
    page
      .getByText("Mensaje enviado", { exact: true })
      .or(page.getByRole("status").filter({ hasText: /correo/i }))
      .first(),
  ).toBeVisible();
});

test("reduced motion shows all content statically", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/es");
  await expect(page.locator("canvas")).toHaveCount(0);
  for (const id of ["presentacion", "acerca-de-mi", "habilidades", "proyectos", "experiencia", "extras", "contacto"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} h2`).first()).toBeVisible();
  }
  await ctx.close();
});

test("404 has clear ways back, in each language", async ({ page }) => {
  const res = await page.goto("/es/esta-pagina-no-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Página no encontrada");
  await expect(page.getByRole("link", { name: "Volver al inicio" }).first()).toBeVisible();
  await page.goto("/en/this-page-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
});

test("case study morph target and links", async ({ page }) => {
  await page.goto("/es/proyectos/elyndra");
  await expect(page.getByRole("heading", { level: 1, name: "Elyndra" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Repositorio en GitHub/ })).toHaveAttribute("href", "https://github.com/jefer02/Elyndra");
  await expect(page.getByRole("link", { name: /Proyecto siguiente|Proyecto anterior/ }).first()).toBeVisible();
});

test("old URLs redirect into the Spanish site", async ({ page }) => {
  await page.goto("/volumenes/laaf");
  await expect(page).toHaveURL(/\/es\/proyectos\/laaf$/);
  await page.goto("/proyectos/sotto");
  await expect(page).toHaveURL(/\/es\/proyectos\/sotto$/);
});

test("English site: translated content, hreflang and CV", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 2, name: "About me" })).toBeAttached();
  await expect(page.getByText(/Currently studying · Software Engineering/)).toBeVisible();
  await expect(page.getByRole("link", { name: /Download CV/ })).toHaveAttribute("href", "/cv/CV-Jeferson-Morillo-EN.pdf");
  await expect(page.locator('link[rel="alternate"][hreflang="es-CO"]')).toHaveAttribute("href", /\/es$/);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", /\/es$/);
});

test("contact form errors in English, same rules", async ({ page }) => {
  await page.goto("/en#contacto");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter your name (letters only, 2 to 60 characters).")).toBeVisible();
  await page.locator("#contacto-email").fill("nombre..x@ucc.edu.co");
  await page.locator("#contacto-email").blur();
  await expect(page.getByText(/That email doesn't look valid/)).toBeVisible();
});

test("language switch keeps the page and remembers the choice", async ({ page, isMobile }) => {
  test.skip(isMobile, "the full switch shows from sm up");
  await page.goto("/es/proyectos/sotto");
  await page.getByRole("link", { name: "English" }).first().click();
  await expect(page).toHaveURL(/\/en\/proyectos\/sotto$/);
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("bookshelf opens and closes a book", async ({ page }) => {
  await page.goto("/es");
  const spine = page.locator("#acerca-de-mi ul[aria-label] button").first();
  await spine.scrollIntoViewIfNeeded();
  await spine.click();
  await expect(spine).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("button", { name: "Cerrar libro" })).toBeFocused({ timeout: 4000 });
  await page.keyboard.press("Escape");
  await expect(spine).toHaveAttribute("aria-expanded", "false");
  await expect(spine).toBeFocused({ timeout: 4000 });
});
