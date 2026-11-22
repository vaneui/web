// Unit tests for the Markdown editor's exports. Run with:
//   npx tsx --test lib/markdown/__tests__/exports.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import { parse as parseYaml } from 'yaml';
import ts from 'typescript';

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

test('an include keeps the content after it, and a tag exports its content like the preview', () => {
  // GitBook-style include, never closed: the content after it used to be lost
  const include = markdownToJsx('# A\n\n{% include "x.md" %}\n\n# After include\n\ntext after\n');
  assert.ok(include.includes('{/* Markdoc tag "include" left out */}'));
  assert.ok(include.includes('<Title xl tag="h1">After include</Title>'));
  assert.ok(include.includes('<Text>text after</Text>'));
  assert.ok(markdownToHtml('{% include "x.md" %}\n\n# After\n').includes('<h1>After</h1>'));

  // A tag left open inside a paragraph ends with it instead of swallowing the heading
  const open = markdownToJsx('para {% if true %} unclosed\n\n# After\n\nmore\n');
  assert.ok(open.includes('<Text>para  unclosed</Text>'), open);
  assert.ok(open.includes('<Title xl tag="h1">After</Title>'));
  const html = markdownToHtml('para {% if true %} unclosed\n\n# After\n');
  assert.ok(!/<p>[^]*<p>/.test(html.split('\n')[0]), html);
  assert.ok(html.includes('<h1>After</h1>'));

  // Conditions pick a branch, other tags export their content
  const md = '---\nbeta: true\n---\n{% if $markdoc.frontmatter.beta %}\nBeta on\n{% else /%}\nBeta off\n{% /if %}\n\n'
    + 'Inline {% if false %}hidden{% else /%}shown{% /if %} and {% badge %}**kept**{% /badge %}.\n\n'
    + '{% callout %}\nInside a callout\n{% /callout %}\n';
  const jsx = markdownToJsx(md, { parseYaml });
  assert.ok(jsx.includes('<Text>Beta on</Text>'));
  assert.ok(!jsx.includes('Beta off'));
  assert.ok(jsx.includes('<Text>Inline shown and <Text tag="strong" fontBold>kept</Text>.</Text>'), jsx);
  assert.ok(jsx.includes('<Text>Inside a callout</Text>'));
  assert.ok(!jsx.includes('left out'));
  assert.ok(markdownToHtml(md, { parseYaml }).includes('<p>Beta on</p>'));
});

/** Compiles exported JSX and returns the props of every element it renders */
function renderedProps(jsx: string): Record<string, unknown>[] {
  const out = ts.transpileModule(jsx, {
    fileName: 'Content.tsx',
    reportDiagnostics: true,
    compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  assert.deepEqual(out.diagnostics?.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')), [], jsx);
  const props: Record<string, unknown>[] = [];
  const React = { createElement: (_type: unknown, p: Record<string, unknown> | null) => { if (p) props.push(p); return null; } };
  const ui = new Proxy({}, { get: (_t, name) => name });
  const mod = { exports: {} as Record<string, () => unknown> };
  new Function('require', 'module', 'exports', 'React', out.outputText)((id: string) => (id === 'react' ? React : ui), mod, mod.exports, React);
  mod.exports.Content();
  return props;
}

test('attribute values with quotes, backslashes or entities export as valid JSX that reads back the same', () => {
  const values = ['a "quoted" word', 'He said "hi"', 'back\\slash', 'a &amp; b', 'plain alt'];
  for (const v of values) {
    // Escaped for a Markdown title, which reads backslash escapes and entities
    const alt = v.replace(/&/g, '&amp;').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const props = renderedProps(markdownToJsx(`![${v.replace(/\\/g, '\\\\')}](pic.png "${alt}")`));
    const img = props.find(p => p.src === 'pic.png');
    assert.ok(img, v);
    assert.equal(img.title, v);
  }
  const link = renderedProps(markdownToJsx(`[link](https://a.com 'He said "hi"')`)).find(p => p.href);
  assert.equal(link?.title, 'He said "hi"');
  // Plain values stay plain attribute strings
  assert.ok(markdownToJsx('![plain](pic.png)').includes('<Img src="pic.png" alt="plain"/>'));
});
