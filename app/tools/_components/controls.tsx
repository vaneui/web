'use client';

// Small controls shared by the free tools: a color field, a segmented switch, a copyable value
// and a tabbed code panel.
import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, Link2 } from 'react-feather';
import { Button, Col, Field, Input, Label, Row, Text } from '@vaneui/ui';
import { CodeBlock } from '../../components/CodeBlock';
import { CopyButton } from '../../landing/frame';
import { oklchToRgb, parseColor, toHex, type Oklch } from '../../../lib/color/color';

/**
 * A color typed as any CSS color (hex, rgb(), hsl(), oklch()) or picked with the native picker.
 * The text the person types is kept while they type; it follows `value` when it changes elsewhere.
 * `onChange` also gets the alpha that was typed (1 when opaque); pass `alpha` back to show it.
 */
export function ColorField({ label, value, alpha = 1, onChange, description, display }: {
  label: string;
  value: Oklch;
  alpha?: number;
  onChange: (c: Oklch, alpha: number) => void;
  description?: string;
  /** How the value is written back into the field when it changes elsewhere */
  display?: (c: Oklch) => string;
}) {
  const show = display ?? ((c: Oklch) => toHex(oklchToRgb(c), alpha));
  const [text, setText] = useState(() => show(value));
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const shown = show(value);

  // Follow outside changes (a slider, a preset) unless the person is typing in this field.
  // Adjusted during render, the pattern React recommends over an effect for derived state.
  const [synced, setSynced] = useState(shown);
  if (!focused && shown !== synced) {
    setSynced(shown);
    setText(shown);
    setError('');
  }

  const commit = (raw: string, keepAlpha = false) => {
    setText(raw);
    const parsed = parseColor(raw);
    if (parsed) {
      setError('');
      onChange(parsed.oklch, keepAlpha ? alpha : parsed.alpha);
    } else {
      setError(raw.trim() ? 'Use hex, rgb(), hsl() or oklch().' : '');
    }
  };

  return (
    <Field label={label} description={description} error={error}>
      <Row xs>
        <input type="color" aria-label={`${label}: color picker`} value={toHex(oklchToRgb(value))}
               onChange={e => commit(e.target.value, true)}
               className="h-8 w-10 shrink-0 cursor-pointer rounded-md border border-(--color-border-primary) bg-transparent p-0.5"/>
        <Input fontMono value={text} spellCheck={false} autoComplete="off"
               onChange={e => commit(e.target.value)}
               onFocus={() => setFocused(true)}
               onBlur={() => setFocused(false)}/>
      </Row>
    </Field>
  );
}

/** A row of buttons that acts like a radio group: one option is pressed */
export function Segmented<T extends string>({ label, options, value, onChange }: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <Row noGap border rounded flexWrap role="group" aria-label={label} className="w-fit max-w-full p-0.5">
      {options.map(o => {
        const on = o.value === value;
        return (
          <Button key={o.value} xs type="button" aria-pressed={on} onClick={() => onChange(o.value)}
                  filled={on} ghost={!on} secondary={!on} noInsetRing={!on}>
            {o.label}
          </Button>
        );
      })}
    </Row>
  );
}

/** A label and a monospace value with a copy button; `dense` fits a narrow column */
export function CopyValue({ label, value, dense }: { label: string; value: string; dense?: boolean }) {
  return (
    <Row justifyBetween borderB sm={dense} className="py-1.5 last:border-b-0">
      <Text sm secondary className={`${dense ? 'w-10' : 'w-16'} shrink-0`}>{label}</Text>
      <Text sm={!dense} xs={dense} fontMono truncate className="min-w-0 flex-1">{value}</Text>
      <CopyButton value={value} label={`Copy ${label}`}/>
    </Row>
  );
}

/** Export formats in tabs, each shown with syntax highlighting and a copy button */
export function CodeTabs({ tabs, label }: {
  label: string;
  tabs: { id: string; label: string; language: string; fileName?: string; code: string }[];
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find(t => t.id === active) ?? tabs[0];
  const id = useId();
  return (
    <Col sm>
      <Segmented label={label} options={tabs.map(t => ({ value: t.id, label: t.label }))}
                 value={current.id} onChange={setActive}/>
      <div id={id} role="region" aria-label={`${current.label} code`}>
        <CodeBlock code={current.code} language={current.language} fileName={current.fileName}/>
      </div>
    </Col>
  );
}

/** A button that copies a link to what is on screen, built from the tool's own state */
export function CopyLinkButton({ query, label = 'Copy link' }: { query: URLSearchParams; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}?${query}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };
  return (
    <>
      <Button type="button" secondary={!copied} success={copied} onClick={copy}>
        {copied ? <Check aria-hidden="true"/> : <Link2 aria-hidden="true"/>}
        {copied ? 'Link copied' : label}
      </Button>
      <span role="status" className="sr-only">{copied ? 'Link copied' : ''}</span>
    </>
  );
}

/** A native range input with a painted track (`track` is any CSS background) and its value */
export function Slider({ label, value, min, max, step, onChange, format, track }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  track: string;
}) {
  const id = useId();
  return (
    <Col xs>
      <Row justifyBetween>
        <Label htmlFor={id}>{label}</Label>
        <Text sm fontMono secondary>{format(value)}</Text>
      </Row>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
             onChange={e => onChange(Number(e.target.value))}
             aria-valuetext={format(value)}
             className="tool-range" style={{ '--track': track } as React.CSSProperties}/>
    </Col>
  );
}
