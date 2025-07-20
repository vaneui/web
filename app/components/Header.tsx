'use client'

import { Row, Button, Stack, Col, Divider } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Link from 'next/link'
import { ArrowRight, GitHub, Menu, X } from "react-feather";
import { Logo } from "./Logo";
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Stack xs row justifyBetween tag={'header'}
             className="flex-shrink-0 bg-white/70 backdrop-blur-md border-b z-40 w-full border-default">
        <Logo/>

        {/* Desktop menu items - hidden on mobile */}
        <Row className="hidden lg:flex">
          <Button sm normal default noShadow noRing tag={Link} href="/docs">
            Documentation
          </Button>
          <Button sm normal tag={Link} href={PRODUCT.githubUrl}>
            <GitHub className="size-4"/>
            GitHub
            <ArrowRight className="size-4"/>
          </Button>
        </Row>

        {/* Mobile menu button - shown only on mobile */}
        <Button sm secondary noShadow className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="size-5"/>
        </Button>
      </Stack>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-full bg-default flex flex-col">
            {/* Fixed header */}
            <Stack xs row justifyBetween className="w-full border-b border-default flex-shrink-0">
              <Logo/>
              <Button secondary sm noShadow onClick={() => setIsMobileMenuOpen(false)}>
                <X className="size-5"/>
              </Button>
            </Stack>

            {/* Scrollable content */}
            <Stack className="flex-1 overflow-y-auto styled-scrollbar" lg>
              <Button sm normal default noShadow noRing
                      tag={Link} href="/docs" className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
              >
                Documentation
              </Button>
              <Button sm normal tag={Link} href={PRODUCT.githubUrl}
                      className="w-full" onClick={() => setIsMobileMenuOpen(false)}
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
