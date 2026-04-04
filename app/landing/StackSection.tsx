import {
  Section,
  Container,
  Col,
  Row,
  Chip,
  Title,
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
            <Badge shadow accent normalCase medium xl>React 19</Badge>
            <Badge shadow success normalCase medium xl>Tailwind CSS v4</Badge>
            <Badge shadow info normalCase medium xl>TypeScript</Badge>
            <Badge shadow warning normalCase medium xl>Next.js</Badge>
            <Badge shadow link normalCase medium xl>Vite</Badge>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}
