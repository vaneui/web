import type { Metadata } from 'next';
import { Playground } from './Playground';
import { BASE_OPEN_GRAPH } from '../constants';

const title = 'Playground: Live React + Tailwind CSS Editor | VaneUI';
const description =
  'Write React code with VaneUI components and Tailwind CSS v4 in the browser and see it render live, side by side, with nothing to install.';

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
