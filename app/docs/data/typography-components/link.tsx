'use client'

import { Link, Col, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const linkExamples: DocsPagePart[] = [
  {
    title: 'Basic Link',
    md: 'Default link styling.',
    component: (
      <Link href="#">This is a Basic Link</Link>
    ),
  },
  {
    title: 'Link Sizes',
    md: 'Links come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Link key={key} href="#" {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Font Weights',
    md: 'Links support different font weights.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontWeight.map((key: string) => (
            <Link key={key} href="#" {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Appearances',
    md: 'Links can have different color appearances.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Link key={key} href="#" {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Font Families',
    md: 'Links support different font families.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontFamily.map((key: string) => (
            <Link key={key} href="#" {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Text Decorations',
    md: 'Links support different text decorations.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.textDecoration.map((key: string) => (
            <Link key={key} {...{[key]: true}} href="#" >Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Font Styles',
    md: 'Links support different font styles.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.fontStyle.map((key: string) => (
            <Link key={key} {...{[key]: true}} href="#" >Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Transformations',
    md: 'Links support different case transformations.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.textTransform.map((key: string) => (
            <Link key={key} href="#" {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Alignment',
    md: 'Links can be aligned differently.',
    component: (
      <Col className="border-2 border-dashed border-gray-300 p-4 min-w-80">
        <Link className="w-full" href="#" textLeft>Left Aligned</Link>
        <Link className="w-full" href="#" textCenter>Center Aligned</Link>
        <Link className="w-full" href="#" textRight>Right Aligned</Link>
      </Col>
    ),
  },
  {
    title: 'Link Combinations',
    md: 'Combining multiple link properties.',
    component: (
      <Col>
        <Link href="#" lg bold primary>Large Bold Primary Link</Link>
        <Link href="#" sm italic secondary>Small Italic Secondary Link</Link>
        <Link href="#" md semibold success underline>Medium Semibold Success Underlined Link</Link>
        <Link href="#" xs light uppercase>Extra Small Light Uppercase Link</Link>
        <Link href="#" xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Link</Link>
      </Col>
    ),
  },
];