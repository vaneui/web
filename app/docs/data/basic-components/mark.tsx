'use client'

import { Mark, Row, Col, Text, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const markExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Highlight text with the `Mark` component. Defaults to `warning` (yellow) appearance for a natural highlighter effect.',
    component: (
      <Row flexWrap>
        <Mark>Highlighted text</Mark>
        <Mark>Important</Mark>
        <Mark>Key term</Mark>
      </Row>
    ),
  },
  {
    title: 'Appearances',
    md: 'Different color appearances for highlights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.slice(0, -1).map((key) => (
            <Mark key={key} {...{[key]: true}}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Mark>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Variants',
    md: 'Mark supports `outline` (default) and `filled` variants.',
    component: (
      <Col>
        <Row flexWrap>
          <Mark>outline (default)</Mark>
          <Mark primary>primary outline</Mark>
          <Mark success>success outline</Mark>
          <Mark danger>danger outline</Mark>
        </Row>
        <Row flexWrap>
          <Mark filled>filled</Mark>
          <Mark primary filled>primary filled</Mark>
          <Mark success filled>success filled</Mark>
          <Mark danger filled>danger filled</Mark>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Sizes',
    md: 'Mark elements in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Row flexWrap itemsEnd>
        {
          ComponentKeys.size.map((key) => (
            <Col key={key} itemsCenter>
              <Mark {...{[key]: true}}>Marked</Mark>
              <Text sm secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'In Text Context',
    md: 'Mark elements blend naturally within body text for inline highlights.',
    component: (
      <Col>
        <Text>VaneUI uses a <Mark>boolean props API</Mark> for styling components.</Text>
        <Text>Always wrap your app in <Mark primary>ThemeProvider</Mark> for theming to work.</Text>
        <Text>Components marked with <Mark danger>danger</Mark> indicate destructive actions.</Text>
      </Col>
    ),
  },
  {
    title: 'Search Highlight Pattern',
    md: 'Use Mark to highlight search matches within text content.',
    component: (
      <Col>
        <Text sm secondary>Search results for &quot;React&quot;:</Text>
        <Text>VaneUI is a <Mark>React</Mark> component library built with TypeScript.</Text>
        <Text>All components are <Mark>React</Mark> 19 compatible with server component support.</Text>
        <Text>Use <Mark>React</Mark> hooks like useState with VaneUI form components.</Text>
      </Col>
    ),
  },
];
