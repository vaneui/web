'use client';

import React, { useEffect, useState } from 'react';
import {
  Grid2, Grid3, Col, Row, Stack, Text, Title, Button, Card, Chip, Img, Divider, Label, Switch, Mark, Code, type ButtonProps,
} from '@vaneui/ui';
import { Pause, Play } from 'react-feather';
import { CodeBlock } from '../components/CodeBlock';
import { FEATURES, dog } from './content';
import { Reveal, usePrefersReducedMotion } from './Reveal';
import { FrameRow, SectionHead } from './frame';

type PropKey = 'filled' | 'pill' | 'accent' | 'lg' | 'sharp';

// Each step adds or swaps one prop; `sharp` replaces `pill` because a group holds one value
const STEPS: { props: PropKey[]; changed?: PropKey }[] = [
  { props: [] },
  { props: ['filled'], changed: 'filled' },
  { props: ['filled', 'pill'], changed: 'pill' },
  { props: ['accent', 'filled', 'pill'], changed: 'accent' },
  { props: ['accent', 'filled', 'pill', 'lg'], changed: 'lg' },
  { props: ['accent', 'filled', 'sharp', 'lg'], changed: 'sharp' },
];
const STEP_MS = 2200;

// The two documented ways to load the styles (see getting-started/installation.md)
const TAILWIND_SETUPS = [
  {
    label: 'With your Tailwind CSS v4 build',
    code: '@import "tailwindcss";\n@import "@vaneui/ui/tokens";\n@import "@vaneui/ui/vars";\n@source "../node_modules/@vaneui/ui";',
  },
  { label: 'Without Tailwind CSS', code: '@import "@vaneui/ui/css";' },
];

function Index({ n }: { n: string }) {
  return <Text xs fontMono tertiary>{n}</Text>;
}

/** A Button whose props change on a timer, with the matching line of code */
function PropDemo() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reduced;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setStep(s => (s + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step, paused]);

  const current = STEPS[step];
  const buttonProps = Object.fromEntries(current.props.map(p => [p, true])) as Partial<ButtonProps>;

  return (
    <Col noGap wFull hFull>
      {/* Live button on a dot-grid canvas */}
      <Row justifyCenter relative className="h-44 max-mobile:h-36">
        <div aria-hidden="true" className="lp-dots lp-dots--soft"/>
        <Button {...buttonProps} relative>Save changes</Button>
      </Row>
      {/* The code that produces it */}
      <Row borderT className="px-8 py-4 max-tablet:px-6 max-mobile:px-4">
        <Text sm fontMono aria-live={paused ? 'polite' : 'off'} whitespaceNowrap>
          <Text tag="span" fontMono tertiary inheritSize>&lt;</Text>Button
          {current.props.map(p => (
            <React.Fragment key={p}>
              {' '}
              {p === current.changed
                ? <Mark accent key={`${p}-${step}`} className="lp-swap px-1">{p}</Mark>
                : <Text tag="span" fontMono inheritSize>{p}</Text>}
            </React.Fragment>
          ))}
          <Text tag="span" fontMono tertiary inheritSize>&gt;</Text>
        </Text>
      </Row>
      {/* Timeline: progress, step, pause */}
      <Row borderT className="px-8 py-2 max-tablet:px-6 max-mobile:px-4">
        <div aria-hidden="true" className="lp-track">
          <div key={`${step}-${paused}`} className="lp-progress" data-paused={paused}
               style={{ '--lp-step': `${STEP_MS}ms` } as React.CSSProperties}/>
        </div>
        <Text xs fontMono tertiary>{step + 1}/{STEPS.length}</Text>
        <Button xs ghost secondary pill onClick={() => setUserPaused(!paused)}
                aria-label={paused ? 'Play prop demo' : 'Pause prop demo'}>
          {paused ? <Play aria-hidden="true"/> : <Pause aria-hidden="true"/>}
          {paused ? 'Play' : 'Pause'}
        </Button>
      </Row>
    </Col>
  );
}

/** The same mini card twice: light, and a dark copy clipped to the right half */
function MiniCard() {
  return (
    <Card className="w-72">
      <Row justifyBetween>
        <Row sm>
          <Img xs pill src={dog.image} alt="" width={40} height={40}/>
          <Col noGap>
            <Title xs tag="p">{dog.name}</Title>
            <Text xs tertiary>Adoption profile</Text>
          </Col>
        </Row>
        <Chip xs>{dog.gender}</Chip>
      </Row>
      <Divider/>
      <Label row itemsCenter justifyBetween wFull>Notify me <Switch sm defaultChecked/></Label>
      <Row xs>
        <Button xs filled flex1>Adopt</Button>
        <Button xs secondary flex1>Later</Button>
      </Row>
    </Card>
  );
}

function DarkSplit() {
  return (
    <Col sm itemsCenter wFull aria-hidden="true" inert className="py-6">
      <Row justifyBetween className="w-72">
        <Text xs fontMono tertiary>light</Text>
        <Text xs fontMono tertiary>dark</Text>
      </Row>
      <div className="relative grid">
        <div data-theme="light" className="lp-light lp-split-layer">
          <MiniCard/>
        </div>
        <div data-theme="dark" className="lp-split-layer lp-split-dark">
          <MiniCard/>
        </div>
        <svg className="lp-split-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="-4" x2="50" y2="104" vectorEffect="non-scaling-stroke"/>
        </svg>
      </div>
    </Col>
  );
}

function Tile({ n, feature, delay = 0 }: { n: string; feature: typeof FEATURES[number]; delay?: number }) {
  return (
    <Stack xl flexNoWrap justifyBetween className="lp-cell">
      <Reveal delay={delay}>
        <Col>
          <Index n={n}/>
          <Title sm trackingTight>{feature.title}</Title>
          <Text sm tertiary className="max-w-[44ch]">{feature.text}</Text>
        </Col>
      </Reveal>
      <Reveal delay={delay + 60}>
        <CodeBlock code={feature.code} language="tsx" showHeader={false} theme="light"/>
      </Reveal>
    </Stack>
  );
}

export function Principles() {
  const f = Object.fromEntries(FEATURES.map(x => [x.key, x])) as Record<typeof FEATURES[number]['key'], typeof FEATURES[number]>;

  return (
    <FrameRow id="principles" label="Principles">
      <SectionHead index="02" eyebrow="Principles" title="Less code for the same interface">
        VaneUI keeps the styling decisions in the component, so the markup you write stays short and reads like
        the design.
      </SectionHead>

      <Grid3 noGap borderT className="lp-grid">
        {/* Wide: props, with the running demo. Its inner line lands on the column line below. */}
        <Grid2 noGap className="lp-grid col-span-2 max-tablet:grid-cols-1 max-mobile:col-span-1">
          <Stack xl flexNoWrap justifyBetween className="lp-cell">
            <Reveal>
              <Col>
                <Index n="02.1"/>
                <Title sm trackingTight>{f.props.title}</Title>
                <Text sm tertiary className="max-w-[40ch]">{f.props.text}</Text>
              </Col>
            </Reveal>
            <Reveal delay={60}>
              <Text sm tertiary>
                One value per group: <Code sm>sharp</Code> replaces <Code sm>pill</Code>.
              </Text>
            </Reveal>
          </Stack>
          <Col noGap className="lp-cell">
            <PropDemo/>
          </Col>
        </Grid2>

        {/* Tall: dark mode, split light and dark */}
        <Stack xl flexNoWrap justifyBetween className="lp-cell row-span-2 max-tablet:row-span-1">
          <Reveal delay={50}>
            <Col>
              <Index n="02.2"/>
              <Title sm trackingTight>{f.dark.title}</Title>
              <Text sm tertiary className="max-w-[44ch]">{f.dark.text}</Text>
            </Col>
          </Reveal>
          <DarkSplit/>
          <Reveal delay={110}>
            <CodeBlock code={f.dark.code} language="tsx" showHeader={false} theme="light"/>
          </Reveal>
        </Stack>

        <Tile n="02.3" feature={f.responsive} delay={100}/>
        <Tile n="02.4" feature={f.theme} delay={150}/>
        <Tile n="02.5" feature={f.a11y} delay={200}/>
        {/* Wide: Tailwind CSS, the two ways to load the styles side by side in one cell */}
        <Stack xl flexNoWrap className="lp-cell col-span-2 max-mobile:col-span-1">
          <Row xl itemsStart tabletStack>
            <Reveal delay={250} className="flex-1 min-w-0">
              <Col>
                <Index n="02.6"/>
                <Title sm trackingTight>{f.tailwind.title}</Title>
                <Text sm tertiary className="max-w-[40ch]">{f.tailwind.text}</Text>
              </Col>
            </Reveal>
            <Reveal delay={300} className="flex-[1.3] min-w-0 max-tablet:w-full">
              <Col lg>
                {TAILWIND_SETUPS.map(setup => (
                  <Col xs key={setup.label}>
                    <Text xs fontMono uppercase trackingWider tertiary>{setup.label}</Text>
                    <CodeBlock code={setup.code} language="css" showHeader={false} theme="light"/>
                  </Col>
                ))}
              </Col>
            </Reveal>
          </Row>
        </Stack>
      </Grid3>
    </FrameRow>
  );
}
