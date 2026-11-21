import { ThemeGenerator } from './ThemeGenerator';
import { ToolJsonLd, toolMetadata } from '../toolPage';

export const metadata = toolMetadata('theme-generator');

export default function ThemeGeneratorPage() {
  return (
    <>
      <ToolJsonLd slug="theme-generator"/>
      <ThemeGenerator/>
    </>
  );
}
