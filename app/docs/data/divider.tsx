'use client'

import { Divider, Text, Col, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from "../types";

export const dividerExamples: DocsPagePart[] = [
  {
    title: 'Basic Divider',
    md: 'A simple horizontal divider.',
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
    md: 'Dividers come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        {
          ComponentKeys.size.map((key: string) => (
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
    md: 'Dividers can have different appearances.',
    component: (
      <Col lg>
        {
          ComponentKeys.appearance.slice(0, 6).map((key: string) => (
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
    md: 'Dividers used to separate list items.',
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
    md: 'Dividers used to separate content sections.',
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