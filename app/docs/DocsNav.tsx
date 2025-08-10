"use client";

import React from 'react';
import { Text, Col, Row, Card, Divider } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import { BookOpen, GitHub } from "react-feather";
import Link from "next/link";
import { PRODUCT } from "../constants";

export function DocsNav({currentPath, onMenuItemClick}: { currentPath?: string, onMenuItemClick?: () => void }) {
  return (
    <Col lg>
      <Col xs>
        {[
          {icon: BookOpen, text: "Documentation", href: "/docs", external: false},
          {icon: GitHub, text: "GitHub", href: PRODUCT.githubUrl, external: true},
        ].map((item, index) => (
          item.external ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" key={index}>
              <Row sm className="hover:bg-secondary">
                <Card xs secondary tag="span" justifyCenter>
                  <item.icon className="size-5"/>
                </Card>
                <Text secondary>{item.text}</Text>
              </Row>
            </a>
          ) : (
            <Link href={item.href} key={index}>
              <Row sm className="hover:bg-secondary" onClick={onMenuItemClick}>
                <Card xs secondary tag="span" justifyCenter>
                  <item.icon className="size-5"/>
                </Card>
                <Text secondary>{item.text}</Text>
              </Row>
            </Link>
          )
        ))}
      </Col>
      <Divider/>
      {docsSections.map((section, i) => (
        <Col xs key={i}>
          <Row xs>
            <section.icon className="size-5 text-secondary"/>
            <Text uppercase sm mono secondary semibold className="tracking-wider">
              {section.name}
            </Text>
          </Row>
          <Col noGap className="pl-[calc(var(--spacing)*2.5-1px)]">
            {section.pages.map((page, i) => {
              const path = `/docs/${section.slug}/${page.slug}`;
              const isActive = currentPath === path;
              return (
                <Link key={i} href={path}>
                  <Text
                    semibold={isActive}
                    secondary={!isActive}
                    default={isActive}
                    className={`w-full ${isActive ? 'border-gray-600 bg-gray-50' : 'border-default  hover:border-gray-400'} border-l-2 pl-4 py-1 hover:no-underline hover:text-gray-900 hover:bg-gray-100`}
                    onClick={onMenuItemClick}
                  >
                    {page.name}
                  </Text>
                </Link>
              );
            })}
          </Col>
        </Col>
      ))}
    </Col>
  );
} 
