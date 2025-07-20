import React from 'react';
import { Card, Col, Grid3, Link as VaneLink, PageTitle, Text, Container, SectionTitle } from '@vaneui/ui';
import { DocsPageLayout } from './DocsPageLayout';
import { docsSections } from "./docsSections";
import Link from "next/link";

export default function DocsPage() {
  return (
    <DocsPageLayout>
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
              <Text secondary>{section.description}</Text>
              <Grid3 sm>
                {section.components.map((component, componentIndex) => (
                  <VaneLink secondary href={`/docs/${section.slug}/${component.name.toLowerCase()}`} tag={Link}
                            className="hover:no-underline w-full"
                            key={componentIndex}>
                    <Card shadow className="gap-3 h-full">
                      <Text lg semibold>{component.name}</Text>
                      <Text sm>{component.description}</Text>
                    </Card>
                  </VaneLink>
                ))}
              </Grid3>
            </Col>
          ))}
        </Col>
      </Container>
    </DocsPageLayout>
  );
} 
