'use client'

import { Container, Text, Col, ComponentKeys, Title } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const containerExamples: DocsPagePart[] = [
  {
    title: 'Basic Container',
    md: 'A centered container with max-width.',
    component: (
      <Container>
        <div className="p-4 bg-gray-100 rounded w-full">
          <Text>This content is centered and has a max-width constraint.</Text>
        </div>
      </Container>
    ),
  },
  {
    title: 'Container Sizes',
    md: 'Containers come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        {
          ComponentKeys.size.map((key: string) => (
            <div key={key}>
              <Text semibold>Container {key}</Text>
              <Container {...{[key]: true}}>
                <div className="p-4 bg-gray-100 rounded w-full">
                  <Text>Container {key} content</Text>
                </div>
              </Container>
            </div>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Container Appearances',
    md: 'Containers can have different background appearances.',
    component: (
      <Col lg>
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
      </Col>
    ),
  },
  {
    title: 'Container Borders',
    md: 'Control container border appearance.',
    component: (
      <Col lg>
        <Container border>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Container with border</Text>
          </div>
        </Container>
        <Container noBorder>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Container without border</Text>
          </div>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container Shapes',
    md: 'Containers support different border radius styles: `rounded` (default), `pill`, and `sharp`.',
    component: (
      <Col lg>
        <Container>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Default (rounded) container</Text>
          </div>
        </Container>
        <Container pill>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Pill-shaped container</Text>
          </div>
        </Container>
        <Container sharp>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Sharp cornered container</Text>
          </div>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container with Shadow',
    md: 'Containers can have drop shadows.',
    component: (
      <Col lg>
        <Container shadow>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Container with shadow</Text>
          </div>
        </Container>
        <Container noShadow>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Container without shadow</Text>
          </div>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container with Ring',
    md: 'Containers can have focus rings.',
    component: (
      <Col lg>
        <Container ring>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Container with ring</Text>
          </div>
        </Container>
        <Container noRing>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Container without ring</Text>
          </div>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Container with Gap',
    md: 'Control spacing between container content.',
    component: (
      <Col lg>
        <Container>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>First item (default with gap)</Text>
          </div>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Second item</Text>
          </div>
        </Container>
        <Container noGap>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>First item</Text>
          </div>
          <div className="p-4 bg-gray-100 rounded w-full">
            <Text>Second item</Text>
          </div>
        </Container>
      </Col>
    ),
  },
  {
    title: 'Filled and Outline Containers',
    md: 'Containers support filled and outline variants with typography color inheritance.',
    component: (
      <Col lg>
        <Container filled primary lg>
          <Title primary filled>Filled Primary Container</Title>
          <Text primary filled>Typography inherits primary color from filled container</Text>
        </Container>
        <Container outline success lg>
          <Title success>Outline Success Container</Title>
          <Text success>Typography inherits success color from outline container</Text>
        </Container>
        <Container filled warning lg>
          <Title warning filled>Filled Warning Container</Title>
          <Text warning filled>Typography inherits warning color from container</Text>
        </Container>
      </Col>
    ),
  },
];