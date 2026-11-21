import { Button, Card, Col, Container, Grid3, IconButton, Menu, MenuItem, NavLink, PageTitle, Row, Section, SectionTitle, Text, Title } from "@vaneui/ui";

const nav = [
  { href: "/product", label: "Product" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
];
const features = [
  { title: "Fast setup", text: "Install one package and import one stylesheet." },
  { title: "Readable code", text: "Props say what the element is, not how it is drawn." },
  { title: "Themes", text: "Change colors, sizes and defaults in one provider." },
  { title: "Accessible parts", text: "Dialogs, menus and fields come with focus handling." },
  { title: "Dark mode", text: "One attribute switches every component." },
  { title: "Typed", text: "Every prop is in the types, with its default." },
];

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function Landing() {
  return (
    <Col noGap>
      <Section tag="header" sm borderB>
        <Container itemsStretch>
          <Row justifyBetween>
            <Text fontBold>Acme</Text>
            <Row tag="nav" aria-label="Main" xs tabletHide>
              {nav.map((n) => <NavLink key={n.href} href={n.href} wFit>{n.label}</NavLink>)}
              <Button href="/signup" filled>Start free</Button>
            </Row>
            <Menu trigger={<IconButton tabletShow ghost secondary aria-label="Open navigation"><MenuIcon /></IconButton>}>
              {nav.map((n) => <MenuItem key={n.href} href={n.href}>{n.label}</MenuItem>)}
              <MenuItem href="/signup">Start free</MenuItem>
            </Menu>
          </Row>
        </Container>
      </Section>

      <Section tag="main" lg>
        <Container itemsStretch>
          <Row tabletStack itemsStretch xl>
            <Col flex1 justifyCenter className="min-w-0">
              <PageTitle className="text-balance">Ship the dashboard this week</PageTitle>
              <Text lg secondary>Components that read like the design, so the first version is close to the final one.</Text>
              <Row mobileStack itemsStretch>
                <Button href="/signup" filled md mobileWFull>Start free</Button>
                <Button href="/docs" secondary md mobileWFull>Read the docs</Button>
              </Row>
            </Col>
            <Card flex1 secondary filled noPadding overflowHidden className="min-w-0 aspect-video" role="img" aria-label="Product screenshot" />
          </Row>
        </Container>
      </Section>

      <Section>
        <Container itemsStretch>
          <Col lg>
            <Col xs>
              <SectionTitle>What you get</SectionTitle>
              <Text secondary>Six things that save time on every screen.</Text>
            </Col>
            <Grid3>
              {features.map((f) => (
                <Card key={f.title}>
                  <Title>{f.title}</Title>
                  <Text secondary>{f.text}</Text>
                </Card>
              ))}
            </Grid3>
          </Col>
        </Container>
      </Section>

      <Section primary filled>
        <Container itemsStretch>
          <Row justifyBetween mobileStack itemsStretch>
            <Col xs>
              <SectionTitle>Start building today</SectionTitle>
              <Text>Free for personal projects.</Text>
            </Col>
            <Button href="/signup" secondary filled md mobileWFull>Create an account</Button>
          </Row>
        </Container>
      </Section>

      <Section tag="footer" sm borderT>
        <Container itemsStretch>
          <Row justifyBetween mobileStack itemsStretch>
            <Text sm secondary>© 2026 Acme</Text>
            <Row tag="nav" aria-label="Footer" noGap flexWrap>
              {nav.map((n) => <NavLink key={n.href} href={n.href} secondary wFit>{n.label}</NavLink>)}
            </Row>
          </Row>
        </Container>
      </Section>
    </Col>
  );
}
