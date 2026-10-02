'use client'

import { Row, Button, Stack, Col, IconButton } from '@vaneui/ui';
import { ThemeToggle } from './ThemeToggle';
import { PRODUCT } from '../constants';
import Link from 'next/link'
import { ArrowRight, GitHub, Menu, X } from "react-feather";
import { Logo } from "./Logo";
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Stack sm row justifyBetween itemsCenter tag={'header'} primary borderB noShrink wFull>
        <Logo/>

        {/* Desktop menu items - hidden on mobile */}
        <Row tabletHide>
          <Button sm fontNormal ghost href="/docs" tag={Link}>
            Documentation
          </Button>
          <Button sm fontNormal ghost href="/playground" tag={Link}>
            Playground
          </Button>
          <ThemeToggle/>
          <Button sm fontNormal href={PRODUCT.githubUrl} tag="a" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub repository (opens in new tab)">
            <GitHub className="size-4" aria-hidden="true"/>
            GitHub
            <ArrowRight className="size-4" aria-hidden="true"/>
          </Button>
        </Row>

        {/* Mobile menu button - shown only on mobile */}
        <Row xs className="lg:hidden">
          <ThemeToggle/>
          <IconButton aria-label="Open menu" aria-expanded={isMobileMenuOpen}
                      onClick={() => setIsMobileMenuOpen(true)}>
            <Menu/>
          </IconButton>
        </Row>
      </Stack>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <Col absolute hFull wFull noGap className="top-0 left-0 bg-bg-primary">
            {/* Fixed header */}
            <Stack sm row justifyBetween itemsCenter primary borderB wFull noShrink>
              <Logo/>
              <Button secondary sm aria-label="Close menu"
                      onClick={() => setIsMobileMenuOpen(false)} className="[--aspect-ratio:1]">
                <X className="size-5"/>
              </Button>
            </Stack>

            {/* Scrollable content */}
            <Stack sm flex1 overflowYAuto className="styled-scrollbar">
              <Button sm fontNormal primary noShadow noInsetRing wFull
                      href="/docs" tag={Link}
                      onClick={() => setIsMobileMenuOpen(false)}
              >
                Documentation
              </Button>
              <Button sm fontNormal primary noShadow noInsetRing wFull
                      href="/playground" tag={Link}
                      onClick={() => setIsMobileMenuOpen(false)}
              >
                Playground
              </Button>
              <Button sm fontNormal wFull
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
