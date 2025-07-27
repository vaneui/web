'use client'

import { Card, Row, Text, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const cardExamples: DocsComponentExample[] = [
  {
    title: 'Basic Card',
    description: 'A simple card container.',
    component: (
      <Card>
        <Text semibold>Card Title</Text>
        <Text>This is a basic card with some content inside.</Text>
      </Card>
    ),
  },
  {
    title: 'Card Sizes',
    description: 'Cards come in different sizes.',
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
    description: 'Cards can have different background appearances.',
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
    description: 'Control card border appearance.',
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
    description: 'Cards support different border radius styles.',
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
    description: 'Cards can have drop shadows.',
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
    description: 'Cards can have focus rings.',
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
    description: 'Control card internal padding.',
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
    description: 'Control the direction of card content.',
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
    description: 'Control spacing between card content.',
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