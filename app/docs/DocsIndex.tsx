'use client'

import React from 'react';
import { Col, Grid3, PageTitle, Text } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import { Eyebrow } from "../landing/frame";
import { DocsTile } from "./DocsTile";

/** Docs hub: each category as an eyebrow heading over a grid of touching hairline tiles */
export default function DocsIndex() {
  return (
    <Col xl wFull>
      <Col>
        <PageTitle>Documentation</PageTitle>
        <Text lg secondary className="max-w-[60ch]">
          VaneUI is a React component library for Tailwind CSS v4. Install it, learn the boolean props API, and
          browse 40+ components with live examples and props tables.
        </Text>
      </Col>
      {docsSections.map((section, i) => (
        <Col key={section.slug}>
          <Col sm>
            <Eyebrow tag="h2" index={String(i + 1).padStart(2, '0')}>{section.name}</Eyebrow>
            <Text sm tertiary>{section.description}</Text>
          </Col>
          <Grid3 noGap className="lp-tiles">
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
