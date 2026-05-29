/**
 * Capture a 1200x630 Open Graph image of the vaneui-web hero section.
 *
 * Output: public/og-default.png — used as the default social-share preview
 * for vaneui.com (Twitter card, Facebook OG, LinkedIn preview, etc.).
 *
 * Requires: dev server running on http://localhost:3000 and Playwright's
 * chromium browser installed (`npx playwright install chromium`).
 *
 * Usage:
 *   npx tsx scripts/screenshot-og.ts
 *   npx tsx scripts/screenshot-og.ts --url http://localhost:3000
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
  await page.goto(url, { waitUntil: 'networkidle' });

  // Give web fonts a beat to settle before capture.
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
      url: { type: 'string', default: 'http://localhost:3000' },
    },
    strict: false,
  });

  await captureOg(values.url as string);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
