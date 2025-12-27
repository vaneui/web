'use client'

import React from 'react';
import {
  Text,
  Container,
  Col,
  SectionTitle,
  Chip,
  Section, Grid3, Card, Title, Divider, Button,
} from '@vaneui/ui';
import { ArrowRight } from "react-feather";
import { CodeBlock } from "../components/CodeBlock";

const cleanSyntaxExample = `// Other UI framework's button
<Button appearance="primary" 
        size="large"
        variant="filled" />

// VaneUI button:
<Button primary lg filled />`;

const responsiveTypographyExample = `// Typography and layout scales 
// on mobile, tablet, and desktop screens 
<Section xl>
  <PageTitle>Welcome to My App</PageTitle>
  <SectionTitle>Features</SectionTitle>
  <Title>Getting Started</Title>
</Section>`;

const themeEverywhereExample = `<ThemeProvider themeDefaults={{
  button: { 
    filled: true, sm: true     
  }
}}>
  <App />
</ThemeProvider>`;

export function AboutSection() {

  const features = [
    {
      title: "Clean, readable component syntax",
      description: "Style components with simple words like primary, filled, or outline. No complicated settings or long property names.",
      code: cleanSyntaxExample
    },
    {
      title: "Responsive layout and typography",
      description: "Headings and text scale down on smaller screens without any extra code. Your content looks great on every device right out of the box.",
      code: responsiveTypographyExample
    },
    {
      title: "Theme once, apply everywhere",
      description: "Set default styles for your entire app or customize sections individually. Nest themes to create different looks for different areas.",
      code: themeEverywhereExample
    },
  ];

  return (
    <Section xl relative borderB>
      <Container xl>
        <Col xl>
          <Chip pill>What is VaneUI?</Chip>
          <SectionTitle xl>
            A modern React component library powered by Tailwind CSS.
          </SectionTitle>
          <Text lg secondary className="max-w-3xl">
            VaneUI bridges the gap between utility-first CSS and component-based development.
            Write less code, build faster, and maintain consistency across your entire application.
          </Text>
        </Col>
        <Grid3 xl className="w-full">
          {features.map((item, index) => (
            <Card noBorder noPadding key={index} className="w-full group">
              <CodeBlock code={item.code} language="tsx" showHeader={false} theme="light"
                         className="text-xs grayscale-100 group-hover:grayscale-0 transition-all"/>
              <Title sm>{item.title}</Title>
              <Text secondary>{item.description}</Text>
            </Card>
          ))}
        </Grid3>
      </Container>
    </Section>
  );
}