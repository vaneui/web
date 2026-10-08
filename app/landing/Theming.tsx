'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Grid2, Col, Row, Stack, Text, Title, Button, Card, Chip, Divider, Img, ThemeProvider,
} from '@vaneui/ui';
import { themes, type ThemeKey } from './data/themes';
import { serializeCssVars, serializeDefaults } from './data/themeUtils';
import { CodeBlock } from '../components/CodeBlock';
import { dog } from './content';
import { Reveal } from './Reveal';
import { FrameRow, SectionHead } from './frame';

type CodeTab = 'defaults' | 'css';

/** Theming demo: example themes with their code on the left, the card under the selected one on the right */
export function Theming() {
  const [selected, setSelected] = useState<ThemeKey>('balanced');
  const [tab, setTab] = useState<CodeTab>('defaults');
  const theme = themes[selected];

  const { defaultsCode, cssVarsCode } = useMemo(() => ({
    defaultsCode: serializeDefaults(theme.defaults),
    cssVarsCode: serializeCssVars(theme.cssVars),
  }), [theme]);

  const showCss = tab === 'css';

  return (
    <FrameRow id="theming" label="Theming">
      <SectionHead index="03" eyebrow="Theming" title="Restyle every component from one place">
        ThemeProvider sets default props and CSS variables for every component inside it. The themes below are
        three examples: yours can use any values, and a nested provider gives one section its own look.
      </SectionHead>

      <Grid2 noGap borderT className="lp-grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] max-tablet:grid-cols-1">
        {/* Controls and code */}
        <Stack xl flexNoWrap className="lp-cell">
          <Reveal>
            <Col>
              <Text xs fontMono uppercase trackingWider tertiary>Example theme</Text>
              <Row xs flexWrap role="group" aria-label="Example theme">
                {(Object.keys(themes) as ThemeKey[]).map(key => (
                  <Button key={key} pill filled={selected === key} aria-pressed={selected === key}
                          onClick={() => setSelected(key)}>
                    {themes[key].label}
                  </Button>
                ))}
              </Row>
              <Text sm tertiary>{theme.description}</Text>
            </Col>
          </Reveal>
          <Divider/>
          <Reveal delay={60}>
            <Col>
              <Row xs role="group" aria-label="Code shown">
                <Button xs ghost={tab !== 'defaults'} secondary={tab !== 'defaults'} fontMono
                        aria-pressed={tab === 'defaults'} onClick={() => setTab('defaults')}>
                  themeDefaults
                </Button>
                <Button xs ghost={tab !== 'css'} secondary={tab !== 'css'} fontMono
                        aria-pressed={tab === 'css'} onClick={() => setTab('css')}>
                  CSS variables
                </Button>
              </Row>
              {/* Fixed height, so switching the code shown never moves the card */}
              <CodeBlock key={`${selected}-${tab}`} code={showCss ? cssVarsCode : defaultsCode}
                         language={showCss ? 'css' : 'tsx'} showHeader={false} theme="light"
                         className="h-[22rem]"/>
            </Col>
          </Reveal>
        </Stack>

        {/* The card under the selected theme */}
        <Stack xl flexNoWrap row itemsCenter justifyCenter relative className="lp-cell min-h-[32rem] max-mobile:min-h-0 max-mobile:py-10">
          <div aria-hidden="true" className="lp-dots"/>
          <Reveal delay={120} className="relative">
            <ThemeProvider theme={theme.config} themeDefaults={theme.defaults}>
              <Card row mobileStack overflowHidden
                    className={`max-w-xl max-mobile:max-w-80 ${theme.cssVars}`}>
                <Img tag={Image} src={dog.image} alt="" width={200} height={200}
                     className="shrink-0 max-mobile:w-full"/>
                <Stack sm>
                  <Row justifyBetween>
                    <Title tag="p">{dog.name}</Title>
                    <Chip sm>{dog.gender}</Chip>
                  </Row>
                  <Divider/>
                  <Text sm>{dog.description}</Text>
                  <Row mobileStack justifyEnd>
                    <Button success filled className="max-mobile:w-full">Adopt</Button>
                    <Button secondary className="max-mobile:w-full">Learn more</Button>
                  </Row>
                </Stack>
              </Card>
            </ThemeProvider>
          </Reveal>
        </Stack>
      </Grid2>
    </FrameRow>
  );
}
