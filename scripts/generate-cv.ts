// Renders the /cv route to public/cv/CV-Jeferson-Morillo.pdf with Playwright.
// Usage: start the site (`npm run dev` or `npm run start`), then `npm run cv`.
// Optional: CV_BASE_URL=http://localhost:3000 npm run cv
// Runs locally, never during the Vercel build. Commit the generated PDF.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { profile } from "../content/profile";

const base = process.env.CV_BASE_URL ?? "http://localhost:3000";
const out = join(process.cwd(), "public", profile.cvPath);

async function main() {
  mkdirSync(dirname(out), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const res = await page.goto(`${base}/cv`, { waitUntil: "networkidle" });
  if (!res?.ok()) throw new Error(`No pude abrir ${base}/cv (¿está corriendo el servidor?)`);
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.pdf({ path: out, format: "A4", printBackground: true, margin: { top: "0", right: "0", bottom: "0", left: "0" } });
  await browser.close();
  console.log(`✅ CV generado en public${profile.cvPath}`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
