'use client'

import { Chip, Row, Col, ComponentKeys } from "@vaneui/ui";
import { DocsPagePart } from '../../types';
import { CheckSquare, Heart, X } from "react-feather";

export const chipExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Default chip styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Chip key={key} {...{[key]: true}}>Chip {key}</Chip>
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
          ComponentKeys.size.map((key: string) => (
            <Chip key={key} {...{[key]: true}}>Chip {key}</Chip>
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
            <Chip key={key} {...{[key]: true}}>Chip {key}</Chip>
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
                ComponentKeys.appearance.slice(0, 4).map((appearance: string) => (
                  <Chip key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
                    {variant} {appearance}
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
        <Chip primary>
          <Heart className="size-4"/> With Icon
        </Chip>
        <Chip success>
          <CheckSquare className="size-4"/> Approved
        </Chip>
        <Chip danger>
          <X className="size-4"/> Failed
        </Chip>
      </Row>
    ),
  },
];
