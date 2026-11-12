VaneUI components share a boolean props API for size, appearance, variant, and layout. This page covers the core usage patterns: size and appearance props, layout components, responsive breakpoints, typography, icons, images, overlays, and when to prefer props over Tailwind classes.

## Component props

VaneUI components use boolean props for styling. Most components support size, appearance, and layout props.

The examples on this page show the JSX only. Every component in them is a named export of `@vaneui/ui`, for example `import { Button } from '@vaneui/ui'`.

### Size props

Components support five sizes:

```tsx demo
<Stack>
  <Button xs>Extra Small</Button>
  <Button sm>Small (Button default)</Button>
  <Button md>Medium</Button>
  <Button lg>Large</Button>
  <Button xl>Extra Large</Button>
</Stack>
```

> Most components default to `md`. Button, IconButton, NavLink, MenuItem, MenuLabel, Label, and Tooltip default to `sm`.

### Appearance props

Control visual appearance with semantic props:

```tsx demo
<Row flexWrap>
  <Button primary>Primary</Button>
  <Button accent>Accent</Button>
  <Button secondary>Secondary</Button>
  <Button tertiary>Tertiary</Button>
  <Button success>Success</Button>
  <Button danger>Danger</Button>
  <Button warning>Warning</Button>
  <Button info>Info</Button>
</Row>
```

### Filled and outline variants

All components support `filled`, `outline`, and `ghost` variants. `outline` is the default for most components. `ghost` renders a transparent background with no border and appearance-colored text, plus a tinted hover background:

```tsx demo
<Stack lg>
  {/* Buttons */}
  <Row flexWrap>
    <Button filled>Filled Button</Button>
    <Button>Outline Button (default)</Button>
    <Button ghost>Ghost Button</Button>
  </Row>

  {/* Cards */}
  <Row flexWrap>
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
```

### Shape props

Control border radius:

```tsx demo
<Row flexWrap>
  <Button sharp>Sharp (no radius)</Button>
  <Button>Rounded (default)</Button>
  <Button pill>Pill (fully rounded)</Button>
</Row>
```

## Layout components

### Stack

Arrange children vertically with consistent spacing:

```tsx demo
<Stack lg>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Stack>
```

### Row and Col

Compose layouts:

```tsx demo
<Row>
  <Col>
    <Card>Column 1</Card>
  </Col>
  <Col>
    <Card>Column 2</Card>
  </Col>
</Row>
```

### Responsive breakpoints

Use breakpoint props to change layout on different screen sizes:

```tsx demo
<Row tabletStack>
  {/* Row on desktop, column on tablet and below */}
  <Card>Left</Card>
  <Card>Right</Card>
</Row>
```

Available breakpoint props:
- `mobileStack`: Column on mobile and below (below 48rem)
- `tabletStack`: Column on tablet and below (below 64rem)
- `desktopStack`: Column on desktop and below (below 80rem)

## Typography

VaneUI provides typography components with consistent hierarchy:

```tsx demo
<Stack>
  <PageTitle>Page Title (h1)</PageTitle>
  <SectionTitle>Section Title (h2)</SectionTitle>
  <Title>Title (h3)</Title>
  <Text>Body text (p)</Text>
</Stack>
```

### Automatic responsive typography

Typography components (`PageTitle`, `SectionTitle`, `Title`) and layout components (`Section`) automatically scale across breakpoints: no props needed:

```tsx demo
<Section>
  {/* Font size automatically reduces on smaller screens */}
  <PageTitle>Welcome to My App</PageTitle>
  <SectionTitle>Section Heading</SectionTitle>
  <Title>Content Title</Title>
</Section>
```

- `PageTitle` scales: e.g., 24 units on desktop, 21 on tablet, 18 on mobile
- `SectionTitle` scales: e.g., 18 units on desktop, 16 on tablet, 14 on mobile
- `Title` scales: e.g., 12 units on desktop, 11 on tablet, 10 on mobile
- `Section` padding/gap scales automatically across breakpoints

### Typography color inheritance

List items inherit appearance from their parent List component via CSS variables:

```tsx demo
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
```

## Images

Display images with VaneUI styling using the [Img](/docs/layout-components/img) component:

```tsx hide
<Row>
  <Img src="/photo.jpg" alt="Photo" rounded border shadow />
  <Img src="/avatar.jpg" alt="Avatar" pill />
  <Img src="/banner.jpg" alt="Banner" sharp objectCover />
</Row>
```

`Img` supports shape props (`rounded`, `pill`, `sharp`), `border`, `shadow`, size props, and object-fit props (`objectCover`, `objectContain`, `objectFill`).

## Icons

Wrap any SVG with the [Icon](/docs/basic-components/icon) component to inherit the parent's font color and scale with the size system. The icons in these examples (`Star`, `AlertCircle`, `Heart`, `Check`) are SVG components from the `react-feather` package:

```tsx demo
<Row>
  <Icon sm><Star /></Icon>
  <Icon><Star /></Icon>
  <Icon lg success><Star /></Icon>
  <Text danger><Icon><AlertCircle /></Icon> Inline with text</Text>
</Row>
```

### Icon container mode

By default `Icon` renders as a bare glyph that inherits color from its parent. Adding any of `padding`, `border`, `insetRing`, `shadow`, or `filled` switches it into *container mode*: the icon gains a sized box that shape props (`rounded`, `pill`, `sharp`) can act on:

```tsx demo
<Row>
  <Icon padding pill primary filled><Heart /></Icon>
  <Icon padding pill success border><Check /></Icon>
  <Icon padding danger filled insetRing><AlertCircle /></Icon>
</Row>
```

Padding and radius scale with the size prop, so the same composition works across `xs` through `xl`.

## Overlays and modals

Use `Modal` for dialogs that require user attention. Modals include focus trapping, scroll lock, and ARIA attributes by default. Modal provides sub-components for structured layout: `ModalHeader`, `ModalBody`, `ModalFooter`, and `ModalCloseButton`.

```tsx demo
const [open, setOpen] = useState(false);

return (
  <>
    <Button onClick={() => setOpen(true)}>Open Modal</Button>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalHeader>
        <Text fontBold>Dialog Title</Text>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody>
        <Text>Dialog content goes here.</Text>
      </ModalBody>
      <ModalFooter>
        <Button primary filled onClick={() => setOpen(false)}>Close</Button>
      </ModalFooter>
    </Modal>
  </>
);
```

### PopupTrigger

Use `PopupTrigger` as a convenience wrapper that manages open/close state for `Popup` automatically. Pass the popup content via the `popup` prop and the trigger element as children:

```tsx demo
<PopupTrigger popup={<Card sm shadow><Text sm>Popup content</Text></Card>}>
  <Button>Toggle Popup</Button>
</PopupTrigger>
```

`PopupTrigger` selects its trigger mode with three boolean props: `triggerOnClick` (the default when none is set), `triggerOnHover`, and `triggerOnFocus`.

`Popup` positions itself relative to its anchor through a placement prop: `placeTop`, `placeTopStart`, `placeTopEnd`, `placeBottom`, `placeBottomStart`, `placeBottomEnd`, `placeLeft`, `placeLeftStart`, `placeLeftEnd`, `placeRight`, `placeRightStart`, and `placeRightEnd`. A `Popup` rendered on its own also needs an `anchorRef` that points at its anchor element. `PopupTrigger` sets the anchor itself and passes placement, like any other `Popup` prop, through `popupProps`:

```tsx demo
<PopupTrigger
  popup={<Text sm>Anchored below, aligned to the start edge</Text>}
  popupProps={{ placeBottomStart: true }}
>
  <Button>Open below start</Button>
</PopupTrigger>
```

See the [Overlay Components](/docs/overlay-components/overlay) section for `Overlay`, `Modal`, and `Popup` documentation.

## Responsive visibility

Hide components below a breakpoint, or show them only below one:

```tsx demo
<Stack>
  <Text>Always visible</Text>
  <Text mobileHide>Hidden on mobile (below 48rem)</Text>
  <Text tabletHide>Hidden on tablet (below 64rem)</Text>
  <Text desktopHide>Hidden on desktop (below 80rem)</Text>
  <Text mobileShow>Shown only on mobile (below 48rem)</Text>
  <Text tabletShow>Shown only below tablet width (64rem)</Text>
</Stack>
```

Make a component full width below a breakpoint while it keeps its own width above it:

```tsx demo
<Row mobileStack>
  <Button mobileWFull>Full width on mobile</Button>
  <Button mobileWFull>Fit width from 48rem</Button>
</Row>
```

## Custom HTML tags

Use the `tag` prop to render different HTML elements:

```tsx hide
<div>
  <Text tag="h1">Heading rendered as h1</Text>
  <Text tag="span">Text rendered as span</Text>
  <Button tag="a" href="/link">Button rendered as anchor</Button>
</div>
```

## Combining with custom classes

Add custom Tailwind classes via `className`:

```tsx demo
<Card className="shadow-2xl">
  <Button wFull className="hover:scale-105">
    Full width with hover effect
  </Button>
</Card>
```

User-provided `className` takes precedence over theme classes (via `twMerge`).

## Prefer props over Tailwind classes

VaneUI provides boolean props for most common styling needs. Use these instead of Tailwind classes to ensure consistent theming and proper integration with the size system.

### Common props vs Tailwind classes

| Instead of Tailwind | Use VaneUI prop |
|---------------------|-----------------|
| `className="uppercase"` | `uppercase` |
| `className="font-bold"` | `fontBold` |
| `className="font-semibold"` | `fontSemibold` |
| `className="font-mono"` | `fontMono` |
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
<Text uppercase fontSemibold>IMPORTANT</Text>
<Card borderB>Card with bottom border</Card>
<Row itemsCenter justifyBetween>Spaced content</Row>

// Avoid: Tailwind classes that duplicate props
<Text className="uppercase font-semibold">IMPORTANT</Text>
<Card className="border-b">Card with bottom border</Card>
<Row className="items-center justify-between">Spaced content</Row>
```

### Gap is controlled by size props

Don't use Tailwind gap classes. Gap is controlled by the size prop system (`xs`, `sm`, `md`, `lg`, `xl`) and is enabled by default on layout components.

```tsx
// Good: Size prop controls gap
<Row lg>Large gap between items</Row>
<Stack sm>Small gap between items</Stack>
<Col>Default gap (md)</Col>

// Avoid: Tailwind gap classes
<Row className="gap-10">Don't override gap this way</Row>
```

### Background colors via appearance props

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

### Typography styling is built-in

Typography components have built-in letter spacing, line height, and other typographic properties. Avoid overriding these with Tailwind classes.

```tsx
// Good: Built-in typography styling
<Badge uppercase>STATUS</Badge>
<Title>Properly styled heading</Title>

// Avoid: Manual typography overrides
<Badge className="tracking-wider">STATUS</Badge>
<Title className="leading-tight">Overridden heading</Title>
```
