'use client'

import React from 'react';
import Link from "next/link";
import { Row, Stack, Text } from '@vaneui/ui';
import { ArrowUpRight } from 'react-feather';
import { Brackets } from "../landing/frame";

/** Docs page tile for an `lp-tiles` grid; client-side so `tag={Link}` works from server pages */
export function DocsTile({ href, name, description }: { href: string; name: string; description?: string }) {
  return (
    <Stack sm flexNoWrap tag={Link} href={href} className="lp-cell">
      <Brackets/>
      <Row justifyBetween itemsStart>
        <Text fontMedium>{name}</Text>
        <ArrowUpRight aria-hidden="true" className="lp-nudge size-4 shrink-0 opacity-50"/>
      </Row>
      {description && <Text sm tertiary>{description}</Text>}
    </Stack>
  );
}
