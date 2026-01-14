'use client'

import { Row, Col, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const rowExamples: DocsPagePart[] = [
  {
    title: 'Basic Row',
    md: 'A horizontal flex container that arranges children in a row.',
    component: (
      <Row gap>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Row>
    ),
  },
  {
    title: 'Row Spacing',
    md: 'Use `gap` for spacing between items. Size props control the gap amount.',
    component: (
      <Col gap>
        <Text semibold>Small Gap</Text>
        <Row sm gap>
          <div className="p-3 bg-gray-100 rounded">Item 1</div>
          <div className="p-3 bg-gray-100 rounded">Item 2</div>
          <div className="p-3 bg-gray-100 rounded">Item 3</div>
        </Row>
        <Text semibold>Large Gap</Text>
        <Row lg gap>
          <div className="p-3 bg-gray-100 rounded">Item 1</div>
          <div className="p-3 bg-gray-100 rounded">Item 2</div>
          <div className="p-3 bg-gray-100 rounded">Item 3</div>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Row Alignment',
    md: 'Control alignment with `justifyCenter`, `justifyBetween`, `itemsCenter`, etc.',
    component: (
      <Col gap>
        <Text semibold>Justify Between</Text>
        <Row justifyBetween className="border-2 border-dashed border-gray-300 p-2">
          <div className="p-4 bg-gray-100 rounded">Left</div>
          <div className="p-4 bg-gray-100 rounded">Right</div>
        </Row>
        <Text semibold>Items Center</Text>
        <Row itemsCenter gap className="border-2 border-dashed border-gray-300 p-2 h-24">
          <div className="p-2 bg-gray-100 rounded">Small</div>
          <div className="p-6 bg-gray-100 rounded">Tall</div>
          <div className="p-2 bg-gray-100 rounded">Small</div>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Row Wrap',
    md: 'Use `flexWrap` to allow items to wrap to the next line when they overflow.',
    component: (
      <Row flexWrap gap className="max-w-md border-2 border-dashed border-gray-300 p-2">
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
        <div className="p-4 bg-gray-100 rounded">Item 4</div>
        <div className="p-4 bg-gray-100 rounded">Item 5</div>
      </Row>
    ),
  },
  {
    title: 'Row Variants',
    md: 'Use `filled` or `outline` with appearance props for styled rows.',
    component: (
      <Col gap>
        <Row filled primary gap>
          <div className="p-4 bg-white/80 rounded">Filled Primary</div>
          <div className="p-4 bg-white/80 rounded">Item 2</div>
        </Row>
        <Row outline success gap>
          <div className="p-4 rounded">Outline Success</div>
          <div className="p-4 rounded">Item 2</div>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Text Alignment',
    md: 'Use `textCenter`, `textLeft`, `textRight`, or `textJustify` to control text alignment within the row.',
    component: (
      <Col gap>
        <Row textLeft className="border-2 border-dashed border-gray-300 p-4">
          <Text>Left aligned content in a row.</Text>
        </Row>
        <Row textCenter className="border-2 border-dashed border-gray-300 p-4">
          <Text>Center aligned content in a row.</Text>
        </Row>
        <Row textRight className="border-2 border-dashed border-gray-300 p-4">
          <Text>Right aligned content in a row.</Text>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Responsive Layout',
    md: 'Use `mobileCol` or `tabletCol` to switch to column layout on smaller screens.',
    component: (
      <Row tabletCol gap>
        <Col className="flex-1 p-4 bg-primary-100 rounded">
          <Text semibold>Column 1</Text>
          <Text>Horizontal on desktop, stacked on tablet and below.</Text>
        </Col>
        <Col className="flex-1 p-4 bg-primary-100 rounded">
          <Text semibold>Column 2</Text>
          <Text>Resize to see the responsive behavior.</Text>
        </Col>
      </Row>
    ),
  },
];
