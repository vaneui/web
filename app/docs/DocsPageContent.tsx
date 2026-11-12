import React from 'react';
import {
  Col, Text, Title, PageTitle, Container, Divider,
  ThemeProvider, Row, Grid3,
} from '@vaneui/ui';
import { DocsPageProps } from './types';
import { toHtmlId, extractMarkdownHeadings } from "../utils/stringUtils";
import { DocsMarkdown } from "./DocsMarkdown";
import { OnThisPage } from './OnThisPage';
import { MetaStrip } from './MetaStrip';
import { DocsPropsTable } from './DocsPropsTable';
import { propsTableTitle } from '../../lib/docs/propsTables';
import Link from "next/link";
import { docsSections } from "./docsSections";
import { Eyebrow } from "../landing/frame";
import { DocsTile } from "./DocsTile";

// Server component: the shell renders on the server; demos and OnThisPage hydrate as client islands
export function DocsPageContent(
  {
    pageData,
    section,
    md,
  }: DocsPageProps) {

  const pageTitle = pageData.name;
  const pageTitleId = toHtmlId(pageTitle);

  // One props table per component or part the page documents (Menu, MenuItem and MenuLabel on Menu)
  const propsTables = (pageData.propsTables ?? []).map(table => {
    const title = propsTableTitle(table);
    return { title, id: toHtmlId(title), node: table.node };
  });

  // Sections for OnThisPage; computed inline because server components don't re-render
  const sections: Array<{ title: string; id: string; level: number }> = [
    { title: pageTitle, id: pageTitleId, level: 0 },
    ...(md && md.trim()
      ? extractMarkdownHeadings(md).map(h => ({
          title: h.title,
          id: h.id,
          level: h.level,
        }))
      : []),
    ...propsTables.map(table => ({ title: table.title, id: table.id, level: 0 })),
  ];

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";

  // Same `[02]` index the sidebar shows next to this category
  const sectionIndex = String(docsSections.findIndex(s => s.slug === section.slug) + 1).padStart(2, '0');

  return (
    <ThemeProvider
      themeDefaults={{
        code: { secondary: true },
        // Tight headline tracking, as on the landing (PageTitle already has it)
        sectionTitle: { trackingTight: true },
      }}
      extraClasses={{
        // Anchor "#" on the page H1; markdown headings get theirs from CustomMdHeading
        pageTitle: {
          md: titleClasses,
        },
      }}>
      <Container wFull>
        <Row xl relative itemsStart wFull>
          {/* Main Content */}
          <Col flex1 className="min-w-0">
            <Col>
              <Eyebrow index={sectionIndex}>{section.name}</Eyebrow>
              <PageTitle>
                <Link href={`#${pageTitleId}`} id={pageTitleId}>{pageTitle}</Link>
              </PageTitle>
              <Text secondary>{pageData.description}</Text>
              {pageData.frontmatter && (
                <MetaStrip
                  frontmatter={pageData.frontmatter}
                  slug={pageData.slug}
                  category={section.slug}
                />
              )}
            </Col>

            <Divider />

            {md !== "" && md !== undefined &&
              <DocsMarkdown md={md} slug={pageData.slug} />
            }

            {/* Auto-generated props tables; common layout categories collapse into a <details>.
                Each heading is an h2 like the markdown sections, so it doesn't nest under the last one */}
            {propsTables.map(table => (
              <Col wFull id={table.id} key={table.id}>
                <Title xl tag="h2" className={titleClasses}>
                  <Link href={`#${table.id}`}>{table.title}</Link>
                </Title>
                <DocsPropsTable node={table.node} />
              </Col>
            ))}

            {/* Sibling pages: internal links for crawlers and readers, same tiles as the docs index */}
            {section.pages.length > 1 && (
              <Col lg wFull tag="nav" aria-label={`More in ${section.name}`}>
                <Divider/>
                <Eyebrow index={sectionIndex}>More in {section.name}</Eyebrow>
                <Grid3 divided className="max-mobile:grid-cols-2">
                  {section.pages
                    .filter(p => p.slug !== pageData.slug)
                    .map(p => (
                      <DocsTile key={p.slug} href={`/docs/${section.slug}/${p.slug}`} name={p.name}/>
                    ))}
                </Grid3>
              </Col>
            )}
          </Col>

          {/* On This Page Navigation */}
          <Col sticky tabletHide noShrink className="styled-scrollbar top-26 w-52 max-h-[calc(100dvh-8.5rem)]">
            <OnThisPage sections={sections} />
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}
