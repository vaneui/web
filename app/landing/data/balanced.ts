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
    main: { sm: true },
  },
  card: {
    main: { shadow: true, md: true },
  },
  chip: {
    sm: true,
    bold: true,
  },
}
