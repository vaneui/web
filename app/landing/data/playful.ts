import { PartialTheme, ThemeDefaults } from '@vaneui/ui';

export const playfulTheme: PartialTheme = {};

// CSS variable overrides for playful theme - applied via wrapper className
export const playfulCssVars = `
  [--color-bg-filled-success:#ec4899]
  [--color-bg-filled-hover-success:#ef5599]
  [--color-border-filled-success:#fce7f3]
  [--color-bg-filled-secondary:#60a5fa]
  [--color-bg-filled-hover-secondary:#3b82f6]
  [--color-border-filled-secondary:#dbeafe]
  [--color-text-filled-secondary:white]
  [--color-bg-primary:#ffeaf3]
  [--color-border-primary:#f9a8d4]
  [--bw:4px]
  [--color-bg-filled-primary:#facc15]
  [--color-text-filled-primary:white]
  [--br-unit:10]
`;

export const playfulDefaults: ThemeDefaults = {
  button: {
    pill: true,
    filled: true,
    lg: true,
    bold: true,
    serif: true,
  },
  card: {
    lg: true,
  },
  chip: {
    pill: true,
    bold: true,
    serif: true,
  },
  title: {
    serif: true,
  }
};
