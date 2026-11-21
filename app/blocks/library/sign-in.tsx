import { Button, Card, Col, Field, Link, Row, Section, Text, Title } from "@vaneui/ui";

export function SignIn() {
  return (
    <Section itemsCenter justifyCenter className="min-h-dvh">
      <Card tag="form" onSubmit={(e) => e.preventDefault()} wFull className="max-w-sm">
        <Col>
          <Col xs>
            <Text fontSemibold>Acme</Text>
            <Title tag="h1">Sign in</Title>
          </Col>
          <Field type="email" label="Email" name="email" autoComplete="email" required />
          <Field type="password" label="Password" name="password" autoComplete="current-password" required />
          <Button type="submit" filled md wFull>Sign in</Button>
          <Row justifyBetween flexWrap>
            <Link href="/forgot-password">Forgot password?</Link>
            <Link href="/signup">Create an account</Link>
          </Row>
        </Col>
      </Card>
    </Section>
  );
}
