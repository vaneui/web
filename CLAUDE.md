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
- **React 19** with TypeScript
- **Tailwind CSS 4.0** for styling
- **@vaneui/ui** as the primary component library
- **MDX** for documentation content
- **Prism.js** for syntax highlighting

### Key Directory Structure

- `app/` - Next.js app router directory
  - `docs/` - Documentation pages with dynamic routing
    - `[category]/[slug]/` - Dynamic documentation pages
    - `data/` - Component example data (badge.tsx, button.tsx, chip.tsx)
    - `docsSections.ts` - Main documentation structure configuration
  - `landing/` - Landing page sections
  - `components/` - Shared React components (Header, Footer, CodeBlock, etc.)
  - `utils/` - Utility functions
- `public/` - Static assets

### Core Architecture Concepts

1. **Documentation System**: The docs are structured around `docsSections.ts` which defines categories (Getting Started, Basic Components, Layout Components, Typography Components) and their components with examples.

2. **Theme System**: Uses VaneUI's ThemeProvider with custom overrides in `themeWrapper.tsx`. The theme system allows for component theming and customization.

3. **Component Examples**: Each component has example data in `app/docs/data/` files that demonstrate usage patterns.

4. **Dynamic Routing**: Documentation uses Next.js dynamic routes `[category]/[slug]` to generate pages based on the docsSections configuration.

5. **Code Display**: Uses CodeBlock components with Prism.js for syntax highlighting of code examples.

## Node.js Requirements

- Node.js v22 or higher required
- Use `nvm use` if you have nvm installed

## TypeScript Configuration

- Uses strict mode TypeScript
- Path alias `@/*` maps to `./src/*` (though this project uses app/ directory)
- Includes Next.js TypeScript plugin

## Development Notes

- The project is a documentation site showcasing VaneUI components
- All component examples should be added to the appropriate data files in `app/docs/data/`
- Theme customizations should be made in `themeWrapper.tsx`
- The site includes analytics from Ahrefs