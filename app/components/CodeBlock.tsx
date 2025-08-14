'use client'

import React, { useState } from 'react';
import { Button, Col, Row, Stack, Text } from '@vaneui/ui';
import Image from "next/image";
import { Check, Copy, Terminal } from "react-feather";
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
  theme?: 'light' | 'dark';
}

function getLanguageIcon(language: string) {
  const imgClasses = "w-5 h-5 greyscale";
  switch (language) {
    case 'tsx':
      return <Image src="/logo/react-icon.svg" width={20} height={20} className={imgClasses} alt="react-icon"/>
    case 'css':
      return <Image src="/logo/css.svg" width={20} height={20} className={imgClasses} alt="css-icon"/>
    default:
      return <Terminal className={imgClasses}/>
  }
}

export function CodeBlock({code, language, className = '', fileName = '', theme = 'dark'}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState('');

  // Update highlighted HTML when code or language changes
  React.useEffect(() => {
    const highlighted = Prism.highlight(
      code,
      Prism.languages[language] || Prism.languages.typescript,
      language
    );
    setHighlightedHtml(highlighted);
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const Icon = getLanguageIcon(language);
  const themeClass = `code-theme-${theme}`;

  return (
    <Col default rounded noGap border overflowHidden className={`w-full ${className} ${themeClass}`}>
      <Stack xs row justifyBetween>
        <Row xs>
          <span className="w-5 h-5 grayscale">
            {Icon}
          </span>
          {fileName && <Text sm mono secondary>{fileName}</Text>}
        </Row>
        <Button xs onClick={copyToClipboard} default={!copied} success={copied}>
          {copied ? <Check className="size-4"/> : <Copy className="size-4"/>}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Stack>
      <Stack xs default noPadding overflowXAuto className="border-t">
          <pre className={`m-0 py-4 px-6 flex-1 overflow-visible language-${language}`} tabIndex={0}>
            <code className={`mono language-${language}`}
                  dangerouslySetInnerHTML={{
                    __html: highlightedHtml
                  }}
            />
          </pre>
      </Stack>
    </Col>
  );
} 
