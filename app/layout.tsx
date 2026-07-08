import { Plus_Jakarta_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import ThemeWrapper from "./themeWrapper";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import { JsonLd, WEBSITE_SCHEMA, SOFTWARE_SCHEMA } from "./components/JsonLd"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif-display',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const SITE_TITLE = 'VaneUI - Deliver clean UI without complex code';
const SITE_DESCRIPTION = 'VaneUI is a React component library powered by Tailwind CSS. Designed for building beautiful and responsive user interfaces.';

// Vercel preview deployments should not be indexed; production is fine.
// Falls back to allowing indexation everywhere else (self-host, local
// preview via `next start`).
const shouldNoIndex = process.env.VERCEL_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL('https://vaneui.com'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'VaneUI',
  keywords: ['react', 'ui', 'components', 'tailwind', 'tailwindcss', 'typescript', 'vaneui', 'design system', 'headless'],
  authors: [{ name: 'VaneUI' }],
  creator: 'VaneUI',
  publisher: 'VaneUI',
  ...(shouldNoIndex
    ? { robots: { index: false, follow: false } }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'VaneUI',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'VaneUI - React component library powered by Tailwind CSS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-default.png'],
  },
  // NOTE: no `alternates.canonical` here. A static canonical on the root layout
  // is inherited by every page that does not override `alternates`, which would
  // point non-overriding routes (e.g. /docs) at the homepage. Each page sets its
  // own self-referential canonical instead.
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"/>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <script src="https://analytics.ahrefs.com/analytics.js" data-key="+JtunyPZi10uLSHXMP+3ug" async></script>
    </head>
    <body className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} ${jetBrainsMono.variable} font-sans min-w-xs`}>
    <JsonLd data={WEBSITE_SCHEMA} />
    <JsonLd data={SOFTWARE_SCHEMA} />
    <ThemeWrapper>
      {children}
    </ThemeWrapper>
    <Analytics />
    </body>
    </html>
  );
}
