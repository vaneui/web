'use client'

import { Text, Col, Card } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const textExamples: DocsPagePart[] = [
  {
    title: 'Basic Text',
    md: 'Default paragraph text styling.',
    component: (
      <Text>Build beautiful user interfaces with VaneUI components. Text provides consistent typography across your application.</Text>
    ),
  },
  {
    title: 'Text Sizes',
    md: 'Text comes in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        <Text sm>Small text for captions and secondary content</Text>
        <Text>Medium text for body content (default)</Text>
        <Text lg>Large text for emphasis</Text>
      </Col>
    ),
  },
  {
    title: 'Text Appearances',
    md: 'Text supports color appearances: `primary`, `secondary`, `success`, `danger`, `warning`, `info`.',
    component: (
      <Col>
        <Text primary>Primary text for important content</Text>
        <Text secondary>Secondary text for supporting content</Text>
        <Text success>Success text for positive feedback</Text>
        <Text danger>Danger text for errors or warnings</Text>
      </Col>
    ),
  },
  {
    title: 'Text Styling',
    md: 'Use `bold`, `semibold`, `italic`, `underline`, `uppercase` and font families: `sans`, `serif`, `mono`.',
    component: (
      <Col>
        <Text bold>Bold text for emphasis</Text>
        <Text semibold>Semibold for subtle emphasis</Text>
        <Text italic>Italic text for quotes or terms</Text>
        <Text underline>Underlined text for links</Text>
        <Text mono>Monospace for code or technical content</Text>
        <Text uppercase>Uppercase for labels</Text>
      </Col>
    ),
  },
  {
    title: 'Text Alignment',
    md: 'Align text with `textLeft`, `textCenter`, `textRight`, `textJustify`.',
    component: (
      <div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
        <Text textLeft>Left aligned (default)</Text>
        <Text textCenter>Center aligned</Text>
        <Text textRight>Right aligned</Text>
      </div>
    ),
  },
  {
    title: 'Text in Context',
    md: 'Combining text properties for real-world use cases.',
    component: (
      <Col>
        <Card>
          <Text lg bold>Product Title</Text>
          <Text secondary>Category • 4.5 ★ (128 reviews)</Text>
          <Text>High-quality component library for building modern web applications with React and TypeScript.</Text>
          <Text sm primary semibold>$99.00</Text>
        </Card>
      </Col>
    ),
  },
];
