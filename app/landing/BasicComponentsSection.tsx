import {
  Text,
  Section,
  Container,
  Col,
  SectionTitle,
  Row,
  Title,
  Grid3, Stack, Card, Button, Divider, Badge, Chip
} from '@vaneui/ui';
import { Box, Settings, Sliders, Zap } from "react-feather";
import { CodeBlock } from "../components/CodeBlock";

export function BasicComponentsSection() {
  return (
    <Section>
      <Container xl>
        <Card xl className="w-full">
          <Row xl smCol itemsStart className="w-full">
            <Card sm secondary justifyCenter itemsCenter className="overflow-clip">
              <Box className="size-8"/>
            </Card>
            <Col xs>
              <SectionTitle sm>Basic components</SectionTitle>
              <Text>VaneUI combines the flexibility of Tailwind CSS with the structure of a
                component library, giving you the best of both worlds.</Text>
            </Col>
          </Row>
          <Card secondary xl className="-ml-16 opacity-75 hover:opacity-100 transition-opacity duration-300">
            <Row xl lgCol className="ml-8">
              <Card className="w-full">
                  <Col>
                    <Text>Use the default UI components, like Buttons:</Text>
                    <Row>
                      <Button filled>Filled button</Button>
                      <Button outline>Outline button</Button>
                      <Button link>Link button</Button>
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
    <Button link>Link button</Button>
  </Row>
</Col>

`}
              />
            </Row>
          </Card>

          <Grid3>
            <Col md className="h-full p-6 border rounded-lg shadow-sm">
              <Zap className="w-12 h-12 text-indigo-500 mb-4"/>
              <Title sm>Lightning Fast</Title>
              <Text>Built with performance in mind, VaneUI components are lightweight and optimized for speed, ensuring
                your applications remain responsive.</Text>
            </Col>

            <Col md className="h-full p-6 border rounded-lg shadow-sm">
              <Sliders className="w-12 h-12 text-indigo-500 mb-4"/>
              <Title sm>Highly Customizable</Title>
              <Text>Every component is designed to be customized to fit your brand. Use Tailwind classes directly or
                leverage our theming system.</Text>
            </Col>

            <Col md className="h-full p-6 border rounded-lg shadow-sm">
              <Settings className="w-12 h-12 text-indigo-500 mb-4"/>
              <Title sm>Seamless Integration</Title>
              <Text>Works perfectly with your existing Tailwind projects. No conflicts, no overrides, just clean
                integration.</Text>
            </Col>
          </Grid3>

        </Card>
      </Container>
    </Section>
  );
} 