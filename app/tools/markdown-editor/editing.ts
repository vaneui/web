// The Markdown editor's editing rules, apart from the component so the unit tests can run them.

/** The part of a key event the editor's shortcuts read */
export interface ShortcutEvent {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  preventDefault(): void;
  stopPropagation(): void;
}

/**
 * The formatting action a Cmd/Ctrl shortcut runs, or undefined. The editor owns its shortcuts:
 * the event is marked handled and stops here, so Ctrl+K is Link and does not open the site search.
 */
export function takeShortcut<A extends { key?: string }>(e: ShortcutEvent, actions: readonly A[]): A | undefined {
  if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return undefined;
  const action = actions.find(a => a.key !== undefined && a.key === e.key.toLowerCase());
  if (action) {
    e.preventDefault();
    e.stopPropagation();
  }
  return action;
}

/** A sample replaces the draft, which is kept nowhere else: ask first unless it is empty or an untouched sample */
export function draftNeedsConfirm(text: string, samples: readonly { body: string }[]): boolean {
  return text.trim() !== '' && !samples.some(s => s.body === text);
}

/** The part of a textarea `editText` uses */
export type EditableText = Pick<HTMLTextAreaElement, 'value' | 'focus' | 'setSelectionRange'>;

/**
 * Replaces the textarea's text with `next` through the browser's own editing command, which puts
 * the change on the field's undo stack (setting `value` from React clears it, so Ctrl+Z did
 * nothing). Only the part that differs is replaced. Returns false when the browser has no such
 * command, and the caller sets the value itself.
 */
export function editText(el: EditableText, next: string, doc: Pick<Document, 'execCommand'> = document): boolean {
  const prev = el.value;
  if (prev === next) return true;
  let start = 0;
  while (start < prev.length && start < next.length && prev[start] === next[start]) start++;
  let end = 0;
  while (end < prev.length - start && end < next.length - start && prev[prev.length - 1 - end] === next[next.length - 1 - end]) end++;
  el.focus();
  el.setSelectionRange(start, prev.length - end);
  const inserted = next.slice(start, next.length - end);
  try {
    // Deprecated, but still the only way to edit a text field that the undo stack records
    const done = inserted ? doc.execCommand('insertText', false, inserted) : doc.execCommand('delete');
    return done && el.value === next;
  } catch {
    return false;
  }
}
