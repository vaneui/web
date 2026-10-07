'use client';

import React, { useEffect, useState } from 'react';
import {
  Grid2, Grid3, Col, Row, Stack, Text, Title, Button, Card, Img, Divider, Label, Switch, Mark, Code, type ButtonProps,
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
    <Col noGap wFull className="h-full">
      {/* Live button on a dot-grid canvas */}
      <Row justifyCenter relative className="h-44 max-mobile:h-36">
        <div aria-hidden="true" className="lp-dots lp-dots--soft"/>
        <Button {...buttonProps} className="relative">Save changes</Button>
      </Row>
      {/* The code that produces it */}
      <Row borderT className="px-8 py-4 max-tablet:px-6 max-mobile:px-4">
        <Text sm fontMono aria-live="polite" whitespaceNowrap>
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
        <Button xs ghost secondary pill onClick={() => setUserPaused(!paused)} aria-pressed={paused}
                aria-label={paused ? 'Play prop demo' : 'Pause prop demo'}>
          {paused ? <Play aria-hidden="true"/> : <Pause aria-hidden="true"/>}
          {paused ? 'Play' : 'Pause'}
        </Button>
      </Row>
    </Col>
  );
}

/** The same mini card twice: light, and a dark copy clipped to the lower-right triangle */
function MiniCard() {
  return (
    <Card className="w-64">
      <Row sm>
        <Img xs pill src={dog.image} alt="" width={40} height={40}/>
        <Col noGap>
          <Title xs tag="p">{dog.name}</Title>
          <Text xs tertiary>Adoption profile</Text>
        </Col>
      </Row>
      <Divider/>
      <Label row itemsCenter><Switch sm defaultChecked/> Notify me</Label>
      <Row xs>
        <Button xs filled>Adopt</Button>
        <Button xs secondary>Later</Button>
      </Row>
    </Card>
  );
}

function DarkSplit() {
  return (
    <Col sm itemsCenter wFull aria-hidden="true" inert className="py-6">
      <Row justifyBetween className="w-64">
        <Text xs fontMono tertiary>light</Text>
      </Row>
      <div className="relative grid">
        <div data-theme="light" className="lp-light lp-split-layer">
          <MiniCard/>
        </div>
        <div data-theme="dark" className="lp-split-layer lp-split-dark">
          <MiniCard/>
        </div>
        <svg className="lp-split-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="98" y1="2.5" x2="2" y2="97.5" vectorEffect="non-scaling-stroke"/>
        </svg>
      </div>
      <Row justifyEnd className="w-64">
        <Text xs fontMono tertiary>dark</Text>
      </Row>
    </Col>
  );
}

function Tile({ n, feature, className = '', children, delay = 0, code = true }: {
  n: string;
  feature: typeof FEATURES[number];
  className?: string;
  children?: React.ReactNode;
  delay?: number;
  code?: boolean;
}) {
  return (
    <Stack xl flexNoWrap justifyBetween className={`lp-cell ${className}`}>
      <Reveal delay={delay}>
        <Col>
          <Index n={n}/>
          <Title sm trackingTight>{feature.title}</Title>
          <Text sm tertiary className="max-w-[44ch]">{feature.text}</Text>
        </Col>
      </Reveal>
      {children}
      {code && (
        <Reveal delay={delay + 60}>
          <CodeBlock code={feature.code} language={feature.code.startsWith('@') ? 'css' : 'tsx'}
                     showHeader={false} theme="light"/>
        </Reveal>
      )}
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
        {/* Wide: Tailwind CSS, text and code side by side */}
        <Grid2 noGap className="lp-grid col-span-2 max-tablet:col-span-1 max-tablet:grid-cols-1">
          <Tile n="02.6" feature={f.tailwind} delay={250} code={false}/>
          <Stack xl flexNoWrap justifyEnd className="lp-cell">
            <Reveal delay={300}>
              <CodeBlock code={f.tailwind.code} language="css" showHeader={false} theme="light"/>
            </Reveal>
          </Stack>
        </Grid2>
      </Grid3>
    </FrameRow>
  );
}
