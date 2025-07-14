'use client'

import { Divider, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

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
      <div className="space-y-4">
        <div>
          <Text semibold>Extra Small Divider</Text>
          <Divider xs />
          <Text>Content after XS divider</Text>
        </div>
        <div>
          <Text semibold>Small Divider</Text>
          <Divider sm />
          <Text>Content after small divider</Text>
        </div>
        <div>
          <Text semibold>Medium Divider</Text>
          <Divider md />
          <Text>Content after medium divider</Text>
        </div>
        <div>
          <Text semibold>Large Divider</Text>
          <Divider lg />
          <Text>Content after large divider</Text>
        </div>
        <div>
          <Text semibold>Extra Large Divider</Text>
          <Divider xl />
          <Text>Content after XL divider</Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Divider Appearances',
    description: 'Dividers can have different appearances.',
    component: (
      <div className="space-y-4">
        <div>
          <Text semibold>Default Divider</Text>
          <Divider />
          <Text>Content after default divider</Text>
        </div>
        <div>
          <Text semibold>Primary Divider</Text>
          <Divider primary />
          <Text>Content after primary divider</Text>
        </div>
        <div>
          <Text semibold>Secondary Divider</Text>
          <Divider secondary />
          <Text>Content after secondary divider</Text>
        </div>
        <div>
          <Text semibold>Success Divider</Text>
          <Divider success />
          <Text>Content after success divider</Text>
        </div>
        <div>
          <Text semibold>Danger Divider</Text>
          <Divider danger />
          <Text>Content after danger divider</Text>
        </div>
        <div>
          <Text semibold>Warning Divider</Text>
          <Divider warning />
          <Text>Content after warning divider</Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Divider in Lists',
    description: 'Dividers used to separate list items.',
    component: (
      <div className="space-y-2">
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
      </div>
    ),
  },
  {
    title: 'Divider in Sections',
    description: 'Dividers used to separate content sections.',
    component: (
      <div className="space-y-4">
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
      </div>
    ),
  },
];