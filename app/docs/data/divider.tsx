'use client'

import { Divider, Text, Col, SIZE_KEYS, APPEARANCE_KEYS } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const dividerExamples: DocsComponentExample[] = [
  {
    title: 'Basic Divider',
    description: 'A simple horizontal divider.',
    component: (
      <div>
        <Text>Content above the divider</Text>
        <Divider />
        <Text>Content below the divider</Text>
      </div>
    ),
  },
  {
    title: 'Divider Sizes',
    description: 'Dividers come in different sizes.',
    component: (
      <Col lg>
        {
          SIZE_KEYS.map((key: string) => (
            <div key={key}>
              <Text semibold>Divider {key}</Text>
              <Divider {...{[key]: true}} />
              <Text>Content after {key} divider</Text>
            </div>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Divider Appearances',
    description: 'Dividers can have different appearances.',
    component: (
      <Col lg>
        {
          APPEARANCE_KEYS.slice(0, 6).map((key: string) => (
            <div key={key}>
              <Text semibold>Divider {key}</Text>
              <Divider {...{[key]: true}} />
              <Text>Content after {key} divider</Text>
            </div>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Divider in Lists',
    description: 'Dividers used to separate list items.',
    component: (
      <Col>
        <div className="p-4 bg-gray-50 rounded">
          <Text semibold>First List Item</Text>
          <Text>Description of first item</Text>
        </div>
        <Divider />
        <div className="p-4 bg-gray-50 rounded">
          <Text semibold>Second List Item</Text>
          <Text>Description of second item</Text>
        </div>
        <Divider />
        <div className="p-4 bg-gray-50 rounded">
          <Text semibold>Third List Item</Text>
          <Text>Description of third item</Text>
        </div>
      </Col>
    ),
  },
  {
    title: 'Divider in Sections',
    description: 'Dividers used to separate content sections.',
    component: (
      <Col lg>
        <div>
          <Text semibold lg>Section 1</Text>
          <Text>This is the first section with some content that demonstrates how dividers can be used to separate different sections of content.</Text>
        </div>
        <Divider />
        <div>
          <Text semibold lg>Section 2</Text>
          <Text>This is the second section that follows the divider. The divider provides a clear visual separation between sections.</Text>
        </div>
        <Divider />
        <div>
          <Text semibold lg>Section 3</Text>
          <Text>This is the third and final section, demonstrating consistent use of dividers throughout the content.</Text>
        </div>
      </Col>
    ),
  },
];