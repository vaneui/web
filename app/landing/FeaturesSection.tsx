import { Section, Container, Col, Grid3, Card, Title, Text } from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { SectionHeader } from './SectionHeader';

const features = [
  {
    title: 'Props instead of class names',
    text: 'Size, color, variant and shape are words you set on the component. Each group allows one value, so styles never fight.',
    code: '<Button primary lg filled>',
  },
  {
    title: 'Responsive without breakpoint classes',
    text: 'Type and spacing scale down on smaller screens by themselves. One prop stacks a row on tablets or phones.',
    code: '<Row tabletStack>\n  <Card>Plan</Card>\n  <Card>Usage</Card>\n</Row>',
  },
  {
    title: 'Theme once, for the whole app',
    text: 'Set defaults for every component in one provider, and nest providers to give a section its own look.',
    code: '<ThemeProvider themeDefaults={{\n  button: { main: { pill: true } }\n}}>',
  },
  {
    title: 'Dark mode with one attribute',
    text: 'Every color is a CSS variable with a dark value. Set one attribute and the whole page follows, overlays included.',
    code: '<html data-theme="dark">',
  },
  {
    title: 'Accessible building blocks',
    text: 'Field links its label, help and error text to the control. Modal traps focus, and Menu works from the keyboard.',
    code: '<Field label="Email" error={error}>\n  <Input type="email"/>\n</Field>',
  },
  {
    title: 'Tailwind CSS when you need it',
    text: 'Use the Tailwind CSS v4 build you already have, or import one prebuilt stylesheet. className still works.',
    code: '@import "@vaneui/ui/css";',
  },
];

export function FeaturesSection() {
  return (
    <Section xl borderY secondary>
      <Container xl>
        <Col xl wFull>
          <SectionHeader title="Less code for the same interface">
            VaneUI keeps the styling decisions in the component, so the markup you write stays short and reads like
            the design.
          </SectionHeader>
          <Grid3 lg wFull>
            {features.map(feature => (
              <Card key={feature.title}>
                <Title sm>{feature.title}</Title>
                <Text sm secondary>{feature.text}</Text>
                <CodeBlock code={feature.code} language={feature.code.startsWith('@') ? 'css' : 'tsx'} showHeader={false} theme="light"/>
              </Card>
            ))}
          </Grid3>
        </Col>
      </Container>
    </Section>
  );
}
