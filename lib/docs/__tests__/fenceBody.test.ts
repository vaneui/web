// Unit tests for the fence body helpers the page route and the examples build
// share. Run with:
//   npx tsx --test lib/docs/__tests__/fenceBody.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { dedent, expandLeadingTabs, fenceKey } from '../fenceBody.mjs';

test('expandLeadingTabs expands leading tabs to the next multiple of 4 columns', () => {
  assert.equal(expandLeadingTabs('\t<A/>'), '    <A/>');
  assert.equal(expandLeadingTabs('  \t<A/>'), '    <A/>');
  assert.equal(expandLeadingTabs('\t \t<A/>'), '        <A/>');
  // Tabs after the first other character stay
  assert.equal(expandLeadingTabs('  <A\tb/>'), '  <A\tb/>');
  assert.equal(expandLeadingTabs('<A/>'), '<A/>');
});

test('dedent removes the indentation common to the non-blank lines', () => {
  assert.equal(dedent('   <Row>\n     <A/>\n\n   </Row>'), '<Row>\n  <A/>\n\n</Row>');
  // A tab after the common indentation stays a full tab stop, as in Markdoc,
  // which keeps it when it strips a list item's indentation
  assert.equal(dedent('  <Row>\n  \t<A/>\n  </Row>'), '<Row>\n    <A/>\n</Row>');
  assert.equal(dedent('   <Row>\n   \t<A/>\n   </Row>'), '<Row>\n    <A/>\n</Row>');
  // A tab that straddles the cut leaves the rest of its width as spaces
  assert.equal(dedent('   <Row>\n  \t<A/>'), '<Row>\n <A/>');
  // Whitespace-only lines become empty and do not count
  assert.equal(dedent('    <A/>\n  \n    <B/>'), '<A/>\n\n<B/>');
  assert.equal(dedent('<A/>\n  <B/>'), '<A/>\n  <B/>');
  assert.equal(dedent(''), '');
});

test('fenceKey pairs what Markdoc renders with what the extractor reads', () => {
  // Markdoc: container indentation stripped, LF, a trailing newline
  const rendered = '<Row>\n  <A/>\n</Row>\n';
  // Extractor on an indented include in a list item, read with CRLF
  const extracted = '   <Row>\r\n     <A/>\r\n   </Row>';
  assert.equal(fenceKey(rendered), '<Row>\n  <A/>\n</Row>');
  assert.equal(fenceKey(extracted), fenceKey(rendered));
  assert.notEqual(fenceKey('<A/>'), fenceKey('<B/>'));
});
