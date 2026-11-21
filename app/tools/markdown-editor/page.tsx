import { MarkdownEditor } from './MarkdownEditor';
import { ToolJsonLd, toolMetadata } from '../toolPage';

export const metadata = toolMetadata('markdown-editor');

export default function Page() {
  return (
    <>
      <ToolJsonLd slug="markdown-editor"/>
      <MarkdownEditor/>
    </>
  );
}
