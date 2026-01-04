'use client'

import { Chip, Row, Col, ComponentKeys } from "@vaneui/ui";
import { DocsPagePart } from '../../types';
import { CheckSquare, Heart, X } from "react-feather";

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
  link: 'Link',
};

const sizeLabels: Record<SizeKey, string> = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
};

export const chipExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Chip styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key) => (
            <Chip key={key} {...{[key]: true}}>{appearanceLabels[key]}</Chip>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Chip Sizes',
    md: 'Chips come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key) => (
            <Chip key={key} {...{[key]: true}}>{sizeLabels[key]}</Chip>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Chip Shapes',
    md: 'Chips support different border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shape.map((key: string) => (
            <Chip key={key} {...{[key]: true}}>JavaScript</Chip>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Chip Variants',
    md: 'Chips can be styled as `outline` (default) or `filled`.',
    component: (
      <Col>
        {
          ComponentKeys.variant.map((variant) => (
            <Row key={variant} flexWrap>
              {
                ComponentKeys.appearance.slice(0, 4).map((appearance) => (
                  <Chip key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                    {appearanceLabels[appearance]}
                  </Chip>
                ))
              }
            </Row>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Chip with Icon',
    md: 'Chips can contain icons along with text.',
    component: (
      <Row flexWrap>
        <Chip brand>
          <Heart className="size-4"/> Brand with Icon
        </Chip>
        <Chip success>
          <CheckSquare className="size-4"/> Success with Icon
        </Chip>
        <Chip danger>
          <X className="size-4"/> Danger with Icon
        </Chip>
      </Row>
    ),
  },
];
