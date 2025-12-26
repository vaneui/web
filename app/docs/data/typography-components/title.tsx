'use client'

import { Title, Col, ComponentKeys, Card, Container } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

type AppearanceKey = typeof ComponentKeys.appearance[number];
type SizeKey = typeof ComponentKeys.size[number];

const sizeTitles: Record<SizeKey, string> = {
  xs: 'Extra Small Title (xs)',
  sm: 'Small Title (sm)',
  md: 'Medium Title (md)',
  lg: 'Large Title (lg)',
  xl: 'Extra Large Title (xl)',
};

const appearanceTitles: Record<AppearanceKey, string> = {
  primary: 'Primary Title',
  brand: 'Brand Title',
  accent: 'Accent Title',
  secondary: 'Secondary Title',
  tertiary: 'Tertiary Title',
  success: 'Success Title',
  danger: 'Danger Title',
  warning: 'Warning Title',
  info: 'Info Title',
};

export const titleExamples: DocsPagePart[] = [
  {
    title: 'Basic Title',
    md: 'Default title styling.',
    component: (
      <Title>Welcome to the Documentation</Title>
    ),
  },
  {
    title: 'Title Sizes',
    md: 'Titles come in different sizes.',
    component: (
      <Col lg>
        {
          ComponentKeys.size.map((key) => (
            <Title key={key} {...{[key]: true}}>{sizeTitles[key]}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Font Weights',
    md: 'Titles support different font weights.',
    component: (
      <Col lg>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Section Header</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Appearances',
    md: 'Titles can have different color appearances.',
    component: (
      <Col lg>
        {
          ComponentKeys.appearance.map((key) => (
            <Title key={key} {...{[key]: true}}>{appearanceTitles[key]}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Font Families',
    md: 'Titles support different font families.',
    component: (
      <Col lg>
        {
          ComponentKeys.fontFamily.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Design System</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Styles',
    md: 'Titles support different styles and decorations.',
    component: (
      <Col lg>
        {
          ComponentKeys.textDecoration.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Styled Heading</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Transformations',
    md: 'Titles support different case transformations.',
    component: (
      <Col lg>
        {
          ComponentKeys.textTransform.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Transform Example</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Alignment',
    md: 'Titles can be aligned differently.',
    component: (
      <div className="space-y-4 border-2 border-dashed border-gray-300 p-4">
        <Title textLeft>Left Aligned Section</Title>
        <Title textCenter>Centered Section</Title>
        <Title textRight>Right Aligned Section</Title>
      </div>
    ),
  },
  {
    title: 'Title Combinations',
    md: 'Combining multiple title properties.',
    component: (
      <Col lg>
        <Title lg bold brand>Large, Bold, Primary Title</Title>
        <Title sm italic secondary>Small, Italic, Secondary Title</Title>
        <Title md semibold success underline>Medium, Semibold, Success, Underlined Title</Title>
        <Title xs light uppercase>Extra Small, Light, Uppercase Title</Title>
        <Title xl extrabold danger textCenter>Extra Large, Extrabold, Danger, Centered Title</Title>
      </Col>
    ),
  },
  {
    title: 'Color Inheritance from Parent',
    md: 'Titles inherit colors from parent components with appearance props.',
    component: (
      <Col lg>
        <Card filled warning lg>
          <Title filled warning>Title in Filled Warning Card</Title>
        </Card>
        <Container filled brand>
          <Title filled brand>Title in Filled Brand Container</Title>
        </Container>
        <Card outline secondary lg>
          <Title secondary>Title in Outline Secondary Card</Title>
        </Card>
      </Col>
    ),
  },
];
