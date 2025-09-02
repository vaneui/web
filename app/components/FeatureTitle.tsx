'use client'

import React from 'react';
import { Row, Card, Col, SectionTitle, Text } from '@vaneui/ui';
import * as Icons from 'react-feather';

export interface FeatureTitleProps {
  icon: keyof typeof Icons;
  title: string;
  description: string | React.ReactNode;
  className?: string;
}

export function FeatureTitle({icon, title, description, className = ''}: FeatureTitleProps) {
  const Icon = Icons[icon];

  return (
    <Row lg smCol itemsStart className={`w-full ${className}`}>
      <Card sm shadow justifyCenter itemsCenter>
        <Icon className="size-8"/>
      </Card>
      <Col xs>
        <SectionTitle sm default>{title}</SectionTitle>
        <Text secondary>{description}</Text>
      </Col>
    </Row>
  );
}