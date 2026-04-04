'use client'

import { PageTitle, Col, Card, Text, Divider } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const pageTitleExamples: DocsPagePart[] = [
  {
    title: 'Basic PageTitle',
    md: 'A large heading component (renders as `<h1>`) for page titles. Defaults to `semibold` weight and `trackingTight` letter spacing for a compact, impactful look.',
    component: (
      <PageTitle>Welcome to VaneUI</PageTitle>
    ),
  },
  {
    title: 'PageTitle Sizes',
    md: 'Page titles come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        <PageTitle sm>Small Page Title</PageTitle>
        <PageTitle>Medium Page Title (default)</PageTitle>
        <PageTitle lg>Large Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Appearances',
    md: 'By default, PageTitle uses the `inherit` appearance — it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `danger` to override.',
    component: (
      <Col>
        <PageTitle primary>Primary Page Title</PageTitle>
        <PageTitle secondary>Secondary Page Title</PageTitle>
        <PageTitle success>Success Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Styling',
    md: 'Use `bold`, `semibold`, `italic`, and font families: `sans`, `serif`, `mono`.',
    component: (
      <Col>
        <PageTitle bold>Bold Page Title</PageTitle>
        <PageTitle italic>Italic Page Title</PageTitle>
        <PageTitle serif>Serif Font Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'Text Alignment',
    md: 'Align page titles with `textLeft`, `textCenter`, `textRight`.',
    component: (
      <div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
        <PageTitle textLeft>Left Aligned</PageTitle>
        <PageTitle textCenter>Center Aligned</PageTitle>
        <PageTitle textRight>Right Aligned</PageTitle>
      </div>
    ),
  },
  {
    title: 'PageTitle in Context',
    md: 'Page titles work well as the main heading of a page, paired with a subtitle.',
    component: (
      <Card>
        <PageTitle lg primary>Product Documentation</PageTitle>
        <Text secondary>Learn how to use VaneUI components in your projects.</Text>
        <Text>Get started with our comprehensive guides and examples.</Text>
      </Card>
    ),
  },
  {
    title: 'Page Header Pattern',
    md: 'Combine PageTitle with Text and Divider for a complete page header.',
    component: (
      <Col>
        <PageTitle xl>Dashboard</PageTitle>
        <Text lg secondary>Welcome back. Here is an overview of your projects.</Text>
        <Divider />
        <Text>Content goes here...</Text>
      </Col>
    ),
  },
];
