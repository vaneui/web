import React from 'react';
import { Row, Col } from '@vaneui/ui';
import Prism from "prismjs";
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface CodeBlockRendererProps {
  code: string;
  language: string;
}

export function CodeBlockRenderer({code, language}: CodeBlockRendererProps) {
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  return (
    <Row noGap flexNoWrap className="overflow-auto rounded-lg bg-[#282c34]">
      <Col className="flex-1">
        <pre
          suppressHydrationWarning
          className="m-0 py-4 px-6 overflow-visible"
        >
          <code
            className={`language-${language}`}
            style={{fontFamily: 'monospace', fontSize: '14px'}}
            dangerouslySetInnerHTML={{__html: highlightedCode}}
          />
        </pre>
      </Col>
    </Row>
  );
}