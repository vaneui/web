import type { Metadata } from 'next';
import { Landing } from './landing/Landing';

// The root layout sets title/description/OG; the homepage adds its own canonical and the llms.txt hint.
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
    },
  },
};

export default function Home() {
  return <Landing/>;
}
