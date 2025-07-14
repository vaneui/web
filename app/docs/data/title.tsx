'use client'

import { Title, Row } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

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
      <div className="space-y-4">
        <Title xs>Extra Small Title</Title>
        <Title sm>Small Title</Title>
        <Title md>Medium Title</Title>
        <Title lg>Large Title</Title>
        <Title xl>Extra Large Title</Title>
      </div>
    ),
  },
  {
    title: 'Title Font Weights',
    description: 'Titles support different font weights.',
    component: (
      <div className="space-y-4">
        <Title thin>Thin Title</Title>
        <Title light>Light Title</Title>
        <Title normal>Normal Title</Title>
        <Title medium>Medium Title</Title>
        <Title semibold>Semibold Title</Title>
        <Title bold>Bold Title</Title>
        <Title extrabold>Extra Bold Title</Title>
        <Title black>Black Title</Title>
      </div>
    ),
  },
  {
    title: 'Title Appearances',
    description: 'Titles can have different color appearances.',
    component: (
      <div className="space-y-4">
        <Title>Default Title</Title>
        <Title primary>Primary Title</Title>
        <Title secondary>Secondary Title</Title>
        <Title accent>Accent Title</Title>
        <Title success>Success Title</Title>
        <Title danger>Danger Title</Title>
        <Title warning>Warning Title</Title>
        <Title info>Info Title</Title>
        <Title muted>Muted Title</Title>
      </div>
    ),
  },
  {
    title: 'Title Font Families',
    description: 'Titles support different font families.',
    component: (
      <div className="space-y-4">
        <Title sans>Sans Serif Title</Title>
        <Title serif>Serif Title</Title>
        <Title mono>Monospace Title</Title>
      </div>
    ),
  },
  {
    title: 'Title Styles',
    description: 'Titles support different styles and decorations.',
    component: (
      <div className="space-y-4">
        <Title italic>Italic Title</Title>
        <Title underline>Underlined Title</Title>
        <Title lineThrough>Line Through Title</Title>
        <Title overline>Overlined Title</Title>
      </div>
    ),
  },
  {
    title: 'Title Transformations',
    description: 'Titles support different case transformations.',
    component: (
      <div className="space-y-4">
        <Title uppercase>uppercase title</Title>
        <Title lowercase>LOWERCASE TITLE</Title>
        <Title capitalize>capitalize title</Title>
        <Title normalCase>Normal Case Title</Title>
      </div>
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
      <div className="space-y-4">
        <Title lg bold primary>Large Bold Primary Title</Title>
        <Title sm italic secondary>Small Italic Secondary Title</Title>
        <Title md semibold success underline>Medium Semibold Success Underlined Title</Title>
        <Title xs light muted uppercase>Extra Small Light Muted Uppercase Title</Title>
        <Title xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Title</Title>
      </div>
    ),
  },
];