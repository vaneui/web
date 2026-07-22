import type { Metadata } from 'next';
import { Playground } from './Playground';

const title = 'Playground - VaneUI';
const description =
  'Write React and VaneUI component code and see it render live, side by side, in the browser.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    type: 'website',
    url: '/playground',
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

export default function PlaygroundPage() {
  return <Playground />;
}
