'use client'

import { PageTitle, Col } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const pageTitleExamples: DocsComponentExample[] = [
  {
    title: 'Basic PageTitle',
    description: 'Default page title styling.',
    component: (
      <PageTitle>This is a Basic Page Title</PageTitle>
    ),
  },
  {
    title: 'PageTitle Sizes',
    description: 'Page titles come in different sizes.',
    component: (
      <Col lg>
        <PageTitle xs>Extra Small Page Title</PageTitle>
        <PageTitle sm>Small Page Title</PageTitle>
        <PageTitle md>Medium Page Title</PageTitle>
        <PageTitle lg>Large Page Title</PageTitle>
        <PageTitle xl>Extra Large Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Font Weights',
    description: 'Page titles support different font weights.',
    component: (
      <Col lg>
        <PageTitle thin>Thin Page Title</PageTitle>
        <PageTitle light>Light Page Title</PageTitle>
        <PageTitle normal>Normal Page Title</PageTitle>
        <PageTitle medium>Medium Page Title</PageTitle>
        <PageTitle semibold>Semibold Page Title</PageTitle>
        <PageTitle bold>Bold Page Title</PageTitle>
        <PageTitle extrabold>Extra Bold Page Title</PageTitle>
        <PageTitle black>Black Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Appearances',
    description: 'Page titles can have different color appearances.',
    component: (
      <Col lg>
        <PageTitle>Default Page Title</PageTitle>
        <PageTitle primary>Primary Page Title</PageTitle>
        <PageTitle secondary>Secondary Page Title</PageTitle>
        <PageTitle accent>Accent Page Title</PageTitle>
        <PageTitle success>Success Page Title</PageTitle>
        <PageTitle danger>Danger Page Title</PageTitle>
        <PageTitle warning>Warning Page Title</PageTitle>
        <PageTitle info>Info Page Title</PageTitle>
        <PageTitle muted>Muted Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Font Families',
    description: 'Page titles support different font families.',
    component: (
      <Col lg>
        <PageTitle sans>Sans Serif Page Title</PageTitle>
        <PageTitle serif>Serif Page Title</PageTitle>
        <PageTitle mono>Monospace Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Styles',
    description: 'Page titles support different styles and decorations.',
    component: (
      <Col lg>
        <PageTitle italic>Italic Page Title</PageTitle>
        <PageTitle underline>Underlined Page Title</PageTitle>
        <PageTitle lineThrough>Line Through Page Title</PageTitle>
        <PageTitle overline>Overlined Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Transformations',
    description: 'Page titles support different case transformations.',
    component: (
      <Col lg>
        <PageTitle uppercase>uppercase page title</PageTitle>
        <PageTitle lowercase>LOWERCASE PAGE TITLE</PageTitle>
        <PageTitle capitalize>capitalize page title</PageTitle>
        <PageTitle normalCase>Normal Case Page Title</PageTitle>
      </Col>
    ),
  },
  {
    title: 'PageTitle Alignment',
    description: 'Page titles can be aligned differently.',
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
    description: 'Combining multiple page title properties.',
    component: (
      <Col lg>
        <PageTitle lg bold primary>Large Bold Primary Page Title</PageTitle>
        <PageTitle sm italic secondary>Small Italic Secondary Page Title</PageTitle>
        <PageTitle md semibold success underline>Medium Semibold Success Underlined Page Title</PageTitle>
        <PageTitle xs light muted uppercase>Extra Small Light Muted Uppercase Page Title</PageTitle>
        <PageTitle xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Page Title</PageTitle>
      </Col>
    ),
  },
];