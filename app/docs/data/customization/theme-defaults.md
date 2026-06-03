The `themeDefaults` property in VaneUI's ThemeProvider allows you to set default boolean props for components throughout your application. It establishes consistent defaults while still allowing individual components to override these values.

## Understanding themeDefaults

### themeDefaults?: ThemeDefaults

The `themeDefaults` property accepts an object where keys are component names and values are objects with boolean props. These defaults are merged with VaneUI's built-in defaults.

Most components take props directly. **Components with sub-themes** (`button`, `card`, `checkbox`, `modal`, `menu`, `navLink`) take a nested object keyed by sub-theme name (`main`, `content`, `input`, `item`, `root`, etc.).

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

## Setting component defaults

### Basic defaults

Set default boolean props for specific component types:

```tsx
import { ThemeProvider, Button, Badge, Card } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider themeDefaults={{
      button: {
        main: {
          lg: true,        // All buttons are large (overrides built-in sm)
          filled: true     // All buttons are filled
        }
      },
      badge: {
        success: true,   // All badges are success color
      },
      card: {
        main: {
          secondary: true, // All cards use secondary appearance
        }
      }
    }}>
      {/* Components use these defaults automatically */}
      <Button>Large Filled Button</Button>
      <Badge>Success Badge</Badge>
      <Card>Secondary Card</Card>
    </ThemeProvider>
  );
}
```

### Brand-specific defaults

Create consistent branding across your application:

```tsx
import { ThemeProvider, Button, Card, Badge } from '@vaneui/ui';

function BrandedApp() {
  return (
    <ThemeProvider themeDefaults={{
      button: { main: { brand: true, filled: true } },
      card: { main: { brand: true } },
      badge: { brand: true }
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

## Available boolean props

### Size props
- `xs`, `sm`, `md`, `lg`, `xl`

### Appearance props
- `primary`, `brand`, `accent`, `secondary`, `tertiary`
- `success`, `danger`, `warning`, `info`, `link`, `inherit`

### Variant props
- `filled`, `outline`

### Shape props
- `rounded`, `pill`, `sharp`

### Typography props
- `sans`, `serif`, `mono`, `heading`
- `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`
- `italic`, `underline`, `lineThrough`, `noUnderline`, `uppercase`, `lowercase`, `capitalize`

### Layout props
- `flex`, `inlineFlex`, `block`, `inline`, `grid`, `hidden`
- `row`, `column`, `rowReverse`, `columnReverse`
- `itemsStart`, `itemsCenter`, `itemsEnd`, `itemsStretch`, `itemsBaseline`
- `justifyStart`, `justifyCenter`, `justifyEnd`, `justifyBetween`, `justifyAround`, `justifyEvenly`
- `flexWrap`, `flexNoWrap`
- `gap`, `noGap`, `padding`, `noPadding`
- `border`, `noBorder`, `borderT`, `borderB`, `borderL`, `borderR`, `borderX`, `borderY`
- `ring`, `noRing`, `shadow`, `noShadow`, `transparent`

### Width / height props
- `wFull`, `wFit`, `wAuto`, `wScreen`
- `hFull`, `hFit`, `hAuto`, `hScreen`

### Truncate props
- `truncate`, `lineClamp2`, `lineClamp3`, `lineClamp4`, `lineClamp5`, `noTruncate`

### Letter spacing props
- `trackingTighter`, `trackingTight`, `trackingNormal`, `trackingWide`, `trackingWider`, `trackingWidest`

### Cursor props
- `cursorPointer`, `cursorDefault`, `cursorNotAllowed`, `cursorNone`, `cursorText`, `cursorMove`, `cursorWait`

### Position props
- `relative`, `absolute`, `fixed`, `sticky`, `static`

### Responsive props (layout)
- `mobileCol`, `tabletCol`, `desktopCol`
- `mobileHide`, `tabletHide`, `desktopHide`

### Misc
- `transition`, `noTransition`, `focusVisible`, `noFocusVisible`
- `inheritSize`, `inheritColor`, `inheritBg`, `inheritBorder`
- `responsive`, `horizontal`, `vertical`, `disc`, `decimal`

## Override priority

Understanding how defaults interact with component props:

### Priority order

1. **Component props** (highest priority)
2. **ThemeDefaults from closest ThemeProvider**
3. **ThemeDefaults from parent ThemeProviders**
4. **VaneUI built-in defaults** (lowest priority)

```tsx
function OverrideExample() {
  return (
    <ThemeProvider themeDefaults={{
      button: { main: { lg: true } }
    }}>
      {/* Uses defaults: primary (built-in), lg (from provider) */}
      <Button>Default Button</Button>

      {/* Props override defaults: danger replaces primary; lg still applies */}
      <Button danger>Danger Button</Button>

      {/* Explicit prop overrides default: secondary replaces primary; lg still applies */}
      <Button secondary>Secondary Button</Button>
    </ThemeProvider>
  );
}
```

## Layout component defaults

Configure defaults for layout components:

```tsx
import { ThemeProvider, Container, Section, Card, Stack, Text } from '@vaneui/ui';

function LayoutDefaults() {
  return (
    <ThemeProvider themeDefaults={{
      container: { lg: true },
      section: { secondary: true },
      card: { main: { primary: true } }, // card is nested under `main`
      stack: { lg: true },                // larger gap/padding than default
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

## Dynamic defaults

### Runtime default changes

Update defaults based on user preferences or application state:

```tsx
import { useState } from 'react';
import { ThemeProvider, Button } from '@vaneui/ui';

function DynamicDefaults() {
  const [isCompactMode, setIsCompactMode] = useState(false);

  const themeDefaults = isCompactMode
    ? {
        button: { main: { sm: true } },
        card: { main: { sm: true } },
        text: { sm: true }
      }
    : {
        button: { main: { lg: true } },
        card: { main: { lg: true } },
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

### Contextual defaults

Different defaults for different areas of your app:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function ContextualDefaults() {
  return (
    <>
      {/* Admin area - compact, subtle styling */}
      <ThemeProvider themeDefaults={{
        button: { main: { secondary: true } }
      }}>
        <AdminPanel />
      </ThemeProvider>

      {/* User area - larger, prominent styling */}
      <ThemeProvider themeDefaults={{
        button: { main: { lg: true, filled: true } }
      }}>
        <UserInterface />
      </ThemeProvider>
    </>
  );
}
```

## Section-specific styling

Different themes for different page sections:

```tsx
import { ThemeProvider } from '@vaneui/ui';

function MultiSectionApp() {
  return (
    <>
      {/* Hero section - large, bold */}
      <ThemeProvider themeDefaults={{
        button: { main: { xl: true, filled: true } },
        title: { xl: true }
      }}>
        <HeroSection />
      </ThemeProvider>

      {/* Content section - medium */}
      <ThemeProvider themeDefaults={{
        button: { main: { md: true } },
        text: { sm: true }
      }}>
        <ContentSection />
      </ThemeProvider>

      {/* Footer - compact */}
      <ThemeProvider themeDefaults={{
        button: { main: { xs: true } },
        text: { xs: true }
      }}>
        <FooterSection />
      </ThemeProvider>
    </>
  );
}
```

## Patterns that keep themeDefaults predictable

### Know VaneUI's built-in defaults

VaneUI components come with sensible built-in defaults. Only set defaults that differ from these:

**Built-in defaults you don't need to specify** (cite the component's `{component}Defaults.ts` file as the source of truth when in doubt). Components that tag-switch to `<a>` via `href` (Badge, Card, Chip, Code, Row, Col, Stack) also get `focusVisible: true` auto-injected when `href` is set. Opt out per-instance with `noFocusVisible`.

- **Button**: `sm`, `primary`, `outline`, `rounded`, `semibold`, `padding`, `gap`, `ring`, `focusVisible`, `cursorPointer`, `transition` (note: defaults to `sm`, not `md`; no `shadow`)
- **Card**: `md`, `primary`, `outline`, `rounded`, `border`, `padding`, `gap`, `flex`, `column`
- **Row**: `md`, `row`, `flex`, `itemsCenter`, `gap`, `noPadding`, `noBorder`, `noRing`, `outline`, `sharp`
- **Col**: `md`, `column`, `flex`, `gap`, `noPadding`, `noBorder`, `noRing`, `outline`, `sharp`
- **Stack**: `md`, `flex`, `column`, `flexWrap`, `gap`, `padding`, `noBorder`, `noRing`, `outline`, `sharp`
- **Section**: `md`, `wFull`, `flex`, `column`, `itemsStart`, `gap`, `padding`, `noBorder`, `noRing`, `noShadow`, `outline`, `sharp`, `responsive`
- **Container**: `md`, `wFull`, `flex`, `column`, `itemsCenter`, `gap`, `noPadding`, `outline`, `sharp`
- **Input**: `md`, `wFull`, `primary`, `outline`, `rounded`, `padding`, `ring`, `focusVisible`
- **Label**: `sm`, `flex`, `itemsCenter`, `gap`, `inherit` (not `primary`), `medium` (`itemsCenter` vertically centers the label text next to a nested `Input` or `Checkbox`)
- **Badge**: `md`, `primary`, `outline`, `pill`, `semibold`, `uppercase`
- **Chip**: `md`, `secondary` (not `primary`), `outline`, `rounded`, `mono`
- **Link**: `md`, `link` (not `primary`), `underline`, `sans`, `cursorPointer`, `inheritSize`, `wFit`, `focusVisible` (no variant default, no `outline`)
- **NavLink**: `sm`, `primary`, `outline`, `rounded`, `wFull`, `textLeft`, `focusVisible`
- **MenuItem**: `sm`, `primary`, `outline`, `rounded`, `wFull`, `textLeft`, `focusVisible`
- **Typography** (`Text`, `Title`, `SectionTitle`, `PageTitle`, `Blockquote`): `md`, `inherit` (not `primary`), `outline`
- **Icon**: `md`, `inlineFlex`, `itemsCenter`, `justifyCenter`, `outline`, `rounded`, `noPadding`, `noBorder`, `noRing`, `noShadow`, `noShrink`, `noTransition`, `wFit`
- **Modal** content: `md`, `wFull`, `flex`, `column`, `rounded`, `shadow`, `primary`, `outline`
- **Popup**: `md`, `flex`, `column`, `padding`, `gap`, `rounded`, `shadow`, `border`, `primary`, `outline`

```tsx
// Unnecessary - these are already the defaults
<ThemeProvider themeDefaults={{
  stack: { gap: true },                 // gap is already true
  button: { main: { primary: true } },  // primary is already true
  card: { main: { rounded: true } },    // rounded is already true
}}>

// Better - only specify what you're changing
<ThemeProvider themeDefaults={{
  button: { main: { filled: true } },   // change from outline to filled
  card: { main: { lg: true } },         // change from md to lg
}}>
```

### Consistent defaults

Establish defaults that align with your design system:

```tsx
import { ThemeProvider, type ThemeDefaults } from '@vaneui/ui';

const designSystemDefaults: ThemeDefaults = {
  // Interactive elements
  button: { main: { md: true, filled: true } }, // change sm→md, outline→filled
  link: { brand: true },

  // Informational elements
  badge: { secondary: true, sm: true },

  // Layout elements
  card: { main: { shadow: true } }, // add shadow (not default)
  section: { lg: true }             // larger spacing
};

<ThemeProvider themeDefaults={designSystemDefaults}>
  <App />
</ThemeProvider>
```

### Logical groupings

Group related defaults together for maintainability:

```tsx
import { ThemeProvider, type ThemeDefaults } from '@vaneui/ui';

const interactiveDefaults: ThemeDefaults = {
  button: { main: { filled: true } },
  link: { brand: true }
};

const informationalDefaults: ThemeDefaults = {
  badge: { secondary: true, sm: true },
};

const layoutDefaults: ThemeDefaults = {
  card: { main: { shadow: true } },
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

`themeDefaults` establishes consistent default values across the application while allowing per-instance overrides on individual components.
