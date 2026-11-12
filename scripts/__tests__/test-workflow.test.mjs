// The pull request workflow: every pull request and every push to main runs
// the unit tests and the production build, read-only and with a time limit.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../../.github/workflows/test.yml', import.meta.url), 'utf8');

/** The text of a top-level key's block: its own line and the indented lines under it */
function block(key) {
  return new RegExp(`^${key}:.*\\n(?:(?: .*)?\\n)*`, 'm').exec(workflow)?.[0] ?? '';
}

/** The steps of the workflow's job, in order */
function steps(text) {
  return text.split(/\n(?= {6}- name: )/).slice(1).map((step) => ({
    if: /\n {8}if: (.*)/.exec(step)?.[1],
    run: /\n {8}run: (.*)/.exec(step)?.[1],
    uses: /\n {8}uses: (.*)/.exec(step)?.[1],
    text: step,
  }));
}

test('the workflow runs for pull requests and for pushes to main', () => {
  const on = block('on');
  assert.match(on, /^ {2}pull_request:\s*$/m);
  assert.match(on, /^ {2}push:\n {4}branches: \[main\]$/m);
});

test('the workflow token is read-only', () => {
  assert.equal(block('permissions').trim(), 'permissions:\n  contents: read');
  assert.doesNotMatch(workflow, /:\s*write\b/);
});

test('runs are grouped per ref and every job has a time limit', () => {
  assert.match(block('concurrency'), /^ {2}group: \S*\$\{\{ github\.ref \}\}/m);
  const jobs = workflow.slice(workflow.indexOf('\njobs:\n')).split(/\n(?= {2}[\w-]+:\n)/).slice(1);
  assert.ok(jobs.length > 0, 'no jobs');
  for (const job of jobs) assert.match(job, /\n {4}timeout-minutes: \d+\n/);
});

test('it installs with npm ci on Node 24, then tests, then builds, with no step skipped', () => {
  const list = steps(workflow);
  const order = ['npm ci', 'npm test', 'npm run build'].map((run) => list.findIndex((step) => step.run === run));
  assert.ok(order.every((index) => index !== -1), `missing a step: ${order}`);
  assert.deepEqual(order, [...order].sort((a, b) => a - b), 'install, test and build are out of order');
  assert.ok(list.every((step) => step.if === undefined), 'a step is conditional');
  assert.doesNotMatch(workflow, /continue-on-error/);

  const node = list.find((step) => step.uses?.startsWith('actions/setup-node@'));
  assert.ok(node, 'no setup-node step');
  assert.match(node.text, /\n {10}node-version: '24'\n/);
});

test('every action is pinned to a version', () => {
  const used = [...workflow.matchAll(/^\s*(?:- )?uses: (\S+)$/gm)].map((match) => match[1]);
  assert.ok(used.length >= 2);
  for (const action of used) assert.match(action, /@(v\d+(\.\d+){0,2}|[0-9a-f]{40})$/, action);
});
