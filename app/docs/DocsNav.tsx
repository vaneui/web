"use client";

import React from 'react';
import { Col, NavLink } from '@vaneui/ui';
import { docsSections } from "./docsSections";
import Link from "next/link";
import { Eyebrow } from "../landing/frame";

/** Sidebar: one `[01] Section` eyebrow per category, its pages hanging off a hairline track */
export function DocsNav({currentPath, onMenuItemClickAction}: { currentPath?: string, onMenuItemClickAction?: () => void }) {
  return (
    <Col lg>
      {docsSections.map((section, i) => (
        <Col sm key={section.slug}>
          <Eyebrow tight index={String(i + 1).padStart(2, '0')}>{section.name}</Eyebrow>
          <Col noGap>
            {section.pages.map(page => {
              const path = `/docs/${section.slug}/${page.slug}`;
              const isActive = currentPath === path;
              return (
                <NavLink
                  key={page.slug} href={path} tag={Link}
                  ghost sharp secondary={!isActive} active={isActive}
                  className="lp-rail pl-4"
                  onClick={onMenuItemClickAction}
                >
                  {page.name}
                </NavLink>
              );
            })}
          </Col>
        </Col>
      ))}
    </Col>
  );
}
