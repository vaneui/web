import React from 'react';
import type { Metadata } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Section, Container, Col, PageTitle, Text, Link } from '@vaneui/ui';
import { DocsMarkdown } from '../docs/DocsMarkdown';

const CHANGELOG_URL = 'https://github.com/vaneui/vaneui/blob/main/CHANGELOG.md';

const title = 'Changelog - VaneUI';
const description =
  'Release notes for @vaneui/ui, listing every user-visible change per version.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/changelog',
  },
  openGraph: {
    type: 'website',
    url: '/changelog',
    siteName: 'VaneUI',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

/**
 * Read CHANGELOG.md out of the installed @vaneui/ui rather than a sibling checkout,
 * so the site builds on Vercel where only node_modules exists. Resolved from cwd like
 * the docs route: `createRequire(import.meta.url)` fails here because the bundler
 * rewrites import.meta.url to a path inside .next.
 */
async function readChangelog(): Promise<string | null> {
  const file = path.join(process.cwd(), 'node_modules/@vaneui/ui/CHANGELOG.md');
  try {
    return await fs.readFile(file, 'utf8');
  } catch (error) {
    console.error(`Could not read CHANGELOG.md from ${file}`, error);
    return null;
  }
}

/** The page renders its own PageTitle, so drop the file's leading `# Changelog`. */
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.*\r?\n/, '');
}

export default async function ChangelogPage() {
  const raw = await readChangelog();

  return (
    <Section>
      <Container itemsStart>
        <Col lg className="max-w-3xl">
          <PageTitle>Changelog</PageTitle>
          {raw === null ? (
            <Text secondary>
              The changelog could not be read from the installed package. See the{' '}
              <Link href={CHANGELOG_URL} external>
                changelog on GitHub
              </Link>
              .
            </Text>
          ) : (
            <DocsMarkdown md={stripLeadingH1(raw)} />
          )}
        </Col>
      </Container>
    </Section>
  );
}
