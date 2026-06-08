import type { ComponentCategoryKey } from "@vaneui/ui";

// Categories shared by ~all components — documented once on /docs/reference/common-props
// instead of repeated on every component page. Keep this list limited to genuinely-shared
// layout / utility / typography categories so component-specific categories (size, appearance,
// variant, shape, padding, fontWeight, etc.) still surface in the per-page table.
export const COMMON_DOC_CATEGORIES = new Set<ComponentCategoryKey>([
  'hide',
  'items',
  'justify',
  'alignSelf',
  'justifySelf',
  'position',
  'display',
  'overflow',
  'wrap',
  'gap',
  'flexDirection',
  'reverse',
  'border',
  'shadow',
  'ring',
  'focusVisible',
  'cursor',
  'transition',
  'whitespace',
  'width',
  'height',
  'transparent',
  'responsive',
  'objectFit',
  'blur',
  'pointerEvents',
  'minWidth',
  'maxHeight',
  'orientation',
]);
