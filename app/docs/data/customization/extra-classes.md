The `extraClasses` property in VaneUI's ThemeProvider allows you to add additional CSS classes to components based on which boolean props are active. This enables custom styling, animations, and effects while maintaining VaneUI's theming architecture.

## Understanding ExtraClasses

### extraClasses?: ThemeExtraClasses

The `extraClasses` property accepts an object where keys are component names, and values are objects mapping boolean prop names to CSS class strings. When a prop is active, its associated classes are added.

## Basic Usage

### Adding Classes Based on Props

Apply extra classes when specific boolean props are active:

```tsx
import { ThemeProvider, Button, Badge } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider extraClasses={{
      button: {
        primary: 'shadow-lg hover:shadow-xl transition-shadow',
        danger: 'animate-pulse'
      },
      badge: {
        success: 'ring-2 ring-green-200'
      }
    }}>
      <Button primary>Button with shadow</Button>
      <Button danger>Pulsing danger button</Button>
      <Badge success>Badge with ring</Badge>
    </ThemeProvider>
  );
}
```

### Size-Based Classes

Add classes based on size props:

```tsx
<ThemeProvider extraClasses={{
  button: {
    xs: 'text-xs',
    sm: 'text-sm',
    lg: 'text-lg font-medium',
    xl: 'text-xl font-semibold'
  }
}}>
  <Button lg>Large button with extra styles</Button>
</ThemeProvider>
```

## Animation and Effects

### Hover and Transition Effects

Create engaging interactions with animation classes:

```tsx
<ThemeProvider extraClasses={{
  button: {
    primary: 'hover:scale-105 active:scale-95 transition-transform duration-150',
    success: 'hover:brightness-110 transition-all'
  },
  card: {
    primary: 'hover:shadow-xl transition-shadow duration-300'
  }
}}>
  <Button primary>Scalable Button</Button>
  <Card primary>Hoverable Card</Card>
</ThemeProvider>
```

### Attention-Grabbing Effects

Draw attention to important elements:

```tsx
<ThemeProvider extraClasses={{
  button: {
    danger: 'animate-pulse',
    warning: 'animate-bounce'
  },
  badge: {
    danger: 'animate-ping'
  }
}}>
  <Button danger>Pulsing Alert</Button>
  <Badge danger>New</Badge>
</ThemeProvider>
```

## Combining Multiple Props

When multiple props are active, all their associated classes are combined:

```tsx
<ThemeProvider extraClasses={{
  button: {
    primary: 'shadow-lg',
    lg: 'font-bold',
    filled: 'border-2'
  }
}}>
  {/* Gets all three: shadow-lg + font-bold + border-2 */}
  <Button primary lg filled>Combined Styles</Button>
</ThemeProvider>
```

## Conditional Extra Classes

### Dynamic Class Application

Apply classes based on application state:

```tsx
import { useState } from 'react';
import { ThemeProvider, Button } from '@vaneui/ui';

function DynamicExtraClasses() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const extraClasses = isHighContrast
    ? {
        button: {
          primary: 'border-4 border-black font-black',
          danger: 'border-4 border-red-900 font-black'
        }
      }
    : {
        button: {
          primary: 'shadow-sm',
          danger: 'shadow-sm'
        }
      };

  return (
    <ThemeProvider extraClasses={extraClasses}>
      <Button onClick={() => setIsHighContrast(!isHighContrast)}>
        Toggle High Contrast
      </Button>
      <Button primary>Primary Button</Button>
      <Button danger>Danger Button</Button>
    </ThemeProvider>
  );
}
```

## Best Practices

### Consistent Naming

Use consistent class patterns:

```tsx
const extraClasses = {
  button: {
    // Hover effects
    primary: 'hover:shadow-lg',
    secondary: 'hover:shadow-md',
    
    // Active states
    danger: 'active:scale-95',
    
    // Transitions
    success: 'transition-all duration-200'
  }
};
```

### Avoid Conflicting Classes

Be careful not to add classes that conflict with VaneUI's base styles:

```tsx
// ❌ Avoid - may conflict with VaneUI's padding
extraClasses: {
  button: { primary: 'p-8' }
}

// ✅ Better - adds effects that complement base styles
extraClasses: {
  button: { primary: 'hover:brightness-110' }
}
```

The `extraClasses` system provides a powerful way to extend VaneUI components with custom styling based on active props, enabling seamless integration with any CSS framework while maintaining the benefits of the theming system.
