import { Button, Col, Input, NavLink, PageTitle, Row, Stack, Text } from "@vaneui/ui";

const messages = [
  { id: "m1", from: "Ana Diaz", subject: "Invoice for October", date: "09:12", body: "Hi, the invoice for October is attached. Let me know if anything looks off." },
  { id: "m2", from: "Lee Park", subject: "Team offsite plan", date: "Yesterday", body: "Here is the draft agenda for the offsite. Comments welcome by Friday." },
  { id: "m3", from: "Sam Ortiz", subject: "Re: API rate limits on the free plan", date: "Mon", body: "We raised the limit to 600 requests a minute for your account." },
];

export function Inbox({ selectedId }: { selectedId?: string }) {
  const selected = messages.find((m) => m.id === selectedId);
  return (
    <Row noGap itemsStretch className="min-h-dvh">
      <Col tag="nav" aria-label="Messages" noGap borderR noShrink tabletHide={!!selected} tabletWFull className="w-80">
        <Stack sm borderB>
          <Input type="search" aria-label="Search mail" placeholder="Search mail" />
        </Stack>
        <Col noGap overflowYAuto>
          {messages.map((m) => (
            <NavLink key={m.id} href={`/inbox/${m.id}`} active={m.id === selectedId} sharp>
              <Col xs flex1 className="min-w-0">
                <Row justifyBetween>
                  <Text sm fontSemibold>{m.from}</Text>
                  <Text xs secondary>{m.date}</Text>
                </Row>
                <Text sm truncate>{m.subject}</Text>
              </Col>
            </NavLink>
          ))}
        </Col>
      </Col>
      <Stack tag="main" flex1 tabletHide={!selected} className="min-w-0">
        {selected ? (
          <Col>
            <Button href="/inbox" tabletShow ghost secondary>Back to inbox</Button>
            <PageTitle>{selected.subject}</PageTitle>
            <Text secondary>From {selected.from}, {selected.date}</Text>
            <Text>{selected.body}</Text>
          </Col>
        ) : (
          <Text secondary>Select a message to read it.</Text>
        )}
      </Stack>
    </Row>
  );
}
