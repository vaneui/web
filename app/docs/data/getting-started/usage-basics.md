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
      <Button md>Medium</Button>
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

### Filled and Outline Variants

All components now support `filled` and `outline` variants, including layout components:

```tsx
import { Button, Card, Stack, Container, Row } from '@vaneui/ui';

function FilledOutlineExample() {
  return (
    <Stack lg>
      {/* Buttons */}
      <Row>
        <Button filled primary>Filled Button</Button>
        <Button primary>Outline Button</Button>
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
import { Button, Card, Row } from '@vaneui/ui';

function ShapeExample() {
  return (
    <Row>
      <Button sharp>Sharp</Button>
      <Button>Rounded (default)</Button>
      <Button pill>Pill</Button>
    </Row>
  );
}
```

## Layout Components

### Stack

Arrange children with consistent spacing:

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

## Typography

VaneUI provides typography components with consistent hierarchy:

```tsx
import { PageTitle, SectionTitle, Title, Text } from '@vaneui/ui';

function TypographyExample() {
  return (
    <Stack>
      <PageTitle>Page Title</PageTitle>
      <SectionTitle>Section Title</SectionTitle>
      <Title>Subsection Title</Title>
      <Text>Body text</Text>
    </Stack>
  );
}
```

### Typography Color Inheritance

Typography components with appearance props inherit colors from their parent components:

```tsx
import { Card, Container, Text, Title, Stack } from '@vaneui/ui';

function ColorInheritanceExample() {
  return (
    <Stack lg>
      {/* Typography inherits from Card appearance */}
      <Card filled primary lg>
        <Title primary>This title inherits primary color</Title>
        <Text primary>This text inherits primary color from the card</Text>
      </Card>
      
      {/* Typography inherits from Container appearance */}
      <Container filled success>
        <Title success>Success colored title</Title>
        <Text success>Success colored text</Text>
      </Container>
      
      {/* Independent typography colors */}
      <Stack>
        <Title danger>Independent danger title</Title>
        <Text secondary>Independent secondary text</Text>
      </Stack>
    </Stack>
  );
}
```

## Responsive Props

Hide components on specific breakpoints:

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

## Custom HTML Tags

Use the `tag` prop to render different HTML elements:

```tsx
import { Text, Button } from '@vaneui/ui';

function TagExample() {
  return (
    <div>
      <Text tag="h1">Heading</Text>
      <Text tag="span">Span text</Text>
      <Button tag="a" href="/link">Link Button</Button>
    </div>
  );
}
```