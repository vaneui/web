import { ContrastChecker } from './ContrastChecker';
import { ToolJsonLd, toolMetadata } from '../toolPage';

export const metadata = toolMetadata('contrast-checker');

export default function Page() {
  return (
    <>
      <ToolJsonLd slug="contrast-checker"/>
      <ContrastChecker/>
    </>
  );
}
