'use client'

import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Title } from '@vaneui/ui';
import { Md } from "@vaneui/md";
import { toHtmlId } from '../utils/stringUtils';

interface DocsMarkdownProps {
  md: string;
}

interface MdHeadingProps {
  level: number;
  children: React.ReactNode;
}

function CustomMdHeading({ level, children }: MdHeadingProps) {
  const titleText = typeof children === 'string' ? children : 
    React.Children.toArray(children).join('');
  const id = toHtmlId(titleText);
  
  const titleClasses = "after:content-['#'] after:invisible hover:after:visible after:ml-2 after:opacity-25";
  
  let sizeProps = {};
  switch (level) {
    case 1:
      sizeProps = { xl: true };
      break;
    case 2:
      sizeProps = { lg: true };
      break;
    case 3:
      sizeProps = { md: true };
      break;
    case 4:
      sizeProps = { sm: true };
      break;
    case 5:
      sizeProps = { xs: true };
      break;
    case 6:
      sizeProps = { xs: true };
      break;
    default:
      sizeProps = { md: true };
  }

  return (
    <Title 
      {...sizeProps}
      href={`#${id}`} 
      id={id}
      className={titleClasses}
    >
      {children}
    </Title>
  );
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
          MdHeading: CustomMdHeading
        }
      }}
    />
  );
}
