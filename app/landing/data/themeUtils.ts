import { ThemeDefaults } from '@vaneui/ui';

/**
 * Converts a ThemeDefaults object to a formatted TypeScript code string
 */
export function serializeDefaults(defaults: ThemeDefaults): string {
  const lines: string[] = ['const themeDefaults: ThemeDefaults = {'];

  const entries = Object.entries(defaults);
  entries.forEach(([component, props], componentIndex) => {
    lines.push(`  ${component}: {`);
    const propEntries = Object.entries(props as Record<string, unknown>);
    propEntries.forEach(([prop, value], propIndex) => {
      const comma = propIndex < propEntries.length - 1 ? ',' : '';
      lines.push(`    ${prop}: ${JSON.stringify(value)}${comma}`);
    });
    const componentComma = componentIndex < entries.length - 1 ? ',' : '';
    lines.push(`  }${componentComma}`);
  });

  lines.push('};');
  return lines.join('\n');
}

/**
 * Converts CSS variables string to a formatted CSS code block
 */
export function serializeCssVars(cssVars: string): string {
  const rootVars: string[] = [];
  const nestedRules: string[] = [];

  cssVars
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .forEach(line => {
      // Check for nested selector pattern: [&_.selector]:[--var:value]
      const nestedMatch = line.match(/^\[&_\.([^\]]+)\]:\[([^\]]+)\]$/);
      if (nestedMatch) {
        const selector = nestedMatch[1];
        const varPart = nestedMatch[2];
        const colonIdx = varPart.indexOf(':');
        if (colonIdx !== -1) {
          const varName = varPart.slice(0, colonIdx);
          const value = varPart.slice(colonIdx + 1);
          nestedRules.push(`  .${selector} { ${varName}: ${value}; }`);
        }
        return;
      }

      // Simple var pattern: [--var:value]
      if (line.startsWith('[') && line.endsWith(']')) {
        const inner = line.slice(1, -1);
        const colonIndex = inner.indexOf(':');
        if (colonIndex !== -1) {
          const varName = inner.slice(0, colonIndex);
          const value = inner.slice(colonIndex + 1);
          rootVars.push(`  ${varName}: ${value};`);
        }
      }
    });

  if (rootVars.length === 0 && nestedRules.length === 0) return '';

  let result = '.theme-wrapper {\n';
  if (rootVars.length > 0) {
    result += rootVars.join('\n') + '\n';
  }
  if (nestedRules.length > 0) {
    result += '\n' + nestedRules.join('\n') + '\n';
  }
  result += '}';

  return result;
}
