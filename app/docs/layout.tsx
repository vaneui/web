"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Stack, Button, IconButton, Text, Modal, ModalBody } from '@vaneui/ui';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, X } from "react-feather";
import '../landing/landing.css';
import { DocsNav } from './DocsNav';
import { docsSections } from './docsSections';
import { Logo } from "../components/Logo";
import { LandingHeader, MAIN_CONTENT_ID } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { FRAME } from '../landing/frame';

interface DocsLayoutProps {
  children: React.ReactNode;
}

const MOBILE_NAV_ID = 'docs-mobile-nav';
// The menu button (`tabletShow`) is hidden from this width up
const DESKTOP_QUERY = '(min-width: 64rem)';

/** Docs in the landing's blueprint frame: site header, railed sidebar, the page, site footer */
export default function DocsLayout({children}: DocsLayoutProps) {
  const pathname = usePathname();
  // The page the menu was opened on, so any navigation (a link, the back button) closes it
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  if (menuOpenOn !== null && menuOpenOn !== pathname) setMenuOpenOn(null);
  const isMobileMenuOpen = menuOpenOn !== null && menuOpenOn === pathname;
  const closeMenu = () => setMenuOpenOn(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const section = docsSections.find(s => pathname?.startsWith(`/docs/${s.slug}/`));

  // Widening the window past the breakpoint hides the menu button, so the dialog must not keep the page locked
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => { if (desktop.matches) setMenuOpenOn(null); };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, [isMobileMenuOpen]);

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

          {/* The skip link's target: focusable from script only, and no ring around the whole region */}
          <Col noGap flex1 tag="main" id={MAIN_CONTENT_ID} tabIndex={-1} className="min-w-0 outline-none">
            {/* Below 1024px the sidebar is hidden, so a bar under the header opens it */}
            <Row sm sticky primary borderB justifyBetween tabletShow className="top-14 z-30 px-2 py-1.5">
              {/* The dialog exists only while open, so that is when aria-controls can point at it */}
              <Button ghost secondary onClick={() => setMenuOpenOn(pathname)}
                      aria-haspopup="dialog" aria-expanded={isMobileMenuOpen}
                      aria-controls={isMobileMenuOpen ? MOBILE_NAV_ID : undefined}>
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

      {/* Mobile sidebar: a full-screen dialog, so focus moves in and stays, Escape closes it, the page
          behind is inert and does not scroll, and focus returns to the menu button. It fills the overlay
          (the visible viewport) and appears at once, like the page it covers. */}
      <Modal id={MOBILE_NAV_ID} open={isMobileMenuOpen} onClose={closeMenu} initialFocus={closeButtonRef}
             aria-label="Documentation menu"
             // The body is the whole nav: as a description, screen readers would read every link on open
             aria-describedby={undefined}
             sharp noShadow noGap hFull noAnimation overlayProps={{transparent: true}}
             className="lp-site max-w-none max-h-none">
        <Row noGap borderB justifyBetween noShrink className="h-14 pl-4">
          {/* Closing first returns focus to the menu button before the docs layout unmounts */}
          <Logo onClick={closeMenu}/>
          <Row justifyCenter borderL hFull className="w-14">
            <IconButton ref={closeButtonRef} ghost secondary onClick={closeMenu} aria-label="Close menu">
              <X aria-hidden="true"/>
            </IconButton>
          </Row>
        </Row>
        <ModalBody noPadding noGap tag="nav" aria-label="Documentation" className="styled-scrollbar">
          <Stack xl>
            <DocsNav currentPath={pathname} onMenuItemClickAction={closeMenu}/>
          </Stack>
        </ModalBody>
      </Modal>
    </Col>
  );
}
