'use client'

import { Row, Col, Text } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const rowExamples: DocsComponentExample[] = [
  {
    title: 'Basic Row',
    description: 'A horizontal flex container.',
    component: (
      <Row>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Row>
    ),
  },
  {
    title: 'Row Sizes',
    description: 'Rows come in different sizes.',
    component: (
      <div className="space-y-4">
        <div>
          <Text semibold>Extra Small Row</Text>
          <Row xs>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
          </Row>
        </div>
        <div>
          <Text semibold>Large Row</Text>
          <Row lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
          </Row>
        </div>
      </div>
    ),
  },
  {
    title: 'Row with Gap',
    description: 'Control spacing between row items.',
    component: (
      <div className="space-y-4">
        <div>
          <Text semibold>No Gap</Text>
          <Row noGap>
            <div className="p-4 bg-gray-100 border">Item 1</div>
            <div className="p-4 bg-gray-100 border">Item 2</div>
            <div className="p-4 bg-gray-100 border">Item 3</div>
          </Row>
        </div>
        <div>
          <Text semibold>With Gap</Text>
          <Row gap>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Row>
        </div>
      </div>
    ),
  },
  {
    title: 'Row Wrap Options',
    description: 'Control how items wrap within the row.',
    component: (
      <div className="space-y-4">
        <div>
          <Text semibold>Flex Wrap</Text>
          <Row flexWrap className="max-w-md">
            <div className="p-4 bg-gray-100 rounded">Long Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 3</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 4</div>
          </Row>
        </div>
        <div>
          <Text semibold>No Wrap</Text>
          <Row flexNoWrap className="max-w-md">
            <div className="p-4 bg-gray-100 rounded">Long Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 3</div>
          </Row>
        </div>
      </div>
    ),
  },
  {
    title: 'Row Justification',
    description: 'Control how items are distributed along the main axis.',
    component: (
      <div className="space-y-4 min-w-80">
        <Col>
          <Text semibold>Justify Start</Text>
          <Row justifyStart className="w-full border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Row>
        </Col>
        <Col>
          <Text semibold>Justify Center</Text>
          <Row justifyCenter className="w-full border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Row>
        </Col>
        <Col>
          <Text semibold>Justify Between</Text>
          <Row justifyBetween className="w-full border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Row>
        </Col>
      </div>
    ),
  },
  {
    title: 'Row Appearances',
    description: 'Rows can have different background appearances.',
    component: (
      <div className="space-y-4">
        <Row primary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Row>
        <Row secondary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Row>
      </div>
    ),
  },
  {
    title: 'Row Reverse',
    description: 'Reverse the order of items in the row.',
    component: (
      <div className="space-y-4">
        <div>
          <Text semibold>Normal Order</Text>
          <Row>
            <div className="p-4 bg-gray-100 rounded">First</div>
            <div className="p-4 bg-gray-200 rounded">Second</div>
            <div className="p-4 bg-gray-300 rounded">Third</div>
          </Row>
        </div>
        <div>
          <Text semibold>Reverse Order</Text>
          <Row reverse>
            <div className="p-4 bg-gray-100 rounded">First</div>
            <div className="p-4 bg-gray-200 rounded">Second</div>
            <div className="p-4 bg-gray-300 rounded">Third</div>
          </Row>
        </div>
      </div>
    ),
  },
];