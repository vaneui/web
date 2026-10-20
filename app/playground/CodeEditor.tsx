'use client';

import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useIsDark } from '../utils/useIsDark';

const extensions = [
  javascript({ jsx: true, typescript: true }),
  // The editable area is a bare contenteditable; this gives it a name for screen readers
  EditorView.contentAttributes.of({ 'aria-label': 'Code editor' }),
];

export function CodeEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const isDark = useIsDark();

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={isDark ? 'dark' : 'light'}
      extensions={extensions}
      height="100%"
      className="h-full text-sm"
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }}
    />
  );
}
