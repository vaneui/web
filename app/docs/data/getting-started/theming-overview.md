VaneUI features a powerful theming system that allows you to customize the appearance and behavior of components while maintaining consistency across your application.

## Theme Architecture

VaneUI's theming system is built on several key concepts:

- **Design Tokens**: Consistent values for colors, spacing, typography, and other design properties
- **Component Themes**: Specific styling rules for individual components
- **Theme Variants**: Different visual treatments (e.g., filled vs outline buttons)
- **Responsive Themes**: Themes that adapt to different screen sizes

## Default Theme Structure

Every VaneUI installation includes a comprehensive default theme:

```tsx
const defaultTheme = {
  // Color tokens
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
  },
  
  // Spacing tokens
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  // Component-specific themes
  button: {
    base: 'px-4 py-2 rounded font-medium',
    variants: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    }
  }
};
```

## Theme Categories

### Size Themes

Control component dimensions and spacing:

```tsx
// Size variations affect padding, font size, and overall scale
<Button xs>Extra Small</Button>
<Button sm>Small</Button>
<Button md>Medium</Button>
<Button lg>Large</Button>
<Button xl>Extra Large</Button>
```

### Appearance Themes

Define color schemes and visual styles:

```tsx
// Semantic color meanings
<Button primary>Primary Action</Button>    // Brand color
<Button secondary>Secondary</Button>       // Neutral
<Button success>Success</Button>           // Positive actions
<Button danger>Delete</Button>             // Destructive actions
<Button warning>Warning</Button>           // Caution
```

### Shape Themes

Control border radius and geometric properties:

```tsx
<Card sharp>Sharp corners</Card>
<Card rounded>Rounded corners</Card>
<Card pill>Pill shape</Card>
```

### Layout Themes

Affect spacing, alignment, and positioning:

```tsx
<Stack xs>Tight spacing</Stack>
<Stack md>Medium spacing</Stack>
<Stack xl>Loose spacing</Stack>
```

## Theme Inheritance

Components inherit theme properties in a hierarchical manner:

1. **Global theme** - Applied to all components
2. **Component-specific theme** - Overrides global for specific components
3. **Instance props** - Override everything for individual component instances

```tsx
// Global theme applied
<ThemeProvider theme={customTheme}>
  {/* Uses global button theme */}
  <Button>Global Theme</Button>
  
  {/* Local ThemeProvider overrides */}
  <ThemeProvider theme={{ button: { primary: 'bg-red-500' } }}>
    <Button primary>Red Button</Button>
  </ThemeProvider>
  
  {/* Instance props override everything */}
  <Button primary className="bg-green-500">Green Button</Button>
</ThemeProvider>
```

## Responsive Theming

Themes can adapt to different screen sizes automatically:

```tsx
const responsiveTheme = {
  button: {
    base: 'px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3',
    sizes: {
      md: 'text-sm sm:text-base lg:text-lg'
    }
  }
};
```

## Design System Integration

VaneUI themes integrate seamlessly with design systems:

### Design Tokens

Map your design system tokens to VaneUI themes:

```tsx
const brandTheme = {
  colors: {
    primary: 'var(--brand-primary)',
    secondary: 'var(--brand-secondary)',
  },
  fonts: {
    sans: 'var(--font-family-sans)',
    heading: 'var(--font-family-heading)',
  },
  spacing: {
    xs: 'var(--space-1)',
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
  }
};
```

### Component Variants

Create consistent component variations:

```tsx
const componentTheme = {
  button: {
    // Base styles applied to all buttons
    base: 'font-medium transition-colors focus:outline-none',
    
    // Variant-specific styles
    variants: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
      ghost: 'hover:bg-gray-100 text-gray-700',
    },
    
    // Size variations
    sizes: {
      sm: 'px-3 py-1.5 text-sm rounded',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
    }
  }
};
```

## Theme Customization Patterns

### Partial Theme Overrides

Override only specific aspects of the default theme:

```tsx
const customTheme = {
  // Only override button styles, keep everything else default
  button: {
    variants: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    }
  }
};
```

### Dark Mode Support

Create theme variants for different color schemes:

```tsx
const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
  }
};

const darkTheme = {
  colors: {
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
  }
};

// Conditional theme application
<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
  <App />
</ThemeProvider>
```

### Brand Customization

Align VaneUI with your brand identity:

```tsx
const brandTheme = {
  colors: {
    primary: '#ff6b35',      // Brand orange
    secondary: '#004e89',    // Brand blue
  },
  button: {
    base: 'font-bold uppercase tracking-wider',
    variants: {
      primary: 'bg-gradient-to-r from-orange-500 to-red-500',
    }
  },
  typography: {
    heading: 'font-display',   // Custom font family
    body: 'font-sans',
  }
};
```

## Performance Considerations

### Theme Optimization

- **Static themes**: Define themes outside components to prevent re-renders
- **Memoization**: Use `useMemo` for computed theme values
- **Selective overrides**: Override only necessary theme properties

```tsx
// ✅ Good - Static theme definition
const appTheme = {
  button: { primary: 'bg-blue-600' }
};

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <MyComponent />
    </ThemeProvider>
  );
}

// ❌ Avoid - Theme created on every render
function App() {
  const theme = { button: { primary: 'bg-blue-600' } }; // New object every render
  
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}
```

## Theme Development Workflow

### 1. Define Design Tokens

Start with your base design system:

```tsx
const tokens = {
  colors: { /* color palette */ },
  spacing: { /* spacing scale */ },
  typography: { /* font definitions */ },
  borders: { /* border styles */ },
  shadows: { /* shadow definitions */ },
};
```

### 2. Create Component Themes

Map tokens to component styles:

```tsx
const componentThemes = {
  button: mapTokensToButton(tokens),
  card: mapTokensToCard(tokens),
  input: mapTokensToInput(tokens),
};
```

### 3. Test and Iterate

Use component examples to validate theme consistency:

```tsx
function ThemePreview() {
  return (
    <Stack>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Card><Text>Card content</Text></Card>
    </Stack>
  );
}
```

## Next Steps

- **Using ThemeProvider**: Learn how to implement custom themes
- **Component Examples**: See themed components in action
- **Advanced Theming**: Explore complex theming scenarios