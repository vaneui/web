VaneUI is a React component library built with TypeScript and Tailwind CSS. Install using your preferred package manager:

```bash
npm install @vaneui/ui
```

```bash
yarn add @vaneui/ui
```

```bash
pnpm add @vaneui/ui
```

## CSS Setup

VaneUI supports two CSS setup options depending on your project configuration.

### Option 1: With Tailwind CSS (Recommended)

If your project uses Tailwind CSS v4, VaneUI integrates seamlessly. Tailwind will scan VaneUI components and generate only the CSS classes you use.

Install Tailwind CSS if you haven't already:

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

Add the following to your main CSS file:

```css
@import "tailwindcss";
@import "@vaneui/ui/tokens";
@import "@vaneui/ui/vars";
@source "../node_modules/@vaneui/ui";
```

This setup:
- Imports Tailwind CSS base styles
- Imports VaneUI theme tokens (registers custom breakpoints and design tokens with Tailwind)
- Imports VaneUI CSS variables and component rules
- Tells Tailwind to scan VaneUI components for class generation

> The `@vaneui/ui/tokens` import is required for responsive props like `mobileCol`, `tabletHide`, and responsive typography to work. It registers VaneUI's custom breakpoints (`mobile`, `tablet`, `desktop`) with your project's Tailwind CSS instance.

### Option 2: Without Tailwind CSS

If your project doesn't use Tailwind CSS, you can import VaneUI's pre-built CSS bundle which includes all component styles.

Add the following to your main CSS file:

```css
@import "@vaneui/ui/css";
@import "@vaneui/ui/vars.css";
```

This setup:
- Imports the complete pre-built VaneUI stylesheet
- Imports VaneUI CSS variables for theming
- Works without any Tailwind configuration

## Usage

Start using VaneUI components in your React application:

```tsx
import { Button, Stack } from '@vaneui/ui';

function App() {
  return (
    <Stack>
      <Button primary>Get Started</Button>
    </Stack>
  );
}
```

## Per-Component Imports

For better tree-shaking, you can import components directly:

```tsx
import { Button } from '@vaneui/ui/button';
import { Card } from '@vaneui/ui/card';
import { ThemeProvider } from '@vaneui/ui/theme';
```

This is optional — importing from `@vaneui/ui` works the same way. Per-component imports can reduce bundle size when using only a few components with bundlers that don't fully tree-shake barrel exports.

Available subpath imports: `@vaneui/ui/button`, `@vaneui/ui/badge`, `@vaneui/ui/card`, `@vaneui/ui/checkbox`, `@vaneui/ui/chip`, `@vaneui/ui/code`, `@vaneui/ui/divider`, `@vaneui/ui/img`, `@vaneui/ui/input`, `@vaneui/ui/label`, `@vaneui/ui/modal`, `@vaneui/ui/overlay`, `@vaneui/ui/popup`, `@vaneui/ui/layout`, `@vaneui/ui/typography`, `@vaneui/ui/theme`, `@vaneui/ui/props`.
