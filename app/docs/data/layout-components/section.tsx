'use client'

import { Section, Text, Col, Title } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const sectionExamples: DocsPagePart[] = [
  {
    title: 'Basic Section',
    md: 'A semantic container for grouping related page content with automatic padding.',
    component: (
      <Section border>
        <Title>Welcome Section</Title>
        <Text>This is content within a section container. Sections provide consistent vertical rhythm.</Text>
      </Section>
    ),
  },
  {
    title: 'Section Sizes',
    md: 'Sections come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl` - controlling padding and spacing.',
    component: (
      <Col>
        <Section sm border>
          <Text semibold>Small Section</Text>
          <Text>Compact padding</Text>
        </Section>
        <Section border>
          <Text semibold>Medium Section (default)</Text>
          <Text>Standard padding</Text>
        </Section>
        <Section lg border>
          <Text semibold>Large Section</Text>
          <Text>Generous padding</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Appearances',
    md: 'Sections can have color appearances: `primary`, `secondary`, `success`, `danger`, etc.',
    component: (
      <Col>
        <Section primary>
          <Text semibold>Primary Section</Text>
          <Text>Highlighted content area</Text>
        </Section>
        <Section success>
          <Text semibold>Success Section</Text>
          <Text>Positive feedback area</Text>
        </Section>
        <Section danger>
          <Text semibold>Danger Section</Text>
          <Text>Warning or error area</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Variants',
    md: 'Use `filled` for solid backgrounds, `outline` for bordered sections, and `shadow` for elevation.',
    component: (
      <Col>
        <Section filled primary>
          <Title filled primary>Filled Section</Title>
          <Text filled primary>Solid background with primary color</Text>
        </Section>
        <Section outline secondary>
          <Title secondary>Outline Section</Title>
          <Text secondary>Border only styling</Text>
        </Section>
        <Section shadow>
          <Title>Shadow Section</Title>
          <Text>Elevated with drop shadow</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Layout',
    md: 'Use `row` for horizontal layout, `gap` for spacing between children, and `noPadding` to remove internal padding.',
    component: (
      <Col>
        <Section row gap border>
          <Text semibold>Row Layout</Text>
          <Text>Content flows horizontally</Text>
          <Text>With gap between items</Text>
        </Section>
        <Section gap border>
          <Text semibold>Column Layout (default)</Text>
          <Text>Content flows vertically</Text>
          <Text>With gap between items</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Responsive Breakpoints',
    md: 'Use `mobileCol` or `tabletCol` to switch from row to column layout on smaller screens.',
    component: (
      <Section row tabletCol gap border>
        <Col>
          <Title>Left Content</Title>
          <Text>Switches to stacked layout on tablets and below.</Text>
        </Col>
        <Col>
          <Title>Right Content</Title>
          <Text>Resize your browser to see the responsive behavior.</Text>
        </Col>
      </Section>
    ),
  },
];
