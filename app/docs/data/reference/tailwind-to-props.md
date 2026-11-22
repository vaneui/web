Most Tailwind CSS utility classes that style a VaneUI component have a boolean prop named after the class in camelCase: `items-center` is `itemsCenter`, `font-semibold` is `fontSemibold`, `flex-1` is `flex1`. A few take a shorter name, such as `pill` for `rounded-full`. The tables below map each class to its prop, grouped by category, for `@vaneui/ui` 1.8.0. A prop works on the components that include its category; each component page lists its props, and [Common Props](/docs/reference/common-props) describes the shared layout props.

Rows marked **size-driven** have no fixed value of their own. Gap, padding, margin, border radius, shadow and font size come from the component's size prop, `xs` to `xl`, so `<Card lg>` enlarges its padding, gap and radius together. To change one of those amounts, change the size prop rather than add a class. [Core Concepts](/docs/getting-started/core-concepts) explains the size system.

A row of badges that stacks on phones, written with classes and then with props:

```tsx
// Classes
<div className="flex flex-col md:flex-row items-stretch gap-6">
  <span className="rounded-full border px-2 font-semibold uppercase">Active</span>
</div>

// Props: Badge is already a pill and semibold
<Row mobileStack itemsStretch lg>
  <Badge uppercase>Active</Badge>
</Row>
```

Leave out the props that are already defaults. Row is `flex`, `row` and `itemsCenter` from the start, and Badge is `pill`, `fontSemibold` and `sm`, so writing them again changes nothing.

## Layout: display, direction, position and overflow

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `block` | `block` |
| `inline` | `inline` |
| `inline-block` | `inlineBlock` |
| `flex` | `flex` |
| `inline-flex` | `inlineFlex` |
| `grid` | `grid` |
| `inline-grid` | `inlineGrid` |
| `contents` | `contents` |
| `table` | `table` |
| `table-cell` | `tableCell` |
| `hidden` | `hidden` |
| `flex-row` | `row` |
| `flex-col` | `column` |
| `flex-row-reverse` | `rowReverse` |
| `flex-col-reverse` | `columnReverse` |
| `relative` | `relative` |
| `absolute` | `absolute` |
| `fixed` | `fixed` |
| `sticky top-0` | `sticky` |
| `static` | `static` |

Row is a flex row by default, and Col, Stack, Card and Section are flex columns, so `flex`, `row` and `column` rarely need writing. `sticky` also sets `top` to the `--sticky-top` variable, 0 unless you set it, which leaves room for a fixed header.

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `overflow-auto` | `overflowAuto` |
| `overflow-hidden` | `overflowHidden` |
| `overflow-clip` | `overflowClip` |
| `overflow-visible` | `overflowVisible` |
| `overflow-scroll` | `overflowScroll` |
| `overflow-x-auto` | `overflowXAuto` |
| `overflow-x-hidden` | `overflowXHidden` |
| `overflow-x-clip` | `overflowXClip` |
| `overflow-x-visible` | `overflowXVisible` |
| `overflow-x-scroll` | `overflowXScroll` |
| `overflow-y-auto` | `overflowYAuto` |
| `overflow-y-hidden` | `overflowYHidden` |
| `overflow-y-clip` | `overflowYClip` |
| `overflow-y-visible` | `overflowYVisible` |
| `overflow-y-scroll` | `overflowYScroll` |

## Flex and grid alignment

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `items-start` | `itemsStart` |
| `items-end` | `itemsEnd` |
| `items-center` | `itemsCenter` |
| `items-baseline` | `itemsBaseline` |
| `items-stretch` | `itemsStretch` |
| `justify-start` | `justifyStart` |
| `justify-end` | `justifyEnd` |
| `justify-center` | `justifyCenter` |
| `justify-between` | `justifyBetween` |
| `justify-around` | `justifyAround` |
| `justify-evenly` | `justifyEvenly` |
| `justify-stretch` | `justifyStretch` |
| `justify-baseline` | `justifyBaseline` |
| `self-auto` | `alignSelfAuto` |
| `self-start` | `alignSelfStart` |
| `self-end` | `alignSelfEnd` |
| `self-center` | `alignSelfCenter` |
| `self-stretch` | `alignSelfStretch` |
| `self-baseline` | `alignSelfBaseline` |
| `justify-self-auto` | `justifySelfAuto` |
| `justify-self-start` | `justifySelfStart` |
| `justify-self-end` | `justifySelfEnd` |
| `justify-self-center` | `justifySelfCenter` |
| `justify-self-stretch` | `justifySelfStretch` |
| `flex-wrap` | `flexWrap` |
| `flex-nowrap` | `flexNoWrap` |
| `flex-wrap-reverse` | `flexWrapReverse` |
| `flex-1` | `flex1` |
| `flex-auto` | `flexAuto` |
| `flex-none` | `flexNone` |
| `shrink-0` | `noShrink` |

Row centers its children on the cross axis by default, and Section aligns them to the start. `itemsStretch` makes the children of either fill it. The `alignSelf*` and `justifySelf*` props exist only on Popup, Tooltip and the Checkbox, Radio and Switch controls; on a Card or Col, `self-*` stays in `className`.

## Spacing: gap, padding and margin

| Tailwind CSS class | VaneUI prop | Notes |
|--------------------|-------------|-------|
| `gap-*` | `gap` | Size-driven, on by default in layout components |
| `gap-0` | `noGap` | |
| `gap-*` at one fixed step | `gapXs`, `gapSm`, `gapMd`, `gapLg`, `gapXl` | The same gap at every size and screen width |
| `p-*` | `padding` | Size-driven |
| `px-*` | `paddingX` | Size-driven |
| `py-*` | `paddingY` | Size-driven |
| `p-0` | `noPadding` | Default on Row, Col, Grid and Container |
| `m-*` | `margin` | Size-driven, equal to the component's gap |
| `mx-*` | `marginX` | Size-driven |
| `my-*` | `marginY` | Size-driven |
| `mt-*` | `marginT` | Size-driven |
| `mb-*` | `marginB` | Size-driven |
| `m-0` | `noMargin` | Default on Text and the title components |

On Row, Col and Grid the size prop lands on Tailwind's spacing scale, so a gap class converts to a size:

| Tailwind CSS class | Row, Col or Grid prop |
|--------------------|-----------------------|
| `gap-2` (8px) | `xs` |
| `gap-3` (12px) | `sm` |
| `gap-4` (16px) | none: `md` is the default |
| `gap-6` (24px) | `lg` |
| `gap-8` (32px) | `xl` |

Section, Card, Stack and Container set their own padding and gap for each size and step them down on tablets and phones. A `gap-4` or `p-6` class in `className` overrides the size-driven value at every width, which also turns that step-down off.

## Width and height

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `w-full` | `wFull` |
| `w-fit` | `wFit` |
| `w-auto` | `wAuto` |
| `w-screen max-w-none` | `wScreen` |
| `h-full` | `hFull` |
| `h-fit` | `hFit` |
| `h-auto` | `hAuto` |
| `h-screen max-h-none` | `hScreen` |

Button, Badge and Text are `wFit`; Input, NavLink, Section and Container are `wFull`.

## Typography: size, weight, case and wrapping

### Font size from the size prop

Font size is size-driven: there is no font size prop apart from the size props. On Text they match Tailwind's text scale:

| Tailwind CSS class | Text prop |
|--------------------|-----------|
| `text-xs` (12px) | `xs` |
| `text-sm` (14px) | `sm` |
| `text-base` (16px) | none: `md` is the default |
| `text-lg` (18px) | `lg` |
| `text-xl` (20px) | `xl` |

The titles, Button, Badge and the other components keep their own scales, and on Button or Card the size prop also moves the padding, gap and radius.

### Font weight and family

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `font-thin` | `fontThin` |
| `font-extralight` | `fontExtralight` |
| `font-light` | `fontLight` |
| `font-normal` | `fontNormal` |
| `font-medium` | `fontMedium` |
| `font-semibold` | `fontSemibold` |
| `font-bold` | `fontBold` |
| `font-extrabold` | `fontExtrabold` |
| `font-black` | `fontBlack` |
| `font-sans` | `fontSans` |
| `font-serif` | `fontSerif` |
| `font-mono` | `fontMono` |
| `font-heading` | `fontHeading` |
| `italic` | `italic` |
| `not-italic` | `notItalic` |

`font-heading` is not a Tailwind CSS default class: it uses the heading font from VaneUI's theme, which the title components use by default.

### Decoration, case and alignment

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `underline` | `underline` |
| `line-through` | `lineThrough` |
| `no-underline` | `noUnderline` |
| `overline` | `overline` |
| `uppercase` | `uppercase` |
| `lowercase` | `lowercase` |
| `capitalize` | `capitalize` |
| `normal-case` | `normalCase` |
| `text-left` | `textLeft` |
| `text-center` | `textCenter` |
| `text-right` | `textRight` |
| `text-justify` | `textJustify` |
| `text-start` | `textStart` |
| `text-end` | `textEnd` |

`textStart` and `textEnd` follow the reading direction and flip under `dir="rtl"`; `textLeft` and `textRight` never flip. Text and the title components are `textLeft` by default, so `textCenter` on a parent does not center their lines: put it on the Text itself.

### Truncation, letter spacing and wrapping

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `truncate` | `truncate` |
| `line-clamp-2` | `lineClamp2` |
| `line-clamp-3` | `lineClamp3` |
| `line-clamp-4` | `lineClamp4` |
| `line-clamp-5` | `lineClamp5` |
| `line-clamp-none` | `noTruncate` |
| `tracking-tighter` | `trackingTighter` |
| `tracking-tight` | `trackingTight` |
| `tracking-normal` | `trackingNormal` |
| `tracking-wide` | `trackingWide` |
| `tracking-wider` | `trackingWider` |
| `tracking-widest` | `trackingWidest` |
| `whitespace-normal` | `whitespaceNormal` |
| `whitespace-nowrap` | `whitespaceNowrap` |
| `whitespace-pre` | `whitespacePre` |
| `whitespace-pre-wrap` | `whitespacePreWrap` |
| `whitespace-pre-line` | `whitespacePreLine` |
| `whitespace-break-spaces` | `whitespaceBreakSpaces` |
| `break-normal` | `breakNormal` |
| `break-words` | `breakWords` |
| `break-all` | `breakAll` |
| `break-keep` | `breakKeep` |

The letter spacing props are on Text, the title components, Link and Blockquote. Truncation and word breaking also reach List, ListItem and several form parts.

### List markers

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `list-disc` | `listDisc` |
| `list-decimal` | `listDecimal` |
| `list-[circle]` | `listCircle` |
| `list-[square]` | `listSquare` |
| `list-[lower-alpha]` | `listLowerAlpha` |
| `list-[lower-roman]` | `listLowerRoman` |
| `list-inside` | `listInside` |
| `list-outside` | `listOutside` |

## Borders and border radius

| Tailwind CSS class | VaneUI prop | Notes |
|--------------------|-------------|-------|
| `border` | `border` | Width from the `--bw` variable, color from the appearance |
| `border-t` | `borderT` | |
| `border-b` | `borderB` | |
| `border-l` | `borderL` | |
| `border-r` | `borderR` | |
| `border-x` | `borderX` | |
| `border-y` | `borderY` | |
| `border-s` | `borderStart` | Flips under `dir="rtl"` |
| `border-e` | `borderEnd` | Flips under `dir="rtl"` |
| `border-0` | `noBorder` | |
| `rounded-*` | `rounded` | Size-driven, the default shape |
| `rounded-full` | `pill` | |
| `rounded-none` | `sharp` | |

Side props combine: `borderT borderB` draws both lines, and `noBorder` removes every side. A border color class has no prop; `strongBorder` switches to the stronger border color of the component's appearance.

## Shadows, rings and focus outlines

| Tailwind CSS class | VaneUI prop | Notes |
|--------------------|-------------|-------|
| `shadow-*` | `shadow` | Size-driven |
| `shadow-xs` to `shadow-xl` | `shadowXs`, `shadowSm`, `shadowMd`, `shadowLg`, `shadowXl` | A fixed step of VaneUI's shadow scale, whatever the size |
| `shadow-none` | `noShadow` | |
| `ring-1 ring-inset` | `insetRing` | Width from the `--rw` variable |
| `ring-0` | `noInsetRing` | |
| `focus-visible:outline-2 focus-visible:outline-offset-2` | `focusVisible` | Default on Button, Input, Link and the other controls |
| none | `noFocusVisible` | Leaves out the outline classes of `focusVisible` |

## Colors and appearance

No prop sets a single background, text or border color. One appearance prop picks the color family, one variant prop picks how it is applied, and both switch with dark mode:

| Tailwind CSS classes | VaneUI props |
|----------------------|--------------|
| A solid `bg-*` with light `text-*` and a darker `hover:bg-*` | `filled` plus an appearance |
| A light `bg-*` with colored `text-*` and `border-*` | an appearance alone: `outline` is the default variant |
| Colored `text-*` on `bg-transparent`, tinted on hover | `ghost` plus an appearance |
| `bg-transparent` | `transparent` |
| `text-inherit` | `inheritAppearance`, the default on typography |

| Color family | Appearance prop |
|--------------|-----------------|
| Gray, the neutral default | `primary` |
| Light gray, subtle | `secondary` |
| Darker gray, muted | `tertiary` |
| Rose, highlight | `accent` |
| Green, positive | `success` |
| Red, error or destructive | `danger` |
| Amber, caution | `warning` |
| Cyan, informational | `info` |

So `bg-red-600 text-white` on a button becomes `<Button danger filled>`. A `dark:` class has no prop and needs none: the color tokens change when `<html data-theme="dark">` is set, as the [Dark Mode](/docs/customization/dark-mode) page describes.

## Responsive variants

VaneUI's `mobile`, `tablet` and `desktop` breakpoints sit at 48rem, 64rem and 80rem, the same widths as Tailwind's `md`, `lg` and `xl`. The props are desktop-first, so each one matches a `max-*` class:

| Tailwind CSS classes | VaneUI prop |
|----------------------|-------------|
| `max-md:flex-col`, or `flex-col md:flex-row` | `mobileStack` |
| `max-lg:flex-col`, or `flex-col lg:flex-row` | `tabletStack` |
| `max-xl:flex-col`, or `flex-col xl:flex-row` | `desktopStack` |
| `max-md:hidden` | `mobileHide` |
| `max-lg:hidden` | `tabletHide` |
| `max-xl:hidden` | `desktopHide` |
| `md:hidden` | `mobileShow` |
| `lg:hidden` | `tabletShow` |
| `xl:hidden` | `desktopShow` |
| `max-md:w-full` | `mobileWFull` |
| `max-lg:w-full` | `tabletWFull` |
| `max-xl:w-full` | `desktopWFull` |
| `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | `Grid3`, with no prop |
| `p-4 md:p-6 lg:p-12 gap-4 md:gap-6 lg:gap-8` | `Section`, with no prop |

The stack props only change row-direction components, which in practice means Row. A Tailwind CSS v4 build needs `@import "@vaneui/ui/tokens"` for these props to emit any CSS, as the [Installation](/docs/getting-started/installation) page shows. [Responsive Page Sections Without Breakpoint Classes](/docs/guides/responsive-sections) builds a full section with them.

## Cursor, pointer events, images, screen reader text and motion

| Tailwind CSS class | VaneUI prop |
|--------------------|-------------|
| `cursor-pointer` | `cursorPointer` |
| `cursor-default` | `cursorDefault` |
| `cursor-not-allowed` | `cursorNotAllowed` |
| `cursor-none` | `cursorNone` |
| `cursor-text` | `cursorText` |
| `cursor-move` | `cursorMove` |
| `cursor-wait` | `cursorWait` |
| `pointer-events-none` | `pointerEventsNone` |
| `pointer-events-auto` | `pointerEventsAuto` |
| `object-cover` | `objectCover` |
| `object-contain` | `objectContain` |
| `object-fill` | `objectFill` |
| `object-none` | `objectNone` |
| `object-scale-down` | `objectScaleDown` |
| `aspect-square` | `aspectSquare` |
| `aspect-video` | `aspectVideo` |
| `aspect-auto` | `aspectAuto` |
| `sr-only` | `srOnly` |
| `resize-y` | `resizeY`, the Textarea default |
| `resize-x` | `resizeX` |
| `resize` | `resize` |
| `resize-none` | `resizeNone` |
| `field-sizing-content` | `autosize` on Textarea, with a script fallback |
| `transition` | `transition`, with duration and easing from theme variables |
| `transition-none` | `noTransition` |
| `backdrop-blur-*` | `backdropBlur`, with the amount from `--overlay-blur` |
| `h-px w-full` on a rule | Divider, horizontal by default |
| `w-px h-full` on a rule | `vertical` on Divider |

The cursor props are on Button, Badge, Card, the typography components and the form controls, not on Row, Col or Stack. The transition props are on the controls, `object*` on Img and `backdropBlur` on Overlay. The `aspect*` props are on Img, Card, Row, Col and Stack, `srOnly` on the typography components and Label, and the resize props and `autosize` on Textarea.

## Classes with no prop

These stay in `className`:

- Widths and heights other than full, fit, auto and screen: `w-64`, `max-w-3xl`, `min-h-screen`, `size-8`.
- Offsets and stacking order: `top-4`, `inset-0`, `z-10`.
- Grid placement: `col-span-2`, `grid-cols-[200px_1fr]`.
- Margins on the inline sides, or an exact amount: `ml-4`, `me-2`, `mt-[13px]`.
- Gradients, opacity and aspect ratios other than square and 16:9: `aspect-[4/3]`.
- `hover:` and `focus:` styles beyond the states a component already has.

A class you add wins over the theme's class for the same property. The prebuilt `@vaneui/ui/css` stylesheet contains only the utilities VaneUI's own components use, so most of these classes work only in a project with its own Tailwind CSS v4 build; without one, use the `style` prop.
