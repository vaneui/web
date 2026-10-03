'use client'

import {
  Section,
  Container, Stack, Card, Row, Button, Text, Divider, ThemeProvider, Img, Title, Chip, PartialTheme, ThemeDefaults,
  Grid2
} from '@vaneui/ui';
import React, { useState, useMemo } from "react";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";
import { strictDefaults, strictTheme, strictCssVars } from "./data/strict";
import { balancedDefaults, balancedTheme, balancedCssVars } from "./data/balanced";
import { playfulDefaults, playfulTheme, playfulCssVars } from "./data/playful";
import { serializeDefaults, serializeCssVars } from "./data/themeUtils";
import { CodeBlock } from "../components/CodeBlock";

interface CustomThemeProps {
  config: PartialTheme;
  label: string;
  description: string;
  defaults: ThemeDefaults;
  cssVars?: string;
}

export const themes: Record<string, CustomThemeProps> = {
  playful: {
    config: playfulTheme,
    label: 'Playful',
    description: 'Fun with pill shapes and large sizes.',
    defaults: playfulDefaults,
    cssVars: playfulCssVars,
  },
  balanced: {
    config: balancedTheme,
    label: 'Balanced',
    description: 'Clean and modern with rounded corners.',
    defaults: balancedDefaults,
    cssVars: balancedCssVars,
  },
  strict: {
    config: strictTheme,
    label: 'Strict',
    description: 'Sharp edges and minimalist design.',
    defaults: strictDefaults,
    cssVars: strictCssVars,
  },
};

export type ThemeKey = 'playful' | 'balanced' | 'strict';

export function ThemeCustomizationSection() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('balanced');

  const currentTheme = themes[selectedTheme];

  const { defaultsCode, cssVarsCode } = useMemo(() => {
    const defaultsCode = serializeDefaults(currentTheme.defaults);
    const cssVarsCode = currentTheme.cssVars ? serializeCssVars(currentTheme.cssVars) : null;
    return { defaultsCode, cssVarsCode };
  }, [currentTheme]);

  return (
    <Section xl>
      <Container xl>
        <Stack xl noPadding wFull>
          <SectionHeader title="One component, three themes">
            The same card under three ThemeProvider presets. Switch them to see the defaults and CSS variables that
            change, then try the theme toggle in the header for dark mode.
          </SectionHeader>

          <Card lg noGap noPadding wFull className="transition-all">
            <Stack itemsCenter lg wFull>
              <Stack row pill tertiary xs justifyCenter border className="inset-shadow-xs">
                {Object.entries(themes).map(([key, theme]) => (
                  <Button sm noInsetRing pill
                    key={key}
                    aria-pressed={selectedTheme === key}
                    onClick={() => setSelectedTheme(key as ThemeKey)}
                    filled={selectedTheme === key}
                    outline={selectedTheme !== key}
                  >
                    {theme.label}
                  </Button>
                ))}
              </Stack>
              <Text secondary sm textCenter>
                {currentTheme.description}
              </Text>
            </Stack>

            <Divider/>

            <Stack secondary lg itemsCenter justifyCenter wFull className="min-h-[400px]">
              <ThemeProvider theme={currentTheme.config} themeDefaults={currentTheme.defaults}>
                <Card primary row mobileStack overflowHidden
                      className={`max-w-2xl max-mobile:max-w-80 z-10 ${currentTheme.cssVars || ''}`}>
                  <Img
                    tag={Image}
                    src="/puppy.png"
                    alt="puppy"
                    width={200}
                    height={200}
                    className="shrink-0 max-mobile:w-full"
                  />
                  <Stack sm>
                    <Row justifyBetween>
                      <Title>Oliver</Title>
                      <Chip sm>male</Chip>
                    </Row>
                    <Divider/>
                    <Text sm>Oliver is a shy, sweet pup learning to trust. He needs a calm, patient home. Older kids and a gentle dog will help him feel secure.</Text>
                    <Row mobileStack justifyEnd>
                      <Button success filled className="max-mobile:w-full">
                        Adopt
                      </Button>
                      <Button secondary className="max-mobile:w-full">
                        Learn more
                      </Button>
                    </Row>
                  </Stack>
                </Card>
              </ThemeProvider>
            </Stack>

            <Divider/>

            <Grid2 itemsStart xs wFull overflowYAuto className="max-h-[480px] p-2">
              {cssVarsCode && (
                <CodeBlock
                  code={cssVarsCode}
                  language="css"
                  showHeader={false}
                  theme="light"
                  className="flex-1"
                />
              )}
              <CodeBlock
                code={defaultsCode}
                language="tsx"
                showHeader={false}
                theme="light"
                className="flex-1"
              />
            </Grid2>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
