'use client'

import React, { useState, useEffect } from 'react';
import { Col, Stack, Divider, Title } from '@vaneui/ui';

export interface CarouselItem {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface VerticalCarouselProps {
  items: CarouselItem[];
  onActiveItemChange?: (item: CarouselItem, index: number) => void;
  className?: string;
}

export function VerticalCarousel({ items, onActiveItemChange, className = '' }: VerticalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlay = true;

  // Autoplay functionality
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, items.length]);

  // Notify parent of active item change
  useEffect(() => {
    if (onActiveItemChange && items[currentIndex]) {
      onActiveItemChange(items[currentIndex], currentIndex);
    }
  }, [currentIndex, items, onActiveItemChange]);

  if (items.length === 0) return null;

  return (
    <Col relative className={className}>

      {/* Carousel container with sliding animation */}
      <Col relative overflowHidden className="h-64">

        {/* Items container that moves vertically */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out`}
          style={{
            transform: `translateY(-${currentIndex * 100}%)`
          }}
        >

          {/* Render all items stacked vertically */}
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + items.length) % items.length;
            const isNext = index === (currentIndex + 1) % items.length;
            
            return (
              <Stack lg flex itemsStart justifyStart primary border rounded default
                key={item.id}
                className={`h-64 w-full transition-all duration-700 ease-in-out
                  ${isActive 
                    ? 'opacity-100 scale-100' 
                    : isPrev || isNext
                      ? 'opacity-30 scale-90'
                      : 'opacity-0 scale-85'
                  }
                `}
              >
                <Col className="w-full">
                  <Title xs>{item.title}</Title>
                  <Divider/>
                  {item.component}
                </Col>

                {/* Gradient overlays for fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
              </Stack>
            );
          })}
        </div>
      </Col>
    </Col>
  );
}