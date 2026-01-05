'use client'

import { Section, Text, Col, ComponentKeys, Title } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const sectionExamples: DocsPagePart[] = [
  {
    title: 'Basic Section',
    md: 'A semantic container for grouping related content.',
    component: (
      <Section>
        <Text semibold>Section Title</Text>
        <Text>This is content within a section container.</Text>
      </Section>
    ),
  },
  {
    title: 'Section Sizes',
    md: 'Sections come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        {
          ComponentKeys.size.map((key: string) => (
            <Section border key={key} {...{[key]: true}}>
              <Text semibold>Section {key}</Text>
              <Text>Section {key} content</Text>
            </Section>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Section Appearances',
    md: 'Sections can have different background appearances.',
    component: (
      <Col lg>
        <Section primary>
          <Text semibold>Primary Section</Text>
          <Text>Section with primary background</Text>
        </Section>
        <Section secondary>
          <Text semibold>Secondary Section</Text>
          <Text>Section with secondary background</Text>
        </Section>
        <Section success>
          <Text semibold>Success Section</Text>
          <Text>Section with success background</Text>
        </Section>
        <Section danger>
          <Text semibold>Danger Section</Text>
          <Text>Section with danger background</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Flex Direction',
    md: 'Control the direction of section content.',
    component: (
      <Col lg>
        <Section border>
          <Text semibold>Default (Column Direction)</Text>
          <Text>Content flows vertically</Text>
          <Text>Another line</Text>
        </Section>
        <Section row border>
          <Text semibold>Row Direction</Text>
          <Text>Content flows horizontally</Text>
          <Text>Another line</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section with Padding',
    md: 'Control section internal padding.',
    component: (
      <Col lg>
        <Section className="border-2 border-dashed border-gray-300">
          <Text semibold>Default (With Padding)</Text>
          <Text>Section with internal padding</Text>
        </Section>
        <Section noPadding className="border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100">
            <Text semibold>No Padding</Text>
            <Text>Section without internal padding</Text>
          </div>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section with Gap',
    md: 'Control spacing between section content.',
    component: (
      <Col lg>
        <Section>
          <Text semibold>Default (With Gap)</Text>
          <Text>Content with spacing</Text>
          <Text>Another line</Text>
        </Section>
        <Section noGap>
          <Text semibold>No Gap</Text>
          <Text>Content without spacing</Text>
          <Text>Another line</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Borders',
    md: 'Control section border appearance.',
    component: (
      <Col lg>
        <Section border>
          <Text semibold>With Border</Text>
          <Text>Section with border</Text>
        </Section>
        <Section noBorder>
          <Text semibold>No Border</Text>
          <Text>Section without border</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Shapes',
    md: 'Sections support different border radius styles.',
    component: (
      <Col lg>
        <Section rounded border>
          <Text semibold>Rounded</Text>
          <Text>Rounded corners</Text>
        </Section>
        <Section pill border>
          <Text semibold>Pill Shape</Text>
          <Text>Pill-shaped section</Text>
        </Section>
        <Section sharp border>
          <Text semibold>Sharp Corners</Text>
          <Text>Sharp cornered section</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section with Shadow',
    md: 'Sections can have drop shadows.',
    component: (
      <Col lg>
        <Section shadow>
          <Text semibold>With Shadow</Text>
          <Text>Section with drop shadow</Text>
        </Section>
        <Section noShadow>
          <Text semibold>No Shadow</Text>
          <Text>Section without shadow</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section with Ring',
    md: 'Sections can have focus rings.',
    component: (
      <Col lg>
        <Section ring>
          <Text semibold>With Ring</Text>
          <Text>Section with focus ring</Text>
        </Section>
        <Section noRing>
          <Text semibold>No Ring</Text>
          <Text>Section without ring</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Section Reverse',
    md: 'Reverse the order of items in the section.',
    component: (
      <Col lg>
        <Section>
          <Text semibold>Normal Order</Text>
          <Text>First item</Text>
          <Text>Second item</Text>
          <Text>Third item</Text>
        </Section>
        <Section reverse>
          <Text semibold>Reverse Order</Text>
          <Text>First item</Text>
          <Text>Second item</Text>
          <Text>Third item</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Filled and Outline Sections',
    md: 'Sections support filled and outline variants with typography color inheritance.',
    component: (
      <Col lg>
        <Section filled primary lg>
          <Title primary>Filled Primary Section</Title>
          <Text primary>Typography inherits primary color from filled section</Text>
        </Section>
        <Section outline secondary lg>
          <Title secondary>Outline Secondary Section</Title>
          <Text secondary>Typography inherits secondary color from outline section</Text>
        </Section>
        <Section filled warning lg>
          <Title warning>Filled Warning Section</Title>
          <Text warning>Typography inherits warning color from section</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Responsive Padding and Gap',
    md: 'By default, sections automatically scale their padding and gap on smaller screens. The `responsive` prop is enabled by default. Disable with `responsive={false}`.',
    component: (
      <Col lg>
        <Section lg border>
          <Text semibold>Responsive Section (default)</Text>
          <Text>Padding and gap scale down on mobile</Text>
        </Section>
        <Section lg responsive={false} border>
          <Text semibold>Non-Responsive Section</Text>
          <Text>Fixed padding and gap across all screens</Text>
        </Section>
      </Col>
    ),
  },
  {
    title: 'Responsive Breakpoints',
    md: 'Sections can switch direction at specific breakpoints using mobileCol, tabletCol, desktopCol.',
    component: (
      <Section mobileCol border>
        <div className="p-4 bg-primary-100 rounded flex-1">
          <Text semibold>Column 1</Text>
          <Text>Switches to column on tablet and below</Text>
        </div>
        <div className="p-4 bg-primary-100 rounded flex-1">
          <Text semibold>Column 2</Text>
          <Text>Resize your browser to see the effect</Text>
        </div>
      </Section>
    ),
  },
];