# ExtraClasses

The `extraClasses` property in VaneUI's ThemeProvider provides a flexible way to apply additional CSS classes to components throughout your application. This system allows you to inject custom styling, utility classes, or framework-specific classes while maintaining VaneUI's theming architecture.

## Understanding ExtraClasses

### extraClasses?: ThemeExtraClasses

The `extraClasses` property accepts a `ThemeExtraClasses` object that defines additional CSS classes to be applied to various component parts. These classes are merged with VaneUI's internal classes and any component-specific classes.

```typescript
interface ThemeExtraClasses {
  // Global extra classes applied to all components
  root?: string;
  
  // Component-specific extra classes
  button?: {
    root?: string;
    content?: string;
    icon?: string;
  };
  
  badge?: {
    root?: string;
    content?: string;
  };
  
  card?: {
    root?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
  
  // ... other component extra classes
}
```

## ExtraClasses Usage

### Global Extra Classes

Apply classes to all components:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function App() {
  const extraClasses = {
    root: 'transition-all duration-200 hover:scale-105'
  };

  return (
    <ThemeProvider extraClasses={extraClasses}>
      {/* All components get the transition and hover effect */}
      <Button>Animated Button</Button>
      <Badge>Animated Badge</Badge>
      <Card>Animated Card</Card>
    </ThemeProvider>
  );
}
```

### Component-Specific Classes

Target specific component types:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function ComponentSpecificClasses() {
  const extraClasses = {
    button: {
      root: 'shadow-lg hover:shadow-xl transform hover:-translate-y-1',
      content: 'font-semibold uppercase tracking-wide'
    },
    
    badge: {
      root: 'animate-pulse',
      content: 'text-xs font-bold'
    },
    
    card: {
      root: 'backdrop-blur-sm bg-opacity-90',
      header: 'border-b border-gray-200',
      body: 'p-6',
      footer: 'bg-gray-50 rounded-b-lg'
    }
  };

  return (
    <ThemeProvider extraClasses={extraClasses}>
      <div className="space-y-4">
        <Button>Enhanced Button</Button>
        <Badge>Pulsing Badge</Badge>
        <Card>
          <div className="border-b border-gray-200">Styled Card Header</div>
          <div className="p-6">Card content with padding</div>
          <div className="bg-gray-50 rounded-b-lg">Card footer</div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

## Utility Framework Integration

### Tailwind CSS Integration

Seamlessly integrate Tailwind utility classes:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function TailwindIntegration() {
  const tailwindExtraClasses = {
    // Global Tailwind utilities
    root: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
    
    button: {
      root: 'transition-colors duration-200 active:scale-95',
      content: 'select-none'
    },
    
    text: {
      root: 'leading-relaxed tracking-wide'
    },
    
    container: {
      root: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'
    }
  };

  return (
    <ThemeProvider extraClasses={tailwindExtraClasses}>
      <Container>
        <Text>Styled with Tailwind utilities</Text>
        <Button>Tailwind-enhanced button</Button>
      </Container>
    </ThemeProvider>
  );
}
```

### CSS Modules Integration

Use CSS Modules with extraClasses:

```jsx
import styles from './theme.module.css';
import { ThemeProvider } from '@vaneui/ui';

function CSSModulesIntegration() {
  const moduleExtraClasses = {
    button: {
      root: styles.customButton,
      content: styles.buttonText
    },
    
    card: {
      root: styles.glassCard,
      header: styles.cardHeader
    }
  };

  return (
    <ThemeProvider extraClasses={moduleExtraClasses}>
      <Card>
        <div className={styles.cardHeader}>CSS Module Styled Header</div>
        <Button>CSS Module Button</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Advanced ExtraClasses Patterns

### Conditional Extra Classes

Apply classes based on application state:

```jsx
import { useState } from 'react';
import { ThemeProvider } from '@vaneui/ui';

function ConditionalClasses() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  const getExtraClasses = () => {
    let classes = {
      root: 'transition-colors duration-300'
    };
    
    if (isDarkMode) {
      classes.root += ' dark:bg-gray-800 dark:text-white';
      classes.button = {
        root: 'dark:border-gray-600 dark:hover:bg-gray-700'
      };
    }
    
    if (isHighContrast) {
      classes.root += ' high-contrast';
      classes.button = {
        ...classes.button,
        root: (classes.button?.root || '') + ' border-2 font-bold'
      };
    }
    
    return classes;
  };

  return (
    <ThemeProvider extraClasses={getExtraClasses()}>
      <div>
        <Button onClick={() => setIsDarkMode(!isDarkMode)}>
          Toggle Dark Mode
        </Button>
        
        <Button onClick={() => setIsHighContrast(!isHighContrast)}>
          Toggle High Contrast
        </Button>
      </div>
    </ThemeProvider>
  );
}
```

### Responsive Extra Classes

Apply different classes based on screen size:

```jsx
import { useMediaQuery } from './hooks/useMediaQuery';
import { ThemeProvider } from '@vaneui/ui';

function ResponsiveClasses() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  const getResponsiveClasses = () => {
    const baseClasses = {
      button: {
        root: 'transition-all duration-200'
      },
      container: {
        root: 'w-full'
      }
    };
    
    if (isMobile) {
      baseClasses.button.root += ' text-sm p-2 w-full';
      baseClasses.container.root += ' px-4';
    } else if (isTablet) {
      baseClasses.button.root += ' text-base p-3';
      baseClasses.container.root += ' px-6';
    } else {
      baseClasses.button.root += ' text-lg p-4';
      baseClasses.container.root += ' px-8';
    }
    
    return baseClasses;
  };

  return (
    <ThemeProvider extraClasses={getResponsiveClasses()}>
      <Container>
        <Button>Responsive Button</Button>
      </Container>
    </ThemeProvider>
  );
}
```

### Animation and Effect Classes

Create engaging interactions with animation classes:

```jsx
import { ThemeProvider } from '@vaneui/ui';

function AnimatedComponents() {
  const animationClasses = {
    button: {
      root: `
        transform transition-all duration-200 ease-in-out
        hover:scale-105 hover:shadow-lg
        active:scale-95 active:shadow-sm
        focus:ring-4 focus:ring-blue-300
      `,
      content: 'animate-in'
    },
    
    badge: {
      root: 'animate-bounce hover:animate-pulse'
    },
    
    card: {
      root: `
        transform transition-all duration-300
        hover:shadow-2xl hover:-translate-y-2
        group
      `,
      header: 'group-hover:bg-blue-50',
      body: 'group-hover:text-gray-800'
    }
  };

  return (
    <ThemeProvider extraClasses={animationClasses}>
      <div className="space-y-6">
        <Card>
          <div className="font-semibold group-hover:bg-blue-50">Interactive Card</div>
          <div className="group-hover:text-gray-800">
            <Button>Animated Button</Button>
            <Badge>Bouncing Badge</Badge>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

## Framework-Specific Integration

### Styled Components Integration

Combine with styled-components for complex styling:

```jsx
import styled from 'styled-components';
import { ThemeProvider } from '@vaneui/ui';

const StyledWrapper = styled.div`
  .enhanced-button {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  }
`;

function StyledComponentsIntegration() {
  const styledExtraClasses = {
    button: {
      root: 'enhanced-button'
    }
  };

  return (
    <StyledWrapper>
      <ThemeProvider extraClasses={styledExtraClasses}>
        <Button>Gradient Button</Button>
      </ThemeProvider>
    </StyledWrapper>
  );
}
```

### Emotion Integration

Use Emotion's css prop with extraClasses:

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ThemeProvider } from '@vaneui/ui';

function EmotionIntegration() {
  const emotionStyles = css`
    .emotion-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 25px;
      padding: 12px 24px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
    }
  `;

  const emotionExtraClasses = {
    button: {
      root: 'emotion-button'
    }
  };

  return (
    <div css={emotionStyles}>
      <ThemeProvider extraClasses={emotionExtraClasses}>
        <Button>Emotion Styled Button</Button>
      </ThemeProvider>
    </div>
  );
}
```

## ExtraClasses Performance

### Class Name Optimization

Optimize class concatenation for performance:

```jsx
import { useMemo } from 'react';
import { ThemeProvider } from '@vaneui/ui';

function OptimizedClasses({ theme, isActive, size }) {
  const extraClasses = useMemo(() => {
    const baseButton = 'transition-colors duration-200';
    const activeClasses = isActive ? 'ring-2 ring-blue-500' : '';
    const sizeClasses = size === 'large' ? 'text-lg p-4' : 'text-sm p-2';
    
    return {
      button: {
        root: `${baseButton} ${activeClasses} ${sizeClasses}`.trim()
      }
    };
  }, [isActive, size]);

  return (
    <ThemeProvider extraClasses={extraClasses}>
      <Button>Optimized Button</Button>
    </ThemeProvider>
  );
}
```

### Dynamic Class Updates

Handle dynamic class updates efficiently:

```jsx
import { useState, useCallback } from 'react';
import { ThemeProvider } from '@vaneui/ui';

function DynamicClasses() {
  const [activeStates, setActiveStates] = useState({});
  
  const getExtraClasses = useCallback(() => ({
    button: {
      root: 'transition-all duration-200 hover:shadow-md'
    }
  }), []);

  const toggleState = (id) => {
    setActiveStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <ThemeProvider extraClasses={getExtraClasses()}>
      <Button onClick={() => toggleState('button1')}>
        Dynamic Button
      </Button>
    </ThemeProvider>
  );
}
```

## ExtraClasses Best Practices

### Consistent Naming

Use consistent class naming conventions:

```jsx
const consistentExtraClasses = {
  // Use BEM methodology
  button: {
    root: 'ui-button ui-button--enhanced',
    content: 'ui-button__content ui-button__content--bold'
  },
  
  // Or utility-first approach
  card: {
    root: 'rounded-lg shadow-md bg-white border border-gray-200',
    header: 'px-6 py-4 border-b border-gray-200',
    body: 'px-6 py-4'
  }
};
```

### Modular Organization

Organize extra classes by feature or theme:

```jsx
const baseClasses = {
  root: 'focus:outline-none focus:ring-2'
};

const animationClasses = {
  button: {
    root: 'transform transition-all duration-200 hover:scale-105'
  }
};

const accessibilityClasses = {
  root: 'focus:ring-blue-500 focus:ring-offset-2'
};

// Combine classes
const combinedClasses = {
  ...baseClasses,
  button: {
    ...animationClasses.button,
    root: `${animationClasses.button.root} ${accessibilityClasses.root}`
  }
};
```

The `extraClasses` system provides a powerful way to extend VaneUI components with custom styling while maintaining the benefits of the theming system, enabling seamless integration with any CSS framework or custom styling approach.