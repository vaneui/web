"use client";

import React from 'react';
import { Container, Row, Col } from '@vaneui/ui';
import { DocsNav } from './DocsNav';
import { Header } from '../components/Header';
import { usePathname } from 'next/navigation';

interface ComponentLayoutProps {
  children: React.ReactNode;
}

export function DocsPageLayout({children}: ComponentLayoutProps) {
  const pathname = usePathname();

  return (
    <Col noGap className="h-screen">
      <Header/>
      <Row noGap className="w-full flex-1 overflow-hidden" style={{alignItems: 'normal'}}>
        <Col
          className="flex-shrink-0 overflow-y-auto styled-scrollbar max-w-xs py-6 px-8 lg:pr-10 border-r z-10 bg-white">
          <DocsNav currentPath={pathname}/>
        </Col>
        <Col relative
             className="flex-1 overflow-y-auto styled-scrollbar bg-[linear-gradient(to_right,var(--color-gray-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-100)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*6)_calc(var(--spacing)*6)]"
        >
          <Container default lg className="border-x flex-1">
            {children}
          </Container>
        </Col>
      </Row>
    </Col>
  );
}