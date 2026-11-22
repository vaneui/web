'use client';

import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
  Bold, Code as CodeIcon, Download, Hash, Italic, Link as LinkIcon, List as ListIcon, MessageSquare, Table as TableIcon,
} from 'react-feather';
import { Md, strictSanitizePolicy } from '@vaneui/md';
import { parseYamlFrontmatter } from '@vaneui/md/yaml';
import { defaultRegistry } from '@vaneui/md/registry';
import { prismHighlighter } from '@vaneui/md/prism';
import { Alert, Button, Card, Col, IconButton, Row, Text, Textarea } from '@vaneui/ui';
import { ToolShell } from '../ToolShell';
import { Segmented } from '../_components/controls';
import { CodeBlock } from '../../components/CodeBlock';
import { darkTheme, lightTheme } from '../../components/themes';
import { markdownToHtml, markdownToHtmlDocument, markdownToJsx, textStats } from '../../../lib/markdown/exports';
import { SAMPLES } from './samples';

const STORAGE_KEY = 'vaneui-markdown-editor';
const SAVE_DELAY_MS = 400;

const highlight = { light: prismHighlighter({ theme: lightTheme }), dark: prismHighlighter({ theme: darkTheme }) };

type Scheme = 'light' | 'dark';
type Tab = 'preview' | 'html' | 'jsx' | 'md';

const TABS = [
  { value: 'preview', label: 'Preview' },
  { value: 'html', label: 'HTML' },
  { value: 'jsx', label: 'JSX' },
  { value: 'md', label: 'Md component' },
] as const;

const SCHEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

interface Selection { value: string; start: number; end: number }

/** Wraps the selection in `before` and `after`, or inserts `placeholder` between them */
const wrap = (before: string, after: string, placeholder: string) => ({ value, start, end }: Selection): Selection => {
  const picked = value.slice(start, end) || placeholder;
  return {
    value: value.slice(0, start) + before + picked + after + value.slice(end),
    start: start + before.length,
    end: start + before.length + picked.length,
  };
};

/** Puts `prefix` before every line the selection touches */
const prefixLines = (prefix: (i: number) => string) => ({ value, start, end }: Selection): Selection => {
  const from = value.lastIndexOf('\n', start - 1) + 1;
  const to = value.indexOf('\n', end) === -1 ? value.length : value.indexOf('\n', end);
  const lines = value.slice(from, to).split('\n').map((line, i) => prefix(i) + line);
  const block = lines.join('\n');
  return { value: value.slice(0, from) + block + value.slice(to), start: from, end: from + block.length };
};

/** Inserts a block on its own lines at the caret */
const insertBlock = (block: string) => ({ value, start }: Selection): Selection => {
  const before = value.slice(0, start);
  const lead = before === '' || before.endsWith('\n\n') ? '' : before.endsWith('\n') ? '\n' : '\n\n';
  const text = `${lead}${block}\n`;
  return { value: before + text + value.slice(start), start: start + lead.length, end: start + text.length - 1 };
};

const TABLE = '| Column | Column |\n|:--|:--|\n| Cell | Cell |';

const ACTIONS = [
  { label: 'Bold', key: 'b', icon: Bold, run: wrap('**', '**', 'bold text') },
  { label: 'Italic', key: 'i', icon: Italic, run: wrap('*', '*', 'italic text') },
  { label: 'Inline code', icon: CodeIcon, run: wrap('`', '`', 'code') },
  { label: 'Link', key: 'k', icon: LinkIcon, run: wrap('[', '](https://)', 'link text') },
  { label: 'Heading', icon: Hash, run: prefixLines(() => '## ') },
  { label: 'Bulleted list', icon: ListIcon, run: prefixLines(() => '- ') },
  { label: 'Quote', icon: MessageSquare, run: prefixLines(() => '> ') },
  { label: 'Table', icon: TableIcon, run: insertBlock(TABLE) },
];

/** Keeps a component that throws while rendering a fence from taking the editor down with it */
class PreviewBoundary extends React.Component<{ children: React.ReactNode; resetKey: string }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: false });
  }
  render() {
    return this.state.error
      ? <Alert danger><Text>This document could not be rendered. Keep typing to try again.</Text></Alert>
      : this.props.children;
  }
}

function mdSnippet(text: string): string {
  const frontmatter = /^---\n[\s\S]*?\n---/.test(text);
  const fences = /^```vaneui/m.test(text);
  const escaped = text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const props = [
    'content={content}',
    ...(frontmatter || fences ? ['parseFrontmatter={parseYamlFrontmatter}'] : []),
    ...(fences ? ['components={defaultRegistry}'] : []),
  ];
  return [
    "import { Md } from '@vaneui/md';",
    ...(frontmatter || fences ? ["import { parseYamlFrontmatter } from '@vaneui/md/yaml';"] : []),
    ...(fences ? ["import { defaultRegistry } from '@vaneui/md/registry';"] : []),
    '',
    `const content = \`${escaped}\`;`,
    '',
    'export function Content() {',
    `  return <Md ${props.join(' ')}/>;`,
    '}',
    '',
  ].join('\n');
}

function download(name: string, type: string, body: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function MarkdownEditor() {
  const [text, setText] = useState(SAMPLES[0].body);
  const [tab, setTab] = useState<Tab>('preview');
  const [scheme, setScheme] = useState<Scheme>('light');
  const deferred = useDeferredValue(text);
  const area = useRef<HTMLTextAreaElement>(null);
  const loaded = useRef(false);

  // The draft is kept in this browser only
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked: start from the sample
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser storage lives outside React and is read once, after hydration
    if (saved) setText(saved);
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, text);
      } catch {
        // Storage full or blocked: the draft lives as long as the tab
      }
    }, SAVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [text]);

  const apply = (run: (s: Selection) => Selection) => {
    const el = area.current;
    if (!el) return;
    const next = run({ value: el.value, start: el.selectionStart, end: el.selectionEnd });
    setText(next.value);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(next.start, next.end);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
    const action = ACTIONS.find(a => a.key === e.key.toLowerCase());
    if (action) {
      e.preventDefault();
      apply(action.run);
    }
  };

  const output = useMemo(() => {
    if (tab === 'html') return { language: 'html', fileName: 'document.html', code: markdownToHtml(deferred, { parseYaml: parseYamlFrontmatter }) };
    if (tab === 'jsx') return { language: 'tsx', fileName: 'Content.tsx', code: markdownToJsx(deferred, { parseYaml: parseYamlFrontmatter }) };
    if (tab === 'md') return { language: 'tsx', fileName: 'Content.tsx', code: mdSnippet(deferred) };
    return null;
  }, [tab, deferred]);

  const stats = textStats(text);

  return (
    <ToolShell slug="markdown-editor" actions={
      <>
        <Button type="button" secondary onClick={() => download('document.md', 'text/markdown', text)}>
          <Download aria-hidden="true"/> Download .md
        </Button>
        <Button type="button" secondary onClick={() => download('document.html', 'text/html', markdownToHtmlDocument(text, { parseYaml: parseYamlFrontmatter }))}>
          <Download aria-hidden="true"/> Download .html
        </Button>
      </>
    }>
      <Row justifyBetween flexWrap>
        <Row xs flexWrap role="group" aria-label="Formatting">
          {ACTIONS.map(a => (
            <IconButton key={a.label} sm ghost secondary type="button" onClick={() => apply(a.run)}
                        aria-label={a.key ? `${a.label} (Ctrl+${a.key.toUpperCase()})` : a.label}
                        title={a.key ? `${a.label} (Ctrl+${a.key.toUpperCase()})` : a.label}>
              <a.icon aria-hidden="true"/>
            </IconButton>
          ))}
        </Row>
        <Row xs flexWrap>
          <Text sm secondary>Start from</Text>
          {SAMPLES.map(s => (
            <Button key={s.id} xs secondary type="button" onClick={() => setText(s.body)}>{s.label}</Button>
          ))}
        </Row>
      </Row>

      <Row itemsStretch tabletStack>
        <Col xs flex1 tabletWFull className="min-w-0">
          <Textarea ref={area} fontMono value={text} onChange={e => setText(e.target.value)} onKeyDown={onKeyDown}
                    aria-label="Markdown" spellCheck={false}
                    className="h-[40rem] resize-none max-tablet:h-[24rem]"/>
          <Text xs tertiary>
            {stats.words.toLocaleString('en')} words · {stats.characters.toLocaleString('en')} characters ·{' '}
            {stats.minutes} min read · the draft stays in this browser
          </Text>
        </Col>

        <Col xs flex1 tabletWFull itemsStretch className="min-w-0">
          <Row justifyBetween flexWrap>
            <Segmented label="Output" options={TABS} value={tab} onChange={setTab}/>
            {tab === 'preview' && <Segmented label="Preview scheme" options={SCHEMES} value={scheme} onChange={setScheme}/>}
          </Row>
          {output ? (
            <div className="h-[37.5rem] w-full min-w-0 overflow-auto max-tablet:h-auto">
              <CodeBlock code={output.code} language={output.language} fileName={output.fileName}/>
            </div>
          ) : (
            <div data-theme={scheme} className="h-[37.5rem] w-full min-w-0 max-tablet:h-auto">
              <Card className="h-full overflow-auto" tabIndex={0} aria-label="Preview">
                <PreviewBoundary resetKey={deferred}>
                  <Md content={deferred} parseFrontmatter={parseYamlFrontmatter} components={defaultRegistry}
                      sanitize={strictSanitizePolicy} highlight={highlight[scheme]}/>
                </PreviewBoundary>
              </Card>
            </div>
          )}
        </Col>
      </Row>
    </ToolShell>
  );
}
