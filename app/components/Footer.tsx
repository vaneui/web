import { Text, Title, Section, Container, Col, Row } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Image from "next/image";
import vaneui from "../../public/vaneui.svg";

export function Footer() {
  return (
    <Section tag={'footer'} secondary borderT>
      <Container xl itemsStart>
        <Row xl justifyBetween mdCol itemsStart className="w-full">
          <Col xl className="max-w-1/2 max-md:max-w-full">
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
                text: 'Social',
                links: [
                  {text: 'GitHub', href: PRODUCT.githubUrl},
                ]
              }
            ].map((item, index) => (
              <Col key={index}>
                <Text tertiary uppercase medium>
                  {item.text}
                </Text>
                <Col sm>
                  {item.links.map((link, index) => (
                    <Text sm tag="a" key={index} href={link.href} className="hover:opacity-75">
                      {link.text}
                    </Text>
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
