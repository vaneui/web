'use client';

import React from 'react';
import { ThemeProvider, Stack, Text } from '@vaneui/ui';
import { pageDemos } from './.generated/examples/registry';

interface LivePreviewProps {
  /** Fence id — matches the suffix used by build-examples.mjs (`<slug>-<id>`). */
  id: string;
  /** Page slug — typically the markdown filename without extension. */
  slug: string;
}

/**
 * Renders the per-fence wrapper from the auto-generated registry. The chrome
 * mirrors the existing example loop in DocsPageContent.tsx (xl Stack inside a
 * mergeStrategy="replace" ThemeProvider) so live previews under <Md> look the
 * same as the legacy TSX-array `parts.map` rendering.
 *
 * The registry holds one lazily loaded module per page, so a page downloads its
 * own demos and no other page's. The module renders on the server and its chunk
 * is preloaded, so the demos are in the HTML and hydrate in place.
 *
 * If the registry has no entry for `${slug}-${id}` (e.g. the fence didn't make
 * it through the build, or the id is misspelled), surface a small visible
 * warning instead of crashing — that makes authoring/feedback fast.
 */
export function LivePreview({ id, slug }: LivePreviewProps) {
  const fullId = `${slug}-${id}`;
  const PageDemos = pageDemos[slug];
  const notFound = <Text danger sm>Demo not found: {fullId}</Text>;

  return (
    <ThemeProvider mergeStrategy="replace">
      <Stack xl wFull overflowXAuto>
        {PageDemos
          ? <PageDemos id={fullId} fallback={notFound} />
          : notFound
        }
      </Stack>
    </ThemeProvider>
  );
}
