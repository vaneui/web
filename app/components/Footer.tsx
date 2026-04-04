import { Text, Title, Section, Container, Col, Row, Link } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Image from "next/image";
import vaneui from "../../public/vaneui.svg";

export function Footer() {
  return (
    <Section tag={'footer'} secondary borderT>
      <Container xl itemsStart>
        <Row xl justifyBetween mobileCol itemsStart wFull>
          <Col className="max-w-1/3 max-md:max-w-full">
            <Row xs>
              <Image src={vaneui} alt={PRODUCT.title} className="h-[27px] w-[36px]"/>
              <Title sm>
                {PRODUCT.title}
              </Title>
            </Row>
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
                  {text: 'Core Concepts', href: '/docs/getting-started/core-concepts'},
                  {text: 'Installation', href: '/docs/getting-started/installation'},
                ]
              },
              {
                text: 'Community',
                links: [
                  {text: 'GitHub', href: PRODUCT.githubUrl},
                  {text: 'npm', href: 'https://www.npmjs.com/package/@vaneui/ui'},
                ]
              }
            ].map((item, index) => (
              <Col sm key={index}>
                <Text tertiary uppercase medium>
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
