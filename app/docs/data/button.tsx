'use client'

import { Button, Row, TEXT_APPEARANCE_KEYS } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const buttonExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    description: 'Default button styles and variants.',
    component: (
      <Row flexWrap>
        {
          TEXT_APPEARANCE_KEYS.map((key: string) => (
            <Button key={key} {...{[key]: true}}>Button {key}</Button>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Sizes',
    description: 'Buttons come in different sizes.',
    component: (
      <Row flexWrap>
        <Button xs>Extra Small</Button>
        <Button sm>Small</Button>
        <Button md>Medium</Button>
        <Button lg>Large</Button>
        <Button xl>Extra Large</Button>
      </Row>
    ),
  },
  {
    title: 'Sizes with Icon',
    description: 'Buttons come in different sizes.',
    component: (
      <Row flexWrap>
        <Button xs><span className="rounded-full size-4 bg-gray-300"/> Extra Small</Button>
        <Button sm><span className="rounded-full size-4.5 bg-gray-300"/> Small</Button>
        <Button md><span className="rounded-full size-5 bg-gray-300"/> Medium</Button>
        <Button lg><span className="rounded-full size-6 bg-gray-300"/> Large</Button>
        <Button xl><span className="rounded-full size-7 bg-gray-300"/> Extra Large</Button>
      </Row>
    ),
  },
  {
    title: 'Font Weights',
    description: 'Buttons support different font weights.',
    component: (
      <Row flexWrap>
        <Button thin>Thin</Button>
        <Button light>Light</Button>
        <Button normal>Normal</Button>
        <Button medium>Medium</Button>
        <Button semibold>Semibold</Button>
        <Button bold>Bold</Button>
        <Button extrabold>Extra Bold</Button>
        <Button black>Black</Button>
      </Row>
    ),
  },
  {
    title: 'Border Radius Options',
    description: 'Button supports three border radius styles: rounded (default), pill, and sharp.',
    component: (
      <Row flexWrap>
        <Button>Default Rounded</Button>
        <Button pill>Pill Shaped</Button>
        <Button sharp>Sharp Corners</Button>
      </Row>
    ),
  },
  {
    title: 'Button Styles',
    description: 'Buttons can be styled as outline (default) or filled.',
    component: (
      <>
        <Row flexWrap>
          <Button outline>Outline Default</Button>
          <Button outline primary>Outline Primary</Button>
          <Button outline success>Outline Success</Button>
          <Button outline danger>Outline Danger</Button>
        </Row>
        <Row flexWrap>
          <Button filled>Filled Default</Button>
          <Button filled primary>Filled Primary</Button>
          <Button filled success>Filled Success</Button>
          <Button filled danger>Filled Danger</Button>
        </Row>
      </>
    ),
  },
];