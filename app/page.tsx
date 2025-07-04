import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Col } from '@vaneui/ui';
import {
  HeroSection,
  FeaturesSection,
  TailwindSection,
  ResponsiveSection,
  LayoutSection,
  ThemingSection,
  GetStartedSection, ThemeCustomizationSection
} from './landing';

export default function Home() {
  return (
    <Col noGap className="h-screen">
      <Header />
      <Col noGap>
        <HeroSection />
        <ThemeCustomizationSection />
        <FeaturesSection />
        <TailwindSection />
        <ResponsiveSection />
        <LayoutSection />
        <ThemingSection />
        <GetStartedSection />
      </Col>
      <Footer />
    </Col>
  );
}
