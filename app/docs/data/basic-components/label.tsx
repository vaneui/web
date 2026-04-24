'use client'

import { Label, Row, Col, Input, Checkbox, ComponentKeys } from "@vaneui/ui";
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
    md: 'Labels use `inherit` appearance by default — they inherit color from their parent. Set an explicit appearance to override.',
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
  {
    title: 'With Form Elements',
    md: 'Labels pair naturally with inputs and checkboxes for accessible forms.',
    component: (
      <Col>
        <Col noGap>
          <Label semibold>Email Address</Label>
          <Input placeholder="you@example.com" />
        </Col>
        <Col noGap>
          <Label semibold>Password</Label>
          <Input placeholder="Enter password" />
        </Col>
        <Row>
          <Checkbox />
          <Label>Remember me</Label>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Size Propagation',
    md: 'When an `Input` or `Checkbox` is nested inside a `Label`, it automatically picks up the Label\'s size — set it once on the Label and everything scales together. Pass a size on the child to opt out for that one element.',
    component: (
      <Col>
        <Label sm>
          Small field
          <Input placeholder="you@example.com" />
        </Label>
        <Label>
          Default (md) field
          <Input placeholder="you@example.com" />
        </Label>
        <Label lg>
          Large field
          <Input placeholder="you@example.com" />
        </Label>
        <Label xl>
          <Checkbox />
          Extra-large checkbox option
        </Label>
        <Label lg>
          <Checkbox xs />
          Explicit <code>xs</code> checkbox overrides the <code>lg</code> label
        </Label>
      </Col>
    ),
  },
  {
    title: 'Required & Status',
    md: 'Use appearances to indicate field status — `danger` for errors, `success` for valid, `secondary` for hints.',
    component: (
      <Col>
        <Col noGap>
          <Label semibold>Username <Label danger>*</Label></Label>
          <Input placeholder="Choose a username" />
        </Col>
        <Col noGap>
          <Label success semibold>Email verified</Label>
          <Input placeholder="verified@example.com" />
        </Col>
        <Label sm secondary>All fields marked with * are required.</Label>
      </Col>
    ),
  },
];