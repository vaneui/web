'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Modal, ModalBody, ModalFooter, ModalCloseButton, Row, Col, Input, Kbd, Text, NavLink, Mark, Spinner,
} from '@vaneui/ui';
import { CornerDownLeft, FileText, Hash, Search } from 'react-feather';
import '../../landing/landing.css';
import { Eyebrow } from '../../landing/frame';
import {
  displayTitle, groupHits, search, snippet, type PreparedIndex, type SearchHit, type Segment,
} from '../../../lib/search/query';
import { loadSearchIndex } from './loadSearchIndex';

/** Shown before anything is typed: where most visitors start */
const START_HERE = [
  '/docs/getting-started/installation',
  '/docs/getting-started/core-concepts',
  '/docs/getting-started/usage-basics',
  '/docs/customization/theming-overview',
  '/docs/reference/common-props',
];

function startHere(index: PreparedIndex): SearchHit[] {
  return START_HERE.flatMap((url) => {
    const entry = index.entries.find((p) => p.entry.url === url)?.entry;
    return entry ? [{ entry, score: 0, title: [{ text: displayTitle(entry), hit: false }], snippet: snippet(entry.text, []) }] : [];
  });
}

function useSearchIndex(enabled: boolean) {
  const [index, setIndex] = useState<PreparedIndex | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!enabled || index) return;
    let live = true;
    loadSearchIndex().then(
      (loaded) => { if (live) { setIndex(loaded); setFailed(false); } },
      () => { if (live) setFailed(true); },
    );
    return () => { live = false; };
  }, [enabled, index]);
  return { index, failed };
}

/** Matched words in semibold ink; `ghost` drops the highlighter fill */
function Highlighted({ segments }: { segments: Segment[] }) {
  return segments.map((s, i) => s.hit
    ? <Mark key={i} ghost primary fontSemibold>{s.text}</Mark>
    : <React.Fragment key={i}>{s.text}</React.Fragment>);
}

/** Docs search: type to filter, arrows to move, Enter to open; results grouped by docs category */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingUrl = useRef<string | null>(null);
  const listId = useId();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const { index, failed } = useSearchIndex(open);

  const groups = useMemo(
    () => (index ? groupHits(query.trim() ? search(index, query) : startHere(index), index.sections) : []),
    [index, query],
  );
  // The order on screen, which the arrow keys follow
  const hits = useMemo(() => groups.flatMap((g) => g.hits), [groups]);
  const optionId = (i: number) => `${listId}-option-${i}`;
  const selected = Math.min(active, hits.length - 1);

  // Keep the keyboard selection in view as it moves through a long list
  useEffect(() => {
    if (open && selected >= 0) document.getElementById(optionId(selected))?.scrollIntoView({ block: 'nearest' });
  });

  // Navigate once the dialog has closed: the scroll lock is released by then, so `#heading` links land
  const go = (url: string) => {
    pendingUrl.current = url;
    onClose();
  };
  const onExitComplete = () => {
    const url = pendingUrl.current;
    pendingUrl.current = null;
    if (url) router.push(url);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (hits.length === 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((selected + step + hits.length) % hits.length);
    } else if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      go(hits[selected].entry.url);
    }
  };

  const status = !index
    ? (failed ? 'Search could not load. Check your connection and open it again.' : 'Loading search')
    : hits.length === 0
      ? `No results for "${query.trim()}"`
      : query.trim() ? `${hits.length} result${hits.length === 1 ? '' : 's'}` : '';

  let position = -1;
  return (
    // `sm` keeps the padding compact; the width token is widened so results have room
    <Modal sm open={open} onClose={onClose} onExitComplete={onExitComplete} initialFocus={inputRef}
           aria-label="Search documentation" sharp noGap style={{ '--modal-width-sm': '40rem' } as React.CSSProperties}
           overlayProps={{ itemsStart: true, className: 'px-4 pt-[12vh] max-mobile:px-2 max-mobile:pt-2' }}
           className="lp-site max-h-[min(40rem,80dvh)] max-mobile:max-h-[calc(100dvh-1rem)]">
      {/* Search field: the input owns focus; arrows move the selection through the list below */}
      <Row noShrink borderB className="pl-4 pr-14 py-1">
        <Search aria-hidden="true" className="size-4 shrink-0 opacity-60"/>
        {/* The field fills the bar, so the bar itself is the focused control: no ring or outline of its own */}
        <Input ref={inputRef} paddingY transparent noInsetRing noFocusVisible className="outline-none"
               placeholder="Search docs" enterKeyHint="go" autoComplete="off" spellCheck={false}
               role="combobox" aria-label="Search documentation" aria-autocomplete="list"
               aria-expanded={hits.length > 0} aria-controls={listId}
               aria-activedescendant={selected >= 0 ? optionId(selected) : undefined}
               value={query}
               onChange={(e) => { setQuery(e.target.value); setActive(0); }}
               onFocus={(e) => e.currentTarget.select()}
               onKeyDown={onKeyDown}/>
      </Row>

      <ModalBody className="styled-scrollbar">
        {!index && !failed && <Row justifyCenter className="py-6"><Spinner secondary/></Row>}
        {status && hits.length === 0 && (
          <Text sm secondary textCenter wFull className="py-6">{status}</Text>
        )}
        <Col lg role="listbox" id={listId} aria-label="Search results" hidden={hits.length === 0}>
          {groups.map((group) => (
            <Col sm key={group.section.index} role="group" aria-label={group.section.name}>
              <Eyebrow tight index={group.section.index}>{group.section.name}</Eyebrow>
              <Col noGap>
                {group.hits.map((hit) => {
                  const i = ++position;
                  const isSelected = i === selected;
                  const isPage = hit.entry.path.length === 0;
                  const trail = [hit.entry.page, ...hit.entry.path.slice(0, -1)].join(' › ');
                  return (
                    <NavLink key={hit.entry.url} id={optionId(i)} role="option" aria-selected={isSelected}
                             tabIndex={-1} href={hit.entry.url} tag={Link} sharp itemsStart
                             className="lp-rail lp-option pl-4"
                             onMouseMove={() => { if (!isSelected) setActive(i); }}
                             onClick={(e: React.MouseEvent) => {
                               if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                               e.preventDefault();
                               go(hit.entry.url);
                             }}>
                      {isPage
                        ? <FileText aria-hidden="true" className="mt-0.5 opacity-50"/>
                        : <Hash aria-hidden="true" className="mt-0.5 opacity-50"/>}
                      <Col xs flex1 className="min-w-0">
                        <Text sm fontMedium truncate wFull>
                          {!isPage && <Text tag="span" inheritSize tertiary>{trail} › </Text>}
                          <Highlighted segments={hit.title}/>
                        </Text>
                        {hit.snippet.length > 0 && (
                          <Text xs secondary lineClamp2><Highlighted segments={hit.snippet}/></Text>
                        )}
                      </Col>
                      <CornerDownLeft aria-hidden="true" className={`mt-0.5 ${isSelected ? 'opacity-50' : 'invisible'}`}/>
                    </NavLink>
                  );
                })}
              </Col>
            </Col>
          ))}
        </Col>
        {/* Announces the result count to screen readers as the query changes */}
        <span role="status" className="sr-only">{index ? status : ''}</span>
      </ModalBody>

      <ModalFooter justifyBetween borderT mobileHide>
        <Row sm>
          <Row xs><Kbd xs>↑</Kbd><Kbd xs>↓</Kbd><Text xs tertiary>to move</Text></Row>
          <Row xs><Kbd xs>↵</Kbd><Text xs tertiary>to open</Text></Row>
          <Row xs><Kbd xs>Esc</Kbd><Text xs tertiary>to close</Text></Row>
        </Row>
        {query.trim() && hits.length > 0 && <Text xs fontMono tertiary>{status}</Text>}
      </ModalFooter>

      {/* Last in the DOM so the focus trap wraps from it (it counts the tabIndex -1 options as stops); drawn in the bar */}
      <Row absolute className="top-2 right-2">
        <ModalCloseButton aria-label="Close search"/>
      </Row>
    </Modal>
  );
}
