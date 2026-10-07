import { PrismTheme } from 'prism-react-renderer';
import { TOKEN_TYPES } from './prismTypes';

// Paper: grays plus one blue for component names, matching the landing's single accent
const BG = '#f9fafb';     // gray-50
const TEXT = '#374151';   // gray-700, JSX text content
const PROP = '#030712';   // gray-950, prop names: the part VaneUI is about
const TAG = '#2563eb';    // blue-600, component names
const PUNCT = '#9ca3af';  // gray-400, brackets and operators
const VALUE = '#6b7280';  // gray-500, strings and numbers

export const lightTheme: PrismTheme = {
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
    { types: TOKEN_TYPES.NAMESPACE, style: { opacity: 0.7 } },
  ],
};
