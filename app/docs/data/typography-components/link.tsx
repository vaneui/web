'use client'

import { Link, Col, Row, Text } from "@vaneui/ui";
import { ExternalLink, FileText, GitHub } from "react-feather";
import React from "react";
import { DocsPagePart } from '../../types';

export const linkExamples: DocsPagePart[] = [
  {
    title: 'Basic Link',
    md: 'A styled anchor element for navigation. Unlike other typography components which default to `inherit`, Link defaults to the `link` appearance (blue color) with `underline`.',
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
    title: 'Link Appearances',
    md: 'Links default to the `link` appearance (blue). Override with: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`.',
    component: (
      <Row flexWrap>
        <Link primary href="#">Primary</Link>
        <Link brand href="#">Brand</Link>
        <Link accent href="#">Accent</Link>
        <Link secondary href="#">Secondary</Link>
        <Link success href="#">Success</Link>
        <Link danger href="#">Danger</Link>
        <Link warning href="#">Warning</Link>
        <Link info href="#">Info</Link>
      </Row>
    ),
  },
  {
    title: 'Link Variants',
    md: 'Use `filled` for solid background links or `outline` for bordered links.',
    component: (
      <Row flexWrap>
        <Link primary filled href="#">Filled Primary</Link>
        <Link success filled href="#">Filled Success</Link>
        <Link danger filled href="#">Filled Danger</Link>
        <Link primary outline href="#">Outline Primary</Link>
        <Link secondary outline href="#">Outline Secondary</Link>
      </Row>
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
  {
    title: 'With Icons',
    md: 'Combine links with icons using Row for visual navigation cues.',
    component: (
      <Col>
        <Row itemsCenter>
          <ExternalLink size={14} />
          <Link href="#">Open in new window</Link>
        </Row>
        <Row itemsCenter>
          <FileText size={14} />
          <Link href="#">View documentation</Link>
        </Row>
        <Row itemsCenter>
          <GitHub size={14} />
          <Link href="#">Source on GitHub</Link>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Sizes in Context',
    md: 'Different link sizes alongside matching text.',
    component: (
      <Col>
        <Text sm>Read the <Link sm href="#">terms and conditions</Link> before proceeding.</Text>
        <Text>Visit our <Link href="#">help center</Link> for more information.</Text>
        <Text lg>Check out the <Link lg href="#">getting started guide</Link> to begin.</Text>
      </Col>
    ),
  },
];
