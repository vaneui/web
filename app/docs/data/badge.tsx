'use client'

import { Badge, Row } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const badgeExamples: DocsComponentExample[] = [
  {
    title: 'Basic Badge',
    description: 'Default badge with default styling.',
    component: <Badge>Default</Badge>,
  },
  {
    title: 'Badge Sizes',
    description: 'Badges come in different sizes.',
    component: (
      <Row flexWrap>
        <Badge xs>XS</Badge>
        <Badge sm>SM</Badge>
        <Badge>MD</Badge>
        <Badge lg>LG</Badge>
        <Badge xl>XL</Badge>
      </Row>
    ),
  },
  {
    title: 'Badge Appearances',
    description: 'Badges come in different appearances to convey purpose.',
    component: (
      <Row flexWrap>
        <Badge>Default</Badge>
        <Badge primary>Primary</Badge>
        <Badge secondary>Secondary</Badge>
        <Badge accent>Accent</Badge>
        <Badge success>Success</Badge>
        <Badge danger>Danger</Badge>
        <Badge warning>Warning</Badge>
        <Badge info>Info</Badge>
      </Row>
    ),
  },
];