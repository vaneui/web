"use client";

import React from 'react';
import { Text, Col, Row, Card, Divider, Button } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import { BookOpen, Box, FileText, GitHub, Layers, Settings } from "react-feather";
import Link from "next/link";
import { PRODUCT } from "../constants";

export function DocsNav({currentPath, onMenuItemClickAction}: { currentPath?: string, onMenuItemClickAction?: () => void }) {
  const icons = [
    {slug: 'getting-started', icon: BookOpen},
    {slug: 'basic-components', icon: Box},
    {slug: 'layout-components', icon: Layers},
    {slug: 'typography-components', icon: FileText},
    {slug: 'customization', icon: Settings},
  ]
  return (
    <Col lg>
      <Col noGap>
        {[
          {icon: BookOpen, text: "Documentation", href: "/docs", external: false},
          {icon: GitHub, text: "GitHub", href: PRODUCT.githubUrl, external: true},
        ].map((item, index) => (
          <Row sm relative key={index} className="hover:bg-bg-tertiary p-1 rounded-xl ">
            <Link
              href={item.href}
              target={item.external ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label={item.text}
            />
            <Card noPadding secondary tag="span" justifyCenter className="p-2">
              <item.icon className="size-5"/>
            </Card>
            <Text secondary>{item.text}</Text>
          </Row>
        ))}
      </Col>
      <Divider/>
      {docsSections.map((section, i) => {
        const Icon = icons.find((i) => i.slug === section.slug);
        return (
          <Col xs key={i}>
            <Row xs>
              {Icon && <Icon.icon className="size-5 text-secondary"/>}
              <Text uppercase sm mono secondary medium>
                {section.name}
              </Text>
            </Row>
            <Col noGap className="pl-[calc(var(--spacing)*2.5-1px)]">
              {section.pages.map((page, i) => {
                const path = `/docs/${section.slug}/${page.slug}`;
                const isActive = currentPath === path;
                return (
                  <Button
                    sm noShadow noRing sharp justifyStart
                    tag={Link} key={i} href={path}
                    semibold={isActive}
                    className={`w-full border-l-2 border-border-default pl-4 ${isActive && "border-text-default"}`}
                    onClick={onMenuItemClickAction}
                  >
                    {page.name}
                  </Button>
                );
              })}
            </Col>
          </Col>
        );
      })}
    </Col>
  );
} 
