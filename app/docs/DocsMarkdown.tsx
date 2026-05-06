'use client'

import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Card, Title, SectionTitle } from '@vaneui/ui';
import { Md } from "@vaneui/md";
import { toHtmlId } from '../utils/stringUtils';
import { extractFences, type ExtractedFence } from '../../lib/docs/extractFences';
import { LivePreview } from './LivePreview';
import Link from "next/link";

interface DocsMarkdownProps {
  md: string;
  /**
   * Page slug — used to look up live-preview wrappers in the auto-generated
   * registry. Wrappers are keyed `${slug}-${fenceId}` (matching the file naming
   * in build-examples.mjs). Optional: when omitted, fences fall through to
   * plain CodeBlock rendering (used by the legacy TSX-array `parts.map` flow,
   * where `example.md` is short narrative prose with no demo fences).
   */
  slug?: string;
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

/**
 * Pairing is done by content match: the Nth `tsx`/`jsx` fence Markdoc emits
 * with body B is the entry in `fences[]` whose `body === B` AND whose ordinal
 * position among same-body fences also matches. A simple Map keyed on body
 * text suffices because identical fence bodies are rare in practice; on
 * collision we shift to the next entry with the same body so duplicates still
 * pair correctly without relying on render-order side effects (which React 19
 * forbids in components).
 */
interface FenceLookup {
  /** Body-text -> queue of fences with that body, in document order. */
  byBody: Map<string, ExtractedFence[]>;
  /**
   * Per-component-instance memo of the resolved fence. Keyed by `useId()`
   * inside `FenceWithLivePreview`. React 19 Strict Mode double-invokes every
   * component's body in dev — without memoization, the first invocation shifts
   * the queue and the second sees it empty, producing a hydration mismatch
   * (server: live preview Card; client: bare CodeBlock). The cache keeps the
   * result stable across both passes.
   */
  byInstance: Map<string, ExtractedFence | null>;
  slug: string | undefined;
}

/**
 * Normalize fence body for matching — Markdoc's runtime fence content always
 * ends with `\n` (markdown-it's `getLines`), while our extractor regex stops
 * before the trailing newline. Strip trailing whitespace on both sides so the
 * pairing key is stable regardless of source formatting.
 */
function normalizeBody(body: string): string {
  return body.replace(/\s+$/, '');
}

function buildFenceLookup(fences: ExtractedFence[], slug: string | undefined): FenceLookup {
  const byBody = new Map<string, ExtractedFence[]>();
  for (const fence of fences) {
    const key = normalizeBody(fence.body);
    const queue = byBody.get(key);
    if (queue) queue.push(fence);
    else byBody.set(key, [fence]);
  }
  return { byBody, byInstance: new Map(), slug };
}

const FenceLookupContext = React.createContext<FenceLookup | null>(null);

interface MdFenceProps {
  content?: string;
  language?: string;
}

function FenceWithLivePreview({ content = '', language = 'text' }: MdFenceProps) {
  const lookup = React.useContext(FenceLookupContext);
  // Stable per-instance ID — same value across Strict Mode's double render so
  // we can memoize the queue.shift() result and avoid the second pass seeing
  // an empty queue.
  const instanceId = React.useId();

  // Only tsx/jsx fences participate in fence pairing.
  const isTsxLike = language === 'tsx' || language === 'jsx';
  let fence: ExtractedFence | undefined;
  if (isTsxLike && lookup) {
    const cached = lookup.byInstance.get(instanceId);
    if (cached !== undefined) {
      // Second (or later) render of this instance — return the previously
      // resolved fence. `null` means we already looked and didn't find one.
      fence = cached ?? undefined;
    } else {
      const queue = lookup.byBody.get(normalizeBody(content));
      if (queue && queue.length > 0) {
        fence = queue.shift();
      }
      lookup.byInstance.set(instanceId, fence ?? null);
    }
  }

  if (
    fence &&
    fence.kind === 'demo' &&
    fence.id !== null &&
    lookup?.slug !== undefined
  ) {
    return (
      <Card xs sharp>
        <LivePreview id={fence.id} slug={lookup.slug} />
        <CodeBlock
          code={content}
          theme="light"
          language={language}
          fileName=""
        />
      </Card>
    );
  }

  return (
    <CodeBlock
      code={content}
      theme="light"
      language={language}
      fileName=""
    />
  );
}

export function DocsMarkdown({md, slug}: DocsMarkdownProps) {
  // Rebuild the lookup on every render. The lookup's per-body queues are
  // consumed (shifted) as `<Md>` walks the document, which means a single
  // lookup instance is single-use — recomputing here keeps each render pass
  // fresh without relying on refs the linter forbids us from mutating.
  const fences = extractFences(md).fences;
  const lookup = buildFenceLookup(fences, slug);

  return (
    <FenceLookupContext.Provider value={lookup}>
      <Md
        content={md}
        rendererTheme={{
          mdCode: { secondary: true, noRing: true },
        }}
        config={{
          components: {
            MdFence: FenceWithLivePreview,
            MdHeading: CustomMdHeading,
            MdBlockquote: CustomMdBlockquote,
          }
        }}
      />
    </FenceLookupContext.Provider>
  );
}
