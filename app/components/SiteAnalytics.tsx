'use client';

import { Analytics } from '@vercel/analytics/next';

/** A block page shows its block in an iframe; that preview is not a page view of its own */
const PREVIEW = /^\/blocks\/[^/]+\/preview\//;

export function SiteAnalytics() {
  return <Analytics beforeSend={event => (PREVIEW.test(new URL(event.url).pathname) ? null : event)}/>;
}
