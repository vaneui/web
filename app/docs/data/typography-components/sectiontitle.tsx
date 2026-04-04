'use client'

import { SectionTitle, Col, Card, Text, Divider } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const sectionTitleExamples: DocsPagePart[] = [
  {
    title: 'Basic SectionTitle',
    md: 'A medium heading component (renders as `<h2>`) for section headings.',
    component: (
      <SectionTitle>Getting Started</SectionTitle>
    ),
  },
  {
    title: 'SectionTitle Sizes',
    md: 'Section titles come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        <SectionTitle sm>Small Section Title</SectionTitle>
        <SectionTitle>Medium Section Title (default)</SectionTitle>
        <SectionTitle lg>Large Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Appearances',
    md: 'By default, SectionTitle uses the `inherit` appearance — it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `danger` to override.',
    component: (
      <Col>
        <SectionTitle primary>Primary Section Title</SectionTitle>
        <SectionTitle secondary>Secondary Section Title</SectionTitle>
        <SectionTitle success>Success Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Styling',
    md: 'Use `bold`, `semibold`, `italic`, and font families: `sans`, `serif`, `mono`.',
    component: (
      <Col>
        <SectionTitle bold>Bold Section Title</SectionTitle>
        <SectionTitle italic>Italic Section Title</SectionTitle>
        <SectionTitle serif>Serif Font Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'Text Alignment',
    md: 'Align section titles with `textLeft`, `textCenter`, `textRight`.',
    component: (
      <div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
        <SectionTitle textLeft>Left Aligned</SectionTitle>
        <SectionTitle textCenter>Center Aligned</SectionTitle>
        <SectionTitle textRight>Right Aligned</SectionTitle>
      </div>
    ),
  },
  {
    title: 'SectionTitle in Context',
    md: 'Section titles organize content within a page.',
    component: (
      <Card>
        <SectionTitle lg primary>Installation</SectionTitle>
        <Text>Install VaneUI using npm or yarn.</Text>
        <SectionTitle lg primary>Usage</SectionTitle>
        <Text>Import components and start building.</Text>
      </Card>
    ),
  },
  {
    title: 'Section Header Pattern',
    md: 'Combine SectionTitle with Divider and content for a structured section.',
    component: (
      <Col>
        <SectionTitle primary>Getting Started</SectionTitle>
        <Divider />
        <Text>Follow the steps below to set up your project.</Text>
        <SectionTitle primary>Configuration</SectionTitle>
        <Divider />
        <Text>Customize the settings to match your requirements.</Text>
      </Col>
    ),
  },
];
