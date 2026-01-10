import { PartialTheme, ThemeDefaults } from '@vaneui/ui';

export const balancedTheme: PartialTheme = {
};

export const balancedCssVars = `
  [--br-unit:5]
`;

export const balancedDefaults: ThemeDefaults = {
  img: {
    xs: true,
  },
  button: {
    sm: true,
  },
  card: {
    shadow: true,
    md: true,
  },
  chip: {
    sm: true,
    bold: true,
  },
}
