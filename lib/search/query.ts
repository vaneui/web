/**
 * Client-side docs search over the build-time index: every query word must match the page name,
 * a heading or the text; matches in names and headings outrank matches in body text.
 */

import type { SearchEntry, SearchIndex, SearchSection } from './types';

/** A run of display text; `hit` marks the part that matched the query */
export interface Segment {
  text: string;
  hit: boolean;
}

export interface SearchHit {
  entry: SearchEntry;
  score: number;
  /** The heading (or the page name, for the page itself) with matches marked */
  title: Segment[];
  /** A short excerpt around the first match in the text */
  snippet: Segment[];
}

export interface SearchGroup {
  section: SearchSection;
  hits: SearchHit[];
}

interface Field {
  folded: string;
  words: Set<string>;
  /** camelCase parts of identifiers (`IconButton`: icon, button); they match like a prefix, not a whole word */
  parts: Set<string>;
}

interface Prepared {
  entry: SearchEntry;
  page: Field;
  heading: Field;
  trail: Field;
  text: Field;
  /** Page name and heading with spaces and punctuation removed, for whole-query matches */
  pageKey: string;
  headingKey: string;
}

export interface PreparedIndex {
  sections: SearchSection[];
  entries: Prepared[];
}

/** Lowercase without accents, one output character per input character so positions line up */
export function fold(s: string): string {
  let out = '';
  for (const c of s) {
    // Astral characters (two UTF-16 units) pass through unchanged, which keeps the length
    out += c.length === 1 ? (c.normalize('NFD')[0].toLowerCase()[0] ?? c) : c;
  }
  return out;
}

function field(s: string): Field {
  const words = new Set<string>();
  const parts = new Set<string>();
  for (const token of s.split(/[^A-Za-z0-9\u00C0-\u024F]+/)) {
    if (!token) continue;
    words.add(fold(token));
    const split = token.split(/(?<=[a-z0-9])(?=[A-Z])/);
    if (split.length > 1) split.forEach((p) => parts.add(fold(p)));
  }
  return { folded: fold(s), words, parts };
}

const compact = (s: string) => fold(s).replace(/[^a-z0-9]+/g, '');

export function prepareIndex(index: SearchIndex): PreparedIndex {
  return {
    sections: index.sections,
    entries: index.entries.map((entry) => {
      const heading = entry.path[entry.path.length - 1] ?? '';
      return {
        entry,
        page: field(entry.page),
        heading: field(heading),
        trail: field(entry.path.slice(0, -1).join(' ')),
        text: field(entry.text),
        pageKey: compact(entry.page),
        headingKey: compact(heading),
      };
    }),
  };
}

/** Query words, folded; punctuation separates words */
export function queryTerms(query: string): string[] {
  return [...new Set(fold(query).split(/[^a-z0-9\u00C0-\u024F]+/).filter(Boolean))];
}

/** 3 for a whole word, 2 for a word prefix or a camelCase part, 1 for anywhere inside a word, 0 for no match */
function matchStrength(term: string, f: Field): number {
  if (f.words.has(term)) return 3;
  for (const w of f.words) if (w.startsWith(term)) return 2;
  for (const p of f.parts) if (p.startsWith(term)) return 2;
  // Inside a word only for terms long enough not to match everywhere
  return term.length >= 3 && f.folded.includes(term) ? 1 : 0;
}

// Points for a whole word, a prefix and an inner match, per field
const PAGE = [0, 3, 8, 12];
const HEADING = [0, 2, 7, 10];
const TRAIL = [0, 1, 3, 5];
const TEXT = [0, 0.4, 1.2, 2];

function score(p: Prepared, terms: string[], key: string): number {
  const isPage = p.entry.path.length === 0;
  // A heading entry shares its page's name; the page itself should rank above its headings on that match
  const pageWeight = isPage ? 1 : 0.5;
  let total = 0;
  for (const term of terms) {
    const best = Math.max(
      PAGE[matchStrength(term, p.page)] * pageWeight,
      HEADING[matchStrength(term, p.heading)],
      TRAIL[matchStrength(term, p.trail)],
      TEXT[matchStrength(term, p.text)],
    );
    if (best === 0) return 0;
    total += best;
  }
  if (isPage && key === p.pageKey) total += 20;
  else if (!isPage && key === p.headingKey) total += 8;
  return total * (p.entry.weight ?? 1);
}

/** Positions where a term starts a word in `folded` (or starts a camelCase part in the original) */
function hitRanges(original: string, terms: string[]): Array<[number, number]> {
  const folded = fold(original);
  const ranges: Array<[number, number]> = [];
  for (const term of terms) {
    let from = 0;
    for (;;) {
      const at = folded.indexOf(term, from);
      if (at === -1) break;
      const prev = original[at - 1];
      const wordStart = at === 0 || !/[A-Za-z0-9]/.test(prev) || (/[a-z0-9]/.test(prev) && /[A-Z]/.test(original[at]));
      if (wordStart) ranges.push([at, at + term.length]);
      from = at + 1;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  return merged;
}

/** Split text into segments with the query matches marked */
export function highlight(text: string, terms: string[]): Segment[] {
  const segments: Segment[] = [];
  let pos = 0;
  for (const [start, end] of hitRanges(text, terms)) {
    if (start > pos) segments.push({ text: text.slice(pos, start), hit: false });
    segments.push({ text: text.slice(start, end), hit: true });
    pos = end;
  }
  if (pos < text.length) segments.push({ text: text.slice(pos), hit: false });
  return segments;
}

const SNIPPET_LENGTH = 140;
const SNIPPET_LEAD = 40;

/** About 140 characters of text around the first match, cut at word boundaries */
export function snippet(text: string, terms: string[]): Segment[] {
  if (text.length <= SNIPPET_LENGTH) return highlight(text, terms);
  const first = hitRanges(text, terms)[0];
  let start = first ? Math.max(0, first[0] - SNIPPET_LEAD) : 0;
  if (start > 0) {
    const space = text.indexOf(' ', start);
    start = space === -1 || space > (first?.[0] ?? start) ? start : space + 1;
  }
  let end = Math.min(text.length, start + SNIPPET_LENGTH);
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end);
    if (space > start) end = space;
  }
  const segments = highlight(text.slice(start, end), terms);
  if (start > 0) segments.unshift({ text: '…', hit: false });
  if (end < text.length) segments.push({ text: '…', hit: false });
  return segments;
}

export function displayTitle(entry: SearchEntry): string {
  return entry.path[entry.path.length - 1] ?? entry.page;
}

export interface SearchOptions {
  /** Most hits returned */
  limit?: number;
  /** Most hits from one page, so a page with many matching headings doesn't fill the list */
  perPage?: number;
}

export function search(index: PreparedIndex, query: string, { limit = 30, perPage = 4 }: SearchOptions = {}): SearchHit[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];
  const key = terms.join('');

  const scored = index.entries
    .map((p, order) => ({ p, order, score: score(p, terms, key) }))
    .filter((s) => s.score > 0)
    // Ties keep the sidebar order: pages before their own headings, headings top to bottom
    .sort((a, b) => b.score - a.score || a.order - b.order);

  const perPageCount = new Map<string, number>();
  const hits: SearchHit[] = [];
  for (const { p, score } of scored) {
    const pageUrl = p.entry.url.split('#')[0];
    const count = perPageCount.get(pageUrl) ?? 0;
    if (count >= perPage) continue;
    perPageCount.set(pageUrl, count + 1);
    hits.push({
      entry: p.entry,
      score,
      title: highlight(displayTitle(p.entry), terms),
      snippet: snippet(p.entry.text, terms),
    });
    if (hits.length >= limit) break;
  }
  return hits;
}

/** Hits grouped by docs category; groups ordered by their best hit, hits keep their rank inside a group */
export function groupHits(hits: SearchHit[], sections: SearchSection[]): SearchGroup[] {
  const groups = new Map<number, SearchGroup>();
  for (const hit of hits) {
    const group = groups.get(hit.entry.section) ?? { section: sections[hit.entry.section], hits: [] };
    group.hits.push(hit);
    groups.set(hit.entry.section, group);
  }
  return [...groups.values()];
}
