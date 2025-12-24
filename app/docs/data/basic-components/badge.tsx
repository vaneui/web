'use client'

import { Badge, Row, Col, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from "../../types";

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

export const badgeExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Badge styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
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
          ComponentKeys.size.map((key: string, i: number) => (
            <Badge key={key} {...{[key]: true}}>{sizeLabels[i]}</Badge>
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
