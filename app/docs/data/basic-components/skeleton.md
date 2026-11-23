---
componentKey: skeleton
propsTables: Skeleton=skeleton
importPath: 'import { Skeleton } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/skeleton/Skeleton.tsx
since: 1.8.0
---

A skeleton is a placeholder that holds the shape of content while it loads. In VaneUI it is a prop, not a separate set of components: add `skeleton` to a component and it is drawn as a placeholder in its own layout, at its own size. On a container, every component inside turns into a placeholder too. For an area that has no component of its own, such as a chart or a map, use the `Skeleton` box. Both need `@vaneui/ui` 1.8.0 or later.

```tsx setup
const photo = "/puppy.webp";
```

## Turn a card into a placeholder with one prop

`skeleton` on a [Card](/docs/layout-components/card) reaches everything inside it. Text turns into bars, one per line and as long as the line. Buttons, badges, fields and avatars turn into solid shapes of their own size and corners. The Card keeps its surface and border, so the page reads before the data arrives.

```tsx demo
<Row tabletStack itemsStart>
  <Card skeleton className="w-80">
    <Row>
      <Avatar src={photo} name="Biscuit"/>
      <Col noGap>
        <Title sm>Biscuit</Title>
        <Text sm secondary>Head of snacks</Text>
      </Col>
    </Row>
    <Text>Reviews every pull request that mentions treats, usually within the hour.</Text>
    <Row>
      <Badge success dot>Online</Badge>
      <Button filled>Follow</Button>
    </Row>
  </Card>
  <Card className="w-80">
    <Row>
      <Avatar src={photo} name="Biscuit"/>
      <Col noGap>
        <Title sm>Biscuit</Title>
        <Text sm secondary>Head of snacks</Text>
      </Col>
    </Row>
    <Text>Reviews every pull request that mentions treats, usually within the hour.</Text>
    <Row>
      <Badge success dot>Online</Badge>
      <Button filled>Follow</Button>
    </Row>
  </Card>
</Row>
```

## Switch between loading and loaded

Render the real components while the data loads and pass the loading state to `skeleton`. A text with no data yet draws one bar 12 characters long, so the components need no filler text. The placeholders take the size and lines of the finished content, so nothing moves when it arrives.

```tsx demo
const [loading, setLoading] = useState(true);
const user = loading ? undefined : { name: 'Biscuit', role: 'Head of snacks' };

return (
  <Col>
    <Label row>
      <Checkbox checked={loading} onChange={() => setLoading(!loading)}/>
      Loading
    </Label>
    <Card skeleton={loading} className="w-80">
      <Row>
        <Avatar src={user ? photo : undefined} name={user?.name}/>
        <Col noGap>
          <Title sm>{user?.name}</Title>
          <Text sm secondary>{user?.role}</Text>
        </Col>
      </Row>
      <Button filled>Follow</Button>
    </Card>
  </Col>
);
```

For a bar closer to the loaded length, pass placeholder text of about that length, such as `{user?.role ?? 'Head of snacks'}`. It is never shown or read while `skeleton` is on, and two sentences of filler give a two-line bar where a two-line bio goes.

## Bars for text that has not loaded yet

A text with nothing in it yet draws one bar 12 characters long and one line tall, at the text's own size. An empty Button, Badge, Chip, Code, Kbd or Mark takes the room of a 6-character label, at its usual height. This covers a Text, Title, Link, ListItem, Blockquote, table cell, NavLink, MenuItem or BreadcrumbItem whose data is still `undefined`:

```tsx demo
<Card skeleton className="w-80">
  <Row>
    <Avatar/>
    <Col noGap>
      <Title sm/>
      <Text sm secondary/>
    </Col>
  </Row>
  <Text/>
  <Row>
    <Badge success/>
    <Button filled/>
  </Row>
</Card>
```

Set `--skeleton-text-width` to change the length of those text bars, and `--skeleton-label-width` for the empty boxes. A Badge with `dot` and no text stays a dot.

```css
.loading-list {
  --skeleton-text-width: 100%;
}
```

## What each component turns into

| Component | Placeholder |
|------|-------------|
| Text, titles, links, labels, list items, table cells, NavLink and MenuItem text | A bar per line, as long as the line, at the text's own size |
| Button, IconButton, Badge, Chip, Code, Kbd, Mark | A solid shape of the same size and corners |
| Input, Textarea, Select, Checkbox, Radio, Switch, Progress, Spinner | A solid shape of the control, without its value, check mark, sections or chevron |
| Avatar, Img, Icon and bare `<svg>` icons | A solid shape of the same size |
| Card, Row, Col, Stack, Section, Table, Field, Alert and other containers | Their own surface and border stay; their content turns into placeholders |

Put text in a component of its own, such as `Text`, rather than straight inside a `Row`, `Col`, `Card`, `Stack`, `Section` or `Container`. Safari draws a bar over text that sits straight in one of those layout containers as a thin line, while Chrome and Firefox draw the full bar.

All placeholders share one fill, so a bar that runs over a shape adds nothing to it. A component that carries `skeleton` itself turns into a placeholder in the same way, whatever it sits in:

```tsx demo
<Row flexWrap>
  <Button skeleton>Save changes</Button>
  <Badge skeleton>Paid</Badge>
  <Input skeleton aria-label="Email" placeholder="you@example.com" wFit/>
  <Switch skeleton aria-label="Notifications" defaultChecked/>
  <Text skeleton>Last synced a minute ago</Text>
</Row>
```

## Lists, tables and navigation

The prop works the same on any container, so a table or a sidebar keeps its rows, lines and active item while the bars stand in for the text.

```tsx demo
<Row tabletStack itemsStart>
  <Col skeleton noGap className="w-56">
    <NavLink href="#home" active>Dashboard</NavLink>
    <NavLink href="#projects">Projects</NavLink>
    <NavLink href="#settings">Settings</NavLink>
  </Col>
  <Table skeleton>
    <Thead><Tr><Th>Name</Th><Th>Role</Th></Tr></Thead>
    <Tbody>
      <Tr><Td>Biscuit</Td><Td>Head of snacks</Td></Tr>
      <Tr><Td>Pepper</Td><Td>Night watch</Td></Tr>
    </Tbody>
  </Table>
</Row>
```

## The Skeleton box for areas with no component

`Skeleton` is a plain box. It is full width and one line of text tall at its size, from 18px at `xs` to 30px at `xl`, with corners that follow the size. Aspect props, a height or a class set its shape. Use it for a chart, a map, an embed or any block you draw yourself.

```tsx demo
<Row itemsStart flexWrap>
  <Skeleton aspectVideo className="w-64"/>
  <Col className="w-64">
    <Skeleton xs/>
    <Skeleton/>
    <Skeleton xl/>
    <Skeleton className="h-16"/>
  </Col>
  <Skeleton pill aspectSquare className="w-12"/>
</Row>
```

For a component that VaneUI has, prefer the component with `skeleton` over a box of the same size: an `Avatar` keeps its exact size and shape, and the swap to the loaded content does not move the layout.

## Focus, clicks and screen readers

The element with `skeleton` gets `aria-busy="true"` and the `inert` attribute. Nothing inside it takes focus, clicks or text selection, so a placeholder button cannot be pressed. `inert` also hides the placeholder from screen readers, which is right for placeholder text, so tell them about the wait in a status message outside it:

```tsx
<Col>
  <Text srOnly role="status">{loading ? 'Loading profile' : ''}</Text>
  <Card skeleton={loading}>...</Card>
</Col>
```

The `Skeleton` box is decorative and renders `aria-hidden="true"`.

## Pulse and reduced motion

The placeholders pulse between two shades of the fill. The pulse runs on the outermost element with `skeleton`, so every placeholder inside it pulses in step, and the surface of the container stays still. With `prefers-reduced-motion: reduce`, the placeholders do not move.

## Placeholder color and dark mode

The fill is a light shade of the secondary text color, mixed into the page surface, so it follows the theme: a dark subtree or a page with `data-theme="dark"` gets a dark fill. Set `--skeleton-color` to tint it:

```css
.brand-skeletons {
  --skeleton-color: var(--color-text-info);
}
```

## Customizing

`skeleton` is a boolean prop like any other, so `themeDefaults` can turn it on for a component node, and the Skeleton box has its own `skeleton` node for its defaults.

```tsx demo
<ThemeProvider themeDefaults={{ skeleton: { pill: true, sm: true } }}>
  <Col className="w-64">
    <Skeleton/>
    <Skeleton className="w-1/2"/>
  </Col>
</ThemeProvider>
```

## Frequently asked questions

### Do I need a separate skeleton layout for each page?

No. Render the page you already have with `skeleton` on the container that waits for data. Text that has not arrived draws a default bar, and placeholder text of the expected length draws a closer one. The placeholders keep the same sizes and positions as the loaded content, so there is one layout to maintain and the page does not jump when the data arrives.

### Why is a placeholder missing?

A component that is not rendered draws nothing, as in `{user && <Text>{user.bio}</Text>}`. Render the component and leave its text empty while it loads, `<Text>{user?.bio}</Text>`, and it draws a default bar. For an area with no text at all, such as a chart, use the `Skeleton` box with a size or an aspect prop.

### Can a part of a card stay live while the rest loads?

Put `skeleton` on the part that waits instead of on the card. The prop reaches only the components inside the element that carries it, so a `Col skeleton` inside a Card turns that column into placeholders and leaves the header and its buttons usable.

### Does `skeleton` change the HTML that is rendered?

It adds three attributes to the element that carries it: `data-skeleton`, `aria-busy="true"` and `inert`. The components inside it render the same elements as before. The placeholder look comes from the stylesheet, so it also applies to server-rendered HTML before hydration.
