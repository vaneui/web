'use client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useIsDark } from '../utils/useIsDark';

export function CodeEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const isDark = useIsDark();

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={isDark ? 'dark' : 'light'}
      extensions={[javascript({ jsx: true, typescript: true })]}
      height="100%"
      className="h-full text-sm"
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }}
    />
  );
}
