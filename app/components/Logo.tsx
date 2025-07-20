'use client'

import { Title, Row } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Image from 'next/image'
import Link from 'next/link'
import vaneui from './../../public/vaneui.svg'

export function Logo() {

  return (
    <Row xs tag={Link} href="/">
      <Image src={vaneui} alt={PRODUCT.title} className="h-[27px] w-[36px]"/>
      <Title sm>
        {PRODUCT.title}
      </Title>
    </Row>
  );
}
