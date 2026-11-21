// Unit tests for the Markdown editor's exports. Run with:
//   npx tsx --test lib/markdown/__tests__/exports.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import { parse as parseYaml } from 'yaml';

import { markdownToHtml, markdownToJsx, textStats } from '../exports';

const SAMPLE = [
  '# Title',
  '',
  'Some **bold**, *em*, ~~gone~~ and `code` with a [link](https://vaneui.com "Home").',
  '',
  '## List',
  '',
  '- one',
  '- two',
  '',
  '3. three',
  '4. four',
  '',
  '> A quote',
  '',
  '---',
  '',
  '| A | B |',
  '|:--|--:|',
  '| 1 | 2 |',
  '',
  '```ts',
  'const a = `x ${y}`;',
  '```',
  '',
].join('\n');

test('markdownToJsx names the components Md renders with', () => {
  const jsx = markdownToJsx(SAMPLE);
  assert.match(jsx, /^import \{ Card, Code, Col, Divider, Link, List, ListItem, Table, Tbody, Td, Text, Th, Thead, Title, Tr \} from '@vaneui\/ui';/);
  assert.ok(jsx.includes('<Title xl tag="h1">Title</Title>'));
  assert.ok(jsx.includes('<Title lg tag="h2">List</Title>'));
  assert.ok(jsx.includes('<Text tag="strong" fontBold>bold</Text>'));
  assert.ok(jsx.includes('<Text tag="em" italic>em</Text>'));
  assert.ok(jsx.includes('<Text tag="s" lineThrough>gone</Text>'));
  assert.ok(jsx.includes('<Code secondary>code</Code>'));
  assert.ok(jsx.includes('<Link href="https://vaneui.com" title="Home">link</Link>'));
  assert.ok(jsx.includes('<List listDisc>'));
  assert.ok(jsx.includes('<List listDecimal start={3}>'));
  assert.ok(jsx.includes('<ListItem>one</ListItem>'));
  assert.ok(jsx.includes('<Card secondary borderL>'));
  assert.ok(jsx.includes('<Divider/>'));
  assert.ok(jsx.includes('<Td textRight>2</Td>'));
  // Backticks and ${ stay literal inside the template string
  assert.ok(jsx.includes('{`const a = \\`x \\${y}\\`;`}'));
});

test('markdownToJsx escapes JSX syntax in text', () => {
  const jsx = markdownToJsx('Use {braces} and <tags> & more.');
  assert.ok(jsx.includes('<Text>{"Use {braces} and <tags> & more."}</Text>'));
});

test('a vaneui fence exports as the components it describes', () => {
  const md = '```vaneui\nCard primary:\n  - Title xl: Welcome\n  - Button filled:\n      href: /start\n      text: Start\n      onClick: x\n```\n';
  const jsx = markdownToJsx(md, { parseYaml });
  assert.ok(jsx.includes('<Card primary>'));
  assert.ok(jsx.includes('<Title xl>Welcome</Title>'));
  assert.ok(jsx.includes('<Button filled href="/start">Start</Button>'));
  assert.ok(!jsx.includes('onClick'));
  // Without a parser it stays a code block
  assert.ok(markdownToJsx(md).includes('<pre><code>'));
});

test('markdownToHtml writes plain HTML, one block per line', () => {
  const html = markdownToHtml('# Hi\n\nText with <b>tags</b>.\n\n- a\n- b\n');
  assert.ok(html.startsWith('<h1>Hi</h1>\n'));
  assert.ok(html.includes('&lt;b&gt;'));
  assert.ok(html.includes('<ul>\n<li>a</li>\n<li>b</li>\n</ul>'));
  assert.ok(!html.includes('<article>'));
});

test('textStats counts words without the frontmatter', () => {
  const s = textStats('---\ntitle: x\n---\nOne two three, it’s four.\n');
  assert.equal(s.words, 5);
  assert.equal(s.minutes, 1);
});

test('frontmatter variables resolve like they do in Md', () => {
  const md = '---\ntitle: Hello\n---\n# {% $markdoc.frontmatter.title %}\n\nBy {% $markdoc.frontmatter.missing %}.\n';
  const jsx = markdownToJsx(md, { parseYaml });
  assert.ok(jsx.includes('<Title xl tag="h1">Hello</Title>'));
  assert.ok(jsx.includes('By {/* $markdoc.frontmatter.missing */}.'));
  assert.ok(markdownToHtml(md, { parseYaml }).startsWith('<h1>Hello</h1>'));
});
