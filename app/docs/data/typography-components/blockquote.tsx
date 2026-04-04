'use client'

import { Blockquote, Col, Row, Text, Card, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const blockquoteExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Display a styled quotation with a left border accent. Blockquote inherits appearance from the parent by default.',
    component: (
      <Col>
        <Blockquote>The only way to do great work is to love what you do.</Blockquote>
        <Blockquote>Design is not just what it looks like and feels like. Design is how it works.</Blockquote>
      </Col>
    ),
  },
  {
    title: 'Appearances',
    md: 'Apply appearance props to color the blockquote. The default is `inherit`, which picks up the parent color.',
    component: (
      <Col>
        {
          ['primary', 'brand', 'accent', 'secondary', 'success', 'danger', 'warning', 'info'].map((key) => (
            <Blockquote key={key} {...{[key]: true}}>
              {key.charAt(0).toUpperCase() + key.slice(1)} appearance blockquote.
            </Blockquote>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Sizes',
    md: 'Blockquote supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col>
        {
          ComponentKeys.size.map((key) => (
            <Blockquote key={key} {...{[key]: true}} primary>
              Size {key}: The best way to predict the future is to create it.
            </Blockquote>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Inside a Card',
    md: 'Blockquote inherits the parent appearance, making it blend seamlessly inside themed containers.',
    component: (
      <Row flexWrap>
        <Card primary>
          <Blockquote>Inherits primary from the card.</Blockquote>
        </Card>
        <Card success>
          <Blockquote>Inherits success from the card.</Blockquote>
        </Card>
        <Card danger>
          <Blockquote>Inherits danger from the card.</Blockquote>
        </Card>
      </Row>
    ),
  },
  {
    title: 'With Rich Content',
    md: 'Blockquotes can contain multiple paragraphs and nested components.',
    component: (
      <Blockquote primary>
        <Text bold>Steve Jobs</Text>
        <Text>Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.</Text>
      </Blockquote>
    ),
  },
  {
    title: 'Testimonial Pattern',
    md: 'Use blockquotes with attribution for testimonials and customer quotes.',
    component: (
      <Col>
        <Blockquote brand>
          <Text italic>VaneUI made our design system migration incredibly smooth. The boolean props API is intuitive and the theming is powerful.</Text>
          <Text sm bold>— Sarah Chen, Lead Engineer</Text>
        </Blockquote>
        <Blockquote success>
          <Text italic>We shipped our new dashboard in half the time thanks to VaneUI components.</Text>
          <Text sm bold>— Alex Rivera, Product Manager</Text>
        </Blockquote>
      </Col>
    ),
  },
  {
    title: 'Variants',
    md: 'Use `filled` for solid background blockquotes or `outline` (default) for the left-border accent style.',
    component: (
      <Col>
        <Blockquote primary>Outline (default) — with a left border accent.</Blockquote>
        <Blockquote primary filled>Filled — solid background for emphasis.</Blockquote>
        <Blockquote info>Outline info — informational note.</Blockquote>
        <Blockquote info filled>Filled info — strong callout.</Blockquote>
      </Col>
    ),
  },
];
