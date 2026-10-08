'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Col, NavLink, Text } from '@vaneui/ui';

interface OnThisPageProps {
  sections: Array<{
    title: string;
    id: string;
    level: number;
  }>;
}

export function OnThisPage({sections}: OnThisPageProps) {
  // Empty on the server and first client render; the observer's first callback marks the visible section
  const [activeSection, setActiveSection] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickNavigating = useRef(false);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Don't update active section if we're in the middle of click navigation
      if (isClickNavigating.current) return;

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

  // Only scroll navigation when activeSection changes from scroll (not clicks)
  useEffect(() => {
    if (activeSection && containerRef.current) {
      const activeIndex = sections.findIndex(section => section.id === activeSection);
      if (activeIndex >= 0) {
        const linkElements = containerRef.current.querySelectorAll('a');
        const activeLink = linkElements[activeIndex];

        // Only auto-scroll the navigation if the active link is not visible
        if (activeLink && containerRef.current.scrollHeight > containerRef.current.clientHeight) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();

          // Check if element is outside the visible area
          const isAbove = linkRect.top < containerRect.top;
          const isBelow = linkRect.bottom > containerRect.bottom;

          // Only scroll if the element is actually out of view
          if (isAbove || isBelow) {
            const containerHeight = containerRef.current.clientHeight;
            const linkTop = activeLink.offsetTop;
            const linkHeight = activeLink.clientHeight;

            const scrollTop = linkTop - (containerHeight / 2) + (linkHeight / 2);

            containerRef.current.scrollTo({
              top: Math.max(0, scrollTop),
              behavior: 'smooth'
            });
          }
        }
      }
    }
  }, [activeSection, sections]);

  const handleClick = (sectionId: string) => {
    // Set active section immediately on click
    setActiveSection(sectionId);

    // Disable observer during navigation
    isClickNavigating.current = true;

    // Scroll to the section instantly
    const element = document.getElementById(sectionId);
    if (element) {
      // Position element near the top but not at the very top
      element.scrollIntoView({behavior: 'auto', block: 'start'});
      window.history.pushState(null, '', `#${sectionId}`);

      // Re-enable observer after a short delay
      setTimeout(() => {
        isClickNavigating.current = false;
      }, 100); // Short delay since scroll is instant
    }
  };

  return (
    <Col ref={containerRef} overflowYAuto sm hFit>
      <Text xs fontMono uppercase trackingWider tertiary>On this page</Text>
      <Col noGap>
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <NavLink
              key={index}
              href={`#${section.id}`}
              active={isActive}
              xs ghost sharp noPadding secondary={!isActive}
              className={`lp-rail py-1.5 ${
                section.level === 0 ? 'pl-3' :
                section.level === 1 ? 'pl-6' :
                section.level === 2 ? 'pl-9' :
                'pl-12'
              }`}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleClick(section.id);
              }}
            >
              {section.title}
            </NavLink>
          );
        })}
      </Col>
    </Col>
  );
}
