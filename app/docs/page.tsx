import React from 'react';
import { Card, Col, Grid3, PageTitle, Text, Container, SectionTitle } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import Link from "next/link";

export default function DocsPage() {
  return (
    <Container itemsStart className="w-full py-10 gap-10">
      <Col xl>
        <PageTitle>Documentation</PageTitle>
        <Text lg>
          VaneUI provides a collection of reusable components that can be used to build modern and responsive web
          applications.
        </Text>
      </Col>
      <Col xl className="gap-10">
        {docsSections.map((section, groupIndex) => (
          <Col key={groupIndex}>
            <SectionTitle sm semibold>{section.name}</SectionTitle>
            <Text>{section.description}</Text>
            <Grid3>
              {section.pages.map((component, i) => (
                <Link key={i} href={`/docs/${section.slug}/${component.slug}`} className="no-underline">
                  <Card shadow relative overflowHidden
                        className="gap-3 cursor-pointer hover:bg-secondary h-full">
                    <Text lg primary semibold>{component.name}</Text>
                    <Text sm secondary>{component.description}</Text>
                  </Card>
                </Link>
              ))}
            </Grid3>
          </Col>
        ))}
      </Col>
    </Container>
  );
}
