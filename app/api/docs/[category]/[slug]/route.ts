import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;

  // sanity guard: prevent path traversal
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

  try {
    const body = await readFile(filePath, 'utf8');
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
