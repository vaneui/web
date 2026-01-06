'use client'

import { List, ListItem, Col, Text } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from '../../types';

export const listExamples: DocsPagePart[] = [
  {
    title: 'Basic List',
    md: 'An unordered list with bullet points.',
    component: (
      <List>
        <ListItem>First item in the list</ListItem>
        <ListItem>Second item in the list</ListItem>
        <ListItem>Third item in the list</ListItem>
      </List>
    ),
  },
  {
    title: 'List Style Types',
    md: 'Use `disc` for bullets (default) or `decimal` for numbered lists.',
    component: (
      <Col gap>
        <div>
          <Text semibold>Unordered (disc)</Text>
          <List disc>
            <ListItem>Bullet point one</ListItem>
            <ListItem>Bullet point two</ListItem>
            <ListItem>Bullet point three</ListItem>
          </List>
        </div>
        <div>
          <Text semibold>Ordered (decimal)</Text>
          <List decimal>
            <ListItem>Step one</ListItem>
            <ListItem>Step two</ListItem>
            <ListItem>Step three</ListItem>
          </List>
        </div>
      </Col>
    ),
  },
  {
    title: 'List Sizes',
    md: 'Lists come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.',
    component: (
      <Col gap>
        <List sm>
          <ListItem>Small list item</ListItem>
          <ListItem>Another small item</ListItem>
        </List>
        <List lg>
          <ListItem>Large list item</ListItem>
          <ListItem>Another large item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'List Appearances',
    md: 'Lists support color appearances: `primary`, `secondary`, `success`, `danger`, etc.',
    component: (
      <Col gap>
        <List primary>
          <ListItem>Primary colored item</ListItem>
          <ListItem>Another primary item</ListItem>
        </List>
        <List success>
          <ListItem>Success colored item</ListItem>
          <ListItem>Another success item</ListItem>
        </List>
        <List danger>
          <ListItem>Danger colored item</ListItem>
          <ListItem>Another danger item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'Nested Lists',
    md: 'Lists can be nested for hierarchical content.',
    component: (
      <List>
        <ListItem>
          Parent item one
          <List>
            <ListItem>Nested child item</ListItem>
            <ListItem>Another nested item</ListItem>
          </List>
        </ListItem>
        <ListItem>
          Parent item two
          <List decimal>
            <ListItem>Numbered nested item</ListItem>
            <ListItem>Another numbered item</ListItem>
          </List>
        </ListItem>
        <ListItem>Parent item three</ListItem>
      </List>
    ),
  },
  {
    title: 'List Styling',
    md: 'Combine font properties like `bold`, `italic`, `mono` with lists.',
    component: (
      <Col gap>
        <List semibold>
          <ListItem>Bold list items</ListItem>
          <ListItem>Another bold item</ListItem>
        </List>
        <List mono>
          <ListItem>code --install extension</ListItem>
          <ListItem>npm run build</ListItem>
        </List>
      </Col>
    ),
  },
];
