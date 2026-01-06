'use client'

import { Title, Col, Card, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const titleExamples: DocsPagePart[] = [
  {
    title: 'Basic Title',
    md: 'A heading component (renders as `<h3>`) for section headings.',
    component: (
      <Title>Section Title</Title>
    ),
  },
  {
    title: 'Title Sizes',
    md: 'Titles come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        <Title sm>Small Title</Title>
        <Title>Medium Title (default)</Title>
        <Title lg>Large Title</Title>
        <Title xl>Extra Large Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Appearances',
    md: 'Titles support color appearances: `primary`, `secondary`, `success`, `danger`, etc.',
    component: (
      <Col>
        <Title primary>Primary Title</Title>
        <Title secondary>Secondary Title</Title>
        <Title success>Success Title</Title>
        <Title danger>Danger Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Styling',
    md: 'Use `bold`, `semibold`, `italic`, `underline`, and font families: `sans`, `serif`, `mono`.',
    component: (
      <Col>
        <Title bold>Bold Title</Title>
        <Title italic>Italic Title</Title>
        <Title serif>Serif Font Title</Title>
        <Title mono>Monospace Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Alignment',
    md: 'Align titles with `textLeft`, `textCenter`, `textRight`.',
    component: (
      <div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
        <Title textLeft>Left Aligned</Title>
        <Title textCenter>Center Aligned</Title>
        <Title textRight>Right Aligned</Title>
      </div>
    ),
  },
  {
    title: 'Title in Context',
    md: 'Titles work well with other typography components.',
    component: (
      <Card>
        <Title lg primary bold>Product Features</Title>
        <Text secondary>Everything you need to build modern applications.</Text>
        <Title sm>Performance</Title>
        <Text>Optimized for speed and efficiency.</Text>
        <Title sm>Accessibility</Title>
        <Text>Built with ARIA best practices.</Text>
      </Card>
    ),
  },
];
