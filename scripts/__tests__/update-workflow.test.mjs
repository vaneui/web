// The scheduled update workflow must run the unit tests before it builds and
// pushes a new @vaneui release: lib/docs/includes.mjs rewraps the library's
// include error messages, and only the tests notice when their format changes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(new URL('../../.github/workflows/update-vaneui.yml', import.meta.url), 'utf8');

/** The steps of the workflow's job: the `if` and `run` lines of each */
function steps(text) {
  return text.split(/\n(?= {6}- name: )/).slice(1).map((step) => ({
    if: /\n {8}if: (.*)/.exec(step)?.[1],
    run: /\n {8}run: (.*)/.exec(step)?.[1],
  }));
}

test('the update workflow runs the unit tests before it builds and pushes an update', () => {
  const list = steps(workflow);
  const tests = list.findIndex((step) => step.run === 'npm test');
  const build = list.findIndex((step) => step.run === 'npm run build');
  assert.notEqual(build, -1, 'no `npm run build` step');
  assert.notEqual(tests, -1, 'no `npm test` step');
  assert.ok(tests < build, '`npm test` runs after the build');
  assert.equal(list[tests].if, list[build].if);
});
