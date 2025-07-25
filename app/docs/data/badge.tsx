'use client'

import { Badge, Row, UI_ELEMENT_APPEARANCE_KEYS, SIZE_KEYS } from "@vaneui/ui";
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
        {
          SIZE_KEYS.map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
          ))
        }
      </Row>
    ),
  },
];