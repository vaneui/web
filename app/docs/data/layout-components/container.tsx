'use client'

import { Container, Col, Text, Title } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const containerExamples: DocsPagePart[] = [
  {
    title: 'Basic Container',
    md: 'A centered content wrapper with max-width constraint.',
    component: (
      <Container>
        <Title>Page Content</Title>
        <Text>Container centers content and constrains width for optimal readability.</Text>
      </Container>
    ),
  },
  {
    title: 'Container Sizes',
    md: 'Containers come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col gap>
        <Container sm border>
          <Text semibold>Small Container</Text>
          <Text>Narrower max-width</Text>
        </Container>
        <Container lg border>
          <Text semibold>Large Container</Text>
          <Text>Wider max-width for more content</Text>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container Appearances',
    md: 'Containers support color appearances: `primary`, `secondary`, `success`, `danger`, etc.',
    component: (
      <Col gap>
        <Container primary>
          <Text semibold>Primary Container</Text>
          <Text>Highlighted content area</Text>
        </Container>
        <Container success>
          <Text semibold>Success Container</Text>
          <Text>Positive feedback area</Text>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container Variants',
    md: 'Use `filled` for solid backgrounds, `outline` for bordered containers, and `shadow` for elevation.',
    component: (
      <Col gap>
        <Container filled primary>
          <Title filled primary>Filled Container</Title>
          <Text filled primary>Solid background with primary color</Text>
        </Container>
        <Container outline secondary>
          <Title secondary>Outline Container</Title>
          <Text secondary>Border only styling</Text>
        </Container>
        <Container shadow>
          <Title>Shadow Container</Title>
          <Text>Elevated with drop shadow</Text>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container Shapes',
    md: 'Containers support different border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Col gap>
        <Container border>
          <Text semibold>Rounded (default)</Text>
        </Container>
        <Container pill border>
          <Text semibold>Pill shape</Text>
        </Container>
        <Container sharp border>
          <Text semibold>Sharp corners</Text>
        </Container>
      </Col>
    ),
  },
];
