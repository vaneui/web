'use client'

import {
  Section,
  Container,
  Col,
  Row,
  Button,
  Text,
  SectionTitle,
  Card,
} from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { PRODUCT } from '../constants';
import Link from 'next/link';

export function GetStartedSection() {
  return (
    <Section xl>
      <Container xl>
        <Card xl wFull>
          <SectionTitle>Ready to start building?</SectionTitle>
          <Text lg secondary>
            Install VaneUI and build your first component in minutes.
          </Text>
          <CodeBlock theme="light" code="npm install @vaneui/ui" language="bash" />
          <Row mobileCol>
            <Button lg filled tag={Link} href="/docs/getting-started/installation">
              Read the Docs
            </Button>
            <Button lg tag="a" href={PRODUCT.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Button>
          </Row>
        </Card>
      </Container>
    </Section>
  );
}
