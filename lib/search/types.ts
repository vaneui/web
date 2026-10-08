/** One docs category, in sidebar order; `index` is the `[02]` label the sidebar shows next to it */
export interface SearchSection {
  name: string;
  index: string;
}

/** One searchable unit: a whole page, or one heading on it with the text up to the next heading */
export interface SearchEntry {
  /** Page URL, with `#id` for a heading */
  url: string;
  /** Page name, as in the sidebar */
  page: string;
  /** Position in `SearchIndex.sections` */
  section: number;
  /** Heading trail on the page (`["Modal Props"]`, `["1.4.3", "Fixed"]`); empty for the page itself */
  path: string[];
  /** Plain text: the description and intro for a page, the section body for a heading */
  text: string;
  /** Rank multiplier for pages that would otherwise crowd results (the changelog); 1 when absent */
  weight?: number;
}

export interface SearchIndex {
  sections: SearchSection[];
  entries: SearchEntry[];
}
