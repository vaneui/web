The `themeDefaults` property in VaneUI's ThemeProvider allows you to set default boolean props for components throughout your application. This provides a powerful way to establish consistent defaults while still allowing individual components to override these values.

## Understanding ThemeDefaults

### themeDefaults?: ThemeDefaults

The `themeDefaults` property accepts an object where keys are component names and values are objects with boolean props. These defaults are merged with VaneUI's built-in defaults.

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

## Setting Component Defaults

### Basic Defaults

Set default boolean props for specific component types:

```tsx
import { ThemeProvider, Button, Badge, Card } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider themeDefaults={{
      button: {
        primary: true,   // All buttons are primary
        lg: true,        // All buttons are large
        filled: true     // All buttons are filled
      },
      badge: {
        success: true,   // All badges are success color
        pill: true       // All badges are pill-shaped
      },
      card: {
        rounded: true,   // All cards have rounded corners
        border: true     // All cards have borders
      }
    }}>
      {/* Components use these defaults automatically */}
      <Button>Primary Large Filled Button</Button>
      <Badge>Success Pill Badge</Badge>
      <Card>Rounded Card with Border</Card>
    </ThemeProvider>
  );
}
```

### Brand-Specific Defaults

Create consistent branding across your application:

```tsx
import { ThemeProvider, Button, Card, Badge } from '@vaneui/ui';

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

## Available Boolean Props

### Size Props
- `xs`, `sm`, `md`, `lg`, `xl`

### Appearance Props
- `primary`, `brand`, `secondary`, `tertiary`, `accent`
- `success`, `danger`, `warning`, `info`, `link`

### Variant Props
- `filled`, `outline`

### Shape Props
- `rounded`, `pill`, `sharp`

### Typography Props
- `sans`, `serif`, `mono`, `semibold`, `bold`

### Layout Props
- `flex`, `column`, `itemsCenter`, `justifyBetween`, `gap`

## Override Priority

Understanding how defaults interact with component props:

### Priority Order

1. **Component props** (highest priority)
2. **ThemeDefaults from closest ThemeProvider**
3. **ThemeDefaults from parent ThemeProviders**
4. **VaneUI built-in defaults** (lowest priority)

```tsx
function OverrideExample() {
  return (
    <ThemeProvider themeDefaults={{
      button: { primary: true, lg: true }
    }}>
      {/* Uses defaults: primary=true, lg=true */}
      <Button>Default Button</Button>

      {/* Props override defaults: danger=true overrides primary, lg still applies */}
      <Button danger>Danger Button</Button>

      {/* Explicitly disable default: primary=false, lg still applies */}
      <Button primary={false} secondary>Secondary Button</Button>
    </ThemeProvider>
  );
}
```

## Layout Component Defaults

Configure defaults for layout components:

```tsx
import { ThemeProvider, Container, Section, Card, Stack, Text } from '@vaneui/ui';

function LayoutDefaults() {
  return (
    <ThemeProvider themeDefaults={{
      container: {
        lg: true
      },
      section: {
        secondary: true,
        rounded: true
      },
      card: {
        primary: true,
        rounded: true
      },
      stack: {
        lg: true  // larger gap than default
      }
    }}>
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

## Dynamic Defaults

### Runtime Default Changes

Update defaults based on user preferences or application state:

```tsx
import { useState } from 'react';
import { ThemeProvider, Button } from '@vaneui/ui';

function DynamicDefaults() {
  const [isCompactMode, setIsCompactMode] = useState(false);

  const themeDefaults = isCompactMode
    ? {
        button: { sm: true },
        card: { sm: true },
        text: { sm: true }
      }
    : {
        button: { lg: true },
        card: { lg: true },
        text: { md: true }
      };

  return (
    <ThemeProvider themeDefaults={themeDefaults}>
      <Button onClick={() => setIsCompactMode(!isCompactMode)}>
        Toggle Compact Mode
      </Button>
    </ThemeProvider>
  );
}
```

### Contextual Defaults

Different defaults for different areas of your app:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function ContextualDefaults() {
  return (
    <>
      {/* Admin area - compact, subtle styling */}
      <ThemeProvider themeDefaults={{
        button: { sm: true, outline: true, secondary: true }
      }}>
        <AdminPanel />
      </ThemeProvider>

      {/* User area - larger, prominent styling */}
      <ThemeProvider themeDefaults={{
        button: { lg: true, filled: true, primary: true }
      }}>
        <UserInterface />
      </ThemeProvider>
    </>
  );
}
```

## Section-Specific Styling

Different themes for different page sections:

```tsx
import { ThemeProvider } from '@vaneui/ui';

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

## Best Practices

### Know VaneUI's Built-in Defaults

VaneUI components come with sensible built-in defaults. Only set defaults that differ from these:

**Built-in defaults you don't need to specify:**
- **Layout components** (`Row`, `Col`, `Stack`, `Card`, `Section`, `Container`): `gap: true`, `md: true`, `outline: true`
- **Button**: `primary: true`, `outline: true`, `rounded: true`
- **Card**: `primary: true`, `outline: true`, `rounded: true`, `padding: true`
- **Input**: `primary: true`, `outline: true`, `rounded: true`
- **Badge**: `primary: true`, `outline: true`, `pill: true`
- **Typography** (`Text`, `Title`): `primary: true`, `md: true`

```tsx
// Unnecessary - these are already the defaults
<ThemeProvider themeDefaults={{
  stack: { gap: true },       // gap is already true
  button: { primary: true },  // primary is already true
  card: { rounded: true }     // rounded is already true
}}>

// Better - only specify what you're changing
<ThemeProvider themeDefaults={{
  button: { filled: true },   // change from outline to filled
  card: { lg: true }          // change from md to lg
}}>
```

### Consistent Defaults

Establish defaults that align with your design system:

```tsx
import { ThemeProvider } from '@vaneui/ui';

const designSystemDefaults = {
  // Interactive elements
  button: { primary: true, md: true, filled: true },
  link: { brand: true },

  // Informational elements
  badge: { secondary: true, sm: true },
  chip: { outline: true },

  // Layout elements
  card: { shadow: true },  // add shadow (not default)
  section: { lg: true }    // larger spacing
};

<ThemeProvider themeDefaults={designSystemDefaults}>
  <App />
</ThemeProvider>
```

### Logical Groupings

Group related defaults together for maintainability:

```tsx
import { ThemeProvider } from '@vaneui/ui';

const interactiveDefaults = {
  button: { primary: true, filled: true },
  link: { brand: true }
};

const informationalDefaults = {
  badge: { secondary: true, sm: true },
  chip: { outline: true }
};

const layoutDefaults = {
  card: { shadow: true },
  stack: { lg: true }
};

<ThemeProvider themeDefaults={{
  ...interactiveDefaults,
  ...informationalDefaults,
  ...layoutDefaults
}}>
  <App />
</ThemeProvider>
```

The `themeDefaults` property provides a robust system for establishing consistent default values throughout your VaneUI application, enabling global consistency while maintaining the flexibility to override defaults when needed.
