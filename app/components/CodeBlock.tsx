'use client'

import React, { useState } from 'react';
import { Button, Col, Row, Stack, Text } from '@vaneui/ui';
import Image from "next/image";
import { Check, Copy } from "react-feather";
import Prism from "prismjs";
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  fileName: string;
}

export function CodeBlock({code, language, className = '', fileName = ''}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <Col default rounded noGap border overflowHidden className={`w-full ${className}`}>
      <Stack xs row justifyBetween>
        <Row xs>
          <Image src="/react-icon.svg" alt="react-icon" width={20} height={20} className="w-5 h-5"/>
          {fileName && <Text sm mono secondary>{fileName}</Text>}
        </Row>
        <Button xs onClick={copyToClipboard} default={!copied} success={copied}>
          {copied ? <Check className="size-4"/> : <Copy className="size-4"/>}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Stack>
      <Stack xs noPadding rounded className="overflow-x-auto">
          <pre className={`m-0 py-4 px-6 flex-1 overflow-visible language-${language}`} tabIndex={0}>
            <code className={`mono language-${language}`}
                  style={{fontSize: '14px'}}
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      code,
                      Prism.languages[language] || Prism.languages.typescript,
                      language
                    )
                  }}
            />
          </pre>
      </Stack>
    </Col>
  );
} 
