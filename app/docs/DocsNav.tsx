"use client";

import React from 'react';
import { Link, Text, Col, Row } from '@vaneui/ui';
import { docsSections } from "./docsSections";

export function DocsNav({currentPath}: { currentPath?: string }) {
  return (
    <>
      {docsSections.map((section, i) => (
        <Col key={i}>
          <Row sm>
            <section.icon className="w-5 h-5 text-secondary"/>
            <Text uppercase sm mono secondary semibold className="tracking-wider">
              {section.name}
            </Text>
          </Row>
          <Col noGap className="pl-[calc(var(--spacing)*2.5-1px)]">
            {section.components.map((component, i) => {
              const path = `/docs/${section.slug}/${component.name.toLowerCase()}`;
              const isActive = currentPath === path;
              return (
                <Link
                  key={i}
                  href={path}
                  semibold={isActive}
                  secondary
                  className={`w-full ${isActive ? 'border-gray-600 text-gray-900 bg-gray-50' : 'hover:border-gray-400'} border-l-2 pl-4 py-1 hover:no-underline hover:text-gray-900 hover:bg-gray-100`}
                >
                  {component.name}
                </Link>
              );
            })}
          </Col>
        </Col>
      ))}
    </>
  );
} 
