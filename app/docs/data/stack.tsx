'use client'

import { Stack, Row, Text, Col, APPEARANCE_KEYS } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const stackExamples: DocsComponentExample[] = [
  {
    title: 'Basic Stack',
    description: 'A flexible layout container.',
    component: (
      <Stack>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Stack>
    ),
  },
  {
    title: 'Stack Sizes',
    description: 'Stacks come in different sizes.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>Extra Small Stack</Text>
          <Stack xs>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>Large Stack</Text>
          <Stack lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack with Gap',
    description: 'Control spacing between stack items.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>No Gap</Text>
          <Stack noGap>
            <div className="p-4 bg-gray-100 border">Item 1</div>
            <div className="p-4 bg-gray-100 border">Item 2</div>
            <div className="p-4 bg-gray-100 border">Item 3</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>With Gap</Text>
          <Stack gap>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Flex Direction',
    description: 'Control the direction of stack content.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>Column Direction</Text>
          <Stack column>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>Row Direction</Text>
          <Stack row>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Wrap Options',
    description: 'Control how items wrap within the stack.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>Flex Wrap</Text>
          <Stack flexWrap row className="max-w-md">
            <div className="p-4 bg-gray-100 rounded">Long Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 3</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 4</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>No Wrap</Text>
          <Stack flexNoWrap row className="max-w-md">
            <div className="p-4 bg-gray-100 rounded">Long Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Long Item 3</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Justification',
    description: 'Control how items are distributed along the main axis.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>Justify Start</Text>
          <Stack justifyStart className="h-40 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>Justify Center</Text>
          <Stack justifyCenter className="h-40 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>Justify Between</Text>
          <Stack justifyBetween className="h-40 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Appearances',
    description: 'Stacks can have different background appearances.',
    component: (
      <Row flexWrap>
        {
          APPEARANCE_KEYS.map((key: string) => (
            <Stack key={key} {...{[key]: true}}>
              <div className="p-4 bg-white rounded">Item 1</div>
              <div className="p-4 bg-white rounded">Item 2</div>
              <div className="p-4 bg-white rounded">Item 3</div>
            </Stack>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Stack Reverse',
    description: 'Reverse the order of items in the stack.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>Normal Order</Text>
          <Stack>
            <div className="p-4 bg-gray-100 rounded">First</div>
            <div className="p-4 bg-gray-200 rounded">Second</div>
            <div className="p-4 bg-gray-300 rounded">Third</div>
          </Stack>
        </Col>
        <Col lg>
          <Text semibold>Reverse Order</Text>
          <Stack reverse>
            <div className="p-4 bg-gray-100 rounded">First</div>
            <div className="p-4 bg-gray-200 rounded">Second</div>
            <div className="p-4 bg-gray-300 rounded">Third</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack with Padding',
    description: 'Control stack internal padding.',
    component: (
      <Row flexWrap>
        <Stack padding className="border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Item 1</div>
          <div className="p-4 bg-gray-100 rounded">Item 2</div>
        </Stack>
        <Stack noPadding className="border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Item 1</div>
          <div className="p-4 bg-gray-100 rounded">Item 2</div>
        </Stack>
      </Row>
    ),
  },
];