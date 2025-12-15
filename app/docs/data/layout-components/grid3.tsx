'use client'

import { Grid3, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const grid3Examples: DocsPagePart[] = [
  {
    title: 'Basic Grid3',
    md: 'A three-column grid layout.',
    component: (
      <Grid3>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
        <div className="p-4 bg-gray-100 rounded">Item 4</div>
        <div className="p-4 bg-gray-100 rounded">Item 5</div>
        <div className="p-4 bg-gray-100 rounded">Item 6</div>
      </Grid3>
    ),
  },
  {
    title: 'Grid Sizes',
    md: 'Grids come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Extra Small Grid3</Text>
          <Grid3 xs>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
          </Grid3>
        </div>
        <div>
          <Text semibold>Large Grid3</Text>
          <Grid3 lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
          </Grid3>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid with Gap',
    md: 'Control spacing between grid items.',
    component: (
      <Col lg>
        <div>
          <Text semibold>No Gap</Text>
          <Grid3 noGap>
            <div className="p-4 bg-gray-100 border">Item 1</div>
            <div className="p-4 bg-gray-100 border">Item 2</div>
            <div className="p-4 bg-gray-100 border">Item 3</div>
          </Grid3>
        </div>
        <div>
          <Text semibold>With Gap</Text>
          <Grid3>
            <div className="p-4 bg-gray-100 rounded">Item 1 (default with gap)</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Grid3>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid Appearances',
    md: 'Grids can have different background appearances.',
    component: (
      <Col lg>
        <Grid3 primary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Grid3>
        <Grid3 secondary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Grid3>
      </Col>
    ),
  },
  {
    title: 'Grid Variants',
    md: 'Grids support filled and outline variants.',
    component: (
      <Col lg>
        <Grid3 filled primary>
          <div className="p-4 bg-white rounded">Filled Primary Grid</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
        </Grid3>
        <Grid3 outline success>
          <div className="p-4 rounded">Outline Success Grid</div>
          <div className="p-4 rounded">Item 2</div>
          <div className="p-4 rounded">Item 3</div>
        </Grid3>
      </Col>
    ),
  },
];