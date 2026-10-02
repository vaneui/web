'use client'

import {
  Section,
  Container,
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
          <CodeBlock code="npm install @vaneui/ui" language="bash" />
          <Text secondary>Then import the styles. On Tailwind CSS v4, follow the Tailwind setup in the Installation guide instead.</Text>
          <CodeBlock code={'@import "@vaneui/ui/css";'} language="css" />
          <Row mobileStack>
            <Button lg filled tag={Link} href="/docs/getting-started/installation">
              Read the Docs
            </Button>
            <Button lg tag={Link} href="/playground">
              Try the Playground
            </Button>
            <Button lg tag="a" href={PRODUCT.githubUrl} target="_blank" rel="noopener noreferrer"
                    aria-label="View VaneUI on GitHub (opens in new tab)">
              View on GitHub
            </Button>
          </Row>
        </Card>
      </Container>
    </Section>
  );
}
