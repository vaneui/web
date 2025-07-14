'use client'

import { Section, Row, Text } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

export const sectionExamples: DocsComponentExample[] = [
  {
    title: 'Basic Section',
    description: 'A semantic container for grouping related content.',
    component: (
      <Section>
        <Text semibold>Section Title</Text>
        <Text>This is content within a section container.</Text>
      </Section>
    ),
  },
  {
    title: 'Section Sizes',
    description: 'Sections come in different sizes.',
    component: (
      <div className="space-y-4">
        <Section xs>
          <Text semibold>Extra Small Section</Text>
          <Text>Compact section content</Text>
        </Section>
        <Section lg>
          <Text semibold>Large Section</Text>
          <Text>Large section with more space</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section Appearances',
    description: 'Sections can have different background appearances.',
    component: (
      <div className="space-y-4">
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
      </div>
    ),
  },
  {
    title: 'Section Flex Direction',
    description: 'Control the direction of section content.',
    component: (
      <div className="space-y-4">
        <Section column>
          <Text semibold>Column Direction</Text>
          <Text>Content flows vertically</Text>
          <Text>Another line</Text>
        </Section>
        <Section row>
          <Text semibold>Row Direction</Text>
          <Text>Content flows horizontally</Text>
          <Text>Another line</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section with Padding',
    description: 'Control section internal padding.',
    component: (
      <div className="space-y-4">
        <Section padding className="border-2 border-dashed border-gray-300">
          <Text semibold>With Padding</Text>
          <Text>Section with internal padding</Text>
        </Section>
        <Section noPadding className="border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100">
            <Text semibold>No Padding</Text>
            <Text>Section without internal padding</Text>
          </div>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section with Gap',
    description: 'Control spacing between section content.',
    component: (
      <div className="space-y-4">
        <Section gap>
          <Text semibold>With Gap</Text>
          <Text>Content with spacing</Text>
          <Text>Another line</Text>
        </Section>
        <Section noGap>
          <Text semibold>No Gap</Text>
          <Text>Content without spacing</Text>
          <Text>Another line</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section Borders',
    description: 'Control section border appearance.',
    component: (
      <div className="space-y-4">
        <Section border>
          <Text semibold>With Border</Text>
          <Text>Section with border</Text>
        </Section>
        <Section noBorder>
          <Text semibold>No Border</Text>
          <Text>Section without border</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section Shapes',
    description: 'Sections support different border radius styles.',
    component: (
      <div className="space-y-4">
        <Section>
          <Text semibold>Default Rounded</Text>
          <Text>Default rounded corners</Text>
        </Section>
        <Section pill>
          <Text semibold>Pill Shape</Text>
          <Text>Pill-shaped section</Text>
        </Section>
        <Section sharp>
          <Text semibold>Sharp Corners</Text>
          <Text>Sharp cornered section</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section with Shadow',
    description: 'Sections can have drop shadows.',
    component: (
      <div className="space-y-4">
        <Section shadow>
          <Text semibold>With Shadow</Text>
          <Text>Section with drop shadow</Text>
        </Section>
        <Section noShadow>
          <Text semibold>No Shadow</Text>
          <Text>Section without shadow</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section with Ring',
    description: 'Sections can have focus rings.',
    component: (
      <div className="space-y-4">
        <Section ring>
          <Text semibold>With Ring</Text>
          <Text>Section with focus ring</Text>
        </Section>
        <Section noRing>
          <Text semibold>No Ring</Text>
          <Text>Section without ring</Text>
        </Section>
      </div>
    ),
  },
  {
    title: 'Section Reverse',
    description: 'Reverse the order of items in the section.',
    component: (
      <div className="space-y-4">
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
      </div>
    ),
  },
];