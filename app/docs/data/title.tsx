'use client'

import { Title, Col } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const titleExamples: DocsComponentExample[] = [
  {
    title: 'Basic Title',
    description: 'Default title styling.',
    component: (
      <Title>This is a Basic Title</Title>
    ),
  },
  {
    title: 'Title Sizes',
    description: 'Titles come in different sizes.',
    component: (
      <Col lg>
        <Title xs>Extra Small Title</Title>
        <Title sm>Small Title</Title>
        <Title md>Medium Title</Title>
        <Title lg>Large Title</Title>
        <Title xl>Extra Large Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Font Weights',
    description: 'Titles support different font weights.',
    component: (
      <Col lg>
        <Title thin>Thin Title</Title>
        <Title light>Light Title</Title>
        <Title normal>Normal Title</Title>
        <Title medium>Medium Title</Title>
        <Title semibold>Semibold Title</Title>
        <Title bold>Bold Title</Title>
        <Title extrabold>Extra Bold Title</Title>
        <Title black>Black Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Appearances',
    description: 'Titles can have different color appearances.',
    component: (
      <Col lg>
        <Title>Default Title</Title>
        <Title primary>Primary Title</Title>
        <Title secondary>Secondary Title</Title>
        <Title accent>Accent Title</Title>
        <Title success>Success Title</Title>
        <Title danger>Danger Title</Title>
        <Title warning>Warning Title</Title>
        <Title info>Info Title</Title>
        <Title muted>Muted Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Font Families',
    description: 'Titles support different font families.',
    component: (
      <Col lg>
        <Title sans>Sans Serif Title</Title>
        <Title serif>Serif Title</Title>
        <Title mono>Monospace Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Styles',
    description: 'Titles support different styles and decorations.',
    component: (
      <Col lg>
        <Title italic>Italic Title</Title>
        <Title underline>Underlined Title</Title>
        <Title lineThrough>Line Through Title</Title>
        <Title overline>Overlined Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Transformations',
    description: 'Titles support different case transformations.',
    component: (
      <Col lg>
        <Title uppercase>uppercase title</Title>
        <Title lowercase>LOWERCASE TITLE</Title>
        <Title capitalize>capitalize title</Title>
        <Title normalCase>Normal Case Title</Title>
      </Col>
    ),
  },
  {
    title: 'Title Alignment',
    description: 'Titles can be aligned differently.',
    component: (
      <div className="space-y-4 border-2 border-dashed border-gray-300 p-4">
        <Title textLeft>Left Aligned Title</Title>
        <Title textCenter>Center Aligned Title</Title>
        <Title textRight>Right Aligned Title</Title>
      </div>
    ),
  },
  {
    title: 'Title Combinations',
    description: 'Combining multiple title properties.',
    component: (
      <Col lg>
        <Title lg bold primary>Large Bold Primary Title</Title>
        <Title sm italic secondary>Small Italic Secondary Title</Title>
        <Title md semibold success underline>Medium Semibold Success Underlined Title</Title>
        <Title xs light muted uppercase>Extra Small Light Muted Uppercase Title</Title>
        <Title xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Title</Title>
      </Col>
    ),
  },
];