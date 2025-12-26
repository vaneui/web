'use client'

import { Button, Col, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

type AppearanceKey = typeof ComponentKeys.appearance[number];
type SizeKey = typeof ComponentKeys.size[number];

const appearanceLabels: Record<AppearanceKey, string> = {
  primary: 'Primary',
  brand: 'Brand',
  accent: 'Accent',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
  success: 'Success',
  danger: 'Danger',
  warning: 'Warning',
  info: 'Info',
};

const sizeLabels: Record<SizeKey, string> = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
};

export const buttonExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Button styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key) => (
            <Button key={key} {...{[key]: true}}>{appearanceLabels[key]}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Sizes',
    md: 'Buttons come in different sizes - `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key) => (
            <Button key={key} {...{[key]: true}}>{sizeLabels[key]}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Sizes with Icon',
    md: 'Buttons come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        <Button xs><span className="rounded-full size-4 bg-gray-300"/> Extra Small</Button>
        <Button sm><span className="rounded-full size-4.5 bg-gray-300"/> Small</Button>
        <Button md><span className="rounded-full size-5 bg-gray-300"/> Medium</Button>
        <Button lg><span className="rounded-full size-6 bg-gray-300"/> Large</Button>
        <Button xl><span className="rounded-full size-7 bg-gray-300"/> Extra Large</Button>
      </Row>
    ),
  },
  {
    title: 'Font Weights',
    md: 'Buttons support different font weights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Submit</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Border Radius Options',
    md: 'Button supports three border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shape.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Subscribe</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Button Styles',
    md: 'Buttons can be styled as `outline` (default) or `filled`.',
    component: (
      <Col>
        {
          ComponentKeys.variant.map((variant) => (
            <Row key={variant} flexWrap>
              {
                ComponentKeys.appearance.slice(0, 4).map((appearance) => (
                  <Button key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                    {appearanceLabels[appearance]}
                  </Button>
                ))
              }
            </Row>
          ))
        }
      </Col>
    ),
  },
];
