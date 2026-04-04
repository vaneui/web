'use client'

import { Text, Col, Card, Row } from "@vaneui/ui";
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
    title: 'Inherit Appearance (Default)',
    md: 'By default, Text uses the `inherit` appearance — it inherits text color from its parent via CSS cascade instead of applying its own color. This means text inside a colored container automatically picks up the parent\'s color.\n\n```tsx\n<Card primary filled>\n  <Text>Inherits primary color from Card</Text>\n</Card>\n<Card success filled>\n  <Text>Inherits success color</Text>\n  <Text danger>Explicit danger overrides inherit</Text>\n</Card>\n```',
    component: (
      <Row flexWrap>
        <Card primary filled>
          <Text bold>Inherited Primary</Text>
          <Text>This text inherits primary from the Card.</Text>
        </Card>
        <Card success filled>
          <Text bold>Inherited Success</Text>
          <Text>Inherits success color automatically.</Text>
          <Text danger>Explicit danger overrides inherit.</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Text Appearances',
    md: 'Text supports explicit color appearances: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`. Use these to override the default `inherit` behavior.',
    component: (
      <Col>
        <Text primary>Primary text for important content</Text>
        <Text brand>Brand text for brand-colored content</Text>
        <Text accent>Accent text for highlights</Text>
        <Text secondary>Secondary text for supporting content</Text>
        <Text tertiary>Tertiary text for muted content</Text>
        <Text success>Success text for positive feedback</Text>
        <Text danger>Danger text for errors or warnings</Text>
        <Text warning>Warning text for cautionary messages</Text>
        <Text info>Info text for informational content</Text>
        <Text link>Link-colored text for clickable content</Text>
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
    title: 'Letter Spacing',
    md: 'Control letter spacing with tracking props: `trackingTighter`, `trackingTight`, `trackingNormal`, `trackingWide`, `trackingWider`, `trackingWidest`.\n\n```tsx\n<Text trackingTight>Tight tracking</Text>\n<Text trackingWide>Wide tracking</Text>\n<Text trackingWidest>Widest tracking</Text>\n```',
    component: (
      <Col>
        <Text trackingTighter>Tighter letter spacing</Text>
        <Text trackingTight>Tight letter spacing</Text>
        <Text trackingNormal>Normal letter spacing (default)</Text>
        <Text trackingWide>Wide letter spacing</Text>
        <Text trackingWider>Wider letter spacing</Text>
        <Text trackingWidest>Widest letter spacing</Text>
      </Col>
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
