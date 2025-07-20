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
        <Button sm secondary noShadow className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="size-5"/>
        </Button>
      </Stack>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-gray-600/10 bg-opacity-50 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <Stack xs overflowYAuto flexNoWrap
                 className="absolute styled-scrollbar w-full h-screen bg-default">
            <Col xs>
              <Row itemsCenter justifyBetween className="w-full">
                <Logo/>
                <Button secondary sm noShadow onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="size-5"/>
                </Button>
              </Row>
              <Divider/>
            </Col>
            <Col lg>
              <Button
                sm
                normal
                default
                noShadow
                noRing
                tag={Link}
                href="/docs"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Documentation
              </Button>
              <Button
                sm
                normal
                tag={Link}
                href={PRODUCT.githubUrl}
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <GitHub className="size-4"/>
                GitHub
                <ArrowRight className="size-4"/>
              </Button>
            </Col>
          </Stack>
        </div>
      )}
    </>
  );
}
