'use client';

import React from 'react';
import NextLink from 'next/link';
import { Grid5, Col, Stack, Text, Link, Row } from '@vaneui/ui';
import { Logo } from '../components/Logo';
import { BUILT_WITH, MCP_URL, PRODUCT, VERSION } from './content';
import { FrameRow } from './frame';

const COLUMNS: { title: string; links: { text: string; href: string }[] }[] = [
  {
    title: 'Resources',
    links: [
      { text: 'Documentation', href: '/docs' },
      { text: 'Playground', href: '/playground' },
      { text: 'Core concepts', href: '/docs/getting-started/core-concepts' },
      { text: 'Installation', href: '/docs/getting-started/installation' },
      { text: 'Changelog', href: '/docs/reference/changelog' },
      { text: 'llms.txt', href: '/llms.txt' },
    ],
  },
  {
    // Links from every page, the home page included, straight to the most used component pages
    title: 'Components',
    links: [
      { text: 'Button', href: '/docs/basic-components/button' },
      { text: 'Input', href: '/docs/form-components/input' },
      { text: 'Select', href: '/docs/form-components/select' },
      { text: 'Card', href: '/docs/layout-components/card' },
      { text: 'Grid', href: '/docs/layout-components/grid' },
      { text: 'Modal', href: '/docs/overlay-components/modal' },
      { text: 'Text', href: '/docs/typography-components/text' },
      { text: 'All components', href: '/docs' },
    ],
  },
  {
    title: 'Community',
    links: [
      { text: 'GitHub', href: PRODUCT.githubUrl },
      { text: 'npm', href: 'https://www.npmjs.com/package/@vaneui/ui' },
      { text: 'MCP server', href: MCP_URL },
      { text: 'MIT License', href: 'https://github.com/vaneui/vaneui/blob/main/LICENSE' },
    ],
  },
  {
    title: 'Built with VaneUI',
    links: BUILT_WITH.map(b => ({ text: b.name, href: b.href })),
  },
];

// Pages go through the Next.js router; external URLs and plain files such as /llms.txt are ordinary links
const isPage = (href: string) => href.startsWith('/') && !/\.\w+$/.test(href);

/** Site footer, shared by every page */
export function LandingFooter() {
  return (
    <FrameRow tag="footer" label="Footer">
      <Grid5 divided className="max-tablet:grid-cols-2">
        <Stack xl flexNoWrap justifyBetween primary relative className="min-h-64 max-tablet:col-span-2 max-tablet:min-h-0">
          <Col>
            <Logo/>
            <Text sm tertiary className="max-w-[36ch]">{PRODUCT.description}</Text>
          </Col>
          <Row xs>
            <span aria-hidden="true" className="lp-sq"/>
            <Text xs fontMono tertiary>v{VERSION} · MIT</Text>
          </Row>
        </Stack>
        {COLUMNS.map(col => (
          <Stack xl flexNoWrap primary relative key={col.title}>
            <Text xs fontMono uppercase trackingWider tertiary>{col.title}</Text>
            <Col sm tag="ul">
              {col.links.map(link => (
                <li key={link.text}>
                  <Link sm secondary noUnderline href={link.href} external={link.href.startsWith('http')}
                        tag={isPage(link.href) ? NextLink : 'a'}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </Col>
          </Stack>
        ))}
      </Grid5>
      <Row justifyBetween borderT className="px-8 py-4 max-mobile:px-4">
        {/* the year comes from the build or the visitor's clock, which can differ */}
        <Text xs tertiary suppressHydrationWarning>{PRODUCT.copyright}</Text>
        <Text xs fontMono tertiary mobileHide>{PRODUCT.slogan}</Text>
      </Row>
    </FrameRow>
  );
}
