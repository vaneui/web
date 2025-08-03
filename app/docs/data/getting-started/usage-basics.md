Learn the fundamental patterns and concepts for using VaneUI components effectively in your React applications.

## Component Props System

VaneUI components use a consistent prop system based on design tokens and utility classes. Most components accept size, appearance, and layout props.

### Size Props

All components support standardized size props:

```tsx
import { Button, Text, Stack } from '@vaneui/ui';

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

Control visual appearance with semantic color props:

```tsx
import { Button, Badge, Row } from '@vaneui/ui';

function AppearanceExample() {
  return (
    <Row>
      <Button default>Default</Button>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Button success>Success</Button>
      <Button danger>Danger</Button>
      <Button warning>Warning</Button>
    </Row>
  );
}
```

## Layout Components

VaneUI provides flexible layout components for structuring your UI.

### Container and Stack

Use Container for page-level layout and Stack for content organization:

```tsx
import { Container, Stack, Title, Text } from '@vaneui/ui';

function LayoutExample() {
  return (
    <Container>
      <Stack lg>
        <Title>Page Title</Title>
        <Text>Page content goes here</Text>
        <Stack sm row>
          <Button primary>Action</Button>
          <Button secondary>Cancel</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
```

### Grid Layouts

Create responsive grids with Row and Col:

```tsx
import { Row, Col, Card, Text } from '@vaneui/ui';

function GridExample() {
  return (
    <Row>
      <Col>
        <Card>
          <Text>Column 1</Text>
        </Card>
      </Col>
      <Col>
        <Card>
          <Text>Column 2</Text>
        </Card>
      </Col>
      <Col>
        <Card>
          <Text>Column 3</Text>
        </Card>
      </Col>
    </Row>
  );
}
```

## Responsive Design

VaneUI components include responsive props for different screen sizes.

### Responsive Visibility

Hide components on specific screen sizes:

```tsx
import { Text, Stack } from '@vaneui/ui';

function ResponsiveExample() {
  return (
    <Stack>
      <Text>Always visible</Text>
      <Text smHide>Hidden on small screens</Text>
      <Text mdHide>Hidden on medium screens</Text>
      <Text lgHide>Hidden on large screens</Text>
    </Stack>
  );
}
```

### Responsive Layouts

Adapt layouts for different screen sizes:

```tsx
import { Stack, Row, Card } from '@vaneui/ui';

function ResponsiveLayout() {
  return (
    <Stack lgRow>
      <Card>Mobile: stacked, Desktop: side by side</Card>
      <Card>Second card</Card>
    </Stack>
  );
}
```

## Typography Hierarchy

Establish clear visual hierarchy with typography components:

```tsx
import { PageTitle, SectionTitle, Title, Text } from '@vaneui/ui';

function TypographyExample() {
  return (
    <Stack>
      <PageTitle>Page Title</PageTitle>
      <Text secondary>Page description</Text>
      
      <SectionTitle>Section Title</SectionTitle>
      <Text>Section content</Text>
      
      <Title>Subsection Title</Title>
      <Text>Subsection content</Text>
    </Stack>
  );
}
```

## Interactive Components

Handle user interactions with event handlers:

```tsx
import { Button, Stack } from '@vaneui/ui';
import { useState } from 'react';

function InteractiveExample() {
  const [count, setCount] = useState(0);
  
  return (
    <Stack>
      <Text>Count: {count}</Text>
      <Stack row>
        <Button onClick={() => setCount(count + 1)} primary>
          Increment
        </Button>
        <Button onClick={() => setCount(count - 1)} secondary>
          Decrement
        </Button>
        <Button onClick={() => setCount(0)} danger>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
```

## Accessibility

VaneUI components include built-in accessibility features:

### Semantic HTML

Components render appropriate HTML elements:

```tsx
import { Button, Link, Text } from '@vaneui/ui';

function SemanticExample() {
  return (
    <Stack>
      {/* Renders as <button> */}
      <Button onClick={handleClick}>Button</Button>
      
      {/* Renders as <a> */}
      <Link href="/about">Link</Link>
      
      {/* Renders as <p> by default */}
      <Text>Paragraph text</Text>
      
      {/* Custom semantic element */}
      <Text tag="span">Span text</Text>
    </Stack>
  );
}
```

### ARIA Labels

Add accessibility labels when needed:

```tsx
import { Button } from '@vaneui/ui';
import { Search } from 'react-feather';

function AccessibilityExample() {
  return (
    <Button aria-label="Search products">
      <Search />
    </Button>
  );
}
```

## Best Practices

### Component Composition

Combine components to create complex UI patterns:

```tsx
import { Card, Stack, Title, Text, Button, Row } from '@vaneui/ui';

function ProductCard({ product }) {
  return (
    <Card>
      <Stack>
        <Title>{product.name}</Title>
        <Text secondary>{product.description}</Text>
        <Text lg semibold>${product.price}</Text>
        <Row>
          <Button primary>Add to Cart</Button>
          <Button secondary>View Details</Button>
        </Row>
      </Stack>
    </Card>
  );
}
```

### Consistent Spacing

Use Stack components for consistent spacing:

```tsx
// ✅ Good - Consistent spacing
<Stack lg>
  <Component1 />
  <Component2 />
  <Component3 />
</Stack>

// ❌ Avoid - Manual spacing
<div>
  <Component1 style={{ marginBottom: '1rem' }} />
  <Component2 style={{ marginBottom: '2rem' }} />
  <Component3 />
</div>
```

### Performance Optimization

Import only what you need for better tree shaking:

```tsx
// ✅ Good - Tree shakeable
import { Button, Stack } from '@vaneui/ui';

// ❌ Avoid - Imports everything
import * as VaneUI from '@vaneui/ui';
```

## Next Steps

- **Theming Overview**: Learn about VaneUI's theming system
- **Using ThemeProvider**: Configure custom themes
- **Component Examples**: Explore individual component documentation