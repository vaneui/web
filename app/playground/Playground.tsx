'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Col, Row, Container, Button, Title } from '@vaneui/ui';
import '../landing/landing.css';
import { LandingHeader } from '../landing/LandingHeader';
import { FRAME } from '../landing/frame';
import { Preview } from './Preview';
import { STARTER_CODE } from './starter';

/**
 * The starter code with line numbers, laid out like the editor, until CodeMirror loads. It is
 * also what the server renders, so the page's HTML carries the code instead of a loading notice.
 */
function EditorFallback() {
  return (
    <Row noGap itemsStretch flex1 overflowHidden className="font-[monospace] text-sm leading-[1.4]">
      <Col noGap secondary borderR textRight aria-hidden="true" className="py-1 pr-0.75 pl-1.25">
        {STARTER_CODE.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
      </Col>
      <pre className="py-1 pr-0.5 pl-1.5 font-[monospace]">{STARTER_CODE}</pre>
    </Row>
  );
}

// CodeMirror touches `document`, so keep it out of the SSR pass.
const CodeEditor = dynamic(() => import('./CodeEditor').then((m) => m.CodeEditor), {
  ssr: false,
  loading: EditorFallback,
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
    <Col noGap primary hScreen className="lp-site">
      <LandingHeader/>
      {/* The editor and preview sit in the same railed 80rem frame as every other page */}
      <Row noGap justifyCenter itemsStretch flex1 overflowHidden>
        <Container xl noGap borderX itemsStretch relative tag="main" className={FRAME}>
          <Row justifyBetween borderB noShrink className="px-4 py-2">
            <Title sm tag="h1">Playground</Title>
            <Button secondary onClick={reset}>Reset</Button>
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
