'use client';

import React from 'react';
import NextLink from 'next/link';
import { Col, Container, Divider, Grid4, Link, PageTitle, Row, Stack, Text } from '@vaneui/ui';
import '../landing/landing.css';
import './tools.css';
import { LandingHeader, MAIN_CONTENT_ID } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { Eyebrow, FRAME } from '../landing/frame';
import { DocsTile } from '../docs/DocsTile';
import { TOOLS, getTool, toolHref } from './tools';

/** The site header, the railed 80rem column and the site footer, around the tools and their hub */
export function ToolsFrame({ children }: { children: React.ReactNode }) {
  return (
    <Col noGap primary className="lp-site min-h-screen">
      <LandingHeader/>
      <Row noGap justifyCenter itemsStretch flex1>
        {/* The skip link's target: focusable from script only, and no ring around the whole region */}
        <Container xl noGap borderX itemsStretch relative tag="main" id={MAIN_CONTENT_ID} tabIndex={-1}
                   className={`${FRAME} outline-none`}>
          {/* No wrap: a wrapping column sizes its line to the widest child, and a code block is wide */}
          <Stack xl flexNoWrap className="lg:py-12">
            {children}
          </Stack>
        </Container>
      </Row>
      <LandingFooter/>
    </Col>
  );
}

/**
 * The frame every free tool sits in: a breadcrumb, the page name and summary, the tool, links to
 * the guide and the other tools.
 */
export function ToolShell({ slug, actions, children }: {
  slug: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const tool = getTool(slug);
  return (
    <ToolsFrame>
      <Col sm className="max-w-[64ch]">
        <Row xs tag="nav" aria-label="Breadcrumb">
          <Link sm secondary noUnderline tag={NextLink} href="/tools">Free tools</Link>
          <Text sm tertiary aria-hidden="true">/</Text>
          <Text sm tertiary aria-current="page">{tool.name}</Text>
        </Row>
        <PageTitle>{tool.name}</PageTitle>
        <Text secondary>{tool.description}</Text>
      </Col>
      {actions && <Row sm flexWrap>{actions}</Row>}
      {children}
      <Divider/>
      <Text sm secondary>
        Free, runs in your browser, and nothing you enter leaves it. Read the idea behind it in{' '}
        <Link tag={NextLink} href={tool.guide.href}>{tool.guide.name}</Link>.
      </Text>
      <Col lg tag="nav" aria-label="More free tools">
        <Eyebrow index="T">More free tools</Eyebrow>
        <Grid4 divided className="max-tablet:grid-cols-2">
          {TOOLS.filter(t => t.slug !== slug).map(t => (
            <DocsTile key={t.slug} href={toolHref(t.slug)} name={t.name}/>
          ))}
          <DocsTile href="/blocks" name="UI Blocks"/>
        </Grid4>
      </Col>
    </ToolsFrame>
  );
}
