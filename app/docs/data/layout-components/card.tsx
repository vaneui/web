'use client'

import { Card, Row, Text, Title, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const cardExamples: DocsPagePart[] = [
  {
    title: 'Basic Card',
    md: 'A simple card container.',
    component: (
      <Card>
        <Title>Card Title</Title>
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
          ComponentKeys.size.map((key: string) => {
            const sizeProps = key !== 'md' ? {[key]: true} : {};
            return (
              <Card key={key} {...{[key]: true}}>
                <Title {...sizeProps}>Card {key}</Title>
                <Text {...sizeProps}>Content for {key} size</Text>
              </Card>
            );
          })
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
              <Title>{key} Card</Title>
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
              <Title>Card {key}</Title>
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
          <Title>Card rounded</Title>
          <Text>Card with rounded corners</Text>
        </Card>
        <Card sharp>
          <Title>Card sharp</Title>
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
              <Title>Card {key}</Title>
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
              <Title>Card {key}</Title>
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
              <Title>Card {key}</Title>
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
          <Title>Column Direction</Title>
          <Text>Content flows vertically</Text>
          <Text>Another line</Text>
        </Card>
        <Card row>
          <Title>Row Direction</Title>
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
              <Title>Card {key}</Title>
              <Text>Content with {key}</Text>
              <Text>Another line</Text>
            </Card>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Filled and Outline Cards',
    md: 'Cards support filled and outline variants with typography color inheritance.',
    component: (
      <Row flexWrap>
        <Card filled primary lg>
          <Title primary>Filled Primary Card</Title>
          <Text primary>Typography inherits primary color</Text>
        </Card>
        <Card outline success lg>
          <Title success>Outline Success Card</Title>
          <Text success>Typography inherits success color</Text>
        </Card>
        <Card filled danger lg>
          <Title danger>Filled Danger Card</Title>
          <Text danger>Typography inherits danger color</Text>
        </Card>
      </Row>
    ),
  },
];