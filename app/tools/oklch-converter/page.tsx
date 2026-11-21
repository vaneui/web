import { OklchConverter } from './OklchConverter';
import { ToolJsonLd, toolMetadata } from '../toolPage';

export const metadata = toolMetadata('oklch-converter');

export default function Page() {
  return (
    <>
      <ToolJsonLd slug="oklch-converter"/>
      <OklchConverter/>
    </>
  );
}
