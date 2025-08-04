VaneUI uses a theme system based on component-specific themes that define styling classes for different component states.

## Theme Structure

Each component has its own theme with different categories:

```tsx
import { defaultTheme } from '@vaneui/ui';

// Each component theme has methods that generate CSS classes
const buttonTheme = defaultTheme.button;
const cardTheme = defaultTheme.card;
```

## Component Themes

VaneUI includes themes for all components:

- `button` - Button styling
- `badge` - Badge styling  
- `card` - Card styling
- `chip` - Chip styling
- `divider` - Divider styling
- `container` - Container styling
- `row` - Row layout styling
- `col` - Column layout styling
- `stack` - Stack layout styling
- `section` - Section styling
- `grid3`, `grid4` - Grid styling
- Typography: `text`, `title`, `pageTitle`, `sectionTitle`, `link`, `list`, `listItem`

## Theme Props

VaneUI supports three theme customization props:

### theme

Override component themes partially or completely:

```tsx
import { ThemeProvider } from '@vaneui/ui';

const customTheme = {
  button: {
    // Custom button theme
  }
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### themeDefaults

Set default prop values for components:

```tsx
const defaults = {
  button: {
    primary: true, // All buttons are primary by default
    md: true,      // All buttons are medium size by default
  }
};

<ThemeProvider themeDefaults={defaults}>
  <Button>This button is primary and medium</Button>
</ThemeProvider>
```

### extraClasses

Add additional CSS classes to components:

```tsx
const extraClasses = {
  button: {
    xs: 'extra-small-button-class',
    primary: 'extra-primary-button-class',
  }
};

<ThemeProvider extraClasses={extraClasses}>
  <Button xs primary>Button with extra classes</Button>
</ThemeProvider>
```

## Theme Override Function

Use `themeOverride` for complete theme control:

```tsx
const themeOverride = (theme) => {
  // Modify the entire theme object
  return {
    ...theme,
    button: customButtonTheme,
  };
};

<ThemeProvider themeOverride={themeOverride}>
  <App />
</ThemeProvider>
```

## Accessing Theme

Use the `useTheme` hook to access the current theme:

```tsx
import { useTheme } from '@vaneui/ui';

function CustomComponent() {
  const theme = useTheme();
  
  // Access component themes
  const buttonTheme = theme.button;
  const cardTheme = theme.card;
  
  return <div>Custom component</div>;
}
```