'use client'

// Live component demos for the landing page component grid
import React, { useState } from 'react';
import {
  Row, Col, Field, Checkbox, Label, Button, Alert, Badge, Switch,
  Table, Thead, Tbody, Tr, Th, Td, RadioGroup, Radio, Menu, MenuItem, Divider, Tooltip, Modal, ModalHeader,
  ModalBody, ModalFooter, ModalCloseButton, Title, Text, NavLink,
} from '@vaneui/ui';
import { BarChart2, Home, Settings, Users } from 'react-feather';

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
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <Title>Delete project?</Title>
          <ModalCloseButton/>
        </ModalHeader>
        <ModalBody>
          <Text>This removes the project and its 12 deployments.</Text>
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOpen(false)}>Cancel</Button>
          <Button danger filled onClick={() => setOpen(false)}>Delete</Button>
        </ModalFooter>
      </Modal>
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
          <Tr><Td>api</Td><Td><Badge success>Up</Badge></Td><Td textRight>42ms</Td></Tr>
          <Tr><Td>auth</Td><Td><Badge warning>Slow</Badge></Td><Td textRight>380ms</Td></Tr>
          <Tr><Td>billing</Td><Td><Badge danger>Down</Badge></Td><Td textRight>none</Td></Tr>
          <Tr><Td>search</Td><Td><Badge success>Up</Badge></Td><Td textRight>65ms</Td></Tr>
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

