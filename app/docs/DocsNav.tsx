"use client";

import React from 'react';
import { Text, Col, Row, NavLink, Divider } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import { BookOpen, Box, Compass, FileText, GitHub, Layers, Maximize2, Settings } from "react-feather";
import Link from "next/link";
import { PRODUCT } from "../constants";

export function DocsNav({currentPath, onMenuItemClickAction}: { currentPath?: string, onMenuItemClickAction?: () => void }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    'getting-started': BookOpen,
    'basic-components': Box,
    'layout-components': Layers,
    'overlay-components': Maximize2,
    'navigation-components': Compass,
    'typography-components': FileText,
    'customization': Settings,
  };
  return (
    <Col>
      <Col noGap>
        <NavLink secondary href="/docs" tag={Link}>
          <BookOpen className="size-5" />
          Documentation
        </NavLink>
        <NavLink secondary href={PRODUCT.githubUrl} tag="a" target="_blank" rel="noopener noreferrer">
          <GitHub className="size-5" />
          GitHub
        </NavLink>
      </Col>
      <Divider/>
      {docsSections.map((section, i) => {
        const Icon = icons[section.slug];
        return (
          <Col xs key={i}>
            <Row xs>
              {Icon && <Icon className="size-5 text-(--color-text-secondary)"/>}
              <Text uppercase sm mono secondary medium>
                {section.name}
              </Text>
            </Row>
            <Col noGap className="pl-[calc(var(--spacing)*2.5-1px)]">
              {section.pages.map((page, j) => {
                const path = `/docs/${section.slug}/${page.slug}`;
                const isActive = currentPath === path;
                return (
                  <NavLink
                    sharp tag={Link} key={j} href={path}
                    active={isActive}
                    semibold={isActive}
                    className={`border-l-2 border-(--color-border-primary) ${!isActive ? "hover:border-(--color-text-tertiary)" : "border-(--color-text-primary)"} pl-4`}
                    onClick={onMenuItemClickAction}
                  >
                    {page.name}
                  </NavLink>
                );
              })}
            </Col>
          </Col>
        );
      })}
    </Col>
  );
}
