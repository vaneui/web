'use client'

import { Checkbox, Col, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const checkboxExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    description: 'Default checkbox with label.',
    component: (
      <Row flexWrap>
        <Checkbox defaultChecked>Accept terms and conditions</Checkbox>
        <Checkbox>Subscribe to newsletter</Checkbox>
        <Checkbox disabled>Disabled checkbox</Checkbox>
        <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
      </Row>
    ),
  },
  {
    title: 'Controlled Checkbox',
    description: 'Checkbox with controlled state.',
    component: (
      <Col>
        <Checkbox defaultChecked>
          Controlled checkbox
        </Checkbox>
      </Col>
    ),
  },
  {
    title: 'Sizes',
    description: 'Checkboxes come in different sizes - xs, sm, md, lg, xl.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Checkbox key={key} {...{[key]: true}} defaultChecked>
              Checkbox {key}
            </Checkbox>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Appearances',
    description: 'Different checkbox color variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Checkbox key={key} {...{[key]: true}} defaultChecked>
              {key} checkbox
            </Checkbox>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Checkbox Group',
    description: 'Multiple checkboxes working together.',
    component: (
      <Col>
        <Checkbox defaultChecked>
          Option 1
        </Checkbox>
        <Checkbox>
          Option 2
        </Checkbox>
        <Checkbox>
          Option 3
        </Checkbox>
      </Col>
    ),
  },
];