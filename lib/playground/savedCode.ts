/**
 * The playground's saved snippet. Every access is guarded: `localStorage` throws
 * when the browser blocks storage (the property itself, not only its methods)
 * and when the quota is full, and the playground must still work then.
 */

export const STORAGE_KEY = 'vaneui-playground-code';

/** The part of the Storage API the playground uses */
export type CodeStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** `window.localStorage`, or null where there is none or reading the property throws */
export function browserStorage(): CodeStorage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** The saved snippet, or null when nothing is saved or storage cannot be read */
export function readSavedCode(storage: CodeStorage | null): string | null {
  try {
    return storage?.getItem(STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
}

/** Saves the snippet; false when storage is unavailable or refuses the write */
export function writeSavedCode(storage: CodeStorage | null, code: string): boolean {
  try {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY, code);
    return true;
  } catch {
    return false;
  }
}

/** Forgets the saved snippet; false when storage is unavailable or refuses */
export function clearSavedCode(storage: CodeStorage | null): boolean {
  try {
    if (!storage) return false;
    storage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** True when the URL asks for a clean start: `?reset`, with or without a value */
export function wantsReset(search: string): boolean {
  return new URLSearchParams(search).has('reset');
}

/** The URL without the `reset` parameter; other parameters and the hash stay */
export function withoutReset(href: string): string {
  const url = new URL(href);
  url.searchParams.delete('reset');
  return url.pathname + url.search + url.hash;
}

/**
 * What the playground starts from: the saved snippet, or null when nothing is
 * saved. With `?reset` the saved snippet is cleared and never returned, so a
 * snippet that hangs the page cannot run again.
 */
export function loadSavedCode(search: string, storage: CodeStorage | null): { code: string | null; reset: boolean } {
  if (wantsReset(search)) {
    clearSavedCode(storage);
    return { code: null, reset: true };
  }
  return { code: readSavedCode(storage), reset: false };
}
