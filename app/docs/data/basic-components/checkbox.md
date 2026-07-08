---
componentKey: checkbox
importPath: 'import { Checkbox } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/checkbox/Checkbox.tsx
since: 0.9.0
---

## Basic usage

Checkbox should be used inside a Label with matching `id`/`htmlFor`. `Label` defaults to a stacked column layout, so add `row itemsCenter` to place the checkbox inline with its text. The checkbox takes its size from the Label, so match the Label's size to its text (here `md`) to keep the box centered on the first line of a multi-line label.

```tsx demo
<Col>
  <Label row itemsCenter htmlFor="terms">
    <Checkbox id="terms"/>
    <span>I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.</span>
  </Label>

  <Label md row itemsCenter htmlFor="emails">
    <Checkbox defaultChecked id="emails"/>
    <Col noGap tag="span">
      <Text>Receive product updates</Text>
      <Text xs secondary>Occasional emails about new features</Text>
    </Col>
  </Label>
</Col>
```

## Sizes

Checkboxes in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. A `Checkbox` nested inside a `Label` inherits the Label's size automatically. Set it once on the Label and both scale together.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter xs htmlFor="size-xs">
    <Checkbox id="size-xs" defaultChecked/>
    Size: xs
  </Label>
  <Label row itemsCenter sm htmlFor="size-sm">
    <Checkbox id="size-sm" defaultChecked/>
    Size: sm
  </Label>
  <Label row itemsCenter md htmlFor="size-md">
    <Checkbox id="size-md" defaultChecked/>
    Size: md
  </Label>
  <Label row itemsCenter lg htmlFor="size-lg">
    <Checkbox id="size-lg" defaultChecked/>
    Size: lg
  </Label>
  <Label row itemsCenter xl htmlFor="size-xl">
    <Checkbox id="size-xl" defaultChecked/>
    Size: xl
  </Label>
</Row>
```

## Appearances

Different color appearances applied to the Checkbox; always place inside a Label.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter htmlFor="appearance-primary">
    <Checkbox id="appearance-primary" defaultChecked/>
    Enable primary style
  </Label>
  <Label row itemsCenter brand htmlFor="appearance-brand">
    <Checkbox brand id="appearance-brand" defaultChecked/>
    Enable brand style
  </Label>
  <Label row itemsCenter accent htmlFor="appearance-accent">
    <Checkbox accent id="appearance-accent" defaultChecked/>
    Enable accent style
  </Label>
  <Label row itemsCenter secondary htmlFor="appearance-secondary">
    <Checkbox secondary id="appearance-secondary" defaultChecked/>
    Enable secondary style
  </Label>
  <Label row itemsCenter tertiary htmlFor="appearance-tertiary">
    <Checkbox tertiary id="appearance-tertiary" defaultChecked/>
    Enable tertiary style
  </Label>
  <Label row itemsCenter success htmlFor="appearance-success">
    <Checkbox success id="appearance-success" defaultChecked/>
    Enable success style
  </Label>
  <Label row itemsCenter danger htmlFor="appearance-danger">
    <Checkbox danger id="appearance-danger" defaultChecked/>
    Enable danger style
  </Label>
  <Label row itemsCenter warning htmlFor="appearance-warning">
    <Checkbox warning id="appearance-warning" defaultChecked/>
    Enable warning style
  </Label>
  <Label row itemsCenter info htmlFor="appearance-info">
    <Checkbox info id="appearance-info" defaultChecked/>
    Enable info style
  </Label>
  <Label row itemsCenter link htmlFor="appearance-link">
    <Checkbox link id="appearance-link" defaultChecked/>
    Enable link style
  </Label>
  <Label row itemsCenter inherit htmlFor="appearance-inherit">
    <Checkbox inherit id="appearance-inherit" defaultChecked/>
    Enable inherit style
  </Label>
</Row>
```

## Shapes

Checkboxes support border radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter htmlFor="shape-rounded">
    <Checkbox id="shape-rounded" defaultChecked/>
    Rounded (default)
  </Label>
  <Label row itemsCenter htmlFor="shape-pill">
    <Checkbox pill id="shape-pill" defaultChecked/>
    Pill
  </Label>
  <Label row itemsCenter htmlFor="shape-sharp">
    <Checkbox sharp id="shape-sharp" defaultChecked/>
    Sharp
  </Label>
</Row>
```

## Disabled

Use the `disabled` HTML attribute to prevent interaction.

```tsx demo
<Col>
  <Label row itemsCenter htmlFor="disabled-unchecked">
    <Checkbox disabled id="disabled-unchecked"/>
    Disabled (unchecked)
  </Label>
  <Label row itemsCenter htmlFor="disabled-checked">
    <Checkbox disabled defaultChecked id="disabled-checked"/>
    Disabled (checked)
  </Label>
</Col>
```

## Controlled vs uncontrolled

Checkbox forwards every HTML input attribute, so use `defaultChecked` for uncontrolled state and `checked` + `onChange` for controlled state.

Uncontrolled: initial value only, the input manages its own state.

```tsx demo
<Label row itemsCenter htmlFor="uncontrolled">
  <Checkbox defaultChecked id="uncontrolled"/>
  Uncontrolled (defaultChecked)
</Label>
```

Controlled: parent owns the value via `useState`.

```tsx demo
const [checked, setChecked] = useState(false);

return (
  <Label row itemsCenter htmlFor="controlled">
    <Checkbox
      id="controlled"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
    Controlled ({checked ? 'on' : 'off'})
  </Label>
);
```

## Indeterminate state

Use the `indeterminate` prop for "select all" checkboxes that represent a partially selected group. It is visual only: it renders a dash (the box fills like a checked one) and does not change the `checked` value, so you set it from your own state and manage the real values yourself.

```tsx demo
<Label row itemsCenter>
  <Checkbox indeterminate />
  Indeterminate
</Label>
```

Wire it to a group so "Select all" reflects and controls the children: `checked` when all are on, `indeterminate` when some are on, and clicking it toggles them all.

```tsx demo
const [items, setItems] = React.useState([true, true, false, false]);
const allChecked = items.every(Boolean);
const anyChecked = items.some(Boolean);
const labels = ['Item one', 'Item two', 'Item three', 'Item four'];
return (
  <Col>
    <Label row itemsCenter>
      <Checkbox
        checked={allChecked}
        indeterminate={anyChecked && !allChecked}
        onChange={() => setItems(items.map(() => !allChecked))}
      />
      Select all ({items.filter(Boolean).length} of {items.length} selected)
    </Label>
    <Col style={{ paddingLeft: 24 }}>
      {labels.map((label, i) => (
        <Label row itemsCenter key={label}>
          <Checkbox
            checked={items[i]}
            onChange={() => setItems(items.map((v, idx) => (idx === i ? !v : v)))}
          />
          {label}
        </Label>
      ))}
    </Col>
  </Col>
);
```

## Checkbox group

Multiple labeled checkboxes working together.

```tsx demo
<Col>
  <Label row itemsCenter htmlFor="opt-1">
    <Checkbox id="opt-1" defaultChecked/>
    Email notifications
  </Label>
  <Label row itemsCenter htmlFor="opt-2">
    <Checkbox id="opt-2"/>
    SMS alerts
  </Label>
  <Label row itemsCenter htmlFor="opt-3">
    <Checkbox id="opt-3"/>
    Push notifications
  </Label>
</Col>
```

## Customizing

Set app-wide Checkbox defaults with `ThemeProvider`'s `themeDefaults` and tune the checked-state visuals with `extraClasses`:

```tsx demo
<ThemeProvider
  themeDefaults={{ checkbox: { input: { lg: true } } }}
  extraClasses={{ checkbox: { input: { primary: 'checked:bg-brand-600 checked:border-brand-600' } } }}
>
  <Label row itemsCenter htmlFor="terms">
    <Checkbox id="terms"/>
    I agree to the terms
  </Label>
</ThemeProvider>
```
