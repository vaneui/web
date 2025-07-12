import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Col, Section } from '@vaneui/ui';
import {
  HeroSection,
  BasicComponentsSection,
  TailwindSection,
  ResponsiveSection,
  LayoutSection,
  ThemingSection,
  GetStartedSection, ThemeCustomizationSection
} from './landing';
import { TypographyComponentsSection } from "./landing/TypographyComponentsSection";

export default function Home() {
  return (
    <Col noGap className="h-screen">
      <Header/>
      <Col xl>
        <HeroSection/>
        <Section>
          <BasicComponentsSection/>
          <TypographyComponentsSection/>
        </Section>
        <ThemeCustomizationSection/>
        <TailwindSection/>
        <ResponsiveSection/>
        <LayoutSection/>
        <ThemingSection/>
        <GetStartedSection/>
      </Col>
      <Footer/>
    </Col>
  );
}
