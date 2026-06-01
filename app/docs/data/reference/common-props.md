# Common Props

Layout and utility props shared across most VaneUI components. Documented here once instead of on every component page. Per-component pages link here from the "Layout & utility props" disclosure under their props table.

Component-specific categories are listed on each component's own page because defaults differ. These include **size** (`xs`/`sm`/`md`/`lg`/`xl`), **appearance** (`primary`/`brand`/`accent`/`secondary`/`tertiary`/`success`/`danger`/`warning`/`info`/`link`/`inherit`), **variant** (`filled`/`outline`/`ghost`, default `outline`), **shape** (`pill`/`rounded`/`sharp`, default `rounded`), **padding** (`padding`/`paddingX`/`paddingY`/`noPadding`), **fontWeight**, and **textAlign**. Default **size** is `md`, except `Button`, `NavLink`, `Label`, and `MenuItem` which default to `sm`.

## Hide

Hide elements at specific breakpoint sizes for responsive layouts.

| Prop | Description |
|------|-------------|
| `mobileHide` | Hide element on mobile devices and below (max-mobile: 48rem) |
| `tabletHide` | Hide element on tablet devices and below (max-tablet: 64rem) |
| `desktopHide` | Hide element on desktop devices and below (max-desktop: 80rem) |

## Items

Cross-axis alignment for flex items (align-items). Controls how flex children align perpendicular to the flex direction.

| Prop | Description |
|------|-------------|
| `itemsStart` | Align items to start (top/left) |
| `itemsEnd` | Align items to end (bottom/right) |
| `itemsCenter` | Align items to center |
| `itemsBaseline` | Align items to baseline |
| `itemsStretch` | Stretch items to fill container |

## Justify

Main-axis alignment for flex items (justify-content). Controls how flex children distribute along the flex direction.

| Prop | Description |
|------|-------------|
| `justifyStart` | Pack items toward the start of the main axis |
| `justifyEnd` | Pack items toward the end of the main axis |
| `justifyCenter` | Center items along the main axis |
| `justifyBetween` | Distribute items with space between them |
| `justifyAround` | Distribute items with space around them |
| `justifyEvenly` | Distribute items with equal space around them |
| `justifyStretch` | Stretch items to fill the main axis |
| `justifyBaseline` | Align items along their baseline on main axis |

## Position

CSS positioning property values for controlling element position behavior.

| Prop | Description |
|------|-------------|
| `relative` | Relative positioning |
| `absolute` | Absolute positioning |
| `fixed` | Fixed positioning |
| `sticky` | Sticky positioning |
| `static` | Static positioning |

## Display

CSS display property values for controlling element layout behavior.

| Prop | Description |
|------|-------------|
| `inline` | Inline display - flows with text |
| `block` | Block display - takes full width, new line |
| `inlineBlock` | Inline-block display - inline but with block properties |
| `flex` | Flex display - flexbox container |
| `inlineFlex` | Inline-flex display - inline flexbox container |
| `grid` | Grid display - CSS grid container |
| `inlineGrid` | Inline-grid display - inline grid container |
| `contents` | Contents display - element's box is removed, children display as if parent didn't exist |
| `table` | Table display - behaves like table element |
| `tableCell` | Table-cell display - behaves like td element |
| `hidden` | Hidden display - element is not visible |

## Overflow

Overflow behavior for content that exceeds container bounds.

| Prop | Description |
|------|-------------|
| `overflowAuto` | Auto overflow - show scrollbars if needed |
| `overflowHidden` | Hidden overflow - clip content without scrollbars |
| `overflowClip` | Clip overflow - hard clip without scrollbars |
| `overflowVisible` | Visible overflow - content extends beyond bounds |
| `overflowScroll` | Scroll overflow - always show scrollbars |
| `overflowXAuto` | Auto overflow on X-axis only |
| `overflowYAuto` | Auto overflow on Y-axis only |
| `overflowXHidden` | Hidden overflow on X-axis only |
| `overflowYHidden` | Hidden overflow on Y-axis only |
| `overflowXClip` | Clip overflow on X-axis only |
| `overflowYClip` | Clip overflow on Y-axis only |
| `overflowXVisible` | Visible overflow on X-axis only |
| `overflowYVisible` | Visible overflow on Y-axis only |
| `overflowXScroll` | Scroll overflow on X-axis only |
| `overflowYScroll` | Scroll overflow on Y-axis only |

## Wrap

Flex item wrapping behavior for multiline layouts.

| Prop | Description |
|------|-------------|
| `flexWrap` | Allow flex items to wrap to new lines when container is too narrow |
| `flexNoWrap` | Force flex items to stay on single line (may overflow) |
| `flexWrapReverse` | Wrap flex items in reverse order (last items wrap first) |

## Gap

Spacing between flex/grid items.

| Prop | Description |
|------|-------------|
| `gap` | Enable gap spacing between children |
| `noGap` | Disable gap spacing |

## Flex direction

Flex layout direction for arranging children.

| Prop | Description |
|------|-------------|
| `row` | Flex direction row (horizontal) |
| `column` | Flex direction column (vertical) |
| `rowReverse` | Flex direction row-reverse |
| `columnReverse` | Flex direction column-reverse |

## Reverse

Reverse the order of flex items.

| Prop | Description |
|------|-------------|
| `reverse` | Reverse the order of children |

## Flex

Flex-grow / flex-shrink shorthand for distributing space along the main axis. Mutually exclusive: only one value can be active.

| Prop | Description |
|------|-------------|
| `flex1` | Take up remaining space (`flex: 1 1 0%`); the standard "fill the rest" behavior |
| `flexAuto` | Grow but respect intrinsic content size (`flex: 1 1 auto`) |
| `flexNone` | Don't grow and don't shrink (`flex: none`); fixed-size in a flex container |

## Shrink

Flex-shrink override. Independent toggle so it can be combined with `flex1`/`flexAuto` or used standalone.

| Prop | Description |
|------|-------------|
| `noShrink` | Prevent the item from shrinking below its content size (`shrink-0`); typical for fixed-width sidebars in a flex row |

## Border

Border visibility on component sides.

| Prop | Description |
|------|-------------|
| `border` | Enable border on all sides |
| `borderT` | Enable border on top |
| `borderB` | Enable border on bottom |
| `borderL` | Enable border on left |
| `borderR` | Enable border on right |
| `borderX` | Enable border on left and right |
| `borderY` | Enable border on top and bottom |
| `noBorder` | Disable all borders |

## Shadow

Drop shadow visibility.

| Prop | Description |
|------|-------------|
| `shadow` | Enable drop shadow |
| `noShadow` | Disable drop shadow |

## Ring

Focus ring visibility for keyboard navigation feedback.

| Prop | Description |
|------|-------------|
| `ring` | Enable focus ring |
| `noRing` | Disable focus ring |

## Focus visible

Focus-visible outline visibility for keyboard navigation indicators.

| Prop | Description |
|------|-------------|
| `focusVisible` | Enable focus-visible outline |
| `noFocusVisible` | Disable focus-visible outline |

Default on `Link`, `NavLink`, `MenuItem`. Auto-enabled on components that tag-switch to `<a>` via `href` (`Badge`, `Card`, `Chip`, `Code`, `Row`, `Col`, `Stack`).

## Cursor

Cursor appearance for interactive elements and states.

| Prop | Description |
|------|-------------|
| `cursorPointer` | Pointer cursor - indicates clickable element |
| `cursorDefault` | Default cursor - standard arrow |
| `cursorNotAllowed` | Not-allowed cursor - indicates disabled state |
| `cursorNone` | No cursor - hides the cursor |
| `cursorText` | Text cursor - indicates selectable text |
| `cursorMove` | Move cursor - indicates draggable element |
| `cursorWait` | Wait cursor - indicates loading/processing |

## Transition

Animation effects for state changes.

| Prop | Description |
|------|-------------|
| `transition` | Enable smooth transitions between states |
| `noTransition` | Disable transitions for instant state changes |

## Whitespace

Text wrapping and whitespace behavior.

| Prop | Description |
|------|-------------|
| `whitespaceNowrap` | No wrap - text stays on single line |
| `whitespaceNormal` | Normal wrapping - default browser behavior |
| `whitespacePre` | Preserve whitespace and line breaks |
| `whitespacePreWrap` | Preserve whitespace, wrap text |
| `whitespacePreLine` | Preserve line breaks, collapse spaces, wrap text |
| `whitespaceBreakSpaces` | Break words to prevent overflow |

## Width

Component width sizing.

| Prop | Description |
|------|-------------|
| `wFull` | Set width to 100% |
| `wFit` | Set width to fit-content |
| `wAuto` | Set width to auto |
| `wScreen` | Set width to 100vw (viewport width), removes max-width constraint |

## Height

Component height sizing.

| Prop | Description |
|------|-------------|
| `hFit` | Set height to fit-content |
| `hFull` | Set height to 100% |
| `hAuto` | Set height to auto |
| `hScreen` | Set height to 100vh (viewport height), removes max-height constraint |

## Transparent

Disable background color, making the component transparent.

| Prop | Description |
|------|-------------|
| `transparent` | Disable background color - makes component background transparent |

## Responsive

Enable breakpoint-specific sizing for adaptive layouts.

| Prop | Description |
|------|-------------|
| `responsive` | Enable responsive sizing - uses breakpoint-specific classes for font size, padding, and gap |

## Object fit

Image and video sizing within their containers.

| Prop | Description |
|------|-------------|
| `objectCover` | Cover - image covers container, may be cropped |
| `objectContain` | Contain - image fits inside container, may have letterboxing |
| `objectFill` | Fill - image stretches to fill container |
| `objectNone` | None - image displays at natural size |
| `objectScaleDown` | Scale down - like contain, but never scales up |

## Blur

Backdrop blur effect for overlays and visual effects.

| Prop | Description |
|------|-------------|
| `blur` | Enable backdrop blur effect |
| `noBlur` | Disable backdrop blur effect |

## Pointer events

Element interactivity with the pointer.

| Prop | Description |
|------|-------------|
| `pointerEventsNone` | Disable pointer events - clicks pass through the element |
| `pointerEventsAuto` | Enable pointer events (default browser behavior) |

## Min width

Minimum width constraint for popup and floating components.

| Prop | Description |
|------|-------------|
| `minWidth` | Apply size-dependent minimum width (uses --popup-min-w CSS variable) |

## Max height

Maximum height constraint for components.

| Prop | Description |
|------|-------------|
| `maxHeight` | Apply size-dependent maximum height (uses --max-height CSS variable) |

## Orientation

Horizontal or vertical layout direction for certain components.

| Prop | Description |
|------|-------------|
| `horizontal` | Display as a horizontal line (default) |
| `vertical` | Display as a vertical line instead of horizontal |
