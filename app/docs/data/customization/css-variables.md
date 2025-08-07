# CSS Variables

VaneUI provides a comprehensive set of CSS custom properties (variables) that allow you to customize the appearance of components directly through CSS. This approach offers fine-grained control over styling and enables easy theme customization.

## Available CSS Variables

VaneUI exposes numerous CSS variables organized by purpose and component type. All variables are defined in the `:root` scope and can be overridden in your stylesheets.

### Text Colors

Control the text colors used throughout VaneUI components:

```css
:root {
  --text-color-default: #111827;
  --text-color-primary: #2563eb;
  --text-color-secondary: #4b5563;
  --text-color-tertiary: #6b7280;
  --text-color-link: #2563eb;
  --text-color-accent: #9333ea;
  --text-color-success: #059669;
  --text-color-danger: #dc2626;
  --text-color-warning: #d97706;
  --text-color-info: #0891b2;
}
```

### Background Colors

Customize background colors for different component states:

```css
:root {
  /* Base backgrounds */
  --background-color-default: #ffffff;
  --background-color-primary: #eff6ff;
  --background-color-secondary: #f9fafb;
  --background-color-tertiary: #f3f4f6;
  
  /* Semantic backgrounds */
  --background-color-accent: #faf5ff;
  --background-color-success: #ecfdf5;
  --background-color-danger: #fef2f2;
  --background-color-warning: #fffbeb;
  --background-color-info: #ecfeff;
}
```

### Interactive States

Define colors for hover and active states:

```css
:root {
  /* Hover states */
  --background-color-hover-default: #f3f4f6;
  --background-color-hover-primary: #dbeafe;
  --background-color-hover-secondary: #f3f4f6;
  
  /* Active states */
  --background-color-active-default: #e5e7eb;
  --background-color-active-primary: #bfdbfe;
  --background-color-active-secondary: #e5e7eb;
}
```

### Filled Button Colors

Customize solid/filled button appearances:

```css
:root {
  /* Filled backgrounds */
  --filled-background-color-default: #1f2937;
  --filled-background-color-primary: #2563eb;
  --filled-background-color-secondary: #4b5563;
  --filled-background-color-success: #059669;
  --filled-background-color-danger: #dc2626;
  
  /* Filled hover states */
  --filled-background-color-hover-primary: #1d4ed8;
  --filled-background-color-hover-success: #047857;
  --filled-background-color-hover-danger: #b91c1c;
}
```

### Border Colors

Control border appearances across components:

```css
:root {
  --border-color-default: #d1d5db;
  --border-color-primary: #93c5fd;
  --border-color-secondary: #d1d5db;
  --border-color-success: #6ee7b7;
  --border-color-danger: #fca5a5;
  --border-color-warning: #fcd34d;
  --border-color-info: #67e8f9;
}
```

### Border Radius

Customize the roundedness of components:

```css
:root {
  /* UI component border radius */
  --ui-border-radius-xs: 0.125rem;
  --ui-border-radius-sm: 0.25rem;
  --ui-border-radius-md: 0.375rem;
  --ui-border-radius-lg: 0.5rem;
  --ui-border-radius-xl: 0.625rem;
  
  /* Layout component border radius */
  --layout-border-radius-xs: 0.375rem;
  --layout-border-radius-sm: 0.5rem;
  --layout-border-radius-md: 0.625rem;
  --layout-border-radius-lg: 0.75rem;
  --layout-border-radius-xl: 0.875rem;
}
```

## Using CSS Variables

### Global Customization

Override variables in your global CSS to customize all VaneUI components:

```css
/* styles/globals.css */
:root {
  --text-color-primary: #8b5cf6;
  --background-color-primary: #f3e8ff;
  --border-color-primary: #c4b5fd;
  --ui-border-radius-md: 0.75rem;
}
```

### Component-Specific Customization

Target specific components or sections:

```css
.my-custom-section {
  --text-color-primary: #059669;
  --background-color-primary: #ecfdf5;
  --border-color-primary: #6ee7b7;
}
```

### Dark Mode Support

Create dark mode variations by overriding variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-color-default: #f9fafb;
    --text-color-secondary: #d1d5db;
    --background-color-default: #111827;
    --background-color-secondary: #1f2937;
    --border-color-default: #374151;
  }
}
```

### CSS-in-JS Integration

Use CSS variables with styled-components or emotion:

```jsx
import styled from 'styled-components';

const CustomButton = styled.button`
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
  border: 1px solid var(--border-color-primary);
  border-radius: var(--ui-border-radius-md);
  
  &:hover {
    background-color: var(--background-color-hover-primary);
  }
`;
```

## Best Practices

### Variable Naming Convention

VaneUI uses a consistent naming pattern:
- `--{category}-{property}-{variant}[-{state}]`
- Examples: `--text-color-primary`, `--background-color-hover-success`

### Fallback Values

Variables include fallback values for better browser support:

```css
--text-color-primary: var(--color-blue-600, #2563eb);
```

### Semantic Usage

Use semantic color variables rather than specific color values:

```css
/* Good */
color: var(--text-color-success);

/* Avoid */
color: var(--color-green-600);
```

### Testing Customizations

Always test your customizations across different components to ensure consistency:

```css
/* Test with multiple components */
.test-theme {
  --text-color-primary: #custom-color;
}

/* Apply to various VaneUI components */
.test-theme .vui-button,
.test-theme .vui-badge,
.test-theme .vui-link {
  /* Will inherit the custom primary color */
}
```

## Advanced Techniques

### Dynamic Theming

Create dynamic themes using JavaScript:

```javascript
function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(`--${property}`, value);
  });
}

const blueTheme = {
  'text-color-primary': '#2563eb',
  'background-color-primary': '#eff6ff',
  'border-color-primary': '#93c5fd'
};

applyTheme(blueTheme);
```

### Component Inheritance

Variables cascade through the component hierarchy:

```css
.page-section {
  --text-color-primary: #8b5cf6;
}

/* All VaneUI components within .page-section will use the purple primary color */
```

CSS variables provide the most flexible approach to customizing VaneUI components, offering both global and granular control over the design system.