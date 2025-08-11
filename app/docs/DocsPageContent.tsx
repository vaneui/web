'use client'

import React from 'react';
import {
  Col, Text, Title, PageTitle, Container, Card, Stack, Divider,
  ComponentCategories, ComponentKeys, ListItem, ThemeProvider, Row
} from '@vaneui/ui';
import { DocsPageProps } from './types';
import { CodeBlock } from '../components/CodeBlock';
import { prepareComponentString, toHtmlId } from "../utils/stringUtils";
import { DocsMarkdown } from "./DocsMarkdown";
import { OnThisPage } from './OnThisPage';

export function DocsPageContent(
  {
    pageData,
    section,
    md,
  }: DocsPageProps) {

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-50";
  const componentKey = pageData.componentKey;

  // Build sections for OnThisPage navigation
  const sections = React.useMemo(() => {
    const pageTitleId = toHtmlId(pageData.name);
    const propsTitle = pageData.name + " Props";
    const propsTitleId = toHtmlId(propsTitle);
    
    const navSections: Array<{
      title: string;
      id: string;
      level: number;
    }> = [];

    navSections.push({
      title: pageData.name,
      id: pageTitleId,
      level: 0
    });

    // Add example sections
    pageData.parts.forEach(part => {
      navSections.push({
        title: part.title,
        id: toHtmlId(part.title),
        level: 1
      });
    });

    // Add props documentation sections if they exist
    if (componentKey && ComponentCategories[componentKey]) {

      navSections.push({
        title: propsTitle,
        id: propsTitleId,
        level: 0
      });

      ComponentCategories[componentKey].forEach(key => {
        navSections.push({
          title: key,
          id: toHtmlId(key),
          level: 1
        });
      });
    }

    return navSections;
  }, [pageData.name, pageData.parts, componentKey]);

  const pageTitleId = toHtmlId(pageData.name);
  const propsTitle = pageData.name + " Props";
  const propsTitleId = toHtmlId(propsTitle);

  return (
    <ThemeProvider extraClasses={{
      title: {
        md: titleClasses
      },
      pageTitle: {
        md: titleClasses
      }
    }}>
      <Container className="w-full">
        <Row noGap relative itemsStart className="gap-10 w-full">
          {/* Main Content */}
          <Col xl className="flex-1 min-w-0">
            <Col>
              <Text sm uppercase secondary mono>{section.name}</Text>
              <PageTitle href={`#${pageTitleId}`} id={pageTitleId}>{pageData.name}</PageTitle>
              <Text default>{pageData.description}</Text>
            </Col>

            <Divider/>

            {md !== "" && md !== undefined &&
              <DocsMarkdown md={md}/>
            }

            {/* Examples */}
            {pageData.parts.map((example, index) => {
              const id = toHtmlId(example.title);
              return (
                <Col key={index} className="w-full">
                  <Title href={`#${id}`} id={id}>{example.title}</Title>
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
              );
            })}

            {/* Props Documentation */}
            {
              <Title xl href={`#${propsTitleId}`} id={propsTitleId}>{propsTitle}</Title>
            }
            {
              componentKey && ComponentCategories[componentKey].map((key, index) => {
                const id = toHtmlId(key);
                return (
                  <Col key={index} className="w-full">
                    <Title href={`#${id}`} id={id}>{key}</Title>
                    <Col xs>
                      {
                        ComponentKeys[key as keyof typeof ComponentKeys].map((k: string, index: number) => (
                          <ListItem key={index}>{k}</ListItem>
                        ))
                      }
                    </Col>
                  </Col>
                );
              })
            }
          </Col>

          {/* On This Page Navigation */}
          <Col sticky lgHide className="styled-scrollbar top-10 w-48 flex-shrink-0 max-h-[calc(100vh-128px)]">
            <OnThisPage sections={sections}/>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
} 
