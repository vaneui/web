import { PartialTheme, ThemeDefaults } from '@vaneui/ui';

export const playfulTheme: PartialTheme = {};

// CSS variable overrides for playful theme - applied via wrapper className
export const playfulCssVars = `
  [--color-bg-filled-success:linear-gradient(to_right,#f472b6,#a78bfa)]
  [--color-bg-filled-hover-success:linear-gradient(to_right,#ec4899,#8b5cf6)]
  [--color-border-filled-success:#fce7f3]
  [--color-bg-filled-secondary:linear-gradient(to_right,#60a5fa,#22d3ee)]
  [--color-bg-filled-hover-secondary:linear-gradient(to_right,#3b82f6,#06b6d4)]
  [--color-border-filled-secondary:#dbeafe]
  [--color-text-filled-secondary:white]
  [--color-bg-layout-primary:linear-gradient(to_bottom_right,#fdf2f8,#faf5ff)]
  [--color-border-primary:#f9a8d4]
  [--bw:4px]
  [--color-bg-filled-primary:linear-gradient(to_right,#facc15,#fb923c)]
  [--color-text-filled-primary:white]
  [--br-unit:8]
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
