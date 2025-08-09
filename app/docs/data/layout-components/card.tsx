'use client'

import { Card, Row, Text, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const cardExamples: DocsPagePart[] = [
  {
    title: 'Basic Card',
    md: 'A simple card container.',
    component: (
      <Card>
        <Text semibold>Card Title</Text>
        <Text>This is a basic card with some content inside.</Text>
      </Card>
    ),
  },
  {
    title: 'Card Sizes',
    md: 'Cards come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Content for {key} size</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Appearances',
    md: 'Cards can have different background appearances.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>{key} Card</Text>
              <Text>Card with {key} background</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Borders',
    md: 'Control card border appearance.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.border.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Card with {key}</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Shapes',
    md: 'Cards support different border radius styles.',
    component: (
      <Row flexWrap>
        <Card rounded>
          <Text semibold>Card rounded</Text>
          <Text>Card with rounded corners</Text>
        </Card>
        <Card sharp>
          <Text semibold>Card sharp</Text>
          <Text>Card with sharp corners</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card with Shadow',
    md: 'Cards can have drop shadows.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shadow.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Card with {key}</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card with Ring',
    md: 'Cards can have focus rings.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.ring.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Card with {key}</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Padding',
    md: 'Control card internal padding.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.padding.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Card with {key}</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card Flex Direction',
    md: 'Control the direction of card content.',
    component: (
      <Row flexWrap>
        <Card column>
          <Text semibold>Column Direction</Text>
          <Text>Content flows vertically</Text>
          <Text>Another line</Text>
        </Card>
        <Card row>
          <Text semibold>Row Direction</Text>
          <Text>Content flows horizontally</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card with Gap',
    md: 'Control spacing between card content.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.gap.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Content with {key}</Text>
              <Text>Another line</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
];