'use client'

import { Text, Col, Row, ComponentKeys, Card, Container } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

const sizeSentences = [
  'Extra small text (xs)',
  'Small text (sm)',
  'Medium text (md)',
  'Large text (lg)',
  'Extra large text (xl)'
];

const appearanceSentences: Record<string, string> = {
  default: 'Default text appearance',
  primary: 'Primary text appearance',
  secondary: 'Secondary text appearance',
  tertiary: 'Tertiary text appearance',
  accent: 'Accent text appearance',
  success: 'Success text appearance',
  danger: 'Danger text appearance',
  warning: 'Warning text appearance',
  info: 'Info text appearance',
  link: 'Link text appearance',
};

export const textExamples: DocsPagePart[] = [
  {
    title: 'Basic Text',
    md: 'Default text styling.',
    component: (
      <Text>Build beautiful user interfaces with VaneUI components.</Text>
    ),
  },
  {
    title: 'Text Sizes',
    md: 'Text comes in different sizes.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string, i: number) => (
            <Text key={key} {...{[key]: true}}>{sizeSentences[i]}</Text>
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
            <Text key={key} {...{[key]: true}}>The quick brown fox</Text>
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
            <Text key={key} {...{[key]: true}}>{appearanceSentences[key]}</Text>
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
            <Text key={key} {...{[key]: true}}>Typography matters</Text>
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
            <Text key={key} {...{[key]: true}}>Decorated text</Text>
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
            <Text key={key} {...{[key]: true}}>Styled text</Text>
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
            <Text key={key} {...{[key]: true}}>Transform this text</Text>
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
        <Text textLeft>Aligned to the left side</Text>
        <Text textCenter>Centered in the middle</Text>
        <Text textRight>Aligned to the right side</Text>
        <Text textJustify>Justified text spreads evenly across the full width of its container, creating clean edges on both sides for a more formal appearance.</Text>
      </div>
    ),
  },
  {
    title: 'Text Combinations',
    md: 'Combining multiple text properties.',
    component: (
      <Col>
        <Text lg bold primary>Large, bold, primary text</Text>
        <Text sm italic secondary>Small, italic, secondary text</Text>
        <Text md semibold success underline>Medium, semibold, success, underlined text</Text>
        <Text xs light uppercase>Extra small, light, uppercase text</Text>
        <Text xl extrabold danger textCenter>Extra large, extrabold, danger, centered text</Text>
      </Col>
    ),
  },
  {
    title: 'Color Inheritance',
    md: 'Text inherits colors from parent components with appearance props.',
    component: (
      <Col>
        <Card filled primary lg>
          <Text filled primary>Text inside filled primary card</Text>
        </Card>
        <Card filled success lg>
          <Text filled success>Text inside filled success card</Text>
        </Card>
        <Container outline danger>
          <Text danger>Text inside outline danger container</Text>
        </Container>
      </Col>
    ),
  },
];
