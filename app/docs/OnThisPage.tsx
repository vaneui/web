'use client'

import React, { useEffect, useState } from 'react';
import { Col, Text, Link } from '@vaneui/ui';

interface OnThisPageProps {
  sections: Array<{
    title: string;
    id: string;
    level: number;
  }>;
}

export function OnThisPage({ sections }: OnThisPageProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <Col sm overflowYAuto className="h-fit">
      <Text sm uppercase secondary mono>On this page</Text>
      <Col noGap>
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <Text sm secondary={!isActive} primary={isActive} semibold={isActive}
                  tag={Link} key={index}
                  href={`#${section.id}`}
                  className={`py-1.5 ${section.level === 1 ? 'pl-4' : ''}`}
            >
              {section.title}
            </Text>
          );
        })}
      </Col>
    </Col>
  );
}