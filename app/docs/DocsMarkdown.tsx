'use client'

import React from 'react';
import { ThemeProvider } from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Md } from "@vaneui/md";

interface DocsMarkdownProps {
  md: string;
}

export function DocsMarkdown({md}: DocsMarkdownProps) {
  return (
    <ThemeProvider
      extraClasses={{
        title: {
          xs: "pt-2",
          sm: "pt-3",
          md: "pt-4",
          lg: "pt-5",
          xl: "pt-6"
        },
        list: {
          xs: "gap-1",
          sm: "gap-1",
          md: "gap-2",
          lg: "gap-3",
          xl: "gap-3"
        }
      }}
      themeDefaults={{
        list: {
          md: true,
          flex: true,
        }
      }}
      theme={{
        list: {base: "flex-col"}
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
