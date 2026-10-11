// Unit tests for the include-aware modified date, with git stubbed out. Run with:
//   npx tsx --test lib/docs/__tests__/gitDate.test.ts

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { modifiedDateWithIncludes } from '../gitDate';

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
  assert.equal(modifiedDateWithIncludes(page, dateOf, dataDir).toISOString(), '2026-03-01T00:00:00.000Z');
  assert.deepEqual(asked, [page, note, tip]);
});

test('a page newer than its includes keeps its own date', () => {
  const { dateOf } = stubDates(new Map([
    [page, '2026-05-01T00:00:00Z'],
    [note, '2026-02-01T00:00:00Z'],
    [tip, '2026-03-01T00:00:00Z'],
  ]));
  assert.equal(modifiedDateWithIncludes(page, dateOf, dataDir).toISOString(), '2026-05-01T00:00:00.000Z');
});

test('a page without includes, or with no file on disk, uses its own date only', () => {
  const { asked, dateOf } = stubDates(new Map([[plain, '2026-04-01T00:00:00Z']]));
  assert.equal(modifiedDateWithIncludes(plain, dateOf, dataDir).toISOString(), '2026-04-01T00:00:00.000Z');
  const missing = path.join(dataDir, 'guide/missing.md');
  modifiedDateWithIncludes(missing, dateOf, dataDir);
  assert.deepEqual(asked, [plain, missing]);
});
