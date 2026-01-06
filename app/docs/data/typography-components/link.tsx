'use client'

import { Link, Col, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const linkExamples: DocsPagePart[] = [
  {
    title: 'Basic Link',
    md: 'A styled anchor element for navigation.',
    component: (
      <Link href="#">Click here to learn more</Link>
    ),
  },
  {
    title: 'Link Sizes',
    md: 'Links come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        <Link sm href="#">Small link</Link>
        <Link href="#">Medium link (default)</Link>
        <Link lg href="#">Large link</Link>
      </Col>
    ),
  },
  {
    title: 'Link Styling',
    md: 'Use `bold`, `semibold`, `italic`, and text decorations like `underline` or `noUnderline`.',
    component: (
      <Col>
        <Link bold href="#">Bold link</Link>
        <Link semibold href="#">Semibold link</Link>
        <Link italic href="#">Italic link</Link>
        <Link noUnderline href="#">Link without underline</Link>
      </Col>
    ),
  },
  {
    title: 'Link in Context',
    md: 'Links integrate naturally with other text content.',
    component: (
      <Text>
        Check out our <Link href="#">documentation</Link> to learn more about the features. 
        You can also visit the <Link href="#">GitHub repository</Link> for source code.
      </Text>
    ),
  },
];
