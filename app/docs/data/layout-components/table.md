---
componentKey: table
importPath: 'import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Caption } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/table/Table.tsx
since: 0.9.0
---

## Basic usage

Compose a table from `Table`, `Thead`, `Tbody`, `Tr`, `Th`, and `Td`. Header cells (`Th`) render semibold with muted text, and every cell gets a bottom row rule. `Table` defaults to `md`, `wFull`, and `noBorder`. Add `scope="col"` to header cells so assistive technology associates each column with its data.

```tsx demo
<Table>
  <Thead>
    <Tr>
      <Th scope="col">Service</Th>
      <Th scope="col">Region</Th>
      <Th scope="col" textRight>Latency</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>api-gateway</Td>
      <Td>europe-west</Td>
      <Td textRight>42ms</Td>
    </Tr>
    <Tr>
      <Td>auth</Td>
      <Td>us-east</Td>
      <Td textRight>88ms</Td>
    </Tr>
  </Tbody>
</Table>
```

## Sizes

The size prop scales both text and cell padding, and it cascades from the table to every cell. Set it once on `Table` to size the whole table: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Stack>
  <Table sm>
    <Thead><Tr><Th scope="col">Size</Th><Th scope="col" textRight>Value</Th></Tr></Thead>
    <Tbody><Tr><Td>sm table</Td><Td textRight>compact</Td></Tr></Tbody>
  </Table>
  <Table>
    <Thead><Tr><Th scope="col">Size</Th><Th scope="col" textRight>Value</Th></Tr></Thead>
    <Tbody><Tr><Td>md table</Td><Td textRight>default</Td></Tr></Tbody>
  </Table>
  <Table lg>
    <Thead><Tr><Th scope="col">Size</Th><Th scope="col" textRight>Value</Th></Tr></Thead>
    <Tbody><Tr><Td>lg table</Td><Td textRight>spacious</Td></Tr></Tbody>
  </Table>
</Stack>
```

## Per-cell and per-row size

A size on a `Th`, `Td`, or `Tr` overrides the table for that cell or row. Here an `xs` table keeps one `xl` cell and one `lg` row. An explicit `md` cell also holds `md` against a differently sized table.

```tsx demo
<Table xs>
  <Thead><Tr><Th scope="col">Metric</Th><Th scope="col" xl textRight>xl cell</Th></Tr></Thead>
  <Tbody>
    <Tr><Td>tiny row</Td><Td xl textRight>large</Td></Tr>
    <Tr lg><Td>lg row</Td><Td textRight>lg row</Td></Tr>
  </Tbody>
</Table>
```

## Column alignment

Set `textLeft` (default), `textCenter`, or `textRight` per cell. Right-align numeric columns so the digits line up.

```tsx demo
<Table>
  <Thead>
    <Tr>
      <Th scope="col">Plan</Th>
      <Th scope="col" textCenter>Seats</Th>
      <Th scope="col" textRight>Price</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr><Td>Starter</Td><Td textCenter>3</Td><Td textRight>$0</Td></Tr>
    <Tr><Td>Team</Td><Td textCenter>25</Td><Td textRight>$99</Td></Tr>
    <Tr><Td>Business</Td><Td textCenter>100</Td><Td textRight>$499</Td></Tr>
  </Tbody>
</Table>
```

## Footer row

Add a `Tfoot` for totals or summary rows. Header cells (`Th`) carry the semibold treatment, so they read well for a total.

```tsx demo
<Table>
  <Thead>
    <Tr><Th scope="col">Item</Th><Th scope="col" textRight>Amount</Th></Tr>
  </Thead>
  <Tbody>
    <Tr><Td>Compute</Td><Td textRight>$120</Td></Tr>
    <Tr><Td>Storage</Td><Td textRight>$30</Td></Tr>
  </Tbody>
  <Tfoot>
    <Tr><Th scope="row">Total</Th><Th textRight>$150</Th></Tr>
  </Tfoot>
</Table>
```

## Caption

`Caption` renders a `<caption>` element that titles the table for screen readers. Its text follows the table size and accepts its own size to override.

```tsx demo
<Table>
  <Caption>Monthly active users by region</Caption>
  <Thead>
    <Tr><Th scope="col">Region</Th><Th scope="col" textRight>Users</Th></Tr>
  </Thead>
  <Tbody>
    <Tr><Td>Europe</Td><Td textRight>18,400</Td></Tr>
    <Tr><Td>North America</Td><Td textRight>22,100</Td></Tr>
  </Tbody>
</Table>
```

## Outer border

`Table` has no border by default. Add `border` for an appearance-colored outer border. The table uses collapsed borders, so the corners stay square and there is no shape prop.

```tsx demo
<Table border>
  <Thead><Tr><Th scope="col">Name</Th><Th scope="col">Role</Th></Tr></Thead>
  <Tbody>
    <Tr><Td>Ada</Td><Td>Engineer</Td></Tr>
    <Tr><Td>Grace</Td><Td>Architect</Td></Tr>
  </Tbody>
</Table>
```

## Components in cells

Cells accept any VaneUI component. Drop a `Badge` into a status column.

```tsx demo
<Table>
  <Thead>
    <Tr><Th scope="col">Service</Th><Th scope="col">Region</Th><Th scope="col">Status</Th></Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>api-gateway</Td>
      <Td>europe-west</Td>
      <Td><Badge success filled>Healthy</Badge></Td>
    </Tr>
    <Tr>
      <Td>worker</Td>
      <Td>us-east</Td>
      <Td><Badge warning filled>Degraded</Badge></Td>
    </Tr>
    <Tr>
      <Td>scheduler</Td>
      <Td>us-east</Td>
      <Td><Badge danger filled>Down</Badge></Td>
    </Tr>
  </Tbody>
</Table>
```

## Customizing

Set table defaults with `ThemeProvider`'s `themeDefaults`. The `table` node has a slot for each part: `main`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, and `caption`.

```tsx demo
<ThemeProvider themeDefaults={{
  table: { main: { sm: true } },
}}>
  <Table>
    <Thead><Tr><Th scope="col">Compact by default</Th></Tr></Thead>
    <Tbody><Tr><Td>Set the size once on the provider</Td></Tr></Tbody>
  </Table>
</ThemeProvider>
```
