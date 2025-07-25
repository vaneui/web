'use client'

import { SectionTitle, Col, APPEARANCE_KEYS, SIZE_KEYS, FONT_WEIGHT_KEYS, FONT_FAMILY_KEYS, TEXT_DECORATION_KEYS, TEXT_TRANSFORM_KEYS } from "@vaneui/ui";
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
        {
          SIZE_KEYS.map((key: string) => (
            <SectionTitle key={key} {...{[key]: true}}>SectionTitle {key}</SectionTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'SectionTitle Font Weights',
    description: 'Section titles support different font weights.',
    component: (
      <Col lg>
        {
          FONT_WEIGHT_KEYS.map((key: string) => (
            <SectionTitle key={key} {...{[key]: true}}>SectionTitle {key}</SectionTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'SectionTitle Appearances',
    description: 'Section titles can have different color appearances.',
    component: (
      <Col lg>
        {
          APPEARANCE_KEYS.map((key: string) => (
            <SectionTitle key={key} {...{[key]: true}}>SectionTitle {key}</SectionTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'SectionTitle Font Families',
    description: 'Section titles support different font families.',
    component: (
      <Col lg>
        {
          FONT_FAMILY_KEYS.map((key: string) => (
            <SectionTitle key={key} {...{[key]: true}}>SectionTitle {key}</SectionTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'SectionTitle Styles',
    description: 'Section titles support different styles and decorations.',
    component: (
      <Col lg>
        {
          TEXT_DECORATION_KEYS.map((key: string) => (
            <SectionTitle key={key} {...{[key]: true}}>SectionTitle {key}</SectionTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'SectionTitle Transformations',
    description: 'Section titles support different case transformations.',
    component: (
      <Col lg>
        {
          TEXT_TRANSFORM_KEYS.map((key: string) => (
            <SectionTitle key={key} {...{[key]: true}}>SectionTitle {key}</SectionTitle>
          ))
        }
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
        <SectionTitle xs light uppercase>Extra Small Light Uppercase Section Title</SectionTitle>
        <SectionTitle xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Section Title</SectionTitle>
      </Col>
    ),
  },
];