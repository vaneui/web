'use client'

import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Card, Title, SectionTitle } from '@vaneui/ui';
import { Md } from "@vaneui/md";
import { toHtmlId } from '../utils/stringUtils';
import Link from "next/link";

interface DocsMarkdownProps {
  md: string;
}

interface MdHeadingProps {
  level: number;
  children: React.ReactNode;
}

function CustomMdHeading({level, children}: MdHeadingProps) {
  const titleText = typeof children === 'string' ? children :
    React.Children.toArray(children).join('');
  const id = toHtmlId(titleText);

  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";

  // Markdown ## (level 2) → SectionTitle (h2), ### and below → Title (h3)
  // Level 1 is not expected in markdown body (page title is set by DocsPageContent)
  if (level <= 2) {
    const sizeProps = level === 1 ? {lg: true} : {md: true};
    return (
      <SectionTitle
        {...sizeProps}
        className={titleClasses}
      >
        <Link href={`#${id}`} id={id}>
          {children}
        </Link>
      </SectionTitle>
    );
  }

  let sizeProps = {};
  switch (level) {
    case 3:
      sizeProps = {md: true};
      break;
    case 4:
      sizeProps = {sm: true};
      break;
    default:
      sizeProps = {xs: true};
  }

  return (
    <Title
      {...sizeProps}
      className={titleClasses}
    >
      <Link href={`#${id}`} id={id}>
        {children}
      </Link>
    </Title>
  );
}

function CustomMdBlockquote({children}: { children: React.ReactNode }) {
  return (
    <Card noGap shadow>
      {children}
    </Card>
  )
}

export function DocsMarkdown({md}: DocsMarkdownProps) {
  return (
    <Md
      content={md}
      config={{
        components: {
          MdFence: ({content = "", language = "text"}: { content?: string; language?: string }) => {
            return (
              <CodeBlock
                code={content}
                theme="light"
                language={language}
                fileName=""
              />
            );
          },
          MdHeading: CustomMdHeading,
          MdBlockquote: CustomMdBlockquote,
        }
      }}
    />
  );
}
