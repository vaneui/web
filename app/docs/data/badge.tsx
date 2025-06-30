import { Badge, Row } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

export const badgeExamples: DocsComponentExample[] = [
  {
    title: 'Basic Badge',
    description: 'Default badge with default styling.',
    code: `<Badge>Default</Badge>`,
    component: <Badge>Default</Badge>,
  },
  {
    title: 'Badge Sizes',
    description: 'Badges come in different sizes.',
    code: `<Row>
  <Badge xs>XS</Badge>
  <Badge sm>SM</Badge>
  <Badge>MD</Badge>
  <Badge lg>LG</Badge>
  <Badge xl>XL</Badge>
</Row>`,
    component: (
      <Row>
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
    code: `<Row className="flex-wrap">
  <Badge>Default</Badge>
  <Badge primary>Primary</Badge>
  <Badge secondary>Secondary</Badge>
  <Badge accent>Accent</Badge>
  <Badge success>Success</Badge>
  <Badge danger>Danger</Badge>
  <Badge warning>Warning</Badge>
  <Badge info>Info</Badge>
</Row>`,
    component: (
      <Row className="flex-wrap">
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