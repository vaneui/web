import { Chip, Row } from "@vaneui/ui";
import { DocsComponentExample } from "../docsSections";
import { CheckSquare, Crosshair, Heart, X } from "react-feather";

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
    code: `<Row flexWrap>
  <Chip xs>XS</Chip>
  <Chip sm>SM</Chip>
  <Chip>MD</Chip>
  <Chip lg>LG</Chip>
  <Chip xl>XL</Chip>
</Row>`,
    component: (
      <Row flexWrap>
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
    code: `<Row flexWrap>
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
      <Row flexWrap>
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
    code: `<Row flexWrap>
  <Chip primary>
    <Heart className="size-4"/>
    With Icon
  </Chip>
  <Chip success>
    <CheckSquare className="size-4"/>
    Approved
  </Chip>
  <Chip danger>
    <X className="size-4"/>
    Failed
  </Chip>
</Row>`,
    component: (
      <Row flexWrap>
        <Chip primary>
          <Heart className="size-4"/>
          With Icon
        </Chip>
        <Chip success>
          <CheckSquare className="size-4"/>
          Approved
        </Chip>
        <Chip danger>
          <X className="size-4"/>
          Failed
        </Chip>
      </Row>
    ),
  },
];