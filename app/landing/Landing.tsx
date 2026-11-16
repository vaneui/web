'use client';

import React from 'react';
import { Col } from '@vaneui/ui';
import './landing.css';
import { LandingHeader, MAIN_CONTENT_ID } from './LandingHeader';
import { Hero } from './Hero';
import { WorksWith } from './WorksWith';
import { ComponentsBento } from './ComponentsBento';
import { Principles } from './Principles';
import { Theming } from './Theming';
import { Agents } from './Agents';
import { GetStarted } from './GetStarted';
import { LandingFooter } from './LandingFooter';
import { Band } from './frame';

/** The landing page: a blueprint frame with rails, hairline cells, mono index labels and one blue accent */
export function Landing() {
  return (
    <Col noGap primary className="landing lp-motion min-h-screen">
      <LandingHeader/>
      {/* The skip link's target: focusable from script only, and no ring around the whole region */}
      <Col noGap tag="main" id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
        <Hero/>
        <WorksWith/>
        <Band/>
        <ComponentsBento/>
        <Band full/>
        <Principles/>
        <Band/>
        <Theming/>
        <Band full/>
        <Agents/>
        <GetStarted/>
      </Col>
      <LandingFooter/>
    </Col>
  );
}
