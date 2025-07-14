'use client'

import { Card, Row, Text } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

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
        <Card primary>
          <Text semibold>Primary Card</Text>
          <Text>Card with primary background</Text>
        </Card>
        <Card secondary>
          <Text semibold>Secondary Card</Text>
          <Text>Card with secondary background</Text>
        </Card>
        <Card success>
          <Text semibold>Success Card</Text>
          <Text>Card with success background</Text>
        </Card>
        <Card danger>
          <Text semibold>Danger Card</Text>
          <Text>Card with danger background</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Borders',
    description: 'Control card border appearance.',
    component: (
      <Row flexWrap>
        <Card border>
          <Text semibold>With Border</Text>
          <Text>Card with border</Text>
        </Card>
        <Card noBorder>
          <Text semibold>No Border</Text>
          <Text>Card without border</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Shapes',
    description: 'Cards support different border radius styles.',
    component: (
      <Row flexWrap>
        <Card>
          <Text semibold>Default Rounded</Text>
          <Text>Default rounded corners</Text>
        </Card>
        <Card sharp>
          <Text semibold>Sharp Corners</Text>
          <Text>Sharp cornered card</Text>
        </Card>
        <Card rounded>
          <Text semibold>Rounded</Text>
          <Text>Extra rounded corners</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card with Shadow',
    description: 'Cards can have drop shadows.',
    component: (
      <Row flexWrap>
        <Card shadow>
          <Text semibold>With Shadow</Text>
          <Text>Card with drop shadow</Text>
        </Card>
        <Card noShadow>
          <Text semibold>No Shadow</Text>
          <Text>Card without shadow</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card with Ring',
    description: 'Cards can have focus rings.',
    component: (
      <Row flexWrap>
        <Card ring>
          <Text semibold>With Ring</Text>
          <Text>Card with focus ring</Text>
        </Card>
        <Card noRing>
          <Text semibold>No Ring</Text>
          <Text>Card without ring</Text>
        </Card>
      </Row>
    ),
  },
  {
    title: 'Card Padding',
    description: 'Control card internal padding.',
    component: (
      <Row flexWrap>
        <Card padding>
          <Text semibold>With Padding</Text>
          <Text>Card with padding</Text>
        </Card>
        <Card noPadding>
          <div className="p-4 bg-gray-100">
            <Text semibold>No Padding</Text>
            <Text>Card without padding</Text>
          </div>
        </Card>
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
        <Card gap>
          <Text semibold>With Gap</Text>
          <Text>Content with spacing</Text>
          <Text>Another line</Text>
        </Card>
        <Card noGap>
          <Text semibold>No Gap</Text>
          <Text>Content without spacing</Text>
          <Text>Another line</Text>
        </Card>
      </Row>
    ),
  },
];