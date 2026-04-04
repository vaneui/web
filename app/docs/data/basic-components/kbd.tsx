'use client'

import { Kbd, Row, Col, Text, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const kbdExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Display keyboard keys with the `Kbd` component.',
    component: (
      <Row flexWrap>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Tab</Kbd>
      </Row>
    ),
  },
  {
    title: 'Key Combinations',
    md: 'Combine multiple `Kbd` elements to show keyboard shortcuts.',
    component: (
      <Col>
        <Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>C</Kbd><Text sm secondary>Copy</Text></Row>
        <Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>V</Kbd><Text sm secondary>Paste</Text></Row>
        <Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Shift</Kbd><Text>+</Text><Kbd>P</Kbd><Text sm secondary>Command Palette</Text></Row>
        <Row><Kbd>Alt</Kbd><Text>+</Text><Kbd>Tab</Kbd><Text sm secondary>Switch Window</Text></Row>
      </Col>
    ),
  },
  {
    title: 'Sizes',
    md: 'Kbd elements in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Row flexWrap itemsEnd>
        {
          ComponentKeys.size.map((key) => (
            <Col key={key} itemsCenter>
              <Kbd {...{[key]: true}}>Ctrl</Kbd>
              <Text sm secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Appearances',
    md: 'Different color appearances for keyboard keys.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.slice(0, -1).map((key) => (
            <Kbd key={key} {...{[key]: true}}>
              {key.charAt(0).toUpperCase() + key.slice(1, 4)}
            </Kbd>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'In Text Context',
    md: 'Kbd elements blend naturally within text content.',
    component: (
      <Col>
        <Text>Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> to save your work.</Text>
        <Text>Use <Kbd sm>Esc</Kbd> to close the dialog.</Text>
        <Text>Hit <Kbd info>F5</Kbd> to refresh the page.</Text>
      </Col>
    ),
  },
  {
    title: 'Shortcut Table',
    md: 'Display a set of keyboard shortcuts in a structured layout.',
    component: (
      <Col>
        <Row justifyBetween><Text>Undo</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Z</Kbd></Row></Row>
        <Row justifyBetween><Text>Redo</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Shift</Kbd><Text>+</Text><Kbd>Z</Kbd></Row></Row>
        <Row justifyBetween><Text>Find</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>F</Kbd></Row></Row>
        <Row justifyBetween><Text>Save</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>S</Kbd></Row></Row>
        <Row justifyBetween><Text>Select All</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>A</Kbd></Row></Row>
      </Col>
    ),
  },
];
