This guide sets up VaneUI in a Next.js project that uses the App Router and Tailwind CSS v4. It covers four pieces: the CSS entry, the root layout, an optional client wrapper for theme functions, and an inline dark-mode script.

## Create a Next.js app with Tailwind CSS

Start from a Next.js app with Tailwind CSS, then add VaneUI:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm install @vaneui/ui
```

For an existing app without Tailwind CSS, install it with `npm install -D tailwindcss @tailwindcss/postcss` and add `"@tailwindcss/postcss": {}` to the plugins in `postcss.config.mjs`.

## Import the VaneUI styles

Replace the contents of `app/globals.css`:

```css
@import "tailwindcss";
@import "@vaneui/ui/tokens";
@import "@vaneui/ui/vars";
@source "../node_modules/@vaneui/ui";
```

The `@source` line lets Tailwind find the classes VaneUI components use. See [Installation](/docs/getting-started/installation) for the prebuilt stylesheet if you don't use Tailwind CSS.

## Wrap the root layout in ThemeProvider

VaneUI components ship with the `'use client'` directive, so a Server Component such as the root layout can render them directly:

```tsx
// app/layout.tsx
import { ThemeProvider } from '@vaneui/ui';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

`themeDefaults` and `extraClasses` take plain objects, so the layout can pass them too. `themeOverride` takes a function, and a Server Component can't pass a function to a client component. Put it in a client wrapper, then render `AppThemeProvider` in the layout instead of `ThemeProvider`:

```tsx
// app/theme-provider.tsx
'use client';

import { ThemeProvider, type ThemeProps } from '@vaneui/ui';

const override = (theme: ThemeProps) => theme;

export function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider themeOverride={override}>{children}</ThemeProvider>;
}
```

## Dark mode without a flash

VaneUI switches to dark colors when `<html>` has `data-theme="dark"`. Set it before the page paints with a script in the root layout's `<head>`, so a dark-mode visitor never sees a white flash:

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}`,
    }}
  />
</head>
```

`suppressHydrationWarning` on `<html>` stops React from warning about the attribute the script adds. To switch themes, a toggle sets `document.documentElement.dataset.theme` and saves the choice to `localStorage` under `theme`, the key the script reads. [Dark Mode](/docs/customization/dark-mode) covers the color tokens.

## Client-side links with `next/link`

Button, Card, NavLink and Badge render an `<a>` when you pass `href`. Pass `tag={Link}` to route them through Next.js:

```tsx
import Link from 'next/link';
import { Button } from '@vaneui/ui';

<Button href="/docs" tag={Link}>Documentation</Button>
```
