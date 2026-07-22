'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Col, Row, Stack, Button, Text, Title } from '@vaneui/ui';
import { Header } from '../components/Header';
import { Preview } from './Preview';
import { STARTER_CODE } from './starter';

// CodeMirror touches `document`, so keep it out of the SSR pass.
const CodeEditor = dynamic(() => import('./CodeEditor').then((m) => m.CodeEditor), {
  ssr: false,
  loading: () => <Text sm secondary className="p-4">Loading editor…</Text>,
});

const STORAGE_KEY = 'vaneui-playground-code';
const DEBOUNCE_MS = 400;

export function Playground() {
  const [code, setCode] = React.useState(STARTER_CODE);
  const [preview, setPreview] = React.useState(STARTER_CODE);

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved != null) {
      setCode(saved);
      setPreview(saved);
    }
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setPreview(code);
      localStorage.setItem(STORAGE_KEY, code);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [code]);

  const reset = () => {
    setCode(STARTER_CODE);
    setPreview(STARTER_CODE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Col noGap className="h-screen">
      <Header />
      <Stack sm row justifyBetween itemsCenter wFull noShrink
             className="border-b border-(--color-border-primary) px-4 py-2">
        <Title sm>Playground</Title>
        <Button sm secondary onClick={reset}>Reset</Button>
      </Stack>
      <Row noGap flex1 overflowHidden wFull mobileCol style={{ alignItems: 'normal' }}>
        <Col noGap flex1 overflowHidden
             className="min-w-0 max-md:h-1/2 border-(--color-border-primary) md:border-r max-md:border-b">
          <CodeEditor value={code} onChange={setCode} />
        </Col>
        <Col noGap flex1 overflowYAuto
             className="styled-scrollbar min-w-0 max-md:h-1/2 p-6">
          <Preview code={preview} />
        </Col>
      </Row>
    </Col>
  );
}
