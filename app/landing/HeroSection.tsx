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

  const card =
    <Card sm row mobileCol noPadding noGap overflowHidden>
      <Img sm sharp src={dog.image} className="max-mobile:w-full w-[188px] h-full"/>
      <Stack sm>
        <Row justifyBetween>
          <Title>{dog.name}</Title>
          <Chip sm bold>{dog.gender}</Chip>
        </Row>
        <Divider/>
        <Text sm>{dog.description}</Text>
        <Row sm mobileCol justifyEnd>
          <Button sm success filled className="max-mobile:w-full">Adopt</Button>
          <Button sm secondary className="max-mobile:w-full">Learn more</Button>
        </Row>
      </Stack>
    </Card>;

  return (
    <Section xl relative borderB
             className="bg-gradient-to-r from-slate-100 via-white to-slate-100 pb-0 overflow-hidden">
      <Row absolute
           className="inset-0 bg-[radial-gradient(var(--color-slate-200)_1px,transparent_1px)] [background-size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"/>
      <Container xs className="z-10">
        <Col xl itemsCenter>
          <Badge normalCase light className={"break-words"}>
            <Image src={githubMark} alt="GitHub" className="h-6 w-6"/>
            Open source components
          </Badge>
          <PageTitle xl sans textCenter medium>
            {PRODUCT.slogan}
          </PageTitle>
          <Text lg textCenter>{PRODUCT.description}</Text>
          <Row mobileCol justifyCenter className="w-full">
            <Button lg filled className="max-sm:w-full" tag={Link} href="/docs/getting-started/installation">
              Get Started <Play/>
            </Button>
            <Button lg className="max-sm:w-full" target="_blank" href={PRODUCT.githubUrl} tag={Link}>
              View on GitHub
            </Button>
          </Row>
        </Col>
      </Container>
      <Container sm itemsCenter className="z-10 -mb-4 pt-8">
        <Col itemsCenter className="w-full">
          <Col
            className="[--b:8px] max-w-xl max-sm:max-w-80 z-20 border-(length:--b) [--br-unit:4] rounded-[calc(var(--b)+var(--br))] border-gray-500/10 backdrop-blur-sm ring ring-gray-100/50">
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
