'use client'

import React, { useState } from 'react';
import { Button, Col, Row, Stack, Text } from '@vaneui/ui';
import Image from "next/image";
import { Check, Copy, Terminal } from "react-feather";
import { Highlight, Language } from 'prism-react-renderer';
import { darkTheme, lightTheme } from './themes';

export interface HighlightRange {
  start: number;
  end: number;
}

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  fileName: string;
  theme?: 'light' | 'dark';
  highlightRanges?: HighlightRange[];
  cursorPosition?: number;
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

export function CodeBlock({
                            code,
                            language,
                            className = '',
                            fileName = '',
                            theme = 'dark',
                            highlightRanges = [],
                            cursorPosition
                          }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const Icon = getLanguageIcon(language);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Col default rounded noGap border overflowHidden className={`w-full ${className}`}>
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
      <Stack xs default noPadding overflowXAuto borderT>
        <Highlight
          theme={currentTheme}
          code={code.trim()}
          language={language as Language}
        >
          {({className: highlightClassName, style, tokens, getLineProps, getTokenProps}) => {
            let globalCharIndex = 0;

            const isHighlighted = (pos: number) =>
              highlightRanges.some(r => pos >= r.start && pos < r.end);

            return (
              <pre
                className={`m-0 py-4 px-6 flex-1 overflow-visible ${highlightClassName}`}
                style={style}
                tabIndex={0}
              >
                <code className="mono text-sm">
                  {tokens.map((line, lineIndex) => {
                    const lineResult = (
                      <div key={lineIndex} {...getLineProps({line})} className="flex w-full items-center">
                        {line.map((token, tokenIndex) => {
                          const tokenStart = globalCharIndex;
                          const tokenContent = token.content;
                          const tokenLength = tokenContent.length;
                          globalCharIndex += tokenLength;

                          const needsSpecialRendering = (() => {
                            for (let i = 0; i < tokenLength; i++) {
                              const pos = tokenStart + i;
                              if (isHighlighted(pos) || cursorPosition === pos) {
                                return true;
                              }
                            }
                            return false;
                          })();

                          if (!needsSpecialRendering) {
                            return <span key={tokenIndex} {...getTokenProps({token})} />;
                          }

                          const chars = tokenContent.split('');
                          const parts: React.ReactNode[] = [];

                          chars.forEach((char, charIndex) => {
                            const charPos = tokenStart + charIndex;
                            const highlighted = isHighlighted(charPos);

                            if (highlighted) {
                              parts.push(
                                <span key={`char-${charIndex}`} className="bg-green-400/20 dark:bg-green-500/30">
                                  {char}
                                </span>
                              );
                            } else {
                              parts.push(char);
                            }

                            if (cursorPosition === charPos) {
                              parts.push(
                                <span
                                  key={`cursor-${charIndex}`}
                                  className="inline-flex w-0.5 h-5 bg-green-500 dark:bg-green-400 animate-pulse"
                                />
                              );
                            }
                          });

                          return (
                            <span key={tokenIndex} {...getTokenProps({token})} className="flex">
                              {parts}
                            </span>
                          );
                        })}
                      </div>
                    );

                    if (lineIndex < tokens.length - 1) {
                      globalCharIndex += 1;
                    }

                    return lineResult;
                  })}
                </code>
              </pre>
            );
          }}
        </Highlight>
      </Stack>
    </Col>
  );
}