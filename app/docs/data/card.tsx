'use client'

import { Card, Row, Text, APPEARANCE_KEYS, BORDER_KEYS, SHAPE_KEYS, SHADOW_KEYS, RING_KEYS, PADDING_KEYS, GAP_KEYS } from "@vaneui/ui";
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
        <Card xs className="max-w-xs">
          <Text semibold>Extra Small Card</Text>
          <Text>Compact card content</Text>
        </Card>
        <Card lg className="max-w-md">
          <Text semibold>Large Card</Text>
          <Text>This is a larger card with more content space.</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Appearances',
    description: 'Cards can have different background appearances.',
    component: (
      <Row flexWrap>
        {
          APPEARANCE_KEYS.map((key: string) => (
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
          BORDER_KEYS.map((key: string) => (
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
        {
          SHAPE_KEYS.map((key: string) => (
            <Card key={key} {...{[key]: true}}>
              <Text semibold>Card {key}</Text>
              <Text>Card with {key} corners</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Card with Shadow',
    description: 'Cards can have drop shadows.',
    component: (
      <Row flexWrap>
        {
          SHADOW_KEYS.map((key: string) => (
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
          RING_KEYS.map((key: string) => (
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
          PADDING_KEYS.map((key: string) => (
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
          GAP_KEYS.map((key: string) => (
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