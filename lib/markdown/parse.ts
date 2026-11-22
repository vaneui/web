// The parse `<Md>` reads a document with, so the editor's exports see the document the preview
// shows. `@vaneui/md` builds its tree with `parseMarkdown`, which 1.4.2 does not export; this
// follows it: `include` and `partial` never take children, and a tag left open ends with the
// paragraph, list item or blockquote it is in instead of swallowing the blocks after it.
import Markdoc, { type Node } from '@markdoc/markdoc';

type Token = ReturnType<InstanceType<typeof Markdoc.Tokenizer>['tokenize']>[number];

/** Tags that are self-closing by definition in `@vaneui/md` */
const SELF_CLOSING = new Set(['include', 'partial']);

let tokenizer: InstanceType<typeof Markdoc.Tokenizer> | undefined;

/** Turns opening `include`/`partial` tags into self-closing ones and drops their closing tags */
function selfCloseTags(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (const token of tokens) {
    if (token.children) token.children = selfCloseTags(token.children);
    const tag: unknown = token.meta?.tag;
    const named = typeof tag === 'string' && SELF_CLOSING.has(tag);
    if (named && token.type === 'tag_close') continue;
    if (named && token.type === 'tag_open') {
      token.type = 'tag';
      token.nesting = 0;
    }
    out.push(token);
  }
  return out;
}

/** A closing token for a tag left open, built from the opening token so it has the tokenizer's shape */
function closingToken(open: Token): Token {
  const close: Token = Object.create(Object.getPrototypeOf(open) as object);
  return Object.assign(close, open, {
    type: 'tag_close', nesting: -1, meta: { tag: open.meta?.tag }, attrs: null, map: null, children: null, content: '',
  });
}

/**
 * Closes every tag still open where the content around it ends: a run of inline content, or a
 * container (list item, blockquote). A block tag left open at the top level keeps the rest of
 * the document, as Markdoc reads it.
 */
function closeOpenTags(tokens: Token[], closeAtEnd: boolean): Token[] {
  const open: Token[] = [];
  const out: Token[] = [];
  const closeTags = () => {
    while (open.length > 0 && open[open.length - 1].type === 'tag_open') out.push(closingToken(open.pop() as Token));
  };
  for (const token of tokens) {
    if (token.children) token.children = closeOpenTags(token.children, true);
    if (token.type === 'tag_close') {
      // Markdoc pairs a closing tag only with the innermost open tag of the same name
      const last = open[open.length - 1];
      if (last?.type === 'tag_open' && last.meta?.tag === token.meta?.tag) open.pop();
    } else if ((token.nesting ?? 0) < 0) {
      closeTags();
      open.pop();
    } else if ((token.nesting ?? 0) > 0) {
      open.push(token);
    }
    out.push(token);
  }
  if (closeAtEnd) closeTags();
  return out;
}

/** The document's syntax tree, read the way `<Md>` reads it */
export function parseMarkdown(source: string): Node {
  tokenizer ??= new Markdoc.Tokenizer();
  return Markdoc.parse(closeOpenTags(selfCloseTags(tokenizer.tokenize(source)), false));
}
