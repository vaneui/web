'use client'

import { Badge, Row, ComponentKeys } from "@vaneui/ui";
import React from "react";
import { DocsComponentExample } from "../types";

export const badgeExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    description: 'Default badge styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
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
          ComponentKeys.size.map((key: string) => (
            <Badge key={key} {...{[key]: true}}>Badge {key}</Badge>
          ))
        }
      </Row>
    ),
  },
];