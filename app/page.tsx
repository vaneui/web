import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Card, Col, Container, Grid2, Section, Code } from '@vaneui/ui';
import {
  HeroSection,
  AboutSection,
  BasicComponentsSection,
  ThemeCustomizationSection
} from './landing';
import { TypographyComponentsSection } from "./landing/TypographyComponentsSection";
import { LiveSection } from "./landing/LiveSection";
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
          Every component adapts to screen size automatically.
          Use responsive props like <Code primary>xs</Code>, <Code primary>sm</Code>,
          <Code primary>md</Code>, <Code primary>lg</Code>, <Code primary>xl</Code> to fine-tune layouts for any device.
        </span>,
    },
  ]

  return (
    <Col noGap className="h-screen">
      <Header/>
      <Col noGap>
        <HeroSection/>
        <AboutSection/>
        <LiveSection/>
        <Section secondary lg borderY className="py-10">
          <BasicComponentsSection/>
          <TypographyComponentsSection/>
          <Container xl>
            <Grid2 lg className="w-full">
              {features.map((item, key) => (
                <Card lg row smCol key={key}>
                  <FeatureTitle icon={item.icon} title={item.title} description={item.description}/>
                </Card>
              ))}
            </Grid2>
          </Container>
        </Section>
        <ThemeCustomizationSection/>
      </Col>
      <Footer/>
    </Col>
  );
}
