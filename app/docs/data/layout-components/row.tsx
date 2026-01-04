'use client'

import { Row, Col, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const rowExamples: DocsPagePart[] = [
  {
    title: 'Basic Row',
    md: 'A horizontal flex container.',
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
    md: 'Rows come in different sizes.',
    component: (
      <Col lg>
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
      </Col>
    ),
  },
  {
    title: 'Row with Gap',
    md: 'Control spacing between row items.',
    component: (
      <Col lg>
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
          <Row>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Row>
        </div>
      </Col>
    ),
  },
  {
    title: 'Row Wrap Options',
    md: 'Control how items wrap within the row.',
    component: (
      <Col lg>
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
      </Col>
    ),
  },
  {
    title: 'Row Justification',
    md: 'Control how items are distributed along the main axis.',
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
    md: 'Rows can have different background appearances.',
    component: (
      <Col lg>
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
      </Col>
    ),
  },
  {
    title: 'Row Reverse',
    md: 'Reverse the order of items in the row.',
    component: (
      <Col lg>
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
      </Col>
    ),
  },
  {
    title: 'Row Items Alignment',
    md: 'Control cross-axis alignment of items with `itemsStart`, `itemsCenter`, `itemsEnd`, `itemsStretch`.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Items Start</Text>
          <Row itemsStart className="h-24 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Short</div>
            <div className="p-4 bg-gray-100 rounded h-16">Tall</div>
          </Row>
        </div>
        <div>
          <Text semibold>Items Center (default)</Text>
          <Row className="h-24 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Short</div>
            <div className="p-4 bg-gray-100 rounded h-16">Tall</div>
          </Row>
        </div>
        <div>
          <Text semibold>Items End</Text>
          <Row itemsEnd className="h-24 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Short</div>
            <div className="p-4 bg-gray-100 rounded h-16">Tall</div>
          </Row>
        </div>
      </Col>
    ),
  },
  {
    title: 'Responsive Breakpoints',
    md: 'Rows can switch to column layout at specific breakpoints using `mobileCol`, `tabletCol`, `desktopCol`.',
    component: (
      <Row mobileCol>
        <div className="p-4 bg-primary-100 rounded flex-1">Column 1 - Switches to stacked on tablet and below</div>
        <div className="p-4 bg-primary-100 rounded flex-1">Column 2</div>
        <div className="p-4 bg-primary-100 rounded flex-1">Column 3</div>
      </Row>
    ),
  },
  {
    title: 'Row Variants',
    md: 'Rows support `filled` and `outline` variants for different visual styles.',
    component: (
      <Col lg>
        <Row filled primary>
          <div className="p-4 bg-white rounded">Filled Primary Row</div>
          <div className="p-4 bg-white rounded">Item 2</div>
        </Row>
        <Row outline success>
          <div className="p-4 rounded">Outline Success Row</div>
          <div className="p-4 rounded">Item 2</div>
        </Row>
      </Col>
    ),
  },
];