import React from 'react';
import {
  Col, Text, Title, PageTitle, Container, Divider,
  ThemeProvider, Row, Chip, type ComponentKey,
} from '@vaneui/ui';
import { DocsPageProps } from './types';
import { toHtmlId, extractMarkdownHeadings } from "../utils/stringUtils";
import { DocsMarkdown } from "./DocsMarkdown";
import { OnThisPage } from './OnThisPage';
import { MetaStrip } from './MetaStrip';
import { DocsPropsTable } from './DocsPropsTable';
import Link from "next/link";

// Server component: the structural shell renders on the server (HTML is
// crawlable + immediate), while ThemeProvider, DocsMarkdown's live demos,
// and OnThisPage's scroll tracking continue to hydrate as client islands.
// No hooks here — sections array is computed once per render server-side.
export function DocsPageContent(
  {
    pageData,
    section,
    md,
  }: DocsPageProps) {

  const componentKey = pageData.componentKey;

  const pageTitle = pageData.name;
  const pageTitleId = toHtmlId(pageTitle);

  const propsTitle = pageTitle + " Props";
  const propsTitleId = toHtmlId(propsTitle);

  // Build sections for OnThisPage navigation. Computed inline — server
  // components don't need useMemo (no re-renders).
  const sections: Array<{ title: string; id: string; level: number }> = [
    { title: pageTitle, id: pageTitleId, level: 0 },
    ...(md && md.trim()
      ? extractMarkdownHeadings(md).map(h => ({
          title: h.title,
          id: h.id,
          level: h.level,
        }))
      : []),
    ...(componentKey
      ? [{ title: propsTitle, id: propsTitleId, level: 0 }]
      : []),
  ];

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";

  return (
    <ThemeProvider
      themeDefaults={{
        code: { success: true },
      }}
      extraClasses={{
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
        },
      }}>
      <Container wFull>
        <Row xl relative itemsStart wFull>
          {/* Main Content */}
          <Col flex1 className="min-w-0">
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

            <Divider />

            {md !== "" && md !== undefined &&
              <DocsMarkdown md={md} slug={pageData.slug} />
            }

            {/* Props Documentation — single auto-generated table replaces
                the previous 30+ per-category prop dump. Common
                layout/utility categories collapse into a <details>. */}
            {componentKey && (
              <Col wFull id={propsTitleId}>
                <Title xl>
                  <Link href={`#${propsTitleId}`}>{propsTitle}</Link>
                </Title>
                <DocsPropsTable componentKey={componentKey as ComponentKey} />
              </Col>
            )}

            {/* Related pages in the same category — gives crawlers (and AI
                crawlers) a strong internal-link signal between siblings, and
                helps readers discover adjacent components.
                Wrap pattern: <Link><Chip/></Link> instead of `tag={Link}`
                so this stays renderable from a server component (function
                refs can't cross the server/client boundary). */}
            {section.pages.length > 1 && (
              <Col wFull>
                <Text sm uppercase secondary mono>More in {section.name}</Text>
                <Row flexWrap>
                  {section.pages
                    .filter(p => p.slug !== pageData.slug)
                    .map(p => (
                      <Link key={p.slug} href={`/docs/${section.slug}/${p.slug}`}>
                        <Chip>{p.name}</Chip>
                      </Link>
                    ))}
                </Row>
              </Col>
            )}
          </Col>

          {/* On This Page Navigation */}
          <Col sticky tabletHide noShrink className="styled-scrollbar top-10 w-56 max-h-[calc(100vh-128px)]">
            <OnThisPage sections={sections} />
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}
