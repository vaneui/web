VaneUI is a React component library built with TypeScript and Tailwind CSS.

## How to install VaneUI

Install VaneUI using your preferred package manager:

```bash
npm install @vaneui/ui
```

```bash
yarn add @vaneui/ui
```

```bash
pnpm add @vaneui/ui
```

## Setup

VaneUI requires Tailwind CSS. Install it if you haven't already:

```bash
npm install -D tailwindcss
```

Add Tailwind directives to your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Getting Started

Start using VaneUI components:

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