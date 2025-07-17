'use client'

import { Container, Text } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const containerExamples: DocsComponentExample[] = [
  {
    title: 'Basic Container',
    description: 'A centered container with max-width.',
    component: (
      <Container>
        <div className="p-4 bg-gray-100 rounded">
          <Text>This content is centered and has a max-width constraint.</Text>
        </div>
      </Container>
    ),
  },
  {
    title: 'Container Sizes',
    description: 'Containers come in different sizes.',
    component: (
      <div className="space-y-4">
        <div>
          <Text semibold>Extra Small Container</Text>
          <Container xs>
            <div className="p-2 bg-gray-100 rounded text-sm">
              <Text>Extra small container content</Text>
            </div>
          </Container>
        </div>
        <div>
          <Text semibold>Large Container</Text>
          <Container lg>
            <div className="p-6 bg-gray-100 rounded">
              <Text>Large container content</Text>
            </div>
          </Container>
        </div>
      </div>
    ),
  },
  {
    title: 'Container Appearances',
    description: 'Containers can have different background appearances.',
    component: (
      <div className="space-y-4">
        <Container primary>
          <div className="p-4 bg-white rounded">
            <Text>Primary container</Text>
          </div>
        </Container>
        <Container secondary>
          <div className="p-4 bg-white rounded">
            <Text>Secondary container</Text>
          </div>
        </Container>
        <Container success>
          <div className="p-4 bg-white rounded">
            <Text>Success container</Text>
          </div>
        </Container>
      </div>
    ),
  },
  {
    title: 'Container Borders',
    description: 'Control container border appearance.',
    component: (
      <div className="space-y-4">
        <Container border>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Container with border</Text>
          </div>
        </Container>
        <Container noBorder>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Container without border</Text>
          </div>
        </Container>
      </div>
    ),
  },
  {
    title: 'Container Shapes',
    description: 'Containers support different border radius styles.',
    component: (
      <div className="space-y-4">
        <Container>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Default rounded container</Text>
          </div>
        </Container>
        <Container pill>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Pill-shaped container</Text>
          </div>
        </Container>
        <Container sharp>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Sharp cornered container</Text>
          </div>
        </Container>
      </div>
    ),
  },
  {
    title: 'Container with Shadow',
    description: 'Containers can have drop shadows.',
    component: (
      <div className="space-y-4">
        <Container shadow>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Container with shadow</Text>
          </div>
        </Container>
        <Container noShadow>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Container without shadow</Text>
          </div>
        </Container>
      </div>
    ),
  },
  {
    title: 'Container with Ring',
    description: 'Containers can have focus rings.',
    component: (
      <div className="space-y-4">
        <Container ring>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Container with ring</Text>
          </div>
        </Container>
        <Container noRing>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Container without ring</Text>
          </div>
        </Container>
      </div>
    ),
  },
  {
    title: 'Container with Gap',
    description: 'Control spacing between container content.',
    component: (
      <div className="space-y-4">
        <Container gap>
          <div className="p-4 bg-gray-100 rounded">
            <Text>First item</Text>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Second item</Text>
          </div>
        </Container>
        <Container noGap>
          <div className="p-4 bg-gray-100 rounded">
            <Text>First item</Text>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <Text>Second item</Text>
          </div>
        </Container>
      </div>
    ),
  },
];