import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Card, Col, Container, Grid2, Section } from '@vaneui/ui';
import {
  HeroSection,
  BasicComponentsSection,
  ThemeCustomizationSection
} from './landing';
import { TypographyComponentsSection } from "./landing/TypographyComponentsSection";

export default function Home() {
  return (
    <Col noGap className="h-screen">
      <Header/>
      <Col xl>
        <HeroSection/>
        <Section secondary xs className="py-10 border-y">
          <BasicComponentsSection/>
          <TypographyComponentsSection/>
          <Container xl>
            <Grid2 sm className="w-full">
              <Card xl className="h-96 w-full"></Card>
              <Card xl className="h-96 w-full"></Card>
              <Card xl className="h-96 w-full"></Card>
              <Card xl className="h-96 w-full"></Card>
            </Grid2>
          </Container>
        </Section>
        <ThemeCustomizationSection/>
      </Col>
      <Footer/>
    </Col>
  );
}
