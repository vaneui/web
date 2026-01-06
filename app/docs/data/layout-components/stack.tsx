'use client'

import { Stack, Row, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const stackExamples: DocsPagePart[] = [
  {
    title: 'Basic Stack',
    md: 'A flexible layout container that arranges children vertically by default.',
    component: (
      <Stack gap>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Stack>
    ),
  },
  {
    title: 'Stack Direction',
    md: 'Use `row` for horizontal layout, default is column (vertical).',
    component: (
      <Row flexWrap gap>
        <Col>
          <Text semibold>Column (default)</Text>
          <Stack gap>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
        <Col>
          <Text semibold>Row</Text>
          <Stack row gap>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Spacing',
    md: 'Use `gap` for spacing between items, `noGap` to remove it. Size props (`sm`, `lg`) control the gap amount.',
    component: (
      <Row flexWrap gap>
        <Col>
          <Text semibold>Small Gap</Text>
          <Stack sm gap>
            <div className="p-3 bg-gray-100 rounded">Item 1</div>
            <div className="p-3 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
        <Col>
          <Text semibold>Large Gap</Text>
          <Stack lg gap>
            <div className="p-3 bg-gray-100 rounded">Item 1</div>
            <div className="p-3 bg-gray-100 rounded">Item 2</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Alignment',
    md: 'Control alignment with `justifyCenter`, `justifyBetween`, `itemsCenter`, etc.',
    component: (
      <Row flexWrap gap>
        <Col>
          <Text semibold>Justify Center</Text>
          <Stack justifyCenter className="h-32 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Centered</div>
          </Stack>
        </Col>
        <Col>
          <Text semibold>Justify Between</Text>
          <Stack justifyBetween className="h-32 border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded">Top</div>
            <div className="p-4 bg-gray-100 rounded">Bottom</div>
          </Stack>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Stack Variants',
    md: 'Use `filled` or `outline` with appearance props for styled containers.',
    component: (
      <Row flexWrap gap>
        <Stack filled primary gap>
          <div className="p-4 bg-white/80 rounded">Filled Primary</div>
          <div className="p-4 bg-white/80 rounded">Item 2</div>
        </Stack>
        <Stack outline success gap>
          <div className="p-4 rounded">Outline Success</div>
          <div className="p-4 rounded">Item 2</div>
        </Stack>
      </Row>
    ),
  },
  {
    title: 'Responsive Layout',
    md: 'Use `mobileCol` or `tabletCol` to switch between row and column layouts responsively.',
    component: (
      <Stack row tabletCol gap>
        <div className="p-4 bg-primary-100 rounded flex-1">
          <Text semibold>Column 1</Text>
          <Text>Horizontal on desktop, stacked on tablet and below.</Text>
        </div>
        <div className="p-4 bg-primary-100 rounded flex-1">
          <Text semibold>Column 2</Text>
          <Text>Resize to see the responsive behavior.</Text>
        </div>
      </Stack>
    ),
  },
];
