import React from 'react';
import { Card, Col, Grid3, Link as VaneLink, PageTitle, Text } from '@vaneui/ui';
import { DocsPageLayout } from './DocsPageLayout';
import { docsSections } from "./docsSections";
import Link from "next/link";

export default function DocsPage() {
  return (
    <DocsPageLayout>
      <Col>
        <PageTitle>Documentation</PageTitle>
        <Text lg>
          VaneUI provides a collection of reusable components that can be used to build modern and responsive web
          applications.
        </Text>

        {docsSections.map((section, groupIndex) => (
          <Col xl key={groupIndex} className="mt-12">
            <Text lg semibold>{section.name}</Text>
            <Text secondary className="mb-4">{section.description}</Text>

            <Grid3>
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
    </DocsPageLayout>
  );
} 
