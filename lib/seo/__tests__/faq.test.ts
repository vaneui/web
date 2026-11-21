// Unit tests for reading a docs page's FAQ section. Run with:
//   npx tsx --test lib/seo/__tests__/faq.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';

import { docsSectionsMeta } from '../../../app/docs/docsMetadata';
import { parseFrontmatter } from '../../docs/frontmatter';
import { readPageMarkdown } from '../../docs/pageMarkdown';
import { FAQ_HEADING, faqEntries } from '../faq';

const repoRoot = path.resolve(__dirname, '../../..');

test('faqEntries reads the H3s under the FAQ heading and stops at the next H2', () => {
  const md = [
    'Intro.',
    '',
    '## Sizes',
    '',
    '### Not a question',
    '',
    'Outside the FAQ.',
    '',
    `## ${FAQ_HEADING}`,
    '',
    '### Can a Button be a link?',
    '',
    'Yes. Pass `href` and it renders an `<a>`.',
    'See [Row](/docs/layout-components/row#gap) for **spacing**.',
    '',
    '### Does it submit forms?',
    '',
    '- It sets no `type`.',
    '- Pass `type="button"`.',
    '',
    '## Related',
    '',
    '### Also not a question',
    '',
    'After the FAQ.',
  ].join('\n');

  assert.deepEqual(faqEntries(md), [
    {
      question: 'Can a Button be a link?',
      answer: 'Yes. Pass href and it renders an <a>. See Row for spacing.',
    },
    { question: 'Does it submit forms?', answer: 'It sets no type. Pass type="button".' },
  ]);
});

test('faqEntries skips code fences and folds a deeper heading into its answer', () => {
  const md = [
    `## ${FAQ_HEADING}`,
    '### How do I size it?',
    'Use a size prop.',
    '```tsx',
    '### not a question',
    '<Button lg/>',
    '```',
    '#### On mobile',
    'It keeps the size.',
  ].join('\n');

  assert.deepEqual(faqEntries(md), [
    { question: 'How do I size it?', answer: 'Use a size prop. On mobile It keeps the size.' },
  ]);
});

test('faqEntries gives nothing without the section, and drops questions without an answer', () => {
  assert.deepEqual(faqEntries('## Sizes\n\n### Small\n\nText.'), []);
  assert.deepEqual(faqEntries(`## ${FAQ_HEADING}\n\nNo questions yet.`), []);
  assert.deepEqual(faqEntries(`## ${FAQ_HEADING}\n\n### Empty?\n\n### Full?\n\nYes.`), [
    { question: 'Full?', answer: 'Yes.' },
  ]);
  // The heading must be an H2, not any level
  assert.deepEqual(faqEntries(`### ${FAQ_HEADING}\n\n#### Q?\n\nA.`), []);
});

test('real pages: each FAQ gives 3 to 8 plain-text questions and answers', () => {
  let pages = 0;
  for (const section of docsSectionsMeta) {
    for (const page of section.pages) {
      const { body } = parseFrontmatter(readPageMarkdown(repoRoot, section, page) ?? '');
      const faq = faqEntries(body);
      if (!body.includes(`\n## ${FAQ_HEADING}\n`)) {
        assert.equal(faq.length, 0, `${section.slug}/${page.slug}`);
        continue;
      }
      pages++;
      const name = `${section.slug}/${page.slug}`;
      assert.ok(faq.length >= 3 && faq.length <= 8, `${name}: ${faq.length} questions`);
      for (const { question, answer } of faq) {
        assert.ok(question.endsWith('?'), `${name}: "${question}" is a question`);
        assert.ok(answer.split(' ').length >= 20, `${name}: "${question}" has an answer`);
        // Markdown syntax never reaches the structured data
        assert.doesNotMatch(question + answer, /\]\(|`|\*\*|\{%/, `${name}: "${question}" is plain text`);
      }
    }
  }
  assert.ok(pages >= 30, `${pages} pages with an FAQ`);
});
