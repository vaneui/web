import React from 'react';
import type { Metadata } from 'next';
import { Container, Col, PageTitle, Text, SectionTitle } from '@vaneui/ui';
import { NotFoundActions } from './not-found-actions';

export const metadata: Metadata = {
  title: 'Page Not Found - VaneUI',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container justifyCenter className="min-h-screen">
      <Col xl itemsCenter>
        <PageTitle xl mono secondary bold>404</PageTitle>
        <SectionTitle>Page Not Found</SectionTitle>
        <Text textCenter secondary className="max-w-sm">
          The page you are looking for does not exist or has been moved.
        </Text>
        <NotFoundActions />
      </Col>
    </Container>
  );
}
