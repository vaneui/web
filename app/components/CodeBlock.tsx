'use client'

import React, { useState } from 'react';
import { Button, Col, Row, Stack, Text } from '@vaneui/ui';
import Image from "next/image";
import { Check, Copy, Terminal } from "react-feather";
import { Highlight, Language } from 'prism-react-renderer';

export interface HighlightRange {
  start: number;
  end: number;
  className?: string;
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

// Custom dark theme based on your existing colors
const customDarkTheme = {
  plain: {
    color: '#e3e3e3',
    backgroundColor: '#1e1e2e',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'cdata'],
      style: {
        color: '#7a7c85',
        fontStyle: 'italic' as const,
      },
    },
    {
      types: ['string', 'attr-value', 'char', 'builtin', 'inserted'],
      style: {
        color: '#f9c96e',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#9da3b3',
      },
    },
    {
      types: ['constant', 'symbol', 'variable'],
      style: {
        color: '#74c7ec',
      },
    },
    {
      types: ['keyword', 'important', 'selector', 'atrule'],
      style: {
        color: '#c792ea',
      },
    },
    {
      types: ['function', 'deleted'],
      style: {
        color: '#f97583',
      },
    },
    {
      types: ['tag', 'selector', 'class-name'],
      style: {
        color: '#89ddff',
      },
    },
    {
      types: ['number', 'boolean'],
      style: {
        color: '#74c7ec',
      },
    },
    {
      types: ['attr-name', 'property'],
      style: {
        color: '#c792ea',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
};

// Custom light theme based on your existing colors
const customLightTheme = {
  plain: {
    color: '#2c3e50',
    backgroundColor: '#f8fbff',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'cdata'],
      style: {
        color: '#718096',
        fontStyle: 'italic' as const,
      },
    },
    {
      types: ['string', 'attr-value', 'char', 'builtin', 'inserted'],
      style: {
        color: '#e67e22',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#64748b',
      },
    },
    {
      types: ['constant', 'symbol', 'variable'],
      style: {
        color: '#8b5cf6',
      },
    },
    {
      types: ['keyword', 'important', 'selector', 'atrule'],
      style: {
        color: '#3b82f6',
      },
    },
    {
      types: ['function', 'deleted'],
      style: {
        color: '#059669',
      },
    },
    {
      types: ['tag', 'selector', 'class-name'],
      style: {
        color: '#1e3a8a',
      },
    },
    {
      types: ['number', 'boolean'],
      style: {
        color: '#dc2626',
      },
    },
    {
      types: ['attr-name', 'property'],
      style: {
        color: '#7c3aed',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
};

export function CodeBlock({code, language, className = '', fileName = '', theme = 'dark', highlightRanges = [], cursorPosition}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const Icon = getLanguageIcon(language);
  const currentTheme = theme === 'dark' ? customDarkTheme : customLightTheme;

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
      <Stack xs default noPadding overflowXAuto className="border-t">
        <Highlight
          theme={currentTheme}
          code={code.trim()}
          language={language as Language}
        >
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => {
            let globalCharIndex = 0;
            
            // Helper to check if a position should be highlighted
            const isHighlighted = (pos: number) => 
              highlightRanges.some(r => pos >= r.start && pos < r.end);
            
            // Helper to get highlight class
            const getHighlightClass = (pos: number) => {
              const range = highlightRanges.find(r => pos >= r.start && pos < r.end);
              return range?.className || 'bg-green-400/20 dark:bg-green-500/30';
            };
            
            // Helper to render cursor
            const renderCursor = (key: string) => (
              <span 
                key={key}
                className="inline-flex w-0.5 h-5 bg-green-500 dark:bg-green-400 animate-pulse"
              />
            );
            
            return (
              <pre 
                className={`m-0 py-4 px-6 flex-1 overflow-visible ${highlightClassName}`} 
                style={style}
                tabIndex={0}
              >
                <code className="mono">
                  {tokens.map((line, lineIndex) => {
                    const lineResult = (
                      <div key={lineIndex} {...getLineProps({ line })} className="flex w-full items-center">
                        {line.map((token, tokenIndex) => {
                          const tokenStart = globalCharIndex;
                          const tokenContent = token.content;
                          const tokenLength = tokenContent.length;
                          globalCharIndex += tokenLength;
                          
                          // Check if this token needs special rendering
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
                            return <span key={tokenIndex} {...getTokenProps({ token })} />;
                          }
                          
                          // Render token with highlighting and/or cursor
                          const chars = tokenContent.split('');
                          const parts: React.ReactNode[] = [];
                          
                          chars.forEach((char, charIndex) => {
                            const charPos = tokenStart + charIndex;
                            const highlighted = isHighlighted(charPos);
                            
                            if (highlighted) {
                              parts.push(
                                <span key={`char-${charIndex}`} className={getHighlightClass(charPos)}>
                                  {char}
                                </span>
                              );
                            } else {
                              parts.push(char);
                            }
                            
                            if (cursorPosition === charPos) {
                              parts.push(renderCursor(`cursor-${charIndex}`));
                            }
                          });
                          
                          return (
                            <span key={tokenIndex} {...getTokenProps({ token })} className="flex">
                              {parts}
                            </span>
                          );
                        })}
                      </div>
                    );
                    
                    // Add 1 for newline character (except for the last line)
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