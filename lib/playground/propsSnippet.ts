/**
 * The Button the landing page's prop demo hands to the playground. The demo links to
 * `/playground?props=filled,pill`, and the playground builds the code from these names only,
 * so a link can choose props but never inject code.
 */

/** The demo's props, in the order the code lists them */
export const DEMO_PROPS = ['filled', 'ghost', 'pill', 'sharp', 'lg'] as const;
export type DemoProp = typeof DEMO_PROPS[number];

/** Props in one group: a Button holds one value per group, so turning one on turns the other off */
const SAME_GROUP: Partial<Record<DemoProp, DemoProp>> = { filled: 'ghost', ghost: 'filled', pill: 'sharp', sharp: 'pill' };

const isDemoProp = (name: string): name is DemoProp => (DEMO_PROPS as readonly string[]).includes(name);

/** The props in code order, each once, and the first of two from one group */
function normalize(props: readonly DemoProp[]): DemoProp[] {
  const kept: DemoProp[] = [];
  for (const p of props) {
    const other = SAME_GROUP[p];
    if (!kept.includes(p) && !(other && kept.includes(other))) kept.push(p);
  }
  return DEMO_PROPS.filter(p => kept.includes(p));
}

/** Turns one prop on or off; turning it on turns off the other prop of its group */
export function toggleProp(props: readonly DemoProp[], prop: DemoProp): DemoProp[] {
  if (props.includes(prop)) return props.filter(p => p !== prop);
  return normalize([prop, ...props]);
}

/** The code for a Button with these props, as a playground component body */
export function propsSnippet(props: readonly DemoProp[]): string {
  const tag = ['Button', ...normalize(props)].join(' ');
  return `// Add or remove a prop and watch the button change.
// More to try: accent, danger, xl, outline.

return (
  <Row>
    <${tag}>Save changes</Button>
    <Button secondary>Cancel</Button>
  </Row>
);
`;
}

/** The playground link for a Button with these props */
export function propsHref(props: readonly DemoProp[]): string {
  return `/playground?props=${normalize(props).join(',')}`;
}

/** The props of a `?props=` link (unknown names dropped), or null when the URL has none */
export function parseDemoProps(search: string): DemoProp[] | null {
  const raw = new URLSearchParams(search).get('props');
  if (raw == null) return null;
  return normalize(raw.split(',').map(p => p.trim()).filter(isDemoProp));
}

/** The URL without the `props` parameter; other parameters and the hash stay */
export function withoutProps(href: string): string {
  const url = new URL(href, 'https://vaneui.com');
  url.searchParams.delete('props');
  return url.pathname + url.search + url.hash;
}
