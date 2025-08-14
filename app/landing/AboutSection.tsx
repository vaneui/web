'use client'

import React from 'react';
import {
  Text,
  Container,
  Col,
  SectionTitle,
  Chip,
  Section,
} from '@vaneui/ui';

export function AboutSection() {

  return (
    <Section lg relative className="border-b">
      <Container xl>
        <Col>
          <Chip lg secondary pill semibold>What is VaneUI?</Chip>
          <SectionTitle xl>
            A modern React component library powered by Tailwind CSS.
          </SectionTitle>
          <Text lg tertiary className="max-w-3xl">
            VaneUI bridges the gap between utility-first CSS and component-based development.
            Write less code, build faster, and maintain consistency across your entire application.
          </Text>
        </Col>
      </Container>
    </Section>
  );
}