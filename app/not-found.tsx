'use client'

import React from 'react';
import Link from 'next/link';
import { Container, Col, PageTitle, Text, Button, Row, SectionTitle } from '@vaneui/ui';
import { Home, ArrowLeft } from 'react-feather';

export default function NotFound() {
  return (
    <Container justifyCenter className="min-h-screen">
      <Col xl itemsCenter>
        <PageTitle xl mono secondary bold>404</PageTitle>
        <SectionTitle>Page Not Found</SectionTitle>
        <Text textCenter secondary className="max-w-sm">
          The page you are looking for does not exist or has been moved.
        </Text>
        <Row sm>
          <Button tag="button" onClick={() => window.history.back()} secondary>
            <ArrowLeft className="size-5" />
            Go Back
          </Button>
          <Button tag={Link} href="/" primary>
            <Home className="size-5" />
            Go Home
          </Button>
        </Row>
      </Col>
    </Container>
  );
}