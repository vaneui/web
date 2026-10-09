'use client';

// Blueprint primitives shared by every landing section: the framed row, bands, eyebrows, install box.
import React, { useEffect, useRef, useState } from 'react';
import { Section, Container, Row, Col, Stack, Grid2, Text, SectionTitle, IconButton } from '@vaneui/ui';
import { Check, Copy } from 'react-feather';
import { Reveal } from './Reveal';

/** Width of the frame between the rails: 80rem on every page (Container xl), with a 16px gutter on small screens */
export const FRAME = 'w-[calc(100%-2rem)]';

/** The two "+" marks where a section hairline crosses the rails */
export function Crosshairs({ bottom = false }: { bottom?: boolean }) {
  const b = bottom ? ' lp-x--b' : '';
  return (
    <>
      <span aria-hidden="true" className={`lp-x lp-x--l${b}`}/>
      <span aria-hidden="true" className={`lp-x lp-x--r${b}`}/>
    </>
  );
}

/** Accent corner brackets shown on hover; place inside a `lp-cell` */
export function Brackets() {
  return (
    <>
      <span aria-hidden="true" className="lp-brk lp-brk--tl"/>
      <span aria-hidden="true" className="lp-brk lp-brk--tr"/>
      <span aria-hidden="true" className="lp-brk lp-brk--bl"/>
      <span aria-hidden="true" className="lp-brk lp-brk--br"/>
    </>
  );
}

/** One full-bleed blueprint row: a hairline across the page, the railed frame, crosshairs where they meet */
export function FrameRow({ children, id, label, top = true, tag, className }: {
  children: React.ReactNode;
  id?: string;
  label?: string;
  top?: boolean;
  tag?: 'section' | 'footer';
  className?: string;
}) {
  return (
    <Section noPadding noGap relative borderT={top} tag={tag} id={id} aria-label={label} className={className}>
      <Container xl noGap borderX relative itemsStretch className={FRAME}>
        {top && <Crosshairs/>}
        {children}
      </Container>
    </Section>
  );
}

/** A 48px decorative band between sections: hatched gutters, or a hatched frame with `full` */
export function Band({ full = false }: { full?: boolean }) {
  return (
    <div aria-hidden="true" className={`lp-band lp-hatch ${full ? 'lp-band--full' : ''}`}>
      <div className="lp-band__frame">
        <span className="lp-x lp-x--l"/>
        <span className="lp-x lp-x--r"/>
      </div>
    </div>
  );
}

/** Mono index label `[01] Components` after an accent square; `tight` for narrow columns */
export function Eyebrow({ index, tight = false, tag, children }: {
  index: string;
  tight?: boolean;
  tag?: 'h2' | 'h3';
  children: React.ReactNode;
}) {
  return (
    <Row xs>
      <span aria-hidden="true" className="lp-sq"/>
      <Text tag={tag} xs fontMono uppercase trackingWidest={!tight} trackingWider={tight} tertiary>[{index}] {children}</Text>
    </Row>
  );
}

/** Section header on the frame's two-column grid: eyebrow and title left, description right */
export function SectionHead({ index, eyebrow, title, children }: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Grid2 noGap itemsEnd>
      <Stack xl flexNoWrap className="pt-20 pb-12 max-tablet:pt-14 max-tablet:pb-8 max-mobile:pt-12">
        <Reveal>
          <Col lg>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <SectionTitle trackingTight className="max-w-[16ch]">{title}</SectionTitle>
          </Col>
        </Reveal>
      </Stack>
      <Stack xl flexNoWrap className="pt-20 pb-12 max-tablet:pt-14 max-tablet:pb-8 max-mobile:pt-0 max-mobile:pb-10">
        <Reveal delay={80}>
          <Text tertiary className="max-w-[46ch]">{children}</Text>
        </Reveal>
      </Stack>
    </Grid2>
  );
}

/** Copy-to-clipboard icon button with a short confirmation */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  };
  return (
    <>
      <IconButton xs ghost pill secondary={!copied} success={copied} onClick={copy}
                  aria-label={copied ? 'Copied' : label}>
        {copied ? <Check aria-hidden="true"/> : <Copy aria-hidden="true"/>}
      </IconButton>
      {/* screen readers don't announce a focused button's name change, so say it here */}
      <span role="status" className="sr-only">{copied ? 'Copied' : ''}</span>
    </>
  );
}

/** `$ npm install @vaneui/ui` in a bordered mono pill with a copy button */
export function InstallBox({ command }: { command: string }) {
  return (
    <Stack row xs flexNoWrap pill border primary itemsCenter justifyBetween className="pl-4">
      <Text sm fontMono whitespaceNowrap>
        <Text tag="span" fontMono tertiary inheritSize>{'$\u00a0'}</Text>{command}
      </Text>
      <CopyButton value={command} label="Copy install command"/>
    </Stack>
  );
}

/** GitHub mark in currentColor */
export function GitHubMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 98 96" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" fill="currentColor"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
    </svg>
  );
}

/** A 24x24 simple-icons mark in currentColor */
export function BrandMark({ path, size = 18 }: { path: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={path}/>
    </svg>
  );
}
