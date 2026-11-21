import { Badge, Button, Card, Col, Container, Input, PageTitle, Row, Section, Select, Table, Tbody, Td, Text, Th, Thead, Tr } from "@vaneui/ui";

const orders = [
  { id: "1042", customer: "Ana Diaz", date: "Nov 18", status: "Paid", total: "$120.00" },
  { id: "1041", customer: "Lee Park", date: "Nov 17", status: "Refunded", total: "$48.50" },
  { id: "1040", customer: "Sam Ortiz", date: "Nov 17", status: "Pending", total: "$1,310.00" },
  { id: "1039", customer: "Northwind Traders", date: "Nov 16", status: "Paid", total: "$86.20" },
];
const tone: Record<string, { success?: boolean; warning?: boolean; danger?: boolean }> = {
  Paid: { success: true },
  Pending: { warning: true },
  Refunded: { danger: true },
};

export function Orders() {
  return (
    <Section>
      <Container itemsStretch>
        <Col lg>
          <Row justifyBetween flexWrap>
            <PageTitle>Orders</PageTitle>
            <Button type="button" secondary>Export CSV</Button>
          </Row>
          <Row mobileStack itemsStretch>
            <Input type="search" aria-label="Search orders" placeholder="Search by customer or order number" />
            <Select aria-label="Status" defaultValue="all" wFit noShrink mobileWFull>
              <option value="all">All statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </Select>
            <Select aria-label="Date" defaultValue="30" wFit noShrink mobileWFull>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </Select>
          </Row>
          <Card noPadding overflowXAuto mobileHide>
            <Table>
              <Thead>
                <Tr>
                  <Th scope="col">Order</Th>
                  <Th scope="col">Customer</Th>
                  <Th scope="col">Date</Th>
                  <Th scope="col">Status</Th>
                  <Th scope="col" textRight>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((o) => (
                  <Tr key={o.id}>
                    <Td className="whitespace-nowrap">#{o.id}</Td>
                    <Td>{o.customer}</Td>
                    <Td className="whitespace-nowrap">{o.date}</Td>
                    <Td><Badge {...tone[o.status]}>{o.status}</Badge></Td>
                    <Td textRight className="whitespace-nowrap tabular-nums">{o.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
          <Col sm mobileShow>
            {orders.map((o) => (
              <Card key={o.id} sm>
                <Row justifyBetween>
                  <Text fontSemibold>#{o.id}</Text>
                  <Badge {...tone[o.status]}>{o.status}</Badge>
                </Row>
                <Row justifyBetween>
                  <Text sm secondary>{o.customer}</Text>
                  <Text sm fontSemibold className="tabular-nums">{o.total}</Text>
                </Row>
              </Card>
            ))}
          </Col>
          <Row tag="nav" aria-label="Pagination" justifyBetween flexWrap>
            <Text sm secondary>Showing 1 to 4 of 128</Text>
            <Row sm>
              <Button type="button" secondary disabled>Previous</Button>
              <Button type="button" secondary>Next</Button>
            </Row>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}
