---
componentKey: progress
importPath: 'import { Progress } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/progress/Progress.tsx
since: 1.4.5
---

Progress is a determinate bar: it shows how much of a task with a known size is done, such as a file upload, an import or step 3 of 8 in a setup flow. It renders a `role="progressbar"` track with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`, and a fill that grows with `value`. It takes no children, so a label or a percentage goes beside it. When the end of the wait is unknown, use [Spinner](/docs/basic-components/spinner) instead. Progress needs `@vaneui/ui` 1.4.5 or later.

## Basic usage

`value` is required and fills the bar against `max`, which is 100 by default. Give the bar an `aria-label`, since the track itself carries no text.

```tsx demo
<Progress value={40} aria-label="Upload"/>
```

`md`, `primary`, `pill`, `transition` and `wFull` are defaults, so a bare `<Progress value={40}/>` is an 8px pill bar across the full width of its parent.

## Setting the range with max

Set `max` when the value counts something other than percent, such as steps or megabytes. `value` is clamped to the range 0 to `max`: a value above `max` shows a full bar and reports `max` in `aria-valuenow`, and a negative value shows an empty one.

```tsx demo
<Col>
  <Progress value={3} max={8} aria-label="Setup, step 3 of 8"/>
  <Progress value={8} max={8} aria-label="Setup, step 8 of 8"/>
</Col>
```

## Sizes

Size sets the bar height: 2, 4, 8, 12 and 16px from `xs` to `xl`, with `md` (8px) as the default. In a [Row](/docs/layout-components/row), `flex1` lets the bar take the space its label leaves.

```tsx demo
<Col>
  <Row>
    <Text sm secondary className="w-8">xs</Text>
    <Progress xs flex1 value={60} aria-label="Progress xs"/>
  </Row>
  <Row>
    <Text sm secondary className="w-8">sm</Text>
    <Progress sm flex1 value={60} aria-label="Progress sm"/>
  </Row>
  <Row>
    <Text sm secondary className="w-8">md</Text>
    <Progress flex1 value={60} aria-label="Progress md"/>
  </Row>
  <Row>
    <Text sm secondary className="w-8">lg</Text>
    <Progress lg flex1 value={60} aria-label="Progress lg"/>
  </Row>
  <Row>
    <Text sm secondary className="w-8">xl</Text>
    <Progress xl flex1 value={60} aria-label="Progress xl"/>
  </Row>
</Col>
```

## Appearances

The fill is a filled bar in the appearance color, and the track stays neutral whatever the appearance. With the default `primary`, the fill is near-black in light mode and near-white in dark mode.

```tsx demo
<Col>
  <Progress value={70} aria-label="Primary"/>
  <Progress accent value={70} aria-label="Accent"/>
  <Progress secondary value={70} aria-label="Secondary"/>
  <Progress tertiary value={70} aria-label="Tertiary"/>
  <Progress success value={70} aria-label="Success"/>
  <Progress danger value={70} aria-label="Danger"/>
  <Progress warning value={70} aria-label="Warning"/>
  <Progress info value={70} aria-label="Info"/>
</Col>
```

## Shapes

`pill` is the default. `rounded` and `sharp` square the ends off, and the fill follows the shape of the track.

```tsx demo
<Col>
  <Progress lg value={45} aria-label="Pill progress"/>
  <Progress lg rounded value={45} aria-label="Rounded progress"/>
  <Progress lg sharp value={45} aria-label="Sharp progress"/>
</Col>
```

## Animating the progress bar to a new value

With the default `transition`, the fill eases to each new value over `--transition-duration` (200ms); `noTransition` makes it jump. Under `prefers-reduced-motion` the fill moves without the animation. Each click below sends another megabyte, and the bar turns `success` once the upload completes.

```tsx demo
const total = 6;
const [sent, setSent] = useState(2);
const done = sent >= total;

return (
  <Card sm className="max-w-md">
    <Row justifyBetween>
      <Text sm fontSemibold>quarterly-report.pdf</Text>
      <Text sm secondary>{sent} of {total}MB</Text>
    </Row>
    <Progress sm success={done} value={sent} max={total} aria-label="Uploading quarterly-report.pdf"/>
    <Row justifyBetween>
      <Text xs secondary>{done ? 'Upload complete' : 'Uploading to the shared drive'}</Text>
      <Button xs secondary onClick={() => setSent(done ? 0 : sent + 1)}>
        {done ? 'Restart' : 'Send 1MB'}
      </Button>
    </Row>
  </Card>
);
```

## Visible labels and value text

When a visible label names the bar, point `aria-labelledby` at it instead of repeating the text in `aria-label`. Screen readers announce a progressbar's value as a percentage of the range; for a count, `aria-valuetext` gives the wording to read instead.

```tsx demo
<Col>
  <Row justifyBetween>
    <Text sm id="import-label">Importing contacts</Text>
    <Text sm secondary>3 of 8 files</Text>
  </Row>
  <Progress value={3} max={8} aria-labelledby="import-label" aria-valuetext="3 of 8 files"/>
</Col>
```

## Customizing

Progress has two theme nodes for [themeDefaults](/docs/customization/theme-defaults): `progress.main` for the track and `progress.fill` for the bar inside it. The fill follows the track's appearance, shape and transition whenever they differ from the library defaults, so most changes go on `main`. A `fill` default, such as `success` below, applies while the track keeps its default appearance.

```tsx demo
<ThemeProvider themeDefaults={{
  progress: { main: { sm: true }, fill: { success: true } },
}}>
  <Progress value={65} aria-label="Storage used"/>
</ThemeProvider>
```
