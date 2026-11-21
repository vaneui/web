import type { ReactNode } from "react";
import { Button, Col, IconButton, Menu, MenuItem, NavLink, PageTitle, Row, Stack, Text } from "@vaneui/ui";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/settings", label: "Settings" },
];

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function AppShell({ current = "/projects", children }: { current?: string; children?: ReactNode }) {
  return (
    <Col noGap className="min-h-dvh">
      <Row tag="header" justifyBetween sticky primary borderB padding className="z-10">
        <Row sm>
          <Menu trigger={<IconButton tabletShow ghost secondary aria-label="Open navigation"><MenuIcon /></IconButton>}>
            {nav.map((item) => (
              <MenuItem key={item.href} href={item.href} aria-current={item.href === current ? "page" : undefined}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
          <Text fontBold>Acme</Text>
        </Row>
        <Button ghost secondary>Help</Button>
      </Row>
      <Row noGap itemsStretch flex1>
        <Stack tag="nav" aria-label="Main" sm noGap tabletHide borderR noShrink className="w-60">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} active={item.href === current}>
              {item.label}
            </NavLink>
          ))}
        </Stack>
        <Stack tag="main" flex1 className="min-w-0">
          <Row justifyBetween flexWrap>
            <PageTitle>Projects</PageTitle>
            <Button filled>New project</Button>
          </Row>
          {children ?? <Text secondary>Your projects appear here.</Text>}
        </Stack>
      </Row>
    </Col>
  );
}
