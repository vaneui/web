'use client'

import React from 'react';
import {
  Text,
  Container,
  Col,
  Row,
  Card,
  Title, Link
} from '@vaneui/ui';
import { CodeBlock } from "../components/CodeBlock";
import { VerticalCarousel, type CarouselItem } from "../components/VerticalCarousel";
import { FeatureTitle } from "../components/FeatureTitle";
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
          <Title xl>This is a title example</Title>
          <Title lg>This is a title example</Title>
          <Title md>This is a title example</Title>
          <Title sm>This is a title example</Title>
          <Title xs>This is a title example</Title>
        </Col>
      )
    },
    {
      id: 'link',
      title: 'Link Components',
      component: (
        <Col xs>
          <Link xl bold href="#">Extra large bold link</Link>
          <Link lg semibold href="#">Large semibold link</Link>
          <Link md href="#">Medium link</Link>
          <Link sm italic href="#">Small italic link</Link>
          <Link xs underline href="#">Extra small underlined link</Link>
        </Col>
      )
    }
  ], [text]);

  const [activeItem, setActiveItem] = React.useState<CarouselItem | null>(carouselItems[0]);

  const handleActiveItemChange = React.useCallback((item: CarouselItem) => {
    setActiveItem(item);
  }, []);

  return (
    <Container xl>
      <Col lg className="w-full">
        <FeatureTitle
          icon="BookOpen"
          title="Typography"
          description="Scalable text system with built-in hierarchy. From headings to body text, maintain perfect readability across all screen sizes."
        />
        <Card lg overflowHidden relative>
          <Row absolute className="
    inset-0 pointer-events-none
    bg-[repeating-linear-gradient(-45deg,theme(colors.slate.50)_0_1px,transparent_1px_calc(var(--spacing)*4))]
  "/>
          <Row xl tabletCol>
            <CodeBlock
              className="shadow-lg z-10"
              fileName={`${activeItem?.title?.replace(' ', '') || 'Typography'}.tsx`}
              language="tsx"
              code={activeItem ? prepareComponentString(activeItem.component) : ''}
            />
            <VerticalCarousel
              className="w-full -mb-14"
              items={carouselItems}
              onActiveItemChange={handleActiveItemChange}
            />
          </Row>
        </Card>
      </Col>
    </Container>
  );
} 