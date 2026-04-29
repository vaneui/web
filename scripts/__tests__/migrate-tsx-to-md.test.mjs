import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tsxToMarkdown } from '../migrate-tsx-to-md.mjs';

const SINGLE_PART_FIXTURE = `'use client';
import { Button } from '@vaneui/ui';
import React from 'react';
import { DocsPagePart } from '../../types';

export const exampleExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Plain example.',
    component: <Button primary>Click</Button>,
  },
];
`;

test('single-part fixture: emits frontmatter, heading, prose, and demo fence', () => {
  const out = tsxToMarkdown(
    SINGLE_PART_FIXTURE,
    'example',
    'Example',
    'A short description.',
  );

  // Frontmatter block
  assert.match(out, /^---\n/);
  assert.match(out, /componentKey: example/);
  assert.match(
    out,
    /importPath: 'import \{ Example \} from "@vaneui\/ui"'/,
  );
  assert.match(
    out,
    /sourceUrl: https:\/\/github\.com\/vaneui\/vaneui\/blob\/main\/src\/components\/ui\/example\.tsx/,
  );
  assert.match(out, /since: 0\.9\.0/);
  // Frontmatter is closed before any heading.
  const fmEnd = out.indexOf('\n---\n', 4);
  assert.ok(fmEnd > 0, 'frontmatter must be closed');

  // Description prose appears between frontmatter and first heading.
  assert.match(out, /A short description\./);

  // Heading + prose
  assert.match(out, /## Basic Usage/);
  assert.match(out, /Plain example\./);

  // Demo fence with the JSX source
  assert.match(out, /```tsx demo\n<Button primary>Click<\/Button>\n```/);
});

const MULTI_PART_FIXTURE = `'use client';
import { Foo, Bar } from '@vaneui/ui';
import React from 'react';
import { DocsPagePart } from '../../types';

export const fooExamples: DocsPagePart[] = [
  {
    title: 'First Section',
    md: 'First prose.',
    component: <Foo />,
  },
  {
    title: 'Second Section',
    md: 'Second prose.',
    component: (
      <Bar a={1}>
        <span>nested</span>
      </Bar>
    ),
  },
];
`;

test('multi-part fixture: both sections appear, in order', () => {
  const out = tsxToMarkdown(
    MULTI_PART_FIXTURE,
    'foo',
    'Foo',
    'Foo description.',
  );

  const firstIdx = out.indexOf('## First Section');
  const secondIdx = out.indexOf('## Second Section');
  assert.ok(firstIdx > 0, 'first heading must be present');
  assert.ok(secondIdx > 0, 'second heading must be present');
  assert.ok(firstIdx < secondIdx, 'sections must be in source order');

  assert.match(out, /First prose\./);
  assert.match(out, /Second prose\./);

  // Both demo fences present.
  assert.match(out, /```tsx demo\n<Foo \/>\n```/);
  // Multi-line JSX dedented and wrapped in a fence.
  assert.match(
    out,
    /```tsx demo\n<Bar a=\{1\}>\n  <span>nested<\/span>\n<\/Bar>\n```/,
  );
});

test('explicit code override is preferred over component JSX source', () => {
  const fixture = `'use client';
import React from 'react';
import { DocsPagePart } from '../../types';

export const widgetExamples: DocsPagePart[] = [
  {
    title: 'Custom Code',
    md: 'Prose here.',
    component: <Widget />,
    code: '<Widget primary danger />',
  },
];
`;
  const out = tsxToMarkdown(fixture, 'widget', 'Widget', 'desc');
  assert.match(out, /```tsx demo\n<Widget primary danger \/>\n```/);
  assert.ok(
    !out.includes('<Widget />'),
    'auto-extracted JSX should not appear when code override exists',
  );
});

test('empty code field suppresses fence emission entirely', () => {
  const fixture = `'use client';
import React from 'react';
import { DocsPagePart } from '../../types';

export const widgetExamples: DocsPagePart[] = [
  {
    title: 'No Fence',
    md: 'Prose with embedded fence already.',
    component: <Widget />,
    code: '',
  },
];
`;
  const out = tsxToMarkdown(fixture, 'widget', 'Widget', 'desc');
  assert.ok(
    !out.includes('```tsx demo'),
    'empty code field should suppress fence emission',
  );
  assert.match(out, /## No Fence/);
});

test('throws when no *Examples export is found', () => {
  const fixture = `'use client';
const x = 1;
export const otherSymbols = [];
`;
  assert.throws(
    () => tsxToMarkdown(fixture, 'x', 'X', 'desc'),
    /No \*Examples export found/,
  );
});

test('throws when *Examples is empty', () => {
  const fixture = `export const fooExamples = [];`;
  assert.throws(
    () => tsxToMarkdown(fixture, 'foo', 'Foo', 'desc'),
    /No DocsPagePart entries extracted/,
  );
});
