import type { Metadata } from 'next';
import { Playground } from './Playground';
import { BASE_OPEN_GRAPH } from '../constants';

const title = 'Playground: Live React + Tailwind CSS Editor | VaneUI';
const description =
  'Write React and VaneUI component code and see it render live, side by side, in the browser.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    type: 'website',
    url: '/playground',
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
