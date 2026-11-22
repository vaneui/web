// The keyboard shortcut that opens the site search, apart from the component so the unit tests can run it.

/** The part of a key event the shortcut reads */
export interface SearchKeyEvent {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
}

/**
 * Cmd+K on Apple devices, Ctrl+K elsewhere (Ctrl+K on a Mac is the editor's delete-to-line-end).
 * A shortcut a field already handled (Ctrl+K is Link in the Markdown editor) is not for the search.
 */
export function togglesSearch(e: SearchKeyEvent, apple: boolean): boolean {
  if (e.defaultPrevented) return false;
  return (apple ? e.metaKey : e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k';
}
