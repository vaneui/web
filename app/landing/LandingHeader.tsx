'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Row, Container, Button, IconButton, Divider, Chip, Text, Menu, MenuItem } from '@vaneui/ui';
import { Menu as MenuIcon } from 'react-feather';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { NAV, PRODUCT, VERSION } from './content';
import { Crosshairs, FRAME, GitHubMark } from './frame';

/** The current nav item: the longest matching href, so the changelog doesn't also light up Documentation */
function useCurrentHref() {
  const pathname = usePathname() ?? '';
  return NAV
    .map(item => item.href)
    .filter(href => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];
}

/** Site header; `wide` matches the 80rem docs frame instead of the 72rem landing frame */
export function LandingHeader({ wide = false }: { wide?: boolean }) {
  const current = useCurrentHref();
  return (
    <Row tag="header" sticky primary borderB noGap justifyCenter className="top-0 z-40">
      <Container lg={!wide} xl={wide} row noGap borderX itemsStretch relative className={`${FRAME} h-14`}>
        <Crosshairs bottom/>
        {/* Brand cell; on docs it matches the sidebar width so its divider continues the sidebar's rail */}
        <Row sm noShrink className={`px-5 max-mobile:px-4 ${wide ? 'lg:w-[calc(16rem-1px)]' : ''}`}>
          <Logo/>
          <Chip xs fontMono primary>v{VERSION}</Chip>
        </Row>
        <Divider vertical/>

        {/* Nav cells */}
        <Row noGap itemsStretch tabletHide tag="nav" aria-label="Main">
          {NAV.map(item => (
            <React.Fragment key={item.label}>
              <Button ghost sharp secondary={item.href !== current} fontNormal noInsetRing hFull relative
                      tag={Link} href={item.href} aria-current={item.href === current ? 'page' : undefined}
                      className="lp-tab px-5">
                {item.label}
              </Button>
              <Divider vertical/>
            </React.Fragment>
          ))}
        </Row>

        {/* Empty cell that fills the remaining width */}
        <Row flex1/>
        <Divider vertical/>
        <Row justifyCenter className="w-14 max-mobile:w-12">
          <ThemeToggle/>
        </Row>
        <Divider vertical/>
        {/* Below 1024px the nav cells are hidden, so the links move into a menu */}
        <Row tag="nav" aria-label="Main" justifyCenter className="w-14 max-mobile:w-12 lg:hidden">
          <Menu trigger={<IconButton ghost secondary aria-label="Open menu"><MenuIcon aria-hidden="true"/></IconButton>}>
            {NAV.map(item => (
              <MenuItem key={item.label} tag={Link} href={item.href}>{item.label}</MenuItem>
            ))}
          </Menu>
        </Row>
        <Divider vertical className="lg:hidden"/>
        <Row className="px-3">
          <Button pill tag="a" href={PRODUCT.githubUrl} target="_blank" rel="noopener noreferrer"
                  aria-label="VaneUI on GitHub (opens in a new tab)">
            <GitHubMark className="size-3.5"/>
            <Text tag="span" inheritSize mobileHide>GitHub</Text>
          </Button>
        </Row>
      </Container>
    </Row>
  );
}
