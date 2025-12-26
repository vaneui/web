The `theme` and `themeOverride` properties are applied via ThemeProvider (not on individual components). You can scope changes globally or to any subtree by wrapping that part of your UI with a ThemeProvider, leaving the rest of the app unaffected.

## Understanding Theme Properties

### theme?: PartialTheme

The `theme` property accepts a partial theme object that merges with the default theme values. This allows you to override specific theme tokens while keeping the rest of the default values intact.

```typescript
interface PartialTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    success?: string;
    danger?: string;
    warning?: string;
    info?: string;
    accent?: string;
  };
  sizes?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  radius?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}
```

### themeOverride?: (theme: ThemeProps) => ThemeProps

The `themeOverride` function receives the current theme as a parameter and returns a modified theme object. This approach gives you complete control over theme transformations and allows for complex customizations.

```typescript
type ThemeOverride = (theme: ThemeProps) => ThemeProps;
```

## Using the theme Property

### Basic Color Customization

Override specific colors for individual components:

```jsx
import { ThemeProvider, Button, Badge, Card } from '@vaneui/ui';

function CustomThemedComponents() {
  const customTheme = {
    colors: {
      primary: '#8b5cf6',
      success: '#10b981',
      danger: '#ef4444'
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Button filled primary>
          Custom Purple Button
        </Button>
        
        <Badge success>
          Custom Green Badge
        </Badge>
        
        <Card danger>
          Custom Red Card
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

### Size and Radius Customization

Modify sizing and border radius values:

```jsx
import { ThemeProvider, Button, Chip } from '@vaneui/ui';

function CustomSizedComponents() {
  const sizeTheme = {
    sizes: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem'
    },
    radius: {
      md: '1rem',
      lg: '1.5rem'
    }
  };

  return (
    <ThemeProvider theme={sizeTheme}>
      <div>
        <Button sm>
          Custom Button
        </Button>
        
        <Chip md>
          Custom Chip
        </Chip>
      </div>
    </ThemeProvider>
  );
}
```

### Component-Specific Themes

Create reusable theme objects for consistent styling:

```jsx
import { Button, Badge } from '@vaneui/ui';

const brandTheme = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899'
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem'
  }
};

const warningTheme = {
  colors: {
    warning: '#f59e0b',
    danger: '#ef4444'
  }
};

function ThemedInterface() {
  return (
    <div>
      {/* Brand-themed components */}
      <ThemeProvider theme={brandTheme}>
        <Button primary>
          Brand Button
        </Button>
        
        <Badge accent>
          Brand Badge
        </Badge>
      </ThemeProvider>
      
      {/* Warning-themed components */}
      <ThemeProvider theme={warningTheme}>
        <Button warning>
          Warning Button
        </Button>
      </ThemeProvider>
    </div>
  );
}
```

## Using the themeOverride Property

### Dynamic Theme Modifications

Transform themes based on conditions or calculations:

```jsx
import { ThemeProvider, Button } from '@vaneui/ui';

function DynamicThemedButton({ isHighContrast = false }) {
  const themeOverride = (theme) => {
    if (isHighContrast) {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#000000',
          secondary: '#333333'
        }
      };
    }
    
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#6366f1'
      }
    };
  };

  return (
    <ThemeProvider themeOverride={themeOverride}>
      <Button primary>
        Adaptive Button
      </Button>
    </ThemeProvider>
  );
}
```

### Complex Theme Transformations

Create sophisticated theme modifications:

```jsx
import { ThemeProvider, Card, Text } from '@vaneui/ui';

function GradientCard({ baseColor = '#3b82f6' }) {
  const gradientThemeOverride = (theme) => {
    // Generate complementary colors
    const lighterColor = adjustColor(baseColor, 20);
    const darkerColor = adjustColor(baseColor, -20);
    
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: baseColor,
        secondary: lighterColor
      },
      customStyles: {
        background: `linear-gradient(135deg, ${lighterColor}, ${darkerColor})`
      }
    };
  };

  return (
    <ThemeProvider themeOverride={gradientThemeOverride}>
      <Card primary>
        <Text>Gradient themed card</Text>
      </Card>
    </ThemeProvider>
  );
}

// Helper function to adjust color brightness
function adjustColor(color, percent) {
  // Implementation would adjust color brightness
  return color;
}
```

### Conditional Theme Logic

Apply different themes based on props or state:

```jsx
import { Button } from '@vaneui/ui';

function ConditionalThemedButton({ variant, disabled }) {
  const conditionalOverride = (theme) => {
    let modifiedTheme = { ...theme };
    
    // Apply variant-specific modifications
    if (variant === 'special') {
      modifiedTheme.colors.primary = '#8b5cf6';
      modifiedTheme.radius.md = '1rem';
    }
    
    // Apply disabled state modifications
    if (disabled) {
      modifiedTheme.colors = {
        ...modifiedTheme.colors,
        primary: '#9ca3af'
      };
    }
    
    return modifiedTheme;
  };

  return (
    <ThemeProvider themeOverride={conditionalOverride}>
      <Button 
        primary
        disabled={disabled}
      >
        Conditional Button
      </Button>
    </ThemeProvider>
  );
}
```

## Combining theme and themeOverride

You can use both properties together, where `theme` is applied first, then `themeOverride`:

```jsx
import { Button } from '@vaneui/ui';

function CombinedThemeButton() {
  const baseTheme = {
    colors: {
      primary: '#3b82f6'
    }
  };
  
  const override = (theme) => ({
    ...theme,
    radius: {
      ...theme.radius,
      md: '1rem'
    }
  });

  return (
    <ThemeProvider theme={baseTheme} themeOverride={override}>
      <Button primary>
        Combined Theming
      </Button>
    </ThemeProvider>
  );
}
```

## Advanced Theme Patterns

### Theme Inheritance

Create hierarchical theme structures:

```jsx
import { Card, Button, Text } from '@vaneui/ui';

function ThemeHierarchy() {
  const parentTheme = {
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280'
    }
  };
  
  const childOverride = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      accent: '#ec4899'
    }
  });

  return (
    <ThemeProvider theme={parentTheme}>
      <Card secondary>
        <Text primary>Parent themed text</Text>
        
        <ThemeProvider theme={parentTheme} themeOverride={childOverride}>
          <Button accent>
            Child with override
          </Button>
        </ThemeProvider>
      </Card>
    </ThemeProvider>
  );
}
```

### Responsive Theming

Adapt themes based on screen size or device capabilities:

```jsx
import { useMediaQuery } from './hooks/useMediaQuery';
import { Button } from '@vaneui/ui';

function ResponsiveThemedButton() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const responsiveOverride = (theme) => ({
    ...theme,
    sizes: {
      ...theme.sizes,
      md: isMobile ? '2rem' : '2.5rem'
    },
    radius: {
      ...theme.radius,
      md: isMobile ? '0.5rem' : '0.75rem'
    }
  });

  return (
    <ThemeProvider themeOverride={responsiveOverride}>
      <Button md>
        Responsive Button
      </Button>
    </ThemeProvider>
  );
}
```

## Theme Performance

### Theme Memoization

Use `useMemo` to prevent unnecessary theme recalculations:

```jsx
import { useMemo } from 'react';
import { Button } from '@vaneui/ui';

function OptimizedThemedButton({ color, isActive }) {
  const theme = useMemo(() => ({
    colors: {
      primary: isActive ? '#8b5cf6' : '#6b7280'
    }
  }), [isActive]);
  
  const themeOverride = useMemo(() => (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      secondary: color
    }
  }), [color]);

  return (
    <ThemeProvider theme={theme} themeOverride={themeOverride}>
      <Button primary>
        Optimized Button
      </Button>
    </ThemeProvider>
  );
}
```

The `theme` and `themeOverride` properties are provided by ThemeProvider and can be scoped to any part of your UI by wrapping with a ThemeProvider. This enables precise control over specific areas while maintaining consistent theming elsewhere.