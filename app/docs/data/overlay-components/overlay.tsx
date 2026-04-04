'use client'

import { Overlay, Button, Card, Text, Stack, Row } from "@vaneui/ui";
import React, { useState } from "react";
import { DocsPagePart } from '../../types';

function BasicOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Overlay</Button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <Text xl bold filled>Click anywhere to close</Text>
      </Overlay>
    </div>
  );
}

function OverlayWithContentDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Overlay with Content</Button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Overlay Content</Text>
            <Text>This card is centered inside the overlay. Click outside the card to close.</Text>
            <Button primary sm onClick={() => setOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
    </div>
  );
}

function BlurOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Blur Overlay</Button>
      <Overlay open={open} onClose={() => setOpen(false)} blur>
        <Text xl bold filled>Blurred Background</Text>
      </Overlay>
    </div>
  );
}

function NonDismissibleOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Loading Overlay</Button>
      <Overlay open={open} pointerEventsNone>
        <Stack itemsCenter>
          <Text xl bold filled>Loading...</Text>
          <Button sm danger onClick={() => setOpen(false)} style={{ pointerEvents: 'auto' }}>Cancel</Button>
        </Stack>
      </Overlay>
    </div>
  );
}

function TransparentOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Transparent Overlay</Button>
      <Overlay open={open} onClose={() => setOpen(false)} transparent>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Transparent Overlay</Text>
            <Text>The overlay is invisible but still captures clicks outside this card to dismiss.</Text>
            <Button primary sm onClick={() => setOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
    </div>
  );
}

function CustomAnimationDurationDemo() {
  const [slowOpen, setSlowOpen] = useState(false);
  const [instantOpen, setInstantOpen] = useState(false);
  return (
    <div>
      <Row>
        <Button primary onClick={() => setSlowOpen(true)}>Slow Fade (500ms)</Button>
        <Button primary onClick={() => setInstantOpen(true)}>No Animation</Button>
      </Row>
      <Overlay open={slowOpen} onClose={() => setSlowOpen(false)} transitionDuration={500}>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Slow Transition</Text>
            <Text>This overlay fades in and out over 500ms.</Text>
            <Button primary sm onClick={() => setSlowOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
      <Overlay open={instantOpen} onClose={() => setInstantOpen(false)} noAnimation>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Instant Overlay</Text>
            <Text>This overlay appears and disappears instantly with no animation.</Text>
            <Button primary sm onClick={() => setInstantOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
    </div>
  );
}

export const overlayExamples: DocsPagePart[] = [
  {
    title: 'Basic Overlay',
    md: 'A fullscreen semi-transparent backdrop. Click the overlay to close it.\n\n```tsx\nconst [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Show Overlay</Button>\n<Overlay open={open} onClose={() => setOpen(false)}>\n  <Text>Click anywhere to close</Text>\n</Overlay>\n```',
    component: <BasicOverlayDemo />,
    code: "",
  },
  {
    title: 'Overlay with Content',
    md: 'Place content inside the overlay. Use `e.stopPropagation()` on inner elements to prevent closing when clicking them.\n\n```tsx\n<Overlay open={open} onClose={() => setOpen(false)}>\n  <Card onClick={(e) => e.stopPropagation()}>\n    <Text>Overlay content here</Text>\n  </Card>\n</Overlay>\n```',
    component: <OverlayWithContentDemo />,
    code: "",
  },
  {
    title: 'Blur Effect',
    md: 'Add `blur` for a backdrop-filter blur effect behind the overlay.\n\n```tsx\n<Overlay open={open} onClose={() => setOpen(false)} blur>\n  <Text>Blurred Background</Text>\n</Overlay>\n```',
    component: <BlurOverlayDemo />,
    code: "",
  },
  {
    title: 'Non-dismissible Overlay',
    md: 'Use `pointerEventsNone` for loading states where the overlay should not be closable by clicking.\n\n```tsx\n<Overlay open={open} pointerEventsNone>\n  <Text>Loading...</Text>\n</Overlay>\n```',
    component: <NonDismissibleOverlayDemo />,
    code: "",
  },
  {
    title: 'Transparent Overlay',
    md: 'Use the `transparent` prop to create an invisible overlay that still captures clicks. This is useful for click-away dismissal without visually dimming the page background.\n\n```tsx\nconst [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Show Transparent Overlay</Button>\n<Overlay open={open} onClose={() => setOpen(false)} transparent>\n  <Card>\n    <Text>Content on a transparent overlay</Text>\n    <Button onClick={() => setOpen(false)}>Close</Button>\n  </Card>\n</Overlay>\n```',
    component: <TransparentOverlayDemo />,
    code: "",
  },
  {
    title: 'Custom Animation Duration',
    md: 'Control how the overlay transitions in and out. Use `transitionDuration` to set a custom duration in milliseconds (default is 200ms), or use `noAnimation` to disable transitions entirely for an instant open/close.\n\n```tsx\n{/* Slow fade — 500ms */}\n<Overlay open={open} onClose={onClose} transitionDuration={500}>\n  <Card>Slow transition content</Card>\n</Overlay>\n\n{/* Instant — no animation */}\n<Overlay open={open} onClose={onClose} noAnimation>\n  <Card>Instant content</Card>\n</Overlay>\n```',
    component: <CustomAnimationDurationDemo />,
    code: "",
  },
];
