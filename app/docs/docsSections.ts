import { DocsSection } from "./types";
import { DocsPagePart } from "./types";
import { docsSectionsMeta } from "./docsMetadata";
import { buttonExamples } from "./data/basic-components/button";
import { badgeExamples } from "./data/basic-components/badge";
import { chipExamples } from "./data/basic-components/chip";
import { checkboxExamples } from "./data/basic-components/checkbox";
import { labelExamples } from "./data/basic-components/label";
import { codeExamples } from "./data/basic-components/code";
import { rowExamples } from "./data/layout-components/row";
import { colExamples } from "./data/layout-components/col";
import { cardExamples } from "./data/layout-components/card";
import { stackExamples } from "./data/layout-components/stack";
import { containerExamples } from "./data/layout-components/container";
import { sectionExamples } from "./data/layout-components/section";
import { dividerExamples } from "./data/basic-components/divider";
import { textExamples } from "./data/typography-components/text";
import { titleExamples } from "./data/typography-components/title";
import { pageTitleExamples } from "./data/typography-components/pagetitle";
import { sectionTitleExamples } from "./data/typography-components/sectiontitle";
import { linkExamples } from "./data/typography-components/link";
import { listExamples } from "./data/typography-components/list";
import { grid3Examples } from "./data/layout-components/grid3";
import { grid4Examples } from "./data/layout-components/grid4";
import { grid5Examples } from "./data/layout-components/grid5";
import { grid6Examples } from "./data/layout-components/grid6";
import { inputExamples } from "./data/basic-components/input";
import { imgExamples } from "./data/basic-components/img";
import { grid2Examples } from "./data/layout-components/grid2";
import { overlayExamples } from "./data/overlay-components/overlay";
import { modalExamples } from "./data/overlay-components/modal";
import { popupExamples } from "./data/overlay-components/popup";
import { iconExamples } from "./data/basic-components/icon-component";
import { iconButtonExamples } from "./data/basic-components/iconbutton";
import { kbdExamples } from "./data/basic-components/kbd";
import { markExamples } from "./data/basic-components/mark";
import { blockquoteExamples } from "./data/typography-components/blockquote";
import { menuExamples } from "./data/overlay-components/menu";
import { navLinkExamples } from "./data/navigation-components/navlink";

// Maps section-slug/page-slug to the JSX example parts for that page.
// Pages without an entry here (e.g. markdown-only guides) get an empty parts array.
const partsMap: Record<string, DocsPagePart[]> = {
  // Basic Components
  'basic-components/button': buttonExamples,
  'basic-components/badge': badgeExamples,
  'basic-components/chip': chipExamples,
  'basic-components/checkbox': checkboxExamples,
  'basic-components/label': labelExamples,
  'basic-components/code': codeExamples,
  'basic-components/divider': dividerExamples,
  'basic-components/input': inputExamples,
  'basic-components/img': imgExamples,
  'basic-components/icon': iconExamples,
  'basic-components/icon-button': iconButtonExamples,
  'basic-components/kbd': kbdExamples,
  'basic-components/mark': markExamples,
  // Layout Components
  'layout-components/section': sectionExamples,
  'layout-components/container': containerExamples,
  'layout-components/row': rowExamples,
  'layout-components/col': colExamples,
  'layout-components/stack': stackExamples,
  'layout-components/card': cardExamples,
  'layout-components/grid2': grid2Examples,
  'layout-components/grid3': grid3Examples,
  'layout-components/grid4': grid4Examples,
  'layout-components/grid5': grid5Examples,
  'layout-components/grid6': grid6Examples,
  // Overlay Components
  'overlay-components/overlay': overlayExamples,
  'overlay-components/modal': modalExamples,
  'overlay-components/popup': popupExamples,
  'overlay-components/menu': menuExamples,
  // Navigation Components
  'navigation-components/navlink': navLinkExamples,
  // Typography Components
  'typography-components/text': textExamples,
  'typography-components/title': titleExamples,
  'typography-components/page-title': pageTitleExamples,
  'typography-components/section-title': sectionTitleExamples,
  'typography-components/link': linkExamples,
  'typography-components/list': listExamples,
  'typography-components/blockquote': blockquoteExamples,
};

export const docsSections: DocsSection[] = docsSectionsMeta.map(section => ({
  ...section,
  pages: section.pages.map(page => ({
    ...page,
    parts: partsMap[`${section.slug}/${page.slug}`] ?? [],
  })),
}));
