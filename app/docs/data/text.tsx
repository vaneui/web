'use client'

import { Text, Col, Row, APPEARANCE_KEYS, SIZE_KEYS, FONT_WEIGHT_KEYS, FONT_FAMILY_KEYS, TEXT_DECORATION_KEYS, TEXT_TRANSFORM_KEYS, FONT_STYLE_KEYS } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const textExamples: DocsComponentExample[] = [
  {
    title: 'Basic Text',
    description: 'Default text styling.',
    component: (
      <Text>This is basic text content with default styling.</Text>
    ),
  },
  {
    title: 'Text Sizes',
    description: 'Text comes in different sizes.',
    component: (
      <Row flexWrap>
        {
          SIZE_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Font Weights',
    description: 'Text supports different font weights.',
    component: (
      <Row flexWrap>
        {
          FONT_WEIGHT_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Appearances',
    description: 'Text can have different color appearances.',
    component: (
      <Row flexWrap>
        {
          APPEARANCE_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Font Families',
    description: 'Text supports different font families.',
    component: (
      <Row flexWrap>
        {
          FONT_FAMILY_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Decorations',
    description: 'Text supports different text decorations.',
    component: (
      <Row flexWrap>
        {
          TEXT_DECORATION_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Font Styles',
    description: 'Text supports different font styles.',
    component: (
      <Row flexWrap>
        {
          FONT_STYLE_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Transformations',
    description: 'Text supports different case transformations.',
    component: (
      <Row flexWrap>
        {
          TEXT_TRANSFORM_KEYS.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Alignment',
    description: 'Text can be aligned differently.',
    component: (
      <div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
        <Text textLeft>Left aligned text</Text>
        <Text textCenter>Center aligned text</Text>
        <Text textRight>Right aligned text</Text>
        <Text textJustify>Justified text that should wrap to multiple lines to demonstrate the justification alignment. This text is long enough to show the justify effect.</Text>
      </div>
    ),
  },
  {
    title: 'Text Combinations',
    description: 'Combining multiple text properties.',
    component: (
      <Col>
        <Text lg bold primary>Large Bold Primary Text</Text>
        <Text sm italic secondary>Small Italic Secondary Text</Text>
        <Text md semibold success underline>Medium Semibold Success Underlined Text</Text>
        <Text xs light uppercase>Extra Small Light Uppercase Text</Text>
        <Text xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Text</Text>
      </Col>
    ),
  },
];