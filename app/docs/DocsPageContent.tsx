'use client'

import React from 'react';
import {
  Col, Text, Title, PageTitle, Container, Card, Stack, Divider,
  ThemeProvider, Row, type ComponentKey,
} from '@vaneui/ui';
import { DocsPageProps } from './types';
import { CodeBlock } from '../components/CodeBlock';
import { prepareComponentString, toHtmlId, extractMarkdownHeadings } from "../utils/stringUtils";
import { DocsMarkdown } from "./DocsMarkdown";
import { OnThisPage } from './OnThisPage';
import { MetaStrip } from './MetaStrip';
import { DocsPropsTable } from './DocsPropsTable';
import Link from "next/link";

export function DocsPageContent(
  {
    pageData,
    section,
    md,
  }: DocsPageProps) {

  const componentKey = pageData.componentKey;

  const parts = React.useMemo(() => pageData.parts ?? [], [pageData.parts]);

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

    // MD-first pages: every example heading lives in the page-level `md`
    // string, so extractMarkdownHeadings covers the whole TOC body.
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

    // Legacy TSX-array pages: top-level `md` is empty and each example
    // title lives in `parts[i].title`. For MD-first pages parts is `[]`,
    // making this a no-op.
    parts.forEach(part => {
      navSections.push({
        title: part.title,
        id: toHtmlId(part.title),
        level: 1
      });
    });

    // Single anchor for the auto-generated props table — replaces the
    // 30+ per-category entries the previous "props dump" emitted.
    if (componentKey) {
      navSections.push({
        title: propsTitle,
        id: propsTitleId,
        level: 0,
      });
    }

    return navSections;
  }, [pageData.name, parts, componentKey, md]);

  const pageTitle = pageData.name;
  const pageTitleId = toHtmlId(pageTitle);

  const propsTitle = pageTitle + " Props";
  const propsTitleId = toHtmlId(propsTitle);

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";

  return (
    <ThemeProvider extraClasses={{
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
      }
    }}>
      <Container wFull>
        <Row xl relative itemsStart wFull>
          {/* Main Content */}
          <Col className="flex-1 min-w-0">
            <Col>
              <Text sm uppercase secondary mono>{section.name}</Text>
              <PageTitle>
                <Link href={`#${pageTitleId}`} id={pageTitleId}>{pageTitle}</Link>
              </PageTitle>
              <Text primary>{pageData.description}</Text>
              {pageData.frontmatter && (
                <MetaStrip
                  frontmatter={pageData.frontmatter}
                  slug={pageData.slug}
                  category={section.slug}
                />
              )}
            </Col>

            <Divider/>

            {md !== "" && md !== undefined &&
              <DocsMarkdown md={md} slug={pageData.slug}/>
            }

            {/* Examples — legacy TSX-array path only. MD-first pages
                (parts.length === 0) render their examples inside the
                <DocsMarkdown> block above via the MdFence override. */}
            {parts.length > 0 && parts.map((example, index) => {
              const id = toHtmlId(example.title);
              const codeString = example.code !== undefined
                ? example.code
                : prepareComponentString(example.component);
              return (
                <Col key={index} wFull>
                  <Title>
                    <Link href={`#${id}`} id={id}>{example.title}</Link>
                  </Title>
                  <DocsMarkdown md={example.md}/>
                  <Card xs sharp itemsCenter wFull className="mb-6">
                    <ThemeProvider mergeStrategy="replace">
                      <Stack xl itemsCenter overflowXAuto overflowYVisible wFull>
                        {example.component}
                      </Stack>
                    </ThemeProvider>
                    {codeString && (
                      <CodeBlock
                        code={codeString}
                        language="tsx"
                        fileName={`${example.title.replaceAll(" ", "")}.tsx`}
                        theme="light"
                      />
                    )}
                  </Card>
                </Col>
              );
            })}

            {/* Props Documentation — single auto-generated table replaces
                the previous 30+ per-category prop dump. Common
                layout/utility categories collapse into a <details>. */}
            {componentKey && (
              <Col wFull id={propsTitleId}>
                <Title xl>
                  <Link href={`#${propsTitleId}`}>{propsTitle}</Link>
                </Title>
                <DocsPropsTable componentKey={componentKey as ComponentKey}/>
              </Col>
            )}
          </Col>

          {/* On This Page Navigation */}
          <Col sticky tabletHide className="styled-scrollbar top-10 w-56 flex-shrink-0 max-h-[calc(100vh-128px)]">
            <OnThisPage sections={sections}/>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}
