import { PartialTheme, ThemeDefaults } from '@vaneui/ui';
import { strictDefaults, strictTheme, strictCssVars } from './strict';
import { balancedDefaults, balancedTheme, balancedCssVars } from './balanced';
import { playfulDefaults, playfulTheme, playfulCssVars } from './playful';

export interface ExampleTheme {
  config: PartialTheme;
  label: string;
  description: string;
  defaults: ThemeDefaults;
  cssVars: string;
}

export type ThemeKey = 'playful' | 'balanced' | 'strict';

// Example themes for the landing demo; any ThemeProvider values work the same way
export const themes: Record<ThemeKey, ExampleTheme> = {
  playful: {
    config: playfulTheme,
    label: 'Playful',
    description: 'Pill shapes and larger sizes.',
    defaults: playfulDefaults,
    cssVars: playfulCssVars,
  },
  balanced: {
    config: balancedTheme,
    label: 'Balanced',
    description: 'Rounded corners and soft shadows.',
    defaults: balancedDefaults,
    cssVars: balancedCssVars,
  },
  strict: {
    config: strictTheme,
    label: 'Strict',
    description: 'Sharp edges and a minimal look.',
    defaults: strictDefaults,
    cssVars: strictCssVars,
  },
};
