'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Col, Text } from '@vaneui/ui';
import Link from "next/link";

interface OnThisPageProps {
  sections: Array<{
    title: string;
    id: string;
    level: number;
  }>;
}

export function OnThisPage({sections}: OnThisPageProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickNavigating = useRef(false);

  // Set initial active section from URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
    }
  }, [sections]);

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

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
    <Col ref={containerRef} overflowYAuto sm className="h-fit">
      <Text sm uppercase secondary mono>On this page</Text>
      <Col noGap>
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <Link
              key={index}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={isActive ? "border-l-2 border-(--color-text-primary) bg-primary" : "border-l-2 border-border-default hover:bg-secondary"}
            >
              <Text sm secondary={!isActive} primary={isActive} semibold={isActive}
                    className={`py-1.5 ${
                      section.level === 0 ? 'pl-3' :
                      section.level === 1 ? 'pl-6' :
                      section.level === 2 ? 'pl-9' :
                      section.level === 3 ? 'pl-12' :
                      'pl-12'
                    }`}
              >
                {section.title}
              </Text>
            </Link>
          );
        })}
      </Col>
    </Col>
  );
}