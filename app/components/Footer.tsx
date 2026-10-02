import { Text, Section, Container, Col, Row, Link } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import { Logo } from './Logo';

export function Footer() {
  return (
    <Section xl tag={'footer'} secondary borderT>
      <Container xl itemsStart>
        <Row xl justifyBetween mobileStack itemsStart wFull>
          <Col className="max-w-1/3 max-md:max-w-full">
            <Logo/>
            <Text>
              {PRODUCT.description}
            </Text>
            <Text secondary sm>
              {PRODUCT.copyright}
            </Text>
          </Col>
          {
            [
              {
                text: 'Resources',
                links: [
                  {text: 'Documentation', href: '/docs'},
                  {text: 'Playground', href: '/playground'},
                  {text: 'Core Concepts', href: '/docs/getting-started/core-concepts'},
                  {text: 'Installation', href: '/docs/getting-started/installation'},
                  {text: 'Changelog', href: '/docs/reference/changelog'},
                ]
              },
              {
                text: 'Community',
                links: [
                  {text: 'GitHub', href: PRODUCT.githubUrl},
                  {text: 'npm', href: 'https://www.npmjs.com/package/@vaneui/ui'},
                  {text: 'MCP server', href: 'https://www.npmjs.com/package/@vaneui/mcp'},
                  {text: 'MIT License', href: 'https://github.com/vaneui/vaneui/blob/main/LICENSE'},
                ]
              }
            ].map((item, index) => (
              <Col sm key={index}>
                <Text tertiary uppercase fontMedium>
                  {item.text}
                </Text>
                <Col xs>
                  {item.links.map((link, index) => (
                    <Link sm secondary noUnderline key={index} href={link.href}
                          external={link.href.startsWith('http')}>
                      {link.text}
                    </Link>
                  ))}
                </Col>
              </Col>
            ))
          }
        </Row>
      </Container>
    </Section>
  );
}
