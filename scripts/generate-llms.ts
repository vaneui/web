import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { docsSectionsMeta } from '../app/docs/docsMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const DATA_DIR = resolve(ROOT, 'app/docs/data');
const OUTPUT = resolve(ROOT, 'public/llms-full.txt');
const BASE_URL = 'https://vaneui.com';

// Map section slugs to the data subfolder that holds their .md files
const mdFolderMap: Record<string, string> = {
  'getting-started': 'getting-started',
  'customization': 'customization',
};

function readMarkdownFile(sectionSlug: string, mdPath: string): string | null {
  const folder = mdFolderMap[sectionSlug];
  if (!folder) return null;
  try {
    return readFileSync(resolve(DATA_DIR, folder, mdPath), 'utf-8');
  } catch {
    console.warn(`Warning: could not read ${folder}/${mdPath}`);
    return null;
  }
}

function generate(): string {
  const lines: string[] = [];

  lines.push('# VaneUI Documentation');
  lines.push('> Complete documentation for VaneUI React component library v0.9.0');
  lines.push('');
  lines.push('- Repository: https://github.com/nickolaev-ev/vaneui');
  lines.push('- Documentation: https://vaneui.com');
  lines.push('');

  for (const section of docsSectionsMeta) {
    lines.push(`## ${section.name}`);
    lines.push('');
    lines.push(section.description);
    lines.push('');

    for (const page of section.pages) {
      const url = `${BASE_URL}/docs/${section.slug}/${page.slug}`;

      lines.push('---');
      lines.push(`Title: ${page.name}`);
      lines.push(`URL: ${url}`);
      lines.push('---');
      lines.push('');

      if (page.mdPath) {
        const content = readMarkdownFile(section.slug, page.mdPath);
        if (content) {
          lines.push(content.trim());
        } else {
          lines.push(page.description);
          lines.push('');
          lines.push('For full content, visit the URL above.');
        }
      } else {
        lines.push(page.description);
        lines.push('');
        lines.push('For full interactive examples and props documentation, visit the URL above.');
      }

      lines.push('');
    }
  }

  return lines.join('\n');
}

const output = generate();
writeFileSync(OUTPUT, output, 'utf-8');

// Count pages
const totalPages = docsSectionsMeta.reduce((sum, s) => sum + s.pages.length, 0);
const mdPages = docsSectionsMeta.reduce(
  (sum, s) => sum + s.pages.filter(p => p.mdPath).length, 0
);
console.log(`Generated llms-full.txt: ${totalPages} pages (${mdPages} with full markdown content)`);
console.log(`Output: ${OUTPUT}`);
