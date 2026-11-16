// Tells Bing and the other IndexNow engines which vaneui.com pages changed, after each production
// deploy (.github/workflows/indexnow.yml). It compares the live sitemap with the copy saved by the
// previous run and submits only new pages, pages whose <lastmod> changed and removed pages, as
// IndexNow asks: resubmitting unchanged pages on every deploy only dilutes the signal.
//
//   node scripts/indexnow.mjs [--all]
//
// Environment: HOST (vaneui.com), KEY (the IndexNow key, also served at https://HOST/KEY.txt),
// STATE (file holding the previous run's sitemap, read when present and written after a
// successful submission). SITEMAP_URL and INDEXNOW_ENDPOINT override where the sitemap is read
// and where URLs are sent (the tests point both at a local server). --all submits every sitemap page. With no saved state (the first run,
// or the cache expired) every page is submitted too.
//
// Best effort, like a deploy hook should be: a failed fetch or a non-2xx answer prints a GitHub
// warning and exits 0 without saving the state, so the next run submits the same changes again.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
/** IndexNow accepts at most 10,000 URLs per request */
const MAX_URLS = 10_000;

/** Decodes the five XML entities a sitemap may use in a URL */
function decodeXml(text) {
  return text
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * The pages of a sitemap with their <lastmod> ('' when the entry has none).
 * @param {string} xml
 * @returns {Map<string, string>}
 */
export function parseSitemap(xml) {
  const pages = new Map();
  for (const [, entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>\s*([^<]*?)\s*<\/loc>/.exec(entry)?.[1];
    if (!loc) continue;
    const lastmod = /<lastmod>\s*([^<]*?)\s*<\/lastmod>/.exec(entry)?.[1] ?? '';
    pages.set(decodeXml(loc), lastmod);
  }
  return pages;
}

/**
 * The saved state: one page per line, its URL and <lastmod> separated by a tab.
 * @param {Map<string, string>} pages
 */
export function formatState(pages) {
  return [...pages].sort(([a], [b]) => a.localeCompare(b)).map(([url, lastmod]) => `${url}\t${lastmod}\n`).join('');
}

/** @param {string} text */
export function parseState(text) {
  const pages = new Map();
  for (const line of text.split('\n')) {
    if (!line) continue;
    const tab = line.indexOf('\t');
    if (tab === -1) pages.set(line, '');
    else pages.set(line.slice(0, tab), line.slice(tab + 1));
  }
  return pages;
}

/**
 * What to submit. With no previous state, every page is new.
 * @param {Map<string, string> | null} previous
 * @param {Map<string, string>} current
 */
export function diffPages(previous, current) {
  const added = [];
  const changed = [];
  const removed = [];
  for (const [url, lastmod] of current) {
    if (!previous?.has(url)) added.push(url);
    else if (previous.get(url) !== lastmod) changed.push(url);
  }
  if (previous) for (const url of previous.keys()) if (!current.has(url)) removed.push(url);
  return { added, changed, removed };
}

/**
 * The IndexNow request body. Every URL must be on the host.
 * @param {{ host: string, key: string, urls: string[] }} args
 */
export function payload({ host, key, urls }) {
  const origin = `https://${host}`;
  const foreign = urls.filter((url) => url !== origin && !url.startsWith(`${origin}/`));
  if (foreign.length) throw new Error(`URLs outside ${origin}: ${foreign.join(', ')}`);
  return { host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls.slice(0, MAX_URLS) };
}

const warn = (message) => console.log(`::warning::${message}`);

/** @param {string} statePath @param {Map<string, string>} pages */
function saveState(statePath, pages) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, formatState(pages));
}

async function main() {
  const { HOST: host, KEY: key, STATE: statePath } = process.env;
  if (!host || !key || !statePath) throw new Error('HOST, KEY and STATE must be set');
  const all = process.argv.includes('--all');
  const sitemapUrl = process.env.SITEMAP_URL || `https://${host}/sitemap.xml`;
  const endpoint = process.env.INDEXNOW_ENDPOINT || ENDPOINT;

  let current;
  try {
    const response = await fetch(sitemapUrl, { signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    current = parseSitemap(await response.text());
  } catch (error) {
    warn(`Could not read ${sitemapUrl}: ${error.message}`);
    return;
  }
  if (current.size === 0) {
    warn(`No URLs in ${sitemapUrl}`);
    return;
  }

  const previous = !all && fs.existsSync(statePath) ? parseState(fs.readFileSync(statePath, 'utf8')) : null;
  const { added, changed, removed } = diffPages(previous, current);
  console.log(previous
    ? `Since the last submission: ${added.length} new, ${changed.length} changed, ${removed.length} removed`
    : `${all ? 'Submitting every page (--all)' : 'No saved state'}: ${added.length} pages`);
  for (const url of added) console.log(`  new      ${url}`);
  for (const url of changed) console.log(`  changed  ${url}`);
  for (const url of removed) console.log(`  removed  ${url}`);

  const urls = [...added, ...changed, ...removed];
  if (urls.length === 0) {
    console.log('Nothing to submit');
    saveState(statePath, current);
    return;
  }

  let status = 0;
  let body = '';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload({ host, key, urls })),
      signal: AbortSignal.timeout(30_000),
    });
    status = response.status;
    body = (await response.text()).slice(0, 300);
  } catch (error) {
    warn(`IndexNow request failed: ${error.message}`);
    return;
  }
  // 200: submitted. 202: accepted while the key file is checked.
  console.log(`IndexNow answered HTTP ${status}`);
  if (status < 200 || status > 299) {
    warn(`IndexNow answered HTTP ${status}: ${body}`);
    return;
  }
  saveState(statePath, current);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    warn(error.message);
  });
}
