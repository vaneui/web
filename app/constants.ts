export const PRODUCT = {
  title: 'VaneUI',
  slogan: 'Deliver clean UI without complex code',
  subtitle: 'VaneUI is a React component library powered by Tailwind CSS. Designed for building beautiful and responsive user interfaces.',
  // One sentence for what VaneUI is: footer and the JSON-LD descriptions
  description: 'VaneUI is a React component library built on Tailwind CSS v4 with a boolean props API: write <Button primary lg filled> instead of variant strings.',
  githubUrl: 'https://github.com/vaneui/vaneui',
  // Contact address: footer, the JSON-LD Organization and llms.txt
  email: 'hello@vaneui.com',
  copyright: `© ${new Date().getFullYear()} VaneUI. All rights reserved.`
} as const;

/**
 * Open Graph fields every route shares. A route that sets its own `openGraph`
 * replaces the layout's object rather than merging into it, so each one spreads
 * this to keep og:site_name and og:locale.
 */
export const BASE_OPEN_GRAPH = {
  siteName: 'VaneUI',
  locale: 'en_US',
} as const;
