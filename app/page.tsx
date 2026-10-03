import type { Metadata } from 'next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Col, Container, Section } from '@vaneui/ui';
import {
  HeroSection,
  WorksWith,
  GallerySection,
  FeaturesSection,
  ThemeCustomizationSection,
  AiSection,
  GetStartedSection,
} from './landing';

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
  return (
    <Col noGap className="h-screen">
      <Header />
      <Col noGap tag="main">
        <HeroSection />
        <Section sm borderB>
          <Container xl>
            <WorksWith />
          </Container>
        </Section>
        <GallerySection />
        <FeaturesSection />
        <ThemeCustomizationSection />
        <AiSection />
        <GetStartedSection />
      </Col>
      <Footer />
    </Col>
  );
}
