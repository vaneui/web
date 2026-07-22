'use client';

import React from 'react';
import { ThemeProvider, Col, Text } from '@vaneui/ui';
import { compile } from './compile';

function ErrorNotice({ message }: { message: string }) {
  return (
    <Col danger filled className="rounded-md p-4">
      <Text sm semibold>Error</Text>
      <Text sm mono className="whitespace-pre-wrap break-words">{message}</Text>
    </Col>
  );
}

// Keyed by the compiled snippet in Preview, so a new snippet remounts a fresh
// boundary — that resets any prior render error automatically.
class RenderBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(err: unknown) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
  render() {
    if (this.state.error) return <ErrorNotice message={this.state.error} />;
    return this.props.children;
  }
}

export function Preview({ code }: { code: string }) {
  const result = React.useMemo(() => compile(code), [code]);

  if (!result.ok) return <ErrorNotice message={result.error} />;

  const { Component } = result;
  return (
    <RenderBoundary key={code}>
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    </RenderBoundary>
  );
}
