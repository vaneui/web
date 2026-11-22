'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Row } from '@vaneui/ui';
import { Home, ArrowLeft, BookOpen } from 'react-feather';

/** Where Go Back leads when the tab has no earlier page */
export const GO_BACK_FALLBACK = '/docs';

/**
 * Go to the previous page, or to the docs when there is none: a dead link opened in a new tab
 * makes the 404 the tab's first page, and `history.back()` then does nothing.
 */
export function goBack(history: Pick<History, 'length' | 'back'>, navigate: (href: string) => void) {
  if (history.length > 1) history.back();
  else navigate(GO_BACK_FALLBACK);
}

// Client island for not-found.tsx — only the Go Back button needs the browser history,
// so the rest of the page stays server-rendered (and exports `metadata`).
export function NotFoundActions() {
  const router = useRouter();
  return (
    <Row sm flexWrap justifyCenter>
      <Button onClick={() => goBack(window.history, href => router.push(href))} secondary>
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
