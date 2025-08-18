import { PrismTheme } from 'prism-react-renderer';
import { TOKEN_TYPES } from './prismTypes';

export const darkTheme: PrismTheme = {
  plain: {
    color: '#e3e3e3',
    backgroundColor: '#1e1e2e',
  },
  styles: [
    {
      types: TOKEN_TYPES.COMMENT,
      style: {
        color: '#7a7c85',
        fontStyle: 'italic',
      },
    },
    {
      types: TOKEN_TYPES.STRING,
      style: {
        color: '#f9c96e',
      },
    },
    {
      types: TOKEN_TYPES.PUNCTUATION,
      style: {
        color: '#9da3b3',
      },
    },
    {
      types: TOKEN_TYPES.CONSTANT,
      style: {
        color: '#74c7ec',
      },
    },
    {
      types: TOKEN_TYPES.KEYWORD,
      style: {
        color: '#c792ea',
      },
    },
    {
      types: TOKEN_TYPES.FUNCTION,
      style: {
        color: '#f97583',
      },
    },
    {
      types: TOKEN_TYPES.TAG,
      style: {
        color: '#89ddff',
      },
    },
    {
      types: TOKEN_TYPES.NUMBER,
      style: {
        color: '#74c7ec',
      },
    },
    {
      types: TOKEN_TYPES.ATTRIBUTE,
      style: {
        color: '#c792ea',
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