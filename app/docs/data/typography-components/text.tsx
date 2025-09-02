'use client'

import { Text, Col, Row, ComponentKeys, Card, Container } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const textExamples: DocsPagePart[] = [
  {
    title: 'Basic Text',
    md: 'Default text styling.',
    component: (
      <Text>This is basic text content with default styling.</Text>
    ),
  },
  {
    title: 'Text Sizes',
    md: 'Text comes in different sizes.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Font Weights',
    md: 'Text supports different font weights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Appearances',
    md: 'Text can have different color appearances.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Font Families',
    md: 'Text supports different font families.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontFamily.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Decorations',
    md: 'Text supports different text decorations.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.textDecoration.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Font Styles',
    md: 'Text supports different font styles.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontStyle.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Transformations',
    md: 'Text supports different case transformations.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.textTransform.map((key: string) => (
            <Text key={key} {...{[key]: true}}>Text {key}</Text>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Text Alignment',
    md: 'Text can be aligned differently.',
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
    md: 'Combining multiple text properties.',
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
  {
    title: 'Color Inheritance',
    md: 'Text inherits colors from parent components with appearance props.',
    component: (
      <Col>
        <Card filled primary lg>
          <Text primary>This text inherits primary color from the filled card</Text>
        </Card>
        <Card filled success lg>
          <Text success>This text inherits success color from the card</Text>
        </Card>
        <Container outline danger>
          <Text danger>Text inheriting danger color from outline container</Text>
        </Container>
      </Col>
    ),
  },
];