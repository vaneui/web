'use client'

import { Col, Row, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const colExamples: DocsPagePart[] = [
  {
    title: 'Basic Col',
    md: 'A vertical flex container that arranges children in a column.',
    component: (
      <Col gap>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Col>
    ),
  },
  {
    title: 'Col Spacing',
    md: 'Use `gap` for spacing between items. Size props control the gap amount.',
    component: (
      <Row gap>
        <Col sm gap>
          <Text semibold>Small Gap</Text>
          <div className="p-3 bg-gray-100 rounded">Item 1</div>
          <div className="p-3 bg-gray-100 rounded">Item 2</div>
        </Col>
        <Col lg gap>
          <Text semibold>Large Gap</Text>
          <div className="p-3 bg-gray-100 rounded">Item 1</div>
          <div className="p-3 bg-gray-100 rounded">Item 2</div>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col Alignment',
    md: 'Control alignment with `justifyCenter`, `justifyBetween`, `itemsCenter`, etc.',
    component: (
      <Row gap>
        <Col justifyCenter className="h-40 w-32 border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Centered</div>
        </Col>
        <Col justifyBetween className="h-40 w-32 border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Top</div>
          <div className="p-4 bg-gray-100 rounded">Bottom</div>
        </Col>
        <Col itemsCenter className="h-40 w-32 border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Center</div>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col Variants',
    md: 'Use `filled` or `outline` with appearance props for styled columns.',
    component: (
      <Row gap>
        <Col filled primary gap className="flex-1">
          <div className="p-4 bg-white/80 rounded">Filled Primary</div>
          <div className="p-4 bg-white/80 rounded">Item 2</div>
        </Col>
        <Col outline success gap className="flex-1">
          <div className="p-4 rounded">Outline Success</div>
          <div className="p-4 rounded">Item 2</div>
        </Col>
      </Row>
    ),
  },
];
