'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Row } from '@vaneui/ui';
import { Home, ArrowLeft, BookOpen } from 'react-feather';

// Client island for not-found.tsx — only the Go Back button needs
// `window.history.back()`, so the rest of the page stays server-rendered
// (and exports `metadata`).
export function NotFoundActions() {
  return (
    <Row sm flexWrap justifyCenter>
      <Button onClick={() => window.history.back()} secondary>
        <ArrowLeft className="size-5" />
        Go Back
      </Button>
      <Button href="/" tag={Link}>
        <Home className="size-5" />
        Go Home
      </Button>
      <Button href="/docs" tag={Link}>
        <BookOpen className="size-5" />
        Browse the Docs
      </Button>
    </Row>
  );
}
