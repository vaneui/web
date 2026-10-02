import type { Metadata } from 'next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Card, Col, Container, Grid2, Section, Code, Text, SectionTitle } from '@vaneui/ui';

// Homepage owns its own canonical now that the root layout no longer sets one.
// Title/description/OG are inherited from the root layout (correct for '/'); we
// only add the self-canonical and keep the llms.txt discovery hint attached to
// the root page where the file actually lives.
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
    },
  },
};
import {
  HeroSection,
  AboutSection,
  ThemeCustomizationSection,
  ComponentShowcaseSection,
  StackSection,
  GetStartedSection,
} from './landing';
import { LiveSection } from "./landing/LiveSection";
import { AiSection } from "./landing/AiSection";
import { FeatureTitle, FeatureTitleProps } from "./components/FeatureTitle";

export default function Home() {

  const features: FeatureTitleProps[] = [
    {
      icon: "Zap",
      title: "Rapid development",
      description: "Pre-built components with sensible defaults get you started immediately. " +
        "Customize with Tailwind utilities when needed, without breaking the component abstraction."
    },
    {
      icon: "Package",
      title: "Composable architecture",
      description: "Every component is designed to work seamlessly with others. " +
        "Build complex UIs by combining simple, predictable building blocks that just work together."
    },
    {
      icon: "Droplet",
      title: "Flexible theming",
      description: "Built-in theme system with dark mode support. " +
        "Override any component style with Tailwind classes or create your own theme variants effortlessly."
    },
    {
      icon: "Layout",
      title: "Responsive by default",
      description:
        <span>
          Typography and spacing scale with the screen automatically. Use breakpoint props like <Code primary>mobileStack</Code>, <Code primary>tabletStack</Code> and <Code primary>tabletHide</Code> to change layouts per device.
        </span>,
    },
  ]

  return (
    <Col noGap className="h-screen">
      <Header />
      <Col noGap tag="main">
        <HeroSection />
        <AboutSection />
        <LiveSection />
        <ComponentShowcaseSection />
        <ThemeCustomizationSection />
        <AiSection />
        <Section xl>
          <Container xl>
            <Col itemsCenter>
              <SectionTitle xl>Why VaneUI</SectionTitle>
              <Text xl secondary textCenter>Built for developers who value simplicity and speed.</Text>
            </Col>
            <Grid2 lg wFull>
              {features.map((item, key) => (
                <Card xl row mobileStack key={key}>
                  <FeatureTitle icon={item.icon} title={item.title} description={item.description} />
                </Card>
              ))}
            </Grid2>
          </Container>
        </Section>
        <StackSection />
        <GetStartedSection />
      </Col>
      <Footer />
    </Col>
  );
}
