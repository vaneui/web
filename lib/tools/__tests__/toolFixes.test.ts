// Regression tests for bugs fixed in the free tools and the blocks gallery. The rules behind the
// Markdown editor's key presses, its undo-friendly edits and its sample dialog run here as plain
// functions; the rest is checked in the rendered markup.
// Run with:
//   npx tsx --test lib/tools/__tests__/toolFixes.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'node:module';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext, type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PathnameContext, SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

import { CopyValue, Segmented } from '../../../app/tools/_components/controls';
import { Inbox } from '../../../app/blocks/library/list-detail';
import { BLOCKS } from '../../../app/blocks/blocks';
import { draftNeedsConfirm, editText, takeShortcut, type EditableText, type ShortcutEvent } from '../../../app/tools/markdown-editor/editing';
import { SAMPLES } from '../../../app/tools/markdown-editor/samples';
import { togglesSearch } from '../../../app/components/search/searchShortcut';

// The theme generator imports stylesheets, which Node cannot load: they read as empty modules here
(Module as unknown as { _extensions: Record<string, (m: { exports: unknown }) => void> })
  ._extensions['.css'] = (m) => { m.exports = {}; };

const router = {
  push() {}, replace() {}, back() {}, forward() {}, refresh() {}, prefetch() {},
} as unknown as AppRouterInstance;

/** A key press as the browser hands it over, recording what the handler did with it */
function keyEvent(key: string, mods: Partial<Pick<ShortcutEvent, 'metaKey' | 'ctrlKey' | 'altKey' | 'shiftKey'>> = {}) {
  const e = {
    key, metaKey: false, ctrlKey: false, altKey: false, shiftKey: false, ...mods,
    defaultPrevented: false, propagationStopped: false,
    preventDefault() { e.defaultPrevented = true; },
    stopPropagation() { e.propagationStopped = true; },
  };
  return e;
}

/** The value of `attr` on every `tag` element in the markup */
function attrs(html: string, tag: string, attr: string): string[] {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\s${attr}="([^"]*)"`, 'g'))].map(m => m[1]);
}

const EDITOR_ACTIONS = [{ key: 'b' }, { key: 'i' }, { key: 'k' }, {}];

test('Ctrl+K in the Markdown editor inserts a link and does not open the site search', () => {
  for (const mods of [{ ctrlKey: true }, { metaKey: true }]) {
    const e = keyEvent('k', mods);
    assert.equal(takeShortcut(e, EDITOR_ACTIONS), EDITOR_ACTIONS[2]);
    assert.ok(e.defaultPrevented && e.propagationStopped, 'the editor marks its shortcut handled');
    // The site search listens on window and sees the same event after the editor
    assert.equal(togglesSearch(e, 'metaKey' in mods), false, 'a handled Ctrl+K must not toggle the search');
  }
  // Outside the editor the shortcut still opens the search, on each platform's key
  assert.equal(togglesSearch(keyEvent('k', { ctrlKey: true }), false), true);
  assert.equal(togglesSearch(keyEvent('K', { metaKey: true }), true), true);
  assert.equal(togglesSearch(keyEvent('k', { metaKey: true }), false), false);
  // Keys the editor has no shortcut for stay with the browser
  const plain = keyEvent('x', { ctrlKey: true });
  assert.equal(takeShortcut(plain, EDITOR_ACTIONS), undefined);
  assert.ok(!plain.defaultPrevented && !plain.propagationStopped);
});

/** A textarea whose browser edits the text in place, as `insertText` and `delete` do */
function fakeField(value: string) {
  const field = {
    value, selection: [0, 0] as [number, number], focused: false,
    focus() { field.focused = true; },
    setSelectionRange(start: number, end: number) { field.selection = [start, end]; },
  };
  const commands: [string, string | undefined][] = [];
  const doc = {
    execCommand(command: string, _ui?: boolean, text?: string) {
      commands.push([command, text]);
      const [start, end] = field.selection;
      field.value = field.value.slice(0, start) + (command === 'insertText' ? text ?? '' : '') + field.value.slice(end);
      return true;
    },
  };
  return { field: field as typeof field & EditableText, doc, commands };
}

test('a formatting edit goes through the browser editing command, so Ctrl+Z can undo it', () => {
  const { field, doc, commands } = fakeField('make this bold');
  assert.equal(editText(field, 'make **this** bold', doc), true);
  assert.equal(field.value, 'make **this** bold');
  // Only the changed part is replaced, so the undo step is that change and the caret stays near it
  assert.deepEqual(commands, [['insertText', '**this**']]);
  assert.ok(field.focused);

  const removal = fakeField('a **b** c');
  assert.equal(editText(removal.field, 'a  c', removal.doc), true);
  assert.deepEqual(removal.commands, [['delete', undefined]]);
  assert.equal(removal.field.value, 'a  c');
});

test('without the editing command the editor sets the text itself', () => {
  const { field } = fakeField('text');
  const throws = { execCommand(): boolean { throw new Error('not supported'); } };
  assert.equal(editText(field, 'text!', throws), false);
  const refuses = { execCommand: () => false };
  assert.equal(editText(fakeField('text').field, 'text!', refuses), false);
});

test('a sample asks before it replaces an edited draft', () => {
  assert.equal(draftNeedsConfirm('My own notes', SAMPLES), true);
  assert.equal(draftNeedsConfirm(`${SAMPLES[0].body}\nplus my edit`, SAMPLES), true);
  // Nothing to lose: an empty draft or a sample nobody changed is replaced at once
  assert.equal(draftNeedsConfirm('', SAMPLES), false);
  assert.equal(draftNeedsConfirm(' \n\t', SAMPLES), false);
  for (const sample of SAMPLES) assert.equal(draftNeedsConfirm(sample.body, SAMPLES), false);
});

test('the theme generator names a scale step\'s copy button after the step alone', async () => {
  const { ThemeGenerator } = await import('../../../app/tools/theme-generator/ThemeGenerator');
  const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router },
    createElement(PathnameContext.Provider, { value: '/tools/theme-generator' },
      createElement(SearchParamsContext.Provider, { value: new URLSearchParams() as never }, createElement(ThemeGenerator)))));
  const labels = attrs(html, 'button', 'aria-label').filter(l => l.startsWith('Copy '));
  // One per scale step. The step nearest the brand color was read out as "Copy 600 ●"
  assert.deepEqual(labels.filter(l => /^Copy \d+$/.test(l)).length, 11, `copy buttons: ${labels.join(', ')}`);
  assert.ok(!labels.some(l => l.includes('●')), `copy buttons: ${labels.join(', ')}`);
  // The dot stays as decoration, and the step reads as "600, nearest your color"
  const row = renderToStaticMarkup(createElement(CopyValue, { label: '600', value: '#3a5bd9', dense: true, mark: 'nearest your color' }));
  assert.deepEqual(attrs(row, 'button', 'aria-label'), ['Copy 600']);
  assert.match(row, /<span aria-hidden="true"> ●<\/span><span class="sr-only">, nearest your color<\/span>/);
});

test('the segmented control buttons keep the default button size, at least 24px tall', () => {
  const html = renderToStaticMarkup(createElement(Segmented, {
    label: 'Format', value: 'hex', onChange: () => {},
    options: [{ value: 'hex', label: 'HEX' }, { value: 'oklch', label: 'OKLCH' }],
  }));
  const sizes = attrs(html, 'button', 'data-size');
  assert.equal(sizes.length, 2);
  // An xs Button is 22px tall, under the 24px target size; sm is 30px
  assert.deepEqual(sizes, ['sm', 'sm']);
});

test('a long subject in the List and Detail block ends in an ellipsis inside its row', () => {
  const html = renderToStaticMarkup(createElement(Inbox, {}));
  const subject = html.match(/<p\b[^>]*class="([^"]*)"[^>]*>(?:(?!<\/p>).)*API rate limits/s);
  assert.ok(subject, 'no subject paragraph in the markup');
  const classes = subject[1].split(/\s+/);
  // `truncate` alone shrinks to the text and never cuts it; the full row width lets it cut
  assert.ok(classes.includes('truncate') && classes.includes('w-full'), `subject classes: ${classes.join(' ')}`);
});

test('the social card of a block exists only for a block that exists', async () => {
  const og = await import('../../../app/blocks/[slug]/opengraph-image');
  assert.deepEqual(og.generateImageMetadata({ params: { slug: 'any text at all' } }), []);
  const missing = await og.default({ params: Promise.resolve({ slug: 'any text at all' }) });
  assert.equal(missing.status, 404);
  assert.equal(og.generateImageMetadata({ params: { slug: BLOCKS[0].slug } }).length, 1);
});

test('Ahrefs analytics loads on site pages and not inside the block preview frames', async () => {
  // next/script injects its tag in the browser, so the test renders it as a plain <script>
  const load = (Module as unknown as { _load: (request: string, ...rest: unknown[]) => unknown });
  const original = load._load;
  load._load = function (request: string, ...rest: unknown[]) {
    if (request === 'next/script') {
      const Script = (props: { src: string }) => createElement('script', { src: props.src });
      return { __esModule: true, default: Script };
    }
    return original.call(this, request, ...rest);
  };
  try {
    const { SiteAnalytics } = await import('../../../app/components/SiteAnalytics');
    const at = (pathname: string) => renderToStaticMarkup(
      createElement(PathnameContext.Provider, { value: pathname }, createElement(SiteAnalytics) as ReactElement));
    assert.match(at('/docs/basic-components/button'), /analytics\.ahrefs\.com/);
    assert.match(at('/blocks/list-detail'), /analytics\.ahrefs\.com/);
    assert.doesNotMatch(at('/blocks/list-detail/preview/inbox'), /analytics\.ahrefs\.com/);
  } finally {
    load._load = original;
  }
  // The root layout used to load it for every page, the preview frames too
  const { readFileSync } = await import('node:fs');
  const layout = readFileSync(new URL('../../../app/layout.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(layout, /analytics\.ahrefs\.com/);
});
