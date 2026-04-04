'use client'

import { Icon, Row, Col, Text, Button, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { Star, Heart, AlertCircle, Check, Info, Search } from "react-feather";
import { DocsPagePart } from '../../types';

export const iconExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Wrap any SVG inside `Icon` to apply consistent sizing and color inheritance.',
    component: (
      <Row flexWrap>
        <Icon><Star /></Icon>
        <Icon><Heart /></Icon>
        <Icon><AlertCircle /></Icon>
        <Icon><Check /></Icon>
        <Icon><Info /></Icon>
      </Row>
    ),
  },
  {
    title: 'Sizes',
    md: 'Icons support five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Row flexWrap itemsEnd>
        {
          ComponentKeys.size.map((key) => (
            <Col key={key} itemsCenter>
              <Icon {...{[key]: true}}><Star /></Icon>
              <Text sm secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Appearances',
    md: 'By default, Icon inherits `currentColor` from the parent. Use appearance props to apply themed colors.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.slice(0, -1).map((key) => (
            <Col key={key} itemsCenter>
              <Icon {...{[key]: true}}><Star /></Icon>
              <Text xs secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Variants',
    md: 'Icons support `outline` (default, text color only) and `filled` (background fill) variants.',
    component: (
      <Row flexWrap>
        <Col itemsCenter>
          <Icon primary><Star /></Icon>
          <Text xs secondary>outline</Text>
        </Col>
        <Col itemsCenter>
          <Icon primary filled><Star /></Icon>
          <Text xs secondary>filled</Text>
        </Col>
        <Col itemsCenter>
          <Icon danger><AlertCircle /></Icon>
          <Text xs secondary>outline</Text>
        </Col>
        <Col itemsCenter>
          <Icon danger filled><AlertCircle /></Icon>
          <Text xs secondary>filled</Text>
        </Col>
      </Row>
    ),
  },
  {
    title: 'In Context',
    md: 'Icons work naturally alongside text and inside buttons.',
    component: (
      <Col>
        <Row>
          <Button><Search /> Search</Button>
          <Button success filled><Check /> Saved</Button>
          <Button danger><AlertCircle /> Delete</Button>
        </Row>
        <Text><Icon sm info><Info /></Icon> Icons inherit inline sizing when placed in text.</Text>
      </Col>
    ),
  },
];
