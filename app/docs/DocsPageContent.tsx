'use client'

import React from 'react';
import {
  Col, Text, Title, PageTitle, Container, Card, Stack, Divider,
  ComponentCategories, ComponentKeys, ListItem, ThemeProvider, Row, ThemeProps
} from '@vaneui/ui';
import { DocsPageProps } from './types';
import { CodeBlock } from '../components/CodeBlock';
import { prepareComponentString, toHtmlId, extractMarkdownHeadings } from "../utils/stringUtils";
import { DocsMarkdown } from "./DocsMarkdown";
import { OnThisPage } from './OnThisPage';
import Link from "next/link";

export function DocsPageContent(
  {
    pageData,
    section,
    md,
  }: DocsPageProps) {

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

    // Add markdown headings if md content exists
    if (md && md.trim()) {
      const markdownHeadings = extractMarkdownHeadings(md);
      markdownHeadings.forEach(heading => {
        navSections.push({
          title: heading.title,
          id: heading.id,
          level: heading.level
        });
      });
    }

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
  }, [pageData.name, pageData.parts, componentKey, md]);

  const pageTitle = pageData.name;
  const pageTitleId = toHtmlId(pageTitle);

  const propsTitle = pageTitle + " Props";
  const propsTitleId = toHtmlId(propsTitle);

  const overrideFunc = (theme: ThemeProps) => {
    theme.list.themes.size.text.md = "text-base/7";
    return theme;
  };

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";

  return (
    <ThemeProvider themeOverride={overrideFunc} extraClasses={{
      title: {
        xs: "pt-2 " + titleClasses,
        sm: "pt-3 " + titleClasses,
        md: "pt-4 " + titleClasses,
        lg: "pt-5 " + titleClasses,
        xl: "pt-6 " + titleClasses
      },
      pageTitle: {
        md: titleClasses,
      },
      text: {
        md: "text-base/7",
      }
    }}>
      <Container className="w-full">
        <Row noGap relative itemsStart className="gap-10 w-full">
          {/* Main Content */}
          <Col xl className="flex-1 min-w-0">
            <Col>
              <Text sm uppercase secondary mono>{section.name}</Text>
              <PageTitle>
                <Link href={`#${pageTitleId}`} id={pageTitleId}>{pageTitle}</Link>
              </PageTitle>
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
                  <Title>
                    <Link href={`#${id}`} id={id}>{example.title}</Link>
                  </Title>
                  <DocsMarkdown md={example.md}/>
                  <Card xs sharp itemsCenter className="w-full mb-6">
                    <ThemeProvider mergeStrategy="replace">
                      <Stack xl itemsCenter overflowXAuto overflowYVisible className="w-full">
                        {example.component}
                      </Stack>
                    </ThemeProvider>
                    <CodeBlock
                      code={prepareComponentString(example.component)}
                      language="tsx"
                      fileName={`${example.title.replaceAll(" ", "")}.tsx`}
                      theme="light"
                    />
                  </Card>
                </Col>
              );
            })}

            {/* Props Documentation */}
            {
              componentKey &&
              <Title xl>
                <Link href={`#${propsTitleId}`} id={propsTitleId}>{propsTitle}</Link>
              </Title>
            }
            {
              componentKey && ComponentCategories[componentKey].map((key, index) => {
                const id = toHtmlId(key);
                return (
                  <Col key={index} className="w-full">
                    <Title>
                      <Link href={`#${id}`} id={id}>{key}</Link>
                    </Title>
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
          <Col sticky lgHide className="styled-scrollbar top-10 w-56 flex-shrink-0 max-h-[calc(100vh-128px)]">
            <OnThisPage sections={sections}/>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
} 
