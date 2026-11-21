import { Button, Card, Col, Container, Field, Grid2, NavLink, PageTitle, Row, Section, SectionTitle, Text, Title } from "@vaneui/ui";

const sections = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/billing", label: "Billing" },
  { href: "/settings/team", label: "Team" },
];

export function SettingsPage({ current = "/settings/profile" }: { current?: string }) {
  return (
    <Section>
      <Container itemsStretch>
        <Col lg>
          <Col xs>
            <PageTitle>Settings</PageTitle>
            <Text secondary>Manage your profile, notifications and billing.</Text>
          </Col>
          <Row tabletStack itemsStretch lg>
            <Col tag="nav" aria-label="Settings sections" noGap tabletHide noShrink className="w-56">
              {sections.map((s) => (
                <NavLink key={s.href} href={s.href} active={s.href === current}>{s.label}</NavLink>
              ))}
            </Col>
            <Row tag="nav" aria-label="Settings sections" noGap tabletShow overflowXAuto borderB>
              {sections.map((s) => (
                <NavLink key={s.href} href={s.href} active={s.href === current} indicatorBottom ghost sharp wFit>{s.label}</NavLink>
              ))}
            </Row>
            <Col flex1 lg className="min-w-0 max-w-2xl">
              <Col sm>
                <Col xs>
                  <SectionTitle>Profile</SectionTitle>
                  <Text secondary>This is how other people see you.</Text>
                </Col>
                <Card tag="form" onSubmit={(e) => e.preventDefault()}>
                  <Col>
                    <Grid2>
                      <Field type="text" label="First name" name="firstName" autoComplete="given-name" />
                      <Field type="text" label="Last name" name="lastName" autoComplete="family-name" />
                    </Grid2>
                    <Field type="email" label="Email" name="email" autoComplete="email" description="We never share it." />
                    <Field textarea label="Bio" name="bio" />
                    <Row justifyEnd mobileStack itemsStretch>
                      <Button type="button" secondary mobileWFull>Cancel</Button>
                      <Button type="submit" filled mobileWFull>Save changes</Button>
                    </Row>
                  </Col>
                </Card>
              </Col>
              <Col sm>
                <SectionTitle>Danger zone</SectionTitle>
                <Card danger>
                  <Row justifyBetween mobileStack itemsStretch>
                    <Col xs>
                      <Title>Delete account</Title>
                      <Text secondary>This removes your projects and cannot be undone.</Text>
                    </Col>
                    <Button type="button" danger mobileWFull>Delete account</Button>
                  </Row>
                </Card>
              </Col>
            </Col>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}
