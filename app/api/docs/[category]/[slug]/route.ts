import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { expandDocIncludes } from '../../../../../lib/docs/includes.mjs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;

  // sanity guard: prevent path traversal. It also keeps partials (`_`-prefixed
  // files and directories, see lib/docs/includes.mjs) from being served as pages.
  if (!/^[a-z0-9-]+$/i.test(category) || !/^[a-z0-9-]+$/i.test(slug)) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    'app',
    'docs',
    'data',
    category,
    `${slug}.md`
  );

  // Read here, not in the helper: file tracing follows this literal path and
  // ships every .md under app/docs/data with the function, partials included.
  let source: string;
  try {
    source = await readFile(filePath, 'utf8');
  } catch {
    return new Response('Not found', { status: 404 });
  }

  // Same expanded text the page renders. A broken include throws (500) rather
  // than serving the tag; the page build fails on it first.
  return new Response(expandDocIncludes(source, filePath), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
