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
      <Col className="w-full gap-10">
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
            <Card sharp itemsCenter className="gap-8 w-full">
              <Stack xs itemsCenter className="overflow-x-auto w-full overflow-y-visible py-8">
                {example.component}
              </Stack>
              <CodeBlock
                code={prepareComponentString(example.component)}
                language="tsx"
                fileName={`${pageTitle}${example.title ? ' - ' + example.title : ''}.tsx`}
              />
            </Card>
          </Col>
        ))}

        {/* Props Documentation */}


      </Col>
    </Container>
  );
} 
