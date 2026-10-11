// Unit tests for the docs include helper and the readers built on it, using
// Node's built-in test runner. Run with:
//   npx tsx --test lib/docs/__tests__/includes.test.ts

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { IncludeError } from '@vaneui/md/include';

import {
  displayPath,
  docIncludes,
  docsDataDir,
  expandDocIncludes,
  includeTagLines,
  isMissingFileError,
  readDocMarkdown,
} from '../includes.mjs';
import { extractFences } from '../extractFences';
import { parseFrontmatter } from '../frontmatter';
import { readPageMarkdown } from '../pageMarkdown';
import { extractMarkdownHeadings } from '../../../app/utils/stringUtils';

// A repository root with an app/docs/data tree, as the readers expect
const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-includes-')));
const dataDir = docsDataDir(root);
after(() => rmSync(root, { recursive: true, force: true }));

function write(file: string, lines: string[]): string {
  const abs = path.join(dataDir, file);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, lines.join('\n'));
  return abs;
}

const note = write('_partials/install-note.md', [
  '---',
  'title: Not a page',
  '---',
  '',
  '## Shared install note',
  '',
  'Install the package first.',
  '',
  '{% include "./nested/tip.md" %}',
  '',
  '```tsx demo',
  '<Button>Shared</Button>',
  '```',
  '',
]);
const tip = write('_partials/nested/tip.md', ['> Shared tip.']);

const page = write('guide/page.md', [
  '---',
  'componentKey: button',
  '---',
  '',
  '## Own section',
  '',
  '```tsx demo',
  '<Button>Own</Button>',
  '```',
  '',
  '{% include "../_partials/install-note.md" %}',
  '',
  '```md',
  '{% include "../_partials/missing.md" %}',
  '```',
  '',
  '{% include file="/_partials/nested/tip.md" /%}',
]);

const broken = write('guide/broken.md', ['# Broken', '', '{% include "../_partials/missing.md" %}']);

test('expandDocIncludes inlines relative and root-relative includes, nested ones too', () => {
  const raw = '## Own\n\n{% include "../_partials/install-note.md" %}\n\n{% include "/_partials/nested/tip.md" /%}\n';
  const md = expandDocIncludes(raw, page, { dataDir });
  assert.equal(md, [
    '## Own',
    '',
    '## Shared install note',
    '',
    'Install the package first.',
    '',
    '> Shared tip.',
    '',
    '```tsx demo',
    '<Button>Shared</Button>',
    '```',
    '',
    '> Shared tip.',
    '',
  ].join('\n'));
});

test('readDocMarkdown keeps the page frontmatter, drops the partial one and leaves fenced tags alone', () => {
  const md = readDocMarkdown(page, { dataDir });
  assert.ok(md);
  const { frontmatter, body } = parseFrontmatter(md);
  assert.deepEqual(frontmatter, { componentKey: 'button' });
  assert.ok(!body.includes('title: Not a page'));
  assert.ok(body.includes('```md\n{% include "../_partials/missing.md" %}\n```'));
  assert.ok(!body.includes('{% include "../_partials/install-note.md" %}'));
});

test('readDocMarkdown returns null for a missing file', () => {
  assert.equal(readDocMarkdown(path.join(dataDir, 'guide/nope.md'), { dataDir }), null);
});

test('readDocMarkdown treats a directory, a path through a file and an overlong name as missing', () => {
  // EISDIR, ENOTDIR and ENAMETOOLONG: any docs URL can name such a path
  assert.equal(readDocMarkdown(path.join(dataDir, 'guide'), { dataDir }), null);
  assert.equal(readDocMarkdown(path.join(page, 'nested.md'), { dataDir }), null);
  assert.equal(readDocMarkdown(path.join(dataDir, 'guide', `${'a'.repeat(300)}.md`), { dataDir }), null);
  assert.equal(docIncludes(path.join(dataDir, 'guide', `${'a'.repeat(300)}.md`), { dataDir }).length, 0);
});

test('isMissingFileError accepts only the codes for a file that is not there', () => {
  for (const code of ['ENOENT', 'ENOTDIR', 'EISDIR', 'ENAMETOOLONG']) {
    assert.equal(isMissingFileError(Object.assign(new Error(code), { code })), true, code);
  }
  assert.equal(isMissingFileError(Object.assign(new Error('EACCES'), { code: 'EACCES' })), false);
  assert.equal(isMissingFileError(new Error('no code')), false);
  assert.equal(isMissingFileError(null), false);
  assert.equal(isMissingFileError('ENOENT'), false);
});

test('expandDocIncludes drops a byte order mark and normalizes line endings', () => {
  assert.equal(expandDocIncludes('\uFEFF---\r\ntitle: A\r\n---\r\n\r\nText\r\n', page, { dataDir }), '---\ntitle: A\n---\n\nText\n');
});

test('included headings reach the table of contents and included demos get fence ids', () => {
  const { body } = parseFrontmatter(readDocMarkdown(page, { dataDir }) ?? '');
  assert.deepEqual(extractMarkdownHeadings(body).map((h) => h.title), ['Own section', 'Shared install note']);
  const demos = extractFences(body).fences.filter((f) => f.kind === 'demo');
  assert.deepEqual(demos.map((f) => [f.id, f.body]), [
    ['0', '<Button>Own</Button>'],
    ['1', '<Button>Shared</Button>'],
  ]);
});

test('includeTagLines lists the lines of the tags in the file itself, skipping fenced ones', () => {
  const source = readFileSync(page, 'utf8');
  assert.deepEqual(includeTagLines(source, page, { dataDir }), [11, 17]);
  assert.deepEqual(includeTagLines(readFileSync(note, 'utf8'), note, { dataDir }), [9]);
  assert.deepEqual(includeTagLines('No tags.\n', page, { dataDir }), []);
});

test('docIncludes lists every included file once, in first-seen order', () => {
  assert.deepEqual(docIncludes(page, { dataDir }), [note, tip]);
  assert.deepEqual(docIncludes(tip, { dataDir }), []);
  assert.deepEqual(docIncludes(path.join(dataDir, 'guide/nope.md'), { dataDir }), []);
});

test('a missing include throws an IncludeError that leads with the file and line', () => {
  assert.throws(() => readDocMarkdown(broken, { dataDir }), (error: unknown) => {
    assert.ok(error instanceof IncludeError);
    assert.equal(error.code, 'not-found');
    assert.equal(error.from, broken);
    assert.equal(error.line, 3);
    // The fixture lies outside the working directory, so its path stays absolute
    assert.equal(error.message, `${displayPath(broken)}:3: Include "../_partials/missing.md" not found`);
    // The library's error, with its path relative to the docs root, is kept as the cause
    assert.ok(error.cause instanceof IncludeError);
    assert.equal(error.cause.message, 'Include "../_partials/missing.md" not found (in guide/broken.md:3)');
    return true;
  });
});

test('displayPath shows a file relative to the repository root, or absolute outside it', () => {
  const repo = path.resolve('repo');
  assert.equal(displayPath(path.join(repo, 'app', 'docs', 'data', 'basic-components', 'badge.md'), repo),
    'app/docs/data/basic-components/badge.md');
  assert.equal(displayPath(path.resolve('elsewhere', 'x.md'), repo), path.resolve('elsewhere', 'x.md'));
  assert.equal(displayPath(broken, process.cwd()), broken);
});

test('cycles and includes outside the data directory fail', () => {
  const a = write('_partials/cycle-a.md', ['{% include "./cycle-b.md" %}']);
  const b = write('_partials/cycle-b.md', ['{% include "./cycle-a.md" %}']);
  assert.throws(() => readDocMarkdown(a, { dataDir }), (error: unknown) =>
    error instanceof IncludeError && error.code === 'cycle'
      && error.message === `${b}:1: Include cycle: _partials/cycle-a.md -> _partials/cycle-b.md -> _partials/cycle-a.md`);

  writeFileSync(path.join(dataDir, '..', 'outside.md'), 'Not docs content.');
  const escape = write('guide/escape.md', ['{% include "../../outside.md" %}']);
  assert.throws(() => readDocMarkdown(escape, { dataDir }), (error: unknown) =>
    error instanceof IncludeError && error.code === 'outside-root' && error.message.startsWith(`${escape}:1: `));
});

test('readPageMarkdown expands includes and lets include errors through', () => {
  const section = { name: 'Guide', slug: 'guide', description: '', pages: [] };
  const md = readPageMarkdown(root, section, { slug: 'page', name: 'Page', description: '' });
  assert.ok(md?.includes('## Shared install note'));

  // A broken page must not fall through to the next candidate (mdPath) or read as empty
  write('guide/fallback.md', ['## Fallback']);
  assert.throws(
    () => readPageMarkdown(root, section, { slug: 'broken', name: 'Broken', description: '', mdPath: 'fallback.md' }),
    IncludeError,
  );
});
