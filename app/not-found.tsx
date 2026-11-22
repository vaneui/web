import React from 'react';
import type { Metadata } from 'next';
import { Container, Col, Row, Section, PageTitle, Text, SectionTitle } from '@vaneui/ui';
import './landing/landing.css';
import { LandingHeader, MAIN_CONTENT_ID } from './landing/LandingHeader';
import { LandingFooter } from './landing/LandingFooter';
import { FRAME } from './landing/frame';
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

// The site header and footer of every other page, so the skip link has its target and the
// message sits in a <main> landmark
export default function NotFound() {
  return (
    <Col noGap primary className="lp-site min-h-screen">
      <LandingHeader/>
      <Row noGap justifyCenter itemsStretch flex1>
        {/* The skip link's target: focusable from script only, and no ring around the whole region */}
        <Container xl noGap borderX justifyCenter relative tag="main" id={MAIN_CONTENT_ID} tabIndex={-1}
                   className={`${FRAME} outline-none`}>
          <Section xl itemsCenter>
            <Col xl itemsCenter>
              <PageTitle xl fontMono secondary fontBold>404</PageTitle>
              <SectionTitle>Page Not Found</SectionTitle>
              <Text textCenter secondary className="max-w-sm">
                {description}
              </Text>
              <NotFoundActions />
            </Col>
          </Section>
        </Container>
      </Row>
      <LandingFooter/>
    </Col>
  );
}
