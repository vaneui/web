The ThemeProvider is the foundation of VaneUI's theming system. It provides theme context to all child components and enables theme customization throughout your application.

## Basic Setup

Wrap your application with ThemeProvider to enable VaneUI theming:

```tsx
import React from 'react';
import { ThemeProvider } from '@vaneui/ui';
import App from './App';

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default Root;
```

## Custom Theme Configuration

Pass a custom theme object to override default styles:

```tsx
import { ThemeProvider } from '@vaneui/ui';

const customTheme = {
  button: {
    variants: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    },
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
  },
  colors: {
    primary: '#7c3aed',
    secondary: '#6b7280',
  }
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

## Theme Properties

### Component Themes

Define styles for specific components:

```tsx
const theme = {
  button: {
    base: 'font-medium rounded transition-colors',
    variants: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    },
    sizes: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    }
  },
  card: {
    base: 'bg-white border border-gray-200 rounded-lg shadow-sm',
    variants: {
      elevated: 'shadow-lg',
      flat: 'shadow-none border-0',
    }
  }
};
```

### Global Design Tokens

Set consistent values across all components:

```tsx
const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    }
  }
};
```

## Nested ThemeProviders

Use multiple ThemeProviders for section-specific theming:

```tsx
function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Header />
      
      <main>
        <Section>
          <h1>Default theme section</h1>
          <Button primary>Default Button</Button>
        </Section>
        
        {/* Override theme for specific section */}
        <ThemeProvider theme={darkTheme}>
          <Section>
            <h1>Dark theme section</h1>
            <Button primary>Dark Button</Button>
          </Section>
        </ThemeProvider>
      </main>
      
      <Footer />
    </ThemeProvider>
  );
}
```

## Dynamic Theming

Change themes dynamically based on user preferences or application state:

```tsx
import { useState } from 'react';
import { ThemeProvider, Button, Stack } from '@vaneui/ui';

const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#1f2937',
  },
  card: {
    base: 'bg-white border border-gray-200'
  }
};

const darkTheme = {
  colors: {
    background: '#1f2937',
    text: '#f9fafb',
  },
  card: {
    base: 'bg-gray-800 border border-gray-700'
  }
};

function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Stack>
        <Button onClick={() => setIsDark(!isDark)}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Button>
        <Card>
          <Text>This card adapts to the theme</Text>
        </Card>
      </Stack>
    </ThemeProvider>
  );
}
```

## Advanced Theme Patterns

### Theme Merging

Combine multiple theme objects:

```tsx
import { mergeThemes } from '@vaneui/ui';

const baseTheme = {
  colors: { primary: '#3b82f6' },
  button: { base: 'font-medium' }
};

const customizations = {
  colors: { secondary: '#6b7280' },
  button: { variants: { primary: 'bg-blue-600' } }
};

const finalTheme = mergeThemes(baseTheme, customizations);

<ThemeProvider theme={finalTheme}>
  <App />
</ThemeProvider>
```

### Conditional Theming

Apply themes based on conditions:

```tsx
function ConditionalTheme({ children, variant }) {
  const getTheme = () => {
    switch (variant) {
      case 'marketing':
        return marketingTheme;
      case 'dashboard':
        return dashboardTheme;
      default:
        return defaultTheme;
    }
  };
  
  return (
    <ThemeProvider theme={getTheme()}>
      {children}
    </ThemeProvider>
  );
}
```

### Theme Context Hook

Access theme values in components:

```tsx
import { useTheme } from '@vaneui/ui';

function CustomComponent() {
  const theme = useTheme();
  
  const customStyles = {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
  };
  
  return (
    <div style={customStyles}>
      Styled with theme values
    </div>
  );
}
```

## Theme Development Best Practices

### 1. Theme Structure

Organize themes logically:

```tsx
const theme = {
  // Global tokens
  colors: { /* ... */ },
  spacing: { /* ... */ },
  typography: { /* ... */ },
  
  // Component themes
  button: { /* ... */ },
  card: { /* ... */ },
  input: { /* ... */ },
  
  // Layout themes
  container: { /* ... */ },
  stack: { /* ... */ },
  grid: { /* ... */ },
};
```

### 2. Theme Consistency

Use consistent naming and values:

```tsx
// ✅ Good - Consistent naming
const theme = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryLight: '#93c5fd',
  },
  button: {
    variants: {
      primary: 'bg-primary hover:bg-primaryHover',
    }
  }
};

// ❌ Avoid - Inconsistent naming
const theme = {
  colors: {
    blue: '#3b82f6',
    btnHover: '#2563eb',
  }
};
```

### 3. Performance Optimization

Define themes outside components:

```tsx
// ✅ Good - Static theme
const APP_THEME = {
  button: { primary: 'bg-blue-600' }
};

function App() {
  return (
    <ThemeProvider theme={APP_THEME}>
      <Components />
    </ThemeProvider>
  );
}

// ❌ Avoid - Theme created on every render
function App() {
  return (
    <ThemeProvider theme={{ button: { primary: 'bg-blue-600' } }}>
      <Components />
    </ThemeProvider>
  );
}
```

## Theme Validation

Validate theme structure in development:

```tsx
import { validateTheme } from '@vaneui/ui';

const theme = {
  button: {
    variants: {
      primary: 'bg-blue-600',
      // Missing required 'secondary' variant
    }
  }
};

// In development mode
if (process.env.NODE_ENV === 'development') {
  const validation = validateTheme(theme);
  if (!validation.isValid) {
    console.warn('Theme validation errors:', validation.errors);
  }
}
```

## TypeScript Support

Get full type safety with TypeScript:

```tsx
import { Theme, ThemeProvider } from '@vaneui/ui';

const customTheme: Theme = {
  button: {
    variants: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    sizes: {
      sm: 'px-3 py-1.5',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Troubleshooting

### Common Issues

**Theme not applying**: Ensure ThemeProvider wraps all components that need theming.

**Styles overridden**: Check for conflicting CSS classes or nested ThemeProviders.

**Performance issues**: Move theme definitions outside component render functions.

**TypeScript errors**: Ensure theme object matches the expected Theme interface.

## Next Steps

- **Component Examples**: See themed components in action
- **Advanced Theming**: Explore complex theming scenarios
- **Design System Integration**: Connect VaneUI with your design system