import React from 'react';
import { Col, SectionTitle, Text } from '@vaneui/ui';

export function SectionHeader({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Col sm className="max-w-2xl">
      <SectionTitle primary>{title}</SectionTitle>
      <Text lg secondary>{children}</Text>
    </Col>
  );
}
