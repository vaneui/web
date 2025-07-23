'use client'

import { Text, Col, Row } from "@vaneui/ui";
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
        <Text xs>Extra Small Text</Text>
        <Text sm>Small Text</Text>
        <Text md>Medium Text</Text>
        <Text lg>Large Text</Text>
        <Text xl>Extra Large Text</Text>
      </Row>
    ),
  },
  {
    title: 'Text Font Weights',
    description: 'Text supports different font weights.',
    component: (
      <Row flexWrap>
        <Text thin>Thin Text</Text>
        <Text extralight>Extra Light Text</Text>
        <Text light>Light Text</Text>
        <Text normal>Normal Text</Text>
        <Text medium>Medium Text</Text>
        <Text semibold>Semibold Text</Text>
        <Text bold>Bold Text</Text>
        <Text extrabold>Extra Bold Text</Text>
        <Text black>Black Text</Text>
      </Row>
    ),
  },
  {
    title: 'Text Appearances',
    description: 'Text can have different color appearances.',
    component: (
      <Row flexWrap>
        <Text>Default Text</Text>
        <Text primary>Primary Text</Text>
        <Text secondary>Secondary Text</Text>
        <Text accent>Accent Text</Text>
        <Text success>Success Text</Text>
        <Text danger>Danger Text</Text>
        <Text warning>Warning Text</Text>
        <Text info>Info Text</Text>
        <Text link>Link Text</Text>
      </Row>
    ),
  },
  {
    title: 'Text Font Families',
    description: 'Text supports different font families.',
    component: (
      <Row flexWrap>
        <Text sans>Sans Serif Text</Text>
        <Text serif>Serif Text</Text>
        <Text mono>Monospace Text</Text>
      </Row>
    ),
  },
  {
    title: 'Text Styles',
    description: 'Text supports different styles and decorations.',
    component: (
      <Row flexWrap>
        <Text italic>Italic Text</Text>
        <Text notItalic>Not Italic Text</Text>
        <Text underline>Underlined Text</Text>
        <Text lineThrough>Line Through Text</Text>
        <Text overline>Overlined Text</Text>
        <Text noUnderline>No Underline Text</Text>
      </Row>
    ),
  },
  {
    title: 'Text Transformations',
    description: 'Text supports different case transformations.',
    component: (
      <Row flexWrap>
        <Text uppercase>uppercase text</Text>
        <Text lowercase>LOWERCASE TEXT</Text>
        <Text capitalize>capitalize text</Text>
        <Text normalCase>Normal Case Text</Text>
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