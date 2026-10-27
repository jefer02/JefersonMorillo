// Local visual review: `node scripts/screenshots.mjs [baseUrl] [outDir] [--full] [--reduced]`.
// Captures 375 / 768 / 1440 px in both themes. Output is gitignored.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) ?? "http://localhost:3000";
const out = args.find((a) => !a.startsWith("http") && !a.startsWith("--")) ?? "screenshots";
const full = args.includes("--full");
const reduced = args.includes("--reduced");
const path = args.find((a) => a.startsWith("--path="))?.slice(7) ?? "/";
const selector = args.find((a) => a.startsWith("--selector="))?.slice(11);
const only = args
  .find((a) => a.startsWith("--sizes="))
  ?.slice(8)
  .split(",");
const themes = args
  .find((a) => a.startsWith("--themes="))
  ?.slice(9)
  .split(",") ?? ["light", "dark"];
mkdirSync(out, { recursive: true });

const sizes = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

const browser = await chromium.launch();
for (const theme of themes) {
  for (const s of sizes.filter((x) => !only || only.includes(x.name))) {
    const ctx = await browser.newContext({
      viewport: { width: s.width, height: s.height },
      colorScheme: theme,
      reducedMotion: reduced ? "reduce" : "no-preference",
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => console.error(`[${theme} ${s.name}] pageerror:`, e.message));
    page.on("console", (m) => m.type() === "error" && console.error(`[${theme} ${s.name}] console:`, m.text()));
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    if (full || selector) {
      // Full-page captures don't scroll, so lazily rendered chapters (content-visibility)
      // and armed reveals would stay blank: render everything for the capture.
      await page.addStyleTag({
        content:
          "main > section, body > footer { content-visibility: visible !important } [data-armed] .reveal-item { opacity: 1 !important; transform: none !important }",
      });
    }
    await page.waitForTimeout(3500);
    const tag = selector ? selector.replace(/[^a-z0-9-]/gi, "") : path === "/" ? "home" : path.replaceAll("/", "_");
    const file = `${out}/${tag}-${s.name}-${theme}${reduced ? "-reduced" : ""}${full ? "-full" : ""}.png`;
    if (selector) {
      // Scroll through so reveals fire, then capture the element's box from a full-page shot.
      const el = page.locator(selector).first();
      await el.scrollIntoViewIfNeeded();
      await page.evaluate(async (sel) => {
        const node = document.querySelector(sel);
        const top = node.getBoundingClientRect().top + window.scrollY;
        for (let y = top - 200; y < top + node.offsetHeight; y += 300) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      }, selector);
      await page.waitForTimeout(1200);
      const box = await el.evaluate((n) => {
        const r = n.getBoundingClientRect();
        return { x: 0, y: r.top + window.scrollY, width: document.documentElement.clientWidth, height: r.height };
      });
      await page.screenshot({ path: file, fullPage: true, clip: box });
    } else {
      await page.screenshot({ path: file, fullPage: full });
    }
    console.log("saved", file);
    await ctx.close();
  }
}
await browser.close();
