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

export function AboutSection() {

  return (
    <Section lg relative borderB>
      <Container xl>
        <Col>
          <Chip default pill semibold sm shadow>What is VaneUI?</Chip>
          <SectionTitle xl>
            A modern React component library powered by Tailwind CSS.
          </SectionTitle>
          <Text lg tertiary className="max-w-3xl">
            VaneUI bridges the gap between utility-first CSS and component-based development.
            Write less code, build faster, and maintain consistency across your entire application.
          </Text>
        </Col>
        <Divider/>
        <Grid3 xl className="w-full">
          {
            [
              {
                title: "Build faster with ready components",
                description: "Start your project with a collection of prebuilt React components. Each component is designed to save development time and help you focus on building features instead of basic UI."
              },
              {
                title: "Customize easily to fit your brand",
                description: "Quickly adjust colors, styles, spacing, and appearance to match your product’s look and feel. VaneUI makes it simple to create a consistent design system without extra effort."
              },
              {
                title: "Developer-friendly from the start",
                description: "Enjoy a smooth developer experience with TypeScript support, clean APIs, and utility-first styling. VaneUI helps you write reliable code while keeping development efficient."
              },
            ].map((item, index) => (
              <Card lg noBorder noPadding key={index} className="w-full">
                <Title sm>{item.title}</Title>
                <Text tertiary>{item.description}</Text>
                <Button hidden>Learn more <ArrowRight/></Button>
              </Card>
            ))
          }
        </Grid3>
      </Container>
    </Section>
  );
}