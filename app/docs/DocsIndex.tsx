'use client'

import React from 'react';
import { Card, Col, Grid3, PageTitle, Text, Container, SectionTitle } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import Link from "next/link";

export default function DocsIndex() {
  return (
    <Container xl itemsStart wFull className="py-10">
      <Col xl>
        <PageTitle>Documentation</PageTitle>
        <Text lg>
          VaneUI provides a collection of reusable components that can be used to build modern and responsive web
          applications.
        </Text>
      </Col>
      <Col xl>
        {docsSections.map((section, groupIndex) => (
          <Col key={groupIndex}>
            <SectionTitle sm semibold>{section.name}</SectionTitle>
            <Text>{section.description}</Text>
            <Grid3>
              {section.pages.map((component, i) => (
                <Card sm shadow cursorPointer hFull key={i} href={`/docs/${section.slug}/${component.slug}`} tag={Link}>
                  <Text lg semibold>{component.name}</Text>
                  <Text sm secondary>{component.description}</Text>
                </Card>
              ))}
            </Grid3>
          </Col>
        ))}
      </Col>
    </Container>
  );
}
