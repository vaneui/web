'use client'

// Live component demos for the landing page component grid
import React, { useState } from 'react';
import {
  Row, Col, Field, Checkbox, Label, Button, Alert, Badge, Switch,
  Table, Thead, Tbody, Tr, Th, Td, RadioGroup, Radio, Menu, MenuItem, Divider, Tooltip, Modal,
  ModalBody, ModalFooter, ModalCloseButton, Title, Text, NavLink, Img, Chip, ThemeProvider, type ThemeDefaults,
} from '@vaneui/ui';
import { BarChart2, Home, Settings, Users } from 'react-feather';

// A solid round close button, readable on top of the photo
const CLOSE_ON_PHOTO: ThemeDefaults = { modal: { closeButton: { pill: true, primary: true, transparent: false, shadow: true } } };

function OverlaysDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Row flexWrap>
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <Divider/>
        <MenuItem danger>Delete</MenuItem>
      </Menu>
      <Tooltip content="Saves without leaving the page">
        <Button>Hover me</Button>
      </Tooltip>
      <Button filled onClick={() => setOpen(true)}>Open dialog</Button>
      <ThemeProvider themeDefaults={CLOSE_ON_PHOTO}>
        <Modal open={open} onClose={() => setOpen(false)} noGap overflowHidden aria-labelledby="visit-title">
          {/* Close button pinned to the dialog's top corner, over the photo; its look comes from CLOSE_ON_PHOTO */}
          <ModalCloseButton aria-label="Close" className="absolute top-3 right-3 z-10"/>
          <Img src="/puppy.png" alt="Oliver, a brown puppy, sitting in dry grass" width={480} height={256}
               sharp wFull className="h-64"/>
          <ModalBody>
            <Col xs>
              <Row sm>
                <Title id="visit-title">Meet Oliver</Title>
                <Chip sm success>Available</Chip>
              </Row>
              <Text sm tertiary>Book a 30-minute visit at the shelter. Bring the family.</Text>
            </Col>
            <Field type="email" label="Your email" placeholder="you@company.com"/>
            <Field select label="Visit day">
              <option>Saturday, 10:00</option>
              <option>Saturday, 14:00</option>
              <option>Sunday, 11:00</option>
            </Field>
          </ModalBody>
          <ModalFooter borderT>
            <Button secondary onClick={() => setOpen(false)}>Maybe later</Button>
            <Button success filled onClick={() => setOpen(false)}>Book a visit</Button>
          </ModalFooter>
        </Modal>
      </ThemeProvider>
    </Row>
  );
}

export const GALLERY_TILES: { name: string; parts: string; href: string; demo: React.ReactNode }[] = [
  {
    name: 'Forms',
    parts: 'Field, Checkbox, Button',
    href: '/docs/form-components/field',
    demo: (
      <Col>
        <Field type="email" label="Email" placeholder="you@company.com"/>
        <Field type="password" label="Password" placeholder="At least 12 characters"/>
        <Label row itemsCenter><Checkbox defaultChecked/> Remember me</Label>
        <Button md filled wFull>Sign in</Button>
      </Col>
    ),
  },
  {
    name: 'Data',
    parts: 'Table, Badge',
    href: '/docs/layout-components/table',
    demo: (
      <Table sm>
        <Thead>
          <Tr><Th scope="col">Service</Th><Th scope="col">Status</Th><Th scope="col" textRight>Latency</Th></Tr>
        </Thead>
        <Tbody>
          <Tr><Td>api</Td><Td><Badge sm success>Up</Badge></Td><Td textRight>42ms</Td></Tr>
          <Tr><Td>auth</Td><Td><Badge sm warning>Slow</Badge></Td><Td textRight>380ms</Td></Tr>
          <Tr><Td>billing</Td><Td><Badge sm danger>Down</Badge></Td><Td textRight>none</Td></Tr>
          <Tr><Td>search</Td><Td><Badge sm success>Up</Badge></Td><Td textRight>65ms</Td></Tr>
        </Tbody>
      </Table>
    ),
  },
  {
    name: 'Feedback and overlays',
    parts: 'Alert, Menu, Tooltip, Modal',
    href: '/docs/basic-components/alert',
    demo: (
      <Col>
        <Alert polite success>Your changes were saved.</Alert>
        <Alert polite danger>The payment failed. Check your card.</Alert>
        <OverlaysDemo/>
      </Col>
    ),
  },
  {
    name: 'Settings',
    parts: 'Switch, Field with select',
    href: '/docs/form-components/switch',
    demo: (
      <Col>
        <Label row itemsCenter><Switch defaultChecked/> Email notifications</Label>
        <Label row itemsCenter><Switch/> Weekly digest</Label>
        <Field select label="Region">
          <option>Cyprus</option>
          <option>Estonia</option>
          <option>Portugal</option>
        </Field>
      </Col>
    ),
  },
  {
    name: 'Choices',
    parts: 'RadioGroup, Radio',
    href: '/docs/form-components/radio',
    demo: (
      <Field label="Plan" description="Change it any time.">
        <RadioGroup name="plan" defaultValue="pro">
          <Label row itemsCenter><Radio value="free"/> Free</Label>
          <Label row itemsCenter><Radio value="pro"/> Pro, $12 a month</Label>
          <Label row itemsCenter><Radio value="team"/> Team</Label>
        </RadioGroup>
      </Field>
    ),
  },
  {
    name: 'Navigation',
    parts: 'NavLink, Badge',
    href: '/docs/basic-components/navlink',
    demo: (
      <Col noGap>
        <NavLink active><Home/> Overview</NavLink>
        <NavLink><BarChart2/> Analytics <Badge sm info>New</Badge></NavLink>
        <NavLink><Users/> Team</NavLink>
        <NavLink><Settings/> Settings</NavLink>
      </Col>
    ),
  },
];

