'use client'

import { Text, Row } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../docsSections";

export const textExamples: DocsComponentExample[] = [
  {
    title: 'Basic Text',
    description: 'Default text styling.',
    component: (
      <Text>This is basic text content with default styling.</Text>
    ),
  },
  {
    title: 'Text Sizes',
    description: 'Text comes in different sizes.',
    component: (
      <div className="space-y-2">
        <Text xs>Extra Small Text</Text>
        <Text sm>Small Text</Text>
        <Text md>Medium Text</Text>
        <Text lg>Large Text</Text>
        <Text xl>Extra Large Text</Text>
      </div>
    ),
  },
  {
    title: 'Text Font Weights',
    description: 'Text supports different font weights.',
    component: (
      <div className="space-y-2">
        <Text thin>Thin Text</Text>
        <Text extralight>Extra Light Text</Text>
        <Text light>Light Text</Text>
        <Text normal>Normal Text</Text>
        <Text medium>Medium Text</Text>
        <Text semibold>Semibold Text</Text>
        <Text bold>Bold Text</Text>
        <Text extrabold>Extra Bold Text</Text>
        <Text black>Black Text</Text>
      </div>
    ),
  },
  {
    title: 'Text Appearances',
    description: 'Text can have different color appearances.',
    component: (
      <div className="space-y-2">
        <Text>Default Text</Text>
        <Text primary>Primary Text</Text>
        <Text secondary>Secondary Text</Text>
        <Text accent>Accent Text</Text>
        <Text success>Success Text</Text>
        <Text danger>Danger Text</Text>
        <Text warning>Warning Text</Text>
        <Text info>Info Text</Text>
        <Text muted>Muted Text</Text>
        <Text link>Link Text</Text>
      </div>
    ),
  },
  {
    title: 'Text Font Families',
    description: 'Text supports different font families.',
    component: (
      <div className="space-y-2">
        <Text sans>Sans Serif Text</Text>
        <Text serif>Serif Text</Text>
        <Text mono>Monospace Text</Text>
      </div>
    ),
  },
  {
    title: 'Text Styles',
    description: 'Text supports different styles and decorations.',
    component: (
      <div className="space-y-2">
        <Text italic>Italic Text</Text>
        <Text notItalic>Not Italic Text</Text>
        <Text underline>Underlined Text</Text>
        <Text lineThrough>Line Through Text</Text>
        <Text overline>Overlined Text</Text>
        <Text noUnderline>No Underline Text</Text>
      </div>
    ),
  },
  {
    title: 'Text Transformations',
    description: 'Text supports different case transformations.',
    component: (
      <div className="space-y-2">
        <Text uppercase>uppercase text</Text>
        <Text lowercase>LOWERCASE TEXT</Text>
        <Text capitalize>capitalize text</Text>
        <Text normalCase>Normal Case Text</Text>
      </div>
    ),
  },
  {
    title: 'Text Alignment',
    description: 'Text can be aligned differently.',
    component: (
      <div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
        <Text textLeft>Left aligned text</Text>
        <Text textCenter>Center aligned text</Text>
        <Text textRight>Right aligned text</Text>
        <Text textJustify>Justified text that should wrap to multiple lines to demonstrate the justification alignment. This text is long enough to show the justify effect.</Text>
      </div>
    ),
  },
  {
    title: 'Text Combinations',
    description: 'Combining multiple text properties.',
    component: (
      <div className="space-y-2">
        <Text lg bold primary>Large Bold Primary Text</Text>
        <Text sm italic secondary>Small Italic Secondary Text</Text>
        <Text md semibold success underline>Medium Semibold Success Underlined Text</Text>
        <Text xs light muted uppercase>Extra Small Light Muted Uppercase Text</Text>
        <Text xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Text</Text>
      </div>
    ),
  },
];