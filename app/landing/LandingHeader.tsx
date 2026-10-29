'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Row, Container, Button, IconButton, Divider, Chip, Text, Menu, MenuItem, NavLink } from '@vaneui/ui';
import { Menu as MenuIcon } from 'react-feather';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { DocsSearch } from '../components/search/DocsSearch';
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

/** Site header, identical on every page so nothing shifts when moving between landing, docs and playground */
export function LandingHeader() {
  const current = useCurrentHref();
  return (
    <Row tag="header" sticky primary borderB noGap justifyCenter className="lp-chrome top-0 z-40">
      <Container xl row noGap borderX itemsStretch relative className={`${FRAME} h-14`}>
        <Crosshairs bottom/>
        {/* Brand cell: as wide as the docs sidebar, so on docs its divider continues the sidebar's rail */}
        <Row sm noShrink className="px-5 max-mobile:px-4 lg:w-[calc(16rem-1px)]">
          <Logo/>
          <Chip xs fontMono primary>v{VERSION}</Chip>
        </Row>
        <Divider vertical/>

        {/* Nav cells */}
        <Row noGap itemsStretch tabletHide tag="nav" aria-label="Main">
          {NAV.map(item => (
            <React.Fragment key={item.label}>
              <NavLink ghost sharp secondary={item.href !== current} active={item.href === current} indicatorBottom
                       fontNormal hFull wAuto tag={Link} href={item.href} className="px-5">
                {item.label}
              </NavLink>
              <Divider vertical/>
            </React.Fragment>
          ))}
        </Row>

        {/* Search fills the remaining width: a field on wide screens, an icon on phones */}
        <Row flex1 justifyEnd className="px-3 max-mobile:px-2">
          <DocsSearch className="w-56 max-desktop:w-44 max-tablet:w-64 max-mobile:w-auto"/>
        </Row>
        <Divider vertical/>
        <Row justifyCenter className="w-14 max-mobile:w-12">
          <ThemeToggle/>
        </Row>
        <Divider vertical/>
        {/* Below 1024px the nav cells are hidden, so the links move into a menu */}
        <Row tag="nav" aria-label="Main" justifyCenter tabletShow className="w-14 max-mobile:w-12">
          <Menu trigger={<IconButton ghost secondary aria-label="Open menu"><MenuIcon aria-hidden="true"/></IconButton>}>
            {NAV.map(item => (
              <MenuItem key={item.label} tag={Link} href={item.href}>{item.label}</MenuItem>
            ))}
          </Menu>
        </Row>
        <Divider vertical tabletShow/>
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
