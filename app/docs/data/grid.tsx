'use client'

import { Grid3, Grid4, Text, Row } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

export const gridExamples: DocsComponentExample[] = [
  {
    title: 'Basic Grid3',
    description: 'A three-column grid layout.',
    component: (
      <Grid3>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
      </Grid3>
    ),
  },
  {
    title: 'Basic Grid4',
    description: 'A four-column grid layout.',
    component: (
      <Grid4>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
        <div className="p-4 bg-gray-100 rounded">Item 4</div>
      </Grid4>
    ),
  },
  {
    title: 'Grid Sizes',
    description: 'Grids come in different sizes.',
    component: (
      <div className="space-y-4">
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
      </div>
    ),
  },
  {
    title: 'Grid with Gap',
    description: 'Control spacing between grid items.',
    component: (
      <div className="space-y-4">
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
          <Grid3 gap>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
          </Grid3>
        </div>
      </div>
    ),
  },
  {
    title: 'Grid Appearances',
    description: 'Grids can have different background appearances.',
    component: (
      <div className="space-y-4">
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
      </div>
    ),
  },
];