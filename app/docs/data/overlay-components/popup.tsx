'use client'

import { Popup, PopupTrigger, Button, Card, Text, Stack, Row, Input } from "@vaneui/ui";
import React, { useState, useRef } from "react";
import { DocsPagePart } from '../../types';

function BasicPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)}>Toggle Popup</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
        <Card sm shadow>
          <Stack sm>
            <Text bold>Popup Content</Text>
            <Text sm>This popup appears below the button.</Text>
          </Stack>
        </Card>
      </Popup>
    </div>
  );
}

function PlacementPopupDemo() {
  const [openPlacement, setOpenPlacement] = useState<string | null>(null);
  const topRef = useRef<HTMLButtonElement>(null);
  const bottomRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);

  const placements = [
    { key: 'top', ref: topRef, label: 'Top' },
    { key: 'bottom', ref: bottomRef, label: 'Bottom' },
    { key: 'left', ref: leftRef, label: 'Left' },
    { key: 'right', ref: rightRef, label: 'Right' },
  ] as const;

  return (
    <Row flexWrap justifyCenter>
      {placements.map(({ key, ref, label }) => (
        <div key={key}>
          <Button
            ref={ref}
            sm
            onClick={() => setOpenPlacement(openPlacement === key ? null : key)}
          >
            {label}
          </Button>
          <Popup
            open={openPlacement === key}
            onClose={() => setOpenPlacement(null)}
            anchorRef={ref}
            {...{[key]: true}}
          >
            <Card sm shadow>
              <Text sm>Placement: {key}</Text>
            </Card>
          </Popup>
        </div>
      ))}
    </Row>
  );
}

function MatchWidthPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)} style={{ width: 250 }}>
        Select an option
      </Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} matchWidth>
        <Card sm shadow>
          <Stack noGap>
            <Button sm secondary noShadow noRing justifyStart onClick={() => setOpen(false)}>Option 1</Button>
            <Button sm secondary noShadow noRing justifyStart onClick={() => setOpen(false)}>Option 2</Button>
            <Button sm secondary noShadow noRing justifyStart onClick={() => setOpen(false)}>Option 3</Button>
          </Stack>
        </Card>
      </Popup>
    </div>
  );
}

function PopupWithContentDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)}>User Menu</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
        <Card shadow>
          <Stack>
            <Text bold>John Doe</Text>
            <Text sm secondary>john@example.com</Text>
            <Row sm>
              <Button sm>Profile</Button>
              <Button sm>Settings</Button>
              <Button sm danger onClick={() => setOpen(false)}>Sign Out</Button>
            </Row>
          </Stack>
        </Card>
      </Popup>
    </div>
  );
}

function PopupTriggerClickDemo() {
  return (
    <PopupTrigger popup={<Card sm shadow><Text sm>Click-triggered popup</Text></Card>}>
      <Button>Click Me</Button>
    </PopupTrigger>
  );
}

function PopupTriggerHoverDemo() {
  return (
    <PopupTrigger trigger="hover" openDelay={200} popup={<Card sm shadow><Text sm>Tooltip text</Text></Card>}>
      <Button>Hover Me</Button>
    </PopupTrigger>
  );
}

function PopupTriggerFocusDemo() {
  return (
    <PopupTrigger trigger="focus" popup={<Card sm shadow><Stack sm><Text sm>Search suggestions...</Text><Text sm secondary>Try &ldquo;Button&rdquo; or &ldquo;Card&rdquo;</Text></Stack></Card>}>
      <Input placeholder="Search components..." />
    </PopupTrigger>
  );
}

function PopupWithArrowDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)}>Toggle Arrow Popup</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} arrow>
        <Card sm shadow>
          <Text sm>This popup has an arrow pointing to its anchor.</Text>
        </Card>
      </Popup>
    </div>
  );
}

function AllPlacementsDemo() {
  const [openPlacement, setOpenPlacement] = useState<string | null>(null);

  const topStartRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);
  const topEndRef = useRef<HTMLButtonElement>(null);
  const bottomStartRef = useRef<HTMLButtonElement>(null);
  const bottomRef = useRef<HTMLButtonElement>(null);
  const bottomEndRef = useRef<HTMLButtonElement>(null);
  const leftStartRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const leftEndRef = useRef<HTMLButtonElement>(null);
  const rightStartRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const rightEndRef = useRef<HTMLButtonElement>(null);

  const placements = [
    { key: 'topStart', ref: topStartRef, label: 'topStart' },
    { key: 'top', ref: topRef, label: 'top' },
    { key: 'topEnd', ref: topEndRef, label: 'topEnd' },
    { key: 'bottomStart', ref: bottomStartRef, label: 'bottomStart' },
    { key: 'bottom', ref: bottomRef, label: 'bottom' },
    { key: 'bottomEnd', ref: bottomEndRef, label: 'bottomEnd' },
    { key: 'leftStart', ref: leftStartRef, label: 'leftStart' },
    { key: 'left', ref: leftRef, label: 'left' },
    { key: 'leftEnd', ref: leftEndRef, label: 'leftEnd' },
    { key: 'rightStart', ref: rightStartRef, label: 'rightStart' },
    { key: 'right', ref: rightRef, label: 'right' },
    { key: 'rightEnd', ref: rightEndRef, label: 'rightEnd' },
  ] as const;

  return (
    <Row flexWrap justifyCenter>
      {placements.map(({ key, ref, label }) => (
        <div key={key}>
          <Button
            ref={ref}
            xs
            onClick={() => setOpenPlacement(openPlacement === key ? null : key)}
          >
            {label}
          </Button>
          <Popup
            open={openPlacement === key}
            onClose={() => setOpenPlacement(null)}
            anchorRef={ref}
            {...{ [key]: true }}
          >
            <Card sm shadow>
              <Text sm>Placement: {label}</Text>
            </Card>
          </Popup>
        </div>
      ))}
    </Row>
  );
}

export const popupExamples: DocsPagePart[] = [
  {
    title: 'Basic Popup',
    md: 'A floating element anchored to a button. Closes on outside click or Escape.\n\n> **Browser support:** Popup uses the CSS Anchor Positioning API (Chrome 125+, Edge 125+). Other browsers may need a polyfill.\n\n```tsx\nconst [open, setOpen] = useState(false);\nconst anchorRef = useRef<HTMLButtonElement>(null);\n\n<Button ref={anchorRef} onClick={() => setOpen(!open)}>Toggle</Button>\n<Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>\n  <Card>Popup content</Card>\n</Popup>\n```',
    component: <BasicPopupDemo />,
    code: "",
  },
  {
    title: 'Placement Options',
    md: 'Use the `placement` prop to position the popup. Supports `top`, `bottom`, `left`, `right` and their `-start`/`-end` variants (12 total). Default is `bottom-start`.\n\n```tsx\n<Popup placement="top" anchorRef={ref} open={open} onClose={onClose}>\n  <Card>Top placement</Card>\n</Popup>\n```',
    component: <PlacementPopupDemo />,
    code: "",
  },
  {
    title: 'Match Anchor Width',
    md: 'Use `matchWidth` to make the popup match the width of its anchor element. Useful for select-like dropdowns.\n\n```tsx\n<Popup matchWidth anchorRef={ref} open={open} onClose={onClose}>\n  <Card>Same width as anchor</Card>\n</Popup>\n```',
    component: <MatchWidthPopupDemo />,
    code: "",
  },
  {
    title: 'Popup with Rich Content',
    md: 'Popups can contain any content including cards, buttons, and other components.\n\n```tsx\n<Popup anchorRef={ref} open={open} onClose={onClose}>\n  <Card shadow>\n    <Stack>\n      <Text bold>User Menu</Text>\n      <Button>Profile</Button>\n      <Button danger>Sign Out</Button>\n    </Stack>\n  </Card>\n</Popup>\n```',
    component: <PopupWithContentDemo />,
    code: "",
  },
  {
    title: 'PopupTrigger (Click)',
    md: '`PopupTrigger` is a convenience wrapper that manages open/close state and ref wiring automatically. No need for `useState` or `useRef` — just wrap your trigger element and provide the popup content.\n\nThe default trigger mode is `"click"`, which toggles the popup on click.\n\n```tsx\nimport { PopupTrigger, Button, Card, Text } from "@vaneui/ui";\n\n<PopupTrigger popup={<Card sm shadow><Text sm>Click-triggered popup</Text></Card>}>\n  <Button>Click Me</Button>\n</PopupTrigger>\n```',
    component: <PopupTriggerClickDemo />,
    code: "",
  },
  {
    title: 'PopupTrigger (Hover)',
    md: 'Set `trigger="hover"` to show the popup on mouse enter and hide it on mouse leave. Use `openDelay` to add a delay (in milliseconds) before the popup appears, and `closeDelay` (default: 150ms) before it disappears. This is useful for tooltip-like behavior.\n\n```tsx\n<PopupTrigger\n  trigger="hover"\n  openDelay={200}\n  popup={<Card sm shadow><Text sm>Tooltip text</Text></Card>}\n>\n  <Button>Hover Me</Button>\n</PopupTrigger>\n```',
    component: <PopupTriggerHoverDemo />,
    code: "",
  },
  {
    title: 'PopupTrigger (Focus)',
    md: 'Set `trigger="focus"` to show the popup when the trigger element receives focus and hide it on blur. Useful for search autocomplete, input hints, and accessible dropdown suggestions.\n\n```tsx\n<PopupTrigger\n  trigger="focus"\n  popup={<Card sm shadow><Text sm>Search suggestions...</Text></Card>}\n>\n  <Input placeholder="Search..." />\n</PopupTrigger>\n```',
    component: <PopupTriggerFocusDemo />,
    code: "",
  },
  {
    title: 'Popup with Arrow',
    md: 'Use the `arrow` prop to display a small pointer/arrow on the popup that visually connects it to its anchor element. This is especially useful for tooltip-style popups where you want a clear visual link between the trigger and content.\n\n```tsx\nconst [open, setOpen] = useState(false);\nconst anchorRef = useRef<HTMLButtonElement>(null);\n\n<Button ref={anchorRef} onClick={() => setOpen(!open)}>Toggle Arrow Popup</Button>\n<Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} arrow>\n  <Card sm shadow>\n    <Text sm>This popup has an arrow pointing to its anchor.</Text>\n  </Card>\n</Popup>\n```',
    component: <PopupWithArrowDemo />,
    code: "",
  },
  {
    title: 'All 12 Placements',
    md: 'Popup supports 12 placement positions via boolean props: `top`, `topStart`, `topEnd`, `bottom`, `bottomStart`, `bottomEnd`, `left`, `leftStart`, `leftEnd`, `right`, `rightStart`, `rightEnd`. Each prop positions the popup relative to the anchor element.\n\n```tsx\n{/* Position above, aligned to start */}\n<Popup topStart anchorRef={ref} open={open} onClose={onClose}>\n  <Card>Top Start</Card>\n</Popup>\n\n{/* Position to the right, centered */}\n<Popup right anchorRef={ref} open={open} onClose={onClose}>\n  <Card>Right</Card>\n</Popup>\n```',
    component: <AllPlacementsDemo />,
    code: "",
  },
  {
    title: 'Advanced Props',
    md: 'Popup supports additional configuration props for fine-tuning behavior:\n\n| Prop | Default | Description |\n|------|---------|-------------|\n| `offset` | `4` | Distance from anchor in pixels |\n| `closeOnEscape` | `true` | Close on Escape key press |\n| `closeOnClickOutside` | `true` | Close when clicking outside |\n| `portal` | `true` | Render in a portal (document.body) |\n| `keepMounted` | `false` | Keep DOM node when closed |\n| `noAnimation` | `false` | Disable enter/exit transitions |\n| `transitionDuration` | `200` | Animation duration in ms |\n| `disabled` | `false` | Prevent popup from opening |\n| `hideWhenDetached` | `false` | Hide when anchor scrolls out of view |\n| `role` | `"dialog"` | ARIA role for accessibility |\n\n```tsx\n<Popup\n  open={open}\n  onClose={onClose}\n  anchorRef={ref}\n  offset={8}\n  noAnimation\n  closeOnEscape={false}\n>\n  <Card>Custom config</Card>\n</Popup>\n```',
    component: <></>,
    code: "",
  },
];
