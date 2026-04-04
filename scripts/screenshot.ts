/**
 * Take full-height and section-by-section screenshots of the vaneui-web site.
 *
 * Requires: playwright (npm devDependency) + chromium browser
 *   npx playwright install chromium
 *
 * Usage:
 *   npx tsx scripts/screenshot.ts                              # screenshot localhost:3000 landing page
 *   npx tsx scripts/screenshot.ts --url http://localhost:3000/docs  # specific page
 *   npx tsx scripts/screenshot.ts --width 768                  # mobile viewport
 *   npx tsx scripts/screenshot.ts --sections 4                 # split into N viewport-height sections
 *   npx tsx scripts/screenshot.ts --clean                      # delete existing screenshots
 *
 * Screenshots are saved to screenshots/ (gitignored).
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_DIR = resolve(__dirname, '..');
const OUTPUT_DIR = resolve(PROJECT_DIR, 'screenshots');

function rel(absPath: string) {
  return relative(PROJECT_DIR, absPath);
}

function cleanup() {
  if (!existsSync(OUTPUT_DIR)) return;
  const files = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  for (const f of files) {
    unlinkSync(resolve(OUTPUT_DIR, f));
  }
  console.log(`Cleaned up ${files.length} file(s) from ${rel(OUTPUT_DIR)}/`);
}

async function takeScreenshots(
  url: string,
  width: number,
  height: number,
  sections: number,
) {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });

  console.log(`Navigating to ${url} ...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${pageHeight}px | Viewport: ${width}x${height}`);

  // Full-page screenshot
  const fullPath = resolve(OUTPUT_DIR, 'full-page.png');
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`  -> ${rel(fullPath)}`);

  // Section screenshots
  if (sections > 0) {
    const step = Math.max(Math.floor(pageHeight / sections), height);
    for (let i = 0; i < sections; i++) {
      const y = Math.min(i * step, Math.max(0, pageHeight - height));
      const name = `section-${i + 1}.png`;
      const path = resolve(OUTPUT_DIR, name);
      await page.evaluate((scrollY: number) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(400);
      await page.screenshot({ path });
      console.log(`  -> ${rel(path)}  (y=${y})`);
    }
  }

  await browser.close();
  console.log(`\nDone. ${sections + 1} screenshots in ${rel(OUTPUT_DIR)}/`);
}

async function main() {
  const { values } = parseArgs({
    options: {
      url: { type: 'string', default: 'http://localhost:3000' },
      width: { type: 'string', default: '1440' },
      height: { type: 'string', default: '900' },
      sections: { type: 'string', default: '8' },
      clean: { type: 'boolean', default: false },
    },
    strict: false,
  });

  if (values.clean) {
    cleanup();
    return;
  }

  await takeScreenshots(
    values.url as string,
    parseInt(values.width as string, 10),
    parseInt(values.height as string, 10),
    parseInt(values.sections as string, 10),
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
