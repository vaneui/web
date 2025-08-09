'use client'

import { Grid4, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const grid4Examples: DocsComponentExample[] = [
  {
    title: 'Basic Grid4',
    md: 'A four-column grid layout.',
    component: (
      <Grid4>
        <div className="p-4 bg-gray-100 rounded">Item 1</div>
        <div className="p-4 bg-gray-100 rounded">Item 2</div>
        <div className="p-4 bg-gray-100 rounded">Item 3</div>
        <div className="p-4 bg-gray-100 rounded">Item 4</div>
        <div className="p-4 bg-gray-100 rounded">Item 5</div>
        <div className="p-4 bg-gray-100 rounded">Item 6</div>
        <div className="p-4 bg-gray-100 rounded">Item 7</div>
        <div className="p-4 bg-gray-100 rounded">Item 8</div>
      </Grid4>
    ),
  },
  {
    title: 'Grid Sizes',
    md: 'Grids come in different sizes.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Extra Small Grid4</Text>
          <Grid4 xs>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
            <div className="p-2 bg-gray-100 rounded text-sm">Item 4</div>
          </Grid4>
        </div>
        <div>
          <Text semibold>Large Grid4</Text>
          <Grid4 lg>
            <div className="p-6 bg-gray-100 rounded">Item 1</div>
            <div className="p-6 bg-gray-100 rounded">Item 2</div>
            <div className="p-6 bg-gray-100 rounded">Item 3</div>
            <div className="p-6 bg-gray-100 rounded">Item 4</div>
          </Grid4>
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
          <Grid4 noGap>
            <div className="p-4 bg-gray-100 border">Item 1</div>
            <div className="p-4 bg-gray-100 border">Item 2</div>
            <div className="p-4 bg-gray-100 border">Item 3</div>
            <div className="p-4 bg-gray-100 border">Item 4</div>
          </Grid4>
        </div>
        <div>
          <Text semibold>With Gap</Text>
          <Grid4 gap>
            <div className="p-4 bg-gray-100 rounded">Item 1</div>
            <div className="p-4 bg-gray-100 rounded">Item 2</div>
            <div className="p-4 bg-gray-100 rounded">Item 3</div>
            <div className="p-4 bg-gray-100 rounded">Item 4</div>
          </Grid4>
        </div>
      </Col>
    ),
  },
  {
    title: 'Grid Appearances',
    md: 'Grids can have different background appearances.',
    component: (
      <Col lg>
        <Grid4 primary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
          <div className="p-4 bg-white rounded">Item 4</div>
        </Grid4>
        <Grid4 secondary>
          <div className="p-4 bg-white rounded">Item 1</div>
          <div className="p-4 bg-white rounded">Item 2</div>
          <div className="p-4 bg-white rounded">Item 3</div>
          <div className="p-4 bg-white rounded">Item 4</div>
        </Grid4>
      </Col>
    ),
  },
];