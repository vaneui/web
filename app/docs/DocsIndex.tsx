'use client'

import React from 'react';
import { Col, Grid3, PageTitle, Text } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import { Eyebrow } from "../landing/frame";
import { DocsTile } from "./DocsTile";

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
              <DocsTile key={page.slug} href={`/docs/${section.slug}/${page.slug}`}
                        name={page.name} description={page.description}/>
            ))}
          </Grid3>
        </Col>
      ))}
    </Col>
  );
}
