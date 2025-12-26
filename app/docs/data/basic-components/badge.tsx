'use client'

import { Badge, Row, Col, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from "../../types";

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

export const badgeExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Badge styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key) => (
            <Badge key={key} {...{[key]: true}}>{appearanceLabels[key]}</Badge>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Badge Sizes',
    md: 'Badges come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key) => (
            <Badge key={key} {...{[key]: true}}>{sizeLabels[key]}</Badge>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Badge Shapes',
    md: 'Badges support different border radius styles: `rounded`, `pill` (default), and `sharp`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shape.map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Pro</Badge>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Badge Variants',
    md: 'Badges can be styled as `outline` (default) or `filled`.',
    component: (
      <Col>
        {
          ComponentKeys.variant.map((variant: string) => (
            <Row key={variant} flexWrap>
              {
                ComponentKeys.appearance.slice(0, 4).map((appearance: string, i: number) => {
                  const labels = ['Primary', 'Brand', 'Accent', 'Secondary'];
                  return (
                    <Badge key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                      {labels[i]}
                    </Badge>
                  );
                })
              }
            </Row>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Font Weights',
    md: 'Badges support different font weights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontWeight.slice(3, 7).map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Premium</Badge>
          ))
        }
      </Row>
    ),
  },
];
