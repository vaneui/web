import { PartialTheme, ThemeDefaults } from '@vaneui/ui';

export const strictTheme: PartialTheme = {};

// CSS variable overrides for strict theme - applied via wrapper className
export const strictCssVars = `
  [--color-bg-layout-primary:var(--color-gray-100)]
  [--color-border-primary:var(--color-gray-900)]
  [--color-text-primary:black]
  [--color-bg-filled-success:var(--color-gray-900)]
  [--color-bg-filled-hover-success:black]
  [--color-bg-filled-active-success:var(--color-gray-700)]
  [--color-border-filled-success:black]
  [--color-border-secondary:black]
  [--color-text-secondary:var(--color-gray-900)]
  [--bw:2px]
  [--rw:2px]
  [&_.vane-button]:[--aspect-ratio:3]
`;

export const strictDefaults: ThemeDefaults = {
  title: {
    mono: true,
    uppercase: true,
  },
  text: {
    mono: true,
  },
  img: {
    sm: true,
    sharp: true,
  },
  button: {
    sharp: true,
    lg: true,
  },
  card: {
    sm: true,
    sharp: true,
    noShadow: true,
  },
  chip: {
    primary: true,
    sharp: true,
    xs: true,
    uppercase: true,
  },
  divider: {
    primary: true,
  }
}
