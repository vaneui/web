---
componentKey: modal
importPath: 'import { Modal } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/modal/Modal.tsx
since: 0.9.0
---

An accessible dialog component with focus trapping, scroll lock, and keyboard navigation. It layers a dialog surface over its own portal-rendered backdrop (the same mechanics as Overlay), with ARIA `role="dialog"` and `aria-modal="true"`. Sub-components: `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalCloseButton`.

## When to use

- Confirmations for destructive or non-reversible actions.
- Multi-step or focused forms that should block interaction with the page behind.
- Detail views that need to escape the surrounding layout (full-screen image, video player).
- Required acknowledgements where dismissal must be intentional (`closeOnOverlayClick={false}`).

### When NOT to use

- For passive notifications, toasts, or status messages: these should not block the user.
- For inline disclosure of additional details: prefer `Popup` or an expandable section.

## Customizing

Set app-wide Modal defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Modal } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  modal: { content: { lg: true, border: true } },
}}>
  <Modal open={open} onClose={onClose}>Content</Modal>
</ThemeProvider>
```

## Basic Modal

A controlled modal opened by a Button. The Modal portals to `document.body`, traps focus inside the dialog while open, locks body scroll, and closes on overlay click or `Escape`.

Modal content defaults: `md`, `primary`, `outline`, `rounded`, `shadow`, `flex column`, `gap`, `wFull`, `overflowAuto`, `relative`, `noPadding` (sub-components own their own padding).

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} onClose={() => setOpen(false)}>
  <Stack>
    <Text bold>Confirm Action</Text>
    <Text>Are you sure?</Text>
    <Row justifyEnd>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button primary filled onClick={() => setOpen(false)}>Confirm</Button>
    </Row>
  </Stack>
</Modal>
```

## Compound Modal

Use `ModalHeader`, `ModalBody`, `ModalFooter`, and `ModalCloseButton` for full control over layout. When any of these are direct children, Modal renders them as-is without auto-wrapping. Each sub-component carries its own layout defaults:

- `ModalHeader`: `flex row`, `itemsCenter`, `justifyBetween`, `gap`, `padding`
- `ModalBody`: `flex column`, `gap`, `padding`, `overflowAuto`
- `ModalFooter`: `flex row`, `itemsCenter`, `justifyEnd`, `gap`, `padding`
- `ModalCloseButton`: `secondary`, `transparent`, `noShadow`, `noRing`

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, Title, Input, Label, Stack } from "@vaneui/ui";

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <Title>Edit Profile</Title>
    <ModalCloseButton />
  </ModalHeader>
  <ModalBody>
    <Stack>
      <Label>Name</Label>
      <Input placeholder="Enter your name" />
      <Label>Email</Label>
      <Input placeholder="Enter your email" />
    </Stack>
  </ModalBody>
  <ModalFooter>
    <Button sm onClick={() => setOpen(false)}>Cancel</Button>
    <Button sm primary filled onClick={() => setOpen(false)}>Save</Button>
  </ModalFooter>
</Modal>
```

## Convenience props

Use the `title`, `footer`, and `withCloseButton` shorthand props to compose a structured modal without writing sub-components. A close button is shown by default regardless of `title` (toggle with `withCloseButton`): with a title it sits in the header, without one it floats top-right. Children become the body.

```tsx
import { Modal, Button, Text, Row } from "@vaneui/ui";

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Quick Confirmation"
  footer={
    <Row justifyEnd>
      <Button sm onClick={() => setOpen(false)}>Cancel</Button>
      <Button sm primary filled onClick={() => setOpen(false)}>Confirm</Button>
    </Row>
  }
>
  <Text>Are you sure you want to proceed?</Text>
</Modal>
```

## Confirmation dialog

A common pattern is a destructive action that requires explicit confirmation. Disable `closeOnOverlayClick` so users can't dismiss accidentally by clicking outside.

```tsx
const [open, setOpen] = useState(false);

<Button danger filled onClick={() => setOpen(true)}>Delete Account</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  closeOnOverlayClick={false}
  title="Delete account?"
  footer={
    <Row justifyEnd>
      <Button sm onClick={() => setOpen(false)}>Cancel</Button>
      <Button sm danger filled onClick={() => setOpen(false)}>Delete</Button>
    </Row>
  }
>
  <Text>This action is permanent and cannot be undone.</Text>
</Modal>
```

## Form Modal

Modals can host forms. Focus trapping keeps `Tab` / `Shift+Tab` navigation inside the modal, and pressing `Escape` closes it (unless disabled). Use `initialFocus` to direct keyboard focus to a specific field on open.

```tsx
const [open, setOpen] = useState(false);
const nameRef = useRef<HTMLInputElement>(null);

<Button onClick={() => setOpen(true)}>Edit Profile</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  initialFocus={nameRef}
  title="Edit Profile"
  footer={
    <Row justifyEnd>
      <Button sm onClick={() => setOpen(false)}>Cancel</Button>
      <Button sm primary filled onClick={() => setOpen(false)}>Save</Button>
    </Row>
  }
>
  <Stack>
    <Label>Name</Label>
    <Input ref={nameRef} placeholder="Enter your name" />
    <Label>Email</Label>
    <Input type="email" placeholder="you@example.com" />
    <Checkbox>Send me email updates</Checkbox>
  </Stack>
</Modal>
```

## Modal sizes

Size props control modal content width via the `--fs-unit` / `--py-unit` / `--br-unit` chain. Font-size, padding, gap, and border-radius all scale together.

```tsx
<Modal open={open} onClose={onClose} sm>Small modal</Modal>
<Modal open={open} onClose={onClose} lg>Large modal</Modal>
```

## Modal appearances

Apply appearance and variant props to style the content surface (border, text, background).

```tsx
<Modal open={open} onClose={onClose} primary filled>Primary modal</Modal>
<Modal open={open} onClose={onClose} danger filled>Danger modal</Modal>
```

## Blur overlay

Pass `overlayProps={{ blur: true }}` to add a backdrop-filter blur behind the modal.

```tsx
<Modal open={open} onClose={onClose} overlayProps={{ blur: true }}>
  <Text>Blurred background</Text>
</Modal>
```

## Non-dismissible Modal

Disable `closeOnOverlayClick` and `closeOnEscape` to force the user to take an explicit action (typically a button in the footer) before the modal can close.

```tsx
<Modal
  open={open}
  onClose={onClose}
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  <Text>Must click a button to close</Text>
</Modal>
```

## Full-screen Modal

Set `fullScreen` to make the modal fill the entire viewport. Full-screen modals have no border-radius (`sharp` is applied automatically) and use a transparent overlay, useful for immersive experiences or mobile-optimized views.

```tsx
<Modal open={open} onClose={() => setOpen(false)} fullScreen>
  <ModalHeader>
    <Title>Full Screen View</Title>
    <ModalCloseButton />
  </ModalHeader>
  <ModalBody>
    <Text>Content fills the entire viewport.</Text>
  </ModalBody>
</Modal>
```

## Accessibility and advanced props

Modal ships accessibility features enabled by default. The dialog renders with `role="dialog"` and `aria-modal="true"`, and is automatically wired with `aria-labelledby` (when `ModalHeader` is used) and `aria-describedby` (when `ModalBody` is used).

| Prop | Default | Description |
|------|---------|-------------|
| `scrollLock` | `true` | Lock body scroll when modal is open |
| `focusTrap` | `true` | Trap `Tab` / `Shift+Tab` focus inside the modal |
| `returnFocus` | `true` | Return focus to the trigger element on close |
| `initialFocus` |   | Ref to the element that should receive focus on open |
| `portal` | `true` | Render via portal into `document.body` |
| `keepMounted` | `false` | Keep DOM node mounted when closed |
| `noAnimation` | `false` | Disable enter/exit transitions |
| `transitionDuration` | `200` | Animation duration in ms |

```tsx
{/* Custom focus target */}
<Modal open={open} onClose={onClose} initialFocus={inputRef}>
  <Input ref={inputRef} placeholder="Auto-focused" />
</Modal>

{/* Keep mounted for animation or state preservation */}
<Modal open={open} onClose={onClose} keepMounted transitionDuration={300}>
  <Text>Stays in DOM when closed</Text>
</Modal>
```
