"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Stack, Button, IconButton, Text } from '@vaneui/ui';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, X } from "react-feather";
import '../landing/landing.css';
import { DocsNav } from './DocsNav';
import { docsSections } from './docsSections';
import { Logo } from "../components/Logo";
import { LandingHeader } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { FRAME } from '../landing/frame';

interface DocsLayoutProps {
  children: React.ReactNode;
}

/** Docs in the landing's blueprint frame: site header, railed sidebar, the page, site footer */
export default function DocsLayout({children}: DocsLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const section = docsSections.find(s => pathname?.startsWith(`/docs/${s.slug}/`));

  return (
    <Col noGap primary className="lp-site min-h-screen">
      <LandingHeader/>

      <Row noGap justifyCenter itemsStretch flex1>
        <Container xl row noGap borderX itemsStretch relative className={FRAME}>
          {/* Sidebar: a full-height railed column; the list inside sticks below the header */}
          <Col noGap noShrink borderR tabletHide className="w-64">
            <Stack sticky overflowYAuto tag="nav" aria-label="Documentation"
                   className="styled-scrollbar top-14 max-h-[calc(100dvh-3.5rem)] px-4 py-8">
              <DocsNav currentPath={pathname}/>
            </Stack>
          </Col>

          <Col noGap flex1 tag="main" className="min-w-0">
            {/* Below 1024px the sidebar is hidden, so a bar under the header opens it */}
            <Row sm sticky primary borderB justifyBetween className="top-14 z-30 px-2 py-1.5 lg:hidden">
              <Button ghost secondary onClick={() => setIsMobileMenuOpen(true)}
                      aria-expanded={isMobileMenuOpen} aria-controls="docs-mobile-nav">
                <MenuIcon aria-hidden="true"/> Menu
              </Button>
              {section && <Text xs fontMono uppercase trackingWider tertiary truncate className="pr-2">{section.name}</Text>}
            </Row>
            <Stack xl relative wFull className="lg:py-12">
              {children}
            </Stack>
          </Col>
        </Container>
      </Row>

      <LandingFooter/>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <Col fixed primary noGap id="docs-mobile-nav" className="inset-0 z-50 lg:hidden">
          <Row noGap borderB justifyBetween noShrink className="h-14 pl-4">
            <Logo/>
            <Row justifyCenter borderL hFull className="w-14">
              <IconButton ghost secondary onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X aria-hidden="true"/>
              </IconButton>
            </Row>
          </Row>
          <Stack xl overflowYAuto flex1 tag="nav" aria-label="Documentation" className="styled-scrollbar">
            <DocsNav currentPath={pathname} onMenuItemClickAction={() => setIsMobileMenuOpen(false)}/>
          </Stack>
        </Col>
      )}
    </Col>
  );
}
