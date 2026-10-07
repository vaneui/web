import type { PrismTheme } from 'prism-react-renderer';
import { TOKEN_TYPES } from '../components/themes/prismTypes';

const BG = '#0b0e14';     // ink panel
const TEXT = '#c9ced6';   // JSX text content
const PROP = '#f3f4f6';   // prop names, the part VaneUI is about
const TAG = '#6ea2ff';    // component names, the only accent
const PUNCT = '#5f6673';  // brackets, operators
const VALUE = '#9aa1ad';  // strings and numbers

/** Hero code panel: grays plus the landing blue for component names, so the hero keeps one accent */
export const inkCodeTheme: PrismTheme = {
  plain: { color: TEXT, backgroundColor: BG },
  styles: [
    { types: TOKEN_TYPES.COMMENT, style: { color: PUNCT, fontStyle: 'italic' } },
    { types: TOKEN_TYPES.STRING, style: { color: VALUE } },
    { types: TOKEN_TYPES.PUNCTUATION, style: { color: PUNCT } },
    { types: TOKEN_TYPES.CONSTANT, style: { color: VALUE } },
    { types: TOKEN_TYPES.KEYWORD, style: { color: PROP } },
    { types: TOKEN_TYPES.FUNCTION, style: { color: PROP } },
    { types: TOKEN_TYPES.TAG, style: { color: TAG } },
    { types: TOKEN_TYPES.NUMBER, style: { color: VALUE } },
    { types: TOKEN_TYPES.ATTRIBUTE, style: { color: PROP } },
  ],
};
