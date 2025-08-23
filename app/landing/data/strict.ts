import { PartialTheme, ThemeDefaults, ThemeProps } from '@vaneui/ui';

export const strictTheme: PartialTheme = {
  button: {
  },
};

export const strictOverrideFunc = (theme: ThemeProps) => {
  theme.card.themes.appearance.background.default.base = 'bg-gray-100'
  theme.card.themes.appearance.border.default.base = 'border-gray-900'
  theme.card.themes.layout.border.base = 'border-2'

  theme.divider.themes.appearance.background.default.base = 'bg-gray-900';

  theme.chip.themes.appearance.text.outline.default.base = 'text-black';
  theme.chip.themes.appearance.ring.outline.default.base = 'ring-gray-900';

  theme.button.themes.appearance.background.filled.success.base = 'bg-gray-900';
  theme.button.themes.appearance.background.filled.success.active = 'active:bg-gray-700';
  theme.button.themes.appearance.background.filled.success.hover = 'hover:bg-black';
  theme.button.themes.appearance.ring.filled.success.hover = 'ring-black';
  theme.button.themes.appearance.ring.outline.secondary.base = 'ring-black';
  theme.button.themes.appearance.text.outline.secondary.base = 'text-gray-900';

  theme.button.themes.size.px.sm = "px-4";

  return theme;
};

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
    sm: true,
  },
  card: {
    sharp: true,
    noShadow: true,
  },
  chip: {
    outline: true,
    default: true,
    sharp: true,
    xs: true,
    uppercase: true,
    black: true,
  },
  divider: {
    default: true,
  }
}
