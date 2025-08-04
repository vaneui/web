The ThemeProvider is the foundation of VaneUI's theming system. It provides theme context to all child components.

## Basic Setup

Wrap your application with ThemeProvider:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}
```

## Theme Prop

Override component themes with the `theme` prop:

```tsx
import { ThemeProvider } from '@vaneui/ui';

const customTheme = {
  button: {
    // Custom button theme object
  }
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Button>Themed Button</Button>
    </ThemeProvider>
  );
}
```

## Theme Defaults

Set default prop values for components with `themeDefaults`:

```tsx
const defaults = {
  button: {
    primary: true, // All buttons are primary by default
    md: true,      // All buttons are medium by default
  },
  text: {
    default: true, // All text uses default appearance
  }
};

function App() {
  return (
    <ThemeProvider themeDefaults={defaults}>
      <Button>This is primary and medium</Button>
      <Text>This uses default appearance</Text>
    </ThemeProvider>
  );
}
```

## Extra Classes

Add additional CSS classes with `extraClasses`:

```tsx
const extraClasses = {
  button: {
    primary: 'shadow-lg transform hover:scale-105',
    xs: 'tracking-wide',
  },
  card: {
    default: 'transition-all duration-200',
  }
};

function App() {
  return (
    <ThemeProvider extraClasses={extraClasses}>
      <Button primary xs>Enhanced Button</Button>
      <Card>Enhanced Card</Card>
    </ThemeProvider>
  );
}
```

## Theme Override Function

Use `themeOverride` for complete theme control:

```tsx
const themeOverride = (theme) => {
  // Modify the entire theme
  return {
    ...theme,
    button: {
      ...theme.button,
      // Override button theme methods
    }
  };
};

function App() {
  return (
    <ThemeProvider themeOverride={themeOverride}>
      <Button>Completely custom themed button</Button>
    </ThemeProvider>
  );
}
```

## Combining Props

Use multiple theming props together:

```tsx
function App() {
  return (
    <ThemeProvider
      theme={customTheme}
      themeDefaults={defaults}
      extraClasses={extraClasses}
      themeOverride={themeOverride}
    >
      <YourComponents />
    </ThemeProvider>
  );
}
```

## Nested ThemeProviders

Override themes for specific sections:

```tsx
function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Header />
      
      <ThemeProvider theme={sectionTheme}>
        <Section>
          <Button>Section themed button</Button>
        </Section>
      </ThemeProvider>
      
      <Footer />
    </ThemeProvider>
  );
}
```

## Dynamic Theming

Change themes based on state:

```tsx
import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </Button>
    </ThemeProvider>
  );
}
```

## Accessing Theme

Use the `useTheme` hook:

```tsx
import { useTheme } from '@vaneui/ui';

function CustomComponent() {
  const theme = useTheme();
  
  // Access any component theme
  const buttonTheme = theme.button;
  const cardTheme = theme.card;
  
  return <div>Custom component</div>;
}
```