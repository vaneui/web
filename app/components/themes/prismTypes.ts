export const TOKEN_TYPES = {
  COMMENT: ['comment', 'prolog', 'cdata'],
  STRING: ['string', 'attr-value', 'char', 'builtin', 'inserted'],
  PUNCTUATION: ['punctuation', 'operator'],
  CONSTANT: ['constant', 'symbol', 'variable'],
  KEYWORD: ['keyword', 'important', 'selector', 'atrule'],
  FUNCTION: ['function', 'deleted'],
  TAG: ['tag', 'selector', 'class-name'],
  NUMBER: ['number', 'boolean'],
  ATTRIBUTE: ['attr-name', 'property'],
  NAMESPACE: ['namespace']
};

export type { PrismTheme } from 'prism-react-renderer';