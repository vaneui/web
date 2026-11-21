import { Badge, Card, Col, Container, Grid4, PageTitle, Row, Section, Select, Table, Tbody, Td, Text, Th, Thead, Title, Tr } from "@vaneui/ui";

const stats = [
  { label: "Revenue", value: "$48,210", change: "+12% from last month", up: true },
  { label: "Active users", value: "2,931", change: "+4% from last month", up: true },
  { label: "Churn", value: "1.8%", change: "+0.3 points", up: false },
  { label: "Open tickets", value: "37", change: "5 more than last week", up: false },
];
const bars = [42, 55, 48, 61, 70, 66, 74, 81, 77, 88, 92, 85];
const customers = [
  { name: "Northwind", amount: "$8,420" },
  { name: "Globex", amount: "$6,105" },
  { name: "Initech", amount: "$4,880" },
  { name: "Umbrella", amount: "$3,215" },
];
const activity = [
  { id: "1042", who: "Ana Diaz", what: "Upgraded to Pro", when: "Today, 09:12", status: "Paid" },
  { id: "1041", who: "Lee Park", what: "Invited 3 members", when: "Yesterday", status: "Done" },
  { id: "1040", who: "Sam Ortiz", what: "Card payment failed", when: "Yesterday", status: "Failed" },
];

export function Dashboard() {
  return (
    <Section>
      <Container itemsStretch>
        <Col lg>
          <Row justifyBetween flexWrap>
            <PageTitle>Overview</PageTitle>
            <Select aria-label="Period" defaultValue="30" wFit noShrink>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </Select>
          </Row>
          <Grid4 className="max-tablet:grid-cols-2">
            {stats.map((s) => (
              <Card key={s.label}>
                <Col xs>
                  <Text sm secondary>{s.label}</Text>
                  <Title tag="p" className="tabular-nums">{s.value}</Title>
                  <Text xs success={s.up} danger={!s.up}>{s.change}</Text>
                </Col>
              </Card>
            ))}
          </Grid4>
          <Row tabletStack itemsStretch>
            <Card flex1 className="min-w-0">
              <Title>Revenue by month</Title>
              <Row xs itemsEnd className="h-48" role="img" aria-label="Revenue grew from 42 to 92 thousand dollars over 12 months">
                {bars.map((v, i) => (
                  <Col key={i} flex1 primary filled noGap className="rounded-t-sm" style={{ height: `${v}%` }} />
                ))}
              </Row>
            </Card>
            <Card tabletWFull className="w-80">
              <Title>Top customers</Title>
              <Col sm>
                {customers.map((c) => (
                  <Row key={c.name} justifyBetween>
                    <Text sm>{c.name}</Text>
                    <Text sm fontSemibold className="tabular-nums">{c.amount}</Text>
                  </Row>
                ))}
              </Col>
            </Card>
          </Row>
          <Card noPadding overflowXAuto>
            <Table>
              <Thead>
                <Tr>
                  <Th scope="col">Customer</Th>
                  <Th scope="col">Activity</Th>
                  <Th scope="col">When</Th>
                  <Th scope="col" textRight>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activity.map((a) => (
                  <Tr key={a.id}>
                    <Td className="whitespace-nowrap">{a.who}</Td>
                    <Td>{a.what}</Td>
                    <Td className="whitespace-nowrap">{a.when}</Td>
                    <Td textRight>
                      <Badge success={a.status === "Paid"} danger={a.status === "Failed"}>{a.status}</Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
        </Col>
      </Container>
    </Section>
  );
}
