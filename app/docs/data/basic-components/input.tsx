'use client'

import { Input, Col, Row, ComponentKeys, Label } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const inputExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Default input styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Input key={key} {...{[key]: true}} placeholder={`${key} input`} />
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Sizes',
    md: 'Inputs come in different sizes - `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col>
        {
          ComponentKeys.size.map((key: string) => (
            <Input key={key} {...{[key]: true}} placeholder={`${key} input`} />
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Input Types',
    md: 'Various input types for different use cases.',
    component: (
      <Col>
        <Input type="text" placeholder="Text input" />
        <Input type="password" placeholder="Password input" />
        <Input type="email" placeholder="Email input" />
        <Input type="number" placeholder="Number input" />
        <Input type="tel" placeholder="Phone input" />
        <Input type="url" placeholder="URL input" />
        <Input type="search" placeholder="Search input" />
      </Col>
    ),
  },
  {
    title: 'Input States',
    md: 'Different input states for user feedback.',
    component: (
      <Col>
        <Input placeholder="Normal input" />
        <Input placeholder="Disabled input" disabled />
        <Input placeholder="Readonly input" readOnly />
        <Input placeholder="Required input" required />
      </Col>
    ),
  },
  {
    title: 'Border Radius Options',
    md: 'Input supports three border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Col>
        {
          ComponentKeys.shape.map((key: string) => (
            <Input key={key} {...{[key]: true}} placeholder={`${key} input`} />
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Input Styles',
    md: 'Inputs can be styled as `outline` (default) or `filled`.',
    component: (
      <Col lg>
        {
          ComponentKeys.variant.map((variant: string) => (
            <div key={variant}>
              <Label semibold className="mb-2 capitalize">{variant} Variant</Label>
              <Row flexWrap>
                {
                  ComponentKeys.appearance.slice(0, 4).map((appearance: string) => (
                    <Input
                      key={`${variant}-${appearance}`}
                      {...{[variant]: true, [appearance]: true}}
                      placeholder={`${variant} ${appearance}`}
                    />
                  ))
                }
              </Row>
            </div>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'With Labels',
    md: 'Inputs paired with labels for better accessibility and user experience.',
    component: (
      <Col>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="Enter your full name" />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" placeholder="Enter your email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="Enter your phone number" />
        </div>
      </Col>
    ),
  },
  {
    title: 'Validation Examples',
    md: 'Examples showing different validation states and styling.',
    component: (
      <Col>
        <div>
          <Label success>Valid Email</Label>
          <Input success type="email" value="user@example.com" readOnly />
        </div>
        <div>
          <Label warning>Username (Optional)</Label>
          <Input warning type="text" placeholder="Enter username" />
        </div>
        <div>
          <Label danger>Invalid Password</Label>
          <Input danger type="password" placeholder="Password too short" />
        </div>
      </Col>
    ),
  },
];