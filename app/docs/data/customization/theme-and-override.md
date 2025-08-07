# Theme & ThemeOverride

The `theme` and `themeOverride` properties provide powerful ways to customize VaneUI components at the individual component level. These properties allow you to apply specific theming configurations without affecting other components in your application.

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
import { Button, Badge, Card } from '@vaneui/ui';

function CustomThemedComponents() {
  const customTheme = {
    colors: {
      primary: '#8b5cf6',
      success: '#10b981',
      danger: '#ef4444'
    }
  };

  return (
    <div>
      <Button theme={customTheme} filled primary>
        Custom Purple Button
      </Button>
      
      <Badge theme={customTheme} success>
        Custom Green Badge
      </Badge>
      
      <Card theme={customTheme} danger>
        Custom Red Card
      </Card>
    </div>
  );
}
```

### Size and Radius Customization

Modify sizing and border radius values:

```jsx
import { Button, Chip } from '@vaneui/ui';

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
    <div>
      <Button theme={sizeTheme} sm>
        Custom Button
      </Button>
      
      <Chip theme={sizeTheme} md>
        Custom Chip
      </Chip>
    </div>
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
      <Button theme={brandTheme} primary>
        Brand Button
      </Button>
      
      <Badge theme={brandTheme} accent>
        Brand Badge
      </Badge>
      
      {/* Warning-themed components */}
      <Button theme={warningTheme} warning>
        Warning Button
      </Button>
    </div>
  );
}
```

## Using the themeOverride Property

### Dynamic Theme Modifications

Transform themes based on conditions or calculations:

```jsx
import { Button } from '@vaneui/ui';

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
    <Button themeOverride={themeOverride} primary>
      Adaptive Button
    </Button>
  );
}
```

### Complex Theme Transformations

Create sophisticated theme modifications:

```jsx
import { Card, Text } from '@vaneui/ui';

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
    <Card themeOverride={gradientThemeOverride} primary>
      <Text>Gradient themed card</Text>
    </Card>
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
    <Button 
      themeOverride={conditionalOverride} 
      primary
      disabled={disabled}
    >
      Conditional Button
    </Button>
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
    <Button 
      theme={baseTheme}
      themeOverride={override}
      primary
    >
      Combined Theming
    </Button>
  );
}
```

## Advanced Patterns

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
    <Card theme={parentTheme} secondary>
      <Text primary>Parent themed text</Text>
      
      <Button 
        theme={parentTheme}
        themeOverride={childOverride}
        accent
      >
        Child with override
      </Button>
    </Card>
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
    <Button themeOverride={responsiveOverride} md>
      Responsive Button
    </Button>
  );
}
```

## Performance Considerations

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
    <Button 
      theme={theme}
      themeOverride={themeOverride}
      primary
    >
      Optimized Button
    </Button>
  );
}
```

The `theme` and `themeOverride` properties provide flexible, component-level customization options that complement VaneUI's global theming system, allowing for precise control over individual component appearances while maintaining consistency across your application.