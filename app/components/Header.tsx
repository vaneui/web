'use client'

import { Row, Button, Stack, Col } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Link from 'next/link'
import { ArrowRight, GitHub, Menu, X } from "react-feather";
import { Logo } from "./Logo";
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Stack sm row justifyBetween itemsCenter tag={'header'} primary borderB
             className="flex-shrink-0 bg-white/70 backdrop-blur-md z-40" wFull>
        <Logo/>

        {/* Desktop menu items - hidden on mobile */}
        <Row tabletHide>
          <Button sm normal primary noShadow noRing href="/docs" tag={Link}>
            Documentation
          </Button>
          <Button sm normal href={PRODUCT.githubUrl} tag="a" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub repository (opens in new tab)">
            <GitHub className="size-4" aria-hidden="true"/>
            GitHub
            <ArrowRight className="size-4" aria-hidden="true"/>
          </Button>
        </Row>

        {/* Mobile menu button - shown only on mobile */}
        <Button sm className="lg:hidden [--aspect-ratio:1]"
                aria-label="Open menu" aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="size-5"/>
        </Button>
      </Stack>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <Col absolute hFull wFull noGap className="top-0 left-0 bg-bg-primary">
            {/* Fixed header */}
            <Stack sm row justifyBetween itemsCenter primary borderB wFull className="flex-shrink-0">
              <Logo/>
              <Button secondary sm aria-label="Close menu"
                      onClick={() => setIsMobileMenuOpen(false)} className="[--aspect-ratio:1]">
                <X className="size-5"/>
              </Button>
            </Stack>

            {/* Scrollable content */}
            <Stack sm className="flex-1 overflow-y-auto styled-scrollbar">
              <Button sm normal primary noShadow noRing wFull
                      href="/docs" tag={Link}
                      onClick={() => setIsMobileMenuOpen(false)}
              >
                Documentation
              </Button>
              <Button sm normal wFull
                      href={PRODUCT.githubUrl} tag="a" target="_blank" rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="GitHub repository (opens in new tab)"
              >
                <GitHub className="size-4" aria-hidden="true"/>
                GitHub
                <ArrowRight className="size-4" aria-hidden="true"/>
              </Button>
            </Stack>
          </Col>
        </div>
      )}
    </>
  );
}
