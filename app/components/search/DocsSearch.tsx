'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Button, Kbd, Row, Text } from '@vaneui/ui';
import { Search } from 'react-feather';
import { SearchDialog } from './SearchDialog';
import { loadSearchIndex } from './loadSearchIndex';

const noSubscribe = () => () => {};
const isApple = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Typing in a field (or the playground editor) keeps `/` for itself */
function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
}

/** Header search: a field-like button that opens the search dialog, also on Cmd/Ctrl+K and `/` */
export function DocsSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // The shortcut hint names the platform's key; nothing renders until the client knows it
  const apple = useSyncExternalStore(noSubscribe, isApple, () => null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd+K on Apple devices, Ctrl+K elsewhere (Ctrl+K on a Mac is the editor's delete-to-line-end)
      if ((isApple() ? e.metaKey : e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Start loading the index as soon as the pointer or focus reaches the button
  const preload = () => { loadSearchIndex().catch(() => {}); };

  return (
    <>
      <Button sm pill secondary fontNormal justifyBetween className={className}
              aria-label="Search docs" aria-haspopup="dialog" aria-keyshortcuts={apple ? 'Meta+K /' : 'Control+K /'}
              onClick={() => setOpen(true)} onPointerEnter={preload} onFocus={preload}>
        <Row xs>
          <Search aria-hidden="true" className="size-3.5"/>
          <Text tag="span" inheritSize mobileHide>Search docs</Text>
        </Row>
        {apple !== null && <Kbd xs mobileHide>{apple ? '⌘K' : 'Ctrl K'}</Kbd>}
      </Button>
      <SearchDialog open={open} onClose={() => setOpen(false)}/>
    </>
  );
}
