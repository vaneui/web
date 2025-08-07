# Core Concepts

VaneUI is built around a simple yet powerful philosophy: **make component usage shorter, clearer, and more intuitive** through boolean props while maintaining complete customizability. This approach creates a perfect balance between developer experience and design flexibility.

## The Boolean Props Philosophy

### Traditional Approach vs VaneUI

Instead of writing verbose prop configurations, VaneUI uses intuitive boolean props that make your code cleaner and more readable:

```tsx
// Traditional approach
<Button variant="filled" color="primary" size="lg" />

// VaneUI approach  
<Button primary lg filled />
```

### Why Boolean Props Matter

**Shorter Code**: Less typing means faster development and cleaner JSX.

**Better Readability**: Props read like natural language describing the component's appearance.

**Faster Development**: Common combinations become muscle memory.

## Available Boolean Props

VaneUI components support a comprehensive set of boolean props organized into logical categories:

### Appearance Colors
```tsx
default | primary | secondary | tertiary | accent | success | danger | warning | info
```

**Example:**
```tsx
<Button primary>Primary Button</Button>
<Badge danger>Error Badge</Badge>
```

### Sizes
```tsx
xs | sm | md | lg | xl
```

**Example:**
```tsx
<Button xs>Extra Small</Button>
<Text lg>Large Text</Text>
```

### Visual Variants
```tsx
filled | outline
```

**Example:**
```tsx
<Button primary filled>Solid Button</Button>
<Badge success outline>Outlined Badge</Badge>
```

### Shapes
```tsx
rounded | pill | sharp
```

**Example:**
```tsx
<Button pill>Pill Button</Button>
<Card sharp>Sharp Card</Card>
```

### Layout & Spacing
```tsx
gap | noGap | padding | noPadding | border | noBorder | shadow | noShadow
```

**Example:**
```tsx
<Stack gap>Spaced Stack</Stack>
<Card shadow>Card with Shadow</Card>
```

### Flexbox Properties
```tsx
row | column | flexWrap | flexNoWrap | justifyCenter | justifyBetween | itemsCenter
```

**Example:**
```tsx
<Stack row justifyBetween>Horizontal Stack</Stack>
<Row itemsCenter>Centered Row</Row>
```

### Typography
```tsx
thin | light | normal | medium | semibold | bold | italic | uppercase | underline
```

**Example:**
```tsx
<Text bold>Bold Text</Text>
<Title lg uppercase>Large Uppercase Title</Title>
```

## Prop Combinations

Boolean props can be combined naturally to create the exact styling you need:

```tsx
<Button primary lg pill shadow>
  Large primary pill button with shadow
</Button>

<Card secondary padding border rounded>
  Secondary card with padding, border and rounded corners
</Card>

<Stack column gap itemsCenter>
  Vertical stack with gap and centered items
</Stack>
```

## Tailwind CSS Integration

### Powered by Tailwind

VaneUI components are built on top of Tailwind CSS, which means:

- **Consistent Design System**: All styling follows Tailwind's design tokens
- **Optimized Bundle Size**: Only used classes are included in your build
- **Familiar Patterns**: If you know Tailwind, you understand VaneUI's styling

### Tailwind Compatibility

VaneUI components work seamlessly with additional Tailwind classes:

```tsx
<Button 
  primary 
  lg 
  className="mt-4 shadow-xl hover:shadow-2xl"
>
  Enhanced Button
</Button>

<Card 
  secondary 
  className="max-w-md mx-auto backdrop-blur-sm"
>
  Styled Card
</Card>
```

## Complete Customizability

### Every Class is Customizable

Behind each boolean prop are carefully crafted CSS classes that you can completely override:

**CSS Custom Properties:**
```css
:root {
  --vui-color-primary: #8b5cf6;  /* Change primary color */
  --vui-radius-md: 1rem;         /* Change border radius */
}
```

**Tailwind Overrides:**
```tsx
<Button 
  primary 
  className="!bg-purple-600 !hover:bg-purple-700"
>
  Custom Primary
</Button>
```

**Theme System:**
```tsx
<ThemeProvider 
  theme={{
    colors: { primary: '#8b5cf6' }
  }}
>
  <Button primary>Themed Button</Button>
</ThemeProvider>
```

## Design System Benefits

### Consistent Naming

All components use the same boolean props for consistent experiences:

```tsx
// Same props work across all components
<Button primary lg />
<Badge primary lg />
<Card primary />
<Text primary lg />
```

### Semantic Colors

Color names have consistent meaning across components:

```tsx
<Button success>Success Action</Button>
<Badge success>Success Status</Badge>
<Text success>Success Message</Text>
```

### Flexible Layout System

Layout components provide powerful flexbox controls:

```tsx
<Row justifyBetween itemsCenter>
  <Text lg bold>Title</Text>
  <Button primary sm>Action</Button>
</Row>
```

## Real-World Example

Here's how VaneUI's boolean props create clean, readable component usage:

```tsx
function UserProfile() {
  return (
    <Card lg shadow padding>
      <Stack gap>
        <Row justifyBetween itemsCenter>
          <Title lg bold>John Doe</Title>
          <Badge success sm>Online</Badge>
        </Row>
        
        <Text secondary>Software Developer</Text>
        
        <Row gap>
          <Button primary sm>Message</Button>
          <Button secondary sm outline>Follow</Button>
        </Row>
      </Stack>
    </Card>
  );
}
```

The boolean props make the code self-documenting - you can immediately understand that this creates a large card with shadow and padding, containing a spaced stack with a title row, secondary text, and action buttons.

## Key Benefits

**Shorter Syntax**: `<Button primary lg />` instead of `<Button color="primary" lg />`

**Natural Language**: Props read like descriptions - "primary large button"

**Faster Development**: Common patterns become muscle memory

**Complete Flexibility**: Every CSS class can be customized or overridden

**Tailwind Integration**: Works seamlessly with additional Tailwind classes

**Consistent API**: Same prop patterns across all components

VaneUI's core philosophy centers on making your code cleaner and your development faster, while maintaining complete control over the visual output through Tailwind CSS and comprehensive customization options.