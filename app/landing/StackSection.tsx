import {
  Section,
  Container,
  Col,
  Row,
  Text,
  Badge,
  SectionTitle,
} from '@vaneui/ui';
import { Layers } from 'react-feather';

export function StackSection() {
  return (
    <Section xl relative borderY secondary>
      <Container xl>
        <Col xl itemsCenter>
          <Col xs itemsCenter>
            <Layers className="size-8"/>
            <SectionTitle primary textCenter>Built on modern tools</SectionTitle>
            <Text secondary textCenter>VaneUI works with any React framework. No CSS-in-JS runtime: use it with Tailwind CSS v4, or import the prebuilt stylesheet without Tailwind.</Text>
          </Col>
          <Row lg flexWrap justifyCenter>
            <Badge shadow normalCase fontMedium xl>React 18 and 19</Badge>
            <Badge shadow normalCase fontMedium xl>Tailwind CSS v4</Badge>
            <Badge shadow normalCase fontMedium xl>TypeScript</Badge>
            <Badge shadow normalCase fontMedium xl>Next.js</Badge>
            <Badge shadow normalCase fontMedium xl>Vite</Badge>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}
