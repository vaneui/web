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
      <Button secondary>Secondary</Button>
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

All components support `filled` and `outline` variants, including layout components:

```tsx
import { Button, Card, Stack, Container, Row } from '@vaneui/ui';

function FilledOutlineExample() {
  return (
    <Stack lg>
      {/* Buttons */}
      <Row>
        <Button filled primary>Filled Button</Button>
        <Button primary>Outline Button (default)</Button>
      </Row>
      
      {/* Cards */}
      <Row>
        <Card filled success lg>Filled Card</Card>
        <Card outline danger lg>Outline Card</Card>
      </Row>
      
      {/* Layout Components */}
      <Container filled secondary>
        <Stack lg>Filled Container</Stack>
      </Container>
      <Container outline warning>
        <Stack lg>Outline Container</Stack>
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
      <Button rounded>Rounded (default)</Button>
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
    <Stack lg gap>
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
    <Row gap>
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
    <Row tabletCol gap>
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
      <Button primary className="w-full hover:scale-105 transition-transform">
        Full width with hover effect
      </Button>
    </Card>
  );
}
```

User-provided `className` takes precedence over theme classes (via `twMerge`).
