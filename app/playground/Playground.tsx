'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Col, Row, Container, Button, Text, Title } from '@vaneui/ui';
import '../landing/landing.css';
import { LandingHeader } from '../landing/LandingHeader';
import { FRAME } from '../landing/frame';
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
    <Col noGap className="lp-site h-screen">
      <LandingHeader wide />
      {/* The editor and preview sit in the same railed 80rem frame as the docs */}
      <Row noGap justifyCenter itemsStretch flex1 overflowHidden>
        <Container xl noGap borderX itemsStretch relative className={FRAME}>
          <Row justifyBetween borderB noShrink className="px-4 py-2">
            <Title sm>Playground</Title>
            <Button sm secondary onClick={reset}>Reset</Button>
          </Row>
          <Row noGap flex1 overflowHidden wFull mobileStack itemsStretch>
            <Col noGap flex1 overflowHidden className="min-w-0 max-md:h-1/2 border-(--color-border-primary) md:border-r max-md:border-b">
              <CodeEditor value={code} onChange={setCode} />
            </Col>
            {/* Preview on the landing's dot-grid canvas */}
            <Col noGap flex1 relative className="min-w-0 max-md:h-1/2">
              <div aria-hidden="true" className="lp-dots lp-dots--soft"/>
              <Col noGap flex1 overflowYAuto relative className="styled-scrollbar p-6">
                <Preview code={preview} />
              </Col>
            </Col>
          </Row>
        </Container>
      </Row>
    </Col>
  );
}
