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
      <Row className="flex-1 overflow-hidden" style={{alignItems: 'normal'}}>
        <Col className="flex-shrink-0 overflow-y-auto styled-scrollbar max-w-xs py-6 px-8 lg:pr-10 border-r">
          <DocsNav currentPath={pathname}/>
        </Col>
        <Container default lg className="border-x px-10 flex-1 overflow-y-auto styled-scrollbar">
          <Container sm>
            <Col className="py-10 w-full">
              {children}
            </Col>
          </Container>
        </Container>
      </Row>
    </Col>
  );
} 
