'use client'

import { Title, Col, ComponentKeys } from "@vaneui/ui";
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
        {
          ComponentKeys.size.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Title {key}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Font Weights',
    description: 'Titles support different font weights.',
    component: (
      <Col lg>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Title {key}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Appearances',
    description: 'Titles can have different color appearances.',
    component: (
      <Col lg>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Title {key}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Font Families',
    description: 'Titles support different font families.',
    component: (
      <Col lg>
        {
          ComponentKeys.fontFamily.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Title {key}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Styles',
    description: 'Titles support different styles and decorations.',
    component: (
      <Col lg>
        {
          ComponentKeys.textDecoration.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Title {key}</Title>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Title Transformations',
    description: 'Titles support different case transformations.',
    component: (
      <Col lg>
        {
          ComponentKeys.textTransform.map((key: string) => (
            <Title key={key} {...{[key]: true}}>Title {key}</Title>
          ))
        }
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
        <Title xs light uppercase>Extra Small Light Uppercase Title</Title>
        <Title xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Title</Title>
      </Col>
    ),
  },
];