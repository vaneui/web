'use client'

import React from 'react';
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Badge,
  Chip
} from '@vaneui/ui';
import { CodeBlock } from "../components/CodeBlock";
import { VerticalCarousel, type CarouselItem } from "../components/VerticalCarousel";
import { FeatureTitle } from "../components/FeatureTitle";
import { prepareComponentString } from "../utils/stringUtils";

export function BasicComponentsSection() {

  // Create carousel items for different basic components
  const carouselItems: CarouselItem[] = React.useMemo(() => [
    {
      id: 'buttons',
      title: 'Button Components',
      component: (
        <Row flexWrap>
          <Button filled primary>Filled primary button</Button>
          <Button outline success>Outline success button</Button>
          <Button danger sharp>Danger sharp button</Button>
          <Button filled secondary>Filled secondary</Button>
          <Button warning pill>Outline warning</Button>
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
          <Chip xs primary>Extra small chip</Chip>
          <Chip sm secondary>Small chip</Chip>
          <Chip md tertiary>Medium chip</Chip>
          <Chip lg warning>Large chip</Chip>
          <Chip xl success>Extra large chip</Chip>
        </Row>
      )
    }
  ], []);

  const [activeItem, setActiveItem] = React.useState<CarouselItem | null>(carouselItems[0]);

  const handleActiveItemChange = React.useCallback((item: CarouselItem) => {
    setActiveItem(item);
  }, []);

  return (
    <Container xl>
      <Col lg className="w-full">
        <FeatureTitle
          icon="Box"
          title="Basic components"
          description="Essential UI elements like buttons, badges, and chips."
        />
        <Card lg overflowHidden className="inset-shadow-sm">
          <Row xl lgCol>
            <VerticalCarousel
              className="w-full -mb-8 max-lg:mb-0"
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
      </Col>
    </Container>
  );
} 