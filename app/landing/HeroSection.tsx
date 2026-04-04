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
  Badge, ThemeProvider, Img
} from '@vaneui/ui';
import { PRODUCT } from '../constants';
import { CodeBlock } from "../components/CodeBlock";
import Link from "next/link";
import Image from "next/image";
import githubMark from './../../public/github-mark.svg'
import { Play } from "react-feather";
import { dog } from "./data/dog";
import { prepareComponentString } from "../utils/stringUtils";


export function HeroSection() {

  const gh = <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      fill="#24292f" />
  </svg>;

  const card =
    <Card sm row mobileCol noPadding noGap overflowHidden>
      <Img sm sharp src={dog.image} alt={dog.name} className="max-mobile:w-full w-[188px] h-full" />
      <Stack sm>
        <Row justifyBetween>
          <Title>{dog.name}</Title>
          <Chip sm bold>{dog.gender}</Chip>
        </Row>
        <Divider />
        <Text sm>{dog.description}</Text>
        <Row sm mobileCol justifyEnd>
          <Button sm success filled className="max-mobile:w-full">Adopt</Button>
          <Button sm secondary className="max-mobile:w-full">Learn more</Button>
        </Row>
      </Stack>
    </Card>;

  return (
    <Section xl relative borderB primary transparent
      className="z-20 bg-gradient-to-r from-slate-100 via-white to-slate-100 pb-0 overflow-hidden">
      <Row absolute
        className="inset-0 bg-[radial-gradient(var(--color-slate-200)_1px,transparent_1px)] [background-size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]" />
      <Container xs className="z-10">
        <Col xl itemsCenter>
          <Badge normalCase light className="break-words">
            {gh} v0.9.0 · Open Source
          </Badge>
          <PageTitle xl sans textCenter medium>
            {PRODUCT.slogan}
          </PageTitle>
          <Text lg textCenter>{PRODUCT.description}</Text>
          <Row mobileCol justifyCenter wFull>
            <Button lg filled className="max-mobile:w-full" tag={Link} href="/docs/getting-started/installation">
              Get Started <Play />
            </Button>
            <Button lg className="max-mobile:w-full" target="_blank" rel="noopener noreferrer" href={PRODUCT.githubUrl} tag={Link}>
              View on GitHub
            </Button>
          </Row>

        </Col>
      </Container>
      <Container sm itemsCenter className="z-10 -mb-4 pt-8">
        <Col itemsCenter wFull>
          <Col
            className="[--b:8px] max-w-xl max-mobile:max-w-80 z-20 border-(length:--b) [--br-unit:4] rounded-[calc(var(--b)+var(--br))] border-gray-300/10 backdrop-blur-sm shadow-2xl">
            <ThemeProvider mergeStrategy="replace">
              {card}
            </ThemeProvider>
          </Col>
          <CodeBlock className="z-0 lg:-mt-[calc(var(--spacing)*16)] shadow-xl"
            fileName="DogCard.tsx"
            language="tsx"
            code={prepareComponentString(card)}
          />
        </Col>
      </Container>
    </Section>
  );
}
