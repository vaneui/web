'use client'

import { Link, Col, Row } from "@vaneui/ui";
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
        <Link href="#xs-link" xs>Extra Small Link</Link>
        <Link href="#sm-link" sm>Small Link</Link>
        <Link href="#md-link" md>Medium Link</Link>
        <Link href="#lg-link" lg>Large Link</Link>
        <Link href="#xl-link" xl>Extra Large Link</Link>
      </Row>
    ),
  },
  {
    title: 'Link Font Weights',
    description: 'Links support different font weights.',
    component: (
      <Row flexWrap>
        <Link href="#thin-link" thin>Thin Link</Link>
        <Link href="#light-link" light>Light Link</Link>
        <Link href="#normal-link" normal>Normal Link</Link>
        <Link href="#medium-link" medium>Medium Link</Link>
        <Link href="#semibold-link" semibold>Semibold Link</Link>
        <Link href="#bold-link" bold>Bold Link</Link>
        <Link href="#extrabold-link" extrabold>Extra Bold Link</Link>
        <Link href="#black-link" black>Black Link</Link>
      </Row>
    ),
  },
  {
    title: 'Link Appearances',
    description: 'Links can have different color appearances.',
    component: (
      <Row flexWrap>
        <Link href="#default-link">Default Link</Link>
        <Link href="#primary-link" primary>Primary Link</Link>
        <Link href="#secondary-link" secondary>Secondary Link</Link>
        <Link href="#accent-link" accent>Accent Link</Link>
        <Link href="#success-link" success>Success Link</Link>
        <Link href="#danger-link" danger>Danger Link</Link>
        <Link href="#warning-link" warning>Warning Link</Link>
        <Link href="#info-link" info>Info Link</Link>
        <Link href="#link-link" link>Link Appearance</Link>
      </Row>
    ),
  },
  {
    title: 'Link Font Families',
    description: 'Links support different font families.',
    component: (
      <Row flexWrap>
        <Link href="#sans-link" sans>Sans Serif Link</Link>
        <Link href="#serif-link" serif>Serif Link</Link>
        <Link href="#mono-link" mono>Monospace Link</Link>
      </Row>
    ),
  },
  {
    title: 'Link Styles',
    description: 'Links support different styles and decorations.',
    component: (
      <Row flexWrap>
        <Link href="#italic-link" italic>Italic Link</Link>
        <Link href="#underline-link" underline>Underlined Link</Link>
        <Link href="#linethrough-link" lineThrough>Line Through Link</Link>
        <Link href="#overline-link" overline>Overlined Link</Link>
        <Link href="#nounderline-link" noUnderline>No Underline Link</Link>
      </Row>
    ),
  },
  {
    title: 'Link Transformations',
    description: 'Links support different case transformations.',
    component: (
      <Row flexWrap>
        <Link href="#uppercase-link" uppercase>uppercase link</Link>
        <Link href="#lowercase-link" lowercase>LOWERCASE LINK</Link>
        <Link href="#capitalize-link" capitalize>capitalize link</Link>
        <Link href="#normalcase-link" normalCase>Normal Case Link</Link>
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