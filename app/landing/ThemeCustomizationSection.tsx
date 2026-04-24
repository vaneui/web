'use client'

import {
  Section,
  Container, Stack, Card, Row, Button, Text, Divider, ThemeProvider, Img, Title, Chip, PartialTheme, ThemeDefaults,
  Grid2
} from '@vaneui/ui';
import React, { useState, useMemo } from "react";
import { FeatureTitle } from "../components/FeatureTitle";
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
    <Section lg>
      <Container xl>
        <Stack xl noPadding wFull>
          <FeatureTitle
            icon="Droplet"
            title="Theme Customization"
            description="Switch between different themes to see how components adapt. Each theme demonstrates the flexibility of the VaneUI theming system."
          />

          <Card lg noGap noPadding wFull className="transition-all">
            <Stack itemsCenter lg wFull>
              <Stack row pill tertiary xs justifyCenter border padding rounded className="inset-shadow-xs">
                {Object.entries(themes).map(([key, theme]) => (
                  <Button sm noRing pill
                    className="min-w-[80px]"
                    key={key}
                    onClick={() => setSelectedTheme(key as ThemeKey)}
                    filled={selectedTheme === key}
                    outline={selectedTheme !== key}
                  >
                    {theme.label}
                  </Button>
                ))}
              </Stack>
              <Text secondary sm textCenter>
                Theme: {selectedTheme}. {currentTheme.description}
              </Text>
            </Stack>

            <Divider/>

            <Stack relative lg itemsCenter justifyCenter wFull className="min-h-[400px]">
              <Row absolute className="
    inset-0 pointer-events-none
    bg-[repeating-linear-gradient(-45deg,theme(colors.slate.100)_0_1px,transparent_1px_calc(var(--spacing)*4))]
  "/>
              <ThemeProvider theme={currentTheme.config} themeDefaults={currentTheme.defaults}>
                <Card primary row mobileCol overflowHidden
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
                    <Row mobileCol justifyEnd>
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

            <Grid2 itemsStretch xs wFull overflowYAuto className="max-h-[480px] p-2">
              {cssVarsCode && (
                <CodeBlock
                  code={cssVarsCode}
                  language="css"
                  showHeader={false}
                  theme="dark"
                  className="flex-1"
                />
              )}
              <CodeBlock
                code={defaultsCode}
                language="tsx"
                showHeader={false}
                theme="dark"
                className="flex-1"
              />
            </Grid2>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
