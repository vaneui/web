'use client';

// Heading specimens for live demos and the playground preview. They render the
// VaneUI component with the same classes, but as a <div> by default, so a demo
// of `<PageTitle>` does not add an h1 to the docs page outline. An explicit
// `tag` from the demo still wins, and `href` still renders an <a>. The examples
// build imports these in place of the @vaneui/ui ones
// (scripts/lib/emit-wrapper.mjs); the code shown to readers is unchanged.

import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import {
  PageTitle as VanePageTitle,
  SectionTitle as VaneSectionTitle,
  Title as VaneTitle,
} from '@vaneui/ui';

type HeadingProps = ComponentPropsWithoutRef<typeof VaneTitle>;

/** The demo's own tag, else VaneUI's <a> for a link, else a <div> */
function specimenTag(tag: ElementType | undefined, href: string | undefined): ElementType | undefined {
  return tag ?? (href ? undefined : 'div');
}

export const PageTitle = forwardRef<HTMLHeadingElement, HeadingProps>(
  function PageTitle({ tag, ...props }, ref) {
    return <VanePageTitle ref={ref} tag={specimenTag(tag, props.href)} {...props}/>;
  }
);

export const SectionTitle = forwardRef<HTMLHeadingElement, HeadingProps>(
  function SectionTitle({ tag, ...props }, ref) {
    return <VaneSectionTitle ref={ref} tag={specimenTag(tag, props.href)} {...props}/>;
  }
);

export const Title = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Title({ tag, ...props }, ref) {
    return <VaneTitle ref={ref} tag={specimenTag(tag, props.href)} {...props}/>;
  }
);
