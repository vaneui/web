'use client'

import React from 'react';
import { Col, Grid3, PageTitle, Row, Stack, Text } from '@vaneui/ui';
import { ArrowUpRight } from 'react-feather';
import { docsSections } from "./docsSections";
import Link from "next/link";
import { Brackets, Eyebrow } from "../landing/frame";

/** Docs hub: each category as an eyebrow and a grid of touching hairline tiles, like the landing's component grid */
export default function DocsIndex() {
  return (
    <Col xl wFull>
      <Col>
        <PageTitle trackingTight>Documentation</PageTitle>
        <Text lg secondary className="max-w-[60ch]">
          VaneUI provides a collection of reusable components that can be used to build modern and responsive web
          applications.
        </Text>
      </Col>
      {docsSections.map((section, i) => (
        <Col key={section.slug}>
          <Col sm>
            <Eyebrow index={String(i + 1).padStart(2, '0')}>{section.name}</Eyebrow>
            <Text sm tertiary>{section.description}</Text>
          </Col>
          <Grid3 className="lp-tiles max-tablet:grid-cols-2 max-mobile:grid-cols-1">
            {section.pages.map(page => (
              <Stack key={page.slug} sm flexNoWrap tag={Link} href={`/docs/${section.slug}/${page.slug}`}
                     className="lp-cell">
                <Brackets/>
                <Row justifyBetween itemsStart>
                  <Text fontMedium>{page.name}</Text>
                  <ArrowUpRight aria-hidden="true" className="lp-nudge size-4 shrink-0 opacity-50"/>
                </Row>
                <Text sm tertiary>{page.description}</Text>
              </Stack>
            ))}
          </Grid3>
        </Col>
      ))}
    </Col>
  );
}
