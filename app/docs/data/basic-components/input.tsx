'use client'

import { Input, Col, Row, Label } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const inputExamples: DocsPagePart[] = [
  {
    title: 'Basic Input',
    md: 'A styled text input field.',
    component: (
      <Input placeholder="Enter text..." />
    ),
  },
  {
    title: 'Input Sizes',
    md: 'Inputs come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        <Input sm placeholder="Small input" />
        <Input placeholder="Medium input (default)" />
        <Input lg placeholder="Large input" />
      </Col>
    ),
  },
  {
    title: 'Input Types',
    md: 'Various HTML input types for different use cases.',
    component: (
      <Col>
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password input" />
        <Input type="number" placeholder="Number input" />
      </Col>
    ),
  },
  {
    title: 'Input Variants',
    md: 'Inputs are `outline` by default. Use `filled` for solid backgrounds.',
    component: (
      <Col>
        <Row flexWrap>
          <Input placeholder="Outline (default)" />
          <Input success placeholder="Outline success" />
          <Input danger placeholder="Outline danger" />
        </Row>
        <Row flexWrap>
          <Input filled placeholder="Filled (default)" />
          <Input filled success placeholder="Filled success" />
          <Input filled danger placeholder="Filled danger" />
        </Row>
      </Col>
    ),
  },
  {
    title: 'Input with Labels',
    md: 'Pair inputs with labels for accessibility and better UX.',
    component: (
      <Col>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="Enter your full name" />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
      </Col>
    ),
  },
  {
    title: 'Input States',
    md: 'Different input states: disabled, readonly, and validation feedback.',
    component: (
      <Col>
        <Input placeholder="Normal input" />
        <Input disabled placeholder="Disabled input" />
        <Input success placeholder="Success state" />
        <Input danger placeholder="Error state" />
      </Col>
    ),
  },
];
