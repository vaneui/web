'use client'

import { Button, Col, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const buttonExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    description: 'Default button styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Button {key}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Sizes',
    description: 'Buttons come in different sizes - xs, sm, md, lg, xl.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Button {key}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Sizes with Icon',
    description: 'Buttons come in different sizes.',
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
    description: 'Buttons support different font weights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Button {key}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Border Radius Options',
    description: 'Button supports three border radius styles: rounded (default), pill, and sharp.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shape.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Button {key}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Button Styles',
    description: 'Buttons can be styled as outline (default) or filled.',
    component: (
      <Col>
        {
          ComponentKeys.variant.map((variant: string) => (
            <Row key={variant} flexWrap>
              {
                ComponentKeys.appearance.slice(0, 4).map((appearance: string) => (
                  <Button key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                    {variant} {appearance}
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