'use client';

import React from 'react';
import { Grid4, Col, Stack, Text, Link, Row } from '@vaneui/ui';
import { Logo } from '../components/Logo';
import { BUILT_WITH, PRODUCT, VERSION } from './content';
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
    ],
  },
  {
    title: 'Community',
    links: [
      { text: 'GitHub', href: PRODUCT.githubUrl },
      { text: 'npm', href: 'https://www.npmjs.com/package/@vaneui/ui' },
      { text: 'MCP server', href: 'https://www.npmjs.com/package/@vaneui/mcp' },
      { text: 'MIT License', href: 'https://github.com/vaneui/vaneui/blob/main/LICENSE' },
    ],
  },
  {
    title: 'Built with VaneUI',
    links: BUILT_WITH.map(b => ({ text: b.name, href: b.href })),
  },
];

export function LandingFooter() {
  return (
    <FrameRow tag="footer" label="Footer">
      <Grid4 noGap className="lp-grid max-tablet:grid-cols-2">
        <Stack xl flexNoWrap justifyBetween className="lp-cell min-h-64 max-tablet:col-span-2 max-tablet:min-h-0">
          <Col>
            <Logo/>
            <Text sm tertiary className="max-w-[36ch]">{PRODUCT.description}</Text>
          </Col>
          <Row xs>
            <span aria-hidden="true" className="lp-sq"/>
            <Text xs fontMono tertiary>v{VERSION} · MIT</Text>
          </Row>
        </Stack>
        {COLUMNS.map((col, i) => (
          <Stack xl flexNoWrap key={col.title} className={`lp-cell ${i === COLUMNS.length - 1 ? 'max-tablet:col-span-2' : ''}`}>
            <Text xs fontMono uppercase trackingWider tertiary>{col.title}</Text>
            <Col sm tag="ul">
              {col.links.map(link => (
                <li key={link.text}>
                  <Link sm secondary noUnderline href={link.href} external={link.href.startsWith('http')}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </Col>
          </Stack>
        ))}
      </Grid4>
      <Row justifyBetween borderT className="px-8 py-4 max-mobile:px-4">
        <Text xs tertiary>{PRODUCT.copyright}</Text>
        <Text xs fontMono tertiary mobileHide>Deliver clean UI without complex code</Text>
      </Row>
      <Col borderT overflowHidden itemsCenter aria-hidden="true">
        <span className="lp-wordmark">VaneUI</span>
      </Col>
    </FrameRow>
  );
}
