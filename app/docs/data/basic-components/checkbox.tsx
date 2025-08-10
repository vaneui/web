'use client'

import { Checkbox, Col, Row, ComponentKeys, Label, Text, Link } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const checkboxExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Checkbox should be used inside a Label with matching `id`/`htmlFor`.',
    component: (
      <Col>
        <Label htmlFor="terms">
          <Checkbox id="terms"/>
          <span>I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.</span>
        </Label>

        <Label htmlFor="emails">
          <Checkbox defaultChecked id="emails"/>
          <Col noGap tag="span">
            <Text>Receive product updates</Text>
            <Text xs secondary>Occasional emails about new features</Text>
          </Col>
        </Label>
      </Col>
    ),
  },
  {
    title: 'Pre-checked Checkbox',
    md: 'Use defaultChecked on the input; wrap in Label for accessible click target.',
    component: (
      <Col>
        <Label htmlFor="prechecked-1">
          <Checkbox id="prechecked-1" defaultChecked/>
          Pre-checked checkbox
        </Label>
      </Col>
    ),
  },
  {
    title: 'Sizes',
    md: 'Checkboxes in different sizes - `xs`, `sm`, `md`, `lg`, `xl`, each wrapped in a Label. Use labels with same `size` as Checkboxes',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Label key={key} {...{[key]: true}} htmlFor={`size-${key}`}>
              <Checkbox id={`size-${key}`} {...{[key]: true}} defaultChecked/>
              Size: {key}
            </Label>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Appearances',
    md: 'Different color appearances applied to the Checkbox; always place inside a Label.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Label key={key} {...{[key]: true}} htmlFor={`appearance-${key}`}>
              <Checkbox {...{[key]: true}} id={`appearance-${key}`} defaultChecked/>
              Enable {key} style
            </Label>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Checkbox Group',
    md: 'Multiple labeled checkboxes working together.',
    component: (
      <Col>
        <Label htmlFor="opt-1">
          <Checkbox id="opt-1" defaultChecked/>
          Email notifications
        </Label>
        <Label htmlFor="opt-2">
          <Checkbox id="opt-2"/>
          SMS alerts
        </Label>
        <Label htmlFor="opt-3">
          <Checkbox id="opt-3"/>
          Push notifications
        </Label>
      </Col>
    ),
  },
];