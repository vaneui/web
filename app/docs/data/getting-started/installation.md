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
@import "@vaneui/ui/vars.css";
@source "@vaneui/ui";
```

This setup:
- Imports Tailwind CSS base styles
- Imports VaneUI CSS variables for theming
- Tells Tailwind to scan VaneUI components for class generation

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
