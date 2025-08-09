'use client'

import { Code, Col, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const codeExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'Inline code snippets with default styling.',
    component: (
      <Row flexWrap >
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
            <Row key={key} >
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
      <Row flexWrap >
        {
          ComponentKeys.appearance.map((key: string) => (
            <Code key={key} {...{[key]: true}}>
              {key}_code()
            </Code>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Font Weights',
    md: 'Code elements with different font weights.',
    component: (
      <Row flexWrap >
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Code key={key} {...{[key]: true}} lg>
              font-{key}
            </Code>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Language Examples',
    md: 'Code snippets for different programming languages.',
    component: (
      <Col>
        <Row >
          JavaScript: <Code primary>{"const sum = (a, b) => a + b"}</Code>
        </Row>
        <Row >
          Python: <Code secondary>{'def hello(): print("Hello")'}</Code>
        </Row>
        <Row >
          TypeScript: <Code info>{"interface User { name: string }"}</Code>
        </Row>
        <Row >
          CSS: <Code success>{".class { color: red; }"}</Code>
        </Row>
        <Row >
          HTML: <Code warning>{'<div className="container">Content</div>'}</Code>
        </Row>
        <Row >
          SQL: <Code danger>SELECT * FROM users WHERE id = 1</Code>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Code in Context',
    md: 'Code elements used within text content.',
    component: (
      <Col className="space-y-4">
        <p>
          To create a new React component, use <Code>{"function Component() {}"}</Code> or 
          the arrow function syntax <Code>{"const Component = () => {}"}</Code>.
        </p>
        <p>
          Install the package with <Code primary >npm i @vaneui/ui</Code> and then 
          import it using <Code secondary>{'import { Button } from "@vaneui/ui"'}</Code>.
        </p>
        <p>
          The <Code info >useState</Code> hook returns an array with two elements: 
          the current state value and a setter function like <Code info >[state, setState]</Code>.
        </p>
        <p>
          Configure your environment by setting <Code warning >{"NODE_ENV='production'"}</Code> in 
          your <Code>.env</Code> file.
        </p>
      </Col>
    ),
  },
  {
    title: 'Keyboard Shortcuts',
    md: 'Code elements for displaying keyboard shortcuts and commands.',
    component: (
      <Row flexWrap >
        <Code  >Ctrl</Code>
        <span>+</span>
        <Code  >C</Code>
        <span className="mx-4">or</span>
        <Code  >Cmd</Code>
        <span>+</span>
        <Code  >V</Code>
        <span className="mx-4">or</span>
        <Code  primary>Alt</Code>
        <span>+</span>
        <Code  primary>Tab</Code>
      </Row>
    ),
  },
  {
    title: 'File Paths and URLs',
    md: 'Code elements for displaying file paths and URLs.',
    component: (
      <Col className="space-y-2">
        <Row >
          File path: <Code >/usr/local/bin/node</Code>
        </Row>
        <Row >
          Import path: <Code secondary >@/components/Button</Code>
        </Row>
        <Row >
          URL: <Code info >https://api.example.com/v1/users</Code>
        </Row>
        <Row >
          Config file: <Code warning >tsconfig.json</Code>
        </Row>
      </Col>
    ),
  },
];