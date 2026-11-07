import { Prism } from 'prism-react-renderer';

/*
 * Two gaps in Prism's JSX/TSX grammars leave tags uncolored (gray component and prop names):
 * - an attribute value is read as part of a tag only up to three braces deep, so
 *   `<ThemeProvider themeDefaults={{ button: { main: { pill: true } } }}>` is not a tag;
 * - in TSX a tag must follow a character it can consume, so in `<Icon><Star /></Icon>` the
 *   `<Star />` right after `<Icon>` is not a tag.
 * Rebuild the tag patterns the way the grammars build them, with deeper nesting and, in TSX, a
 * lookbehind for the character before. Runs once, when CodeBlock is imported.
 */
const DEPTH = 8;

const SPACE = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
let braces = /\{[^{}]*\}/.source;
for (let i = 1; i < DEPTH; i++) braces = `\\{(?:${braces}|[^{}])*\\}`;
const BRACES = `(?:${braces})`;
const SPREAD = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;

const fill = (source: string) => source
  .replace(/<SPREAD>/g, () => SPREAD)
  .replace(/<S>/g, () => SPACE)
  .replace(/<BRACES>/g, () => BRACES);

const TAG = fill(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source);

type Rule = { pattern?: RegExp; lookbehind?: boolean; inside?: Record<string, Rule> };

function deepen(tag: Rule | undefined, pattern: RegExp) {
  // Leave the grammar alone if a Prism update reshapes it
  if (!tag?.pattern || !tag.inside?.script?.pattern || !tag.inside?.spread?.pattern) return;
  tag.pattern = pattern;
  tag.inside.script.pattern = RegExp(fill(/=<BRACES>/.source));
  tag.inside.spread.pattern = RegExp(fill(/<SPREAD>/.source));
}

const languages = Prism.languages as unknown as Record<string, Record<string, Rule> | undefined>;
deepen(languages.jsx?.tag, RegExp(TAG));
// TSX matches a tag only after a non-identifier character (so `useState<T>` stays a generic), as
// Prism's own TSX grammar does. Its pattern consumes that character, which a tag that ends right
// before has already taken; a lookbehind sees it instead, where the browser supports one.
let afterToken = '';
try {
  RegExp('(?<=a)');
  afterToken = '|(?<=[^\\w$])(?=<)';
} catch {
  // No lookbehind support: keep Prism's own rule
}
deepen(languages.tsx?.tag, RegExp(`(^|[^\\w$]|(?=<\\/)${afterToken})(?:${TAG})`));
