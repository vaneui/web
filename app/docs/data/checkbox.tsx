'use client'

import { Checkbox, Col, Row, ComponentKeys, Label, Text } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const checkboxExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    md: 'Checkbox should be used inside a Label with matching id/htmlFor.',
    component: (
      <Col>
        <Label primary htmlFor="demo6">
          <Checkbox primary id="demo6" />
          I agree to the Terms of Service and Privacy Policy.
        </Label>

        <Label primary htmlFor="demo1">
          <Checkbox primary id="demo1" />
          <Col noGap tag="span">
            <Text primary>Receive product updates</Text>
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
          <Checkbox id="prechecked-1" defaultChecked />
          Pre-checked checkbox
        </Label>
      </Col>
    ),
  },
  {
    title: 'Sizes',
    md: 'Checkboxes in different sizes (xs, sm, md, lg, xl), each wrapped in a Label.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Label key={key} htmlFor={`size-${key}`} tag="span" className="mr-4">
              <Checkbox id={`size-${key}`} {...{[key]: true}} defaultChecked />
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
            <Label key={key} htmlFor={`appearance-${key}`} tag="span" className="mr-4">
              <Checkbox id={`appearance-${key}`} {...{[key]: true}} defaultChecked />
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
          <Checkbox id="opt-1" defaultChecked />
          Email notifications
        </Label>
        <Label htmlFor="opt-2">
          <Checkbox id="opt-2" />
          SMS alerts
        </Label>
        <Label htmlFor="opt-3">
          <Checkbox id="opt-3" />
          Push notifications
        </Label>
      </Col>
    ),
  },
];