'use client';

import {
  PageTitle,
  Text,
  Section,
  Container,
  Col,
  Row,
  Button,
  Title,
  Card,
  Stack,
  Chip,
  Divider,
  Badge, ThemeProvider, Img, Code
} from '@vaneui/ui';
import { PRODUCT } from '../constants';
import { CodeBlock } from "../components/CodeBlock";
import Link from "next/link";
import { ArrowRight } from "react-feather";
import pkg from "@vaneui/ui/package.json";
import { dog } from "./data/dog";

// Written the way you would type it, so the sample carries no Tailwind classes
const cardCode = `<Card sm row noPadding noGap>
  <Img sm sharp src="/puppy.png" width={188} height={188}/>
  <Stack sm>
    <Row justifyBetween>
      <Title>Oliver</Title>
      <Chip sm fontBold>male</Chip>
    </Row>
    <Divider/>
    <Text sm>Oliver is a shy, sweet pup learning to trust.</Text>
    <Row sm justifyEnd>
      <Button success filled>Adopt</Button>
      <Button secondary>Learn more</Button>
    </Row>
  </Stack>
</Card>`;

export function HeroSection() {

  const gh = <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      fill="currentColor" />
  </svg>;

  const card =
    <Card sm row mobileStack noPadding noGap overflowHidden>
      <Img sm sharp src={dog.image} alt="" width={188} height={188} className="max-mobile:w-full" />
      <Stack sm>
        <Row justifyBetween>
          <Title tag="p">{dog.name}</Title>
          <Chip sm fontBold>{dog.gender}</Chip>
        </Row>
        <Divider />
        <Text sm>{dog.description}</Text>
        <Row sm mobileStack justifyEnd>
          <Button success filled className="max-mobile:w-full">Adopt</Button>
          <Button secondary className="max-mobile:w-full">Learn more</Button>
        </Row>
      </Stack>
    </Card>;

  return (
    <Section xl relative borderB secondary overflowHidden className="pb-0">
      <Container xs>
        <Col xl itemsCenter>
          <Badge normalCase fontLight xl primary className="break-words">
            {gh} v{pkg.version} · MIT licensed
          </Badge>
          <PageTitle xl primary fontSans textCenter fontMedium>
            {PRODUCT.slogan}
          </PageTitle>
          <Text lg primary textCenter>{PRODUCT.description}</Text>
          <Row mobileStack justifyCenter wFull>
            <Button lg filled className="max-mobile:w-full" tag={Link} href="/docs/getting-started/installation">
              Get Started <ArrowRight aria-hidden="true" />
            </Button>
            <Button lg className="max-mobile:w-full" target="_blank" rel="noopener noreferrer" href={PRODUCT.githubUrl} tag="a"
                    aria-label="View on GitHub (opens in new tab)">
              View on GitHub
            </Button>
          </Row>
          <Text sm secondary textCenter>or run <Code>npm install @vaneui/ui</Code></Text>
        </Col>
      </Container>
      <Container sm itemsCenter className="z-10 -mb-4 pt-8">
        <Col itemsCenter wFull>
          <Col inert
            className="[--b:8px] max-w-xl max-mobile:max-w-80 z-20 border-(length:--b) [--br-unit:4] rounded-[calc(var(--b)+var(--br))] border-gray-300/10 backdrop-blur-sm shadow-2xl">
            <ThemeProvider mergeStrategy="replace">
              {card}
            </ThemeProvider>
          </Col>
          <CodeBlock className="z-0 lg:-mt-[calc(var(--spacing)*16)] shadow-xl max-h-[380px]"
            fileName="DogCard.tsx"
            language="tsx"
            code={cardCode}
          />
        </Col>
      </Container>
    </Section>
  );
}
