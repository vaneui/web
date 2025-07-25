'use client'

import React from 'react';
import { Col, Text, Title, PageTitle, Container, Card, Stack } from '@vaneui/ui';
import { DocsPageProps } from './types';
import { CodeBlock } from '../components/CodeBlock';
import { prepareComponentString } from "../utils/stringUtils";

export function DocsPageContent(
  {
    category,
    pageTitle,
    description,
    examples,
  }: DocsPageProps) {

  return (
    <Container xs className="w-full py-10">
      <Col xl className="w-full">
        <Col>
          <Text sm uppercase secondary mono>{category}</Text>
          <PageTitle>{pageTitle}</PageTitle>
          <Text default>{description}</Text>
        </Col>

        {/* Examples */}
        {examples.map((example, index) => (
          <Col key={index} className="w-full">
            <Title>{example.title}</Title>
            <Text>{example.description}</Text>
            <Card xs sharp itemsCenter className="w-full">
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


      </Col>
    </Container>
  );
} 
