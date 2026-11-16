import React from 'react';
import { serializeJsonLd, type JsonLdGraph } from '../../lib/seo/structuredData';

/**
 * Renders a page's Schema.org graph (built in lib/seo/structuredData.ts) as a JSON-LD script
 * tag. Server-rendered, so search engines and AI crawlers read it without running JavaScript.
 */
export function JsonLd({ data }: { data: JsonLdGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
