// The playground's saved snippet: guarded storage access and the `?reset` parameter. Run with:
//   npx tsx --test lib/playground/__tests__/savedCode.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STORAGE_KEY,
  browserStorage,
  clearSavedCode,
  loadSavedCode,
  readSavedCode,
  withoutReset,
  wantsReset,
  writeSavedCode,
  type CodeStorage,
} from '../savedCode';

function memoryStorage(initial: Record<string, string> = {}): CodeStorage & { data: Map<string, string> } {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => { data.set(key, value); },
    removeItem: (key) => { data.delete(key); },
  };
}

/** Storage whose every method throws, as a full quota or a locked-down browser does */
const throwingStorage: CodeStorage = {
  getItem: () => { throw new Error('SecurityError'); },
  setItem: () => { throw new Error('QuotaExceededError'); },
  removeItem: () => { throw new Error('SecurityError'); },
};

test('reads, writes and clears the saved snippet', () => {
  const storage = memoryStorage();
  assert.equal(readSavedCode(storage), null);
  assert.equal(writeSavedCode(storage, 'return <Button/>;'), true);
  assert.equal(storage.data.get(STORAGE_KEY), 'return <Button/>;');
  assert.equal(readSavedCode(storage), 'return <Button/>;');
  assert.equal(clearSavedCode(storage), true);
  assert.equal(readSavedCode(storage), null);
});

test('an empty snippet is still a saved snippet', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '' });
  assert.equal(readSavedCode(storage), '');
  assert.deepEqual(loadSavedCode('', storage), { code: '', reset: false });
});

test('storage that throws never throws out of the helpers', () => {
  assert.equal(readSavedCode(throwingStorage), null);
  assert.equal(writeSavedCode(throwingStorage, 'x'), false);
  assert.equal(clearSavedCode(throwingStorage), false);
  assert.deepEqual(loadSavedCode('', throwingStorage), { code: null, reset: false });
  assert.deepEqual(loadSavedCode('?reset', throwingStorage), { code: null, reset: true });
});

test('missing storage is handled like blocked storage', () => {
  assert.equal(readSavedCode(null), null);
  assert.equal(writeSavedCode(null, 'x'), false);
  assert.equal(clearSavedCode(null), false);
  assert.deepEqual(loadSavedCode('', null), { code: null, reset: false });
});

test('browserStorage returns null without a window and when reading localStorage throws', (t) => {
  const g = globalThis as { window?: unknown };
  const had = 'window' in g;
  const previous = g.window;
  t.after(() => {
    if (had) g.window = previous;
    else delete g.window;
  });

  delete g.window;
  assert.equal(browserStorage(), null);

  // A browser that blocks storage throws on the property access itself
  g.window = Object.defineProperty({}, 'localStorage', {
    get() { throw new Error('SecurityError'); },
  });
  assert.equal(browserStorage(), null);

  const storage = memoryStorage();
  g.window = { localStorage: storage };
  assert.equal(browserStorage(), storage);
});

test('?reset is recognised with or without a value, among other parameters', () => {
  assert.equal(wantsReset('?reset'), true);
  assert.equal(wantsReset('?reset='), true);
  assert.equal(wantsReset('?reset=1'), true);
  assert.equal(wantsReset('?theme=dark&reset'), true);
  assert.equal(wantsReset(''), false);
  assert.equal(wantsReset('?resetting=1'), false);
  assert.equal(wantsReset('?theme=dark'), false);
});

test('?reset clears the saved snippet and does not return it', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: 'while (true) {}', other: 'kept' });
  assert.deepEqual(loadSavedCode('?reset', storage), { code: null, reset: true });
  assert.equal(storage.data.has(STORAGE_KEY), false);
  assert.equal(storage.data.get('other'), 'kept');
});

test('without ?reset the saved snippet is returned and left in place', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: 'return <Badge/>;' });
  assert.deepEqual(loadSavedCode('', storage), { code: 'return <Badge/>;', reset: false });
  assert.deepEqual(loadSavedCode('?theme=dark', storage), { code: 'return <Badge/>;', reset: false });
  assert.equal(storage.data.get(STORAGE_KEY), 'return <Badge/>;');
});

test('the reset parameter is dropped from the URL, the rest stays', () => {
  assert.equal(withoutReset('https://vaneui.com/playground?reset'), '/playground');
  assert.equal(withoutReset('https://vaneui.com/playground?reset=1&theme=dark#preview'), '/playground?theme=dark#preview');
  assert.equal(withoutReset('https://vaneui.com/playground?theme=dark'), '/playground?theme=dark');
});
