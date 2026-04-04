'use client'

import { Img, Row, Col, Text, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

type SizeKey = typeof ComponentKeys.size[number];

const sizeLabels: Record<SizeKey, string> = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
};

const placeholderSrc = "https://placehold.co/300x200/e2e8f0/64748b?text=Image";

export const imgExamples: DocsPagePart[] = [
  {
    title: 'Basic Image',
    md: 'Render an image with the `Img` component.',
    component: (
      <Img src={placeholderSrc} alt="Placeholder image" />
    ),
  },
  {
    title: 'Image Shapes',
    md: 'Control border radius with `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shape.map((key: string) => (
            <Col key={key} itemsCenter>
              <Img {...{[key]: true}} src={placeholderSrc} alt={`${key} image`} />
              <Text sm secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Image with Border & Shadow',
    md: 'Add `border` and `shadow` props for visual emphasis.',
    component: (
      <Row flexWrap>
        <Col itemsCenter>
          <Img border src={placeholderSrc} alt="Bordered image" />
          <Text sm secondary>border</Text>
        </Col>
        <Col itemsCenter>
          <Img shadow src={placeholderSrc} alt="Shadow image" />
          <Text sm secondary>shadow</Text>
        </Col>
        <Col itemsCenter>
          <Img border shadow src={placeholderSrc} alt="Border and shadow image" />
          <Text sm secondary>border + shadow</Text>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Image Sizes',
    md: 'Images support five sizes: `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap itemsEnd>
        {
          ComponentKeys.size.map((key) => (
            <Col key={key} itemsCenter>
              <Img {...{[key]: true}} src={placeholderSrc} alt={`${sizeLabels[key]} image`} />
              <Text sm secondary>{sizeLabels[key]}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Object Fit',
    md: 'Control how the image fills its container with `objectCover`, `objectContain`, and `objectFill`.',
    component: (
      <Row flexWrap>
        <Col itemsCenter>
          <Img objectCover src={placeholderSrc} alt="Cover" style={{ width: 200, height: 150 }} />
          <Text sm secondary>objectCover</Text>
        </Col>
        <Col itemsCenter>
          <Img objectContain src={placeholderSrc} alt="Contain" style={{ width: 200, height: 150 }} />
          <Text sm secondary>objectContain</Text>
        </Col>
        <Col itemsCenter>
          <Img objectFill src={placeholderSrc} alt="Fill" style={{ width: 200, height: 150 }} />
          <Text sm secondary>objectFill</Text>
        </Col>
      </Row>
    ),
  },
];
