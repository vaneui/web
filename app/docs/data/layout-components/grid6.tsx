'use client'

import { Grid6, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const grid6Examples: DocsPagePart[] = [
  {
    title: 'Basic Grid6',
    md: 'A six-column grid layout that creates balanced, visually appealing arrangements.',
    component: (
      <Grid6>
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
        <div className="p-4 bg-gray-100 rounded">Item 11</div>
        <div className="p-4 bg-gray-100 rounded">Item 12</div>
      </Grid6>
    ),
  },
  {
    title: 'Grid Sizes',
    md: 'Grids come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Extra Small Grid6</Text>
          <Grid6 xs>
            <div className="p-1 bg-gray-100 rounded text-xs text-center">1</div>
            <div className="p-1 bg-gray-100 rounded text-xs text-center">2</div>
            <div className="p-1 bg-gray-100 rounded text-xs text-center">3</div>
            <div className="p-1 bg-gray-100 rounded text-xs text-center">4</div>
            <div className="p-1 bg-gray-100 rounded text-xs text-center">5</div>
            <div className="p-1 bg-gray-100 rounded text-xs text-center">6</div>
          </Grid6>
        </div>
        <div>
          <Text semibold>Large Grid6</Text>
          <Grid6 lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
            <div className="p-6 bg-gray-100 rounded">Item 4</div>
            <div className="p-6 bg-gray-100 rounded">Item 5</div>
            <div className="p-6 bg-gray-100 rounded">Item 6</div>
          </Grid6>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid with Gap Control',
    md: 'Control spacing between grid items for different layout requirements.',
    component: (
      <Col lg>
        <div>
          <Text semibold>No Gap</Text>
          <Grid6 noGap>
            <div className="p-2 bg-gray-100 border text-center">1</div>
            <div className="p-2 bg-gray-100 border text-center">2</div>
            <div className="p-2 bg-gray-100 border text-center">3</div>
            <div className="p-2 bg-gray-100 border text-center">4</div>
            <div className="p-2 bg-gray-100 border text-center">5</div>
            <div className="p-2 bg-gray-100 border text-center">6</div>
          </Grid6>
        </div>
        <div>
          <Text semibold>With Gap</Text>
          <Grid6 gap>
            <div className="p-2 bg-gray-100 rounded text-center">1</div>
            <div className="p-2 bg-gray-100 rounded text-center">2</div>
            <div className="p-2 bg-gray-100 rounded text-center">3</div>
            <div className="p-2 bg-gray-100 rounded text-center">4</div>
            <div className="p-2 bg-gray-100 rounded text-center">5</div>
            <div className="p-2 bg-gray-100 rounded text-center">6</div>
          </Grid6>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid Appearances',
    md: 'Different background appearances to create visual hierarchy and organization.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Primary Background</Text>
          <Grid6 primary>
            <div className="p-3 bg-white rounded shadow-sm text-center">1</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">2</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">3</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">4</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">5</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">6</div>
          </Grid6>
        </div>
        <div>
          <Text semibold>Secondary Background</Text>
          <Grid6 secondary>
            <div className="p-3 bg-white rounded shadow-sm text-center">1</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">2</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">3</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">4</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">5</div>
            <div className="p-3 bg-white rounded shadow-sm text-center">6</div>
          </Grid6>
        </div>
      </Col>
    ),
  },
  {
    title: 'Icon Grid Example',
    md: 'Perfect for displaying collections of icons, features, or small cards in a compact layout.',
    component: (
      <Grid6>
        <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded text-center">
          <div className="w-8 h-8 bg-red-400 rounded-full mx-auto mb-2"></div>
          <Text xs>Feature</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded text-center">
          <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto mb-2"></div>
          <Text xs>Service</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded text-center">
          <div className="w-8 h-8 bg-green-400 rounded-full mx-auto mb-2"></div>
          <Text xs>Product</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded text-center">
          <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2"></div>
          <Text xs>Support</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded text-center">
          <div className="w-8 h-8 bg-purple-400 rounded-full mx-auto mb-2"></div>
          <Text xs>Tool</Text>
        </div>
        <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded text-center">
          <div className="w-8 h-8 bg-pink-400 rounded-full mx-auto mb-2"></div>
          <Text xs>Resource</Text>
        </div>
      </Grid6>
    ),
  },
];