'use client';

import React from 'react';
import Link from 'next/link';
import { Section, Container, Col, Row, Stack, Text, SectionTitle, Button } from '@vaneui/ui';
import { ArrowRight } from 'react-feather';
import { INSTALL, PRODUCT } from './content';
import { Reveal } from './Reveal';
import { Crosshairs, Eyebrow, FRAME, GitHubMark, InstallBox } from './frame';

/** Final call to action on a hatched band */
export function GetStarted() {
  return (
    <Section noPadding noGap relative borderT aria-label="Get started" className="lp-hatch">
      <Container lg noGap borderX relative itemsStretch className={FRAME}>
        <Crosshairs/>
        <Stack xl flexNoWrap itemsCenter className="py-28 max-tablet:py-20 max-mobile:py-16">
          <Reveal>
            <Eyebrow index="05">Get started</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <SectionTitle lg textCenter trackingTighter>
              Build your next interface{' '}
              <Text tag="span" block wFull tertiary inheritSize textCenter>with VaneUI</Text>
            </SectionTitle>
          </Reveal>
          <Reveal delay={120}>
            <Text tertiary textCenter className="max-w-[48ch]">
              Install the package, import one stylesheet and render your first component.
            </Text>
          </Reveal>
          <Reveal delay={180} className="max-mobile:w-full">
            <Col itemsCenter>
              <InstallBox command={INSTALL}/>
              <Row sm mobileStack justifyCenter wFull>
                <Button md filled pill tag={Link} href="/docs/getting-started/installation" className="max-mobile:w-full">
                  Read the docs <ArrowRight aria-hidden="true"/>
                </Button>
                <Button md pill tag={Link} href="/playground" className="max-mobile:w-full">Open the playground</Button>
                <Button md pill tag="a" href={PRODUCT.githubUrl} target="_blank" rel="noopener noreferrer"
                        aria-label="View VaneUI on GitHub (opens in a new tab)" className="max-mobile:w-full">
                  <GitHubMark/> GitHub
                </Button>
              </Row>
            </Col>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
