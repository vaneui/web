// Unit tests for the docs page dates (include-aware modified date, shallow
// history, changelog dates), with git stubbed out. Run with:
//   npx tsx --test lib/docs/__tests__/gitDate.test.ts

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { changelogDates, createGitDates, ensureFullHistory, modifiedDateWithIncludes, type GitRunner } from '../gitDate';

const dataDir = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-dates-')));
after(() => rmSync(dataDir, { recursive: true, force: true }));

function write(file: string, text: string): string {
  const abs = path.join(dataDir, file);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, text);
  return abs;
}

const tip = write('_partials/tip.md', 'Tip.\n');
const note = write('_partials/note.md', 'Note.\n\n{% include "./tip.md" %}\n');
const page = write('guide/page.md', '## Page\n\n{% include "../_partials/note.md" %}\n');
const plain = write('guide/plain.md', '## Plain\n');

/** A stub for the git lookup: fixed dates per file, recording which files were asked for */
function stubDates(dates: Map<string, string>) {
  const asked: string[] = [];
  const dateOf = (file: string) => {
    asked.push(file);
    return new Date(dates.get(file) ?? '2000-01-01T00:00:00Z');
  };
  return { asked, dateOf };
}

test('the modified date is the latest among the page and every file it includes', () => {
  const { asked, dateOf } = stubDates(new Map([
    [page, '2026-01-01T00:00:00Z'],
    [note, '2026-02-01T00:00:00Z'],
    [tip, '2026-03-01T00:00:00Z'],
  ]));
  assert.equal(modifiedDateWithIncludes(page, dateOf, dataDir)?.toISOString(), '2026-03-01T00:00:00.000Z');
  assert.deepEqual(asked, [page, note, tip]);
});

test('a page newer than its includes keeps its own date', () => {
  const { dateOf } = stubDates(new Map([
    [page, '2026-05-01T00:00:00Z'],
    [note, '2026-02-01T00:00:00Z'],
    [tip, '2026-03-01T00:00:00Z'],
  ]));
  assert.equal(modifiedDateWithIncludes(page, dateOf, dataDir)?.toISOString(), '2026-05-01T00:00:00.000Z');
});

test('a page without includes, or with no file on disk, uses its own date only', () => {
  const { asked, dateOf } = stubDates(new Map([[plain, '2026-04-01T00:00:00Z']]));
  assert.equal(modifiedDateWithIncludes(plain, dateOf, dataDir)?.toISOString(), '2026-04-01T00:00:00.000Z');
  const missing = path.join(dataDir, 'guide/missing.md');
  modifiedDateWithIncludes(missing, dateOf, dataDir);
  assert.deepEqual(asked, [plain, missing]);
});

test('files without a date are skipped, and no date at all gives undefined', () => {
  const dateOf = (file: string) => (file === note ? new Date('2026-02-01T00:00:00Z') : undefined);
  assert.equal(modifiedDateWithIncludes(page, dateOf, dataDir)?.toISOString(), '2026-02-01T00:00:00.000Z');
  assert.equal(modifiedDateWithIncludes(plain, () => undefined, dataDir), undefined);
});

/**
 * A stub git: `shallow` answers `rev-parse --is-shallow-repository` (a function
 * so a fetch can change it), `log` maps a file to the commit dates `git log`
 * prints for it, newest first, and `fetch` decides whether a fetch from a
 * remote unshallows the repo. Records every call.
 */
function stubGit(opts: {
  shallow: () => boolean;
  log?: Record<string, string[]>;
  fetch?: (remote: string) => boolean;
}) {
  const calls: { args: string[]; timeout?: number }[] = [];
  let unshallowed = false;
  const git: GitRunner = (args, options) => {
    calls.push({ args, timeout: options?.timeout });
    if (args[0] === 'rev-parse') return [String(!unshallowed && opts.shallow())];
    if (args[0] === 'fetch') {
      if (opts.fetch?.(args[args.length - 1])) unshallowed = true;
      return [];
    }
    if (args[0] === 'log') {
      const lines = opts.log?.[args[args.length - 1]] ?? [];
      return args.includes('-1') ? lines.slice(0, 1) : lines;
    }
    return [];
  };
  return { git, calls };
}

test('a shallow clone gives no git dates and never runs git log', () => {
  const { git, calls } = stubGit({
    shallow: () => true,
    log: { [plain]: ['2026-10-06T12:23:19+00:00'] },
  });
  const dates = createGitDates(git);
  assert.equal(dates.lastGitDate(plain), undefined);
  assert.equal(dates.firstGitDate(plain), undefined);
  assert.equal(dates.lastModifiedDate(plain), undefined);
  assert.equal(dates.lastPathsDate(['app/landing']), undefined);
  assert.deepEqual(calls.map(call => call.args[0]), ['rev-parse']);
});

test('full history gives the newest commit as modified and the oldest as published, once per file', () => {
  const { git, calls } = stubGit({
    shallow: () => false,
    log: { [plain]: ['2026-09-14T08:02:11+00:00', '2026-08-20T11:24:46+00:00', '2026-07-01T09:00:00+00:00'] },
  });
  const dates = createGitDates(git);
  assert.equal(dates.lastGitDate(plain)?.toISOString(), '2026-09-14T08:02:11.000Z');
  assert.equal(dates.firstGitDate(plain)?.toISOString(), '2026-07-01T09:00:00.000Z');
  assert.equal(dates.lastGitDate(plain)?.toISOString(), '2026-09-14T08:02:11.000Z');
  assert.equal(calls.filter(call => call.args[0] === 'log').length, 2);
  assert.equal(calls.filter(call => call.args[0] === 'rev-parse').length, 1);
  assert.equal(dates.lastGitDate(path.join(dataDir, 'guide/untracked.md')), undefined);
});

test('ensureFullHistory leaves a full clone alone', () => {
  const { git, calls } = stubGit({ shallow: () => false });
  assert.equal(ensureFullHistory(git), 'full');
  assert.deepEqual(calls.map(call => call.args[0]), ['rev-parse']);
});

test('ensureFullHistory falls back to the public repo when origin cannot unshallow', () => {
  const { git, calls } = stubGit({
    shallow: () => true,
    fetch: remote => remote === 'https://github.com/vaneui/web.git',
  });
  assert.equal(ensureFullHistory(git), 'unshallowed');
  const fetches = calls.filter(call => call.args[0] === 'fetch');
  assert.deepEqual(fetches.map(call => call.args.at(-1)), ['origin', 'https://github.com/vaneui/web.git']);
  assert.ok(fetches.every(call => call.args.includes('--unshallow') && call.timeout !== undefined));
});

test('ensureFullHistory reports a clone it could not unshallow', () => {
  const { git } = stubGit({ shallow: () => true, fetch: () => false });
  assert.equal(ensureFullHistory(git), 'shallow');
});

test('changelogDates reads the first and latest release dates', () => {
  const markdown = [
    '# Changelog', '', '## 1.4.4', '', '`2026-10-10`', '', 'Text with `2020-01-01` inline.', '',
    '## 1.1.0', '', '`2026-09-02`', '', '## 1.0.0', '', '`2026-08-16`', '',
  ].join('\n');
  const { first, last } = changelogDates(markdown);
  assert.equal(first?.toISOString(), '2026-08-16T00:00:00.000Z');
  assert.equal(last?.toISOString(), '2026-10-10T00:00:00.000Z');
  assert.deepEqual(changelogDates('# Changelog\n\nNo releases yet.\n'), { first: undefined, last: undefined });
});
