'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Col, Row, Container, Button, Title } from '@vaneui/ui';
import '../landing/landing.css';
import { LandingHeader, MAIN_CONTENT_ID } from '../landing/LandingHeader';
import { FRAME } from '../landing/frame';
import { Preview } from './Preview';
import { STARTER_CODE } from './starter';
import { browserStorage, clearSavedCode, loadSavedCode, withoutReset, writeSavedCode } from '../../lib/playground/savedCode';

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

const DEBOUNCE_MS = 400;

export function Playground() {
  const [code, setCode] = React.useState(STARTER_CODE);
  const [preview, setPreview] = React.useState(STARTER_CODE);
  // Nothing is saved until the saved snippet has been read, so the starter never overwrites it
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // `?reset` clears the saved snippet before it can run: the way out when it hangs the page
    const { code: saved, reset } = loadSavedCode(window.location.search, browserStorage());
    if (reset) {
      // Dropped from the URL, so a reload keeps what is typed next
      window.history.replaceState(window.history.state, '', withoutReset(window.location.href));
    }
    if (saved != null) {
      setCode(saved);
      setPreview(saved);
    }
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setPreview(code), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [code]);

  // Saved only after the snippet rendered: this effect runs once React has committed `preview`,
  // after the snippet's own effects. A snippet that never finishes rendering (an endless loop)
  // is therefore never saved, and the next visit starts from the last one that did render.
  React.useEffect(() => {
    if (loaded) writeSavedCode(browserStorage(), preview);
  }, [loaded, preview]);

  const reset = () => {
    setCode(STARTER_CODE);
    setPreview(STARTER_CODE);
    clearSavedCode(browserStorage());
  };

  return (
    <Col noGap primary hScreen className="lp-site">
      <LandingHeader/>
      {/* The editor and preview sit in the same railed 80rem frame as every other page */}
      <Row noGap justifyCenter itemsStretch flex1 overflowHidden>
        {/* The skip link's target: focusable from script only, and no ring around the whole region */}
        <Container xl noGap borderX itemsStretch relative tag="main" id={MAIN_CONTENT_ID} tabIndex={-1}
                   className={`${FRAME} outline-none`}>
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
