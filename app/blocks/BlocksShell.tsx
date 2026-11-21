import React from 'react';
import { Col, Container, Row, Stack } from '@vaneui/ui';
import '../landing/landing.css';
import { LandingHeader, MAIN_CONTENT_ID } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { FRAME } from '../landing/frame';

/**
 * The site frame around the gallery and each block page: header, the railed 80rem column and
 * footer. Not a layout.tsx, so the bare preview pages under /blocks/<slug>/preview stay without it.
 */
export function BlocksShell({ children }: { children: React.ReactNode }) {
  return (
    <Col noGap primary className="lp-site min-h-screen">
      <LandingHeader/>
      <Row noGap justifyCenter itemsStretch flex1>
        {/* The skip link's target: focusable from script only, and no ring around the whole region */}
        <Container xl noGap borderX itemsStretch relative tag="main" id={MAIN_CONTENT_ID} tabIndex={-1}
                   className={`${FRAME} outline-none`}>
          <Stack xl relative wFull className="lg:py-12">
            {children}
          </Stack>
        </Container>
      </Row>
      <LandingFooter/>
    </Col>
  );
}
