# Using ThemeProvider

The ThemeProvider is the foundation of VaneUI's theming system. It wraps your application and provides theme context to all child components, enabling consistent styling and customization throughout your app.

## Basic Setup

### Simple ThemeProvider

The most basic setup requires no configuration:

```tsx
import { ThemeProvider } from '@vaneui/ui';
import { Button, Badge, Card } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider>
      <div>
        <Button>Default Button</Button>
        <Badge>Default Badge</Badge>
        <Card>Default Card</Card>
      </div>
    </ThemeProvider>
  );
}
```

### Custom Colors

Apply custom colors to your entire application:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function App() {
  const customTheme = {
    colors: {
      primary: '#8b5cf6',   // Purple primary
      success: '#10b981',   // Green success
      danger: '#ef4444'     // Red danger
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Button primary>Purple Button</Button>
        <Badge success>Green Badge</Badge>
        <Button danger>Red Button</Button>
      </div>
    </ThemeProvider>
  );
}
```

### Setting Defaults

Configure default props for all components:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function App() {
  const defaults = {
    color: 'primary',        // All components use primary color by default
    size: 'lg',             // All components are large by default
    radius: 'lg',           // All components have large border radius
    
    // Component-specific defaults
    button: {
      variant: 'filled'      // All buttons are filled by default
    }
  };

  return (
    <ThemeProvider themeDefaults={defaults}>
      <div>
        {/* Uses primary color, large size, large radius, filled variant */}
        <Button>Default Styled Button</Button>
        
        {/* Uses primary color, large size, large radius */}
        <Badge>Default Styled Badge</Badge>
        
        {/* Override specific props while keeping other defaults */}
        <Button success sm>
          Custom Button
        </Button>
      </div>
    </ThemeProvider>
  );
}
```

## Quick Examples

### Brand Theme

Create a consistent brand experience:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function BrandedApp() {
  const brandTheme = {
    colors: {
      primary: '#6366f1',    // Indigo brand color
      secondary: '#8b5cf6',  // Purple accent
      accent: '#ec4899'      // Pink highlight
    }
  };
  
  const brandDefaults = {
    color: 'primary',
    radius: 'lg'
  };

  return (
    <ThemeProvider theme={brandTheme} themeDefaults={brandDefaults}>
      <nav>
        <Button primary>Home</Button>
        <Button secondary>About</Button>
        <Badge accent>New</Badge>
      </nav>
    </ThemeProvider>
  );
}
```

### Dark Mode Theme

Implement a simple dark mode:

```tsx
import { useState } from 'react';
import { ThemeProvider } from '@vaneui/ui';

function DarkModeApp() {
  const [isDark, setIsDark] = useState(false);
  
  const lightTheme = {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280'
    }
  };
  
  const darkTheme = {
    colors: {
      primary: '#60a5fa',
      secondary: '#9ca3af'
    }
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <div className={isDark ? 'dark bg-gray-900' : 'bg-white'}>
        <Button onClick={() => setIsDark(!isDark)}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Button>
        
        <Button primary>Primary Action</Button>
        <Text secondary>Secondary text</Text>
      </div>
    </ThemeProvider>
  );
}
```

### Utility Classes Integration

Add Tailwind CSS or custom utility classes:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function UtilityStyledApp() {
  const extraClasses = {
    // Global classes applied to all components
    root: 'transition-all duration-200',
    
    // Component-specific classes
    button: {
      root: 'shadow-md hover:shadow-lg transform hover:-translate-y-1'
    },
    
    badge: {
      root: 'font-semibold uppercase tracking-wide'
    }
  };

  return (
    <ThemeProvider extraClasses={extraClasses}>
      <div>
        <Button>Animated Button</Button>
        <Badge>Styled Badge</Badge>
      </div>
    </ThemeProvider>
  );
}
```

## Nested Theming

Override themes for specific sections of your app:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function NestedThemeApp() {
  const globalTheme = {
    colors: { primary: '#3b82f6' }
  };
  
  const sidebarTheme = {
    colors: { primary: '#8b5cf6' }
  };

  return (
    <ThemeProvider theme={globalTheme}>
      <div>
        <Button primary>Global Blue Button</Button>
        
        <aside>
          <ThemeProvider theme={sidebarTheme}>
            <Button primary>Sidebar Purple Button</Button>
            <Badge primary>Purple Badge</Badge>
          </ThemeProvider>
        </aside>
      </div>
    </ThemeProvider>
  );
}
```

## Accessing Theme Context

Use the `useTheme` hook to access theme values in custom components:

```tsx
import { useTheme } from '@vaneui/ui';

function CustomComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      Custom component using theme color
    </div>
  );
}
```

## Advanced Customization

For more detailed information about specific ThemeProvider properties, see these dedicated guides:

- **[Theme & ThemeOverride](./theme-and-override)** - Learn about the `theme` and `themeOverride` properties for component-level theming
- **[ThemeDefaults](./theme-defaults)** - Understand how to set application-wide default values using `themeDefaults`
- **[ExtraClasses](./extra-classes)** - Discover how to add custom CSS classes with `extraClasses`
- **[CSS Variables](./css-variables)** - Customize components using CSS custom properties

## Common Patterns

### Responsive Theming

```tsx
import { useMediaQuery } from './hooks/useMediaQuery';

function ResponsiveThemedApp() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const responsiveDefaults = {
    size: isMobile ? 'sm' : 'lg',
    radius: isMobile ? 'sm' : 'md'
  };

  return (
    <ThemeProvider themeDefaults={responsiveDefaults}>
      <Button>Responsive Button</Button>
    </ThemeProvider>
  );
}
```

### Theme Switching

```tsx
import { useState } from 'react';

const themes = {
  blue: { colors: { primary: '#3b82f6' } },
  purple: { colors: { primary: '#8b5cf6' } },
  green: { colors: { primary: '#10b981' } }
};

function ThemeSwitcherApp() {
  const [currentTheme, setCurrentTheme] = useState('blue');

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <div>
        {Object.keys(themes).map(theme => (
          <Button 
            key={theme} 
            onClick={() => setCurrentTheme(theme)}
            {...(currentTheme === theme ? { filled: true } : { outline: true })}
          >
            {theme}
          </Button>
        ))}
        
        <Button primary>Themed Button</Button>
      </div>
    </ThemeProvider>
  );
}
```

The ThemeProvider is designed to be flexible and powerful, allowing you to start simple and add complexity as needed. Begin with basic theming and gradually explore the advanced features as your application grows.