'use client';

import React from 'react';
import { ThemeProvider, Stack, Text } from '@vaneui/ui';
import { examples } from './.generated/examples/registry';

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
 * If the registry has no entry for `${slug}-${id}` (e.g. the fence didn't make
 * it through the build, or the id is misspelled), surface a small visible
 * warning instead of crashing — that makes authoring/feedback fast.
 */
export function LivePreview({ id, slug }: LivePreviewProps) {
  const fullId = `${slug}-${id}`;
  const Examples = examples[fullId];

  return (
    <ThemeProvider mergeStrategy="replace">
      <Stack xl wFull overflowXAuto>
        {Examples
          ? <Examples />
          : <Text danger sm>Demo not found: {fullId}</Text>
        }
      </Stack>
    </ThemeProvider>
  );
}
