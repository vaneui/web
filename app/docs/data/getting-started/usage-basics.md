Learn the fundamental patterns for using VaneUI components.

## Component Props

VaneUI components use boolean props for styling. Most components support size, appearance, and layout props.

### Size Props

Components support five sizes:

```tsx
import { Button, Stack } from '@vaneui/ui';

function SizeExample() {
  return (
    <Stack>
      <Button xs>Extra Small</Button>
      <Button sm>Small</Button>
      <Button md>Medium (default)</Button>
      <Button lg>Large</Button>
      <Button xl>Extra Large</Button>
    </Stack>
  );
}
```

### Appearance Props

Control visual appearance with semantic props:

```tsx
import { Button, Row } from '@vaneui/ui';

function AppearanceExample() {
  return (
    <Row>
      <Button primary>Primary</Button>
      <Button brand>Brand</Button>
      <Button accent>Accent</Button>
      <Button secondary>Secondary</Button>
      <Button tertiary>Tertiary</Button>
      <Button success>Success</Button>
      <Button danger>Danger</Button>
      <Button warning>Warning</Button>
      <Button info>Info</Button>
      <Button link>Link</Button>
    </Row>
  );
}
```

### Filled and Outline Variants

All components support `filled` and `outline` variants. `outline` is the default for most components:

```tsx
import { Button, Card, Stack, Container, Row } from '@vaneui/ui';

function FilledOutlineExample() {
  return (
    <Stack lg>
      {/* Buttons */}
      <Row>
        <Button filled>Filled Button</Button>
        <Button>Outline Button (default)</Button>
      </Row>

      {/* Cards */}
      <Row>
        <Card filled success lg>Filled Card</Card>
        <Card danger lg>Outline Card (default)</Card>
      </Row>

      {/* Layout Components */}
      <Container filled secondary>
        <Stack lg>Filled Container</Stack>
      </Container>
      <Container warning>
        <Stack lg>Outline Container (default)</Stack>
      </Container>
    </Stack>
  );
}
```

### Shape Props

Control border radius:

```tsx
import { Button, Row } from '@vaneui/ui';

function ShapeExample() {
  return (
    <Row>
      <Button sharp>Sharp (no radius)</Button>
      <Button>Rounded (default)</Button>
      <Button pill>Pill (fully rounded)</Button>
    </Row>
  );
}
```

## Layout Components

### Stack

Arrange children vertically with consistent spacing:

```tsx
import { Stack, Text } from '@vaneui/ui';

function StackExample() {
  return (
    <Stack lg>
      <Text>Item 1</Text>
      <Text>Item 2</Text>
      <Text>Item 3</Text>
    </Stack>
  );
}
```

### Row and Col

Create flexible layouts:

```tsx
import { Row, Col, Card } from '@vaneui/ui';

function GridExample() {
  return (
    <Row>
      <Col>
        <Card>Column 1</Card>
      </Col>
      <Col>
        <Card>Column 2</Card>
      </Col>
    </Row>
  );
}
```

### Responsive Breakpoints

Use breakpoint props to change layout on different screen sizes:

```tsx
import { Row, Card } from '@vaneui/ui';

function ResponsiveLayout() {
  return (
    // Row on desktop, column on tablet and below
    <Row tabletCol>
      <Card>Left</Card>
      <Card>Right</Card>
    </Row>
  );
}
```

Available breakpoint props:
- `mobileCol` - Column on mobile and below (max-width: 48rem)
- `tabletCol` - Column on tablet and below (max-width: 64rem)
- `desktopCol` - Column on desktop and below (max-width: 80rem)

## Typography

VaneUI provides typography components with consistent hierarchy:

```tsx
import { PageTitle, SectionTitle, Title, Text, Stack } from '@vaneui/ui';

function TypographyExample() {
  return (
    <Stack>
      <PageTitle>Page Title (h1)</PageTitle>
      <SectionTitle>Section Title (h2)</SectionTitle>
      <Title>Title (h3)</Title>
      <Text>Body text (p)</Text>
    </Stack>
  );
}
```

### Automatic Responsive Typography

Typography components (`PageTitle`, `SectionTitle`, `Title`) and layout components (`Section`) automatically scale across breakpoints - no props needed:

```tsx
import { PageTitle, SectionTitle, Title, Section } from '@vaneui/ui';

function ResponsiveTypography() {
  return (
    <Section>
      {/* Font size automatically reduces on smaller screens */}
      <PageTitle>Welcome to My App</PageTitle>
      <SectionTitle>Section Heading</SectionTitle>
      <Title>Content Title</Title>
    </Section>
  );
}
```

- `PageTitle` scales: e.g., 24 units on desktop → 21 on tablet → 18 on mobile
- `SectionTitle` scales: e.g., 18 units on desktop → 16 on tablet → 14 on mobile
- `Title` scales: e.g., 12 units on desktop → 11 on tablet → 10 on mobile
- `Section` padding/gap scales automatically across breakpoints

### Typography Color Inheritance

List items inherit appearance from their parent List component via CSS variables:

```tsx
import { List, ListItem, Stack } from '@vaneui/ui';

function ListInheritance() {
  return (
    <Stack lg>
      <List success>
        <ListItem>Inherits success color</ListItem>
        <ListItem>Also inherits success color</ListItem>
      </List>
      
      <List danger>
        <ListItem>Inherits danger color</ListItem>
        <ListItem>Also inherits danger color</ListItem>
      </List>
    </Stack>
  );
}
```

## Responsive Visibility

Hide components on specific breakpoints:

```tsx
import { Text, Stack } from '@vaneui/ui';

function ResponsiveVisibility() {
  return (
    <Stack>
      <Text>Always visible</Text>
      <Text mobileHide>Hidden on mobile (48rem and below)</Text>
      <Text tabletHide>Hidden on tablet (64rem and below)</Text>
      <Text desktopHide>Hidden on desktop (80rem and below)</Text>
    </Stack>
  );
}
```

## Custom HTML Tags

Use the `tag` prop to render different HTML elements:

```tsx
import { Text, Button } from '@vaneui/ui';

function TagExample() {
  return (
    <div>
      <Text tag="h1">Heading rendered as h1</Text>
      <Text tag="span">Text rendered as span</Text>
      <Button tag="a" href="/link">Button rendered as anchor</Button>
    </div>
  );
}
```

## Combining with Custom Classes

Add custom Tailwind classes via `className`:

```tsx
import { Button, Card } from '@vaneui/ui';

function CustomStyling() {
  return (
    <Card className="shadow-2xl">
      <Button className="w-full hover:scale-105 transition-transform">
        Full width with hover effect
      </Button>
    </Card>
  );
}
```

User-provided `className` takes precedence over theme classes (via `twMerge`).

## Prefer Props Over Tailwind Classes

VaneUI provides boolean props for most common styling needs. Use these instead of Tailwind classes to ensure consistent theming and proper integration with the size system.

### Common Props vs Tailwind Classes

| Instead of Tailwind | Use VaneUI prop |
|---------------------|-----------------|
| `className="uppercase"` | `uppercase` |
| `className="font-bold"` | `bold` |
| `className="font-semibold"` | `semibold` |
| `className="font-mono"` | `mono` |
| `className="italic"` | `italic` |
| `className="text-center"` | `textCenter` |
| `className="sticky"` | `sticky` |
| `className="items-center"` | `itemsCenter` |
| `className="justify-between"` | `justifyBetween` |
| `className="border-b"` | `borderB` |
| `className="rounded-full"` | `pill` |
| `className="shadow"` | `shadow` |

```tsx
// Good: Using VaneUI props
<Text uppercase semibold>IMPORTANT</Text>
<Card borderB>Card with bottom border</Card>
<Row itemsCenter justifyBetween>Spaced content</Row>

// Avoid: Tailwind classes that duplicate props
<Text className="uppercase font-semibold">IMPORTANT</Text>
<Card className="border-b">Card with bottom border</Card>
<Row className="items-center justify-between">Spaced content</Row>
```

### Gap is Controlled by Size Props

Don't use Tailwind gap classes. Gap is controlled by the size prop system (`xs`, `sm`, `md`, `lg`, `xl`) and is enabled by default on layout components.

```tsx
// Good: Size prop controls gap
<Row lg>Large gap between items</Row>
<Stack sm>Small gap between items</Stack>
<Col>Default gap (md)</Col>

// Avoid: Tailwind gap classes
<Row className="gap-10">Don't override gap this way</Row>
```

### Background Colors via Appearance Props

Background colors are controlled by appearance + variant props. Only use `bg-*` classes for edge cases not covered by the theme (like gradients).

```tsx
// Good: Appearance controls color
<Card primary filled>Primary background</Card>
<Button success filled>Success button</Button>

// Avoid: Tailwind bg classes when appearance works
<Card className="bg-blue-500">Don't fight the theme</Card>

// OK: Tailwind for custom colors not in theme
<div className="bg-gradient-to-r from-purple-500 to-pink-500">
  Custom gradient
</div>
```

### Typography Styling is Built-in

Typography components have built-in letter spacing, line height, and other typographic properties. Avoid overriding these with Tailwind classes.

```tsx
// Good: Built-in typography styling
<Badge uppercase>STATUS</Badge>
<Title>Properly styled heading</Title>

// Avoid: Manual typography overrides
<Badge className="tracking-wider">STATUS</Badge>
<Title className="leading-tight">Overridden heading</Title>
```
