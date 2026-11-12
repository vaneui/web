// `dark:` utilities must follow the site's theme toggle, which sets data-theme on
// <html>. Tailwind's default `dark` variant follows the operating system's scheme
// instead, so a visitor whose toggle and system disagree got dark-mode colours on
// a light page (and the reverse) in the props tables and code blocks.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { compile } from 'tailwindcss';

const globals = fs.readFileSync(new URL('../../app/globals.css', import.meta.url), 'utf8');

/** The `@custom-variant dark ...;` statement of app/globals.css, or '' when there is none */
function darkVariant(css) {
  return /^@custom-variant dark\b[^;]*;/m.exec(css)?.[0] ?? '';
}

async function compileDark(variant) {
  const { build } = await compile(`${variant}\n@tailwind utilities;`);
  return build(['dark:underline']);
}

test('without a custom variant, `dark:` follows the operating system (what this guards against)', async () => {
  assert.match(await compileDark(''), /prefers-color-scheme:\s*dark/);
});

test('app/globals.css ties the `dark:` variant to data-theme', async () => {
  const variant = darkVariant(globals);
  assert.notEqual(variant, '', 'app/globals.css declares no `@custom-variant dark`');

  const css = await compileDark(variant);
  assert.match(css, /\.dark\\:underline/);
  assert.doesNotMatch(css, /prefers-color-scheme/);
  assert.match(css, /\[data-theme="dark"\]/);
  // A light island inside a dark page keeps the light value
  assert.match(css, /:not\([^{]*\[data-theme="light"\]/);
});
