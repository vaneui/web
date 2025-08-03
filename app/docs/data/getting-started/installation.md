VaneUI is a modern React component library built with TypeScript and Tailwind CSS. It provides a comprehensive set of UI components with built-in theming capabilities and responsive design patterns.

## Prerequisites

Before installing VaneUI, ensure your project meets these requirements:

- **React**: Version 18.0 or higher
- **TypeScript**: Version 4.5 or higher (recommended)
- **Node.js**: Version 16.0 or higher

## Package Installation

Choose your preferred package manager to install VaneUI:

### npm

```bash
npm install @vaneui/ui
```

### yarn

```bash
yarn add @vaneui/ui
```

### pnpm

```bash
pnpm add @vaneui/ui
```

### bun

```bash
bun add @vaneui/ui
```

## CSS Setup

VaneUI requires Tailwind CSS for styling. If you don't have Tailwind CSS installed, follow these steps:

### 1. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind

Update your `tailwind.config.js` to include VaneUI paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@vaneui/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Add Tailwind Directives

Add Tailwind's base styles to your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Basic Usage

After installation, wrap your application with the ThemeProvider and start using VaneUI components:

```tsx
import React from 'react';
import { Button, ThemeProvider, Container, Stack } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider>
      <Container>
        <Stack>
          <h1>Welcome to VaneUI</h1>
          <Button primary>Get Started</Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
```

## Tree Shaking

VaneUI supports tree shaking out of the box. Import only the components you need:

```tsx
// ✅ Good - Only imports Button
import { Button } from '@vaneui/ui';

// ❌ Avoid - Imports entire library
import * as VaneUI from '@vaneui/ui';
```

## TypeScript Support

VaneUI is built with TypeScript and provides comprehensive type definitions. No additional `@types` packages are needed.

```tsx
import { ButtonProps, Button } from '@vaneui/ui';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />;
};
```

## Next Steps

- **Usage Basics**: Learn fundamental patterns and component usage
- **Theming Overview**: Understand VaneUI's theming system
- **Using ThemeProvider**: Configure themes for your application

## Troubleshooting

### Common Issues

**Styles not appearing**: Ensure VaneUI paths are included in your Tailwind config and Tailwind CSS is properly installed.

**TypeScript errors**: Make sure you're using TypeScript 4.5+ and have proper type definitions installed.

**Build errors**: Verify all peer dependencies are installed with compatible versions.