import { Badge, Button, Card, Col, Container, List, ListItem, PageTitle, Row, Section, Text, Title } from "@vaneui/ui";

const plans = [
  { name: "Starter", price: "$0", note: "For trying it out", features: ["1 project", "Community support"], href: "/signup?plan=starter" },
  { name: "Pro", price: "$12", note: "For one person shipping", features: ["Unlimited projects", "Custom domains", "Email support"], href: "/signup?plan=pro", popular: true },
  { name: "Team", price: "$40", note: "For teams up to 10", features: ["Everything in Pro", "Shared workspaces", "Roles and permissions", "Priority support"], href: "/signup?plan=team" },
];

export function Pricing() {
  return (
    <Section>
      <Container itemsStretch>
        <Col lg>
          <Col xs itemsCenter textCenter>
            <PageTitle>Pricing</PageTitle>
            <Text secondary>Start free. Upgrade when you need more.</Text>
          </Col>
          <Row mobileStack itemsStretch>
            {plans.map((p) => (
              <Card key={p.name} flex1 strongBorder={p.popular}>
                <Row justifyBetween>
                  <Title>{p.name}</Title>
                  {p.popular && <Badge filled>Most popular</Badge>}
                </Row>
                <Row xs itemsBaseline>
                  <Text xl fontBold className="tabular-nums">{p.price}</Text>
                  <Text sm secondary>per month</Text>
                </Row>
                <Text sm secondary>{p.note}</Text>
                <Col flex1>
                  <List>
                    {p.features.map((f) => <ListItem key={f}>{f}</ListItem>)}
                  </List>
                </Col>
                <Button href={p.href} filled={p.popular} md wFull>Choose {p.name}</Button>
              </Card>
            ))}
          </Row>
        </Col>
      </Container>
    </Section>
  );
}
