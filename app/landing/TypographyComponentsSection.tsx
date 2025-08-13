'use client'

import React from 'react';
import {
  Text,
  Container,
  Col,
  SectionTitle,
  Row,
  Card,
  Title
} from '@vaneui/ui';
import { BookOpen } from "react-feather";
import { CodeBlock } from "../components/CodeBlock";
import { VerticalCarousel, type CarouselItem } from "../components/VerticalCarousel";
import { prepareComponentString } from "../utils/stringUtils";

export function TypographyComponentsSection() {

  const text = "The quick brown fox jumps over the lazy dog";

  // Create carousel items for different typography components
  const carouselItems: CarouselItem[] = React.useMemo(() => [
    {
      id: 'text',
      title: 'Text Components',
      component: (
        <Col xs>
          <Text xl>{text}</Text>
          <Text lg>{text}</Text>
          <Text md>{text}</Text>
          <Text sm>{text}</Text>
          <Text xs>{text}</Text>
        </Col>
      )
    },
    {
      id: 'title',
      title: 'Title Components',
      component: (
        <Col xs>
          <Title xl>Title xl</Title>
          <Title lg>Title lg</Title>
          <Title md>Title md</Title>
          <Title sm>Title sm</Title>
          <Title xs>Title xs</Title>
        </Col>
      )
    },
    {
      id: 'section-title',
      title: 'SectionTitle Components',
      component: (
        <Col xs>
          <SectionTitle xl>Section title xl</SectionTitle>
          <SectionTitle lg>Section title lg</SectionTitle>
          <SectionTitle md>Section title md</SectionTitle>
          <SectionTitle sm>Section title sm</SectionTitle>
          <SectionTitle xs>Section title xs</SectionTitle>
        </Col>
      )
    }
  ], [text]);

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
            <BookOpen className="size-8"/>
          </Card>
          <Col xs>
            <SectionTitle sm>Typography</SectionTitle>
            <Text>Scalable text system with built-in hierarchy. From headings to body text, maintain perfect readability across all screen sizes.</Text>
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
              fileName={`${activeItem?.title?.replace(' ', '') || 'Typography'}.tsx`}
              language="tsx"
              code={activeItem ? prepareComponentString(activeItem.component) : ''}
            />
          </Row>
        </Card>
      </Card>
    </Container>
  );
} 