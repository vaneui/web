'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';

/** A block page shows its block in an iframe; that preview is not a page view of its own */
const PREVIEW = /^\/blocks\/[^/]+\/preview\//;

export function SiteAnalytics() {
  const pathname = usePathname();
  return (
    <>
      <Analytics beforeSend={event => (PREVIEW.test(new URL(event.url).pathname) ? null : event)}/>
      {/* The preview frames are not page views, so they do not load Ahrefs either */}
      {!PREVIEW.test(pathname ?? '') && (
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="+JtunyPZi10uLSHXMP+3ug" strategy="afterInteractive"/>
      )}
    </>
  );
}
