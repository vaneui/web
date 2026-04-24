'use client'

import { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, Text, Title, Stack, Row, Input, Label, Checkbox } from "@vaneui/ui";
import React, { useState } from "react";
import { DocsPagePart } from '../../types';

function BasicModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack lg>
          <Text bold lg>Confirm Action</Text>
          <Text>Are you sure you want to proceed? This action cannot be undone.</Text>
          <Row justifyEnd>
            <Button sm onClick={() => setOpen(false)}>Cancel</Button>
            <Button sm primary filled onClick={() => setOpen(false)}>Confirm</Button>
          </Row>
        </Stack>
      </Modal>
    </div>
  );
}

function ModalSizesDemo() {
  const [openSm, setOpenSm] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <Row>
      <Button primary onClick={() => setOpenSm(true)}>Small Modal</Button>
      <Button primary onClick={() => setOpenLg(true)}>Large Modal</Button>
      <Modal open={openSm} onClose={() => setOpenSm(false)} sm>
        <Stack>
          <Text bold>Small Modal</Text>
          <Text>Compact content area.</Text>
          <Button sm onClick={() => setOpenSm(false)}>Close</Button>
        </Stack>
      </Modal>
      <Modal open={openLg} onClose={() => setOpenLg(false)} lg>
        <Stack>
          <Text bold>Large Modal</Text>
          <Text>A wider content area for more complex content.</Text>
          <Button sm onClick={() => setOpenLg(false)}>Close</Button>
        </Stack>
      </Modal>
    </Row>
  );
}

function FormModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Open Form Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack lg>
          <Text bold lg>Create Account</Text>
          <Stack>
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </Stack>
          <Stack>
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </Stack>
          <Checkbox>I agree to the terms and conditions</Checkbox>
          <Row justifyEnd>
            <Button sm onClick={() => setOpen(false)}>Cancel</Button>
            <Button sm primary filled onClick={() => setOpen(false)}>Create</Button>
          </Row>
        </Stack>
      </Modal>
    </div>
  );
}

function BlurModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Modal with Blur</Button>
      <Modal open={open} onClose={() => setOpen(false)} overlayProps={{ blur: true }}>
        <Stack lg>
          <Text bold lg>Blurred Background</Text>
          <Text>The overlay behind this modal uses a blur effect.</Text>
          <Button sm primary filled onClick={() => setOpen(false)}>Close</Button>
        </Stack>
      </Modal>
    </div>
  );
}

function NonDismissibleModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Non-dismissible Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeOnOverlayClick={false} closeOnEscape={false}>
        <Stack lg>
          <Text bold lg>Important Notice</Text>
          <Text>This modal cannot be closed by clicking outside or pressing Escape. You must use the button below.</Text>
          <Button sm primary filled onClick={() => setOpen(false)}>I Understand</Button>
        </Stack>
      </Modal>
    </div>
  );
}

function AppearanceModalDemo() {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openDanger, setOpenDanger] = useState(false);
  return (
    <Row>
      <Button primary onClick={() => setOpenPrimary(true)}>Primary Modal</Button>
      <Button danger onClick={() => setOpenDanger(true)}>Danger Modal</Button>
      <Modal open={openPrimary} onClose={() => setOpenPrimary(false)} primary filled>
        <Stack lg>
          <Text bold lg>Primary Modal</Text>
          <Text>This modal uses the primary appearance with filled variant.</Text>
          <Button sm onClick={() => setOpenPrimary(false)}>Close</Button>
        </Stack>
      </Modal>
      <Modal open={openDanger} onClose={() => setOpenDanger(false)} danger filled>
        <Stack lg>
          <Text bold lg>Danger Modal</Text>
          <Text>This modal uses the danger appearance for destructive actions.</Text>
          <Button sm onClick={() => setOpenDanger(false)}>Close</Button>
        </Stack>
      </Modal>
    </Row>
  );
}

function CompoundModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Edit Profile</Button>
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
          <Row justifyEnd>
            <Button sm onClick={() => setOpen(false)}>Cancel</Button>
            <Button sm primary filled onClick={() => setOpen(false)}>Save</Button>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function ConveniencePropsModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Quick Confirmation</Button>
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
        <Text>Are you sure you want to proceed with this action? Click Confirm to continue or Cancel to go back.</Text>
      </Modal>
    </div>
  );
}

function FullScreenModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Full Screen Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} fullScreen>
        <ModalHeader>
          <Title>Full Screen View</Title>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Stack lg>
            <Text>This modal takes up the entire viewport. It has no border-radius and no overlay backdrop. Full-screen modals are useful for immersive experiences, mobile views, or content that needs maximum space.</Text>
            <Text>Click the close button in the header or press Escape to dismiss.</Text>
          </Stack>
        </ModalBody>
      </Modal>
    </div>
  );
}

export const modalExamples: DocsPagePart[] = [
  {
    title: 'Basic Modal',
    md: 'A confirmation dialog with title, text, and action buttons. Modal includes focus trapping, scroll lock, and ARIA attributes (`role="dialog"`, `aria-modal="true"`) by default.\n\nModal defaults: `md` size, `primary` appearance, `outline` variant, `rounded` shape, `shadow`, `border`, `flex column`, `gap`, `padding`, `overflowAuto`.\n\n```tsx\nconst [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open Modal</Button>\n<Modal open={open} onClose={() => setOpen(false)}>\n  <Stack>\n    <Text bold>Confirm Action</Text>\n    <Text>Are you sure?</Text>\n    <Row justifyEnd>\n      <Button onClick={() => setOpen(false)}>Cancel</Button>\n      <Button primary filled onClick={() => setOpen(false)}>Confirm</Button>\n    </Row>\n  </Stack>\n</Modal>\n```',
    component: <BasicModalDemo />,
    code: "",
  },
  {
    title: 'Modal Sizes',
    md: 'Use size props to control the modal content width.\n\n```tsx\n<Modal open={open} onClose={onClose} sm>Small modal</Modal>\n<Modal open={open} onClose={onClose} lg>Large modal</Modal>\n```',
    component: <ModalSizesDemo />,
    code: "",
  },
  {
    title: 'Form Modal',
    md: 'Modals can contain forms with inputs, labels, and checkboxes. Focus trapping keeps Tab navigation within the modal.\n\n```tsx\n<Modal open={open} onClose={onClose}>\n  <Stack>\n    <Label>Name</Label>\n    <Input placeholder="Enter your name" />\n    <Checkbox>I agree to the terms</Checkbox>\n  </Stack>\n</Modal>\n```',
    component: <FormModalDemo />,
    code: "",
  },
  {
    title: 'Blur Overlay',
    md: 'Pass `overlayProps={{ blur: true }}` to add a backdrop blur effect to the overlay behind the modal.\n\n```tsx\n<Modal open={open} onClose={onClose} overlayProps={{ blur: true }}>\n  <Text>Blurred background</Text>\n</Modal>\n```',
    component: <BlurModalDemo />,
    code: "",
  },
  {
    title: 'Non-dismissible Modal',
    md: 'Disable `closeOnOverlayClick` and `closeOnEscape` to prevent closing the modal without explicit user action.\n\n```tsx\n<Modal\n  open={open}\n  onClose={onClose}\n  closeOnOverlayClick={false}\n  closeOnEscape={false}\n>\n  <Text>Must click a button to close</Text>\n</Modal>\n```',
    component: <NonDismissibleModalDemo />,
    code: "",
  },
  {
    title: 'Modal Appearances',
    md: 'Apply appearance and variant props to style the modal content area.\n\n```tsx\n<Modal open={open} onClose={onClose} primary filled>Primary modal</Modal>\n<Modal open={open} onClose={onClose} danger filled>Danger modal</Modal>\n```',
    component: <AppearanceModalDemo />,
    code: "",
  },
  {
    title: 'Compound Modal',
    md: 'Use `ModalHeader`, `ModalBody`, `ModalFooter`, and `ModalCloseButton` for full control over the modal layout. When any of these sub-components are detected as direct children, the modal switches to compound mode and renders them as-is without auto-wrapping.\n\n```tsx\nimport { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, Title, Input, Label, Stack, Row } from "@vaneui/ui";\n\n<Modal open={open} onClose={() => setOpen(false)}>\n  <ModalHeader>\n    <Title>Edit Profile</Title>\n    <ModalCloseButton />\n  </ModalHeader>\n  <ModalBody>\n    <Stack>\n      <Label>Name</Label>\n      <Input placeholder="Enter your name" />\n      <Label>Email</Label>\n      <Input placeholder="Enter your email" />\n    </Stack>\n  </ModalBody>\n  <ModalFooter>\n    <Row justifyEnd>\n      <Button sm onClick={() => setOpen(false)}>Cancel</Button>\n      <Button sm primary filled onClick={() => setOpen(false)}>Save</Button>\n    </Row>\n  </ModalFooter>\n</Modal>\n```',
    component: <CompoundModalDemo />,
    code: "",
  },
  {
    title: 'Convenience Props',
    md: 'Use the `title`, `footer`, and `withCloseButton` shorthand props to quickly set up a structured modal without manually composing sub-components. When `title` is set, a close button is shown by default (controlled by `withCloseButton`). The body content is passed as children.\n\n```tsx\nimport { Modal, Button, Text, Row } from "@vaneui/ui";\n\n<Modal\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Quick Confirmation"\n  footer={\n    <Row justifyEnd>\n      <Button sm onClick={() => setOpen(false)}>Cancel</Button>\n      <Button sm primary filled onClick={() => setOpen(false)}>Confirm</Button>\n    </Row>\n  }\n>\n  <Text>Are you sure you want to proceed?</Text>\n</Modal>\n```',
    component: <ConveniencePropsModalDemo />,
    code: "",
  },
  {
    title: 'Full Screen Modal',
    md: 'Set `fullScreen` to make the modal fill the entire viewport. Full-screen modals have no border-radius (`sharp` is applied automatically) and use a transparent overlay. This is useful for immersive experiences or mobile-optimized views.\n\n```tsx\n<Modal open={open} onClose={() => setOpen(false)} fullScreen>\n  <ModalHeader>\n    <Title>Full Screen View</Title>\n    <ModalCloseButton />\n  </ModalHeader>\n  <ModalBody>\n    <Text>Content fills the entire viewport.</Text>\n  </ModalBody>\n</Modal>\n```',
    component: <FullScreenModalDemo />,
    code: "",
  },
  {
    title: 'Accessibility & Advanced Props',
    md: 'Modal includes built-in accessibility features that are enabled by default. You can customize them as needed:\n\n| Prop | Default | Description |\n|------|---------|-------------|\n| `scrollLock` | `true` | Lock body scroll when modal is open |\n| `focusTrap` | `true` | Trap Tab/Shift+Tab focus inside modal |\n| `returnFocus` | `true` | Return focus to trigger element on close |\n| `initialFocus` | — | Ref to element that receives focus on open |\n| `portal` | `true` | Render in a portal (document.body) |\n| `keepMounted` | `false` | Keep DOM node when closed |\n| `noAnimation` | `false` | Disable enter/exit transitions |\n| `transitionDuration` | `200` | Animation duration in ms |\n\nModal also renders with `role="dialog"` and `aria-modal="true"` automatically.\n\n```tsx\n{/* Custom focus target */}\n<Modal open={open} onClose={onClose} initialFocus={inputRef}>\n  <Input ref={inputRef} placeholder="Auto-focused" />\n</Modal>\n\n{/* Keep mounted for animation or state preservation */}\n<Modal open={open} onClose={onClose} keepMounted transitionDuration={300}>\n  <Text>Stays in DOM when closed</Text>\n</Modal>\n```',
    component: <></>,
    code: "",
  },
];
