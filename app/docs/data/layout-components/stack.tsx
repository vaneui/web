'use client'

import { Stack, Row, Text, Col, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const stackExamples: DocsPagePart[] = [
  {
    title: 'Basic Stack',
    md: 'A flexible layout container.',
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
    md: 'Stacks come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
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
    md: 'Control spacing between stack items.',
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
          <Stack>
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
    md: 'Control the direction of stack content.',
    component: (
      <Row flexWrap>
        <Col lg>
          <Text semibold>Default (Column Direction)</Text>
          <Stack>
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
    md: 'Control how items wrap within the stack.',
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
    md: 'Control how items are distributed along the main axis.',
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
    md: 'Stacks can have different background appearances.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
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
    md: 'Reverse the order of items in the stack.',
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
    md: 'Control stack internal padding.',
    component: (
      <Row flexWrap>
        <Stack className="border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Item 1 (default with padding)</div>
          <div className="p-4 bg-gray-100 rounded">Item 2</div>
        </Stack>
        <Stack noPadding className="border-2 border-dashed border-gray-300">
          <div className="p-4 bg-gray-100 rounded">Item 1</div>
          <div className="p-4 bg-gray-100 rounded">Item 2</div>
        </Stack>
      </Row>
    ),
  },
  {
    title: 'Responsive Breakpoints',
    md: 'Stacks can switch direction at specific breakpoints using mobileCol, tabletCol, laptopCol, desktopCol.',
    component: (
      <Stack tabletCol>
        <div className="p-4 bg-primary-100 rounded flex-1">Column 1 - Switches to row on tablet and below</div>
        <div className="p-4 bg-primary-100 rounded flex-1">Column 2</div>
        <div className="p-4 bg-primary-100 rounded flex-1">Column 3</div>
      </Stack>
    ),
  },
  {
    title: 'Stack Variants',
    md: 'Stacks support filled and outline variants.',
    component: (
      <Row flexWrap>
        <Stack filled primary>
          <div className="p-4 bg-white rounded">Filled Primary Stack</div>
          <div className="p-4 bg-white rounded">Item 2</div>
        </Stack>
        <Stack outline success>
          <div className="p-4 rounded">Outline Success Stack</div>
          <div className="p-4 rounded">Item 2</div>
        </Stack>
      </Row>
    ),
  },
];