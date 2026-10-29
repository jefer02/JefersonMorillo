// Renders the /es/cv and /en/cv routes to PDFs in public/cv/ with Playwright.
// Usage: start the site (`npm run dev` or `npm run start`), then `npm run cv`.
// Optional: CV_BASE_URL=http://localhost:3000 npm run cv
// Runs locally, never during the Vercel build. Commit the generated PDFs.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { profile } from "../content/profile";
import { locales } from "../lib/i18n/config";

const base = process.env.CV_BASE_URL ?? "http://localhost:3000";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const locale of locales) {
    const out = join(process.cwd(), "public", profile.cvPaths[locale]);
    mkdirSync(dirname(out), { recursive: true });
    const res = await page.goto(`${base}/${locale}/cv`, { waitUntil: "networkidle" });
    if (!res?.ok()) throw new Error(`No pude abrir ${base}/${locale}/cv (¿está corriendo el servidor?)`);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    await page.pdf({ path: out, format: "A4", printBackground: true, margin: { top: "0", right: "0", bottom: "0", left: "0" } });
    console.log(`✅ CV (${locale}) generado en public${profile.cvPaths[locale]}`);
  }
  await browser.close();
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
