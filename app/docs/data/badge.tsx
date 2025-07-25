'use client'

import { Badge, Row, UI_ELEMENT_APPEARANCE_KEYS } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const badgeExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    description: 'Default badge styles and variants.',
    component: (
      <Row flexWrap>
        {
          UI_ELEMENT_APPEARANCE_KEYS.map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Badge Sizes',
    description: 'Badges come in different sizes.',
    component: (
      <Row flexWrap>
        <Badge xs>XS</Badge>
        <Badge sm>SM</Badge>
        <Badge>MD</Badge>
        <Badge lg>LG</Badge>
        <Badge xl>XL</Badge>
      </Row>
    ),
  },
];