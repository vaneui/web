'use client'

import { PageTitle, Col, Card, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const pageTitleExamples: DocsPagePart[] = [
  {
    title: 'Basic PageTitle',
    md: 'A large heading component (renders as `<h1>`) for page titles.',
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
    md: 'Page titles support color appearances: `primary`, `secondary`, `success`, `danger`, etc.',
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
    title: 'PageTitle in Context',
    md: 'Page titles work well as the main heading of a page or section.',
    component: (
      <Card>
        <PageTitle lg primary>Product Documentation</PageTitle>
        <Text secondary>Learn how to use VaneUI components in your projects.</Text>
        <Text>Get started with our comprehensive guides and examples.</Text>
      </Card>
    ),
  },
];
