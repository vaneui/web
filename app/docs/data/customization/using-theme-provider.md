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
        main: {
          lg: true,        // larger than built-in sm
          filled: true,    // override built-in outline
        },
      },
      card: {
        main: {
          shadow: true,    // add shadow (not a default)
        },
      },
    }}>
      <Button>Large Filled Button</Button>
      <Card>Card with Shadow</Card>
    </ThemeProvider>
  );
}
```

Most components take props directly. **Components with sub-themes** — `button`, `card`, `checkbox`, `modal`, `menu`, `navLink` — are nested by sub-theme name (`main`, `content`, `input`, `item`, `root`, etc.).

## ThemeProvider Props

### themeDefaults

Set default boolean props per component type:

```tsx
<ThemeProvider themeDefaults={{
  button: { main: { md: true, filled: true } }, // nested under `main`
  badge: { success: true, sm: true },
  card: { main: { secondary: true } },          // nested under `main`
  text: { primary: true },
}}>
  <App />
</ThemeProvider>
```

### extraClasses

Add additional CSS classes based on active props:

```tsx
<ThemeProvider extraClasses={{
  button: {
    main: {
      primary: 'shadow-lg hover:shadow-xl transition-shadow',
      danger: 'animate-pulse',
    },
  },
  card: {
    main: { filled: 'backdrop-blur-sm' },
  },
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
  theme.button.main.base += ' uppercase tracking-wide';

  // Modify default props
  theme.button.main.defaults = {
    ...theme.button.main.defaults,
    bold: true,
  };

  return theme;
}}>
  <App />
</ThemeProvider>
```

### mergeStrategy

Control how nested ThemeProviders combine (`'merge'` or `'replace'`):

```tsx
<ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
  {/* mergeStrategy='merge' (default): child merges with parent */}
  <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
    <Button>Large Filled (both applied)</Button>
  </ThemeProvider>

  {/* mergeStrategy='replace': child resets to defaultTheme + its own defaults */}
  <ThemeProvider
    themeDefaults={{ button: { main: { sm: true } } }}
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
      button: { main: { bold: true } } // bold buttons across the app
    }}>
      <div>
        <Button>Bold Primary Outline Button</Button>

        <Section>
          {/* Override for this section only */}
          <ThemeProvider themeDefaults={{
            button: { main: { success: true, filled: true } }
          }}>
            <Button>Bold Success Filled Button</Button>
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

  // Compound themes are nested by sub-part
  const buttonTheme = theme.button.main;
  const cardTheme = theme.card.main;

  return <div>Custom component</div>;
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
      button: { main: { brand: true, filled: true } },
      card: { main: { brand: true } },
      badge: { brand: true },
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
        button: { main: { xl: true, filled: true } },
        title: { xl: true },
      }}>
        <HeroSection />
      </ThemeProvider>

      {/* Content section - medium */}
      <ThemeProvider themeDefaults={{
        button: { main: { md: true } },
        text: { sm: true },
      }}>
        <ContentSection />
      </ThemeProvider>

      {/* Footer - compact */}
      <ThemeProvider themeDefaults={{
        button: { main: { xs: true } },
        text: { xs: true },
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
