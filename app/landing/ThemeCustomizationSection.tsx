'use client'

import {
  Section,
  Container, Stack, Card, Row, Button, Text, Divider, ThemeProvider, Img, Title, Chip, PartialTheme, ThemeDefaults,
  ThemeProps
} from '@vaneui/ui';
import React, { useState } from "react";
import { FeatureTitle } from "../components/FeatureTitle";
import Image from "next/image";
import { dog } from "./data/dog";
import { strictDefaults, strictOverrideFunc, strictTheme } from "./data/strict";
import { balancedDefaults, balancedTheme } from "./data/balanced";
import { playfulDefaults, playfulOverrideFunc, playfulTheme } from "./data/playful";

interface CustomThemeProps {
  config: PartialTheme;
  label: string;
  description: string;
  defaults: ThemeDefaults;
  overrideFunc?: (theme: ThemeProps) => ThemeProps;
}

export const themes: Record<string, CustomThemeProps> = {
  playful: {
    config: playfulTheme,
    label: 'Playful',
    description: 'Fun with pill shapes and large sizes.',
    defaults: playfulDefaults,
    overrideFunc: playfulOverrideFunc
  },
  balanced: {
    config: balancedTheme,
    label: 'Balanced',
    description: 'Clean and modern with rounded corners.',
    defaults: balancedDefaults,
  },
  strict: {
    config: strictTheme,
    label: 'Strict',
    description: 'Sharp edges and minimalist design.',
    defaults: strictDefaults,
    overrideFunc: strictOverrideFunc,
  },
};

export type ThemeKey = 'playful' | 'balanced' | 'strict';

export function ThemeCustomizationSection() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('balanced');

  const currentTheme = themes[selectedTheme];

  return (
    <Section className="py-20">
      <Container xl>
        <Stack xl noPadding className="w-full">
          <FeatureTitle
            icon="Droplet"
            title="Theme Customization"
            description="Switch between different themes to see how components adapt. Each theme demonstrates the flexibility of the VaneUI theming system."
          />

          <Card lg noGap noPadding className="w-full transition-all">
            <Stack itemsCenter lg className="w-full">
              <Stack row sm primary justifyCenter border padding rounded className="bg-bg-tertiary inset-shadow-xs">
                {Object.entries(themes).map(([key, theme]) => (
                  <Button sm noRing
                    key={key}
                    onClick={() => setSelectedTheme(key as ThemeKey)}
                    filled={selectedTheme === key}
                    outline={selectedTheme !== key}
                  >
                    {theme.label}
                  </Button>
                ))}
              </Stack>
              <Text secondary sm className="text-center">
                Theme: {selectedTheme}. {currentTheme.description}
              </Text>
            </Stack>

            <Divider/>

            <Stack relative lg itemsCenter justifyCenter className="w-full lg:h-[400px]">
              <Row absolute className="
    inset-0 pointer-events-none
    bg-[repeating-linear-gradient(-45deg,theme(colors.slate.100)_0_1px,transparent_1px_calc(var(--spacing)*4))]
  "/>
              <ThemeProvider theme={currentTheme.config} themeDefaults={currentTheme.defaults}
                             themeOverride={currentTheme.overrideFunc}>
                <Card sm row mobileCol overflowHidden className="max-w-2xl max-sm:max-w-80 z-10">
                  <Img
                    tag={Image}
                    src="/puppy.png"
                    alt="puppy"
                    width={200}
                    height={200}
                    className="shrink-0 max-sm:w-full"
                  />
                  <Stack sm>
                    <Row justifyBetween>
                      <Title>{dog.name}</Title>
                      <Chip>
                        {dog.gender}
                      </Chip>
                    </Row>
                    <Divider/>
                    <Text sm>{dog.description}</Text>
                    <Row mobileCol justifyEnd>
                      <Button success filled className="max-sm:w-full">
                        Adopt
                      </Button>
                      <Button secondary className="max-sm:w-full">
                        Learn more
                      </Button>
                    </Row>
                  </Stack>
                </Card>
              </ThemeProvider>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}