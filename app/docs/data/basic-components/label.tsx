'use client'

import { Label, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const labelExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Default label styles and text.',
    component: (
      <Row flexWrap>
        <Label>Default</Label>
        <Label primary>Primary Action</Label>
        <Label secondary>Secondary Info</Label>
        <Label success>Success</Label>
        <Label warning>Warning</Label>
        <Label danger>Error</Label>
      </Row>
    ),
  },
  {
    title: 'Sizes',
    md: 'Labels come in different sizes - `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Label key={key} {...{[key]: true}} primary>
              Label {key}
            </Label>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Appearances',
    md: 'Different label color variants for various states.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Label key={key} {...{[key]: true}}>
              {key} label
            </Label>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Font Weights',
    md: 'Labels support different font weights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Label key={key} {...{[key]: true}} lg>
              {key} weight
            </Label>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Decorations',
    md: 'Labels with different text decorations.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.textDecoration.map((key: string) => (
            <Label key={key} {...{[key]: true}} lg>
              {key} text
            </Label>
          ))
        }
      </Row>
    ),
  },
];