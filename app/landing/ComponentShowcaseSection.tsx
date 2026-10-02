'use client'

import { useState } from 'react';
import {
  Section,
  Container,
  Col,
  Row,
  Card,
  Stack,
  Button,
  Input,
  Label,
  Checkbox,
  Title,
  Text,
  SectionTitle,
  List,
  ListItem,
  Blockquote,
  Divider,
  Grid2,
  Menu,
  MenuItem,
  MenuLabel,
  PopupTrigger,
} from '@vaneui/ui';
import { Settings, User, Trash2 } from 'react-feather';
import { CodeBlock } from '../components/CodeBlock';
import { FeatureTitle } from '../components/FeatureTitle';
import { prepareComponentString } from '../utils/stringUtils';
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'basic', label: 'Basic' },
  { id: 'layout', label: 'Layout' },
  { id: 'typography', label: 'Typography' },
  { id: 'overlay', label: 'Overlay' },
];

const basicContent = (
  <>
    <Card lg className="max-w-80">
      <Title sm>Create Account</Title>
      <Col>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" type="email" />
        <Label sm row>
          <Checkbox />
          I agree to the Terms of Service and Privacy Policy
        </Label>
      </Col>
      <Button lg filled success wFull>Sign Up</Button>
    </Card>
  </>
);

const layoutContent = (
  <>
    <Grid2>
      <Card sm>
        <Title>Dashboard</Title>
        <Text secondary sm>Overview of your projects.</Text>
        <Button sm filled>View All</Button>
      </Card>
      <Card sm>
        <Title>Settings</Title>
        <Text secondary sm>Manage your preferences.</Text>
        <Button sm>Configure</Button>
      </Card>
    </Grid2>
    <Card row mobileStack itemsCenter>
      <Col flex1>
        <Title sm>Responsive Layout</Title>
        <Text sm secondary>Cards stack on mobile via mobileStack.</Text>
      </Col>
      <Button filled>Learn More</Button>
    </Card>
  </>
);

const typographyContent = (
  <Col sm>
    <SectionTitle>Getting Started</SectionTitle>
    <Title>Installation Guide</Title>
    <Text>VaneUI components are designed to work together. Import what you need.</Text>
    <Divider />
    <List>
      <ListItem>Install the package</ListItem>
      <ListItem>Import components</ListItem>
      <ListItem>Wrap with ThemeProvider</ListItem>
    </List>
    <Blockquote primary>
      &ldquo;The boolean props API is a game changer.&rdquo;
    </Blockquote>
  </Col>
);

const overlayContent = (
  <Row lg flexWrap>
    <Menu defaultOpen trigger={<Button filled>Actions Menu</Button>}>
      <MenuLabel>Account</MenuLabel>
      <MenuItem><Settings /> Settings</MenuItem>
      <MenuItem><User /> Profile</MenuItem>
      <Divider />
      <MenuItem danger><Trash2 /> Delete</MenuItem>
    </Menu>
    <PopupTrigger triggerOnHover popup={
      <>
        <Title sm>Sarah Chen</Title>
        <Text xs secondary>Lead Engineer · VaneUI Team</Text>
        <Button sm filled wFull>View Profile</Button>
      </>
    }>
      <Button>Hover for Info</Button>
    </PopupTrigger>
  </Row>
);

const tabContent: Record<string, React.ReactNode> = {
  basic: basicContent,
  layout: layoutContent,
  typography: typographyContent,
  overlay: overlayContent,
};

export function ComponentShowcaseSection() {
  const [activeTab, setActiveTab] = useState('basic');

  const content = tabContent[activeTab];

  return (
    <Section xl relative>
      <Container xl>
        <Col xl wFull>
          <FeatureTitle
            icon="Grid"
            title="Component library"
            description="40+ components for layout, typography, forms, and overlays."
          />

          <Stack row pill tertiary xs border className="self-center inset-shadow-xs">
            {tabs.map(tab => (
              <Button sm noInsetRing pill
                key={tab.id}
                filled={activeTab === tab.id}
                outline={activeTab !== tab.id}
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </Stack>

          <Card lg secondary>
            <Row xl tabletStack>
              <Col flexAuto noShrink>
                {content}
              </Col>
              <CodeBlock
                className="shadow-lg flex-auto"
                fileName="Example.tsx"
                language="tsx"
                code={prepareComponentString(content)}
              />
            </Row>
          </Card>
        </Col>
      </Container>
    </Section>
  );
}
