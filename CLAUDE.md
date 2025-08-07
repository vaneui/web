# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server on localhost:3000
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 documentation website for the VaneUI React component library. The project uses:

- **Next.js 15** with App Router
- **React 19** with TypeScript 5.8
- **Tailwind CSS 4.0** for styling (with PostCSS)
- **@vaneui/ui** (v0.2.1-alpha) as the primary component library
- **@vaneui/md** (v0.0.3-alpha) for markdown rendering
- **MDX** for documentation content via @mdx-js/react
- **Prism.js** for syntax highlighting
- **React Feather** for icons
- **react-element-to-jsx-string** for component demo generation

### Key Directory Structure

- `app/` - Next.js app router directory
  - `docs/` - Documentation pages with dynamic routing
    - `[category]/[slug]/` - Dynamic documentation pages
    - `data/` - Component example data (badge.tsx, button.tsx, chip.tsx, etc.)
    - `data/getting-started/` - Markdown documentation files for setup guides
    - `docsSections.ts` - Main documentation structure configuration
    - `types.ts` - TypeScript interfaces for documentation structure
  - `landing/` - Landing page sections with barrel exports
  - `components/` - Shared React components (Header, Footer, CodeBlock, Logo, ThemeCustomizer)
  - `utils/` - Utility functions including React component string processing
  - `constants.ts` - Product branding (title, slogan, GitHub URL)
  - `globals.css` - Global styles with Tailwind imports and theme variables
  - `code-theme.css` - Prism.js dark syntax highlighting theme
- `public/` - Static assets
  - Favicon suite (ICO, SVG, PNG variations)
  - Apple touch icons and PWA manifest icons
  - Logo files (logo.png, vaneui.svg)
  - Development assets (puppy.png, react-icon.svg, github-mark.svg)
  - `site.webmanifest` - PWA configuration

### Core Architecture Concepts

1. **Documentation System**: The docs are structured around `docsSections.ts` which defines categories (Getting Started, Basic Components, Layout Components, Typography Components) and their components with examples. Some pages are created based on markdown content that is rendered using the `@vaneui/md` npm package.

2. **Theme System**: Uses VaneUI's ThemeProvider with custom overrides in `themeWrapper.tsx`. The theme system allows for component theming and customization.

3. **Component Examples**: Each component has example data in `app/docs/data/` files that demonstrate usage patterns.

4. **Dynamic Routing**: Documentation uses Next.js dynamic routes `[category]/[slug]` to generate pages based on the docsSections configuration.

5. **Code Display**: Uses CodeBlock components with Prism.js for syntax highlighting of code examples. Custom utility functions in `utils/stringUtils.ts` convert React components to JSX strings for display.

6. **Styling System**: Tailwind CSS 4.0 with `@source` directive pointing to VaneUI components. Custom CSS variables defined in `globals.css` for theme overrides, border colors, and font families (JetBrains Mono, Inter).

## Configuration Files

### Build Configuration
- `next.config.mjs` - React strict mode enabled, webpack optimization disabled for development
- `postcss.config.mjs` - PostCSS with Tailwind CSS 4.0 plugin
- `tsconfig.json` - TypeScript strict mode with Next.js plugin

### Node.js Requirements
- Node.js v22 or higher required (specified in package.json engines)
- Use `nvm use` if you have nvm installed

### TypeScript Configuration
- Uses strict mode TypeScript 5.8
- Path alias `@/*` maps to `./src/*` (though this project uses app/ directory)
- Includes Next.js TypeScript plugin

## Development Notes

- The project is a documentation site showcasing VaneUI components
- All component examples should be added to the appropriate data files in `app/docs/data/`
- Theme customizations should be made in `themeWrapper.tsx`
- The site includes analytics from Ahrefs
- Uses ESLint 9 with Next.js configuration for code quality
- No testing framework is currently configured (no Jest, no test files)
- No API routes - purely static documentation site
- PWA manifest configured in `public/site.webmanifest`
- Component demos use `react-element-to-jsx-string` for generating example code
- Custom scrollbar styling utilities defined in `globals.css`

## Important Patterns

- **Component Examples**: Functional components exported from `app/docs/data/` files
- **Markdown Documentation**: MDX files in `app/docs/data/getting-started/` for guides
- **Barrel Exports**: Landing page sections use index.ts for clean imports
- **Constants Management**: Product info centralized in `app/constants.ts`
- **No Server-Side Logic**: No middleware or API routes, client-side only
- **Alpha Dependencies**: Using alpha versions of VaneUI packages (@vaneui/ui, @vaneui/md)