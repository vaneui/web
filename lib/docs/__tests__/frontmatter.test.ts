// Hand-rolled unit tests for parseFrontmatter using Node's built-in test
// runner. Run with:
//   npx tsx --test lib/docs/__tests__/frontmatter.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { parseFrontmatter } from '../frontmatter';

test('returns body unchanged when no frontmatter delimiter is present', () => {
  const src = 'Hello world\n\n## Heading\n';
  const { frontmatter, body } = parseFrontmatter(src);
  assert.deepEqual(frontmatter, {});
  assert.equal(body, src);
});

test('parses simple key: value pairs and strips quotes', () => {
  const src = [
    '---',
    'componentKey: button',
    'since: 0.9.0',
    'tag: "stable"',
    "name: 'Button'",
    '---',
    '',
    'Body starts here.',
    '',
  ].join('\n');
  const { frontmatter, body } = parseFrontmatter(src);
  assert.equal(frontmatter.componentKey, 'button');
  assert.equal(frontmatter.since, '0.9.0');
  assert.equal(frontmatter.tag, 'stable');
  assert.equal(frontmatter.name, 'Button');
  assert.equal(body, '\nBody starts here.\n');
});

test('preserves colons inside quoted values (e.g. import statements)', () => {
  const src = [
    '---',
    "importPath: 'import { Button } from \"@vaneui/ui\"'",
    'sourceUrl: https://github.com/example/repo/blob/main/src/button.tsx',
    '---',
    '',
    'After.',
  ].join('\n');
  const { frontmatter, body } = parseFrontmatter(src);
  assert.equal(
    frontmatter.importPath,
    'import { Button } from "@vaneui/ui"',
  );
  assert.equal(
    frontmatter.sourceUrl,
    'https://github.com/example/repo/blob/main/src/button.tsx',
  );
  assert.equal(body, '\nAfter.');
});

test('trims trailing whitespace from values and ignores blank lines', () => {
  const src = '---\nfoo: bar   \n\nbaz:   qux\n---\nbody\n';
  const { frontmatter, body } = parseFrontmatter(src);
  assert.equal(frontmatter.foo, 'bar');
  assert.equal(frontmatter.baz, 'qux');
  assert.equal(body, 'body\n');
});

test('handles empty / no-closing-delimiter inputs gracefully', () => {
  assert.deepEqual(parseFrontmatter(''), { frontmatter: {}, body: '' });
  // No closing delimiter -> treated as no frontmatter.
  const noClose = '---\nfoo: bar\n';
  const r = parseFrontmatter(noClose);
  assert.deepEqual(r.frontmatter, {});
  assert.equal(r.body, noClose);
});

test('supports CRLF line endings', () => {
  const src = '---\r\nfoo: bar\r\n---\r\nbody\r\n';
  const { frontmatter, body } = parseFrontmatter(src);
  assert.equal(frontmatter.foo, 'bar');
  assert.equal(body, 'body\r\n');
});
