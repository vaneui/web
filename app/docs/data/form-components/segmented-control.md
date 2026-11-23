---
componentKey: segmentedControl
propsTables: SegmentedControl=segmentedControl.main, SegmentedControlItem=segmentedControl.item
importPath: 'import { SegmentedControl, SegmentedControlItem } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/segmentedControl/SegmentedControl.tsx
since: 1.8.0
---

SegmentedControl picks one option out of a few short ones that sit side by side, such as a status filter, a list or grid view, or a billing period. Each segment is a native radio inside a `<label>`, so a click anywhere on it selects it, the arrow keys move the selection and a form submits the value. For a long list of options, use a [Select](/docs/form-components/select); for options that need a line of description each, use a [Radio](/docs/form-components/radio) group; to move between pages, use [NavLink](/docs/basic-components/navlink) with `indicatorBottom`. SegmentedControl needs `@vaneui/ui` 1.8.0 or later.

## Basic usage

Give each `SegmentedControlItem` a `value`, and the control an `aria-label` or a [Field](/docs/form-components/field) label. `defaultValue` selects a segment without state.

```tsx demo
<SegmentedControl aria-label="Status" defaultValue="open">
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="open">Open</SegmentedControlItem>
  <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
</SegmentedControl>
```

The control renders `role="radiogroup"` on a neutral track. The selected segment is raised as a surface with a shadow, and a thin line separates two segments that are not selected.

## Filter a list with a controlled value

`value` and `onChange` work as on `RadioGroup`: `onChange` receives the change event of the radio, and `event.target.value` is the segment's `value`.

```tsx demo
const issues = [
  { title: 'Focus ring is cut off in Safari', status: 'open' },
  { title: 'Add a dark theme to the docs', status: 'closed' },
  { title: 'Table header loses its color', status: 'open' },
];
const [status, setStatus] = useState('all');
const shown = issues.filter(issue => status === 'all' || issue.status === status);

return (
  <Col>
    <SegmentedControl aria-label="Status" value={status} onChange={event => setStatus(event.target.value)}>
      <SegmentedControlItem value="all">All</SegmentedControlItem>
      <SegmentedControlItem value="open">Open</SegmentedControlItem>
      <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
    </SegmentedControl>
    {shown.map(issue => <Text key={issue.title}>{issue.title}</Text>)}
  </Col>
);
```

## Sizes match Button and Input

The control is `sm` by default, as are Button and Input, and at every size it is as tall as a Button of that size, with the same corners. The size reaches the segments, so their text, padding and icons follow it.

```tsx demo
<Col>
  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
    <Row key={size}>
      <SegmentedControl {...{ [size]: true }} aria-label={`Period, ${size}`} defaultValue="week">
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
      <Button {...{ [size]: true }}>Apply</Button>
    </Row>
  ))}
</Col>
```

## Colors and variants of the selected segment

The appearance and the variant color the selected segment, and the track stays neutral. `outline`, the default, raises a segment in the page color with a border in the appearance color; `filled` fills it with the appearance color; `ghost` drops the track and tints the selected segment.

```tsx demo
<Col>
  <SegmentedControl accent aria-label="View, accent outline" defaultValue="board">
    <SegmentedControlItem value="list">List</SegmentedControlItem>
    <SegmentedControlItem value="board">Board</SegmentedControlItem>
    <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
  </SegmentedControl>
  <SegmentedControl accent filled aria-label="View, accent filled" defaultValue="board">
    <SegmentedControlItem value="list">List</SegmentedControlItem>
    <SegmentedControlItem value="board">Board</SegmentedControlItem>
    <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
  </SegmentedControl>
  <SegmentedControl accent ghost aria-label="View, accent ghost" defaultValue="board">
    <SegmentedControlItem value="list">List</SegmentedControlItem>
    <SegmentedControlItem value="board">Board</SegmentedControlItem>
    <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
  </SegmentedControl>
</Col>
```

A segment with its own appearance or variant keeps it, which suits a choice where each option has a meaning of its own:

```tsx demo
<SegmentedControl filled aria-label="Result" defaultValue="passed">
  <SegmentedControlItem value="passed" success>Passed</SegmentedControlItem>
  <SegmentedControlItem value="failed" danger>Failed</SegmentedControlItem>
  <SegmentedControlItem value="skipped">Skipped</SegmentedControlItem>
</SegmentedControl>
```

## Shapes

`rounded` is the default. `pill` and `sharp` reach the track and the segments together.

```tsx demo
<Col>
  <SegmentedControl pill aria-label="Billing, pill" defaultValue="year">
    <SegmentedControlItem value="month">Monthly</SegmentedControlItem>
    <SegmentedControlItem value="year">Yearly</SegmentedControlItem>
  </SegmentedControl>
  <SegmentedControl sharp aria-label="Billing, sharp" defaultValue="year">
    <SegmentedControlItem value="month">Monthly</SegmentedControlItem>
    <SegmentedControlItem value="year">Yearly</SegmentedControlItem>
  </SegmentedControl>
</Col>
```

## Icons in segments

An icon takes the size of the segment's text. A segment with only an icon needs an `aria-label`, which goes to its radio.

```tsx demo
<Row flexWrap>
  <SegmentedControl md aria-label="Color scheme" defaultValue="light">
    <SegmentedControlItem value="light"><Sun /> Light</SegmentedControlItem>
    <SegmentedControlItem value="dark"><Moon /> Dark</SegmentedControlItem>
    <SegmentedControlItem value="system"><Monitor /> System</SegmentedControlItem>
  </SegmentedControl>
  <SegmentedControl md aria-label="Layout" defaultValue="grid">
    <SegmentedControlItem value="rows" aria-label="Rows"><AlignJustify /></SegmentedControlItem>
    <SegmentedControlItem value="grid" aria-label="Grid"><Grid /></SegmentedControlItem>
  </SegmentedControl>
</Row>
```

## Fill the width

`wFull` stretches the control to the width of its container and shares it out between the segments.

```tsx demo
<SegmentedControl wFull aria-label="Billing" defaultValue="year">
  <SegmentedControlItem value="month">Monthly</SegmentedControlItem>
  <SegmentedControlItem value="year">Yearly</SegmentedControlItem>
</SegmentedControl>
```

## Disabled segments and controls

`disabled` on a segment dims it and the arrow keys skip it. `disabled` on the control dims every segment and keeps the selection.

```tsx demo
<Col>
  <SegmentedControl aria-label="Period" defaultValue="week">
    <SegmentedControlItem value="day">Day</SegmentedControlItem>
    <SegmentedControlItem value="week">Week</SegmentedControlItem>
    <SegmentedControlItem value="month" disabled>Month</SegmentedControlItem>
  </SegmentedControl>
  <SegmentedControl disabled aria-label="Period, disabled" defaultValue="week">
    <SegmentedControlItem value="day">Day</SegmentedControlItem>
    <SegmentedControlItem value="week">Week</SegmentedControlItem>
    <SegmentedControlItem value="month">Month</SegmentedControlItem>
  </SegmentedControl>
</Col>
```

## In a form or a Field

Inside a [Field](/docs/form-components/field), the control is labelled by the Field's label and described by its help text, and it takes the Field's `disabled` and `required`. `name` is the key the form submits; without one the control generates a name, so its segments still act as one group.

```tsx demo
<form onSubmit={event => event.preventDefault()}>
  <Col>
    <Field label="Delivery" description="Express arrives the next working day.">
      <SegmentedControl name="delivery" defaultValue="standard">
        <SegmentedControlItem value="standard">Standard</SegmentedControlItem>
        <SegmentedControlItem value="express">Express</SegmentedControlItem>
        <SegmentedControlItem value="pickup">Pickup</SegmentedControlItem>
      </SegmentedControl>
    </Field>
    <Button type="submit" filled>Continue</Button>
  </Col>
</form>
```

## Keyboard and screen readers

Tab moves the focus to the selected segment, and the arrow keys move the selection to the previous or next segment, as in any radio group. The focus ring is drawn on the segment itself, inside the track. Screen readers announce the control as a radio group with its label, and each segment as a radio button with its text and its position, such as "Open, radio button, 2 of 3".

A segment's `className` and `style` go to its `<label>`, so they change how the segment looks. `ref`, `aria-label`, `id` and the other attributes go to its radio.

## Loading placeholder

`skeleton` on the control, or on a container around it, draws it as one solid shape of its own size until the data arrives. See [Skeleton](/docs/basic-components/skeleton).

```tsx demo
<SegmentedControl skeleton aria-label="Status" defaultValue="all">
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="open">Open</SegmentedControlItem>
  <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
</SegmentedControl>
```

## Customizing

SegmentedControl has two theme nodes: `segmentedControl.main` for the track and `segmentedControl.item` for the segments. Set app-wide defaults with `ThemeProvider`'s `themeDefaults`. A size, appearance, variant or shape set on `main` reaches the segments.

```tsx demo
<ThemeProvider themeDefaults={{ segmentedControl: { main: { md: true, pill: true }, item: { fontSemibold: true } } }}>
  <SegmentedControl aria-label="Status" defaultValue="all">
    <SegmentedControlItem value="all">All</SegmentedControlItem>
    <SegmentedControlItem value="open">Open</SegmentedControlItem>
    <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
  </SegmentedControl>
</ThemeProvider>
```
