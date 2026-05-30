/**
 * Capture a 1200x630 Open Graph image of the vaneui-web hero section.
 *
 * Output: public/og-default.png — used as the default social-share preview
 * for vaneui.com (Twitter card, Facebook OG, LinkedIn preview, etc.).
 *
 * Requires Playwright's chromium browser installed:
 *   npx playwright install chromium
 *
 * Usage — capture from the deployed site (preferred):
 *   npm run og:prod
 *   # or directly:
 *   npx tsx scripts/screenshot-og.ts --url https://vaneui.com
 *
 * Usage — capture from a local dev/preview server:
 *   npm run dev   # in another shell, wait until it's serving on :3000
 *   npm run og
 *   # or directly:
 *   npx tsx scripts/screenshot-og.ts --url http://localhost:3000
 *
 * Override via env var (useful in CI / Vercel preview):
 *   OG_URL=https://vaneui-web-git-pr-42.vercel.app npm run og
 *
 * The `--url` CLI flag takes precedence over `OG_URL`. No default fallback —
 * the URL must be explicit so we don't accidentally capture from the wrong
 * environment.
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_DIR = resolve(__dirname, '..');
const OUTPUT_PATH = resolve(PROJECT_DIR, 'public', 'og-default.png');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function rel(absPath: string) {
  return relative(PROJECT_DIR, absPath);
}

async function captureOg(url: string) {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: OG_WIDTH, height: OG_HEIGHT },
    deviceScaleFactor: 1,
  });

  console.log(`Navigating to ${url} ...`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  } catch (err) {
    await browser.close();
    throw new Error(
      `Failed to load ${url}. ` +
      `If targeting a local dev server, make sure \`npm run dev\` is running. ` +
      `If targeting production, check connectivity. Original error: ${(err as Error).message}`,
    );
  }

  // Give web fonts and any post-load animation a beat to settle.
  await page.waitForTimeout(500);

  await page.screenshot({
    path: OUTPUT_PATH,
    omitBackground: false,
    fullPage: false,
    clip: { x: 0, y: 0, width: OG_WIDTH, height: OG_HEIGHT },
  });

  await browser.close();
  console.log(`  -> ${rel(OUTPUT_PATH)} (${OG_WIDTH}x${OG_HEIGHT})`);
}

async function main() {
  const { values } = parseArgs({
    options: {
      url: { type: 'string' },
    },
    strict: false,
  });

  const url = (values.url as string | undefined) ?? process.env.OG_URL;
  if (!url) {
    console.error(
      'Error: capture URL required. Pass --url=<URL> or set OG_URL=<URL>.\n' +
      'Examples:\n' +
      '  npm run og:prod   # captures from https://vaneui.com\n' +
      '  npm run og        # captures from http://localhost:3000\n' +
      '  npx tsx scripts/screenshot-og.ts --url https://vaneui.com',
    );
    process.exit(2);
  }

  await captureOg(url);
}

main().catch(err => {
  console.error(err.message ?? err);
  process.exit(1);
});
