'use client';

import React from 'react';
import Link from 'next/link';
import { Row, Container, Button, IconButton, Divider, Chip, Text, Menu, MenuItem } from '@vaneui/ui';
import { Menu as MenuIcon } from 'react-feather';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { NAV, PRODUCT, VERSION } from './content';
import { Crosshairs, FRAME, GitHubMark } from './frame';

export function LandingHeader() {
  return (
    <Row tag="header" sticky borderB noGap justifyCenter className="lp-header top-0 z-40">
      <Container lg row noGap borderX itemsStretch relative className={`${FRAME} h-14`}>
        <Crosshairs bottom/>
        {/* Brand cell */}
        <Row sm noShrink className="px-5 max-mobile:px-4">
          <Logo/>
          <Chip xs fontMono primary>v{VERSION}</Chip>
        </Row>
        <Divider vertical/>

        {/* Nav cells */}
        <Row noGap itemsStretch tabletHide tag="nav" aria-label="Main">
          {NAV.map(item => (
            <React.Fragment key={item.label}>
              <Button sm ghost sharp secondary fontNormal noInsetRing hFull tag={Link} href={item.href}
                      className="px-5">
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
        <Row justifyCenter className="w-14 max-mobile:w-12 lg:hidden">
          <Menu trigger={<IconButton sm ghost secondary aria-label="Open menu"><MenuIcon aria-hidden="true"/></IconButton>}>
            {NAV.map(item => (
              <MenuItem key={item.label} tag={Link} href={item.href}>{item.label}</MenuItem>
            ))}
          </Menu>
        </Row>
        <Divider vertical className="lg:hidden"/>
        <Row className="px-3">
          <Button sm pill tag="a" href={PRODUCT.githubUrl} target="_blank" rel="noopener noreferrer"
                  aria-label="VaneUI on GitHub (opens in a new tab)">
            <GitHubMark className="size-3.5"/>
            <Text tag="span" inheritSize mobileHide>GitHub</Text>
          </Button>
        </Row>
      </Container>
    </Row>
  );
}
