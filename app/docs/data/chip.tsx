import { Chip, Row } from "@vaneui/ui";
import { DocsComponentExample } from "../docsSections";

export const chipExamples: DocsComponentExample[] = [
  {
    title: 'Basic Chip',
    description: 'Default chip with default styling.',
    code: `<Chip>Default</Chip>`,
    component: <Chip>Default</Chip>,
  },
  {
    title: 'Chip Sizes',
    description: 'Chips come in different sizes.',
    code: `<Row>
  <Chip xs>XS</Chip>
  <Chip sm>SM</Chip>
  <Chip>MD</Chip>
  <Chip lg>LG</Chip>
  <Chip xl>XL</Chip>
</Row>`,
    component: (
      <Row>
        <Chip xs>XS</Chip>
        <Chip sm>SM</Chip>
        <Chip>MD</Chip>
        <Chip lg>LG</Chip>
        <Chip xl>XL</Chip>
      </Row>
    ),
  },
  {
    title: 'Chip Appearances',
    description: 'Chips come in different appearances to convey purpose.',
    code: `<Row className="flex-wrap">
  <Chip>Default</Chip>
  <Chip primary>Primary</Chip>
  <Chip secondary>Secondary</Chip>
  <Chip accent>Accent</Chip>
  <Chip success>Success</Chip>
  <Chip danger>Danger</Chip>
  <Chip warning>Warning</Chip>
  <Chip info>Info</Chip>
</Row>`,
    component: (
      <Row className="flex-wrap">
        <Chip>Default</Chip>
        <Chip primary>Primary</Chip>
        <Chip secondary>Secondary</Chip>
        <Chip accent>Accent</Chip>
        <Chip success>Success</Chip>
        <Chip danger>Danger</Chip>
        <Chip warning>Warning</Chip>
        <Chip info>Info</Chip>
      </Row>
    ),
  },
  {
    title: 'Chip with Icon',
    description: 'Chips can contain icons along with text.',
    code: `<Row>
  <Chip primary>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
    With Icon
  </Chip>
  <Chip success>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    Approved
  </Chip>
</Row>`,
    component: (
      <Row>
        <Chip primary>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          With Icon
        </Chip>
        <Chip success>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Approved
        </Chip>
      </Row>
    ),
  },
];