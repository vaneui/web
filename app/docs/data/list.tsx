'use client'

import { List, ListItem, Text, Col } from "@vaneui/ui";
import React from "react";
import { DocsPagePart } from "../types";

export const listExamples: DocsPagePart[] = [
  {
    title: 'Basic List',
    md: 'A simple list with items.',
    component: (
      <List>
        <ListItem>First list item</ListItem>
        <ListItem>Second list item</ListItem>
        <ListItem>Third list item</ListItem>
      </List>
    ),
  },
  {
    title: 'List Sizes',
    md: 'Lists come in different sizes.',
    component: (
      <Col lg>
        <div>
          <Text semibold>Extra Small List</Text>
          <List xs>
            <ListItem>Extra small item 1</ListItem>
            <ListItem>Extra small item 2</ListItem>
            <ListItem>Extra small item 3</ListItem>
          </List>
        </div>
        <div>
          <Text semibold>Large List</Text>
          <List lg>
            <ListItem>Large item 1</ListItem>
            <ListItem>Large item 2</ListItem>
            <ListItem>Large item 3</ListItem>
          </List>
        </div>
      </Col>
    ),
  },
  {
    title: 'List Font Weights',
    md: 'Lists support different font weights.',
    component: (
      <Col lg>
        <List thin>
          <ListItem>Thin list item</ListItem>
          <ListItem>Another thin item</ListItem>
        </List>
        <List bold>
          <ListItem>Bold list item</ListItem>
          <ListItem>Another bold item</ListItem>
        </List>
        <List semibold>
          <ListItem>Semibold list item</ListItem>
          <ListItem>Another semibold item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'List Appearances',
    md: 'Lists can have different color appearances.',
    component: (
      <Col lg>
        <List primary>
          <ListItem>Primary list item</ListItem>
          <ListItem>Another primary item</ListItem>
        </List>
        <List secondary>
          <ListItem>Secondary list item</ListItem>
          <ListItem>Another secondary item</ListItem>
        </List>
        <List success>
          <ListItem>Success list item</ListItem>
          <ListItem>Another success item</ListItem>
        </List>
        <List danger>
          <ListItem>Danger list item</ListItem>
          <ListItem>Another danger item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'List Font Families',
    md: 'Lists support different font families.',
    component: (
      <Col lg>
        <List sans>
          <ListItem>Sans serif list item</ListItem>
          <ListItem>Another sans serif item</ListItem>
        </List>
        <List serif>
          <ListItem>Serif list item</ListItem>
          <ListItem>Another serif item</ListItem>
        </List>
        <List mono>
          <ListItem>Monospace list item</ListItem>
          <ListItem>Another monospace item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'List Styles',
    md: 'Lists support different styles and decorations.',
    component: (
      <Col lg>
        <List italic>
          <ListItem>Italic list item</ListItem>
          <ListItem>Another italic item</ListItem>
        </List>
        <List underline>
          <ListItem>Underlined list item</ListItem>
          <ListItem>Another underlined item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'List Transformations',
    md: 'Lists support different case transformations.',
    component: (
      <Col lg>
        <List uppercase>
          <ListItem>uppercase list item</ListItem>
          <ListItem>another uppercase item</ListItem>
        </List>
        <List lowercase>
          <ListItem>LOWERCASE LIST ITEM</ListItem>
          <ListItem>ANOTHER LOWERCASE ITEM</ListItem>
        </List>
        <List capitalize>
          <ListItem>capitalize list item</ListItem>
          <ListItem>another capitalize item</ListItem>
        </List>
      </Col>
    ),
  },
  {
    title: 'List Alignment',
    md: 'Lists can be aligned differently.',
    component: (
      <div className="space-y-4 border-2 border-dashed border-gray-300 p-4">
        <List textLeft>
          <ListItem>Left aligned list item</ListItem>
          <ListItem>Another left aligned item</ListItem>
        </List>
        <List textCenter>
          <ListItem>Center aligned list item</ListItem>
          <ListItem>Another center aligned item</ListItem>
        </List>
        <List textRight>
          <ListItem>Right aligned list item</ListItem>
          <ListItem>Another right aligned item</ListItem>
        </List>
      </div>
    ),
  },
  {
    title: 'Mixed List Items',
    md: 'List items can have different individual styling.',
    component: (
      <List>
        <ListItem>Regular list item</ListItem>
        <ListItem primary>Primary list item</ListItem>
        <ListItem secondary bold>Secondary bold list item</ListItem>
        <ListItem success italic>Success italic list item</ListItem>
        <ListItem danger underline>Danger underlined list item</ListItem>
      </List>
    ),
  },
  {
    title: 'Nested Lists',
    md: 'Lists can contain nested sublists for hierarchical content.',
    component: (
      <List>
        <ListItem>First level item 1</ListItem>
        <ListItem>
          First level item 2
          <List>
            <ListItem>Second level item 1</ListItem>
            <ListItem>Second level item 2</ListItem>
            <ListItem>
              Second level item 3
              <List>
                <ListItem>Third level item 1</ListItem>
                <ListItem>Third level item 2</ListItem>
              </List>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>First level item 3</ListItem>
      </List>
    ),
  },
];