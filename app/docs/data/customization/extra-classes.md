The  property in VaneUI's ThemeProvider allows you to add additional CSS classes to components based on which boolean props are active. This enables custom styling, animations, and effects while maintaining VaneUI's theming architecture.

## Understanding ExtraClasses

### extraClasses?: ThemeExtraClasses

The  property accepts an object where keys are component names, and values are objects mapping boolean prop names to CSS class strings. When a prop is active, its associated classes are added.

\
## Basic Usage

### Adding Classes Based on Props

Apply extra classes when specific boolean props are active:

\
### Size-Based Classes

Add classes based on size props:

\
## Animation and Effects

### Hover and Transition Effects

Create engaging interactions with animation classes:

\
### Attention-Grabbing Effects

Draw attention to important elements:

\
## Combining Multiple Props

When multiple props are active, all their associated classes are combined:

\
## Conditional Extra Classes

### Dynamic Class Application

Apply classes based on application state:

\
## Performance Optimization

### Memoized Extra Classes

Optimize class computation for performance:

\
## Best Practices

### Consistent Naming

Use consistent class patterns:

\
### Avoid Conflicting Classes

Be careful not to add classes that conflict with VaneUI's base styles:

\
The  system provides a powerful way to extend VaneUI components with custom styling based on active props, enabling seamless integration with any CSS framework while maintaining the benefits of the theming system.
