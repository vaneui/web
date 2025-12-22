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
        <Divider/>
        <Grid3 xl className="w-full">
          {
            [
              {
                title: "Clean, readable component syntax",
                description: "Style components with simple words like primary, filled, or outline. No complicated settings or long property names."
              },
              {
                title: "Automatically responsive typography",
                description: "Headings and text scale down on smaller screens without any extra code. Your content looks great on every device right out of the box."
              },
              {
                title: "Theme once, apply everywhere",
                description: "Set default styles for your entire app or customize sections individually. Nest themes to create different looks for different areas."
              },
            ].map((item, index) => (
              <Card lg noBorder noPadding key={index} className="w-full">
                <Title sm>{item.title}</Title>
                <Text secondary>{item.description}</Text>
                <Button hidden>Learn more <ArrowRight/></Button>
              </Card>
            ))
          }
        </Grid3>
      </Container>
    </Section>
  );
}