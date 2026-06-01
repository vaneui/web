The `extraClasses` property in VaneUI's ThemeProvider allows you to add additional CSS classes to components based on which boolean props are active. This enables custom styling, animations, and effects while maintaining VaneUI's theming architecture.

## Understanding extraClasses

### extraClasses?: ThemeExtraClasses

The `extraClasses` property accepts an object where keys are component names and values map boolean prop names to CSS class strings. When a prop is active, its associated classes are added.

Most components are keyed directly. **Components with sub-themes** (`button`, `card`, `checkbox`, `modal`, `menu`, `navLink`) are nested by sub-theme name (`main`, `content`, `input`, `item`, `root`, etc.). The shape mirrors `themeDefaults`.

## Basic usage

### Adding classes based on props

Apply extra classes when specific boolean props are active:

```tsx
import { ThemeProvider, Button, Badge } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider extraClasses={{
      button: {
        main: {
          primary: 'shadow-lg hover:shadow-xl transition-shadow',
          danger: 'animate-pulse',
        },
      },
      badge: {
        success: 'ring-2 ring-green-200',
      },
    }}>
      <Button primary>Button with shadow</Button>
      <Button danger>Pulsing danger button</Button>
      <Badge success>Badge with ring</Badge>
    </ThemeProvider>
  );
}
```

### Size-based classes

Add classes based on size props:

```tsx
<ThemeProvider extraClasses={{
  button: {
    main: {
      lg: 'font-bold',
      xl: 'font-extrabold',
    },
  },
}}>
  <Button lg>Large bold button</Button>
</ThemeProvider>
```

## Animation and effects

### Hover and transition effects

Create engaging interactions with animation classes:

```tsx
<ThemeProvider extraClasses={{
  button: {
    main: {
      primary: 'hover:scale-105 active:scale-95 transition-transform duration-150',
      success: 'hover:brightness-110 transition-all',
    },
  },
  card: {
    main: {
      primary: 'hover:shadow-xl transition-shadow duration-300',
    },
  },
}}>
  <Button primary>Scalable Button</Button>
  <Card primary>Hoverable Card</Card>
</ThemeProvider>
```

### Attention-grabbing effects

Draw attention to important elements:

```tsx
<ThemeProvider extraClasses={{
  button: {
    main: {
      danger: 'animate-pulse',
      warning: 'animate-bounce',
    },
  },
  badge: {
    danger: 'animate-ping',
  },
}}>
  <Button danger>Pulsing Alert</Button>
  <Badge danger>New</Badge>
</ThemeProvider>
```

## Combining multiple props

When multiple props are active, all their associated classes are combined:

```tsx
<ThemeProvider extraClasses={{
  button: {
    main: {
      primary: 'shadow-lg',
      lg: 'font-bold',
      filled: 'border-2',
    },
  },
}}>
  {/* Gets all three: shadow-lg + font-bold + border-2 */}
  <Button primary lg filled>Combined Styles</Button>
</ThemeProvider>
```

## Conditional extra classes

### Dynamic class application

Apply classes based on application state:

```tsx
import { useState } from 'react';
import { ThemeProvider, Button, type ThemeExtraClasses } from '@vaneui/ui';

function DynamicExtraClasses() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const extraClasses: ThemeExtraClasses = isHighContrast
    ? {
        button: {
          main: {
            primary: 'border-4 border-black font-black',
            danger: 'border-4 border-red-900 font-black',
          },
        },
      }
    : {
        button: {
          main: {
            primary: 'shadow-sm',
            danger: 'shadow-sm',
          },
        },
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

## Patterns that keep extraClasses predictable

### Consistent naming

Use consistent class patterns:

```tsx
const extraClasses = {
  button: {
    main: {
      // Hover effects
      primary: 'hover:shadow-lg',
      secondary: 'hover:shadow-md',

      // Active states
      danger: 'active:scale-95',

      // Transitions
      success: 'transition-all duration-200',
    },
  },
};
```

### Avoid conflicting classes

Be careful not to add classes that conflict with VaneUI's size-driven system (padding, gap, font-size, border-radius scale via the size prop):

```tsx
// Avoid — fights the size system; padding is set by --py-unit per size
extraClasses: {
  button: { main: { primary: 'p-8' } }
}

// Better — adds effects that complement base styles
extraClasses: {
  button: { main: { primary: 'hover:brightness-110' } }
}
```

The `extraClasses` system lets you extend VaneUI components with prop-conditional classes and integrate with any CSS framework while keeping the theming system intact.
