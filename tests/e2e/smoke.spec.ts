import { expect, test } from "@playwright/test";

test("home renders the required sections in the guide's order", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Jeferson\s*Morillo/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Descargar CV/ })).toHaveAttribute("download", "");
  await expect(page.getByText(/Actualmente estudiando · Ingeniería de Software/)).toBeVisible();
  const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((e) => e.id));
  const order = ["inicio", "origen", "acerca-de-mi", "habilidades", "proyectos", "experiencia", "extras", "contacto"];
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
  const cards = page.locator("#proyectos li[id^='vol-']");
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    await expect(card.getByText("Repositorio en GitHub", { exact: true })).toBeVisible();
    await expect(card.getByText(/^Ver demo/).first()).toBeVisible();
  }
});

test("Índice navigates on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Índice" }).click();
  const dialog = page.getByRole("dialog", { name: /Índice/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: /Habilidades/ }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#habilidades/);
});

test("command palette jumps to a chapter", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop keyboard shortcut");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder(/Lanzar hechizo/);
  await expect(input).toBeVisible();
  await input.fill("contacto");
  await page.keyboard.press("Enter");
  await expect(input).toBeHidden();
  await expect(page.locator("#contacto")).toBeInViewport();
});

test("contact form shows regex errors, then accepts valid input", async ({ page }) => {
  await page.goto("/#contacto");
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
  // Without RESEND_API_KEY in production the form falls back to mailto.
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: /correo|enviado/i })
      .first(),
  ).toBeVisible();
});

test("reduced motion shows all content statically", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
  for (const id of ["origen", "acerca-de-mi", "habilidades", "proyectos", "experiencia", "extras", "contacto"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} h2`).first()).toBeVisible();
  }
  await ctx.close();
});

test("404 is Re:Inicio with ways back", async ({ page }) => {
  const res = await page.goto("/esta-pagina-no-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Re:Inicio");
  await expect(page.getByRole("link", { name: "Volver a la portada" }).first()).toBeVisible();
});

test("case study morph target and links", async ({ page }) => {
  await page.goto("/volumenes/elyndra");
  await expect(page.getByRole("heading", { level: 1, name: "Elyndra" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Repositorio en GitHub/ })).toHaveAttribute("href", "https://github.com/jefer02/Elyndra");
  await expect(page.getByRole("link", { name: /Volumen siguiente|Volumen anterior/ }).first()).toBeVisible();
});
