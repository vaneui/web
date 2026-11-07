import { Prism } from 'prism-react-renderer';

/*
 * Prism's JSX grammar reads an attribute value as part of a tag only up to three braces deep, so
 * `<ThemeProvider themeDefaults={{ button: { main: { pill: true } } }}>` is not taken as a tag and
 * loses the component and prop colors. Rebuild the tag patterns the way the grammar builds them,
 * with deeper nesting. Runs once, when CodeBlock is imported.
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
// TSX matches the tag only after a non-identifier character, as Prism's own TSX grammar does
deepen(languages.tsx?.tag, RegExp(/(^|[^\w$]|(?=<\/))/.source + `(?:${TAG})`));
