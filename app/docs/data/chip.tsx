'use client'

import { Chip, Row, ComponentKeys } from "@vaneui/ui";
import { DocsComponentExample } from "../types";
import { CheckSquare, Heart, X } from "react-feather";

export const chipExamples: DocsComponentExample[] = [
  {
    title: 'Basic Usage',
    md: 'Default chip styles and variants.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.appearance.map((key: string) => (
            <Chip key={key} {...{[key]: true}}>Chip {key}</Chip>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Chip Sizes',
    md: 'Chips come in different sizes.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.size.map((key: string) => (
            <Chip key={key} {...{[key]: true}}>Chip {key}</Chip>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Chip with Icon',
    md: 'Chips can contain icons along with text.',
    component: (
      <Row flexWrap>
        <Chip primary>
          <Heart className="size-4"/> With Icon
        </Chip>
        <Chip success>
          <CheckSquare className="size-4"/> Approved
        </Chip>
        <Chip danger>
          <X className="size-4"/> Failed
        </Chip>
      </Row>
    ),
  },
];