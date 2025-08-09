'use client'

import { Label, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const labelExamples: DocsComponentExample[] = [
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
    md: 'Labels come in different sizes - xs, sm, md, lg, xl.',
    component: (
      <Row flexWrap >
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
      <Row flexWrap >
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
    title: 'With Icons',
    md: 'Labels can include icons or other elements.',
    component: (
      <Row flexWrap >
        <Label xs primary>
          <span className="rounded-full size-3 bg-primary-500 mr-1"/> Extra Small
        </Label>
        <Label sm secondary>
          <span className="rounded-full size-3.5 bg-secondary-500 mr-1"/> Small
        </Label>
        <Label md success>
          <span className="rounded-full size-4 bg-success-500 mr-1.5"/> Medium
        </Label>
        <Label lg warning>
          <span className="rounded-full size-5 bg-warning-500 mr-2"/> Large
        </Label>
        <Label xl danger>
          <span className="rounded-full size-6 bg-danger-500 mr-2"/> Extra Large
        </Label>
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
  {
    title: 'Complex Labels',
    md: 'Labels with multiple elements and custom content.',
    component: (
      <Row flexWrap >
        <Label primary  >
          <span className="mr-1">📊</span> Analytics
        </Label>
        <Label success  >
          <span className="mr-1">✓</span> Completed
        </Label>
        <Label warning   lg>
          <span className="mr-1">⚠️</span> Warning Message
        </Label>
        <Label secondary  >
          Status: <span className="font-bold ml-1">Active</span>
        </Label>
        <Label danger  >
          <span className="size-2 bg-danger-500 rounded-full mr-2 animate-pulse"/>
          Live
        </Label>
      </Row>
    ),
  },
];