import { Section, Container, Col, Grid2, Card, Title, Text, Button } from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { FeatureTitle } from '../components/FeatureTitle';

export function AiSection() {
  return (
    <Section xl borderY secondary>
      <Container xl>
        <Col xl wFull>
          <FeatureTitle
            icon="Cpu"
            title="Ready for AI coding agents"
            description="Give your agent the real docs and prop tables, so it writes valid VaneUI props instead of guessing."
          />
          <Grid2 lg wFull>
            <Card lg>
              <Title>MCP server</Title>
              <Text secondary>
                @vaneui/mcp serves every component page plus a prop table per component to Claude Code, Claude Desktop, Cursor, VS Code and other MCP clients.
              </Text>
              <CodeBlock code="claude mcp add vaneui -- npx -y @vaneui/mcp" language="bash" />
              <Button href="https://www.npmjs.com/package/@vaneui/mcp" target="_blank" rel="noopener noreferrer">
                Set up the MCP server
              </Button>
            </Card>
            <Card lg>
              <Title>llms.txt</Title>
              <Text secondary>
                The whole documentation as one plain-text file for tools and models that read llms.txt.
              </Text>
              <CodeBlock code="https://vaneui.com/llms-full.txt" language="bash" />
              <Button href="/llms.txt">Open llms.txt</Button>
            </Card>
          </Grid2>
        </Col>
      </Container>
    </Section>
  );
}
