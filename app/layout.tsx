import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import ThemeWrapper from "./themeWrapper";
import { Metadata } from "next";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'VaneUI - Deliver clean UI without complex code',
  description: 'VaneUI is a React component library powered by Tailwind CSS. Designed for building beautiful and responsive user interfaces.',
};

export default function RootLayout({
                                     children,
                                   }: {
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
    <body className={`${inter.className} ${jetBrainsMono.variable}`}>
    <ThemeWrapper>
      {children}
    </ThemeWrapper>
    </body>
    </html>
  );
}
