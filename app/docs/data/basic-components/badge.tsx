'use client'

import { Badge, Row, Col, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from "../../types";

export const badgeExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Default badge styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
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
          ComponentKeys.size.map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
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
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
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
                ComponentKeys.appearance.slice(0, 4).map((appearance: string) => (
                  <Badge key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                    {variant} {appearance}
                  </Badge>
                ))
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
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
          ))
        }
      </Row>
    ),
  },
];
