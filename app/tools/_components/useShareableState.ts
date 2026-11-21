'use client';

import { useEffect, useRef, useState } from 'react';

/** Browsers cap history updates (Safari: 100 in 30 seconds), and a slider fires on every pixel */
const WRITE_DELAY_MS = 300;

/**
 * State a link can carry. The server renders `defaults`; after hydration the query string is read
 * once with `read`, and every change is written back with `write` through `replaceState`, so the
 * address bar always reopens what is on screen. Pass module-level `defaults`, `read` and `write`
 * so the effects run once.
 */
export function useShareableState<T>(
  defaults: T,
  read: (params: URLSearchParams, defaults: T) => T,
  write: (value: T) => URLSearchParams,
) {
  const [value, setValue] = useState(defaults);
  const ready = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the address bar lives outside React and is read once, after hydration
    setValue(read(new URLSearchParams(window.location.search), defaults));
    ready.current = true;
  }, [defaults, read]);

  useEffect(() => {
    if (!ready.current) return;
    const t = setTimeout(() => {
      const query = write(value).toString();
      const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
      window.history.replaceState(window.history.state, '', url);
    }, WRITE_DELAY_MS);
    return () => clearTimeout(t);
  }, [value, write]);

  return [value, setValue] as const;
}

/** A color from the query string: `7c3aed`, `#7c3aed` or any CSS color, URL-encoded */
export function hexParam(raw: string | null): string | null {
  if (!raw) return null;
  return /^[0-9a-f]{3,8}$/i.test(raw) ? `#${raw}` : raw;
}
