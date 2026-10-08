import { prepareIndex, type PreparedIndex } from '../../../lib/search/query';
import type { SearchIndex } from '../../../lib/search/types';

let pending: Promise<PreparedIndex> | null = null;

/** Fetch and prepare the index once per page load; a failed fetch is retried on the next call */
export function loadSearchIndex(): Promise<PreparedIndex> {
  pending ??= fetch('/search-index.json')
    .then((res) => {
      if (!res.ok) throw new Error(`Search index request failed with ${res.status}`);
      return res.json() as Promise<SearchIndex>;
    })
    .then(prepareIndex)
    .catch((error: unknown) => {
      pending = null;
      throw error;
    });
  return pending;
}
