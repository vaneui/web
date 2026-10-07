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
import { docsSections } from "./docsSections";
import { Eyebrow } from "../landing/frame";

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

  // Subcomponents documented on the parent page (e.g. ListItem on List) get
  // their own props table so merging the pages doesn't lose the prop reference.
  const secondaryKey = pageData.secondaryComponentKey;
  const secondaryTitle = (pageData.secondaryComponentName ?? secondaryKey ?? "") + " Props";
  const secondaryTitleId = toHtmlId(secondaryTitle);

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
    ...(secondaryKey
      ? [{ title: secondaryTitle, id: secondaryTitleId, level: 0 }]
      : []),
  ];

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";

  // Same `[02]` index the sidebar shows next to this category
  const sectionIndex = String(docsSections.findIndex(s => s.slug === section.slug) + 1).padStart(2, '0');

  return (
    <ThemeProvider
      themeDefaults={{
        code: { secondary: true },
        // Tight headline tracking, as on the landing
        pageTitle: { trackingTight: true },
        sectionTitle: { trackingTight: true },
      }}
      extraClasses={{
        // Anchor "#" affordance on the page H1. Markdown-body headings get their
        // own "#" from CustomMdHeading, and their vertical rhythm from the
        // @vaneui/md/styles (.vaneui-md) layer — no per-size pt-* ramp here.
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

            {/* Props Documentation — single auto-generated table replaces
                the previous 30+ per-category prop dump. Common
                layout/utility categories collapse into a <details>. */}
            {componentKey && (
              <Col wFull id={propsTitleId}>
                <Title xl className={titleClasses}>
                  <Link href={`#${propsTitleId}`}>{propsTitle}</Link>
                </Title>
                <DocsPropsTable componentKey={componentKey as ComponentKey} />
              </Col>
            )}

            {secondaryKey && (
              <Col wFull id={secondaryTitleId}>
                <Title xl className={titleClasses}>
                  <Link href={`#${secondaryTitleId}`}>{secondaryTitle}</Link>
                </Title>
                <DocsPropsTable componentKey={secondaryKey as ComponentKey} />
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
                <Text xs fontMono uppercase trackingWider tertiary>More in {section.name}</Text>
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
          <Col sticky tabletHide noShrink className="styled-scrollbar top-26 w-52 max-h-[calc(100dvh-8.5rem)]">
            <OnThisPage sections={sections} />
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}
