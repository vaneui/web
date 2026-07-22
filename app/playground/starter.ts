// Default snippet shown on first visit. Demonstrates the contract: write a
// component body ending in a return; hooks and all @vaneui/ui components are in scope.
export const STARTER_CODE = `// Write a component body and end with a return.
// In scope: every @vaneui/ui component, react-feather icons, and React hooks
// (useState, useEffect, useRef, useMemo, useCallback). No imports needed.

const [count, setCount] = useState(0);

return (
  <Card>
    <Title>Counter</Title>
    <Text secondary>You clicked {count} times.</Text>
    <Row>
      <Button filled onClick={() => setCount(count + 1)}>Increment</Button>
      <Button secondary onClick={() => setCount(0)}>Reset</Button>
    </Row>
  </Card>
);
`;
