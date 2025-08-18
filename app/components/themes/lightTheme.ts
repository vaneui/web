import { PrismTheme } from 'prism-react-renderer';
import { TOKEN_TYPES } from './prismTypes';

export const lightTheme: PrismTheme = {
  plain: {
    color: '#2c3e50',
    backgroundColor: '#f8fbff',
  },
  styles: [
    {
      types: TOKEN_TYPES.COMMENT,
      style: {
        color: '#718096',
        fontStyle: 'italic',
      },
    },
    {
      types: TOKEN_TYPES.STRING,
      style: {
        color: '#e67e22',
      },
    },
    {
      types: TOKEN_TYPES.PUNCTUATION,
      style: {
        color: '#64748b',
      },
    },
    {
      types: TOKEN_TYPES.CONSTANT,
      style: {
        color: '#8b5cf6',
      },
    },
    {
      types: TOKEN_TYPES.KEYWORD,
      style: {
        color: '#3b82f6',
      },
    },
    {
      types: TOKEN_TYPES.FUNCTION,
      style: {
        color: '#059669',
      },
    },
    {
      types: TOKEN_TYPES.TAG,
      style: {
        color: '#1e3a8a',
      },
    },
    {
      types: TOKEN_TYPES.NUMBER,
      style: {
        color: '#dc2626',
      },
    },
    {
      types: TOKEN_TYPES.ATTRIBUTE,
      style: {
        color: '#7c3aed',
      },
    },
    {
      types: TOKEN_TYPES.NAMESPACE,
      style: {
        opacity: 0.7,
      },
    },
  ],
};