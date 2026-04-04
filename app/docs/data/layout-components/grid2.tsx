'use client'

import { Grid2, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const grid2Examples: DocsPagePart[] = [
  {
    title: 'Basic Grid2',
    md: 'A two-column grid layout.',
    component: (
      <Grid2>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
        <div className="p-4 bg-gray-100 rounded">Item 4</div>
      </Grid2>
    ),
  },
  {
    title: 'Grid Sizes',
    md: 'Grids come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Extra Small Grid2</Text>
          <Grid2 xs>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
          </Grid2>
        </div>
        <div>
          <Text semibold>Large Grid2</Text>
          <Grid2 lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
          </Grid2>
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
          <Grid2 noGap>
            <div className="p-4 bg-gray-100 border">Item 1</div>
            <div className="p-4 bg-gray-100 border">Item 2</div>
          </Grid2>
        </div>
        <div>
          <Text semibold>With Gap</Text>
          <Grid2>
            <div className="p-4 bg-gray-100 rounded">Item 1 (default with gap)</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
          </Grid2>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid Appearances',
    md: 'Grids can have different background appearances.',
    component: (
      <Col lg>
        <Grid2 primary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
        </Grid2>
        <Grid2 secondary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
        </Grid2>
      </Col>
    ),
  },
  {
    title: 'Grid Variants',
    md: 'Grids support filled and outline variants.',
    component: (
      <Col lg>
        <Grid2 filled primary>
          <div className="p-4 bg-white rounded">Filled Primary Grid</div>
          <div className="p-4 bg-white rounded">Item 2</div>
        </Grid2>
        <Grid2 outline success>
          <div className="p-4 rounded">Outline Success Grid</div>
          <div className="p-4 rounded">Item 2</div>
        </Grid2>
      </Col>
    ),
  },
];
