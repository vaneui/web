import {
  Text,
  Container,
  Col,
  SectionTitle,
  Row,
  Card
} from '@vaneui/ui';
import { Box } from "react-feather";
import { CodeBlock } from "../components/CodeBlock";

export function TypographyComponentsSection() {

  const text = "The quick brown fox jumps over the lazy dog";

  return (
    <Container xl>
      <Card xl className="w-full overflow-hidden">
        <Row lg smCol itemsStart className="w-full">
          <Card sm secondary justifyCenter itemsCenter className="overflow-clip">
            <Box className="size-8"/>
          </Card>
          <Col xs>
            <SectionTitle sm>Typography</SectionTitle>
            <Text>Ready-to-use text components</Text>
          </Col>
        </Row>
        <Card secondary overflowHidden className="-ml-16">
          <Row xl lgCol className="ml-12">
            <Card overflowHidden className="w-full">
              <Col xs>
                <Text xl>{text}</Text>
                <Text lg>{text}</Text>
                <Text md>{text}</Text>
                <Text sm>{text}</Text>
                <Text xs>{text}</Text>
              </Col>
            </Card>
            <CodeBlock className="shadow-lg -mb-12"
                       fileName="BasicComponents.tsx"
                       language="tsx"
                       code={`<Col xs>
  <Text xl>${text}</Text>
  <Text lg>${text}</Text>
  <Text md>${text}</Text>
  <Text sm>${text}</Text>
  <Text xs>${text}</Text>
</Col>

`}
            />
          </Row>
        </Card>
      </Card>
    </Container>
  );
} 