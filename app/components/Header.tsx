'use client'

import { Title, Row, Text, Button, Section } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Image from 'next/image'
import Link from 'next/link'
import vaneui from './../../public/vaneui.svg'
import { ArrowRight, GitHub } from "react-feather";

export function Header() {
  return (
    <Row lg justifyBetween tag={'header'}
         className="flex-shrink-0 bg-white/70 backdrop-blur-md border-b z-40 w-full px-3 py-2">
      <Row xs tag={Link} href="/">
        <Image src={vaneui} alt={PRODUCT.title} className="h-[27px] w-[36px]"/>
        <Title sm>
          {PRODUCT.title}
        </Title>
      </Row>
      <Row lg>
        <Text sm tag={Link} href="/docs">
          Documentation
        </Text>
        <Button sm normal tag={Link} href={PRODUCT.githubUrl}>
          <GitHub className="size-4"/>
          GitHub
          <ArrowRight className="size-4"/>
        </Button>
      </Row>
    </Row>
  );
}
