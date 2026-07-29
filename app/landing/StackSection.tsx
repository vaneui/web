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
            <Text secondary textCenter>VaneUI works with any React framework. No runtime CSS — just Tailwind utility classes.</Text>
          </Col>
          <Row lg flexWrap justifyCenter>
            <Badge shadow accent normalCase fontMedium xl>React 19</Badge>
            <Badge shadow success normalCase fontMedium xl>Tailwind CSS v4</Badge>
            <Badge shadow info normalCase fontMedium xl>TypeScript</Badge>
            <Badge shadow warning normalCase fontMedium xl>Next.js</Badge>
            <Badge shadow link normalCase fontMedium xl>Vite</Badge>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}
