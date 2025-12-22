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
            <Input key={key} {...{[key]: true}} placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} appearance input`} />
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
            <Input key={key} {...{[key]: true}} placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} appearance input`} />
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
        <Input type="text" placeholder="Type: text" />
        <Input type="password" placeholder="Type: password" />
        <Input type="email" placeholder="Type: email" />
        <Input type="number" placeholder="Type: number" />
        <Input type="tel" placeholder="Type: tel" />
        <Input type="url" placeholder="Type: url" />
        <Input type="search" placeholder="Type: search" />
      </Col>
    ),
  },
  {
    title: 'Input States',
    md: 'Different input states for user feedback.',
    component: (
      <Col>
        <Input placeholder="Normal state input" />
        <Input placeholder="Disabled state input" disabled />
        <Input placeholder="Readonly state input" readOnly />
        <Input placeholder="Required state input" required />
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
            <Input key={key} {...{[key]: true}} placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} appearance input`} />
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
                      placeholder={`${variant.charAt(0).toUpperCase() + variant.slice(1)} ${appearance} input`}
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
          <Label success>Success State</Label>
          <Input success type="email" placeholder="Input with success appearance" />
        </div>
        <div>
          <Label warning>Warning State</Label>
          <Input warning type="text" placeholder="Input with warning appearance" />
        </div>
        <div>
          <Label danger>Danger State</Label>
          <Input danger type="text" placeholder="Input with danger appearance" />
        </div>
      </Col>
    ),
  },
];