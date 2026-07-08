The `themeOverride` property allows programmatic modifications to component themes. Use it to add base classes or change defaults for any subtree of your application.

## Basic usage

### Modifying base classes

Add CSS classes that apply to all instances of a component:

```tsx
<ThemeProvider themeOverride={(theme) => {
  // Compound themes are nested by sub-part — Button is `button.main`,
  // Card is `card.main`. Single-target themes (Badge, Chip, etc.) sit at the top level.
  theme.button.main.base += ' uppercase tracking-wide';
  theme.card.main.base += ' shadow-sm';
  return theme;
}}>
  <Button primary>Uppercase Button</Button>
  <Card>Card with Shadow</Card>
</ThemeProvider>
```

### Modifying default props

Change the default boolean props for components:

```tsx demo
<ThemeProvider themeOverride={(theme) => {
  theme.button.main.defaults = {
    ...theme.button.main.defaults,
    filled: true,
    pill: true,
  };
  return theme;
}}>
  <Button primary>Filled Pill Button</Button>
</ThemeProvider>
```

Note: For changing defaults, prefer using `themeDefaults` instead. It uses fewer pieces and the public `ThemeDefaults` type:

```tsx
// Preferred approach for defaults
<ThemeProvider themeDefaults={{
  button: { main: { filled: true, pill: true } }
}}>
```

## Combining with other props

Use `themeOverride` alongside `themeDefaults` and `extraClasses`:

```tsx
<ThemeProvider
  themeDefaults={{ button: { main: { filled: true } } }}
  themeOverride={(theme) => {
    theme.button.main.base += ' tracking-wide';
    return theme;
  }}
  extraClasses={{
    button: { main: { primary: 'hover:shadow-lg' } }
  }}
>
  <Button>Fully Customized</Button>
</ThemeProvider>
```

## Nested ThemeProviders

Child overrides build on parent modifications:

```tsx
<ThemeProvider themeOverride={(theme) => {
  theme.button.main.base += ' uppercase';
  return theme;
}}>
  <Button>Uppercase</Button>

  <ThemeProvider themeOverride={(theme) => {
    theme.button.main.base += ' tracking-widest';
    return theme;
  }}>
    <Button>Uppercase + Wide Tracking</Button>
  </ThemeProvider>
</ThemeProvider>
```

## When to use themeOverride

- **Use `themeOverride`** when you need to add base CSS classes to all component instances
- **Use `themeDefaults`** when you want to change default boolean props (smaller surface)
- **Use `extraClasses`** when you want to add classes based on active props
