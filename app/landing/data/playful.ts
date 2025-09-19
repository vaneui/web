import { PartialTheme, ThemeDefaults, ThemeProps } from '@vaneui/ui';

export const playfulTheme: PartialTheme = {
  button: {
  },
};

export const playfulOverrideFunc = (theme: ThemeProps) => {
  theme.button.themes.appearance.background.filled.success.base = 'bg-gradient-to-r from-pink-400 to-purple-400';
  theme.button.themes.appearance.background.filled.success.hover = 'hover:from-pink-500 hover:to-purple-500';
  theme.button.themes.appearance.ring.filled.success.base = 'ring-pink-100';
  
  theme.button.themes.appearance.background.filled.secondary.base = 'bg-gradient-to-r from-blue-400 to-cyan-400';
  theme.button.themes.appearance.background.filled.secondary.hover = 'hover:from-blue-500 hover:to-cyan-500';
  theme.button.themes.appearance.ring.filled.secondary.base = 'ring-blue-100';
  theme.button.themes.appearance.text.filled.secondary.base = 'text-white';

  theme.card.themes.appearance.background.outline.default.base = 'bg-gradient-to-br from-pink-50 to-purple-50';
  theme.card.themes.appearance.border.outline.default.base = 'border-pink-300';
  theme.card.themes.layout.border.border = 'border-4';
  theme.card.themes.layout.radius.rounded.sm = 'rounded-4xl';

  theme.chip.themes.appearance.background.filled.primary.base = 'bg-gradient-to-r from-yellow-400 to-orange-400';
  theme.chip.themes.appearance.text.filled.primary.base = 'text-white';

  theme.divider.themes.appearance.background.default.base = 'bg-pink-300';
  theme.divider.extraClasses.default = "h-[3px]";

  return theme;
};

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
  },
  title: {
    serif: true,
  }
};
