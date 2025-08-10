import {
  Text,
  Container,
  Col,
  SectionTitle,
  Row,
  Card,
  Button
} from '@vaneui/ui';
import { Box } from "react-feather";
import { CodeBlock } from "../components/CodeBlock";

export function BasicComponentsSection() {
  return (
    <Container xl>
      <Card xl className="w-full overflow-hidden">
        <Row lg smCol itemsStart className="w-full">
          <Card sm secondary justifyCenter itemsCenter className="overflow-clip">
            <Box className="size-8"/>
          </Card>
          <Col xs>
            <SectionTitle sm>Basic components</SectionTitle>
            <Text>VaneUI combines the flexibility of Tailwind CSS with the structure of a
              component library, giving you the best of both worlds.</Text>
          </Col>
        </Row>
        <Card secondary overflowHidden className="-ml-16">
          <Row xl lgCol className="ml-12">
            <Card overflowHidden className="w-full">
              <Col>
                <Text>Use the default UI components, like Buttons:</Text>
                <Row>
                  <Button filled>Filled button</Button>
                  <Button outline>Outline button</Button>
                  <Button success>Default button</Button>
                </Row>
              </Col>
            </Card>
            <CodeBlock className="shadow-lg -mb-12"
                       fileName="BasicComponents.tsx"
                       language="tsx"
                       code={`<Col>
  <Text>Use the default UI components, like Buttons:</Text>
  <Row>
    <Button filled>Filled button</Button>
    <Button outline>Outline button</Button>
    <Button success>Default button</Button>
  </Row>
</Col>

`}
            />
          </Row>
        </Card>
      </Card>
    </Container>
  );
} 