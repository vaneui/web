'use client'

import { Card, Row, Text, Title, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

type AppearanceKey = typeof ComponentKeys.appearance[number];
type SizeKey = typeof ComponentKeys.size[number];

const cardContent: Record<SizeKey, {title: string, desc: string}> = {
  xs: { title: 'Getting Started', desc: 'Learn the basics' },
  sm: { title: 'Documentation', desc: 'Read the docs' },
  md: { title: 'Settings', desc: 'Customize your app' },
  lg: { title: 'Dashboard', desc: 'View your data' },
  xl: { title: 'Analytics', desc: 'Track performance' },
};

const appearanceTitles: Record<AppearanceKey, {title: string, desc: string}> = {
  primary: { title: 'Primary Card', desc: 'Uses primary color theme' },
  brand: { title: 'Brand Card', desc: 'Brand identity styling' },
  accent: { title: 'Accent Card', desc: 'Eye-catching accent color' },
  secondary: { title: 'Secondary Card', desc: 'Subtle secondary styling' },
  tertiary: { title: 'Tertiary Card', desc: 'Light tertiary background' },
  success: { title: 'Success Card', desc: 'Indicates positive status' },
  danger: { title: 'Danger Card', desc: 'Signals errors or alerts' },
  warning: { title: 'Warning Card', desc: 'Draws attention to cautions' },
  info: { title: 'Info Card', desc: 'Provides information' },
  link: { title: 'Link Card', desc: 'Link color appearance' },
};

export const cardExamples: DocsPagePart[] = [
  {
    title: 'Basic Card',
    md: 'A simple card container.',
    component: (
      <Card>
        <Title>Welcome to VaneUI</Title>
        <Text>Build beautiful interfaces with ready-to-use components.</Text>
      </Card>
    ),
  },
  {
    title: 'Card Sizes',
    md: 'Cards come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key) => {
            const sizeProps = key !== 'md' ? {[key]: true} : {};
            return (
              <Card key={key} {...{[key]: true}}>
                <Title {...sizeProps}>{cardContent[key].title}</Title>
                <Text {...sizeProps}>{cardContent[key].desc}</Text>
              </Card>
            );
          })
        }
      </Row>
    ),
  },
  {
    title: 'Card Appearances',
    md: 'Cards can have different background appearances.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key) => (
            <Card key={key} {...{[key]: true}}>
              <Title>{appearanceTitles[key].title}</Title>
              <Text>{appearanceTitles[key].desc}</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Borders',
    md: 'Control card border appearance.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.border.map((key) => (
            <Card key={key} {...{[key]: true}}>
              <Title>Project Update</Title>
              <Text>Your project is on track</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Shapes',
    md: 'Cards support different border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Row flexWrap>
        <Card>
          <Title>Rounded Corners</Title>
          <Text>The default card style</Text>
        </Card>
        <Card pill>
          <Title>Pill Shape</Title>
          <Text>Fully rounded corners</Text>
        </Card>
        <Card sharp>
          <Title>Sharp Corners</Title>
          <Text>No border radius</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card with Shadow',
    md: 'Cards can have drop shadows.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shadow.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Title>Elevated Card</Title>
              <Text>This card has a shadow</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card with Ring',
    md: 'Cards can have focus rings.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.ring.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Title>Highlighted Card</Title>
              <Text>This card has a ring</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Padding',
    md: 'Control card internal padding.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.padding.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Title>Padding Example</Title>
              <Text>Different padding styles</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Flex Direction',
    md: 'Control the direction of card content.',
    component: (
      <Row flexWrap>
        <Card>
          <Title>Vertical Layout</Title>
          <Text>Content flows top to bottom</Text>
          <Text>Like this second line</Text>
        </Card>
        <Card row>
          <Title>Horizontal Layout</Title>
          <Text>Content flows left to right</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card with Gap',
    md: 'Control spacing between card content.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.gap.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Title>Spacing Demo</Title>
              <Text>First paragraph</Text>
              <Text>Second paragraph</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Filled and Outline Cards',
    md: 'Cards support filled and outline variants with typography color inheritance.',
    component: (
      <Row flexWrap>
        <Card filled brand lg>
          <Title filled brand>Filled Brand Card</Title>
          <Text filled brand>Solid background with brand color</Text>
        </Card>
        <Card outline success lg>
          <Title success>Outline Success Card</Title>
          <Text success>Border only with success color</Text>
        </Card>
        <Card filled danger lg>
          <Title filled danger>Filled Danger Card</Title>
          <Text filled danger>Solid background with danger color</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Responsive Breakpoints',
    md: 'Cards support responsive breakpoint props: `mobileCol`, `tabletCol`, `desktopCol`. The card switches from row to column layout at the specified breakpoint.',
    component: (
      <Card row mobileCol>
        <div>
          <Title>Product Image</Title>
          <Text secondary>Visual content goes here</Text>
        </div>
        <div>
          <Title>Product Details</Title>
          <Text>On tablets and below, this layout switches to column. Resize your browser to see the effect.</Text>
        </div>
      </Card>
    ),
  },
];
