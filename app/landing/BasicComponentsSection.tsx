'use client'

import React from 'react';
import {
  Text,
  Container,
  Col,
  SectionTitle,
  Row,
  Card,
  Button,
  Badge,
  Chip
} from '@vaneui/ui';
import { Box } from "react-feather";
import { CodeBlock } from "../components/CodeBlock";
import { VerticalCarousel, type CarouselItem } from "../components/VerticalCarousel";
import { prepareComponentString } from "../utils/stringUtils";

export function BasicComponentsSection() {

  // Create carousel items for different basic components
  const carouselItems: CarouselItem[] = React.useMemo(() => [
    {
      id: 'buttons',
      title: 'Button Components',
      component: (
        <Row flexWrap>
          <Button filled primary>Filled Primary</Button>
          <Button outline success>Outline Success</Button>
          <Button danger>Default Danger</Button>
          <Button filled secondary>Filled Secondary</Button>
          <Button outline warning>Outline Warning</Button>
        </Row>
      )
    },
    {
      id: 'badges',
      title: 'Badge Components',
      component: (
        <Row flexWrap>
          <Badge primary>Primary badge</Badge>
          <Badge success>Success badge</Badge>
          <Badge warning>Warning badge</Badge>
          <Badge danger>Danger badge</Badge>
          <Badge secondary>Secondary badge</Badge>
        </Row>
      )
    },
    {
      id: 'chips',
      title: 'Chip Components',
      component: (
        <Row flexWrap>
          <Chip xs>Extra small chip</Chip>
          <Chip sm>Small chip</Chip>
          <Chip md>Medium chip</Chip>
          <Chip lg>Large chip</Chip>
          <Chip xl>Extra large chip</Chip>
        </Row>
      )
    }
  ], []);

  const [activeItem, setActiveItem] = React.useState<CarouselItem | null>(carouselItems[0]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleActiveItemChange = React.useCallback((item: CarouselItem, _index: number) => {
    setActiveItem(item);
  }, []);

  return (
    <Container xl>
      <Card xl className="w-full overflow-hidden">
        <Row lg smCol itemsStart className="w-full">
          <Card sm secondary justifyCenter itemsCenter className="overflow-clip">
            <Box className="size-8"/>
          </Card>
          <Col xs>
            <SectionTitle sm>Basic components</SectionTitle>
            <Text>Essential UI elements built for consistency and speed. Buttons, badges, and chips that work seamlessly together with flexible styling options.</Text>
          </Col>
        </Row>
        <Card secondary overflowHidden className="-ml-16">
          <Row xl lgCol className="ml-12">
            <VerticalCarousel className="w-full -mb-8"
                              items={carouselItems}
                              onActiveItemChange={handleActiveItemChange}
            />
            <CodeBlock
              className="shadow-lg"
              fileName={`${activeItem?.title?.replace(' ', '') || 'BasicComponents'}.tsx`}
              language="tsx"
              code={activeItem ? prepareComponentString(activeItem.component) : ''}
            />
          </Row>
        </Card>
      </Card>
    </Container>
  );
} 