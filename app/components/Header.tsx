'use client'

import { Row, Button, Stack } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Link from 'next/link'
import { ArrowRight, GitHub } from "react-feather";
import { Logo } from "./Logo";

export function Header() {

  return (
    <Stack xs row lg justifyBetween tag={'header'}
           className="flex-shrink-0 bg-white/70 backdrop-blur-md border-b z-40 w-full border-default">
      <Logo/>
      <Row>
        <Button sm normal default noShadow noRing tag={Link} href="/docs">
          Documentation
        </Button>
        <Button sm normal tag={Link} href={PRODUCT.githubUrl}>
          <GitHub className="size-4"/>
          GitHub
          <ArrowRight className="size-4"/>
        </Button>
      </Row>
    </Stack>
  );
}
