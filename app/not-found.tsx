import React from 'react';
import type { Metadata } from 'next';
import { Container, Col, PageTitle, Text, SectionTitle } from '@vaneui/ui';
import { NotFoundActions } from './not-found-actions';
import { BASE_OPEN_GRAPH } from './constants';

const title = 'Page Not Found | VaneUI';
const description = 'The page you are looking for does not exist or has been moved.';

// Next.js marks every 404 noindex itself, so robots is reset here instead of
// adding a second, different robots tag. Its own Open Graph and Twitter cards
// keep a shared broken link from presenting itself as the home page.
export const metadata: Metadata = {
  title,
  description,
  robots: null,
  openGraph: {
    ...BASE_OPEN_GRAPH,
    type: 'website',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function NotFound() {
  return (
    <Container justifyCenter className="min-h-screen">
      <Col xl itemsCenter>
        <PageTitle xl fontMono secondary fontBold>404</PageTitle>
        <SectionTitle>Page Not Found</SectionTitle>
        <Text textCenter secondary className="max-w-sm">
          {description}
        </Text>
        <NotFoundActions />
      </Col>
    </Container>
  );
}
