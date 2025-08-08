'use client'

import { Col, Row, Text } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const colExamples: DocsComponentExample[] = [
  {
    title: 'Basic Col',
    description: 'A vertical flex container.',
    component: (
      <Col>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Col>
    ),
  },
  {
    title: 'Col Sizes',
    description: 'Cols come in different sizes.',
    component: (
      <Row>
        <Col lg>
          <Text semibold>Extra Small Col</Text>
          <Col xs>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
          </Col>
        </Col>
        <Col lg>
          <Text semibold>Large Col</Text>
          <Col lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
          </Col>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col with Gap',
    description: 'Control spacing between col items.',
    component: (
      <Row>
        <Col lg>
          <Text semibold>No Gap</Text>
          <Col noGap>
            <div className="p-4 bg-gray-100 border">Item 1</div>
            <div className="p-4 bg-gray-100 border">Item 2</div>
            <div className="p-4 bg-gray-100 border">Item 3</div>
          </Col>
        </Col>
        <Col lg>
          <Text semibold>With Gap</Text>
          <Col>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Col>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col Wrap Options',
    description: 'Control how items wrap within the col.',
    component: (
      <Row>
        <Col lg>
          <Text semibold>Flex Wrap</Text>
          <Col flexWrap className="max-h-40">
            <div className="p-4 bg-gray-100 rounded">Tall Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Tall Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Tall Item 3</div>
            <div className="p-4 bg-gray-100 rounded">Tall Item 4</div>
          </Col>
        </Col>
        <Col lg>
          <Text semibold>No Wrap</Text>
          <Col flexNoWrap className="max-h-40">
            <div className="p-4 bg-gray-100 rounded">Tall Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Tall Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Tall Item 3</div>
          </Col>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col Justification',
    description: 'Control how items are distributed along the main axis.',
    component: (
      <Row>
        <Col lg>
          <Text semibold>Justify Start</Text>
          <Col justifyStart className="h-40 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Col>
        </Col>
        <Col lg>
          <Text semibold>Justify Center</Text>
          <Col justifyCenter className="h-40 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Col>
        </Col>
        <Col lg>
          <Text semibold>Justify Between</Text>
          <Col justifyBetween className="h-40 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Col>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col Appearances',
    description: 'Cols can have different background appearances.',
    component: (
      <Row>
        <Col primary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Col>
        <Col secondary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Col Reverse',
    description: 'Reverse the order of items in the col.',
    component: (
      <Row>
        <Col lg>
          <Text semibold>Normal Order</Text>
          <Col>
            <div className="p-4 bg-gray-100 rounded">First</div>
            <div className="p-4 bg-gray-200 rounded">Second</div>
            <div className="p-4 bg-gray-300 rounded">Third</div>
          </Col>
        </Col>
        <Col lg>
          <Text semibold>Reverse Order</Text>
          <Col reverse>
            <div className="p-4 bg-gray-100 rounded">First</div>
            <div className="p-4 bg-gray-200 rounded">Second</div>
            <div className="p-4 bg-gray-300 rounded">Third</div>
          </Col>
        </Col>
      </Row>
    ),
  },
];