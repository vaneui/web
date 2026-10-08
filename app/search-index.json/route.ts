import { buildSearchIndex } from '../../lib/search/buildIndex';

// Built once at build time from the docs markdown; the search dialog fetches it on first use
export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildSearchIndex(process.cwd()));
}
