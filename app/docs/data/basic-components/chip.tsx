'use client'

import { Chip, Row, Col, ComponentKeys } from "@vaneui/ui";
import { DocsPagePart } from '../../types';
import { CheckSquare, Heart, X } from "react-feather";

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

export const chipExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Default chip styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
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
          ComponentKeys.size.map((key: string, i: number) => (
            <Chip key={key} {...{[key]: true}}>{sizeLabels[i]}</Chip>
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
          ComponentKeys.variant.map((variant: string) => (
            <Row key={variant} flexWrap>
              {
                ComponentKeys.appearance.slice(0, 4).map((appearance: string, i: number) => {
                  const labels = ['Default', 'Primary', 'Secondary', 'Tertiary'];
                  return (
                    <Chip key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                      {labels[i]}
                    </Chip>
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
    title: 'Chip with Icon',
    md: 'Chips can contain icons along with text.',
    component: (
      <Row flexWrap>
        <Chip primary>
          <Heart className="size-4"/> Primary with Icon
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
