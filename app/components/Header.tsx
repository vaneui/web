'use client'

import { Row, Button, Stack } from '@vaneui/ui';
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
        <Row className="hidden lg:flex">
          <Button sm normal primary noShadow noRing href="/docs" tag={Link}>
            Documentation
          </Button>
          <Button sm normal href={PRODUCT.githubUrl} tag="a" target="_blank" rel="noopener noreferrer">
            <GitHub className="size-4"/>
            GitHub
            <ArrowRight className="size-4"/>
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
          <div className="absolute left-0 top-0 h-full w-full bg-bg-primary flex flex-col">
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
              >
                <GitHub className="size-4"/>
                GitHub
                <ArrowRight className="size-4"/>
              </Button>
            </Stack>
          </div>
        </div>
      )}
    </>
  );
}
