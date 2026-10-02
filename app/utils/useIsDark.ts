'use client'

import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.dataset.theme === 'dark';

/** True while `<html data-theme="dark">` is set; false during SSR. */
export function useIsDark() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
