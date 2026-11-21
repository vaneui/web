/**
 * The questions and answers of a docs page's FAQ section, as plain text for the FAQPage node
 * of its structured data. A page's FAQ is the `## Frequently asked questions` section: each
 * H3 inside it is a question, and the text under that H3 is its answer.
 */

import { splitMarkdown } from '../search/buildIndex';

/** The H2 that holds a page's questions */
export const FAQ_HEADING = 'Frequently asked questions';

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Read the FAQ from page markdown (frontmatter removed, includes expanded). Headings and text
 * come from splitMarkdown, the splitter the search index uses, so code fences are skipped and
 * links, code spans and emphasis turn into their text. A heading below an H3 adds its title
 * and text to that answer. No FAQ section, or one without questions, gives an empty list.
 */
export function faqEntries(md: string): FaqEntry[] {
  const { sections } = splitMarkdown(md);
  const start = sections.findIndex(s => s.level === 2 && s.title === FAQ_HEADING);
  if (start === -1) return [];

  const entries: FaqEntry[] = [];
  for (const section of sections.slice(start + 1)) {
    if (section.level <= 2) break;
    if (section.level === 3) {
      entries.push({ question: section.title, answer: section.text });
    } else if (entries.length > 0) {
      const last = entries[entries.length - 1];
      last.answer = [last.answer, section.title, section.text].filter(Boolean).join(' ');
    }
  }
  // A question without an answer is no use to a reader of the structured data
  return entries.filter(e => e.question && e.answer);
}
