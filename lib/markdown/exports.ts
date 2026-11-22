// Markdown to JSX and to plain HTML, for the Markdown editor's export tabs. Both read Markdoc's
// syntax tree, so the JSX names the same VaneUI components, with the same props, that `<Md>`
// renders the document with.
import Markdoc, { type Node } from '@markdoc/markdoc';
import { expandShorthand } from '@vaneui/md';
import { parseMarkdown } from './parse';

type YamlParser = (raw: string) => unknown;

const INDENT = '  ';

/** Heading level to the Title props MdHeading sets */
const HEADING: Record<number, string> = {
  1: 'xl tag="h1"', 2: 'lg tag="h2"', 3: '', 4: 'sm tag="h4"', 5: 'xs tag="h5"', 6: 'xs tag="h6"',
};

/** Props that never make sense in exported source: handlers, refs and raw HTML */
const DROPPED_PROP = /^(on[A-Z].*|ref|key|dangerouslySetInnerHTML)$/;

class Writer {
  lines: string[] = [];
  used = new Set<string>();
  constructor(readonly variables: Record<string, unknown>) {}

  use(name: string) {
    this.used.add(name);
    return name;
  }
}

/** JSX text: plain when it is safe, a string expression when it holds JSX syntax */
function jsxText(text: string): string {
  if (!text) return '';
  return /[{}<>&]/.test(text) ? `{${JSON.stringify(text)}}` : text;
}

function attr(name: string, value: unknown): string | null {
  if (DROPPED_PROP.test(name) || value == null) return null;
  if (value === true) return name;
  // A JSX attribute string has no backslash escapes and decodes `&` entities, so a value that needs
  // either is written as a string expression
  if (typeof value === 'string') return /["\\&\u0000-\u001f]/.test(value) ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
  if (typeof value === 'number' || typeof value === 'boolean') return `${name}={${value}}`;
  return null;
}

function open(name: string, props: string, selfClose = false): string {
  const p = props.trim();
  return `<${name}${p ? ` ${p}` : ''}${selfClose ? '/>' : '>'}`;
}

/** `{% $markdoc.frontmatter.title %}` and friends: Markdoc keeps them as objects with a `path` */
function textContent(content: unknown, variables: Record<string, unknown>): string {
  if (content == null) return '';
  if (typeof content !== 'object') return jsxText(String(content));
  const path = (content as { path?: unknown }).path;
  if (Array.isArray(path)) {
    let value: unknown = variables;
    for (const key of path) {
      value = value && typeof value === 'object' && Object.hasOwn(value, key) ? (value as Record<string, unknown>)[key] : undefined;
    }
    if (typeof value === 'string' || typeof value === 'number') return jsxText(String(value));
    return `{/* $${path.join('.')} */}`;
  }
  return '';
}

/** The variables `<Md>` gives a document: its frontmatter under `$markdoc.frontmatter` */
function variablesOf(ast: Node, parseYaml?: YamlParser): Record<string, unknown> {
  const raw = ast.attributes.frontmatter;
  if (!parseYaml || typeof raw !== 'string' || !raw.trim()) return { markdoc: {} };
  try {
    const frontmatter = parseYaml(raw);
    return { markdoc: { frontmatter: frontmatter && typeof frontmatter === 'object' ? frontmatter : {} } };
  } catch {
    return { markdoc: {} };
  }
}

/** A tag's condition with its variables and functions resolved, as `{% if %}` and `{% else %}` read it */
function condition(tag: Node, w: Writer): unknown {
  const shallow = new Markdoc.Ast.Node('tag', tag.attributes, [], tag.tag);
  return shallow.resolve({ variables: w.variables, functions: Markdoc.functions }).attributes.primary;
}

const truthy = (v: unknown) => v !== false && v !== undefined && v !== null;

/**
 * The nodes a Markdoc tag puts in the document, as the preview renders it: the branch an
 * `{% if %}` picks, and the content of any other tag. Null for `include` and `partial`, which
 * the preview cannot fill in either.
 */
function tagContent(n: Node, w: Writer): Node[] | null {
  if (n.tag === 'include' || n.tag === 'partial') return null;
  if (n.tag === 'else') return [];
  if (n.tag !== 'if') return n.children;
  const branches = [{ condition: condition(n, w), children: [] as Node[] }];
  for (const child of n.children) {
    if (child.type === 'tag' && child.tag === 'else') {
      branches.push({ condition: 'primary' in child.attributes ? condition(child, w) : true, children: [] });
    } else {
      branches[branches.length - 1].children.push(child);
    }
  }
  return branches.find(b => truthy(b.condition))?.children ?? [];
}

const leftOut = (n: Node) => `{/* Markdoc tag "${n.tag}" left out */}`;

/** The inline content of a paragraph, heading, list item or cell, on one line */
function inline(nodes: Node[], w: Writer): string {
  return nodes.map(n => inlineNode(n, w)).join('');
}

function inlineNode(n: Node, w: Writer): string {
  const kids = () => inline(n.children, w);
  switch (n.type) {
    case 'inline':
      return kids();
    case 'text':
      return textContent(n.attributes.content, w.variables);
    case 'softbreak':
      return ' ';
    case 'hardbreak':
      return '<br/>';
    case 'strong':
      return `${open(w.use('Text'), 'tag="strong" fontBold')}${kids()}</Text>`;
    case 'em':
      return `${open(w.use('Text'), 'tag="em" italic')}${kids()}</Text>`;
    case 's':
      return `${open(w.use('Text'), 'tag="s" lineThrough')}${kids()}</Text>`;
    case 'code':
      return `${open(w.use('Code'), 'secondary')}${jsxText(String(n.attributes.content ?? ''))}</Code>`;
    case 'link': {
      const props = [attr('href', n.attributes.href), attr('title', n.attributes.title)].filter(Boolean).join(' ');
      return `${open(w.use('Link'), props)}${kids()}</Link>`;
    }
    case 'image': {
      const props = [attr('src', n.attributes.src), attr('alt', n.attributes.alt ?? ''), attr('title', n.attributes.title)]
        .filter(Boolean).join(' ');
      return open(w.use('Img'), props, true);
    }
    case 'tag': {
      const content = tagContent(n, w);
      return content ? inline(content, w) : leftOut(n);
    }
    default:
      return kids();
  }
}

/** A template literal holding `text` exactly */
function templateLiteral(text: string): string {
  return `\`${text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\``;
}

interface SpecNode { component: string; text?: string; children?: SpecNode[] | string; [prop: string]: unknown }

function specToJsx(spec: unknown, depth: number, w: Writer): void {
  const pad = INDENT.repeat(depth);
  if (typeof spec === 'string') {
    w.lines.push(pad + jsxText(spec));
    return;
  }
  if (!spec || typeof spec !== 'object' || typeof (spec as SpecNode).component !== 'string') return;
  const { component, text, children, id, ...rest } = spec as SpecNode;
  if (!/^[A-Z][A-Za-z0-9]*$/.test(component)) return;
  void id;
  const props = Object.entries(rest).map(([k, v]) => attr(k, v)).filter(Boolean).join(' ');
  const name = w.use(component);
  const kids = children ?? text;
  if (kids == null || kids === '') {
    w.lines.push(pad + open(name, props, true));
  } else if (typeof kids === 'string') {
    w.lines.push(`${pad}${open(name, props)}${jsxText(kids)}</${name}>`);
  } else {
    w.lines.push(pad + open(name, props));
    for (const child of kids) specToJsx(child, depth + 1, w);
    w.lines.push(`${pad}</${name}>`);
  }
}

function fence(n: Node, depth: number, w: Writer, parseYaml?: YamlParser): void {
  const pad = INDENT.repeat(depth);
  const content = String(n.attributes.content ?? '').replace(/\n$/, '');
  const language = n.attributes.language as string | undefined;
  if (language === 'vaneui' && parseYaml) {
    try {
      const expanded = expandShorthand(parseYaml(content));
      const specs = Array.isArray(expanded) ? expanded : [expanded];
      for (const s of specs) specToJsx(s, depth, w);
      return;
    } catch {
      // A spec that does not parse is exported as the code block `<Md>` falls back to
    }
  }
  w.lines.push(pad + open(w.use('Card'), ''));
  w.lines.push(`${pad}${INDENT}<pre><code>{${templateLiteral(content)}}</code></pre>`);
  w.lines.push(`${pad}</Card>`);
}

function block(n: Node, depth: number, w: Writer, parseYaml?: YamlParser): void {
  const pad = INDENT.repeat(depth);
  const children = (d = depth + 1) => n.children.forEach(c => block(c, d, w, parseYaml));
  const wrap = (name: string, props: string) => {
    w.lines.push(pad + open(w.use(name), props));
    children();
    w.lines.push(`${pad}</${name}>`);
  };
  switch (n.type) {
    case 'heading':
      w.lines.push(`${pad}${open(w.use('Title'), HEADING[Number(n.attributes.level)] ?? '')}${inline(n.children, w)}</Title>`);
      return;
    case 'paragraph':
      w.lines.push(`${pad}${open(w.use('Text'), '')}${inline(n.children, w)}</Text>`);
      return;
    case 'inline':
      // A tight list item holds its text directly
      w.lines.push(pad + inline([n], w));
      return;
    case 'hr':
      w.lines.push(pad + open(w.use('Divider'), '', true));
      return;
    case 'fence':
      fence(n, depth, w, parseYaml);
      return;
    case 'blockquote':
      wrap('Card', 'secondary borderL');
      return;
    case 'list': {
      const start = n.attributes.start;
      const props = n.attributes.ordered
        ? `listDecimal${typeof start === 'number' && start !== 1 ? ` start={${start}}` : ''}`
        : 'listDisc';
      wrap('List', props);
      return;
    }
    case 'item': {
      const only = n.children.length === 1 ? n.children[0] : null;
      if (only && (only.type === 'inline' || only.type === 'paragraph')) {
        w.lines.push(`${pad}${open(w.use('ListItem'), '')}${inline(only.children, w)}</ListItem>`);
      } else {
        wrap('ListItem', '');
      }
      return;
    }
    case 'table':
      wrap('Table', '');
      return;
    case 'thead':
      wrap('Thead', '');
      return;
    case 'tbody':
      wrap('Tbody', '');
      return;
    case 'tr':
      wrap('Tr', '');
      return;
    case 'th':
    case 'td': {
      const name = n.type === 'th' ? 'Th' : 'Td';
      const align = n.attributes.align as string | undefined;
      const props = align === 'center' ? 'textCenter' : align === 'right' ? 'textRight' : '';
      w.lines.push(`${pad}${open(w.use(name), props)}${inline(n.children, w)}</${name}>`);
      return;
    }
    case 'tag': {
      const content = tagContent(n, w);
      if (content) content.forEach(c => block(c, depth, w, parseYaml));
      else w.lines.push(pad + leftOut(n));
      return;
    }
    case 'comment':
    case 'error':
      return;
    default:
      if (n.children.length) children(depth);
  }
}

/** The document as a React component written with VaneUI components */
export function markdownToJsx(source: string, options: { parseYaml?: YamlParser; name?: string } = {}): string {
  const ast = parseMarkdown(source);
  const w = new Writer(variablesOf(ast, options.parseYaml));
  w.lines.push(`${INDENT}${INDENT}${open(w.use('Col'), '')}`);
  ast.children.forEach(n => block(n, 3, w, options.parseYaml));
  w.lines.push(`${INDENT}${INDENT}</Col>`);
  const names = [...w.used].sort();
  return [
    `import { ${names.join(', ')} } from '@vaneui/ui';`,
    '',
    `export function ${options.name ?? 'Content'}() {`,
    `${INDENT}return (`,
    ...w.lines,
    `${INDENT});`,
    '}',
    '',
  ].join('\n');
}

const BLOCK_END = /(<\/(?:h[1-6]|p|li|ul|ol|pre|blockquote|table|thead|tbody|tr|article)>|<hr>)/g;

/** The document as plain, unstyled HTML, one block per line */
export function markdownToHtml(source: string, options: { parseYaml?: YamlParser } = {}): string {
  const ast = parseMarkdown(source);
  const html = Markdoc.renderers.html(Markdoc.transform(ast, { variables: variablesOf(ast, options.parseYaml) }));
  return `${html
    .replace(/^<article>|<\/article>$/g, '')
    .replace(BLOCK_END, '$1\n')
    .replace(/(<(?:ul|ol|table|thead|tbody|tr|blockquote)(?: [^>]*)?>)/g, '$1\n')
    .replace(/\n{2,}/g, '\n')
    .trim()}\n`;
}

/**
 * A standalone HTML page for the document, titled with the text of its first heading as rendered
 * (variables filled in), else the frontmatter `title`, else "Document"
 */
export function markdownToHtmlDocument(source: string, options: { parseYaml?: YamlParser } = {}): string {
  const body = markdownToHtml(source, options);
  const heading = /<h1(?: [^>]*)?>([^]*?)<\/h1>/.exec(body)?.[1].replace(/<[^>]*>/g, '').trim();
  const frontmatter = (variablesOf(parseMarkdown(source), options.parseYaml).markdoc as { frontmatter?: { title?: unknown } })
    .frontmatter?.title;
  const escape = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // The heading is already HTML (its text escaped); a frontmatter title is plain text
  const title = heading || (typeof frontmatter === 'string' && frontmatter.trim() ? escape(frontmatter.trim()) : 'Document');
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${title}</title>`,
    '</head>',
    '<body>',
    body.trimEnd(),
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

/** Words, characters and minutes to read (at 230 words a minute) */
export function textStats(source: string): { words: number; characters: number; minutes: number } {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  const words = body.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)?.length ?? 0;
  return { words, characters: body.length, minutes: Math.max(1, Math.round(words / 230)) };
}
