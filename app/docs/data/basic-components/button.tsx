'use client'

import { Button, Col, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

const appearanceLabels: Record<string, string> = {
  default: 'Default',
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
  accent: 'Accent',
  success: 'Success',
  danger: 'Danger',
  warning: 'Warning',
  info: 'Info',
  link: 'Link',
};

const sizeLabels = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'];

export const buttonExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Default button styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
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
          ComponentKeys.size.map((key: string, i: number) => (
            <Button key={key} {...{[key]: true}}>{sizeLabels[i]}</Button>
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
          ComponentKeys.variant.map((variant: string) => (
            <Row key={variant} flexWrap>
              {
                ComponentKeys.appearance.slice(0, 4).map((appearance: string, i: number) => {
                  const labels = ['Default', 'Primary', 'Secondary', 'Tertiary'];
                  return (
                    <Button key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                      {labels[i]}
                    </Button>
                  );
                })
              }
            </Row>
          ))
        }
      </Col>
    ),
  },
];
