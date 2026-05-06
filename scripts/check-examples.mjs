#!/usr/bin/env node
// Wraps `build-examples.mjs && tsc --noEmit -p tsconfig.examples.json` and
// rewrites tsc diagnostic paths from the generated wrapper file back to the
// originating markdown source. The first line of every wrapper is
// `// @vane-source: <md>:<line>` — we read that header once per offending
// wrapper and substitute it into matching diagnostic lines.
//
// Exits with the inner tsc exit code (build-examples failures bubble up too).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(__filename, '..', '..');

const VANE_SOURCE_RE = /^\/\/\s*@vane-source:\s*(.+?):(\d+)\s*$/;
// Matches diagnostic paths that point inside our generated examples dir.
// Captures: [1]=path-to-wrapper, [2]=line, [3]=col, [4]=remaining tail.
const DIAG_RE = /([\w./\\-]*\.generated[\\/]examples[\\/][\w.-]+\.tsx)(?::|\()(\d+)[,:](\d+)\)?(.*)$/;

/** @type {Map<string, { md: string, line: number } | null>} */
const headerCache = new Map();

function readVaneHeader(absPath) {
  if (headerCache.has(absPath)) return headerCache.get(absPath);
  let header = null;
  try {
    const fd = fs.openSync(absPath, 'r');
    const buf = Buffer.alloc(512);
    const n = fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    const firstLine = buf.slice(0, n).toString('utf8').split(/\r?\n/, 1)[0];
    const m = firstLine.match(VANE_SOURCE_RE);
    if (m) header = { md: m[1], line: parseInt(m[2], 10) };
  } catch {
    /* ignore — leave header null and pass diagnostic through unchanged. */
  }
  headerCache.set(absPath, header);
  return header;
}

function rewriteLine(line) {
  return line.replace(DIAG_RE, (full, p, _l, col, tail) => {
    const abs = path.isAbsolute(p) ? p : path.resolve(REPO_ROOT, p);
    const hdr = readVaneHeader(abs);
    if (!hdr) return full;
    // Point at the .md and use the fence's opening line. We deliberately don't
    // try to compute an exact line within the fence — the body lines are
    // available but folding the offset onto the fence start would still be
    // approximate (header + setup + JSX wrapping shift the position). The
    // fence start line is unambiguous and good enough for navigation.
    return `${hdr.md}:${hdr.line}:${col}${tail}`;
  });
}

function rewriteStream(text) {
  return text.split(/\r?\n/).map(rewriteLine).join('\n');
}

function run(cmd, args, { useShell = false } = {}) {
  const res = spawnSync(cmd, args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    shell: useShell,
  });
  if (res.error) throw res.error;
  return res;
}

// 1) Build wrappers. Use the same node binary that's running this script — no
// shell needed (the Windows-spaces-in-path quoting bug only bites under shell).
const build = run(process.execPath, ['scripts/build-examples.mjs']);
process.stdout.write(build.stdout || '');
process.stderr.write(build.stderr || '');
if (build.status !== 0) process.exit(build.status ?? 1);

// 2) Typecheck the generated wrappers. `npx` is a .cmd on Windows; use shell:
// true there so the resolver finds it. spawnSync auto-quotes argv when shell
// is set (Node 18+).
const tsc = run('npx', ['tsc', '--noEmit', '-p', 'tsconfig.examples.json'], {
  useShell: process.platform === 'win32',
});
process.stdout.write(rewriteStream(tsc.stdout || ''));
process.stderr.write(rewriteStream(tsc.stderr || ''));
process.exit(tsc.status ?? 1);
