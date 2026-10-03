'use client'

import {
  Section,
  Container,
  Row,
  Button,
  Text,
  Card,
} from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { PRODUCT } from '../constants';
import Link from 'next/link';
import { SectionHeader } from './SectionHeader';

export function GetStartedSection() {
  return (
    <Section xl>
      <Container xl>
        <Card xl wFull>
          <SectionHeader title="Start building">
            Install the package, import one stylesheet and render your first component.
          </SectionHeader>
          <CodeBlock code="npm install @vaneui/ui" language="bash" theme="light" />
          <Text secondary>Then import the styles. On Tailwind CSS v4, follow the Tailwind setup in the Installation guide instead.</Text>
          <CodeBlock code={'@import "@vaneui/ui/css";'} language="css" theme="light" />
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
