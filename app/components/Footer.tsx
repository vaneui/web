import { Link, Text, Title, Section, Container, Col, Row, Grid3 } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Image from "next/image";
import vaneui from "../../public/vaneui.svg";

export function Footer() {
  return (
    <Section tag={'footer'} secondary className="border-t">
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
                links: [{text: 'Documentation', href: '/docs'}, {text: 'GitHub', href: PRODUCT.githubUrl}]
              },
              {
                text: 'Social',
                links: [{text: 'GitHub', href: PRODUCT.githubUrl},]
              }
            ].map((item, index) => (
              <Col key={index}>
                <Text secondary uppercase>
                  {item.text}
                </Text>
                <Col sm>
                  {item.links.map((link, index) => (
                    <Link key={index} href={link.href}>
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
