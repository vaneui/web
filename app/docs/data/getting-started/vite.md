This guide sets up VaneUI in a Vite project that uses React, TypeScript and Tailwind CSS v4. It covers five pieces: the Tailwind CSS plugin, the CSS entry, ThemeProvider, an inline dark-mode script, and client-side links with React Router.

## Create a Vite app and install VaneUI

Start from the React TypeScript template, then add VaneUI and the Tailwind CSS plugin for Vite:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install @vaneui/ui
npm install -D tailwindcss @tailwindcss/vite
```

## Add the Tailwind CSS plugin to the Vite config

Add `tailwindcss()` to the `plugins` array in `vite.config.ts`:

```ts
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Import the VaneUI styles in the CSS entry

Replace the contents of `src/index.css`, the stylesheet `src/main.tsx` imports:

```css
@import "tailwindcss";
@import "@vaneui/ui/tokens";
@import "@vaneui/ui/vars";
@source "../node_modules/@vaneui/ui";
```

The `@source` line lets Tailwind find the classes VaneUI components use, and its path is relative to the CSS file. The `tokens` import registers the `mobile`, `tablet` and `desktop` breakpoints. Without it, responsive props such as `mobileStack` produce no CSS. The template's `src/App.css` is not needed anymore: delete it together with the line that imports it.

### The prebuilt stylesheet as the only CSS

A project without Tailwind CSS skips the plugin and puts one line in `src/index.css`:

```css
@import "@vaneui/ui/css";
```

[Installation](/docs/getting-started/installation) compares the two setups.

## Wrap the app in ThemeProvider

Render `ThemeProvider` around the app in `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@vaneui/ui'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

A Vite app renders in the browser only, so `themeDefaults`, `extraClasses` and `themeOverride` can all be passed here. Then replace `src/App.tsx` with a first screen:

```tsx
import { Button, Card, Container, Row, Section, Text, Title } from '@vaneui/ui'

export default function App() {
  return (
    <Container>
      <Section>
        <Card>
          <Title>VaneUI on Vite</Title>
          <Text>Boolean props set the size, color and layout.</Text>
          <Row mobileStack>
            <Button filled>Save</Button>
            <Button secondary>Cancel</Button>
          </Row>
        </Card>
      </Section>
    </Container>
  )
}
```

`npm run dev` shows a bordered card with two buttons. Below 768px the buttons stack, which confirms that the `tokens` import is in place.

## Dark mode without a flash

VaneUI switches to dark colors when `<html>` has `data-theme="dark"`. A Vite app has no server render, so set the attribute with a script in the `<head>` of `index.html`. It runs before the first paint:

```html
<script>
  try {
    var theme = localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
</script>
```

To switch themes, a toggle sets `document.documentElement.dataset.theme` and saves the choice to `localStorage` under `theme`, the key the script reads. [Dark Mode](/docs/customization/dark-mode) covers the color tokens.

## Client-side links with React Router

Button, Card and NavLink render an `<a>` when you pass `href`, and the `tag` prop swaps that element for a router link. React Router's `Link` takes `to` where VaneUI passes `href`, so wrap it once after `npm install react-router`:

```tsx
// src/RouterLink.tsx
import { forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router'

type RouterLinkProps = Omit<LinkProps, 'to'> & { href: string }

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, ...props }, ref) => <Link ref={ref} to={href} {...props} />,
)
```

Pass the wrapper as `tag`. The component keeps its VaneUI styling and navigates without a page load:

```tsx
import { useLocation } from 'react-router'
import { Button, NavLink } from '@vaneui/ui'
import { RouterLink } from './RouterLink'

export function Nav() {
  const { pathname } = useLocation()

  return (
    <>
      <NavLink href="/profile" tag={RouterLink} active={pathname === '/profile'}>
        Profile
      </NavLink>
      <Button href="/settings" tag={RouterLink}>Settings</Button>
    </>
  )
}
```

`active` marks the current page on a NavLink and sets `aria-current="page"`.
