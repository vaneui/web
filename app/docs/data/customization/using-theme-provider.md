The ThemeProvider is the foundation of VaneUI's theming system. It wraps your application and provides theme context to all child components, enabling consistent styling and customization throughout your app.

## Basic Setup

### Simple ThemeProvider

The most basic setup requires no configuration - components use their built-in defaults:

```tsx
import { ThemeProvider, Button, Badge, Card } from '@vaneui/ui';

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

### Setting Default Props

Configure default boolean props for all components:

```tsx
import { ThemeProvider, Button, Card } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider themeDefaults={{
      button: {
        primary: true,   // All buttons are primary
        lg: true,        // All buttons are large
        filled: true     // All buttons are filled
      },
      card: {
        rounded: true,   // All cards have rounded corners
        border: true     // All cards have borders
      }
    }}>
      <Button>Primary Large Filled Button</Button>
      <Card>Rounded Card with Border</Card>
    </ThemeProvider>
  );
}
```

## ThemeProvider Props

### themeDefaults

Set default boolean props per component type:

```tsx
<ThemeProvider themeDefaults={{
  button: { primary: true, md: true, filled: true },
  badge: { success: true, sm: true, pill: true },
  card: { secondary: true, rounded: true },
  text: { primary: true }
}}>
  <App />
</ThemeProvider>
```

### extraClasses

Add additional CSS classes based on active props:

```tsx
<ThemeProvider extraClasses={{
  button: {
    primary: 'shadow-lg hover:shadow-xl transition-shadow',
    danger: 'animate-pulse'
  },
  card: {
    filled: 'backdrop-blur-sm'
  }
}}>
  <Button primary>Button with shadow</Button>
  <Button danger>Pulsing danger button</Button>
</ThemeProvider>
```

### themeOverride

Function for programmatic theme modifications:

```tsx
<ThemeProvider themeOverride={(theme) => {
  // Modify base classes
  theme.button.base += ' uppercase tracking-wide';
  
  // Modify default props
  theme.button.defaults = {
    ...theme.button.defaults,
    semibold: true
  };
  
  return theme;
}}>
  <App />
</ThemeProvider>
```

### mergeStrategy

Control how nested ThemeProviders combine (`'merge'` or `'replace'`):

```tsx
<ThemeProvider themeDefaults={{ button: { lg: true } }}>
  {/* mergeStrategy='merge' (default): child merges with parent */}
  <ThemeProvider themeDefaults={{ button: { primary: true } }}>
    <Button>Large Primary (both applied)</Button>
  </ThemeProvider>
  
  {/* mergeStrategy='replace': child replaces parent entirely */}
  <ThemeProvider 
    themeDefaults={{ button: { sm: true } }}
    mergeStrategy="replace"
  >
    <Button>Small Only (parent ignored)</Button>
  </ThemeProvider>
</ThemeProvider>
```

## Nested Theming

Override themes for specific sections of your app:

```tsx
import { ThemeProvider, Button, Badge, Section } from '@vaneui/ui';

function NestedThemeApp() {
  return (
    <ThemeProvider themeDefaults={{
      button: { primary: true, outline: true }
    }}>
      <div>
        <Button>Primary Outline Button</Button>
        
        <Section>
          {/* Override for this section only */}
          <ThemeProvider themeDefaults={{
            button: { success: true, filled: true }
          }}>
            <Button>Success Filled Button</Button>
            <Badge>Inherits parent badge defaults</Badge>
          </ThemeProvider>
        </Section>
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
  
  // Access component themes
  const buttonTheme = theme.button;
  const cardTheme = theme.card;
  
  // Get classes for custom styling
  const classes = buttonTheme.getClasses({ primary: true, lg: true });
  
  return <div className={classes.join(' ')}>Custom component</div>;
}
```

## Custom Colors

VaneUI uses CSS variables for colors. Override them globally or for specific sections:

```css
/* Global color override */
:root {
  --color-text-primary: #8b5cf6;
  --color-bg-primary: #f3e8ff;
  --color-border-primary: #c4b5fd;
}

/* Scoped color override */
.marketing-section {
  --color-text-brand: #6366f1;
  --color-bg-brand: #eef2ff;
}
```

```tsx
function App() {
  return (
    <ThemeProvider>
      <Button primary>Uses CSS variable colors</Button>
      
      <div className="marketing-section">
        <Button brand>Uses scoped brand colors</Button>
      </div>
    </ThemeProvider>
  );
}
```

## Common Patterns

### Brand Theme

Create a consistent brand experience:

```tsx
function BrandedApp() {
  return (
    <ThemeProvider themeDefaults={{
      button: { brand: true, filled: true, rounded: true },
      card: { brand: true, rounded: true },
      badge: { brand: true, pill: true }
    }}>
      <nav>
        <Button>Home</Button>
        <Button>About</Button>
        <Badge>New</Badge>
      </nav>
    </ThemeProvider>
  );
}
```

### Section-Specific Styling

Different themes for different areas:

```tsx
function MultiSectionApp() {
  return (
    <>
      {/* Hero section - large, bold */}
      <ThemeProvider themeDefaults={{
        button: { xl: true, filled: true },
        title: { xl: true }
      }}>
        <HeroSection />
      </ThemeProvider>
      
      {/* Content section - medium, subtle */}
      <ThemeProvider themeDefaults={{
        button: { md: true, outline: true },
        text: { sm: true }
      }}>
        <ContentSection />
      </ThemeProvider>
      
      {/* Footer - compact */}
      <ThemeProvider themeDefaults={{
        button: { xs: true },
        text: { xs: true }
      }}>
        <FooterSection />
      </ThemeProvider>
    </>
  );
}
```

## Advanced Customization

For more detailed information about specific ThemeProvider properties, see these dedicated guides:

- **[Theming Overview](./theming-overview)** - Understand the theme architecture
- **[ThemeDefaults](./theme-defaults)** - Set application-wide default values
- **[ExtraClasses](./extra-classes)** - Add custom CSS classes
- **[CSS Variables](./css-variables)** - Customize colors using CSS custom properties

The ThemeProvider is designed to be flexible and powerful, allowing you to start simple and add complexity as needed.
