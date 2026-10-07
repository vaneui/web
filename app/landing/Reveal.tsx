'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * Fades and lifts its child into place the first time it scrolls into view.
 * Pure decoration: content is visible without JS and for reduced-motion visitors
 * (landing.css only hides [data-reveal="out"], which is set after mount).
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'out' | 'in'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // The first callback reports the initial position: content already on screen stays visible,
    // content further down hides until it scrolls in
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setState('in');
        io.disconnect();
      } else {
        setState(s => (s === 'idle' ? 'out' : s));
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal={state} className={className} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/** True when the visitor asked for reduced motion. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}
