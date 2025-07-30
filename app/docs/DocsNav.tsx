"use client";

import React from 'react';
import { Text, Col, Row, Card, Divider } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import { BookOpen, GitHub } from "react-feather";
import Link from "next/link";

export function DocsNav({currentPath}: { currentPath?: string }) {
  return (
    <Col lg>
      <Col xs>
        {[
          {icon: BookOpen, text: "Documentation", href: "/docs", external: false},
          {icon: GitHub, text: "GitHub", href: "https://github.com", external: true},
        ].map((item, index) => (
          item.external ? (
            <Row sm tag="a" href={item.href} target="_blank" rel="noopener noreferrer" key={index} className="hover:bg-secondary">
              <Card xs secondary tag="span" justifyCenter>
                <item.icon className="size-5"/>
              </Card>
              <Text secondary>{item.text}</Text>
            </Row>
          ) : (
            <Row sm tag={Link} href={item.href} key={index} className="hover:bg-secondary">
              <Card xs secondary tag="span" justifyCenter>
                <item.icon className="size-5"/>
              </Card>
              <Text secondary>{item.text}</Text>
            </Row>
          )
        ))}
      </Col>
      <Divider />
      {docsSections.map((section, i) => (
        <Col xs key={i}>
          <Text uppercase sm mono secondary semibold className="tracking-wider">
            {section.name}
          </Text>
          <Col noGap>
            {section.pages.map((component, i) => {
              const path = `/docs/${section.slug}/${component.name.toLowerCase()}`;
              const isActive = currentPath === path;
              return (
                <Text
                  tag={Link}
                  key={i}
                  href={path}
                  semibold={isActive}
                  secondary={!isActive}
                  default={isActive}
                  className={`w-full ${isActive ? 'border-gray-600 bg-gray-50' : 'border-default  hover:border-gray-400'} border-l pl-4 py-1 hover:no-underline hover:text-gray-900 hover:bg-gray-100`}
                >
                  {component.name}
                </Text>
              );
            })}
          </Col>
        </Col>
      ))}
    </Col>
  );
} 
