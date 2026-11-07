// Unit tests for how a package-owned Markdown file (CHANGELOG.md) reaches the docs. Run with:
//   npx tsx --test lib/docs/__tests__/packageMarkdown.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { packageMarkdownBody } from '../pageMarkdown';

const release = '## 1.5.0\n\n`2026-10-31`\n\n### Added\n\n- A prop.\n';

test('drops the leading H1 and an empty Unreleased section', () => {
  const md = `# Changelog\n\nIntro.\n\n## Unreleased\n\n${release}`;
  assert.equal(packageMarkdownBody(md), `\nIntro.\n\n${release}`);
});

test('drops an empty Unreleased section in brackets, with CRLF line endings, or at the end of the file', () => {
  assert.equal(packageMarkdownBody(`# Changelog\r\n\r\n## [Unreleased]\r\n\r\n${release}`), `\n${release}`);
  assert.equal(packageMarkdownBody('# Changelog\n\n## Unreleased\n\n'), '\n');
});

test('keeps an Unreleased section that has entries', () => {
  const md = `# Changelog\n\n## Unreleased\n\n- Pending fix.\n\n${release}`;
  assert.equal(packageMarkdownBody(md), `\n## Unreleased\n\n- Pending fix.\n\n${release}`);
});

test('keeps an "Unreleased" heading at a deeper level or inside another heading', () => {
  const md = `# Changelog\n\n### Unreleased\n\n## Unreleased features\n\n${release}`;
  assert.equal(packageMarkdownBody(md), `\n### Unreleased\n\n## Unreleased features\n\n${release}`);
});
