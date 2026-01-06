'use client'

import { Code, Col, Row, Text, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const codeExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Inline code snippets with default styling.',
    component: (
      <Row flexWrap>
        <span>Use the <Code>npm install</Code> command to install packages.</span>
        <span>The <Code>{"const variable = 'value'"}</Code> syntax declares a constant.</span>
      </Row>
    ),
  },
  {
    title: 'Sizes',
    md: 'Code elements in different sizes - `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Col>
        {
          ComponentKeys.size.map((key: string) => (
            <Row key={key}>
              <span>Size {key}: <Code {...{[key]: true}}>{"console.log('Hello')"}</Code></span>
            </Row>
          ))
        }
      </Col>
    ),
  },
  {
    title: 'Appearances',
    md: 'Different code color variants for syntax highlighting.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Code key={key} {...{[key]: true}}>
              {key} code
            </Code>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Code in Context',
    md: 'Code elements used within text content.',
    component: (
      <Col>
        <Text>
          To create a new React component, use <Code>{"function Component() {}"}</Code> or
          the arrow function syntax <Code>{"const Component = () => {}"}</Code>.
        </Text>
        <p>
          Install the package with <Code primary>npm i @vaneui/ui</Code> and then
          import it using <Code secondary>{'import { Button } from "@vaneui/ui"'}</Code>.
        </p>
        <Text>
          The <Code info>useState</Code> hook returns an array with two elements:
          the current state value and a setter function like <Code info>[state, setState]</Code>.
        </Text>
      </Col>
    ),
  },
  {
    title: 'Keyboard Shortcuts',
    md: 'Code elements for displaying keyboard shortcuts and commands.',
    component: (
      <Row flexWrap>
        <Text primary>
          <Code>Ctrl</Code>+<Code>C</Code>
        </Text>
        or
        <Text primary>
          <Code primary>Cmd</Code>+<Code primary>V</Code>
        </Text>
      </Row>
    ),
  },
];
