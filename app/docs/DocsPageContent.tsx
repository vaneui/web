'use client'

import React from 'react';
import {
  Col, Text, Title, PageTitle, Container, Card, Stack, Divider,
  ComponentCategories, ComponentKeys, ListItem
} from '@vaneui/ui';
import { DocsPageProps } from './types';
import { CodeBlock } from '../components/CodeBlock';
import { prepareComponentString } from "../utils/stringUtils";
import { DocsMarkdown } from "./DocsMarkdown";

export function DocsPageContent(
  {
    category,
    pageTitle,
    description,
    examples,
    md,
    componentKey
  }: DocsPageProps) {

  return (
    <Container xs className="w-full py-10">
      <Col xl className="w-full">
        <Col>
          <Text sm uppercase secondary mono>{category}</Text>
          <PageTitle>{pageTitle}</PageTitle>
          <Text default>{description}</Text>
        </Col>

        <Divider/>

        {md !== "" && md !== undefined &&
          <DocsMarkdown md={md}/>
        }

        {/* Examples */}
        {examples.map((example, index) => (
          <Col key={index} className="w-full">
            <Title>{example.title}</Title>
            <DocsMarkdown md={example.md}/>
            <Card xs sharp itemsCenter className="w-full mb-6">
              <Stack xl itemsCenter className="overflow-x-auto w-full overflow-y-visible">
                {example.component}
              </Stack>
              <CodeBlock
                code={prepareComponentString(example.component)}
                language="tsx"
                fileName={`${example.title.replaceAll(" ", "")}.tsx`}
              />
            </Card>
          </Col>
        ))}

        {/* Props Documentation */}
        {
          componentKey && ComponentCategories[componentKey].map((key, index) => (
            <Col key={index} className="w-full">
              <Title sm>{key}</Title>
              <Col xs>
                {
                  ComponentKeys[key as keyof typeof ComponentKeys].map((k: string, index: number) => (
                    <ListItem key={index}>{k}</ListItem>
                  ))
                }
              </Col>
            </Col>
          ))
        }

      </Col>
    </Container>
  );
} 
