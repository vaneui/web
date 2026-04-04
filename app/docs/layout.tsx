"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Stack, Button } from '@vaneui/ui';
import { DocsNav } from './DocsNav';
import { Header } from '../components/Header';
import { usePathname } from 'next/navigation';
import { ChevronRight, X } from "react-feather";
import { Logo } from "../components/Logo";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({children}: DocsLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Col noGap className="h-screen">
      <Header/>
      <Row noGap overflowHidden wFull className="flex-1" style={{alignItems: 'normal'}}>
        {/* Desktop sidebar - always visible on xl screens */}
        <Stack overflowYAuto tag="nav" aria-label="Documentation"
               className="flex-shrink-0 styled-scrollbar border-(--color-border-primary) xl:border-r hidden lg:flex">
          <DocsNav currentPath={pathname}/>
        </Stack>

        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && (
          <Col fixed primary className="inset-0 z-50 lg:hidden">
            <Col noGap className="absolute left-0 top-0 h-full w-full bg-primary">
              {/* Fixed header */}
              <Stack sm row justifyBetween itemsCenter wFull className="border-b border-(--color-border-primary) flex-shrink-0">
                <Logo/>
                <Button secondary sm noShadow onClick={() => setIsMobileMenuOpen(false)} className="[--aspect-ratio:1]">
                  <X className="size-5"/>
                </Button>
              </Stack>

              {/* Scrollable content */}
              <Stack overflowYAuto className="flex-1 styled-scrollbar">
                <DocsNav currentPath={pathname} onMenuItemClickAction={() => setIsMobileMenuOpen(false)}/>
              </Stack>
            </Col>
          </Col>
        )}

        <Col noGap relative overflowYAuto tag="main"
             className="flex-1 bg-[linear-gradient(to_right,var(--color-gray-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-50)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"
             data-scroll-container
        >
          <Stack row sm borderB wFull className="border-(--color-border-primary) lg:hidden">
            <Button secondary sm noShadow
                    onClick={() => setIsMobileMenuOpen(true)}
            >
              MENU <ChevronRight className="size-5"/>
            </Button>
          </Stack>
          <Container xl primary borderX className="flex-1">
            <Stack xl relative wFull className="py-10">
              {children}
            </Stack>
          </Container>
        </Col>
      </Row>
    </Col>
  );
}