'use client'

import { IconButton, Row, Col, Text, ComponentKeys } from "@vaneui/ui";
import React, { useState } from "react";
import { Star, Heart, Settings, Search, Trash2, ExternalLink } from "react-feather";
import { DocsPagePart } from '../../types';

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Row>
      <IconButton
        loading={loading}
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
        aria-label="Save"
      >
        <Star />
      </IconButton>
      <IconButton
        loading={loading}
        filled
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
        aria-label="Save filled"
      >
        <Star />
      </IconButton>
      <Text sm secondary>{loading ? 'Loading...' : 'Click to trigger loading state'}</Text>
    </Row>
  );
}

export const iconButtonExamples: DocsPagePart[] = [
  {
    title: 'Basic Usage',
    md: 'A square button designed for icon-only actions. Always provide `aria-label` for accessibility.\n\n```tsx\n<IconButton aria-label="Search"><SearchIcon /></IconButton>\n<IconButton aria-label="Settings"><SettingsIcon /></IconButton>\n<IconButton aria-label="Delete"><TrashIcon /></IconButton>\n```',
    component: (
      <Row>
        <IconButton aria-label="Search"><Search /></IconButton>
        <IconButton aria-label="Settings"><Settings /></IconButton>
        <IconButton aria-label="Delete"><Trash2 /></IconButton>
      </Row>
    ),
    code: "",
  },
  {
    title: 'Sizes',
    md: 'IconButton supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Row flexWrap itemsEnd>
        {
          ComponentKeys.size.map((key) => (
            <Col key={key} itemsCenter>
              <IconButton {...{[key]: true}} aria-label={`Star ${key}`}><Star /></IconButton>
              <Text sm secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Appearances & Variants',
    md: 'Combine appearance and variant props for different styles.',
    component: (
      <Col>
        <Row flexWrap>
          <IconButton aria-label="Primary"><Star /></IconButton>
          <IconButton secondary aria-label="Secondary"><Heart /></IconButton>
          <IconButton success aria-label="Success"><Star /></IconButton>
          <IconButton danger aria-label="Danger"><Trash2 /></IconButton>
          <IconButton warning aria-label="Warning"><Star /></IconButton>
          <IconButton info aria-label="Info"><Star /></IconButton>
        </Row>
        <Row flexWrap>
          <IconButton filled aria-label="Primary filled"><Star /></IconButton>
          <IconButton secondary filled aria-label="Secondary filled"><Heart /></IconButton>
          <IconButton success filled aria-label="Success filled"><Star /></IconButton>
          <IconButton danger filled aria-label="Danger filled"><Trash2 /></IconButton>
          <IconButton warning filled aria-label="Warning filled"><Star /></IconButton>
          <IconButton info filled aria-label="Info filled"><Star /></IconButton>
        </Row>
      </Col>
    ),
  },
  {
    title: 'Shapes',
    md: 'IconButton supports `rounded` (default), `pill`, and `sharp` shapes.',
    component: (
      <Row flexWrap>
        {
          ComponentKeys.shape.map((key) => (
            <Col key={key} itemsCenter>
              <IconButton {...{[key]: true}} filled aria-label={`Star ${key}`}><Star /></IconButton>
              <Text sm secondary>{key}</Text>
            </Col>
          ))
        }
      </Row>
    ),
  },
  {
    title: 'Loading State',
    md: 'Set `loading` to show a spinner and auto-disable the button.\n\n```tsx\nconst [loading, setLoading] = useState(false);\n\n<IconButton loading={loading} onClick={() => setLoading(true)} aria-label="Save">\n  <StarIcon />\n</IconButton>\n```',
    component: <LoadingDemo />,
    code: "",
  },
  {
    title: 'As Link',
    md: 'Pass `href` to render as an anchor tag.',
    component: (
      <Row>
        <IconButton href="https://github.com" target="_blank" aria-label="GitHub"><ExternalLink /></IconButton>
        <IconButton href="https://github.com" target="_blank" secondary aria-label="GitHub secondary"><ExternalLink /></IconButton>
      </Row>
    ),
  },
];
