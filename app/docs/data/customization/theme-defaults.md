# ThemeDefaults

The `themeDefaults` property in VaneUI's ThemeProvider allows you to set default theme values that will be applied across all components in your application. This provides a powerful way to establish consistent defaults while still allowing individual components to override these values when needed.

## Understanding ThemeDefaults

### themeDefaults?: ThemeDefaults

The `themeDefaults` property accepts a `ThemeDefaults` object that defines default values for various theme properties. These defaults are merged with VaneUI's built-in defaults and serve as the baseline for all component theming.

```typescript
interface ThemeDefaults {
  color?: ThemeColor;
  size?: ThemeSize;
  radius?: ThemeRadius;
  variant?: ThemeVariant;
  // Component-specific defaults
  button?: {
    color?: ThemeColor;
    size?: ThemeSize;
    variant?: 'filled' | 'outline' | 'ghost';
    radius?: ThemeRadius;
  };
  badge?: {
    color?: ThemeColor;
    size?: ThemeSize;
    variant?: 'filled' | 'outline';
    radius?: ThemeRadius;
  };
  // ... other component defaults
}
```

## Setting Global Defaults

### Basic Global Defaults

Set defaults that apply to all components:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function App() {
  const themeDefaults = {
    color: 'primary',
    size: 'md',
    radius: 'md',
    variant: 'filled'
  };

  return (
    <ThemeProvider themeDefaults={themeDefaults}>
      {/* All components will use these defaults */}
      <Button>Default Primary Button</Button>
      <Badge>Default Primary Badge</Badge>
      <Chip>Default Primary Chip</Chip>
    </ThemeProvider>
  );
}
```

### Brand-Specific Defaults

Create consistent branding across your application:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function BrandedApp() {
  const brandDefaults = {
    color: 'accent',
    radius: 'lg',
    size: 'lg'
  };

  return (
    <ThemeProvider themeDefaults={brandDefaults}>
      <div>
        {/* All components inherit brand defaults */}
        <Button>Branded Button</Button>
        <Card>Branded Card</Card>
        <Badge>Branded Badge</Badge>
      </div>
    </ThemeProvider>
  );
}
```

## Component-Specific Defaults

### Individual Component Defaults

Set defaults for specific component types:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function ComponentSpecificDefaults() {
  const componentDefaults = {
    // Global defaults
    color: 'secondary',
    size: 'md',
    
    // Button-specific defaults
    button: {
      color: 'primary',
      variant: 'filled',
      radius: 'lg'
    },
    
    // Badge-specific defaults
    badge: {
      color: 'success',
      variant: 'outline',
      size: 'sm'
    },
    
    // Card-specific defaults
    card: {
      color: 'tertiary',
      radius: 'xl'
    }
  };

  return (
    <ThemeProvider themeDefaults={componentDefaults}>
      <div>
        {/* Uses button defaults: primary, filled, lg radius */}
        <Button>Primary Button</Button>
        
        {/* Uses badge defaults: success, outline, sm */}
        <Badge>Success Badge</Badge>
        
        {/* Uses card defaults: tertiary, xl radius */}
        <Card>Tertiary Card</Card>
        
        {/* Uses global defaults: secondary */}
        <Chip>Secondary Chip</Chip>
      </div>
    </ThemeProvider>
  );
}
```

### Layout Component Defaults

Configure defaults for layout components:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function LayoutDefaults() {
  const layoutDefaults = {
    container: {
      size: 'lg',
      padding: 'md'
    },
    
    section: {
      color: 'secondary',
      radius: 'md'
    },
    
    card: {
      color: 'default',
      radius: 'lg',
      shadow: 'md'
    },
    
    stack: {
      gap: 'md',
      direction: 'vertical'
    }
  };

  return (
    <ThemeProvider themeDefaults={layoutDefaults}>
      <Container>
        <Section>
          <Card>
            <Stack>
              <Text>Content with layout defaults</Text>
            </Stack>
          </Card>
        </Section>
      </Container>
    </ThemeProvider>
  );
}
```

## Advanced Default Configurations

### Contextual Defaults

Create different default sets for different contexts:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function ContextualDefaults() {
  const adminDefaults = {
    color: 'info',
    size: 'sm',
    button: {
      variant: 'outline'
    }
  };
  
  const userDefaults = {
    color: 'primary',
    size: 'lg',
    button: {
      variant: 'filled',
      radius: 'xl'
    }
  };

  const isAdmin = useUserRole() === 'admin';

  return (
    <ThemeProvider themeDefaults={isAdmin ? adminDefaults : userDefaults}>
      <Navigation />
      <Content />
    </ThemeProvider>
  );
}
```

### Responsive Defaults

Adapt defaults based on screen size:

```jsx
import { useMediaQuery } from './hooks/useMediaQuery';
import { ThemeProvider } from '@vaneui/ui';

function ResponsiveDefaults() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  const getResponsiveDefaults = () => {
    if (isMobile) {
      return {
        size: 'sm',
        radius: 'sm',
        button: {
          size: 'md',
          variant: 'filled'
        }
      };
    }
    
    if (isTablet) {
      return {
        size: 'md',
        radius: 'md',
        button: {
          size: 'lg',
          variant: 'outline'
        }
      };
    }
    
    return {
      size: 'lg',
      radius: 'lg',
      button: {
        size: 'xl',
        variant: 'filled'
      }
    };
  };

  return (
    <ThemeProvider themeDefaults={getResponsiveDefaults()}>
      <ResponsiveInterface />
    </ThemeProvider>
  );
}
```

### Feature-Based Defaults

Set defaults based on application features or modes:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function FeatureDefaults({ isDarkMode, isAccessibilityMode, featureFlags }) {
  const getFeatureDefaults = () => {
    let defaults = {
      color: 'primary',
      size: 'md'
    };
    
    if (isDarkMode) {
      defaults.color = 'tertiary';
    }
    
    if (isAccessibilityMode) {
      defaults.size = 'lg';
      defaults.radius = 'sm';
      defaults.button = {
        variant: 'outline',
        color: 'primary'
      };
    }
    
    if (featureFlags.experimentalDesign) {
      defaults.radius = 'xl';
      defaults.card = {
        shadow: 'lg'
      };
    }
    
    return defaults;
  };

  return (
    <ThemeProvider themeDefaults={getFeatureDefaults()}>
      <Application />
    </ThemeProvider>
  );
}
```

## Override Hierarchy

Understanding how defaults interact with component props:

### Priority Order

1. **Component props** (highest priority)
2. **Component theme/themeOverride**
3. **ThemeDefaults component-specific**
4. **ThemeDefaults global**
5. **VaneUI built-in defaults** (lowest priority)

```jsx
function OverrideExample() {
  const themeDefaults = {
    color: 'secondary',        // Global default
    button: {
      color: 'primary',        // Component default
      size: 'lg'
    }
  };

  return (
    <ThemeProvider themeDefaults={themeDefaults}>
      {/* Uses: color=primary (component default), size=lg (component default) */}
      <Button>Default Button</Button>
      
      {/* Uses: color=success (prop), size=lg (component default) */}
      <Button color="success">Override Color</Button>
      
      {/* Uses: color=danger (theme override), size=sm (prop) */}
      <Button 
        theme={{ colors: { primary: '#ef4444' } }}
        color="primary"
        size="sm"
      >
        Theme Override
      </Button>
    </ThemeProvider>
  );
}
```

## Dynamic Default Updates

### Runtime Default Changes

Update defaults based on user preferences or application state:

```jsx
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@vaneui/ui';

function DynamicDefaults() {
  const [userPrefs, setUserPrefs] = useState({});
  const [themeDefaults, setThemeDefaults] = useState({});
  
  useEffect(() => {
    // Load user preferences
    const prefs = loadUserPreferences();
    setUserPrefs(prefs);
    
    // Update theme defaults based on preferences
    setThemeDefaults({
      color: prefs.preferredColor || 'primary',
      size: prefs.preferredSize || 'md',
      button: {
        variant: prefs.buttonStyle || 'filled'
      }
    });
  }, []);
  
  const updatePreference = (key, value) => {
    const newPrefs = { ...userPrefs, [key]: value };
    setUserPrefs(newPrefs);
    saveUserPreferences(newPrefs);
    
    // Update theme defaults
    setThemeDefaults(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <ThemeProvider themeDefaults={themeDefaults}>
      <PreferencePanel onUpdate={updatePreference} />
      <ApplicationContent />
    </ThemeProvider>
  );
}
```

## Best Practices

### Consistent Defaults

Establish consistent defaults that align with your design system:

```jsx
const designSystemDefaults = {
  // Align with design tokens
  color: 'primary',
  size: 'md',
  radius: 'md',
  
  // Component-specific alignment
  button: {
    variant: 'filled',
    radius: 'lg'
  },
  
  text: {
    color: 'default',
    size: 'md'
  }
};
```

### Semantic Defaults

Use semantic naming and logical groupings:

```jsx
const semanticDefaults = {
  // Interactive elements
  button: { color: 'primary', variant: 'filled' },
  link: { color: 'primary' },
  
  // Informational elements
  badge: { color: 'secondary', size: 'sm' },
  label: { color: 'tertiary' },
  
  // Layout elements
  card: { color: 'default', radius: 'lg' },
  section: { color: 'secondary' }
};
```

### Testing Defaults

Ensure defaults work across all components:

```jsx
function DefaultsTest() {
  const testDefaults = {
    color: 'accent',
    size: 'lg'
  };

  return (
    <ThemeProvider themeDefaults={testDefaults}>
      {/* Test all components use defaults correctly */}
      <Button>Test Button</Button>
      <Badge>Test Badge</Badge>
      <Chip>Test Chip</Chip>
      <Card>Test Card</Card>
    </ThemeProvider>
  );
}
```

The `themeDefaults` property provides a robust system for establishing consistent default values throughout your VaneUI application, enabling both global consistency and component-specific customization while maintaining the flexibility to override defaults when needed.