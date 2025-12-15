'use client'

import { Grid5, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const grid5Examples: DocsPagePart[] = [
  {
    title: 'Basic Grid5',
    md: 'A five-column grid layout that automatically wraps items.',
    component: (
      <Grid5>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
        <div className="p-4 bg-gray-100 rounded">Item 4</div>
        <div className="p-4 bg-gray-100 rounded">Item 5</div>
        <div className="p-4 bg-gray-100 rounded">Item 6</div>
        <div className="p-4 bg-gray-100 rounded">Item 7</div>
        <div className="p-4 bg-gray-100 rounded">Item 8</div>
        <div className="p-4 bg-gray-100 rounded">Item 9</div>
        <div className="p-4 bg-gray-100 rounded">Item 10</div>
      </Grid5>
    ),
  },
  {
    title: 'Grid Sizes',
    md: 'Grids come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Extra Small Grid5</Text>
          <Grid5 xs>
            <div className="p-2 bg-gray-100 rounded text-sm">1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">2</div>
            <div className="p-2 bg-gray-100 rounded text-sm">3</div>
            <div className="p-2 bg-gray-100 rounded text-sm">4</div>
            <div className="p-2 bg-gray-100 rounded text-sm">5</div>
          </Grid5>
        </div>
        <div>
          <Text semibold>Large Grid5</Text>
          <Grid5 lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
            <div className="p-6 bg-gray-100 rounded">Item 4</div>
            <div className="p-6 bg-gray-100 rounded">Item 5</div>
          </Grid5>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid with Gap Control',
    md: 'Control spacing between grid items using gap properties.',
    component: (
      <Col lg>
        <div>
          <Text semibold>No Gap</Text>
          <Grid5 noGap>
            <div className="p-4 bg-gray-100 border">1</div>
            <div className="p-4 bg-gray-100 border">2</div>
            <div className="p-4 bg-gray-100 border">3</div>
            <div className="p-4 bg-gray-100 border">4</div>
            <div className="p-4 bg-gray-100 border">5</div>
          </Grid5>
        </div>
        <div>
          <Text semibold>With Gap</Text>
          <Grid5>
            <div className="p-4 bg-gray-100 rounded">1 (default with gap)</div>
            <div className="p-4 bg-gray-100 rounded">2</div>
            <div className="p-4 bg-gray-100 rounded">3</div>
            <div className="p-4 bg-gray-100 rounded">4</div>
            <div className="p-4 bg-gray-100 rounded">5</div>
          </Grid5>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid Appearances',
    md: 'Grids can have different background appearances for visual hierarchy.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Primary Background</Text>
          <Grid5 primary>
            <div className="p-4 bg-white rounded shadow-sm">Item 1</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 2</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 3</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 4</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 5</div>
          </Grid5>
        </div>
        <div>
          <Text semibold>Secondary Background</Text>
          <Grid5 secondary>
            <div className="p-4 bg-white rounded shadow-sm">Item 1</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 2</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 3</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 4</div>
            <div className="p-4 bg-white rounded shadow-sm">Item 5</div>
          </Grid5>
        </div>
      </Col>
    ),
  },
  {
    title: 'Responsive Grid',
    md: 'Grid5 adapts to different screen sizes, maintaining optimal column distribution.',
    component: (
      <Grid5>
        <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded">
          <Text semibold>Feature 1</Text>
          <Text sm>Responsive design</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded">
          <Text semibold>Feature 2</Text>
          <Text sm>Flexible layout</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded">
          <Text semibold>Feature 3</Text>
          <Text sm>Easy to use</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded">
          <Text semibold>Feature 4</Text>
          <Text sm>Customizable</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-200 rounded">
          <Text semibold>Feature 5</Text>
          <Text sm>Modern styling</Text>
        </div>
      </Grid5>
    ),
  },
];