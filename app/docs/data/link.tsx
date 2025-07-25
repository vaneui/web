'use client'

import { Link, Col, Row, APPEARANCE_KEYS, SIZE_KEYS, FONT_WEIGHT_KEYS, FONT_FAMILY_KEYS, TEXT_DECORATION_KEYS, TEXT_TRANSFORM_KEYS, FONT_STYLE_KEYS } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const linkExamples: DocsComponentExample[] = [
  {
    title: 'Basic Link',
    description: 'Default link styling.',
    component: (
      <Link href="#basic-link">This is a Basic Link</Link>
    ),
  },
  {
    title: 'Link Sizes',
    description: 'Links come in different sizes.',
    component: (
      <Row flexWrap>
        {
          SIZE_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Font Weights',
    description: 'Links support different font weights.',
    component: (
      <Row flexWrap>
        {
          FONT_WEIGHT_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Appearances',
    description: 'Links can have different color appearances.',
    component: (
      <Row flexWrap>
        {
          APPEARANCE_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Font Families',
    description: 'Links support different font families.',
    component: (
      <Row flexWrap>
        {
          FONT_FAMILY_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Text Decorations',
    description: 'Links support different text decorations.',
    component: (
      <Row flexWrap>
        {
          TEXT_DECORATION_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Font Styles',
    description: 'Links support different font styles.',
    component: (
      <Row flexWrap>
        {
          FONT_STYLE_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Transformations',
    description: 'Links support different case transformations.',
    component: (
      <Row flexWrap>
        {
          TEXT_TRANSFORM_KEYS.map((key: string) => (
            <Link key={key} href={`#${key}-link`} {...{[key]: true}}>Link {key}</Link>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Link Alignment',
    description: 'Links can be aligned differently.',
    component: (
      <Col className="border-2 border-dashed border-gray-300 p-4 min-w-80">
        <Link className="w-full" href="#left-link" textLeft>Left Aligned</Link>
        <Link className="w-full" href="#center-link" textCenter>Center Aligned</Link>
        <Link className="w-full" href="#right-link" textRight>Right Aligned</Link>
      </Col>
    ),
  },
  {
    title: 'Link Combinations',
    description: 'Combining multiple link properties.',
    component: (
      <Col>
        <Link href="#combo1" lg bold primary>Large Bold Primary Link</Link>
        <Link href="#combo2" sm italic secondary>Small Italic Secondary Link</Link>
        <Link href="#combo3" md semibold success underline>Medium Semibold Success Underlined Link</Link>
        <Link href="#combo4" xs light uppercase>Extra Small Light Uppercase Link</Link>
        <Link href="#combo5" xl extrabold danger textCenter>Extra Large Extra Bold Danger Centered Link</Link>
      </Col>
    ),
  },
];