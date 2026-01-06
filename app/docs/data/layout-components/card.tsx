'use client'

import { Card, Row, Col, Text, Title } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const cardExamples: DocsPagePart[] = [
  {
    title: 'Basic Card',
    md: 'A simple card container with default styling.',
    component: (
      <Card>
        <Title>Welcome to VaneUI</Title>
        <Text>Build beautiful interfaces with ready-to-use components.</Text>
      </Card>
    ),
  },
  {
    title: 'Card Sizes',
    md: 'Cards come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Row flexWrap gap>
        <Card sm>
          <Title sm>Small Card</Title>
          <Text sm>Compact content</Text>
        </Card>
        <Card>
          <Title>Medium Card</Title>
          <Text>Default size</Text>
        </Card>
        <Card lg>
          <Title lg>Large Card</Title>
          <Text lg>More spacious</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Appearances',
    md: 'Cards support color appearances: `primary`, `secondary`, `success`, `danger`, `warning`, `info`.',
    component: (
      <Row flexWrap gap>
        <Card primary>
          <Title>Primary</Title>
          <Text>Main action</Text>
        </Card>
        <Card success>
          <Title>Success</Title>
          <Text>Positive status</Text>
        </Card>
        <Card danger>
          <Title>Danger</Title>
          <Text>Error or alert</Text>
        </Card>
        <Card secondary>
          <Title>Secondary</Title>
          <Text>Subtle styling</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Variants',
    md: 'Use `filled` for solid backgrounds, `outline` for bordered cards, and add `shadow` for elevation.',
    component: (
      <Row flexWrap gap>
        <Card filled primary>
          <Title filled primary>Filled Card</Title>
          <Text filled primary>Solid background</Text>
        </Card>
        <Card outline primary>
          <Title primary>Outline Card</Title>
          <Text primary>Border only</Text>
        </Card>
        <Card shadow>
          <Title>Shadow Card</Title>
          <Text>Elevated appearance</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Shapes',
    md: 'Cards support different border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Row flexWrap gap>
        <Card>
          <Title>Rounded</Title>
          <Text>Default style</Text>
        </Card>
        <Card pill>
          <Title>Pill</Title>
          <Text>Fully rounded</Text>
        </Card>
        <Card sharp>
          <Title>Sharp</Title>
          <Text>No radius</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Responsive Layout',
    md: 'Use `row` for horizontal layout and `mobileCol` or `tabletCol` to switch to column on smaller screens.',
    component: (
      <Card row tabletCol gap>
        <Col>
          <Title>Product Image</Title>
          <Text secondary>Visual content area</Text>
        </Col>
        <Col>
          <Title>Product Details</Title>
          <Text>This layout switches to column on tablets and below. Resize to see the effect.</Text>
        </Col>
      </Card>
    ),
  },
];
