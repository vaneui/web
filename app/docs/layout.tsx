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
      <Row noGap overflowHidden className="w-full flex-1" style={{alignItems: 'normal'}}>
        {/* Desktop sidebar - always visible on xl screens */}
        <Stack xl overflowYAuto
               className="flex-shrink-0 styled-scrollbar border-default xl:border-r hidden lg:flex">
          <DocsNav currentPath={pathname}/>
        </Stack>

        {/* Mobile sidebar overlay */}
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
              <Stack className="flex-1 overflow-y-auto styled-scrollbar">
                <DocsNav currentPath={pathname} onMenuItemClick={() => setIsMobileMenuOpen(false)}/>
              </Stack>
            </div>
          </div>
        )}

        <Col noGap relative overflowYAuto
             className="flex-1 bg-[linear-gradient(to_right,var(--color-gray-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-50)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"
        >
          <Stack row sm className="w-full border-b border-default lg:hidden">
            <Button secondary sm noShadow pill
                    onClick={() => setIsMobileMenuOpen(true)}
            >
              MENU <ChevronRight className="size-5"/>
            </Button>
          </Stack>
          <Container default lg className="border-x flex-1 px-3">
            {children}
          </Container>
        </Col>
      </Row>
    </Col>
  );
}