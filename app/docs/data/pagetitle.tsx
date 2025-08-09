'use client'

import { PageTitle, Col, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from "../types";

export const pageTitleExamples: DocsPagePart[] = [
  {
    title: 'Basic PageTitle',
    md: 'Default page title styling.',
    component: (
      <PageTitle>This is a Basic Page Title</PageTitle>
    ),
  },
  {
    title: 'PageTitle Sizes',
    md: 'Page titles come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col lg>
        {
          ComponentKeys.size.map((key: string) => (
            <PageTitle key={key} {...{[key]: true}}>PageTitle {key}</PageTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'PageTitle Font Weights',
    md: 'Page titles support different font weights.',
    component: (
      <Col lg>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <PageTitle key={key} {...{[key]: true}}>PageTitle {key}</PageTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'PageTitle Appearances',
    md: 'Page titles can have different color appearances.',
    component: (
      <Col lg>
        {
          ComponentKeys.appearance.map((key: string) => (
            <PageTitle key={key} {...{[key]: true}}>PageTitle {key}</PageTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'PageTitle Font Families',
    md: 'Page titles support different font families.',
    component: (
      <Col lg>
        {
          ComponentKeys.fontFamily.map((key: string) => (
            <PageTitle key={key} {...{[key]: true}}>PageTitle {key}</PageTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'PageTitle Styles',
    md: 'Page titles support different styles and decorations.',
    component: (
      <Col lg>
        {
          ComponentKeys.textDecoration.map((key: string) => (
            <PageTitle key={key} {...{[key]: true}}>PageTitle {key}</PageTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'PageTitle Transformations',
    md: 'Page titles support different case transformations.',
    component: (
      <Col lg>
        {
          ComponentKeys.textTransform.map((key: string) => (
            <PageTitle key={key} {...{[key]: true}}>PageTitle {key}</PageTitle>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'PageTitle Alignment',
    md: 'Page titles can be aligned differently.',
    component: (
      <div className="space-y-4 border-2 border-dashed border-gray-300 p-4">
        <PageTitle textLeft>Left Aligned Page Title</PageTitle>
        <PageTitle textCenter>Center Aligned Page Title</PageTitle>
        <PageTitle textRight>Right Aligned Page Title</PageTitle>
      </div>
    ),
  },
  {
    title: 'PageTitle Combinations',
    md: 'Combining multiple page title properties.',
    component: (
      <Col lg>
        <PageTitle lg bold primary>Large Bold Primary Page Title</PageTitle>
        <PageTitle sm italic secondary>Small Italic Secondary Page Title</PageTitle>
        <PageTitle md semibold success underline>Medium Semibold Success Underlined Page Title</PageTitle>
        <PageTitle xs light uppercase>Extra Small Light Uppercase Page Title</PageTitle>
        <PageTitle xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Page Title</PageTitle>
      </Col>
    ),
  },
];