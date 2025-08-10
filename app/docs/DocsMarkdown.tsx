'use client'

import React from 'react';
import { ThemeProps, ThemeProvider } from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Md } from "@vaneui/md";

interface DocsMarkdownProps {
  md: string;
}

const overrideFunc = (theme: ThemeProps) => {
  theme.list.themes.size.text.md = "text-base/7";
  return theme;
};

export function DocsMarkdown({md}: DocsMarkdownProps) {
  return (
    <ThemeProvider
      themeOverride={overrideFunc}
      extraClasses={{
        title: {
          xs: "pt-2",
          sm: "pt-3",
          md: "pt-4",
          lg: "pt-5",
          xl: "pt-6"
        },
        text: {
          md: "text-base/7",
        }
      }}
    >
      <Md
        content={md}
        config={{
          components: {
            MdFence: ({content = "", language = "text"}: { content?: string; language?: string }) => {
              return (
                <CodeBlock
                  code={content}
                  language={language}
                  fileName=""
                />
              );
            }
          }
        }}
      />
    </ThemeProvider>
  );
}
