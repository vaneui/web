'use client'

import { SectionTitle, Col } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const sectionTitleExamples: DocsComponentExample[] = [
  {
    title: 'Basic SectionTitle',
    description: 'Default section title styling.',
    component: (
      <SectionTitle>This is a Basic Section Title</SectionTitle>
    ),
  },
  {
    title: 'SectionTitle Sizes',
    description: 'Section titles come in different sizes.',
    component: (
      <Col lg>
        <SectionTitle xs>Extra Small Section Title</SectionTitle>
        <SectionTitle sm>Small Section Title</SectionTitle>
        <SectionTitle md>Medium Section Title</SectionTitle>
        <SectionTitle lg>Large Section Title</SectionTitle>
        <SectionTitle xl>Extra Large Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Font Weights',
    description: 'Section titles support different font weights.',
    component: (
      <Col lg>
        <SectionTitle thin>Thin Section Title</SectionTitle>
        <SectionTitle light>Light Section Title</SectionTitle>
        <SectionTitle normal>Normal Section Title</SectionTitle>
        <SectionTitle medium>Medium Section Title</SectionTitle>
        <SectionTitle semibold>Semibold Section Title</SectionTitle>
        <SectionTitle bold>Bold Section Title</SectionTitle>
        <SectionTitle extrabold>Extra Bold Section Title</SectionTitle>
        <SectionTitle black>Black Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Appearances',
    description: 'Section titles can have different color appearances.',
    component: (
      <Col lg>
        <SectionTitle>Default Section Title</SectionTitle>
        <SectionTitle primary>Primary Section Title</SectionTitle>
        <SectionTitle secondary>Secondary Section Title</SectionTitle>
        <SectionTitle accent>Accent Section Title</SectionTitle>
        <SectionTitle success>Success Section Title</SectionTitle>
        <SectionTitle danger>Danger Section Title</SectionTitle>
        <SectionTitle warning>Warning Section Title</SectionTitle>
        <SectionTitle info>Info Section Title</SectionTitle>
        <SectionTitle muted>Muted Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Font Families',
    description: 'Section titles support different font families.',
    component: (
      <Col lg>
        <SectionTitle sans>Sans Serif Section Title</SectionTitle>
        <SectionTitle serif>Serif Section Title</SectionTitle>
        <SectionTitle mono>Monospace Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Styles',
    description: 'Section titles support different styles and decorations.',
    component: (
      <Col lg>
        <SectionTitle italic>Italic Section Title</SectionTitle>
        <SectionTitle underline>Underlined Section Title</SectionTitle>
        <SectionTitle lineThrough>Line Through Section Title</SectionTitle>
        <SectionTitle overline>Overlined Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Transformations',
    description: 'Section titles support different case transformations.',
    component: (
      <Col lg>
        <SectionTitle uppercase>uppercase section title</SectionTitle>
        <SectionTitle lowercase>LOWERCASE SECTION TITLE</SectionTitle>
        <SectionTitle capitalize>capitalize section title</SectionTitle>
        <SectionTitle normalCase>Normal Case Section Title</SectionTitle>
      </Col>
    ),
  },
  {
    title: 'SectionTitle Alignment',
    description: 'Section titles can be aligned differently.',
    component: (
      <div className="space-y-4 border-2 border-dashed border-gray-300 p-4">
        <SectionTitle textLeft>Left Aligned Section Title</SectionTitle>
        <SectionTitle textCenter>Center Aligned Section Title</SectionTitle>
        <SectionTitle textRight>Right Aligned Section Title</SectionTitle>
      </div>
    ),
  },
  {
    title: 'SectionTitle Combinations',
    description: 'Combining multiple section title properties.',
    component: (
      <Col lg>
        <SectionTitle lg bold primary>Large Bold Primary Section Title</SectionTitle>
        <SectionTitle sm italic secondary>Small Italic Secondary Section Title</SectionTitle>
        <SectionTitle md semibold success underline>Medium Semibold Success Underlined Section Title</SectionTitle>
        <SectionTitle xs light muted uppercase>Extra Small Light Muted Uppercase Section Title</SectionTitle>
        <SectionTitle xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Section Title</SectionTitle>
      </Col>
    ),
  },
];